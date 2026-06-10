import { FlippedW } from './FlippedW';
import { contacts, site } from '@/content/site';

export function WordSection() {
  return (
    <section className="sec word" id="word">
      <div className="sec__id mono" style={{ marginBottom: 8 }}>05 / CONTACT</div>
      <h2 className="word__big">
        <FlippedW />
        ORD
      </h2>

      <div className="word__contacts">
        {contacts.map((c) => (
          <article key={c.name} className="word__card">
            <header className="word__cardHead">
              <h3 className="word__cardName">{c.name}</h3>
              <p className="word__cardRole mono">— {c.role}</p>
            </header>
            <ul className="word__cardLinks">
              {c.links.map((l) => {
                const external = l.href.startsWith('http');
                return (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      target={external ? '_blank' : undefined}
                      rel={external ? 'noreferrer' : undefined}
                    >
                      <span className="word__cardLinkIcon" aria-hidden="true">{l.prefix}</span>
                      <span className="word__cardLinkLabel">{l.label}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </article>
        ))}
      </div>

      <div className="word__row">
        <div className="word__links">
          {site.socials.map((s) => (
            <a
              key={s.label}
              className="btn"
              href={s.href}
              target={s.href.startsWith('http') ? '_blank' : undefined}
              rel={s.href.startsWith('http') ? 'noreferrer' : undefined}
            >
              {s.label}
            </a>
          ))}
        </div>
        <div className="word__meta">{site.footerMeta.join('\n')}</div>
      </div>
    </section>
  );
}
