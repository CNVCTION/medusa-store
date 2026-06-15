# DREAMDEAD — Admin Guide

## 1. Logging into the Admin Panel

The Medusa admin panel runs at `http://localhost:5173/app`.

**First time:**
```bash
cd backend
export $(grep -v '^#' .env | xargs)
pnpm exec medusa user --email admin@loy.com --password admin123
```

Then open `http://localhost:5173/app` and log in with those credentials.

The admin panel auto-detects your backend at `http://localhost:9000` when running locally.

---

## 2. Hosting

**Backend** — Medusa v2 can be deployed to any Node.js host (Railway, Render, Fly.io, Vercel, AWS). You'll need:

- A PostgreSQL instance (hosted: Supabase, Render, RDS, Neon)
- A Redis instance (hosted: Upstash, Render, Redis Cloud)
- Set environment variables on the host (DATABASE_URL, REDIS_URL, JWT_SECRET, etc.)
- Build: `cd backend && pnpm run build`
- Start: `pnpm run start`

**Root frontend** — static HTML/CSS/JS. Deploy anywhere that serves static files (Vercel, Netlify, Cloudflare Pages, S3). Just point it to `dist/` after running `npm run build`.

**Storefront (future)** — Next.js app. Deploy to Vercel or any Node.js host.

---

## 3. Linking the Frontend API

The static frontend currently uses **hardcoded product data** in `app.js`. To connect it to the live Medusa backend:

1. Start the backend (`cd backend && export $(grep -v '^#' .env | xargs) && pnpm dev`)
2. Import the Medusa JS SDK in `app.js`:
   ```js
   import Medusa from "@medusajs/medusa-js"
   const medusa = new Medusa({ baseUrl: "http://localhost:9000", maxRetries: 3 })
   ```
3. Replace the local `products` array and cart logic with SDK calls:
   ```js
   const { products } = await medusa.products.list()
   const { cart } = await medusa.carts.create()
   ```

The `STOREFRONT_URL` in `backend/.env` should point to your frontend URL (default `http://localhost:4173`). The admin panel URL defaults to `http://localhost:5173`.

---

## 4. Using Medusa Docs

- **Main docs:** https://docs.medusajs.com/v2
- **JS SDK reference:** https://docs.medusajs.com/v2/resources/js-sdk
- **Admin API reference:** https://docs.medusajs.com/v2/api/admin
- **Store API reference:** https://docs.medusajs.com/v2/api/store
- **Deployment guides:** https://docs.medusajs.com/v2/deployments

Key pages for a new store:
- [Create a product](https://docs.medusajs.com/v2/guides/products)
- [Set up payments (Stripe)](https://docs.medusajs.com/v2/plugins/payment/stripe)
- [Custom modules](https://docs.medusajs.com/v2/advanced-development/modules)
- [Workflows](https://docs.medusajs.com/v2/advanced-development/workflows)

The Medusa CLI can also scaffold new modules and services:
```bash
cd backend
export $(grep -v '^#' .env | xargs)
pnpm exec medusa new my-module
```
