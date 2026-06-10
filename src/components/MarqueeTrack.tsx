import { MondayLogo } from './MondayLogo';

const SPANS = Array.from({ length: 10 }, (_, i) => i);

export function MarqueeTrack() {
  return (
    <div className="marquee__track">
      {[0, 1].map((rep) =>
        SPANS.map((i) => (
          <MondayLogo
            key={`${rep}-${i}`}
            className="mlogo"
            variant={i % 2 === 0 ? 'fill' : 'outline'}
          />
        )),
      )}
    </div>
  );
}
