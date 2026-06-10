// Single source of truth for global site content.
// When wiring a headless CMS later, replace these exports with async fetchers.

export const site = {
  brand: 'MONDAY',
  services: ['Music videos', 'Commercials', 'Service crew'],
  recLabel: 'REC · SHOWREEL 2026',
  contactEmail: 'hello@monday.hu',
  socials: [
    { label: '✉ HELLO@MONDAY.HU', href: 'mailto:hello@monday.hu' },
    { label: '◎ INSTAGRAM', href: 'https://www.instagram.com/monnndayyy/' },
    { label: '♫ TIKTOK', href: 'https://www.tiktok.com/@monday.monday.mon2' },
    { label: '▶ YOUTUBE', href: 'https://www.youtube.com/@mondayforcollective' },
  ],
  footerMeta: ['MONDAY VISUAL HOUSE', '© 2026 — ALL RIGHTS LOOP'],
  footStrip: ['MONDAY © 2026', 'HELLO@MONDAY.HU'],
  youtubeUrl: 'https://www.youtube.com/@mondayforcollective',
  youtubeHandle: '@MONDAYFORCOLLECTIVE',
} as const;

export type NavItem = { label: string; href: string; variant: 'outline' | 'light' };

export const navItems: NavItem[] = [
  { label: 'WORK', href: '#work', variant: 'outline' },
  { label: 'WHATS BEHIND', href: '#werk', variant: 'light' },
  { label: 'WE ARE', href: '#weare', variant: 'outline' },
  { label: 'WORD', href: '#word', variant: 'light' },
];
