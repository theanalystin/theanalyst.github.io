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
    await page.waitForFunction(() => {
      const engine = document.querySelector('#sqlp-engine')?.textContent || '';
      const status = document.querySelector('#sqlp-status');
      const note = document.querySelector('#sqlp-chart-note')?.textContent || '';
      return (engine.includes('DuckDB ready') && document.querySelector('#sqlp-chart canvas')) ||
        status?.classList.contains('error') || note.includes('Chart modules could not load');
    }, null, { timeout: 150000 });
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
      await page.locator('#sqlp-more-toggle').click();
      const cases = [
        ['headcount','bar'], ['topLocations','horizontalBar'], ['monthlyHiring','line'],
        ['cumulativeHiring','area'], ['genderHeadcount','stackedBar'], ['attritionShare','pie'],
        ['salaryTenure','scatter'], ['performanceHeatmap','heatmap'], ['salaryHistogram','histogram'],
        ['salaryBoxplot','boxplot'], ['combo','combo'], ['waterfall','waterfall'],
        ['treemap','treemap'], ['funnel','funnel'], ['radar','radar'], ['gauge','gauge'], ['sankey','sankey']
      ];
      for (const [queryKey, chartType] of cases) {
        await page.locator('#sqlp-query-examples').selectOption(queryKey);
        await page.locator('#sqlp-run').click();
        await page.waitForFunction(() => (document.querySelector('#sqlp-status')?.textContent || '').startsWith('Query completed'), null, { timeout: 30000 });
        const tile = page.locator(`#sqlp [data-chart="${chartType}"]`);
        await tile.waitFor({ state: 'visible' });
        if (await tile.isDisabled()) throw new Error(`Chart ${chartType} was disabled for sample query ${queryKey}`);
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
    }
    await page.close();
  }
  if (errors.length) throw new Error(errors.join('\n'));
  console.log('SQL Playground browser checks passed at 375px and 1280px; all 17 chart types and CSV/PNG/SVG/PPTX exports rendered.');
} finally {
  await browser.close();
}