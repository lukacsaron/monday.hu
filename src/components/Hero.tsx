import { MondayReveal } from './MondayReveal';
import { HeroLogoMask, type HeroFx } from './HeroLogoMask';
import { site } from '@/content/site';

export type { HeroFx };

export function Hero({ fx }: { fx?: HeroFx }) {
  return (
    <section className="hero">
      <video
        className="hero__video"
        src="/showreel.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden
      />
      <div className="hero__veil" />
      {fx ? <HeroLogoMask variant={fx} /> : null}
      <div className="hero__inner">
        <div className="hero__top">
          <div className="rec">
            <b />
            {' '}
            {site.recLabel}
          </div>
        </div>
        <div className="hero__title">
          {fx ? null : <MondayReveal className="bigword" ariaLabel={site.brand} />}
        </div>
        <div className="hero__sub">
          <div className="hero__cap">
            {site.services.join(' · ').toUpperCase()}
            <br />↓ SCROLL
          </div>
        </div>
      </div>
    </section>
  );
}
