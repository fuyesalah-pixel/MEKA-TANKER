# MEKA-TANKER

Meka Water Tanker — a modern, animated React storefront for water-tanker delivery, with a bilingual (English / አማርኛ) front end, an Express + PostgreSQL backend and a password-protected admin dashboard for products, orders, enquiries and site content.

## Features

- **Luxury landing experience** — layered hero with water caustics, scrolling wave bands, falling droplets, click ripples and press ripples on every button (all CSS/SVG transform work, disabled under `prefers-reduced-motion`).
- **Bilingual site** — English ⇄ አማርኛ toggle with Ethiopic typography, persisted in the browser.
- **Storefront** — tanker collections, product detail pages, quote/enquiry form, newsletter signup, testimonials, FAQs and partner marquee.
- **Admin dashboard** — overview metrics, product CRUD with image and pricing, order pipeline, enquiries inbox, subscribers, editable content (FAQs, partners, testimonials) and site settings.
- **PostgreSQL persistence** — seeded schema with 24 products, 4 categories, testimonials, FAQs, partners and settings.

## Stack

| Layer | Technology |
| --- | --- |
| Front end | React 18, React Router, Vite 6, Framer Motion, Lucide icons |
| Styling | Hand-written CSS with design tokens, no UI framework |
| Back end | Node.js, Express 4, `pg`, JWT (`jsonwebtoken`), bcrypt (`bcryptjs`) |
| Database | PostgreSQL |

## Getting started

```bash
npm install
cp .env.example .env      # then fill in your values
npm run db:setup          # creates tables and seeds demo data
npm run dev               # API on :4000, site on :5173
```

Open http://localhost:5173 for the site and http://localhost:5173/admin for the dashboard. The footer links to the admin login.

### Environment variables

| Variable | Purpose |
| --- | --- |
| `DATABASE_URL` | PostgreSQL connection string |
| `JWT_SECRET` | Signing key for admin sessions — use a long random string |
| `PORT` | API port (default `4000`) |
| `ADMIN_EMAIL` | Admin account created by `npm run db:setup` |
| `ADMIN_PASSWORD` | Password for that admin account |

`.env` is git-ignored — never commit real credentials.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | API + Vite dev server together |
| `npm run dev:api` | API only |
| `npm run dev:web` | Vite only |
| `npm run db:setup` | Create schema and seed demo content |
| `npm run build` | Production build into `dist/` |
| `npm start` | Serve the built front end from Express |

## Deploy to Vercel

The project ships Vercel-ready: `api/index.js` exposes the Express app as one serverless function, `vercel.json` routes `/api/*` to it and everything else to the SPA, and `npm run build` copies `images/` and `favicon/` into `dist/` so the static host serves them.

1. Import the GitHub repository into Vercel. The build command (`npm run build`), output directory (`dist`) and routing come from `vercel.json` — no dashboard overrides needed.
2. Create a hosted PostgreSQL database (Vercel's Postgres/Neon integration is the shortest path; any provider works) and copy its **pooled** connection string.
3. Add these environment variables to the project (Production and Preview):

   | Variable | Value |
   | --- | --- |
   | `DATABASE_URL` | pooled PostgreSQL connection string (`POSTGRES_URL` is also read) |
   | `JWT_SECRET` | long random string — the API refuses to start on Vercel without it |
   | `ADMIN_EMAIL` | admin account email for seeding |
   | `ADMIN_PASSWORD` | admin account password for seeding |

4. Create the schema and demo data once against the hosted database:

   ```bash
   DATABASE_URL="postgres://..." ADMIN_EMAIL="..." ADMIN_PASSWORD="..." npm run db:setup
   ```

5. Deploy, then check `/api/products` returns JSON and `/admin` signs in with those credentials.

The API uses a small connection pool on Vercel (`max: 3`, idle clients released) so concurrent function instances stay within a pooled connection limit. Use a pooled URL, not a direct one, if your provider offers both.

## Project structure

```
api/             Vercel serverless entry point (wraps the Express app)
scripts/         build helpers
client/          React app
  src/admin/     admin dashboard (auth, products, orders, enquiries, content, settings)
  src/components/ layout, hero water backdrop, footer, shared UI
  src/pages/     public pages
  src/styles/    design tokens and global styles
server/          Express API, routes, PostgreSQL access and seed data
images/          brand and product imagery
```

## Notes

- The site and API run on the same origin behind Express in production (`npm run build && npm start`).
- Product and content edits made in the dashboard are stored in PostgreSQL and appear on the site immediately.
