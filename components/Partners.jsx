import { logoUrl } from '../lib/partners';
import { EMAIL } from '../lib/info';

function Mark({ p }) {
  const src = logoUrl(p.logo);
  return src
    ? <img src={src} alt={p.name} className="pmark-img" />
    : <span className="pmark-txt">{p.name}</span>;
}

// Barre défilante de logos
export function PartnerStrip({ partners }) {
  const items = [...partners, ...partners, ...partners];
  return (
    <div className="pstrip" aria-label="Partenaires du club">
      <div className="pstrip-track">
        {items.map((p, i) => (
          <span key={i} className="pmark" aria-hidden={i >= partners.length}><Mark p={p} /></span>
        ))}
      </div>
    </div>
  );
}

// Grille de partenaires avec description
export function PartnerGrid({ partners, cta = false }) {
  return (
    <div className="pgrid">
      {partners.map((p) => (
        <div key={p.name} className="pcard">
          <div className="pcard-logo"><Mark p={p} /></div>
          <p>{p.note}</p>
        </div>
      ))}
      {cta && (
        <a className="pcard pcard-cta" href={`mailto:${EMAIL}?subject=Devenir partenaire`}>
          <div className="pcard-logo"><span className="pmark-txt">Votre logo ici</span></div>
          <p>Devenir partenaire du club</p>
        </a>
      )}
    </div>
  );
}
