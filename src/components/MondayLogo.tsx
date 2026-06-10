import { MONDAY_PATHS, MONDAY_VIEWBOX } from './mondayPaths';

/**
 * MONDAY wordmark as inline SVG, filled with currentColor. Used in the
 * scrolling marquees in place of the web font. The outline ("hollow") variant
 * is produced by the `#inset-stroke` CSS filter applied to every other logo
 * (see .marquee__track / .tb-track rules), so this component only ever renders
 * the filled glyph — keeping the filled/outline alternation in CSS.
 */
export function MondayLogo({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox={MONDAY_VIEWBOX}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <g fill="currentColor">
        {MONDAY_PATHS.map((d, i) => (
          <path key={i} d={d} />
        ))}
      </g>
    </svg>
  );
}
