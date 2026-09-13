# monday.hu

Production site for **MONDAY**, a five-person film crew in Budapest. Music videos, commercials and service-crew work.

## Who they are

MONDAY shoot music videos for Hungarian rap and pop acts (BETON.HOFI, Dzsúdló, Pogány Induló, ANUBII$), commercials, and service-crew productions for foreign teams shooting in Hungary. Between them they hold a stack of Hungarian Music Video Festival awards plus wins at the Zsigmond Vilmos Film Festival and the Europe Music Video Awards.

The site is one page in four movements: **WORK**, **WHATS BEHIND** (behind-the-scenes), **WE ARE** (the crew) and **WORD** (contact).

## Design notes

The work grid is deliberately irregular. Each entry carries a `span` and a `height` and the tiles pack into an asymmetric mosaic rather than a uniform grid, so the page reads like a contact sheet. Each has a catalogue code (`MV·005`) and opens a YouTube modal in place.

The logo animates on entry via an SVG mask, there is a marquee that never quite settles, and the whole thing runs dark.

## Content model

Everything editable lives in `src/content/*.ts` as typed exports:

```
site.ts    brand, socials, per-person contact details
works.ts   the work grid, each entry a YouTube id + layout hints
werks.ts   behind-the-scenes items
team.ts    the five crew members
wins.ts    awards, with counts and tiers
```

Editing the site means editing one of those files and deploying. That was the call at build time: five people, a handful of updates a year, and no appetite for a CMS subscription.

### Swapping to a CMS later

Each file exports a typed value. Replace the exports with async fetchers pointed at Sanity, Payload or Contentful. Components are React Server Components by default, so `await` works directly in them. No component changes needed, and the types keep the shape honest.

## Run it

```bash
npm install
npm run dev
# http://localhost:3000
```

```bash
docker compose up --build
```

## Stack

Next.js 15 (App Router), TypeScript, React Server Components, CSS Modules. No UI library.

## Structure

```
src/
  app/            routes, global styles, favicon, metadata
  components/     page sections and reusable bits
  content/        site content, single source of truth
public/
  img/            stills and YouTube thumbnails
  brand/          brand marks (SVG, PNG)
```

## License

Code is MIT. The MONDAY name, the films, the stills and the crew photographs belong to MONDAY.
