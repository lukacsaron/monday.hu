export type Member = { id: string; name: string; role: string; bio: string; image: string };

export const team: Member[] = [
  { id: 'm1', name: '[NAME 01]', role: 'DIRECTOR / DOP', bio: 'Still staring at the monitor at 3am. In love with the fog machine.', image: '/img/02.png' },
  { id: 'm2', name: '[NAME 02]', role: 'PRODUCER', bio: 'Has a plan B through Z. Runs entirely on coffee.', image: '/img/06.png' },
  { id: 'm3', name: '[NAME 03]', role: 'EDITOR / COLOR', bio: "Recuts a shot 400 times before it's right. Sometimes 401.", image: '/img/04.png' },
  { id: 'm4', name: '[NAME 04]', role: 'GAFFER', bio: 'If it lights up, they touched it. Lives in cables.', image: '/img/08.png' },
  { id: 'm5', name: '[NAME 05]', role: '1ST AC / DRONE', bio: 'Everything looks better from the air. Not bad on the ground either.', image: '/img/01.png' },
];

export const weAreCopy = {
  blurb: 'Big productions, tiny travel kits — and everything in between.',
  note: 'On location or in the studio.\nWhatever the shot needs.',
};
