'use client';

import { useLayoutEffect, useRef, type ReactNode } from 'react';

// Auto-fits the tile title text to one line. Mirrors the design's ArtName logic:
// reduces font-size until scrollWidth ≤ available width; re-fits on font load
// (the heavy Archivo weight swaps in late) and on tile resize.
export function ArtName({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const fit = () => {
      const tile = el.closest('.tile') as HTMLElement | null;
      if (!tile || !tile.clientWidth) return;
      const avail = tile.clientWidth - 32;
      el.style.whiteSpace = 'nowrap';
      el.style.overflowWrap = '';
      el.style.fontSize = '';
      let fs = parseFloat(getComputedStyle(el).fontSize);
      let guard = 0;
      while (el.scrollWidth > avail && fs > 20 && guard < 80) {
        fs -= 1;
        el.style.fontSize = `${fs}px`;
        guard += 1;
      }
      if (el.scrollWidth > avail) {
        el.style.whiteSpace = 'normal';
        el.style.overflowWrap = 'anywhere';
      }
    };

    fit();
    let ro: ResizeObserver | undefined;
    if (typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(fit);
      const tile = el.closest('.tile');
      if (tile) ro.observe(tile);
    }
    const fontsApi = (document as Document & { fonts?: FontFaceSet }).fonts;
    if (fontsApi) {
      fontsApi.ready.then(fit);
      fontsApi.load('900 49px "Archivo"').then(fit).catch(() => {});
      fontsApi.addEventListener('loadingdone', fit);
    }
    const t1 = window.setTimeout(fit, 400);
    const t2 = window.setTimeout(fit, 1200);
    return () => {
      if (ro) ro.disconnect();
      if (fontsApi) fontsApi.removeEventListener('loadingdone', fit);
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  });

  return (
    <div className="tile__art" ref={ref}>
      {children}
    </div>
  );
}
