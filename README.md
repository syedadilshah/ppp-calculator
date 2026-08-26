# PPP Calculator

SEO-first Next.js PPP calculator site with World Bank-backed purchasing-power calculations.

## Production setup

1. Use Node.js 22+.
2. Run `npm install`.
3. Copy `.env.example` to `.env.local` and set the real production domain and contact email.
4. Run `npm run data:update` on a network-enabled machine to refresh World Bank data.
5. Run `npm run test:ppp` and `npm run typecheck`.
6. Run `npm run build`.
7. Deploy with `npm run start`, Vercel, or another compatible Next.js platform.

## Environment

- `NEXT_PUBLIC_SITE_URL` — canonical production origin, e.g. `https://example.com`
- `NEXT_PUBLIC_CONTACT_EMAIL` — public support/contact email

## Data

- Household/private-consumption PPP: `PA.NUS.PRVT.PP`
- GDP PPP: `PA.NUS.PPP`
- Source: World Bank API V2

The site calculates from a validated local snapshot, not a live World Bank request on every user interaction. `scripts/update-ppp-data.ts` refreshes the snapshot and retains the previous valid dataset when validation fails.

## SEO

- Unique page metadata and self canonicals
- Server-rendered supporting content
- Programmatic `/sitemap.xml`
- Programmatic `/robots.txt`
- Breadcrumb and WebApplication JSON-LD on calculator pages
- Query parameters are not included in the sitemap
- Clean trailing-slash URL policy

## Core routes

- `/`
- `/ppp-salary-calculator/`
- `/india-vs-usa-ppp-calculator/`
- `/aed-to-inr-ppp-calculator/`
- `/euro-to-inr-ppp-calculator/`
- `/ppp-calculator-by-country/`
- `/gdp-ppp-calculator/`
- `/methodology/`
- `/data-sources/`
- `/about/`
- `/contact/`
- `/privacy-policy/`
- `/terms/`
