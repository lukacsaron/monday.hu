export type Werk = {
  id: string;
  art: string;
  code: string;
  image: string;
  youtubeId: string;
  youtubeUrl: string;
};

const yt = (id: string) => ({
  youtubeId: id,
  youtubeUrl: `https://www.youtube.com/watch?v=${id}`,
  image: `/img/works/${id}.jpg`,
});

export const werks: Werk[] = [
  { id: 'werk-egy-ketto',   art: 'EGY/KETTŐ',        code: 'WERK·01', ...yt('pHCASVmHiJw') },
  { id: 'werk-ketto-ketto', art: 'KETTŐ/KETTŐ',      code: 'WERK·02', ...yt('1XpDbdHbkb0') },
  { id: 'werk-lelkem',      art: 'LELKEM, NYUGODJ!', code: 'WERK·03', ...yt('lnjBTQtFNmY') },
];
