import { FlippedW } from './FlippedW';
import { site } from '@/content/site';

export function WordSection() {
  return (
    <section className="sec word" id="word">
      <div className="sec__id mono" style={{ marginBottom: 8 }}>05 / CONTACT</div>
      <h2 className="word__big">
        <a href={`mailto:${site.contactEmail}`}>
          <FlippedW />
          ORD
        </a>
      </h2>
      <div className="word__row">
        <div className="word__links">
          {site.socials.map((s) => (
            <a key={s.label} className="btn" href={s.href} target={s.href.startsWith('http') ? '_blank' : undefined} rel={s.href.startsWith('http') ? 'noreferrer' : undefined}>
              {s.label}
            </a>
          ))}
        </div>
        <div className="word__meta">{site.footerMeta.join('\n')}</div>
      </div>
    </section>
  );
}
