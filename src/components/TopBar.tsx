import { FlippedW } from './FlippedW';
import { navItems, site } from '@/content/site';

export function TopBar() {
  return (
    <div className="topbar">
      <div className="tb-track">
        {Array.from({ length: 24 }).map((_, i) => (
          <span key={i}>{site.brand}</span>
        ))}
      </div>
      <div className="tb-anchor">{site.brand}</div>
      <nav className="tb-nav">
        {navItems.map((n) => (
          <a key={n.label} href={n.href} className={n.variant}>
            <FlippedW />
            <span>{n.label.slice(1)}</span>
          </a>
        ))}
      </nav>
    </div>
  );
}

export function MobileTop() {
  return (
    <div className="m-top">
      <div className="marquee">
        <div className="marquee__track">
          {Array.from({ length: 20 }).map((_, i) => (
            <span key={i}>{site.brand}</span>
          ))}
        </div>
      </div>
      <nav className="m-menu">
        {navItems.map((n) => (
          <a key={n.label} href={n.href} className={n.variant}>
            <FlippedW />
            <span>{n.label.slice(1)}</span>
          </a>
        ))}
      </nav>
    </div>
  );
}
