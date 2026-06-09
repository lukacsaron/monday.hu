'use client';

import { useEffect, type RefObject } from 'react';

/**
 * Traps Tab/Shift+Tab inside `rootRef` while `active` is true. On activation,
 * focuses the first focusable element inside the root and remembers the
 * previously-focused element. On cleanup (deactivation / unmount), restores
 * focus to that previously-focused element.
 */
export function useFocusTrap(
  active: boolean,
  rootRef: RefObject<HTMLElement | null>,
) {
  useEffect(() => {
    if (!active) return;
    const root = rootRef.current;
    if (!root) return;

    const prevActive = (document.activeElement as HTMLElement | null) ?? null;

    const getFocusables = () =>
      Array.from(
        root.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((el) => el.offsetParent !== null || el === document.activeElement);

    // Defer initial focus a beat so any open animation can mount the elements first.
    const focusTimer = window.setTimeout(() => {
      const first = getFocusables()[0];
      first?.focus();
    }, 0);

    const handleKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      const focusables = getFocusables();
      if (focusables.length === 0) {
        e.preventDefault();
        return;
      }
      const firstEl = focusables[0];
      const lastEl = focusables[focusables.length - 1];
      const activeEl = document.activeElement;
      if (e.shiftKey) {
        if (activeEl === firstEl || !root.contains(activeEl)) {
          e.preventDefault();
          lastEl.focus();
        }
      } else {
        if (activeEl === lastEl || !root.contains(activeEl)) {
          e.preventDefault();
          firstEl.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKey);
    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener('keydown', handleKey);
      // Restore focus to whatever opened the modal/menu, if it's still in the DOM.
      if (prevActive && document.contains(prevActive)) {
        prevActive.focus();
      }
    };
  }, [active, rootRef]);
}
