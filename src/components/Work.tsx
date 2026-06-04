import { Placeholder } from './Placeholder';
import { PlayIcon } from './PlayIcon';
import { FlippedW } from './FlippedW';
import { ArtName } from './ArtName';
import { works, reelStripImage, type Work } from '@/content/works';

function Tile({ w }: { w: Work }) {
  return (
    <a href="#" className={`tile ${w.span} ${w.height}`}>
      <Placeholder src={w.image} />
      <div className="tile__meta">
        <div className="v" />
        <div className="tile__top mono">
          <span>{w.code}</span>
          <span>▶ PLAY</span>
        </div>
        <div>
          <div className="play"><PlayIcon /></div>
          <ArtName>{w.art}</ArtName>
          <div className="tile__tracks mono">{w.tracks}</div>
        </div>
      </div>
    </a>
  );
}

export function WorkSection() {
  return (
    <section className="sec" id="work">
      <div className="sec__head">
        <div>
          <div className="sec__id mono">01 / MUSIC VIDEOS</div>
          <h2 className="sec__title">
            <FlippedW />
            ORK
          </h2>
        </div>
        <p className="sec__note">{`Every cover is a door.\nClick one to play.`}</p>
      </div>
      <div className="reelstrip">
        <Placeholder src={reelStripImage} />
        <div className="reelstrip__label">
          <div className="t">SHOWREEL — 20&quot;</div>
          <div className="c mono">OUR STRONGEST CUTS · LOOP</div>
        </div>
      </div>
      <div className="work">
        {works.map((w) => (
          <Tile key={w.id} w={w} />
        ))}
      </div>
    </section>
  );
}
