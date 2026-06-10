import { FlippedW } from './FlippedW';
import { wins, winsCopy, type Win } from '@/content/wins';

function partitionByCount(items: Win[]): { multi: Win[]; single: Win[] } {
  return {
    multi: items.filter((w) => w.count >= 2),
    single: items.filter((w) => w.count === 1),
  };
}

function Chip({ w }: { w: Win }) {
  const tierSuffix = w.tier ? ` · ${w.tier === 'gold' ? 'Gold' : 'Silver'}` : '';
  return (
    <li className="wins__chip" title={w.festivalFull ?? w.festival}>
      <span className="wins__count mono" aria-hidden="true">{w.count}×</span>
      <span className="sr-only">{w.count} wins:</span>
      <span className="wins__title">{w.title}{tierSuffix}</span>
      <span className="wins__fest mono">· {w.festival}</span>
      <span className="wins__dot" aria-hidden="true" />
    </li>
  );
}

function Strip({ items, inverted, reverse }: { items: Win[]; inverted?: boolean; reverse?: boolean }) {
  if (items.length === 0) return null;
  return (
    <div className={`wins__strip ${inverted ? 'inv' : ''}`}>
      <ul className={`wins__track ${reverse ? 'rev' : ''}`}>
        {items.map((w) => <Chip key={w.id} w={w} />)}
        {/*
          The track is rendered twice so the translateX(-50%) loop has identical
          content to fall back to. The second pass is aria-hidden so screen
          readers don't double-read the awards. `display: contents` keeps the
          wrapper out of the flex layout — semantic only, no visual effect.
        */}
        <span aria-hidden="true" style={{ display: 'contents' }}>
          {items.map((w) => <Chip key={`${w.id}-dup`} w={w} />)}
        </span>
      </ul>
    </div>
  );
}

export function WinsSection() {
  const { multi, single } = partitionByCount(wins);
  return (
    <section className="sec wins" id="wins" aria-labelledby="wins-title">
      <div className="sec__head">
        <div>
          <div className="sec__id mono">03 / WINS</div>
          <h2 className="sec__title" id="wins-title">
            <FlippedW />INS
          </h2>
        </div>
        <p className="sec__note">{winsCopy.note}</p>
      </div>
      <Strip items={multi} />
      <Strip items={single} inverted reverse />
    </section>
  );
}
