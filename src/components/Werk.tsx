'use client';

import { useState, type MouseEvent } from 'react';
import { Placeholder } from './Placeholder';
import { PlayIcon } from './PlayIcon';
import { VideoModal, type ActiveVideo } from './VideoModal';
import { werks, type Werk } from '@/content/werks';
import { FlippedW } from './FlippedW';

export function WerkSection() {
  const [active, setActive] = useState<ActiveVideo>(null);

  const open = (w: Werk) => {
    setActive({
      youtubeId: w.youtubeId,
      artist: w.artist,
      track: `${w.art} · WERKFILM`,
      code: w.code,
    });
  };

  const handleClick = (w: Werk) => (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    open(w);
  };

  return (
    <section className="sec" id="werk">
      <div className="sec__head">
        <div>
          <div className="sec__id mono">02 / BTS</div>
          <h2 className="sec__title">
            <FlippedW />HATS<span className="sec__title-sub">BEHIND</span>
          </h2>
        </div>
        <p className="sec__note">{`Fast moves, changing plans, good vibes.\nSee how we work in the videos below.`}</p>
      </div>
      <div className="werk">
        {werks.map((w) => (
          <a
            href={w.youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleClick(w)}
            className="tile"
            key={w.id}
          >
            <Placeholder src={w.image} sizes="(max-width: 768px) 100vw, 33vw" />
            <div className="tile__meta">
              <div className="v" />
              <div className="tile__top mono">
                <span>{w.code}</span>
                <span>◐ BTS</span>
              </div>
              <div>
                <div className="play"><PlayIcon /></div>
                <div className="tile__art">{w.art}</div>
                <div className="tile__tracks mono">behind the scenes</div>
              </div>
            </div>
          </a>
        ))}
      </div>
      <VideoModal active={active} onClose={() => setActive(null)} />
    </section>
  );
}
