import { Placeholder } from './Placeholder';
import { PlayIcon } from './PlayIcon';
import { FlippedW } from './FlippedW';
import { werks } from '@/content/werks';
import { site } from '@/content/site';

export function WerkSection() {
  return (
    <section className="sec" id="werk">
      <div className="sec__head">
        <div>
          <div className="sec__id mono">02 / BEHIND THE SCENES</div>
          <h2 className="sec__title">
            <FlippedW />
            ERK
          </h2>
        </div>
        <p className="sec__note">{`What it looks like\nbehind the camera.`}</p>
      </div>
      <div className="werk">
        {werks.map((w) => (
          <a href="#" className="tile" key={w.id}>
            <Placeholder src={w.image} />
            <div className="tile__meta">
              <div className="v" />
              <div className="tile__top mono">
                <span>{w.code}</span>
                <span>◐ BTS</span>
              </div>
              <div>
                <div className="play"><PlayIcon /></div>
                <div className="tile__art">{w.art}</div>
                <div className="tile__tracks mono">behind the scenes</div>
              </div>
            </div>
          </a>
        ))}
        <div className="werk__cta">
          <div className="yt">More werk on YouTube →</div>
          <a className="btn" href={site.youtubeUrl} target="_blank" rel="noreferrer">
            {site.youtubeHandle}
          </a>
        </div>
      </div>
    </section>
  );
}
