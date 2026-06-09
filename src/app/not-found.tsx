import Link from 'next/link';
import type { Metadata } from 'next';
import { MondayReveal } from '@/components/MondayReveal';

export const metadata: Metadata = {
  title: '404 — Page not found',
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="nf">
      <div className="nf__inner">
        <div className="nf__brand">
          <MondayReveal className="nf__logo" ariaLabel="MONDAY" />
        </div>
        <div className="nf__code mono">404 · CUT FROM THE EDIT</div>
        <h1 className="nf__big">
          You&apos;re off frame.
        </h1>
        <p className="nf__copy">
          This page doesn&apos;t exist — or it never made the final cut.
          Either way, let&apos;s get you back to set.
        </p>
        <Link href="/" className="nf__back mono">
          ← BACK TO MONDAY
        </Link>
      </div>
    </main>
  );
}
