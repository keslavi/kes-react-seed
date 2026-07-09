# Mock Data

The frontend loads mock data over HTTP from `public/mock/` (served by Vite in dev, static host in prod).

## Source and target

- Source: `server-koa/data/enc/*.enc.json`
- Target: `public/mock/enc/*.enc.json`
- HTTP paths: `/mock/{name}.iife.js` or `/mock/enc/{name}.enc.json`

## Commands

- `npm run copy:mock` — copy enc files from server-koa to public/mock/enc
- `npm run dev` — runs copy:mock before starting Vite
- `cd server-koa && npm run mock-sync` — encrypt changed iife files, then sync enc files both ways

## Load order (no backend, MSW off)

`apiGet` in task/option slices tries the API first, then falls back to `mockLoad`:

1. `public/mock/{name}.iife.js` (if present)
2. `public/mock/enc/{name}.enc.json` (decrypted client-side)

## Notes

- `public/mock/enc/` is populated by copy scripts, not edited directly.
- Authoritative source for mock data changes is `server-koa/data/*.iife.js` → `npm run mock-encrypt` in server-koa.
