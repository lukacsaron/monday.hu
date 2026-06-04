import { Placeholder } from './Placeholder';
import { heroCuts } from '@/content/works';
import { site } from '@/content/site';

export function Hero() {
  return (
    <section className="hero">
      <div className="reel">
        {heroCuts.map((c) => (
          <div className="frame" key={c.label}>
            <Placeholder src={c.image} />
          </div>
        ))}
      </div>
      <div className="hero__veil" />
      <div className="hero__inner">
        <div className="hero__top">
          <div className="rec">
            <b />
            {' '}
            {site.recLabel}
          </div>
        </div>
        <div className="hero__title">
          <svg className="bigword" viewBox="0 0 1440 240" preserveAspectRatio="xMidYMid meet">
            <text x="0" y="224" fontSize="310" textLength="1430" lengthAdjust="spacingAndGlyphs">
              {site.brand}
            </text>
          </svg>
        </div>
        <div className="hero__sub">
          <p>{site.tagline}</p>
          <div className="hero__cap">
            {site.services.join(' · ').toUpperCase()}
            <br />
            {site.location}
            <br />↓ SCROLL
          </div>
        </div>
      </div>
    </section>
  );
}
