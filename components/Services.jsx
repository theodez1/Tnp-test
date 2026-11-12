import { UtensilsCrossed, Sun, Tv, Presentation, ParkingSquare, PlugZap, Video, Baby, Pizza, Fish, Beer, IceCream, Coffee, Cake, Thermometer, Ruler, CalendarClock, Award } from 'lucide-react';

export const ICONS = { UtensilsCrossed, Sun, Tv, Presentation, ParkingSquare, PlugZap, Video, Baby, Pizza, Fish, Beer, IceCream, Coffee, Cake, Thermometer, Ruler, CalendarClock, Award };

// Bandeau d'icônes défilable (accueil)
export function ServiceStrip({ items }) {
  return (
    <ul className="svc-strip">
      {items.map(({ icon, label }) => {
        const Icon = ICONS[icon];
        return <li key={label}><span className="svc-ico"><Icon size={26} strokeWidth={1.8} /></span><span>{label}</span></li>;
      })}
    </ul>
  );
}

// Grille de cartes avec icône (page Le club)
export function ServiceGrid({ items }) {
  return (
    <div className="svc-grid">
      {items.map(({ icon, title, text, tag }) => {
        const Icon = ICONS[icon];
        return (
          <div key={title} className="svc">
            <span className="svc-ico"><Icon size={24} strokeWidth={1.8} /></span>
            <div>
              <h3>{title}{tag && <span className="svc-tag">{tag}</span>}</h3>
              <p>{text}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
