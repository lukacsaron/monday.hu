'use client';

import { useEffect, useState } from 'react';
import { FlippedW } from './FlippedW';
import { MondayReveal } from './MondayReveal';
import { navItems, site } from '@/content/site';

export function FloatingMenu() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', handler);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handler);
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        className={`fm-trigger ${open ? 'fm-trigger--open' : ''}`}
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
      >
        <span className="fm-trigger__bars" aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
      </button>

      {open && (
        <div
          className="fm-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
        >
          <div className="fm-overlay__inner">
            <div className="fm-overlay__brand">
              <MondayReveal className="fm-brand" trigger={1} ariaLabel={site.brand} />
            </div>

            <nav className="fm-nav">
              {navItems.map((n, i) => (
                <a
                  key={n.label}
                  href={n.href}
                  className={`fm-nav__item fm-nav__item--${n.variant}`}
                  onClick={() => setOpen(false)}
                  style={{ animationDelay: `${120 + i * 70}ms` }}
                >
                  <FlippedW />
                  <span>{n.label.slice(1)}</span>
                </a>
              ))}
            </nav>

            <div className="fm-overlay__foot mono">
              <a href={`mailto:${site.contactEmail}`}>
                {site.contactEmail.toUpperCase()}
              </a>
              <span>{site.location}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
