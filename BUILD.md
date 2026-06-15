# DREAMDEAD — Project Build Summary

## Overview

**DREAMDEAD** is an editorial clothing label storefront built on a dark-mode Vercel-derived design system, powered by a Medusa v2 commerce backend. The project transforms a static clothing concept into a production-ready e-commerce architecture.

## Architecture

```
medusa-store/
├── index.html        # Root frontend (DREAMDEAD — static, vanilla JS)
├── styles.css        # Dark-mode Vercel design system (~680 lines)
├── app.js            # Store logic: products, cart, quick-view, filters (~400 lines)
├── scripts/build.mjs # Copies static files to dist/
├── backend/          # Medusa v2 backend (Node.js, TypeScript, PostgreSQL, Redis)
│   ├── package.json  # @medusajs/medusa 2.15.5, @medusajs/framework
│   ├── medusa-config.js / medusa-config.ts
│   ├── .env          # Database, Redis, Stripe, JWT config
│   └── (no src/ yet — bare scaffold)
├── storefront/       # Future Next.js App Router storefront (not yet created)
│   └── .env.example
├── DESIGN-vercel.md  # Active design system specification
├── DESIGN.md         # Runwai-derived reference design
├── DESIGN-runwayml.md
├── uber/DESIGN.md    # Inactive design reference
├── docker-compose.yml # PostgreSQL + Redis
└── AGENTS.md         # Session instructions for OpenCode agents
```

## Design System

The root storefront follows `DESIGN-vercel.md` adapted to **dark mode**:

| Token | Value | Purpose |
|---|---|---|
| `canvas` | `#000000` | Page background |
| `canvas-soft` | `#0a0a0a` | Card / surface backgrounds |
| `primary` | `#ffffff` | Primary CTA (white pill, black text) |
| `ink` | `#ffffff` | Heading / primary text |
| `hairline` | `#1a1a1a` | Borders and dividers |
| `font-sans` | Inter | Display + body typography |
| `font-mono` | JetBrains Mono | Section eyebrows, technical labels |

**Key signatures:**
- **Mesh gradient hero** — cyan/blue/magenta/amber radial blurs on black
- **100px pill CTAs** (`btn-primary`) — white background, black text
- **6px nav buttons** (`btn-nav-cta`) — compact, geometric
- **Stacked shadows** — inset hairline + multi-stop drops
- **Negative tracking** — headings at `-0.05em` (display-xl) to `-0.03em` (display-sm)
- **Mono section eyebrows** — `// Merchandise`, `// Lookbook`
- **Polarity-flip bands** — white surface sections break the dark rhythm
- **No uppercase** outside mono labels — sentence-case headlines throughout

## Frontend Features

- **8 products** — DREAMDEAD collection (Obsidian Trench, Void Knit, Silence Blazer, Ash Overcoat, Phantom Hoodie, Noir Cargo, Eclipse Dress, Shadow Scarf)
- **Category filters** — quick chip-based filtering
- **Search** — real-time product search across name, category, description
- **Quick-view drawer** — size selector, material info, add-to-cart from overlay
- **Cart drawer** — quantity controls, subtotal, local storage persistence
- **Responsive** — 4-column → 2-column → 1-column product grid
- **Smooth animations** — staggered fade-up reveals
- **All vanilla JS** — no framework, zero dependencies

## Backend (Medusa v2)

- **Scaffold only** — `backend/src/` does not exist yet
- Medusa v2.15.5 with `@medusajs/framework` and `@medusajs/medusa`
- PostgreSQL (docker, port 5432) + Redis (docker, port 6379)
- Stripe payment module configured (placeholder keys)
- Admin panel enabled at `/app` path (Vite dev server at localhost:5173)
- Session eyebrows: **Medusa CLI does not auto-load `.env`** — always `export` before commands

## Commands

```bash
# Root frontend
npm run dev       # Serve at http://localhost:4173
npm run build     # Copy files to dist/
npm run preview   # Serve built output

# Backend
cd backend
export $(grep -v '^#' .env | xargs)
pnpm dev          # Start at http://localhost:9000
pnpm run migration:run   # Run database migrations
pnpm exec medusa user --email admin@loy.com --password admin123  # Create admin

# Services
docker compose up -d postgres redis
```

## What's Next

- [ ] Create backend source code (`src/`) — custom modules, services, workflows
- [ ] Integrate Medusa JS SDK with root frontend for live product/cart APIs
- [ ] Initialize Next.js storefront in `storefront/` with Medusa JS SDK
- [ ] Migrate static HTML/CSS/JS to Next.js components
- [ ] Replace Stripe placeholder keys with real credentials
- [ ] Add linting, type checking, and test scripts
- [ ] Add `.env` to `.gitignore` to prevent secret leakage

## Files (root, active)

| File | Lines | Role |
|---|---|---|
| `index.html` | 256 | HTML structure + Vercel section rhythm |
| `styles.css` | 683 | Dark-mode design system |
| `app.js` | 400 | Product data, cart, rendering |
| `build.mjs` | 19 | Static build script |
| `AGENTS.md` | ~90 | OpenCode session instructions |
| `README.md` | 13 | Brief project overview |
| `BUILD.md` | this | This document |
