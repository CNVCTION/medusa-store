# AGENTS.md

## Project

Dreamdead Medusa Store — Medusa v2 backend with a static editorial storefront (DREAMDEAD). Next.js storefront planned but not yet built.

## Architecture

- `backend/` — Medusa v2 backend (bare scaffold, no `src/` yet). Independent package (NOT part of a monorepo workspace; the local `pnpm-workspace.yaml` only exists for native build allowlists).
- `storefront/` — Next.js App Router storefront (**not yet created**, only `.env.example` present).
- Root — DREAMDEAD static storefront (`index.html`, `styles.css`, `app.js`). Dark-mode editorial design with product grid, cart, and quick-view. Served via Python HTTP server. Follows `DESIGN-vercel.md` (Vercel-derived system — mesh gradient hero, 100px pill CTAs, stacked shadows, mono section eyebrows).
- Multiple `DESIGN*.md` files at root — design system specifications (Runwai, Vercel, RunwayML). `DESIGN-vercel.md` is the active spec for the root site.
- `uber/` — Separate design reference directory (not active).
- Services: PostgreSQL (port 5432) and Redis (port 6379) via Docker.

## Setup

### 1. Start services

```bash
docker compose up -d postgres redis
```

### 2. Backend — install, run migrations, seed

```bash
cd backend
pnpm install

# Medusa CLI does NOT auto-load .env. Export vars first:
export $(grep -v '^#' .env | xargs)
pnpm run migration:run
pnpm run seed
```

### 3. Create admin user (one-time)

```bash
cd backend
export $(grep -v '^#' .env | xargs)
pnpm exec medusa user --email admin@loy.com --password admin123
```

## Development

### Backend

```bash
cd backend
export $(grep -v '^#' .env | xargs)
pnpm dev
```

Backend runs at `http://localhost:9000`. Admin panel at `http://localhost:5173/app`.

### Root Frontend (DREAMDEAD)

```bash
npm run dev       # serve at http://localhost:4173
npm run build     # copy into dist/
npm run preview   # serve built output
```

The build script copies `index.html`, `styles.css`, `app.js`, and `README.md` into `dist/`. See `BUILD.md` for a full project summary (architecture, design tokens, features, commands, next steps).

### Storefront (Next.js — not yet created)

```bash
cd storefront
pnpm install
pnpm dev
```

Storefront will run at `http://localhost:8000`.

## Gotchas

- **Medusa CLI does not auto-load `.env`** — always `export $(grep -v '^#' .env | xargs)` before running medusa commands. The `DATABASE_URL` in `.env` **must** match the DB name in docker-compose (`loy_store`, underscore, not hyphen).
- **No source code yet** — `backend/src/` does not exist. The scaffold has config only. Users must create modules, services, etc.
- **Two config files exist** — `backend/medusa-config.js` (loaded by CLI) and `backend/medusa-config.ts` (TypeScript source). Keep them in sync.
- **Storefront directory is empty** — the Next.js app has not been initialized.
- **Root is a static app** — no framework, no build step for the storefront itself. The `build` script just copies files. All interactivity is vanilla JS.
- **DESIGN\*.md files are reference only** — design system specifications, not runtime code.
- **Environment variables:** Stripe keys are placeholders. Set real values in `.env` before using payments.
- **No lint/typecheck/test scripts configured yet** in either backend or storefront package.json.

## Notes

- Backend uses Medusa v2 with `@medusajs/framework` and `@medusajs/medusa`.
- Redis modules (event-bus-redis, workflow-engine-redis) require Redis to be running.
- Storefront will use the Medusa JS SDK to consume backend APIs.
- Root frontend uses Inter + JetBrains Mono (Google Fonts), loaded in `index.html`.
- Admin panel is enabled at `/app` path.
