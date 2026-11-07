# WAZUKA — Kitchenware Product Showcase

A clean, modern, mobile-first product showcase website for WAZUKA kitchenware. Built with Vite + React + TypeScript + Tailwind CSS + Framer Motion + React Router. No shopping cart, no payments, no login — visitors browse products and contact WAZUKA by WhatsApp, phone, or email to order.

## Tech stack

- **Vite** — build tool and dev server
- **React 19** + **TypeScript** — UI framework
- **Tailwind CSS v4** — styling
- **Framer Motion** — animations
- **React Router** — client-side routing
- **@fontsource** — self-hosted fonts (Plus Jakarta Sans, Inter)

## Getting started

### Prerequisites

- Node.js (v18 or later)
- npm

### Install dependencies

```bash
npm install
```

### Start the dev server

```bash
npm run dev
```

Open http://localhost:5173 in your browser.

The dev server runs on port 5173 by default. If that port is in use, Vite will pick the next available port.

### Build for production

```bash
npm run build
```

Output goes to the `dist/` folder.

### Preview production build

```bash
npm run preview
```

## Project structure

```
wazuka/
├── public/
│   ├── _redirects          # SPA fallback for Cloudflare Pages
│   └── products/           # Product images (copied from source)
├── src/
│   ├── config/
│   │   └── site.ts         # All business details (edit here)
│   ├── data/
│   │   ├── categories.ts   # Category definitions
│   │   └── products.ts     # Product data
│   ├── lib/
│   │   └── productService.ts  # Data service layer (Supabase-ready)
│   ├── components/
│   │   ├── AboutSection.tsx
│   │   ├── CategoryTiles.tsx
│   │   ├── ContactSection.tsx
│   │   ├── Footer.tsx
│   │   ├── FloatingWhatsApp.tsx
│   │   ├── Header.tsx
│   │   ├── Hero.tsx
│   │   ├── LegalPage.tsx
│   │   ├── ProductCard.tsx
│   │   ├── ProductGrid.tsx
│   │   ├── ProductModal.tsx
│   │   └── links.tsx
│   ├── pages/
│   │   ├── Cookie.tsx
│   │   ├── Home.tsx
│   │   ├── NotFound.tsx
│   │   ├── Privacy.tsx
│   │   ├── ProductPage.tsx
│   │   └── Terms.tsx
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── DESIGN.md               # Design system documentation
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.json
├── vite.config.ts
└── .env.example
```

## How to add or edit a product

1. Open `src/data/products.ts`
2. Add a new product object to the `products` array, or edit an existing one
3. Each product needs: `id`, `name`, `slug`, `category`, `shortDescription`, `description`, `features[]`, `images[]`, `featured`, `inStock`, `sortOrder`, `placeholder`
4. Product images go in `public/products/` — reference them as `/products/your-image.jpg`
5. The `category` field must match a category slug from `src/data/categories.ts`

## How to change a photo

1. Copy your new image to `public/products/` with a clean filename (e.g. `rice-cooker-white.jpg`)
2. Optimize it: convert to WebP, create sensible sizes (480, 800, 1600px wide)
3. Update the `images[]` array in `src/data/products.ts` with the new `src`, `alt`, `width`, and `height`
4. Use `object-contain` styling — products are never cropped

## How to change business details

Edit `src/config/site.ts` — this is the single source of truth for:

- Business name, tagline
- WhatsApp number, phone, email
- Address, opening hours
- Instagram, Facebook, TikTok handles
- Currency
- `showPrices` switch (default `false`)

## How to edit text

- **Hero headline, tagline:** `src/components/Hero.tsx`
- **Category descriptions:** `src/data/categories.ts`
- **Product descriptions and features:** `src/data/products.ts`
- **Trust points:** `src/components/TrustPoints.tsx`
- **About section:** `src/components/AboutSection.tsx`
- **Contact section:** `src/components/ContactSection.tsx`
- **Legal pages:** `src/pages/Terms.tsx`, `src/pages/Privacy.tsx`, `src/pages/Cookie.tsx`

## How to edit the legal pages

The Terms & Conditions, Privacy Policy, and Cookie Policy are in `src/pages/`. They use draft texts with placeholder details in square brackets (e.g. `[BUSINESS LEGAL NAME]`, `[COUNTRY]`, `[CONTACT EMAIL]`). Replace these with your actual details before going live.

**Important:** These legal texts are well-structured drafts, not legal advice. Please have a local lawyer or a qualified adviser check them before going live.

## Deployment

This site is designed to deploy to **Cloudflare Pages** via GitHub (Phase 2).

1. Push the code to a GitHub repository
2. Connect the repository to Cloudflare Pages
3. Set the build command to `npm run build` and output directory to `dist`
4. Add a `_redirects` file (already in `public/`) for SPA fallback

The `public/_redirects` file contains:
```
/*    /index.html   200
```

## Environment variables

Copy `.env.example` to `.env` and fill in:

```
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

These are used in Phase 2 when the data layer switches to Supabase.

## Key design decisions

- **Showcase only:** No cart, no payments, no customer accounts. Visitors enquire via WhatsApp, phone, or email.
- **Self-hosted fonts:** No Google Fonts — faster and more private.
- **No cookies, no trackers:** No Google Analytics, no Meta Pixel, no embedded maps. No cookie banner needed.
- **Data layer abstraction:** `src/lib/productService.ts` is async and Supabase-ready for Phase 2.
- **Single config file:** All business details in `src/config/site.ts`.
- **Image optimization:** Product images copied to `public/products/`, optimized to WebP with sensible sizes.

## Placeholders to replace

Before going live, replace these placeholders:

- `src/config/site.ts`: WhatsApp number, phone, email, address, opening hours, social handles
- `src/data/products.ts`: Product names, descriptions, prices (if enabling), specs marked `[to be added]`
- Legal pages: `[DATE]`, `[WEBSITE ADDRESS]`, `[BUSINESS LEGAL NAME]`, `[BUSINESS ADDRESS]`, `[COUNTRY]`, `[CONTACT EMAIL]`, `[NUMBER]`, `[PAYMENT METHODS]`, `[DELIVERY AREAS AND CHARGES]`, `[RETENTION PERIOD]`

## Product photos

Source photos are in `C:\my web\wazuka\product pic\` (read-only). Copies are in `public/products/`.

One photo (`clothes hanger.jpeg`) shows a clothes rack, not kitchenware — it was not included as a product.

## Phase 2 (planned, not started)

- Switch data layer from local files to Supabase
- Push to GitHub
- Deploy to Cloudflare Pages
- Add cookieless analytics (if requested)

## Configuration

### WhatsApp number

Edit `src/config/site.ts` — the `whatsappNumber` field sets the phone number used in all WhatsApp links. The number should be in international format without `+` or `00` prefix (e.g. `15551234567` for US numbers). All WhatsApp buttons construct `wa.me/{whatsappNumber}` URLs automatically.

### Logo variant

Edit `src/config/site.ts` — the `logoVariant` field controls which logo is displayed. Currently two variants are supported:

- `'wordmark'` — the default. Shows "WAZUKA" wordmark in deep blue `#0B3D91` with a tiny red accent `#D62839` and "KITCHENWARE" label (hidden on mobile). This is the recommended variant.
- `'square-w'` — shows the original rounded-square "W" logo (for backward compatibility).

To switch variants, set `logoVariant: 'square-w'` in `site.ts`.

### Toggle animations off

Set `ANIMATIONS_OFF=true` in `.env` to disable all page animations (logo entrance, hover effects, scroll progress line, staggered reveals). This is useful for accessibility or performance testing. When animations are off:

- Logo fades in immediately without slide-up entrance
- Hover scale effects are disabled
- Scroll progress line is hidden
- Category tile reveal animations are disabled

All other functionality (navigation, links, contacts) remains fully operational.

## Key design decisions

- **Showcase only:** No cart, no payments, no customer accounts. Visitors enquire via WhatsApp, phone, or email.
- **Self-hosted fonts:** No Google Fonts — faster and more private.
- **No cookies, no trackers:** No Google Analytics, no Meta Pixel, no embedded maps. No cookie banner needed.
- **Data layer abstraction:** `src/lib/productService.ts` is async and Supabase-ready for Phase 2.
- **Single config file:** All business details in `src/config/site.ts`.
- **Image optimization:** Product images copied to `public/products/`, optimized to WebP with sensible sizes.
- **Animation toggle:** Set `ANIMATIONS_OFF=true` in `.env` to disable all animations for accessibility or performance.

## Placeholders to replace

Before going live, replace these placeholders:

- `src/config/site.ts`: WhatsApp number, phone, email, address, opening hours, social handles
- `src/data/products.ts`: Product names, descriptions, prices (if enabling), specs marked `[to be added]`
- Legal pages: `[DATE]`, `[WEBSITE ADDRESS]`, `[BUSINESS LEGAL NAME]`, `[BUSINESS ADDRESS]`, `[COUNTRY]`, `[CONTACT EMAIL]`, `[NUMBER]`, `[PAYMENT METHODS]`, `[DELIVERY AREAS AND CHARGES]`, `[RETENTION PERIOD]`

## Product photos

Source photos are in `C:\my web\wazuka\product pic\` (read-only). Copies are in `public/products/`.

One photo (`clothes hanger.jpeg`) shows a clothes rack, not kitchenware — it was not included as a product.

## Animation toggle

Set `ANIMATIONS_OFF=true` in `.env` to disable all page animations (logo entrance, hover effects, scroll progress line, staggered reveals). This is useful for accessibility or performance testing.
