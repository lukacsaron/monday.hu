'use client';

import { useEffect } from 'react';

export type ActiveVideo = {
  youtubeId: string;
  artist: string;
  track: string;
  code: string;
} | null;

type Props = {
  active: ActiveVideo;
  onClose: () => void;
};

export function VideoModal({ active, onClose }: Props) {
  useEffect(() => {
    if (!active) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handler);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handler);
      document.body.style.overflow = prev;
    };
  }, [active, onClose]);

  if (!active) return null;

  return (
    <div className="vm" onClick={onClose} role="dialog" aria-modal="true" aria-label={`${active.artist} — ${active.track}`}>
      <div className="vm__stage" onClick={(e) => e.stopPropagation()}>
        <div className="vm__top">
          <div className="vm__rec mono">
            <b />
            REC · NOW PLAYING · {active.code}
          </div>
          <button className="vm__close mono" onClick={onClose} aria-label="Close video">
            CLOSE ✕
          </button>
        </div>

        <div className="vm__frame">
          <iframe
            key={active.youtubeId}
            src={`https://www.youtube.com/embed/${active.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
            title={`${active.artist} — ${active.track}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>

        <div className="vm__bottom">
          <div className="vm__artist">{active.artist}</div>
          <div className="vm__track mono">↳ {active.track}</div>
        </div>
      </div>
    </div>
  );
}
