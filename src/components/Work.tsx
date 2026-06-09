'use client';

import { useState, type MouseEvent } from 'react';
import { Placeholder } from './Placeholder';
import { PlayIcon } from './PlayIcon';
import { FlippedW } from './FlippedW';
import { ArtName } from './ArtName';
import { VideoModal, type ActiveVideo } from './VideoModal';
import { works, reelStripImage, type Work } from '@/content/works';

function Tile({ w, onPlay }: { w: Work; onPlay: (w: Work) => void }) {
  const isPlayable = Boolean(w.youtubeId);
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (!isPlayable) return;
    e.preventDefault();
    onPlay(w);
  };
  return (
    <a
      href={w.youtubeUrl ?? '#'}
      target={w.youtubeUrl ? '_blank' : undefined}
      rel={w.youtubeUrl ? 'noopener noreferrer' : undefined}
      onClick={handleClick}
      className={`tile ${w.span} ${w.height}`}
    >
      <Placeholder src={w.image} />
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
        <p className="sec__note">{`Every cover is a door.\nClick one to play.`}</p>
      </div>
      <div className="reelstrip">
        <Placeholder src={reelStripImage} />
        <div className="reelstrip__label">
          <div className="t">SHOWREEL — 20&quot;</div>
          <div className="c mono">OUR STRONGEST CUTS · LOOP</div>
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
