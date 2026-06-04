export type Work = {
  id: string;
  art: string;
  tracks: string;
  span: 's7' | 's5' | 's4';
  height: 'h-tall' | 'h-mid' | 'h-sm';
  code: string;
  image: string;
};

export const works: Work[] = [
  { id: 'pogany-indulo', art: 'POGÁNY INDULÓ', tracks: '½ · 2/2 · LELKEM NYUGODJ · ÚGY HISZEM', span: 's7', height: 'h-tall', code: 'MV·001', image: '/img/01.png' },
  { id: 'betonhofi', art: 'BETONHOFI', tracks: 'beton.hof1', span: 's5', height: 'h-tall', code: 'MV·002', image: '/img/02.png' },
  { id: 'dzsudlo', art: 'DZSUDLÓ', tracks: 'sötét', span: 's5', height: 'h-mid', code: 'MV·003', image: '/img/05.png' },
  { id: 'anubiss', art: 'ANUBISS', tracks: 'emelem a tetőt', span: 's7', height: 'h-mid', code: 'MV·004', image: '/img/08.png' },
  { id: 'kocsi-hu', art: 'KOCSI.HU', tracks: 'brand spot', span: 's4', height: 'h-sm', code: 'AD·005', image: '/img/03.png' },
  { id: 'followtheflow', art: 'FOLLOWTHEFLOW', tracks: 'official video', span: 's4', height: 'h-sm', code: 'MV·006', image: '/img/04.png' },
  { id: 'more', art: '+ MORE WORK', tracks: 'coming soon', span: 's4', height: 'h-sm', code: '···', image: '/img/07.png' },
];

export const heroCuts: { label: string; image: string }[] = [
  { label: 'POGÁNY INDULÓ', image: '/img/01.png' },
  { label: 'BETONHOFI', image: '/img/02.png' },
  { label: 'DZSUDLÓ', image: '/img/05.png' },
  { label: 'ANUBISS', image: '/img/08.png' },
  { label: 'KOCSI.HU', image: '/img/03.png' },
  { label: 'FOLLOWTHEFLOW', image: '/img/04.png' },
];

export const reelStripImage = '/img/08.png';
