# monday.hu

Production site for **MONDAY** — a five-person film crew in Budapest. Music videos, commercials, service-crew productions.

## Stack
- Next.js 15 (App Router) + TypeScript
- All content lives in `src/content/*.ts` — typed, ready to swap for a headless CMS (Sanity / Payload / Contentful) when needed.

## Local dev
```bash
npm install
npm run dev
# http://localhost:3000
```

## Docker
```bash
docker compose up --build
# http://localhost:3000
```

## Structure
```
src/
  app/            # Next.js routes, global styles, favicon, metadata
  components/     # Page sections + reusable bits
  content/        # Site content (single source of truth)
public/
  img/            # Footage and YouTube thumbnails
  brand/          # Brand marks (SVG, PNG)
```

## Swapping to a CMS later
Each file in `src/content/` exports a typed value. To wire a CMS, replace those exports with async fetchers — components are server components by default, so `await` works directly. No component changes needed.
