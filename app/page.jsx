'use client';
import Link from 'next/link';
import { useState } from 'react';
import { Header, Footer, Court, PHONE, PHONE_HREF, ADDRESS, MAPS_HREF } from '../components/Site';

const ACTIVITIES = [
  { href: '/reserver', title: 'Jouer', text: 'Réservez un terrain pour un match entre amis, à deux ou à quatre.', image: '/images/jouer.webp', alt: 'Joueur en position de coup droit sur un terrain bleu' },
  { href: '/tournois', title: 'Tournois', text: 'Compétitions et rencontres organisées par le club tout au long de la saison.', image: '/images/tournois.webp', alt: 'Espace détente face aux terrains pendant un match' },
  { href: '/academie', title: 'Académie', text: 'Des cours pour découvrir le padel ou travailler votre technique.', image: '/images/academie.webp', alt: 'Raquette de padel et balle posées sur le gazon synthétique' },
  { href: '/courts-filmes', title: 'Courts filmés', text: 'Revoyez vos plus beaux points grâce aux terrains équipés de caméras.', image: '/images/courts-filmes.webp', alt: 'Terrain vu à travers la vitre, sous la verrière' },
];

const HOURS = Array.from({ length: 19 }, (_, i) => i + 6); // 6 → 24

export default function Home() {
  const [active, setActive] = useState(0);
  return (
    <>
      <Header />
      <main>
        <section className="hero">
          <img src="/images/hero-padel.webp" alt="Terrains de padel indoor éclairés, vus depuis l'allée vitrée" className="hero-img" />
          <div className="wrap hero-txt">
            <h1>Le padel à Toulouse&nbsp;Nord</h1>
            <p>Un club indoor à Saint-Jory, ouvert à tous les niveaux. Neuf terrains, de 6&nbsp;h à minuit, tous les jours.</p>
            <div className="hero-cta">
              <Link className="btn btn-ball btn-lg" href="/reserver">Réserver un terrain</Link>
              <a className="btn btn-ghost btn-lg" href={PHONE_HREF}>{PHONE}</a>
            </div>
          </div>
        </section>

        <section className="club wrap" aria-labelledby="club-t">
          <div className="club-courts" aria-hidden="true">
            {Array.from({ length: 9 }, (_, i) => <Court key={i} />)}
          </div>
          <div className="club-info">
            <h2 id="club-t">Neuf terrains, sous le même toit</h2>
            <p className="lede">On joue au sec et à la lumière, quelle que soit la météo. Entre deux matchs, le club-house et son bar vous attendent.</p>
            <dl className="facts">
              <div><dt>Terrains</dt><dd>9, tous indoor</dd></div>
              <div><dt>Ouverture</dt><dd>7 jours sur 7</dd></div>
              <div><dt>Parking</dt><dd>Gratuit, sur place</dd></div>
              <div><dt>Club-house</dt><dd>Bar et espace détente</dd></div>
            </dl>
            <div className="hours" role="img" aria-label="Ouvert de 6 heures à minuit">
              <div className="hours-bar" />
              <div className="hours-ticks">
                {HOURS.map((h) => <span key={h}>{h % 3 === 0 ? (h === 24 ? '0 h' : `${h} h`) : ''}</span>)}
              </div>
            </div>
          </div>
        </section>

        <section className="acts" aria-labelledby="acts-t">
          <div className="wrap acts-in">
            <h2 id="acts-t" className="sr-only">Au club</h2>
            <div className="acts-media">
              {ACTIVITIES.map((a, i) => (
                <img key={a.href} src={a.image} alt={a.alt} className={i === active ? 'is-on' : ''} />
              ))}
            </div>
            <ul className="acts-list">
              {ACTIVITIES.map((a, i) => (
                <li key={a.href}>
                  <Link href={a.href} className={i === active ? 'is-on' : ''} onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)}>
                    <span className="acts-title">{a.title}</span>
                    <span className="acts-text">{a.text}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="visit wrap" aria-labelledby="visit-t">
          <h2 id="visit-t">Venir au club</h2>
          <div className="visit-grid">
            <div>
              <p className="visit-big">{ADDRESS[0]}<br />{ADDRESS[1]}</p>
              <p>Au nord de Toulouse, à quelques minutes du périphérique. Parking gratuit devant le club.</p>
              <a className="btn btn-court" href={MAPS_HREF} target="_blank" rel="noreferrer">Ouvrir dans Google Maps</a>
            </div>
            <div>
              <p className="visit-big">6 h – minuit</p>
              <p>Tous les jours, y compris le week-end. L'accueil répond au {PHONE} pour les réservations et les inscriptions.</p>
              <a className="btn btn-court" href={PHONE_HREF}>Appeler le club</a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
