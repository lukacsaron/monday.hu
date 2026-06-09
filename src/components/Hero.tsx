'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { Placeholder } from './Placeholder';
import { MondayReveal } from './MondayReveal';
import { heroCuts } from '@/content/works';
import { site } from '@/content/site';

// Grainient is a heavy WebGL component (ogl + a fragment shader). Lazy-loaded
// in a separate chunk so it doesn't block initial paint / LCP. SSR off because
// it manipulates the canvas after mount anyway.
const Grainient = dynamic(
  () => import('./Grainient').then((m) => ({ default: m.Grainient })),
  { ssr: false },
);

// Each frame in the showreel cycle is visible from i*FRAME_MS to ~i*FRAME_MS + 8500ms
// (see @keyframes reelcycle). Mount each image LOAD_LEAD_MS *before* it cycles in
// so the network has time to fetch it, but we don't burn bandwidth on frames that
// are still 10+ seconds away.
const FRAME_MS = 7000;
const LOAD_LEAD_MS = 2000;

export function Hero() {
  const [mountedCount, setMountedCount] = useState(1);

  useEffect(() => {
    if (heroCuts.length <= 1) return;
    const timers: number[] = [];
    for (let i = 1; i < heroCuts.length; i++) {
      const delay = Math.max(0, i * FRAME_MS - LOAD_LEAD_MS);
      timers.push(
        window.setTimeout(() => {
          setMountedCount((c) => Math.max(c, i + 1));
        }, delay),
      );
    }
    return () => timers.forEach((t) => window.clearTimeout(t));
  }, []);

  return (
    <section className="hero">
      <div className="reel">
        {heroCuts.map((c, i) => (
          <div className="frame" key={c.image}>
            {i < mountedCount && (
              <Placeholder src={c.image} priority={i === 0} sizes="100vw" />
            )}
          </div>
        ))}
      </div>
      <div className="hero__veil" />
      <Grainient
        className="hero__grain"
        grainAnimated
        grainAmount={0.15}
        grainSize={2}
        grainSpeed={24}
        grainScale={1.6}
        timeSpeed={0.25}
        warpStrength={0.4}
        warpAmplitude={120}
        rotationAmount={120}
        contrast={1.1}
        saturation={0}
        color1="#cccccc"
        color2="#777777"
        color3="#222222"
        zoom={1.2}
      />
      <div className="hero__inner">
        <div className="hero__top">
          <div className="rec">
            <b />
            {' '}
            {site.recLabel}
          </div>
        </div>
        <div className="hero__title">
          <MondayReveal className="bigword" ariaLabel={site.brand} />
        </div>
        <div className="hero__sub">
          <p>{site.tagline}</p>
          <div className="hero__cap">
            {site.services.join(' · ').toUpperCase()}
            <br />
            {site.location}
            <br />↓ SCROLL
          </div>
        </div>
      </div>
    </section>
  );
}
