'use client';

import { useState, type MouseEvent } from 'react';
import { Placeholder } from './Placeholder';
import { PlayIcon } from './PlayIcon';
import { FlippedW } from './FlippedW';
import { ArtName } from './ArtName';
import { VideoModal, type ActiveVideo } from './VideoModal';
import { works, type Work } from '@/content/works';

function Tile({ w, onPlay }: { w: Work; onPlay: (w: Work) => void }) {
  const isPlayable = Boolean(w.youtubeId);
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (!isPlayable) return;
    e.preventDefault();
    onPlay(w);
  };
  // Map the 12-col grid span to an approximate viewport percentage so next/image
  // picks the right srcset entry. s4 → 33vw, s5 → 42vw, s7 → 58vw, s12 → 100vw.
  const spanCols = parseInt(w.span.slice(1), 10);
  const desktopVw = Math.round((spanCols / 12) * 100);
  const tileSizes = `(max-width: 768px) 100vw, ${desktopVw}vw`;
  return (
    <a
      href={w.youtubeUrl ?? '#'}
      target={w.youtubeUrl ? '_blank' : undefined}
      rel={w.youtubeUrl ? 'noopener noreferrer' : undefined}
      onClick={handleClick}
      className={`tile ${w.span} ${w.height}`}
    >
      <Placeholder src={w.image} sizes={tileSizes} />
      <div className="tile__meta">
        <div className="v" />
        <div className="tile__top mono">
          <span>{w.code}</span>
          <span>{isPlayable ? '▶ PLAY' : '···'}</span>
        </div>
        <div>
          {isPlayable && (
            <div className="play"><PlayIcon /></div>
          )}
          <ArtName>{w.art}</ArtName>
          <div className="tile__tracks mono">{w.tracks}</div>
        </div>
      </div>
    </a>
  );
}

export function WorkSection() {
  const [active, setActive] = useState<ActiveVideo>(null);

  const open = (w: Work) => {
    if (!w.youtubeId) return;
    setActive({
      youtubeId: w.youtubeId,
      artist: w.art,
      track: w.tracks,
      code: w.code,
    });
  };

  return (
    <section className="sec" id="work">
      <div className="sec__head">
        <div>
          <div className="sec__id mono">01 / MUSIC VIDEOS</div>
          <h2 className="sec__title">
            <FlippedW />
            ORK
          </h2>
        </div>
      </div>
      <div className="work">
        {works.map((w) => (
          <Tile key={w.id} w={w} onPlay={open} />
        ))}
      </div>
      <VideoModal active={active} onClose={() => setActive(null)} />
    </section>
  );
}
