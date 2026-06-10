'use client';

import { useEffect, useId, useRef } from 'react';
import { MONDAY_PATHS } from './mondayPaths';

const CFG = {
  speed: 1.6,
  intensity: 110,
  stagger: 26,
  goo: 16,
};

type Props = {
  className?: string;
  ariaLabel?: string;
  /** Bumping this triggers the reveal animation to replay. Initial mount always plays. */
  trigger?: number;
};

export function MondayReveal({ className, ariaLabel = 'MONDAY', trigger = 0 }: Props) {
  const rawId = useId();
  const filterId = `monday-liquid-${rawId.replace(/:/g, '')}`;
  const svgRef = useRef<SVGSVGElement>(null);
  const dispRef = useRef<SVGFEDisplacementMapElement>(null);
  const gooRef = useRef<SVGFEGaussianBlurElement>(null);
  const matrixRef = useRef<SVGFEColorMatrixElement>(null);
  const turbRef = useRef<SVGFETurbulenceElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    const disp = dispRef.current;
    const goo = gooRef.current;
    const matrix = matrixRef.current;
    const turb = turbRef.current;
    if (!svg || !disp || !goo || !matrix || !turb) return;

    const letters = Array.from(svg.querySelectorAll<SVGGElement>('.ltr'));
    const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
    const easeOutBack = (t: number) => {
      const c1 = 1.9;
      const c3 = c1 + 1;
      return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
    };

    const setFinal = () => {
      disp.setAttribute('scale', '0');
      goo.setAttribute('stdDeviation', '0');
      matrix.setAttribute('values', '1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0');
      letters.forEach((g) => {
        g.style.opacity = '1';
        g.style.transform = 'none';
      });
    };

    if (reduceMotion) {
      setFinal();
      return;
    }

    turb.setAttribute('seed', String(Math.floor(Math.random() * 9999)));

    const meltDur = 900 * CFG.speed;
    const letterDur = 560 * CFG.speed;
    const lastStart = (letters.length - 1) * CFG.stagger;
    const total = Math.max(meltDur, lastStart + letterDur);
    const start = performance.now();

    let rafId = 0;
    const frame = (now: number) => {
      const t = now - start;

      // global liquid melt
      const mp = clamp(t / meltDur, 0, 1);
      const me = easeOutCubic(mp);
      disp.setAttribute('scale', (CFG.intensity * (1 - me)).toFixed(2));

      const gp = easeOutCubic(clamp(mp * 1.15, 0, 1));
      goo.setAttribute('stdDeviation', lerp(CFG.goo, 0, gp).toFixed(2));

      const a = lerp(16, 1, gp);
      const b = lerp(-7, 0, gp);
      matrix.setAttribute(
        'values',
        `1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 ${a.toFixed(2)} ${b.toFixed(2)}`,
      );

      const bf = lerp(0.022, 0.012, me);
      turb.setAttribute('baseFrequency', `${bf.toFixed(4)} ${(bf * 1.6).toFixed(4)}`);

      // per-letter droplet settle
      letters.forEach((g, i) => {
        const lp = clamp((t - i * CFG.stagger) / letterDur, 0, 1);
        const op = clamp(lp / 0.5, 0, 1);
        const s = easeOutBack(lp);
        const ty = lerp(30, 0, easeOutCubic(lp));
        const sx = lerp(0.58, 1, s);
        const sy = lerp(1.6, 1, s);
        g.style.opacity = op.toFixed(3);
        g.style.transform = `translateY(${ty.toFixed(2)}px) scale(${sx.toFixed(3)}, ${sy.toFixed(3)})`;
      });

      if (t < total) {
        rafId = requestAnimationFrame(frame);
      } else {
        setFinal();
      }
    };

    letters.forEach((g) => {
      g.style.opacity = '0';
    });
    rafId = requestAnimationFrame(frame);
    // watchdog: rAF can stall (backgrounded tab); guarantee the logo lands visible.
    const watchdog = setTimeout(() => {
      cancelAnimationFrame(rafId);
      setFinal();
    }, total + 500);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(watchdog);
    };
  }, [trigger]);

  return (
    <svg
      ref={svgRef}
      className={className}
      viewBox="0 0 492 63"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={ariaLabel}
    >
      <defs>
        <filter
          id={filterId}
          x="-60%"
          y="-60%"
          width="220%"
          height="220%"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence
            ref={turbRef}
            type="fractalNoise"
            baseFrequency="0.022 0.035"
            numOctaves={2}
            seed={7}
            result="noise"
          />
          <feDisplacementMap
            ref={dispRef}
            in="SourceGraphic"
            in2="noise"
            scale={0}
            xChannelSelector="R"
            yChannelSelector="G"
            result="disp"
          />
          <feGaussianBlur ref={gooRef} in="disp" stdDeviation={0} result="blur" />
          <feColorMatrix
            ref={matrixRef}
            in="blur"
            type="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"
          />
        </filter>
      </defs>
      <g filter={`url(#${filterId})`} fill="#F6F3E7">
        {MONDAY_PATHS.map((d, i) => (
          <g key={i} className="ltr" style={{ opacity: 0 }}>
            <path d={d} />
          </g>
        ))}
      </g>
    </svg>
  );
}
