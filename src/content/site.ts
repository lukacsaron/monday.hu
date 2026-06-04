// Single source of truth for global site content.
// When wiring a headless CMS later, replace these exports with async fetchers.

export const site = {
  brand: 'MONDAY',
  tagline: 'We make the picture louder than the sound.',
  services: ['Music videos', 'Commercials', 'Films'],
  location: 'BUDAPEST · HU',
  recLabel: 'REC · SHOWREEL 2026',
  contactEmail: 'hello@monday.hu',
  socials: [
    { label: '✉ HELLO@MONDAY.HU', href: 'mailto:hello@monday.hu' },
    { label: '◎ INSTAGRAM', href: '#' },
    { label: '♫ TIKTOK', href: '#' },
    { label: '▶ YOUTUBE', href: 'https://www.youtube.com/@mondayforcollective' },
  ],
  footerMeta: ['MONDAY VISUAL HOUSE', 'BUDAPEST · HUNGARY', '© 2026 — ALL RIGHTS LOOP'],
  footStrip: ['MONDAY © 2026', 'BUDAPEST 47.4979° N', 'BLOK / V1 — BRUTALIST'],
  youtubeUrl: 'https://www.youtube.com/@mondayforcollective',
  youtubeHandle: '@MONDAYFORCOLLECTIVE',
} as const;

export type NavItem = { label: string; href: string; variant: 'outline' | 'light' };

export const navItems: NavItem[] = [
  { label: 'WORK', href: '#work', variant: 'outline' },
  { label: 'WERK', href: '#werk', variant: 'light' },
  { label: 'WE ARE', href: '#weare', variant: 'outline' },
  { label: 'WORD', href: '#word', variant: 'light' },
];
