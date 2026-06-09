/**
 * Global SVG filter defs.
 *
 * `#inset-stroke` produces a true inset stroke for HTML text:
 *   1. feMorphology erodes the filled glyph inward by `radius` px.
 *   2. feComposite "out" keeps only the SourceGraphic where the eroded
 *      version is NOT present → i.e. the outer ring of the original glyph.
 *
 * Result: the outline lives entirely INSIDE the natural glyph bounds, so
 * outlined and filled letters have the exact same outer height. No outward
 * overshoot, no SVG text-rendering quirks.
 */
export function SvgFilters() {
  return (
    <svg
      width="0"
      height="0"
      style={{ position: 'absolute', pointerEvents: 'none' }}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <filter id="inset-stroke" x="0" y="0" width="100%" height="100%">
          <feMorphology operator="erode" radius="1" in="SourceGraphic" result="eroded" />
          <feComposite in="SourceGraphic" in2="eroded" operator="out" />
        </filter>
        <filter id="inset-stroke-thin" x="0" y="0" width="100%" height="100%">
          <feMorphology operator="erode" radius="0.5" in="SourceGraphic" result="eroded" />
          <feComposite in="SourceGraphic" in2="eroded" operator="out" />
        </filter>
      </defs>
    </svg>
  );
}
