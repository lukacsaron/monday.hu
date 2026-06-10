import { MONDAY_PATHS, MONDAY_VIEWBOX } from './mondayPaths';

/**
 * MONDAY wordmark as a CSS mask over an empty div whose only purpose is to
 * carry a `backdrop-filter`. The filter samples the hero video/veil that sit
 * behind the element, and the mask reveals that filtered backdrop only
 * inside the letter shapes — so the wordmark looks "cut out of" the video.
 *
 * Must be rendered as a sibling of <video.hero__video /> and <div.hero__veil />,
 * NOT inside .hero__inner — .hero__inner creates a stacking context (z-index: 3),
 * and `backdrop-filter` can only see backdrops painted in its own stacking context.
 */
const SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${MONDAY_VIEWBOX}"><g fill="#fff">${MONDAY_PATHS.map((d) => `<path d="${d}"/>`).join('')}</g></svg>`;
const MASK_URL = `url("data:image/svg+xml,${encodeURIComponent(SVG)}")`;

export type HeroFx = 'blur' | 'invert' | 'contrast';

export function HeroLogoMask({ variant }: { variant: HeroFx }) {
  return (
    <div
      className={`hero__logo-mask hero__logo-mask--${variant}`}
      style={{ WebkitMaskImage: MASK_URL, maskImage: MASK_URL }}
      role="img"
      aria-label="MONDAY"
    />
  );
}
