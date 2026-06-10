export type Werk = {
  id: string;
  art: string;
  artist: string;
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
  { id: 'werk-emelem',      art: 'EMELEM A TÉTET',  artist: 'ANUBII$ × BETON.HOFI × CO LEE', code: 'WERK·01', ...yt('3KQlp0tTzoI') },
  { id: 'werk-lelkem',      art: 'LELKEM, NYUGODJ!', artist: 'POGÁNY INDULÓ',                 code: 'WERK·02', ...yt('lnjBTQtFNmY') },
  { id: 'werk-ketto-ketto', art: 'KETTŐ/KETTŐ',      artist: 'POGÁNY INDULÓ',                 code: 'WERK·03', ...yt('1XpDbdHbkb0') },
  { id: 'werk-egy-ketto',   art: 'EGY/KETTŐ',        artist: 'POGÁNY INDULÓ',                 code: 'WERK·04', ...yt('pHCASVmHiJw') },
];
