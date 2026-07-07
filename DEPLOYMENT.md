# Cedardale HOA — Vercel Deployment & Cutover Guide

How to deploy and maintain the production Next.js site on Vercel.

**Current production setup:**
- Domain DNS managed by Cloudflare (already pointing to Vercel)
- Vercel project: `cedardalehoa`
- Vercel Root Directory: `nextjs`
- Vercel Production Branch: `main`
- Git pushes to `main` trigger production deploys from `nextjs/`
- Sanity content is served from project `xwrx4h71`, dataset `production`

---

## Prerequisites

- [ ] Access to the [Vercel dashboard](https://vercel.com/dashboard) for this project
- [ ] The `SANITY_API_TOKEN` value from your local `nextjs/.env.local`
- [ ] Rollback readiness completed per `ROLLBACK.md` (required before implementation/cutover)

---

## Phase 0 — Mandatory Rollback Readiness

Do not continue until this phase is complete:

- [ ] Capture baseline artifacts (current production commit SHA, last known-good Vercel deployment ID, production settings snapshot)
- [ ] Assign rollback owners (incident commander, GitHub, Vercel, Sanity)
- [ ] Perform rollback dry run in preview/staging
- [ ] Record dry-run evidence in cutover PR

Reference runbook: `ROLLBACK.md`

---

## Phase 1 — Verify Sanity Content

> If content is already entered, skim this section to confirm coverage then move on.

Open the Studio at `https://cedardale-hoa.sanity.studio` (or run it locally with `cd sanity-studio && npm run dev`) and confirm the following are published:

### Site Settings (required — controls homepage fallback values)

- [ ] **Dues Amount** — e.g. `$42`
- [ ] **Dues Tagline** — e.g. `less than $4 a month`
- [ ] **Due Date** — e.g. `March 31`
- [ ] **Billing Period** — e.g. `Jan 1 – Dec 31`
- [ ] **Contact Email** — e.g. `admin@cedardalehoa.com`
- [ ] **About Heading** and **About Body** text
- [ ] **About Image**
- [ ] **Facebook Group URL**
- [ ] **HOA Documents URL** (Google Drive or similar)
- [ ] **Meeting Minutes URL**
- [ ] **Newsletter URL** (or leave blank if not used)

### Other content (recommended before launch)

- [ ] At least one **Event** with status set to `upcoming`
- [ ] **Board Members** with names, roles, and photos
- [ ] At least one **Blog Post** with a published date

Everything must be in **Published** state (green dot in Studio), not just saved as a draft.

---

## Phase 1 — Code Changes via Git

Use this path for Next.js application changes.

### 1. Work on a branch

Create and use a feature branch from `main`:

```bash
git checkout main
git pull origin main
git checkout -b your-branch-name
```

Make code changes under `nextjs/`, then validate locally:

```bash
cd nextjs
npm run lint
npm run dev
```

### 2. Push the branch for a Vercel preview deploy

Push the current branch to GitHub:

```bash
git push origin your-branch-name
```

Vercel automatically creates a preview URL for every branch push, e.g.
`https://cedardalehoa-git-your-branch-name.vercel.app`

### 3. Review the preview deployment

Verify at minimum:

- Homepage renders correctly
- `/events`, `/board`, and `/blog` load
- Zeffy embeds and external links work
- No critical errors appear in Vercel deployment logs

### 4. Merge to `main` for production

Once the preview looks correct:

```bash
git checkout main
git pull origin main
git merge your-branch-name
git push origin main
```

Vercel will automatically start a production deployment from `nextjs/`.

### 5. Verify production

After the deployment completes, verify on `https://www.cedardalehoa.com`:

- Homepage loads expected content
- Newsletter and dues Zeffy embeds render
- `/events`, `/board`, `/blog` work
- SSL and domain routing are healthy

If anything looks wrong, check Vercel Deployments and Function Logs.

---

## Phase 2 — Vercel Configuration Changes

Use this path when changing infrastructure or deployment settings rather than application code.

### 1. Common Vercel changes

Examples:

- Environment variables
- Root Directory
- Production Branch
- Build / install / output commands
- Domain aliases

### 2. Dashboard path

Most settings can be changed in the Vercel dashboard:

1. Open project `cedardalehoa`
2. Go to **Settings**
3. Update the required setting
4. Save and let Vercel redeploy if prompted

### 3. Root Directory reference

The current Root Directory is `nextjs`.

If it ever needs to be restored from the CLI, this authenticated API command works:

```bash
cd /workspaces/cedardalehoa
npx vercel api /v9/projects/cedardalehoa --scope crumdevs-projects -X PATCH -f rootDirectory=nextjs
```

Verify it with:

```bash
cd /workspaces/cedardalehoa
npx vercel api /v9/projects/cedardalehoa --scope crumdevs-projects --raw | grep -o '"rootDirectory":"[^"]*"\|"productionBranch":"[^"]*"'
```

Expected output:

```text
"rootDirectory":"nextjs"
"productionBranch":"main"
```

### 4. Environment variables

The Sanity API token must be in Vercel before the first build runs.

1. Open the Vercel dashboard → your project → **Settings** → **Environment Variables**
2. Add:

   | Name | Value | Environments |
   |---|---|---|
   | `SANITY_API_TOKEN` | *(value from your `.env.local` file)* | Production, Preview, Development |

3. Click **Save**. Vercel will trigger a new deployment automatically when the setting affects builds.

> **Cloudflare note:** Your Cloudflare DNS record for the domain should be set to **DNS only** (gray cloud icon, not orange). Vercel manages SSL certificates directly and they will fail to renew if Cloudflare is proxying the connection. Since your static site already has a working SSL cert through this setup, this is likely already correct — but double-check if you see SSL errors after the switchover.

### 5. Watch the deployment

In the Vercel dashboard → **Deployments** tab, watch the new build. It should complete in under 2 minutes.

---

## Phase 3 — Sanity Content Changes

Use this path for content-only updates such as posts, events, board members, and site settings.

### 1. Edit content in Sanity Studio

Open the hosted Studio at `https://cedardale-hoa.sanity.studio` or run locally:

```bash
cd sanity-studio
npm run dev
```

### 2. Publish content

For content changes to go live, each edited document must be in **Published** state.

Typical content updates include:

- Site settings
- Events
- Board members
- Blog posts

### 3. Production propagation

Published content should appear on the production site automatically within about 60 seconds because the Next.js app revalidates content.

### 4. Verify production content

Check the relevant page on `https://www.cedardalehoa.com` after publishing.

---

## Phase 4 — Sanity Schema Changes

Use this path when changing Studio schemas or adding new content fields.

### 1. Update Studio schema files

Edit files under `sanity-studio/schemaTypes/`.

### 2. Test locally

```bash
cd sanity-studio
npm run dev
```

Confirm the schema behaves correctly in the Studio UI.

### 3. Deploy the Studio

```bash
cd sanity-studio
npx sanity deploy
```

### 4. Update site code if queries or types changed

If the schema change affects the website data model, update the Next.js app as needed:

- `nextjs/src/sanity/queries.ts`
- `nextjs/src/types/sanity.ts`
- Any affected page or component files

Then publish those code changes using the Git workflow in Phase 1.

---

## Phase 5 — Verify on the Live Domain

Once the deploy finishes, check the live site:

- [ ] Homepage loads with Sanity content (not fallback values like `$42` / `March 31`)
- [ ] About section shows your text and image from Sanity
- [ ] `/#dues` — Zeffy payment form loads inside the Dues section
- [ ] `/events` — upcoming events list is populated
- [ ] `/board` — board member cards appear with photos
- [ ] `/blog` — posts appear
- [ ] External links work (Facebook group, Google Drive docs, newsletter)
- [ ] SSL padlock is green on your custom domain
- [ ] Site looks correct on mobile (test on a real device or browser DevTools)

If anything looks wrong, check the **Function Logs** in the Vercel dashboard for server errors.

---

## Phase 6 — Emergency CLI Fallback

Use this only if Git-based production deploys are blocked and you need an immediate release:

```bash
cd /workspaces/cedardalehoa/nextjs
npx vercel deploy --prod --scope crumdevs-projects
```

This publishes the current local `nextjs/` build directly to production.

---

## Phase 7 — Cleanup (Optional)

The old static files (`index.html`, `css/`, `js/`, `images/` at the repo root) are now ignored by Vercel and don't affect anything. Remove them when you're ready:

```bash
git rm index.html index-v2.html
git rm -r css/ js/ images/
git commit -m "Remove legacy static site files"
git push
```

---

## Ongoing: How Updates Work After Launch

| What changed | How to publish |
|---|---|
| Next.js code | Merge to `main` and push → Vercel auto-deploys from `nextjs/` |
| Vercel settings | Update in Vercel Settings or via Vercel API/CLI → verify deployment |
| Sanity content | Publish in Sanity Studio → live on site within about 60 seconds |
| Sanity Studio schema | Deploy Studio with `cd sanity-studio && npx sanity deploy` |

---

## Quick Reference

| | |
|---|---|
| Run site locally | `cd nextjs && npm run dev` |
| Run Studio locally | `cd sanity-studio && npm run dev` |
| Manage content | `https://cedardale-hoa.sanity.studio` *(or your chosen hostname)* |
| Vercel dashboard | `https://vercel.com/dashboard` |
| Sanity project | `https://sanity.io/manage/project/<your-project-id>` |
| Rotate API token | Sanity → API → Tokens → delete old → create new → update in Vercel env vars |
