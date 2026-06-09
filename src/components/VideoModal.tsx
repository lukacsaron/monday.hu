'use client';

import { useEffect, useState } from 'react';

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

const PORTRAIT_MQ = '(orientation: portrait) and (max-width: 768px)';

export function VideoModal({ active, onClose }: Props) {
  const [isPortraitPhone, setIsPortraitPhone] = useState(false);

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

  useEffect(() => {
    if (!active || typeof window === 'undefined') return;
    const mq = window.matchMedia(PORTRAIT_MQ);
    setIsPortraitPhone(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setIsPortraitPhone(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, [active]);

  if (!active) return null;

  return (
    <div
      className="vm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${active.artist} — ${active.track}`}
    >
      {isPortraitPhone ? (
        <div className="vm__rotate" onClick={(e) => e.stopPropagation()}>
          <div className="vm__rotate-icon" aria-hidden="true">
            <svg viewBox="0 0 90 90" width="96" height="96" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
              <rect className="vm__rotate-phone" x="30" y="10" width="30" height="70" rx="5" />
              <circle cx="45" cy="73" r="2" fill="currentColor" stroke="none" />
              <path className="vm__rotate-arrow" d="M14 50 A 31 31 0 0 1 45 19" />
              <polyline className="vm__rotate-arrow" points="14,40 14,50 24,50" />
            </svg>
          </div>
          <div className="vm__rotate-title">Turn your phone.</div>
          <div className="vm__rotate-kicker mono">CINEMASCOPE — NOT TIKTOK.</div>
          <button
            type="button"
            className="vm__rotate-close mono"
            onClick={onClose}
            aria-label="Close video"
          >
            CLOSE ✕
          </button>
        </div>
      ) : (
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
              src={`https://www.youtube.com/embed/${active.youtubeId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
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
      )}
    </div>
  );
}
