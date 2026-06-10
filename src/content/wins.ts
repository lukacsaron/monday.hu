// Single source of truth for the WINS section.
// Editing wins = editing this file and shipping. No CMS.

export type Win = {
  id: string;
  count: number;
  title: string;
  festival: string;
  tier?: 'gold' | 'silver';
  year?: number;
  nominated?: boolean;
};

export const wins: Win[] = [
  { id: 'best-music-video-hmvf',          count: 3, title: 'Best Music Video',                festival: 'Hungarian Music Video Festival' },
  { id: 'best-director-hmvf',             count: 3, title: 'Best Director',                   festival: 'Hungarian Music Video Festival' },
  { id: 'best-cinematographer-gold-hmvf', count: 2, title: 'Best Cinematographer',            festival: 'Hungarian Music Video Festival', tier: 'gold' },
  { id: 'best-image-video-hmvf',          count: 2, title: 'Best Image Video',                festival: 'Hungarian Music Video Festival' },
  { id: 'best-mv-cine-zsigmond',          count: 1, title: 'Best Music Video Cinematography', festival: 'Zsigmond Vilmos Film Festival' },
  { id: 'best-mv-europe',                 count: 1, title: 'Best Music Video',                festival: 'Europe Music Video Awards' },
  { id: 'berlin-best-narrative-2025',     count: 1, title: 'Best Narrative Nominee',          festival: 'Berlin Music Video Award', year: 2025, nominated: true },
  { id: 'berlin-best-director-2026',      count: 1, title: 'Best Director Nominee',           festival: 'Berlin Music Video Award', year: 2026, nominated: true },
  { id: 'berlin-best-low-budget-2026',    count: 1, title: 'Best Low Budget',                 festival: 'Berlin Music Video Award', year: 2026 },
];

export const winsCopy = {
  note: `Some festivals were kind to us.\nMostly thanks to the artists we worked with.`,
};
