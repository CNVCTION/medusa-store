# DREAMDEAD

**Editorial fashion storefront** — dark-mode Vercel-derived design, Medusa v2 commerce backend.

A static storefront for an avant-garde clothing label, built as a monorepo with a Medusa v2 backend. The root serves a fully interactive dark-mode editorial site (product grid, cart, quick-view, filters) powered by vanilla JS. The backend scaffold is ready for live API integration.

---

## What's Inside

```
medusa-store/
├── index.html          # DREAMDEAD storefront (static, vanilla JS)
├── styles.css          # Dark-mode Vercel design system
├── app.js              # Products, cart, quick-view, filters
├── backend/            # Medusa v2 (PostgreSQL + Redis, Node.js)
├── storefront/         # Future Next.js app (placeholder)
├── DESIGN-vercel.md    # Active design system spec
├── docker-compose.yml  # Postgres + Redis services
├── BUILD.md            # Full project build summary
├── ADMIN.md            # Admin login & hosting guide
└── AGENTS.md           # OpenCode session instructions
```

## Quick Start

```bash
# 1. Start services
docker compose up -d postgres redis

# 2. Install & run backend
cd backend
pnpm install
export $(grep -v '^#' .env | xargs)
pnpm run migration:run
pnpm exec medusa user -e admin@loy.com -p admin123

# 3. Start backend (separate terminal)
pnpm dev                       # http://localhost:9000

# 4. Serve frontend (separate terminal)
cd ..
npm run dev                    # http://localhost:4173
```

## Frontend

| Feature | Description |
|---|---|
| **Design** | Dark-mode Vercel-derived — mesh gradient hero, 100px pill CTAs, stacked shadows, mono eyebrows |
| **Products** | 8 editorial garments with gradient swatches |
| **Cart** | Slide-out drawer, quantity controls, local storage persistence |
| **Quick-view** | Product detail overlay with size selector |
| **Filters** | Category chips + live search |
| **Stack** | Vanilla JS, Inter + JetBrains Mono, no dependencies |

The frontend currently uses hardcoded product data. See [`ADMIN.md`](./ADMIN.md) for the guide on connecting it to the live Medusa API via the JS SDK.

## Backend

Medusa v2 scaffold (no source code yet). Ready for custom modules, services, and workflows.

- **Stack:** Node.js, TypeScript, PostgreSQL, Redis
- **Admin panel:** `http://localhost:5173/app`
- **Modules:** Stripe payments, Redis event bus + workflow engine

> **Note:** Medusa CLI does not auto-load `.env`. Always `export $(grep -v '^#' .env | xargs)` before running medusa commands.

## Commands

| Tool | Command | Port |
|---|---|---|
| Frontend dev | `npm run dev` | 4173 |
| Frontend build | `npm run build` | — |
| Backend dev | `cd backend && pnpm dev` | 9000 |
| Backend migrations | `pnpm run migration:run` | — |
| Admin panel | `http://localhost:5173/app` | 5173 |

## Design System

The root site follows [`DESIGN-vercel.md`](./DESIGN-vercel.md) adapted to dark mode:
- `#000` canvas, `#0a0a0a` surfaces, `#1a1a1a` borders
- White primary pills (100px radius), stacked shadows, negative tracking
- Mesh gradient hero (cyan/blue/magenta/amber on black)
- Mono labels for section eyebrows and technical copy

## Deployment

- **Frontend:** Static — deploy `dist/` to Vercel, Netlify, Cloudflare Pages, or S3
- **Backend:** Node.js — deploy to Railway, Render, Fly.io, or Vercel (requires PostgreSQL + Redis)
- See [`ADMIN.md`](./ADMIN.md) for detailed hosting and API linking instructions

## What's Next

- [ ] Create backend source modules, services, workflows
- [ ] Connect frontend to live Medusa API via JS SDK
- [ ] Initialize Next.js storefront with App Router
- [ ] Replace Stripe placeholder keys

---

Built with [Medusa v2](https://docs.medusajs.com/v2) · Design derived from [Vercel](https://vercel.com)
