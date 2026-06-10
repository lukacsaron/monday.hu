// Single source of truth for the WINS section.
// Editing wins = editing this file and shipping. No CMS.

export type Win = {
  id: string;
  count: number;
  title: string;
  festival: string;
  festivalFull?: string;
  tier?: 'gold' | 'silver';
};

export const wins: Win[] = [
  { id: 'best-music-video-hmvf', count: 3, title: 'Best Music Video',           festival: 'HMVF', festivalFull: 'Hungarian Music Video Festival' },
  { id: 'best-director-hmvf',    count: 3, title: 'Best Director',              festival: 'HMVF', festivalFull: 'Hungarian Music Video Festival' },
  { id: 'best-cine-gold-hmvf',   count: 2, title: 'Best Cinematography',        festival: 'HMVF', festivalFull: 'Hungarian Music Video Festival', tier: 'gold' },
  { id: 'best-cine-silver-hmvf', count: 2, title: 'Best Cinematography',        festival: 'HMVF', festivalFull: 'Hungarian Music Video Festival', tier: 'silver' },
  { id: 'best-image-video-hmvf', count: 2, title: 'Best Image Video',           festival: 'HMVF', festivalFull: 'Hungarian Music Video Festival' },
  { id: 'best-mv-cine-zsigmond', count: 1, title: 'Best MV Cinematography',     festival: 'ZSIGMOND VILMOS FF', festivalFull: 'Zsigmond Vilmos Film Festival' },
  // TODO(content): confirm full list of international wins
  { id: 'best-mv-london',        count: 1, title: 'Best Music Video',           festival: 'LONDON' },
  { id: 'best-mv-kosice',        count: 1, title: 'Best Music Video',           festival: 'KOSICE' },
];

export const winsCopy = {
  note: `Some festivals were kind to us.\nMostly thanks to the artists we worked with.`,
};
