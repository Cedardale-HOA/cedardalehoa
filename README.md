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

## Netlify CMS integration

Add the editor UI at `/admin/`:
- `hugo-site/static/admin/index.html`
- `hugo-site/static/admin/config.yml`

Access via: `https://<your-site-url>/admin/`.

### Netlify CMS settings
- backend:
  - `name: github`
  - `repo: Cedardale-HOA/cedardalehoa`
  - `branch: main`
  - `open_authoring: true` (editor propose PR updates)
- `media_folder`: `static/images/uploads`
- `public_folder`: `/images/uploads`

### Collections in `config.yml`
- `blog` → `hugo-site/content/blog`
- `events` → `hugo-site/content/events`

### Editor workflow
1. Open `/admin/` and login with GitHub.
2. Create or edit blog/event content in UI.
3. Save and publish to open a Pull Request.
4. Merge PR, then Vercel auto-rebuilds from main.

### Optional local test
- `cd hugo-site && hugo server -D`
- Visit `http://localhost:1313/admin/`

