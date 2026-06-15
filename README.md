# Buy Property Mersin

English real estate website for foreign buyers in Mersin, Türkiye.

- **Stack:** Next.js 15 (App Router), TypeScript, Tailwind CSS 4
- **Domain:** [buypropertymersin.com](https://buypropertymersin.com)
- **Repo:** [github.com/scurtel/buypropertymersin.com](https://github.com/scurtel/buypropertymersin.com)

## Local development

```bash
npm install
cp .env.example .env
# Edit .env with your values
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Production server (`0.0.0.0`, uses `PORT` env) |
| `npm run lint` | ESLint |

## Hostinger deploy (Node.js / NCode)

This project runs as a **Node.js application**, not as static files in `public_html`.

Do **not** copy build output into `public_html` manually. Hostinger should pull from GitHub and run the Node.js app.

### 1. Connect GitHub

1. Hostinger hPanel → **Websites** → your domain → **Node.js** (or NCode).
2. Connect repository: `scurtel/buypropertymersin.com`
3. Branch: `main`

### 2. Build & start commands

| Setting | Value |
|---------|--------|
| **Build command** | `npm install && npm run build` |
| **Start command** | `npm run start` |
| **Node.js version** | **20** (or **22** if available on your plan) |
| **Application root** | Repository root (where `package.json` is) |

`npm run start` runs `next start -H 0.0.0.0` and listens on Hostinger’s `PORT` environment variable.

### 3. Environment variables (Hostinger panel)

Set these in the Hostinger Node.js app environment settings (not in the repo):

**Public (rebuild required after change):**

```
NEXT_PUBLIC_SITE_URL=https://buypropertymersin.com
NEXT_PUBLIC_WHATSAPP_NUMBER=905XXXXXXXXX
NEXT_PUBLIC_CONTACT_EMAIL=info@buypropertymersin.com
```

**Server-only (secrets):**

```
GEMINI_API_KEY=your_key
GEMINI_MODEL=gemini-2.5-flash
RESEND_API_KEY=re_xxxxxxxx
CONTACT_TO_EMAIL=info@buypropertymersin.com
CONTACT_FROM_EMAIL=Buy Property Mersin <noreply@buypropertymersin.com>
```

Also set:

```
NODE_ENV=production
```

`NEXT_PUBLIC_*` values are baked in at **build time**. After changing them on Hostinger, trigger a **new deploy/build**.

### 4. Domain

Point `buypropertymersin.com` to the Hostinger Node.js app (not a static `public_html` site). Use hPanel domain / SSL settings for HTTPS.

### 5. Resend email note

`CONTACT_FROM_EMAIL` must use a domain verified in [Resend](https://resend.com). Until `buypropertymersin.com` is verified in Resend, outbound mail may fail; the contact API still accepts leads and logs them.

### 6. Post-deploy checks

- Homepage loads over HTTPS
- `/properties/` and a property detail page
- Contact form → `/api/contact`
- `https://buypropertymersin.com/sitemap.xml`
- `https://buypropertymersin.com/robots.txt`

## Project structure

- `src/app/` — routes and API (`/api/contact`)
- `src/lib/properties.ts` — static listing data
- `src/lib/site.ts` — site config
- `src/lib/leads/` — contact validation, Resend, dev JSON storage
- `src/lib/gemini.ts` — server-side Gemini helpers

## License

Private — Buy Property Mersin.
