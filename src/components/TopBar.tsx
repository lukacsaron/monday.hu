'use client';

import { useState } from 'react';
import { MondayReveal } from './MondayReveal';
import { site } from '@/content/site';

export function TopBar() {
  const [revealCount, setRevealCount] = useState(0);

  return (
    <div
      className="topbar"
      onMouseEnter={() => setRevealCount((c) => c + 1)}
    >
      <div className="tb-track">
        {Array.from({ length: 24 }).map((_, i) => (
          <span key={i}>{site.brand}</span>
        ))}
      </div>
      <div className="tb-anchor" aria-hidden="true">
        <MondayReveal className="tb-logo" trigger={revealCount} ariaLabel={site.brand} />
      </div>
    </div>
  );
}

export function MobileTop() {
  return (
    <div className="m-top">
      <div className="marquee">
        <div className="marquee__track">
          {Array.from({ length: 20 }).map((_, i) => (
            <span key={i}>{site.brand}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
