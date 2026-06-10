import { GifLoop } from './GifLoop';
import { FlippedW } from './FlippedW';
import { team, weAreCopy } from '@/content/team';

const FALLBACKS = ['/img/02.png', '/img/06.png', '/img/04.png', '/img/08.png', '/img/01.png'];

export function WeAreSection() {
  return (
    <section className="sec" id="weare">
      <div className="sec__head">
        <div>
          <div className="sec__id mono">04 / THE STUDIO</div>
          <h2 className="sec__title">
            <FlippedW />
            E ARE
          </h2>
        </div>
      </div>
      <div className="weare__intro">
        <p className="weare__lead">{weAreCopy.lead}</p>
        <p className="weare__blurb">{weAreCopy.blurb}</p>
      </div>
      <div className="team">
        {team.map((m, idx) => (
          <div className="member" key={m.id}>
            <div className="pf">
              <span className="tag mono">GIF LOOP</span>
              <GifLoop images={m.images} fallback={FALLBACKS[idx % FALLBACKS.length]} />
            </div>
            <div className="member__info">
              <div className="member__name">
                {m.link ? (
                  <a href={m.link} target="_blank" rel="noopener noreferrer">
                    {m.name}
                  </a>
                ) : (
                  m.name
                )}
              </div>
              <div className="member__role mono">{m.role}</div>
              <div className="member__bio">{m.bio}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
