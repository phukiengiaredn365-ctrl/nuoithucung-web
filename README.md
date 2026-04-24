# NuoiThuCung.com — PetCare Knowledge & Affiliate Hub

Next.js 14 (App Router) + Tailwind CSS + WordPress Headless CMS (via WPGraphQL).
Designed to reproduce the provided mockup 1:1, fully responsive, and deploy-ready
for cPanel Node.js (standalone) or static export on Apache shared hosting.

## Stack

- **Next.js 14** (App Router, React 18, Server Components by default)
- **Tailwind CSS** with mandated design tokens (`brand.orange`, `brand.teal`,
  `brand.yellow`, `brand.azure`, `brand.brown`)
- **Typography**: Playfair Display (serif, headings) + Be Vietnam Pro (sans,
  body/nav) via `next/font/google`
- **Icons**: `lucide-react`
- **Data layer**: `graphql-request` against WPGraphQL, with typed mock data
  fallback so the site renders without a live backend

## Getting started

```bash
cp .env.example .env.local
npm install
npm run dev
```

Open <http://localhost:3000>.

### Environment variables

| Name                  | Description                                               |
| --------------------- | --------------------------------------------------------- |
| `WP_GRAPHQL_ENDPOINT` | Your WordPress WPGraphQL endpoint (e.g. `https://…/graphql`). Leave empty to use mock data. |
| `WP_GRAPHQL_AUTH_HEADER` | Optional `Authorization:` header value (e.g. `Bearer …`). |
| `NEXT_OUTPUT`         | `standalone` (default, cPanel Node) or `export` (static).  |
| `NEXT_PUBLIC_SITE_URL`| Canonical site URL. Used for metadata and sitemap.         |

## Project structure

```
src/
├── app/
│   ├── layout.tsx              # Root — Header + Footer + fonts
│   ├── page.tsx                # Home — 4 sections from the mockup
│   ├── goc-cun-cung/           # Category: Góc Cún Cưng
│   ├── goc-meo-cung/           # Category: Góc Mèo Cưng
│   ├── pet-tech/               # Category: Pet Tech
│   ├── cam-nang/               # Category: Cẩm nang
│   └── san-deal/               # Category: Săn Deal
├── components/
│   ├── layout/                 # Header, DesktopNav, MobileMenu, Footer, Newsletter
│   ├── home/                   # StoryCarousel, DeepReading, TopPicks, TinTucTongHop
│   ├── category/               # CategoryHero, FeaturedPost, PostGrid, Sidebar
│   └── ui/                     # Tag, PostCard, ProductCard
└── lib/
    ├── types.ts                # Post / Product / Story / MenuItem
    ├── menu.ts                 # Top-nav config (symmetrical mega-menu)
    ├── categories.ts           # WordPress-category → internal slug map
    ├── mock-data.ts            # Matches the mockup 1:1
    ├── wp.ts                   # Thin WPGraphQL client with mock fallback
    └── affiliate.ts            # Last-click cookie + Shopee/TikTok deep-links
```

## Deploy — cPanel Node.js (standalone)

1. On your VM / locally, build:
   ```bash
   npm ci
   npm run build
   ```
2. Next writes a self-contained server into `.next/standalone`. Also copy
   `public/` and `.next/static` into that folder.
   ```bash
   cp -r public .next/standalone/
   cp -r .next/static .next/standalone/.next/
   ```
3. Zip `.next/standalone/` and upload to your cPanel account.
4. In cPanel → **Setup Node.js App**:
   - Application root: path to the uploaded folder
   - Startup file: `server.js`
   - Node version: 18 or 20
   - Application mode: `production`
5. Set environment variables in the same screen (`WP_GRAPHQL_ENDPOINT` etc.).
6. Click **Restart**. cPanel proxies requests to Node; the included
   `public/.htaccess` adds compression and long-cache headers.

### Static export mode

If you only have shared Apache hosting (no Node):

```bash
NEXT_OUTPUT=export npm run build
```

Upload the contents of `out/` to `public_html/`. The bundled `.htaccess`
handles pretty-URL rewrites and gzip.

## Deviations / TODO

- Real WordPress categories need to be created under the slugs in
  `src/lib/categories.ts`; `src/lib/wp.ts` has the fetcher stubs wired up and
  will transparently switch from mock data to live data once
  `WP_GRAPHQL_ENDPOINT` is set.
- Story modal (full-screen player) is stubbed with a hash link. Wire it to a
  real video CPT + modal when the Story data source is ready.
- `ProductCard` deep-links to `shopee://product/…` on mobile; replace the
  placeholder `shopeeAppUrl` in `mock-data.ts` with your actual affiliate
  product deep-links.
