import { Header, Footer, PageHero, CallBand } from '../../components/Site';
import { ADDRESS, MAPS_HREF, EMAIL, PHONE, PHONE_HREF } from '../../lib/info';

export const metadata = { title: 'Le club | Toulouse Nord Padel' };

const FIGURES = [
  { big: '9', label: 'terrains homologués FFT', sub: '8 doubles et 1 single' },
  { big: '9 m', label: 'sous plafond', sub: 'éclairage anti-éblouissement' },
  { big: '365', label: 'jours par an', sub: 'de 6 h à minuit' },
  { big: '2', label: 'courts centraux filmés', sub: 'vidéo et statistiques' },
];

const MENU = [
  { item: 'Pizzas fraîches', from: 'Ma Minute Pizza' },
  { item: 'Sushis et poke bowls', from: 'Washoku by Zoé' },
  { item: 'Planches fromage et charcuterie', from: 'À partager' },
  { item: 'Bières locales', from: 'Le Gué de Moines, La Berlue' },
  { item: 'Jus artisanaux et vins', from: 'Sélection du bar' },
  { item: 'Glaces artisanales', from: 'La Prairie des Glaces' },
  { item: 'Petit-déjeuner', from: 'Dès 9 h' },
  { item: 'Menu enfant', from: 'Pour les familles' },
];

export default function LeClub() {
  return (
    <>
      <Header />
      <main>
        <PageHero title="Le club" lead="Plus qu'un club de padel. Un lieu de vie." image="/images/hero-padel.webp" alt="Terrains de padel indoor éclairés" />

        <section className="wrap block">
          <h2>Les terrains</h2>
          <div className="figures">
            {FIGURES.map((f) => (
              <div key={f.label} className="figure">
                <strong>{f.big}</strong>
                <span>{f.label}</span>
                <small>{f.sub}</small>
              </div>
            ))}
          </div>
          <p className="block-note">Chauffés l'hiver, climatisés l'été. Le court filmé coûte 1 € de plus par créneau.</p>
        </section>

        <section className="wrap block">
          <div className="bar">
            <div className="bar-photo">
              <img src="/images/tournois.webp" alt="Le club-house, avec ses canapés face aux terrains" />
              <span className="bar-hours">Bar ouvert de 9 h à 22 h 30</span>
            </div>
            <div>
              <h2>Bar et snacking</h2>
              <p className="muted">Au club-house climatisé ou en terrasse, avec écran géant pour le foot, le rugby, le tennis et le vélo.</p>
              <ul className="menu">
                {MENU.map((m) => (
                  <li key={m.item}><span>{m.item}</span><i aria-hidden="true" /><em>{m.from}</em></li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="wrap block">
          <h2>Événements et séminaires</h2>
          <div className="offers">
            <div className="offer"><span className="offer-k">Séminaires</span><strong>35 personnes</strong><p>Salle climatisée de 45 m², écran connecté, rétroprojecteur et café.</p></div>
            <div className="offer"><span className="offer-k">Terrasse privatisable</span><strong>Sur devis</strong><p>Afterworks, associations, comités d'entreprise.</p></div>
            <div className="offer"><span className="offer-k">Anniversaires enfants</span><strong>Padel et goûter</strong><p>Une session sur les terrains puis le goûter au club-house.</p></div>
          </div>
        </section>

        <section className="wrap block">
          <h2>Venir au club</h2>
          <div className="visit-card">
            <div>
              <p className="visit-big">{ADDRESS[0]}<br />{ADDRESS[1]}</p>
              <p className="muted">Accès direct par l'A62, axe Toulouse – Montauban. Parking gratuit avec bornes de recharge électrique.</p>
            </div>
            <div className="row">
              <a className="btn btn-blue" href={MAPS_HREF} target="_blank" rel="noreferrer">Itinéraire</a>
              <a className="btn btn-line" href={PHONE_HREF}>{PHONE}</a>
              <a className="btn btn-line" href={`mailto:${EMAIL}`}>Écrire au club</a>
            </div>
          </div>
        </section>
        <div className="block" />
        <CallBand title="Passez nous voir" text="Ouvert tous les jours de 6 h à minuit." />
      </main>
      <Footer />
    </>
  );
}
