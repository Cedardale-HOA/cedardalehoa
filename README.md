# Cedardalehoa.com

Code for the cedardalehoa.com website

## Hugo migration status

This repository now contains a Hugo site at `hugo-site/`.

- Run locally:
  - `cd hugo-site && hugo server -D`
  - open http://localhost:1313
- Build:
  - `cd hugo-site && hugo --minify`
- Events are in `content/events` (one item per markdown file).
- Blog posts are in `content/blog`.

GitHub Actions pipeline added at `.github/workflows/hugo.yml` to build and upload `public/` artifact.

Production deploy can be configured in Vercel with:
- Build command: `hugo --source hugo-site --destination public --minify`
- Output path: `public`
