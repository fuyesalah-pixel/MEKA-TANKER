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

## Project structure

```
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
