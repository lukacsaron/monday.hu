import Image from 'next/image';
import type { CSSProperties } from 'react';

type Props = {
  src: string;
  className?: string;
  style?: CSSProperties;
  /** Sets next/image `priority` for above-the-fold images. */
  priority?: boolean;
  /**
   * next/image `sizes` hint for responsive srcset.
   * Defaults to a sensible "stacks on mobile, halves on tablet, third on desktop".
   */
  sizes?: string;
  /**
   * JPEG/WebP/AVIF quality (1–100). Defaults high — this is a cinematographer's
   * portfolio so thumbnails need to read crisp. See next.config.mjs `images.qualities`
   * for the whitelist.
   */
  quality?: number;
};

export function Placeholder({
  src,
  className = 'ph',
  style,
  priority = false,
  sizes = '(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw',
  quality = 92,
}: Props) {
  return (
    <div className={className} style={style}>
      <Image
        src={src}
        alt=""
        fill
        sizes={sizes}
        priority={priority}
        quality={quality}
        className="ph__img"
      />
    </div>
  );
}
