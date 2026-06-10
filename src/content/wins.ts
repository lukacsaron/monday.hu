// Single source of truth for the WINS section.
// Editing wins = editing this file and shipping. No CMS.

export type Win = {
  id: string;
  count: number;
  title: string;
  festival: string;
  festivalFull?: string;
  tier?: 'gold' | 'silver';
  year?: number;
};

export const wins: Win[] = [
  { id: 'best-music-video-hmvf',          count: 3, title: 'Best Music Video',               festival: 'HMVF',              festivalFull: 'Hungarian Music Video Festival' },
  { id: 'best-director-hmvf',             count: 3, title: 'Best Director',                  festival: 'HMVF',              festivalFull: 'Hungarian Music Video Festival' },
  { id: 'best-cinematographer-gold-hmvf', count: 2, title: 'Best Cinematographer',           festival: 'HMVF',              festivalFull: 'Hungarian Music Video Festival', tier: 'gold' },
  { id: 'best-image-video-hmvf',          count: 2, title: 'Best Image Video',               festival: 'HMVF',              festivalFull: 'Hungarian Music Video Festival' },
  { id: 'best-mv-cine-zsigmond',          count: 1, title: 'Best Music Video Cinematography', festival: 'ZSIGMOND VILMOS FF', festivalFull: 'Zsigmond Vilmos Film Festival' },
  { id: 'best-mv-europe',                 count: 1, title: 'Best Music Video',               festival: 'EUROPE MV AWARDS',  festivalFull: 'Europe Music Video Awards' },
  { id: 'berlin-best-narrative-2025',     count: 1, title: 'Best Narrative Nominee',         festival: 'BERLIN MV AWARD',   festivalFull: 'Berlin Music Video Award', year: 2025 },
  { id: 'berlin-best-director-2026',      count: 1, title: 'Best Director Nominee',          festival: 'BERLIN MV AWARD',   festivalFull: 'Berlin Music Video Award', year: 2026 },
  { id: 'berlin-best-low-budget-2026',    count: 1, title: 'Best Low Budget',                festival: 'BERLIN MV AWARD',   festivalFull: 'Berlin Music Video Award', year: 2026 },
];

export const winsCopy = {
  note: `Some festivals were kind to us.\nMostly thanks to the artists we worked with.`,
};
