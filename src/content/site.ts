// Single source of truth for global site content.
// When wiring a headless CMS later, replace these exports with async fetchers.

export const site = {
  brand: 'MONDAY',
  services: ['Music videos', 'Commercials', 'Service crew'],
  socials: [
    { label: '◎ INSTAGRAM', href: 'https://www.instagram.com/monnndayyy/' },
    { label: '♫ TIKTOK', href: 'https://www.tiktok.com/@monday.monday.mon2' },
    { label: '▶ YOUTUBE', href: 'https://www.youtube.com/@mondayforcollective' },
  ],
  footerMeta: ['HELLO@MONNNDAYYY.COM', '© 2026 — ALL RIGHTS LOOP'],
  youtubeUrl: 'https://www.youtube.com/@mondayforcollective',
  youtubeHandle: '@MONDAYFORCOLLECTIVE',
} as const;

export type ContactLink = { prefix: string; label: string; href: string };
export type Contact = { name: string; role: string; links: ContactLink[] };

export const contacts: Contact[] = [
  {
    name: 'Márton Répássy',
    role: 'Producer',
    links: [
      { prefix: '✉', label: 'marton@monnndayyy.com', href: 'mailto:marton@monnndayyy.com' },
      { prefix: '☎', label: '+36 30 472 9232', href: 'tel:+36304729232' },
      { prefix: '◎', label: '@martonrepassy', href: 'https://www.instagram.com/martonrepassy/' },
    ],
  },
  {
    name: 'Balázs Büki',
    role: 'Director',
    links: [
      { prefix: '✉', label: 'bukibalazsmate@gmail.com', href: 'mailto:bukibalazsmate@gmail.com' },
      { prefix: '☎', label: '+36 30 295 0925', href: 'tel:+36302950925' },
      { prefix: '◎', label: '@bukibalazsmate', href: 'https://www.instagram.com/bukibalazsmate/' },
      { prefix: '↗', label: 'bukibalazs.com', href: 'https://bukibalazs.com/' },
    ],
  },
];

export type NavItem = { label: string; href: string; variant: 'outline' | 'light' };

export const navItems: NavItem[] = [
  { label: 'WORK', href: '#work', variant: 'outline' },
  { label: 'WHATS BEHIND', href: '#werk', variant: 'light' },
  { label: 'WE ARE', href: '#weare', variant: 'outline' },
  { label: 'WORD', href: '#word', variant: 'light' },
];
