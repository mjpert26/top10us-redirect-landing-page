# Top10US → Big Think Capital application landing page

A single-page funding application for leads referred by **Top10US**. Top10US
collects a short lead form and POSTs it to our n8n intake webhook, which creates
a Salesforce Lead, stamps it with a unique token, and returns a personalized
link. That link opens **this** page with `?token=…`; the page looks the lead up,
**pre-fills** everything we already know, lets the applicant finish the rest, and
submits the completed application back onto the same Lead.

```
Top10US form ──POST──▶ n8n intake  ──▶ create SF Lead + token ──▶ returns applicationUrl
                                                                        │
applicant clicks link ▼
   this page  ──GET /top10us-lookup?token──▶ prefill fields (non-sensitive)
              ──POST /top10us-submit────────▶ PATCH the Lead with the full app
```

## Tech stack

- **Vite + React 18 + TypeScript**
- **Tailwind CSS v4** (via `@tailwindcss/vite`)
- **Framer Motion** for section/hero animations
- Static output — deploys to any static host (Vercel config included)

## Getting started

```bash
npm install
cp .env.example .env      # then fill in the webhook URLs
npm run dev               # http://localhost:5173/?token=<a-test-token>
npm run build             # type-check + production build to dist/
npm run preview           # serve the built site locally
```

Open the app with a `?token=` query param to exercise the prefill flow. Without
a token (or with an unknown one) the form still loads empty so no one hits a
dead end.

## Configuration (env vars)

All `VITE_*` vars are inlined into the client bundle at build time — **never put
secrets here.** The token in the URL is the only credential.

| Var | Purpose |
|---|---|
| `VITE_LOOKUP_URL` | n8n GET webhook that returns prefill fields for a token |
| `VITE_SUBMIT_URL` | n8n POST webhook that receives the completed application |
| `VITE_LOGO_URL` | Optional. Header/footer logo (defaults to BTC's hosted logo) |

## Branding & design

The look mirrors **lp.bigthinkcapital.com**: white theme, blue (`#2563EB`)
primary with teal/green accents, and the same React Bits components
(`GradientText`, `ShinyText`, `SpotlightCard` in [`src/components/reactbits/`](src/components/reactbits)).

- **Logo** — the official BTC logo via `VITE_LOGO_URL` (see [`src/brand/Logo.tsx`](src/brand/Logo.tsx)); favicons in `public/`.
- **Trust badges & stats** — BBB / Google / Trustpilot and headline stats in [`src/brand/brand.ts`](src/brand/brand.ts).
- **Colors / fonts** — CSS variables in [`src/index.css`](src/index.css) (`@theme`); Inter is self-hosted via `@fontsource-variable/inter`.
- **Contact** — [`src/brand/brand.ts`](src/brand/brand.ts) or the `VITE_SUPPORT_*` env vars.

## Field model

The form fields live in [`src/config/fields.ts`](src/config/fields.ts). The
friendly `key` of each field intentionally matches the normalize/mapping
dictionary in the n8n **`Affiliate - top10us.com`** intake workflow so the same
mapping can be reused server-side. Each field records its Salesforce Lead API
name, whether it may be prefilled, and whether it's sensitive.

**Sensitive fields (SSN, date of birth) are collected here only and must never
be returned by the lookup endpoint.**

## Webhook contracts (n8n)

These are implemented in n8n (separate from this repo). Both endpoints are
public and protected only by the unguessable token; both must send permissive
CORS headers for the landing domain and answer `OPTIONS` preflight.

### `GET {VITE_LOOKUP_URL}?token=<token>`
```jsonc
// 200 — match
{ "found": true, "lead": { "firstname": "Jane", "company": "Acme LLC", "amountrequested": 50000 /* …non-sensitive prefill keys… */ } }
// 404 — no match
{ "found": false }
```

### `POST {VITE_SUBMIT_URL}`
```jsonc
// request
{ "token": "<token>", "firstname": "Jane", "ein": "123456789", "ssn": "…", /* …all provided fields… */ }
// 200
{ "status": "ok" }
// 4xx/5xx
{ "status": "error", "detail": "human-readable message" }
```

Values are sent lightly normalized (digits only for currency/phone/SSN/EIN); the
submit workflow re-maps friendly keys to Salesforce Lead fields and PATCHes the
Lead identified by the token.

## Deployment

Included [`vercel.json`](vercel.json) builds with Vite and rewrites all routes to
`index.html`. For other hosts: run `npm run build` and serve `dist/` as a static
SPA (all paths → `index.html`). Set the `VITE_*` env vars in the host's build
settings and point the token link's base URL at the deployed domain.
