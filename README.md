# Cedardalehoa.com

Code for the cedardalehoa.com website

## Production Source of Truth

- App source used for production: `nextjs/`
- Content studio: `sanity-studio/`
- Legacy static site files in repo root are retained temporarily for rollback/reference.

## Development

Run Next.js app:

```bash
cd nextjs
npm install
npm run dev
```

Run Sanity Studio:

```bash
cd sanity-studio
npm install
npm run dev
```

## Deployment and Rollback

- Deployment guide: `DEPLOYMENT.md`
- Mandatory rollback runbook: `ROLLBACK.md`

No implementation or production cutover should begin until rollback readiness is complete.
