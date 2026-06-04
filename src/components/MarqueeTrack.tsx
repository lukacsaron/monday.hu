const SPANS = Array.from({ length: 10 }, (_, i) => i);

export function MarqueeTrack() {
  return (
    <div className="marquee__track">
      {[0, 1].map((rep) =>
        SPANS.map((i) => <span key={`${rep}-${i}`}>MONDAY</span>),
      )}
    </div>
  );
}
