import { chromium } from 'playwright';
import { strict as assert } from 'node:assert';

const baseURL = process.env.QUERYNEST_URL || 'http://127.0.0.1:4000/querynest/';
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1365, height: 900 }, acceptDownloads: true });
const errors = [];
page.on('pageerror', error => errors.push(error.message));

async function setSql(sql) {
  await page.locator('#sql-editor').evaluate((textarea, value) => {
    const cm = textarea.parentElement.querySelector('.CodeMirror');
    if (cm && cm.CodeMirror) cm.CodeMirror.setValue(value);
    else { textarea.value = value; textarea.dispatchEvent(new Event('input', { bubbles: true })); }
  }, sql);
}
async function runSql(sql) {
  const previous = await page.locator('#query-status').textContent();
  await setSql(sql);
  await page.locator('#run-query').click();
  await page.waitForFunction(old => {
    const status = document.querySelector('#query-status')?.textContent || '';
    return status !== old && status.startsWith('Query completed successfully');
  }, previous, { timeout: 30000 });
}

try {
  await page.goto(baseURL, { waitUntil: 'domcontentloaded', timeout: 45000 });
  await page.waitForFunction(() => (document.querySelector('#query-status')?.textContent || '').includes('SQLite is ready'), null, { timeout: 45000 });
  assert.equal(await page.title(), 'QueryNest — SQL workspace by The Analyst');
  assert.equal(await page.locator('.brand strong').textContent(), 'QueryNest');

  await runSql('SELECT region, COUNT(*) AS order_count, ROUND(SUM(amount), 2) AS revenue FROM orders GROUP BY region ORDER BY revenue DESC;');
  assert.equal(await page.locator('#table-result table tbody tr').count(), 4);
  assert.ok((await page.locator('#row-count').textContent()).includes('4 rows'));
  await page.locator('[data-result-tab="chart"]').click();
  assert.equal(await page.locator('#chart-result svg').count(), 1);

  await page.locator('#save-query').click();
  await page.locator('#modal-input').fill('Revenue by region');
  await page.locator('#modal-confirm').click();
  await page.locator('[data-view="saved"]').click();
  assert.ok((await page.locator('#saved-list').textContent()).includes('Revenue by region'));

  await page.locator('[data-view="editor"]').click();
  await runSql('SELECT department, ROUND(AVG(salary), 0) AS average_salary FROM employees GROUP BY department ORDER BY average_salary DESC;');
  await page.locator('#add-dashboard').click();
  await page.locator('#modal-input').fill('People overview');
  await page.locator('#modal-confirm').click();
  await page.locator('[data-view="dashboards"]').click();
  assert.ok((await page.locator('#dashboard-list').textContent()).includes('People overview'));

  await page.locator('[data-view="editor"]').click();
  const csvDownload = page.waitForEvent('download');
  await page.locator('#export-csv').click();
  assert.ok((await csvDownload).suggestedFilename().endsWith('.csv'));
  const jsonDownload = page.waitForEvent('download');
  await page.locator('#export-json').click();
  assert.ok((await jsonDownload).suggestedFilename().endsWith('.json'));

  await page.locator('[data-view="sources"]').click();
  await page.locator('#csv-file').setInputFiles({
    name: 'querynest_test.csv',
    mimeType: 'text/csv',
    buffer: Buffer.from('channel,orders\nOnline,12\nRetail,8\nPartner,5\n')
  });
  await page.waitForFunction(() => (document.querySelector('#query-status')?.textContent || '').startsWith('Query completed successfully'), null, { timeout: 30000 });
  assert.ok(await page.locator('#table-list').textContent().then(t => t.includes('querynest_test')));
  assert.equal(await page.locator('#table-result tbody tr').count(), 3);

  const dbDownload = page.waitForEvent('download');
  await page.locator('[data-view="sources"]').click();
  await page.locator('#export-db-btn').click();
  assert.ok((await dbDownload).suggestedFilename().endsWith('.sqlite'));

  await page.locator('#theme-toggle').click();
  assert.ok(await page.locator('body').evaluate(el => el.classList.contains('dark')));
  assert.deepEqual(errors, []);
  process.stdout.write('QueryNest browser checks passed: SQLite, query editor, table, chart, saved query, dashboard, CSV/JSON/SQLite export, CSV import, theme.\n');
} finally {
  await browser.close();
}
