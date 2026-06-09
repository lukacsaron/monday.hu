'use client';

import { useEffect, useRef } from 'react';

const PATHS = [
  // M
  'M133.238 0H6.76947C3.03079 0 0 3.04404 0 6.79904V56.2014C0 59.9562 3.03058 63 6.76899 63H25.5053C26.7372 63 27.5527 61.7156 27.0331 60.5937L10.59 25.0944C6.88946 15.8906 16.0621 6.76141 25.1916 10.5619L66.2798 26.8028C68.6708 27.7479 71.3295 27.7479 73.7205 26.8028L114.808 10.5619C123.938 6.76142 133.111 15.8906 129.41 25.0944L112.971 60.5842C112.45 61.7105 113.268 63 114.505 63H133.242C136.974 63 140 59.9613 140 56.2128V6.79191C140 3.04084 136.972 0 133.238 0Z',
  // O
  'M200.899 0.0390625H151.554C147.816 0.0390625 144.78 3.07794 144.78 6.83184V56.2199C144.78 59.961 147.816 62.9999 151.554 62.9999H200.899C204.65 62.9999 207.686 59.961 207.686 56.2199V6.83184C207.686 3.07794 204.65 0.0390625 200.899 0.0390625ZM183.651 34.935C183.651 37.1567 181.852 38.9443 179.633 38.9443H172.82C170.601 38.9443 168.814 37.1567 168.814 34.935V28.1167C168.814 25.895 170.601 24.0947 172.82 24.0947H179.633C181.852 24.0947 183.651 25.895 183.651 28.1167V34.935Z',
  // N
  'M252.338 30.4779L226.968 6.27428C224.095 3.53406 219.214 4.14642 217.485 7.7212C216.782 9.17373 216.642 10.9269 217.362 12.6785L240.605 62.9992H212.62V11.7913C212.62 5.29992 217.877 0.0375977 224.363 0.0375977H271.907C276.936 0.0375977 281.164 3.44341 282.43 8.07462C282.526 8.42806 282.562 8.7974 282.562 9.16382L282.562 62.9992L252.518 30.6601C252.46 30.5976 252.4 30.5369 252.338 30.4779Z',
  // D
  'M330.419 0.0375977H294.327C290.57 0.0375977 287.52 3.0905 287.52 6.8497V56.1872C287.52 59.9467 290.57 62.9993 294.327 62.9993H330.405C341.461 62.9993 350.428 54.0251 350.428 42.9591V20.0637C350.428 9.01207 341.475 0.0375977 330.419 0.0375977ZM312.966 34.9176C312.966 37.1503 311.172 38.9452 308.955 38.9452H302.149C299.932 38.9452 298.125 37.1503 298.125 34.9176V28.1196C298.125 25.8865 299.932 24.0916 302.149 24.0916H308.955C311.172 24.0916 312.966 25.8865 312.966 28.1196V34.9176Z',
  // A
  'M424.114 7.32986V60.0521C424.114 60.0797 424.114 60.1072 424.114 60.1347C424.077 63.4 419.43 64.0973 418.265 61.047L398.118 8.29848C397.746 7.34478 397.285 6.42086 396.585 5.67578C393.354 2.12917 386.175 2.12931 382.929 5.67593C382.244 6.42101 381.783 7.34492 381.411 8.29863L361.222 61.0497C360.055 64.1001 355.407 63.4012 355.371 60.1349C355.37 60.1074 355.37 60.0798 355.37 60.0523V7.33C355.37 3.30557 358.63 0.0431176 362.651 0.0431176L416.819 0.0429688C417.288 0.0469221 420.15 0.118708 422.259 2.47605C424.024 4.45025 424.11 6.74008 424.114 7.32986Z',
  // Y
  'M492 5.58471C492 2.59294 489.577 0.16748 486.587 0.16748H477.261L465.376 20.7608C463.214 24.5091 457.83 24.5091 455.667 20.7608L443.783 0.16748H434.47C431.485 0.16748 429.043 2.61159 429.043 5.59852V34.4098C429.043 37.4016 431.467 39.8271 434.456 39.8271H491.983L472.02 46.2474H435.856C432.094 46.2474 429.044 49.3003 429.044 53.0659V62.9953L485.104 62.9992C488.905 63.0102 492 60.0889 492 56.2846V39.8271L492 5.58471Z',
];

const CFG = {
  speed: 1.6,
  intensity: 110,
  stagger: 26,
  goo: 16,
};

const FILTER_ID = 'monday-liquid';

export function MondayReveal({ className, ariaLabel = 'MONDAY' }: { className?: string; ariaLabel?: string }) {
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
  }, []);

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
          id={FILTER_ID}
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
      <g filter={`url(#${FILTER_ID})`} fill="#F6F3E7">
        {PATHS.map((d, i) => (
          <g key={i} className="ltr" style={{ opacity: 0 }}>
            <path d={d} />
          </g>
        ))}
      </g>
    </svg>
  );
}
