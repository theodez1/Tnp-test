'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export const PHONE = '05 32 00 23 91';
export const PHONE_HREF = 'tel:+33532002391';
export const ADDRESS = ['5 impasse Novital', '31790 Saint-Jory'];
export const MAPS_HREF = 'https://www.google.com/maps/search/?api=1&query=5+impasse+Novital+31790+Saint-Jory';

const NAV = [
  { href: '/reserver', label: 'Jouer' },
  { href: '/tournois', label: 'Tournois' },
  { href: '/academie', label: 'Académie' },
  { href: '/courts-filmes', label: 'Courts filmés' },
  { href: '/le-game', label: 'Le club' },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  return (
    <header className="hdr">
      <div className="wrap hdr-in">
        <Link href="/" className="brand" aria-label="Toulouse Nord Padel, accueil">
          <CourtMark />
          <span>Toulouse Nord<br />Padel</span>
        </Link>
        <nav className={`nav ${open ? 'is-open' : ''}`} aria-label="Navigation principale">
          {NAV.map((l) => (
            <Link key={l.href} href={l.href} aria-current={pathname === l.href ? 'page' : undefined} onClick={() => setOpen(false)}>
              {l.label}
            </Link>
          ))}
          <a className="nav-phone" href={PHONE_HREF}>Appeler le {PHONE}</a>
        </nav>
        <a className="btn btn-ball hdr-cta" href={PHONE_HREF}>Réserver</a>
        <button className="burger" aria-expanded={open} aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'} onClick={() => setOpen(!open)}>
          <span /><span />
        </button>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="ftr">
      <div className="wrap ftr-grid">
        <div>
          <p className="ftr-name">Toulouse Nord Padel</p>
          <p>{ADDRESS[0]}<br />{ADDRESS[1]}</p>
          <p><a href={MAPS_HREF} target="_blank" rel="noreferrer">Voir l'itinéraire</a></p>
        </div>
        <div>
          <p className="ftr-h">Horaires</p>
          <p>Tous les jours<br />6 h – minuit</p>
        </div>
        <div>
          <p className="ftr-h">Contact</p>
          <p><a href={PHONE_HREF}>{PHONE}</a></p>
        </div>
        <nav className="ftr-nav" aria-label="Pied de page">
          {NAV.map((l) => <Link key={l.href} href={l.href}>{l.label}</Link>)}
        </nav>
      </div>
      <div className="wrap ftr-legal">© {new Date().getFullYear()} Toulouse Nord Padel</div>
    </footer>
  );
}

export function PageHero({ title, lead, image, alt }) {
  return (
    <section className="phero">
      <img src={image} alt={alt} className="phero-img" />
      <div className="wrap phero-txt">
        <h1>{title}</h1>
        <p>{lead}</p>
      </div>
    </section>
  );
}

export function CallBand({ title, text }) {
  return (
    <section className="band">
      <div className="wrap band-in">
        <div>
          <h2>{title}</h2>
          <p>{text}</p>
        </div>
        <a className="btn btn-ball btn-lg" href={PHONE_HREF}>Appeler le {PHONE}</a>
      </div>
    </section>
  );
}

/* Plan d'un terrain de padel (20 × 10 m) : murs, filet, lignes de service. */
export function Court({ className = '' }) {
  return (
    <svg className={`court ${className}`} viewBox="0 0 100 200" aria-hidden="true">
      <rect x="1.5" y="1.5" width="97" height="197" rx="2" />
      <line x1="1.5" y1="100" x2="98.5" y2="100" className="net" />
      <line x1="1.5" y1="30" x2="98.5" y2="30" />
      <line x1="1.5" y1="170" x2="98.5" y2="170" />
      <line x1="50" y1="30" x2="50" y2="170" />
    </svg>
  );
}

function CourtMark() {
  return (
    <svg className="brand-mark" viewBox="0 0 24 40" aria-hidden="true">
      <rect x="1" y="1" width="22" height="38" rx="1.5" />
      <line x1="1" y1="20" x2="23" y2="20" />
      <line x1="1" y1="7" x2="23" y2="7" />
      <line x1="1" y1="33" x2="23" y2="33" />
      <line x1="12" y1="7" x2="12" y2="33" />
    </svg>
  );
}
