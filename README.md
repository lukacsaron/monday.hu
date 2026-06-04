# monday.hu

Prototype site for MONDAY — Hungarian visual production house. BLOK direction (brutalist B&W).

## Stack
- Next.js 14 (App Router) + TypeScript
- All content in `src/content/*.ts` — typed, ready to swap for a headless CMS (Sanity / Payload / Contentful) when needed.

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
  app/            # Next.js routes + global styles
  components/     # Page sections, reusable bits
  content/        # Site content (single source of truth)
  lib/            # Helpers (placeholder image map)
public/img/       # Footage placeholders 01–08.png
```

## Swapping to a CMS later
Each file in `src/content/` exports a typed value. To wire a CMS, replace those exports with async fetchers (server components already, so `await` works directly). No component changes needed.
