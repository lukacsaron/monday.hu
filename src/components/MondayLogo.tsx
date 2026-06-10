import { MONDAY_OUTLINE_PATHS, MONDAY_PATHS, MONDAY_VIEWBOX } from './mondayPaths';

/**
 * MONDAY wordmark as inline SVG, drawn with currentColor. Used in the scrolling
 * marquees in place of the web font. The outline ("hollow") variant uses a
 * separate pre-inset path set so the outer bounds match the filled glyph —
 * the marquee tracks alternate `fill` and `outline` to produce the hollow/solid
 * pattern with no runtime SVG filter.
 */
export function MondayLogo({
  className,
  variant = 'fill',
}: {
  className?: string;
  variant?: 'fill' | 'outline';
}) {
  const isOutline = variant === 'outline';
  const paths = isOutline ? MONDAY_OUTLINE_PATHS : MONDAY_PATHS;
  return (
    <svg
      className={className}
      viewBox={MONDAY_VIEWBOX}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <g
        fill={isOutline ? 'none' : 'currentColor'}
        stroke={isOutline ? 'currentColor' : undefined}
        strokeWidth={isOutline ? 2 : undefined}
      >
        {paths.map((d, i) => (
          <path key={i} d={d} />
        ))}
      </g>
    </svg>
  );
}
