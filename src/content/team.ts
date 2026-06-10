export type Member = {
  id: string;
  name: string;
  role: string;
  bio: string;
  images: string[];
  link?: string;
};

export const team: Member[] = [
  {
    id: 'buki',
    name: 'Balázs Büki',
    role: 'DIRECTOR',
    bio: 'Always chasing the next big idea. Usually finds it somewhere between a daydream and a shooting schedule. Has collected a suspicious number of music video awards along the way.',
    images: ['/img/team/buki.jpg'],
    link: 'https://bukibalazs.com/',
  },
  {
    id: 'deak',
    name: 'Kristóf M. Deák',
    role: 'DOP',
    bio: 'Years of experience, countless productions, and a talent for making any set feel like home — from major international shoots to fast-moving indie crews.',
    images: ['/img/team/deak.jpg'],
    link: 'https://www.kristofmdeak.com/',
  },
  {
    id: 'repassy',
    name: 'Márton Répássy',
    role: 'PRODUCER',
    bio: "Constantly in motion. If he's not solving a production problem, he's probably cooking or looking for the IQOS he was holding a second ago.",
    images: ['/img/team/repassy.jpg'],
  },
  {
    id: 'soos',
    name: 'Géza Soós',
    role: 'DIRECTOR / DOP / PHOTOGRAPHER',
    bio: "Collects visual jobs like side quests. If it involves a camera, chances are he's already doing it.",
    images: ['/img/team/soos.jpg'],
    link: 'https://www.instagram.com/soos.geza/',
  },
  {
    id: 'kozma',
    name: 'Leó Kozma',
    role: 'EDITOR / VFX / AI',
    bio: "Magician. If it wasn't shot, he'll make it appear. If it was shot, he'll make it better.",
    images: ['/img/team/kozma.jpg'],
  },
];

export const weAreCopy = {
  blurb:
    'Built for anything from full-scale productions to fast-moving travel shoots. We work both as a service crew and on-location team, mostly creating music videos and commercials. We move fast, stay flexible, solve problems before they become problems — and somehow keep the mood good while doing it.',
};
