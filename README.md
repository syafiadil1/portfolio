# Syafi Adil — Portfolio

An editorial, motion-rich portfolio for a product engineer and creative developer. The single-page experience uses a paper/ink visual system, interactive project case studies, a capability radar, and a scroll-led experience timeline.

## Stack

- React 19 and Next.js App Router via vinext/Vite
- Tailwind CSS 4
- Framer Motion
- Locally bundled Unbounded and Manrope variable fonts
- Cloudflare-compatible Sites output

## Development

```bash
npm install
npm run dev
```

The main portfolio component is `app/page.tsx`; the global visual system and responsive behavior live in `app/globals.css`.

## Validation

```bash
npm run build
npm run lint
npm run typecheck
npm test
```

All motion includes reduced-motion fallbacks, and pointer-specific interactions fall back to static touch layouts on coarse-pointer devices.
