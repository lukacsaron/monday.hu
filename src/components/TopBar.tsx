import { MondayLogo } from './MondayLogo';

export function TopBar() {
  return (
    <div className="topbar">
      <div className="tb-track">
        {Array.from({ length: 24 }).map((_, i) => (
          <MondayLogo
            key={i}
            className="mlogo"
            variant={i % 2 === 0 ? 'fill' : 'outline'}
          />
        ))}
      </div>
    </div>
  );
}

export function MobileTop() {
  return (
    <div className="m-top">
      <div className="marquee">
        <div className="marquee__track">
          {Array.from({ length: 20 }).map((_, i) => (
            <MondayLogo
              key={i}
              className="mlogo"
              variant={i % 2 === 0 ? 'fill' : 'outline'}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
