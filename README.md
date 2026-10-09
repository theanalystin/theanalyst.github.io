# The Analyst — SQL Analytics Workbench

A free, browser-based SQL learning and analytics workspace. No account or server-side database is required.

## Features

- Run SQLite SQL in the browser.
- Explore tables and columns; preview, query, filter and drop imported tables.
- Import CSV, TXT, XLS and XLSX files. Each worksheet is imported as a separate table.
- Import and export SQLite database backups.
- Export query results and tables as CSV.
- Build charts from query results and export them as PNG.
- Save queries, revisit recent query history and use starter templates.
- Learn SQL using sample tables, practice queries and daily lesson pages.
- Responsive layout for desktop and mobile.

## Run locally

Serve the repository root using any static web server. Opening index.html directly with file:// may prevent browser features or WebAssembly assets from loading correctly.

Example with Python installed:

```bash
python -m http.server 8000
```

Then open http://localhost:8000.

## Data and privacy

SQLite runs locally in the browser. Imported files are processed on-device and are not sent to an application backend. The database, saved queries and query history are stored in browser storage and are not synchronized between devices. Export a .sqlite backup before clearing browser data or moving to another device.

The app loads SQLite, SheetJS and Chart.js from public CDNs. An internet connection is needed to load these libraries.

## Important limits

- CSV/Excel import currently rejects individual files larger than 25 MB.
- The results table displays up to 5,000 rows at once; CSV export includes the full query result.
- Browser storage quotas depend on the browser and device. Keep backups for important data.
- This is a client-side analytics tool, not a multi-user BI service. It does not provide server-side accounts, shared dashboards, access control or centralized persistence.

## Deploy

The repository is configured for GitHub Pages with the custom domain theanalyst.in. Push changes to the publishing branch and check the repository's Pages deployment status before assuming the public site has updated.