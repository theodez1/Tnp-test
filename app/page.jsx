import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Header, Footer, EventCard } from '../components/Site';
import { PHONE, PHONE_HREF, ADDRESS, MAPS_HREF } from '../lib/info';
import { upcoming } from '../lib/events';

const TILES = [
  { href: '/reserver', title: 'Jouer', sub: '9 terrains indoor', tag: 'dès 9 €', image: '/images/academie.webp' },
  { href: '/tournois', title: 'Tournois', sub: 'Homologués FFT', tag: 'P25 → P1000', image: '/images/tournois.webp' },
  { href: '/academie', title: 'Académie', sub: '3 coachs diplômés', tag: 'dès 5 ans', image: '/images/jouer.webp' },
  { href: '/courts-filmes', title: 'Courts filmés', sub: 'Vidéo et stats', tag: '+1 €', image: '/images/courts-filmes.webp' },
];


export const dynamic = 'force-dynamic';

export default function Home() {
  const events = upcoming().slice(0, 3);
  return (
    <>
      <Header overlay />
      <main className="home">
        <section className="hero">
          <img src="/images/hero-padel.webp" alt="Terrains de padel indoor éclairés, vus depuis l'allée vitrée" className="hero-img" />
          <div className="wrap hero-txt">
            <h1>Toulouse Nord Padel</h1>
            <p className="hero-sub">Ouvert 7j/7 de 6 h à minuit · Saint-Jory</p>
          </div>
        </section>

        <section className="wrap tiles" aria-label="Activités du club">
          {TILES.map((t) => (
            <Link key={t.href} href={t.href} className="tile">
              <img src={t.image} alt="" />
              <span className="tile-tag">{t.tag}</span>
              <span className="tile-txt"><strong>{t.title}</strong><span>{t.sub}</span></span>
              <span className="round round-glass"><ArrowRight size={20} /></span>
            </Link>
          ))}
        </section>

        <section className="wrap sect" aria-labelledby="ev-t">
          <div className="sect-head">
            <h2 id="ev-t">Prochains événements</h2>
            <Link href="/tournois" className="more">Voir tout <ArrowRight size={18} /></Link>
          </div>
          {events.length ? (
            <div className="events">{events.map((e) => <EventCard key={e.date + e.title} event={e} />)}</div>
          ) : (
            <p className="empty">Le prochain calendrier arrive bientôt. Appelez l'accueil pour connaître les dates.</p>
          )}
        </section>

        <section className="wrap sect visit" aria-labelledby="visit-t">
          <div className="visit-photo">
            <img src="/images/tournois.webp" alt="Le club-house, avec ses canapés face aux terrains" />
          </div>
          <div>
            <h2 id="visit-t">Venir au club</h2>
            <p className="visit-big">{ADDRESS[0]}<br />{ADDRESS[1]}</p>
            <p className="muted">Accès direct par l'A62. Parking gratuit avec bornes de recharge, ouvert tous les jours de 6 h à minuit.</p>
            <div className="row">
              <a className="btn btn-blue" href={MAPS_HREF} target="_blank" rel="noreferrer">Itinéraire</a>
              <a className="btn btn-line" href={PHONE_HREF}>{PHONE}</a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
