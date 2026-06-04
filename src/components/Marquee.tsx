import { MarqueeTrack } from './MarqueeTrack';

export function Marquee({ reverse = false }: { reverse?: boolean }) {
  return (
    <div className={`marquee${reverse ? ' rev' : ''}`}>
      <MarqueeTrack />
    </div>
  );
}
