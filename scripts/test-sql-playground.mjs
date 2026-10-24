import { chromium } from 'playwright';
import fs from 'node:fs/promises';

const baseURL = process.env.SQL_PLAYGROUND_URL || 'http://127.0.0.1:4000/sql-playground/';
const output = process.env.SQL_PLAYGROUND_SCREENSHOTS || '/tmp/sql-playground-screenshots';
await fs.mkdir(output, { recursive: true });
const browser = await chromium.launch({ headless: true });
const errors = [];
try {
  for (const viewport of [{ width: 375, height: 812 }, { width: 1280, height: 900 }]) {
    const page = await browser.newPage({ viewport, acceptDownloads: true });
    page.on('pageerror', error => errors.push(`pageerror at ${viewport.width}px: ${error.message}`));
    await page.goto(baseURL, { waitUntil: 'domcontentloaded', timeout: 45000 });
    await page.locator('[data-sample="employees"]').click();
    try {
      await page.waitForFunction(() => {
        const engine = document.querySelector('#sqlp-engine')?.textContent || '';
        const status = document.querySelector('#sqlp-status');
        const note = document.querySelector('#sqlp-chart-note')?.textContent || '';
        return (engine.includes('DuckDB ready') && document.querySelector('#sqlp-chart canvas')) ||
          status?.classList.contains('error') || /Chart error|could not load|timed out/i.test(note);
      }, null, { timeout: 60000 });
    } catch (error) {
      await page.screenshot({ path: `${output}/sql-playground-${viewport.width}-startup-timeout.png`, fullPage: true });
      const engine = await page.locator('#sqlp-engine').textContent();
      const status = await page.locator('#sqlp-status').textContent();
      const note = await page.locator('#sqlp-chart-note').textContent();
      throw new Error(`Startup timed out at ${viewport.width}px: engine=${engine}; status=${status}; chart=${note}; ${error.message}`);
    }
    const startupStatus = await page.locator('#sqlp-status').textContent();
    const startupEngine = await page.locator('#sqlp-engine').textContent();
    const startupNote = await page.locator('#sqlp-chart-note').textContent();
    if (!startupEngine.includes('DuckDB ready') || !(await page.locator('#sqlp-chart canvas').count())) {
      await page.screenshot({ path: `${output}/sql-playground-${viewport.width}-startup-failure.png`, fullPage: true });
      throw new Error(`Startup failed at ${viewport.width}px: engine=${startupEngine}; status=${startupStatus}; chart=${startupNote}`);
    }
    await page.screenshot({ path: `${output}/sql-playground-${viewport.width}-before-editor.png`, fullPage: true });
    await page.locator('#sqlp-query').focus();
    await page.locator('.cm-editor').waitFor({ state: 'visible', timeout: 30000 });
    const tileColumns = await page.locator('#sqlp-chart-picker').evaluate(el => getComputedStyle(el).gridTemplateColumns.split(' ').length);
    const expectedColumns = viewport.width < 781 ? 2 : 5;
    if (tileColumns !== expectedColumns) throw new Error(`Expected ${expectedColumns} chart tiles per row at ${viewport.width}px, got ${tileColumns}`);
    await page.screenshot({ path: `${output}/sql-playground-${viewport.width}.png`, fullPage: true });
    if (viewport.width === 1280) {
      const chartTypes = await page.locator('#sqlp-chart-picker [data-chart]').count();
      if (chartTypes !== 10) throw new Error(`Expected exactly 10 primary chart types, got ${chartTypes}`);
      const previewBeforeExport = await page.locator('#sqlp-chart').evaluate(el =>
        Boolean(el.compareDocumentPosition(document.querySelector('#sqlp-png')) & Node.DOCUMENT_POSITION_FOLLOWING)
      );
      if (!previewBeforeExport) throw new Error('Live chart preview must appear before export controls');
      const cases = [
        ['SELECT department, COUNT(*) AS headcount FROM employees GROUP BY department ORDER BY headcount DESC;', 'bar'],
        ['SELECT department, COUNT(*) AS headcount FROM employees GROUP BY department ORDER BY headcount DESC;', 'horizontalBar'],
        ['SELECT join_date AS month, COUNT(*) AS hires FROM employees GROUP BY join_date ORDER BY join_date;', 'line'],
        ['SELECT join_date AS month, SUM(COUNT(*)) OVER (ORDER BY join_date) AS cumulative_hires FROM employees GROUP BY join_date ORDER BY join_date;', 'area'],
        ['SELECT department, gender, COUNT(*) AS headcount FROM employees GROUP BY department, gender ORDER BY department, gender;', 'stackedBar'],
        ['SELECT department, COUNT(*) AS headcount FROM employees GROUP BY department ORDER BY headcount DESC;', 'pie'],
        ['SELECT tenure_years, salary, performance_rating FROM employees;', 'scatter'],
        ['SELECT department, grade, ROUND(AVG(performance_rating),2) AS avg_rating FROM employees GROUP BY department, grade ORDER BY department, grade;', 'heatmap'],
        ['SELECT salary FROM employees;', 'histogram'],
        ['SELECT grade, salary FROM employees;', 'boxplot']
      ];
      for (const [sql, chartType] of cases) {
        await page.locator('.cm-content').fill(sql);
        await page.locator('#sqlp-run').click();
        await page.waitForFunction(() => (document.querySelector('#sqlp-status')?.textContent || '').startsWith('Query completed'), null, { timeout: 30000 });
        const tile = page.locator(`#sqlp [data-chart="${chartType}"]`);
        await tile.waitFor({ state: 'visible' });
        if (await tile.isDisabled()) {
          const diagnostic = await page.evaluate(() => ({
            x: document.querySelector('#sqlp-x')?.value,
            y: document.querySelector('#sqlp-y')?.value,
            group: document.querySelector('#sqlp-group')?.value,
            note: document.querySelector('#sqlp-chart-note')?.textContent,
            columns: Array.from(document.querySelectorAll('#sqlp-x option')).map(o => o.value),
            types: Array.from(document.querySelectorAll('#sqlp-chart-picker [data-chart]')).map(button => ({ type: button.dataset.chart, disabled: button.disabled }))
          }));
          throw new Error(`Chart ${chartType} was disabled for SQL ${sql}: ${JSON.stringify(diagnostic)}`);
        }
        await tile.click();
        await page.waitForFunction(type => document.querySelector('#sqlp-chart')?.dataset.chartType === type, chartType, { timeout: 15000 });
        const note = await page.locator('#sqlp-chart-note').textContent();
        if ((note || '').includes('Chart error')) throw new Error(`${chartType} failed: ${note}`);
        const hasCanvas = await page.locator('#sqlp-chart canvas').count();
        if (!hasCanvas) throw new Error(`${chartType} did not render a chart canvas`);
      }
      // Exercise the automatic SQL histogram and boxplot fallbacks on raw result rows.
      await page.locator('.cm-content').fill('SELECT salary FROM employees;');
      await page.locator('#sqlp-run').click();
      await page.waitForFunction(() => (document.querySelector('#sqlp-status')?.textContent || '').startsWith('Query completed'), null, { timeout: 30000 });
      await page.locator('#sqlp [data-chart="histogram"]').click();
      await page.waitForFunction(type => document.querySelector('#sqlp-chart')?.dataset.chartType === type, 'histogram', { timeout: 15000 });
      await page.locator('.cm-content').fill('SELECT grade, salary FROM employees;');
      await page.locator('#sqlp-run').click();
      await page.waitForFunction(() => (document.querySelector('#sqlp-status')?.textContent || '').startsWith('Query completed'), null, { timeout: 30000 });
      await page.locator('#sqlp [data-chart="boxplot"]').click();
      await page.waitForFunction(type => document.querySelector('#sqlp-chart')?.dataset.chartType === type, 'boxplot', { timeout: 15000 });
      const csvDownload = page.waitForEvent('download', { timeout: 20000 });
      await page.locator('#sqlp-download').click();
      if (!(await csvDownload).suggestedFilename().endsWith('.csv')) throw new Error('CSV export did not produce a CSV file');
      const pngDownload = page.waitForEvent('download', { timeout: 20000 });
      await page.locator('#sqlp-png').click();
      if (!(await pngDownload).suggestedFilename().endsWith('.png')) throw new Error('PNG export did not produce a PNG file');
      const svgDownload = page.waitForEvent('download', { timeout: 20000 });
      await page.locator('#sqlp-svg').click();
      if (!(await svgDownload).suggestedFilename().endsWith('.svg')) throw new Error('SVG export did not produce an SVG file');
      const pptDownload = page.waitForEvent('download', { timeout: 20000 });
      await page.locator('#sqlp-ppt').click();
      if (!(await pptDownload).suggestedFilename().endsWith('.pptx')) throw new Error('PowerPoint export did not produce a PPTX file');

      // Verify the relational sample is seeded and common analyst joins execute.
      const relationalCases = [
        ['SELECT COUNT(*) AS n FROM departments;', '8', 'departments'],
        ['SELECT COUNT(*) AS n FROM customers;', '24', 'customers'],
        ['SELECT COUNT(*) AS n FROM orders;', '18', 'orders'],
        ['SELECT COUNT(*) AS n FROM order_items;', '36', 'order items'],
        ['SELECT COUNT(*) AS n FROM employees e JOIN departments d USING (department);', '10', 'employee-department join'],
        ['SELECT COUNT(*) AS n FROM customers c LEFT JOIN orders o USING (customer_id) WHERE o.order_id IS NULL;', '6', 'left join unmatched customers'],
        ["SELECT COUNT(*) AS n FROM (SELECT DATE_TRUNC('month', o.order_date) AS month, SUM(oi.quantity * p.unit_price * (1 - oi.discount)) AS revenue FROM orders o JOIN order_items oi USING (order_id) JOIN products p USING (product_id) GROUP BY 1) monthly;", '9', 'monthly revenue aggregation']
      ];
      for (const [sql, expected, label] of relationalCases) {
        await page.locator('.cm-content').fill(sql);
        await page.locator('#sqlp-run').click();
        await page.waitForFunction(() => (document.querySelector('#sqlp-status')?.textContent || '').startsWith('Query completed'), null, { timeout: 30000 });
        const actual = await page.locator('#sqlp-results tbody tr:first-child td:first-child').textContent();
        if ((actual || '').trim() !== expected) throw new Error(`Relational sample check failed for ${label}: expected ${expected}, got ${actual}`);
      }
    }
    await page.close();
  }
  if (errors.length) throw new Error(errors.join('\n'));
  console.log('SQL Playground browser checks passed at 375px and 1280px; 10 chart types and CSV/PNG/SVG/PPTX exports rendered.');
} finally {
  await browser.close();
}