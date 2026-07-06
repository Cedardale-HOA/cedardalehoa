# Cedardale HOA — Vercel Deployment & Cutover Guide

How to deploy the Next.js site to Vercel and cut over from the current static site.

**Your setup:**
- Domain DNS managed by Cloudflare (already pointing to Vercel — no DNS changes needed)
- Static site already live on Vercel from this same repo
- Next.js site in `nextjs/`, not yet on `main`
- Sanity content already populated in your Sanity project

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

## Phase 2 — Test on a Branch Preview URL

Do this before touching the production deployment.

### 2. Push your working branch to GitHub

If you're working locally, push the current branch (do **not** merge to `main` yet):

```bash
git push origin HEAD
```

Vercel automatically creates a preview URL for every branch push, e.g.
`https://cedardalehoa-git-your-branch-name.vercel.app`

### 3. Set the environment variable in Vercel

The Sanity API token must be in Vercel before the first build runs.

1. Open the Vercel dashboard → your project → **Settings** → **Environment Variables**
2. Add:

   | Name | Value | Environments |
   |---|---|---|
   | `SANITY_API_TOKEN` | *(value from your `.env.local` file)* | Production, Preview, Development |

3. Click **Save**. Vercel will trigger a new deployment automatically.

### 4. Preview deploy still builds from the wrong root

At this point Vercel is still building from the repo root (the static site). You'll fix that in Phase 2. For now, focus on getting the env var saved.

---

## Phase 3 — Switch Vercel to the Next.js Root Directory

This is the cutover step. Changing the Root Directory immediately triggers a redeploy from the new location — your live domain switches over in ~2 minutes with no DNS changes.

### 5. Update the Root Directory in Vercel

1. Vercel dashboard → your project → **Settings** → **General**
2. Find **Root Directory** — currently blank or `/`
3. Click **Edit** and set it to:
   ```
   nextjs
   ```
4. Click **Save**

Vercel will immediately queue a production redeploy from the new root.

> **Cloudflare note:** Your Cloudflare DNS record for the domain should be set to **DNS only** (gray cloud icon, not orange). Vercel manages SSL certificates directly and they will fail to renew if Cloudflare is proxying the connection. Since your static site already has a working SSL cert through this setup, this is likely already correct — but double-check if you see SSL errors after the switchover.

### 6. Watch the deployment

In the Vercel dashboard → **Deployments** tab, watch the new build. It should complete in under 2 minutes.

---

## Phase 4 — Verify on Your Live Domain

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

## Phase 5 — Merge to Main

Once production is verified:

```bash
git checkout main
git merge your-branch-name
git push origin main
```

Future Vercel deployments will build from `nextjs/` on `main`.

---

## Phase 6 — Cleanup (Optional)

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
| Content (events, board members, posts, settings) | Edit in Sanity Studio → **Publish** → live on the site within 60 seconds automatically |
| Code (layout, new features) | Push to `main` → Vercel auto-deploys |
| Sanity Studio schema changes | `cd sanity-studio && npx sanity deploy` |

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
