# Cloudflare Deployment Plan

## Current state

The repository currently contains a static `index.html` and is published through GitHub Pages. No Cloudflare Pages project, Worker, D1 database, R2 bucket or Durable Object binding has been verified or created as part of this change.

## Stage 1 — Static preview on Cloudflare Pages

1. In Cloudflare Dashboard, open **Workers & Pages**.
2. Create a Pages project and connect the GitHub repository `sparkles-systems-solutions/lanka-map`.
3. Select the feature branch for preview deployments; use `main` only for the production branch after approval.
4. For the current static baseline, leave the build command empty and set the output directory to the repository root (`/` or `.`, as accepted by the dashboard).
5. Deploy and record the preview URL and commit SHA.
6. Run the Phase 1 UAT checklist against the preview URL before promoting to production.

Dashboard labels may change. Confirm the current Cloudflare Pages Git integration workflow in Cloudflare documentation before deployment.

## Stage 2 — Workers API

Create a separate Worker service for versioned API routes. Add bindings only when the corresponding feature is implemented and tested. Keep provider credentials in Worker secrets, never in repository files or frontend environment values.

Proposed future bindings:
- D1 database binding for application records.
- R2 bucket binding for private user files and exports.
- Durable Object binding for short-lived real-time location sessions.

## Stage 3 — Environments and secrets

Maintain separate preview/staging and production configuration. Use separate data resources where practical. Document secret names, but never commit secret values. Rotate credentials if exposed.

## Deployment acceptance

- HTTPS works.
- Preview and production branches are configured intentionally.
- Build/deployment commit SHA is recorded.
- No private secrets are exposed to browser code.
- Core UAT tests pass on the deployed URL.
- Rollback to the last known-good deployment is understood and tested.

## Important

A GitHub repository commit does not automatically create Cloudflare resources. Cloudflare account access and explicit dashboard configuration are required before a live Cloudflare deployment can be claimed.
