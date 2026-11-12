'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { House, Trophy, CalendarDays, PlaySquare, Landmark, UserRound, ArrowRight, Users, X } from 'lucide-react';
import { useUser } from '../lib/store';

import { PHONE, PHONE_HREF, ADDRESS, MAPS_HREF } from '../lib/info';

const NAV = [
  { href: '/reserver', label: 'Jouer' },
  { href: '/tournois', label: 'Tournois' },
  { href: '/academie', label: 'Académie' },
  { href: '/courts-filmes', label: 'Courts filmés' },
  { href: '/le-game', label: 'Le club' },
];

const TABS = [
  { href: '/', label: 'Accueil', Icon: House },
  { href: '/tournois', label: 'Tournois', Icon: Trophy },
  { href: '/reserver', label: 'Réserver', Icon: CalendarDays, main: true },
  { href: '/courts-filmes', label: 'Vidéos', Icon: PlaySquare },
  { href: '/le-game', label: 'Le club', Icon: Landmark },
];

export function Header({ overlay = false }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const user = useUser();
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    if (!overlay) return;
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, [overlay]);
  return (
    <>
      <header className={`hdr ${overlay ? 'hdr-overlay' : ''} ${scrolled ? 'is-solid' : ''} ${open ? 'is-open' : ''}`}>
        <div className="wrap hdr-in">
          <Link href="/" className="brand" aria-label="Toulouse Nord Padel, accueil">
            <img src="/images/logo-tnp.png" alt="" width="1840" height="300" />
          </Link>
          <nav className={`nav ${open ? 'is-open' : ''}`} aria-label="Navigation principale">
            {NAV.map((l) => (
              <Link key={l.href} href={l.href} aria-current={pathname === l.href ? 'page' : undefined} onClick={() => setOpen(false)}>
                {l.label}
              </Link>
            ))}
            <a className="nav-phone" href={PHONE_HREF}>Appeler le {PHONE}</a>
          </nav>
          <Link href="/reserver" className="btn btn-blue hdr-book">Réserver</Link>
          <Link href="/compte" className="icon-btn" aria-label={user ? `Mon compte (${user.name})` : 'Se connecter ou créer un compte'}>
            {user ? <span className="avatar">{user.name.slice(0, 1).toUpperCase()}</span> : <UserRound size={24} strokeWidth={1.8} />}
          </Link>
          <button className="burger" aria-expanded={open} aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'} onClick={() => setOpen(!open)}>
            <span /><span /><span />
          </button>
        </div>
      </header>
      {!['/reserver', '/compte'].includes(pathname) && <BookNudge />}
      <nav className="tabbar" aria-label="Accès rapide">
        {TABS.map(({ href, label, Icon, main }) => {
          const on = pathname === href;
          return (
            <Link key={href} href={href} className={`tab ${main ? 'tab-main' : ''} ${on ? 'is-on' : ''}`} aria-current={on ? 'page' : undefined}>
              <span className="tab-ico"><Icon size={main ? 26 : 24} strokeWidth={on || main ? 2.2 : 1.7} /></span>
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}

export function Footer() {
  return (
    <footer className="ftr">
      <div className="wrap ftr-grid">
        <div>
          <img src="/images/logo-tnp.png" alt="Toulouse Nord Padel" className="ftr-logo" width="1840" height="300" />
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
          <p><Link href="/compte">Mon compte</Link></p>
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
        {lead && <p>{lead}</p>}
      </div>
    </section>
  );
}

export function CallBand({ title, text, href = '/reserver', cta = 'Réserver un terrain', phoneOnly = false }) {
  return (
    <section className="band">
      <div className="wrap band-in">
        <div>
          <h2>{title}</h2>
          <p>{text}</p>
        </div>
        <div className="band-cta">
          {!phoneOnly && <Link className="btn btn-white btn-lg" href={href}>{cta}</Link>}
          <a className={`btn btn-lg ${phoneOnly ? 'btn-white' : 'btn-ghost'}`} href={PHONE_HREF}>{phoneOnly ? `Appeler le ${PHONE}` : PHONE}</a>
        </div>
      </div>
    </section>
  );
}

const fmt = (d, o) => new Date(d + 'T12:00:00').toLocaleDateString('fr-FR', o).replace('.', '');

export function EventCard({ event }) {
  return (
    <Link href="/tournois" className="event">
      <span className="event-date">
        <span>{fmt(event.date, { weekday: 'short' })}</span>
        <strong>{fmt(event.date, { day: 'numeric' })}</strong>
        <span>{fmt(event.date, { month: 'short' })}</span>
      </span>
      <span className="event-body">
        <strong>{event.title}</strong>
        <span>{event.category}</span>
        {event.teams && <span className="event-meta"><Users size={16} /> {event.teams} équipes</span>}
      </span>
      <span className="round"><ArrowRight size={20} /></span>
    </Link>
  );
}

/* Encart « Réserver » en bas à droite, sur ordinateur uniquement */
function BookNudge() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    let closed = false;
    try { closed = sessionStorage.getItem('tnp.nudge') === 'closed'; } catch {}
    if (closed) return;
    const t = setTimeout(() => setShow(true), 2500);
    return () => clearTimeout(t);
  }, []);
  if (!show) return null;
  const close = () => { setShow(false); try { sessionStorage.setItem('tnp.nudge', 'closed'); } catch {} };
  return (
    <aside className="nudge" aria-label="Réserver un terrain">
      <button type="button" className="nudge-x" onClick={close} aria-label="Fermer"><X size={16} /></button>
      <img src="/images/jouer.webp" alt="" />
      <div>
        <p className="nudge-t">Un terrain ce soir ?</p>
        <p className="nudge-s">9 terrains, de 6 h à minuit.</p>
        <Link href="/reserver" className="btn btn-blue nudge-b" onClick={close}>Réserver</Link>
      </div>
    </aside>
  );
}
