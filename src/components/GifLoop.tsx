'use client';

import { useEffect, useState } from 'react';
import type { CSSProperties } from 'react';

type Props = {
  images: string[];
  fallback: string;
  intervalMs?: number;
  className?: string;
  style?: CSSProperties;
};

export function GifLoop({ images, fallback, intervalMs = 120, className = 'ph', style }: Props) {
  const frames = images.length > 0 ? images : [fallback];
  const [i, setI] = useState(0);

  useEffect(() => {
    if (frames.length < 2) return;
    const id = setInterval(() => setI((n) => (n + 1) % frames.length), intervalMs);
    return () => clearInterval(id);
  }, [frames.length, intervalMs]);

  return (
    <div
      className={className}
      style={{ backgroundImage: `url("${frames[i]}")`, ...style }}
    />
  );
}
