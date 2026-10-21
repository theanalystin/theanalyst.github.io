# theanalyst.in

A static Jekyll site with a client-side SQL and chart playground. The analytics tool runs in the browser: CSV files and query results are not sent to an application backend.

## Requirements

- Ruby and Bundler
- The versions required by the repository's `Gemfile`

This repository does not use `package.json` or a Node build step. Browser libraries are loaded on demand from public CDNs by the SQL Playground page.

## Run locally

```sh
bundle install
bundle exec jekyll serve
```

Open the local URL printed by Jekyll and visit `/sql-playground/`.

Build the static site:

```sh
JEKYLL_ENV=production bundle exec jekyll build
```

The generated site is written to `_site/`.

## SQL Playground features

- Generates a fictional 1,000-row employee dataset in the browser and supports local CSV import.
- Uses DuckDB-Wasm for SQL queries and profiles table schema, null counts, distinct values, and sample rows.
- Loads CodeMirror SQL editing and ECharts chart modules on demand.
- Supports bar, horizontal bar, line, area, stacked bar, pie/donut, scatter, heatmap, histogram, boxplot, and additional chart types.
- Exports query results as CSV and charts as PNG, SVG, or a PowerPoint slide.
- Stores named queries and the last chart configuration in local browser storage; share links contain query/configuration only, never uploaded data.
- Uses no application backend, analytics SDK, or third-party tracking scripts.

## Static hosting

### Cloudflare Pages

- **Framework preset:** None
- **Build command:** `bundle exec jekyll build`
- **Build output directory:** `_site`
- **Environment:** set `JEKYLL_ENV=production`; use the Ruby version required by the repository's `Gemfile`.

### Netlify

Configure the site with:

- **Build command:** `bundle exec jekyll build`
- **Publish directory:** `_site`
- **Environment variable:** `JEKYLL_ENV=production`

### Custom domain

The repository includes a `CNAME` file for `theanalyst.in`. When configuring a new static host, add `theanalyst.in` as the custom domain in that host's dashboard, apply the DNS records it provides, and enable HTTPS. Keep DNS records and the `CNAME` file aligned with the selected hosting provider.

## Privacy note

The SQL Playground uses third-party CDNs to download the libraries required to run the tool. Data operations themselves are performed locally in the browser and the page does not intentionally transmit uploaded files or query results to a server.