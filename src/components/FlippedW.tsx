// The headline "W" is literally Monday's M, rotated 180°. Hover rolls it 360°.
// We render an M and let CSS flip it — keeps the semantic intent of the wordplay.
export function FlippedW() {
  return <span className="flipM">M</span>;
}
