import { site } from '@/content/site';

export function Foot() {
  return (
    <div className="foot">
      {site.footStrip.map((s) => (
        <span key={s}>{s}</span>
      ))}
    </div>
  );
}
