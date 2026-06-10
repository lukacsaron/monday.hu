export type Work = {
  id: string;
  art: string;
  tracks: string;
  span: 's12' | 's8' | 's7' | 's6' | 's5' | 's4' | 's3';
  height: 'h-tall' | 'h-mid' | 'h-sm';
  code: string;
  image: string;
  youtubeId?: string;
  youtubeUrl?: string;
};

const yt = (id: string) => ({
  youtubeId: id,
  youtubeUrl: `https://www.youtube.com/watch?v=${id}`,
  image: `/img/works/${id}.jpg`,
});

export const works: Work[] = [
  { id: 'betonhofi',          art: 'BETON.HOFI',      tracks: 'BETON.HOF1',                                 span: 's7',  height: 'h-tall', code: 'MV·005', ...yt('PIi0NCqnLjc') },
  { id: 'dzsudlo',            art: 'DZSÚDLÓ',         tracks: 'SÖTÉT',                                      span: 's5',  height: 'h-tall', code: 'MV·006', ...yt('2EHZKyo2teI') },
  { id: 'anubiis',            art: 'ANUBII$',         tracks: 'EMELEM A TÉTET · w/ BETON.HOFI × CO LEE',    span: 's5',  height: 'h-mid',  code: 'MV·007', ...yt('oXDsYLXIcnI') },
  { id: 'pogany-lelkem',      art: 'POGÁNY INDULÓ',   tracks: 'LELKEM, NYUGODJ!',                           span: 's7',  height: 'h-mid',  code: 'MV·003', ...yt('xwXfPg_vEUo') },
  { id: 'pogany-ketto-ketto', art: 'POGÁNY INDULÓ',   tracks: 'KETTŐ/KETTŐ',                                span: 's7',  height: 'h-mid',  code: 'MV·002', ...yt('dRWjo7gUets') },
  { id: 'pogany-egy-ketto',   art: 'POGÁNY INDULÓ',   tracks: 'EGY/KETTŐ',                                  span: 's5',  height: 'h-mid',  code: 'MV·001', ...yt('SDHQwhNISck') },
  { id: 'pogany-ugy-hiszem',  art: 'POGÁNY INDULÓ',   tracks: 'ÚGY HISZEM',                                 span: 's8',  height: 'h-mid',  code: 'MV·004', ...yt('1SbBcw84Pkw') },
  { id: 'followtheflow',      art: 'FOLLOW THE FLOW', tracks: 'ÍGY VAGYOK SZABAD',                          span: 's4',  height: 'h-mid',  code: 'MV·008', ...yt('4SUujEG8OwY') },
];

export const heroCuts: { label: string; image: string }[] = [
  { label: 'POGÁNY INDULÓ',   image: '/img/works/SDHQwhNISck.jpg' },
  { label: 'BETON.HOFI',      image: '/img/works/PIi0NCqnLjc.jpg' },
  { label: 'DZSÚDLÓ',         image: '/img/works/2EHZKyo2teI.jpg' },
  { label: 'ANUBII$',         image: '/img/works/oXDsYLXIcnI.jpg' },
  { label: 'FOLLOW THE FLOW', image: '/img/works/4SUujEG8OwY.jpg' },
  { label: 'POGÁNY INDULÓ',   image: '/img/works/1SbBcw84Pkw.jpg' },
];
