# Mock Data (Seed)

Seed consumes shared mock data from server-koa and serves it from `seed/public/mock`.

## Source and target

- Source: `../server-koa/data/mock`
- Target: `./public/mock`

## Commands

- `npm run copy:mock` → copies mock artifacts from source to target

## Notes

- Seed does not generate mock artifacts.
- If source files are missing, verify `server-koa/data/mock` exists.
- `npm run dev` runs `copy:mock` before starting Vite.
