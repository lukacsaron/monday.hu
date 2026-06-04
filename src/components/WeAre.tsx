import { Placeholder } from './Placeholder';
import { FlippedW } from './FlippedW';
import { team, weAreCopy } from '@/content/team';

export function WeAreSection() {
  return (
    <section className="sec" id="weare">
      <div className="sec__head">
        <div>
          <div className="sec__id mono">03 / THE STUDIO</div>
          <h2 className="sec__title">
            <FlippedW />
            E ARE
          </h2>
        </div>
        <p className="sec__note">{weAreCopy.note}</p>
      </div>
      <p className="weare__blurb">
        Big productions, tiny travel kits — and <em>everything</em> in&nbsp;between.
      </p>
      <div className="team">
        {team.map((m) => (
          <div className="member" key={m.id}>
            <div className="pf">
              <span className="tag mono">GIF LOOP</span>
              <Placeholder src={m.image} />
            </div>
            <div className="member__info">
              <div className="member__name">{m.name}</div>
              <div className="member__role mono">{m.role}</div>
              <div className="member__bio">{m.bio}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
