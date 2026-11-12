import { Header, Footer, PageHero, CallBand } from '../../components/Site';
import { ServiceGrid } from '../../components/Services';
import { ADDRESS, MAPS_HREF, EMAIL, PHONE, PHONE_HREF } from '../../lib/info';

export const metadata = { title: 'Le club | Toulouse Nord Padel' };

const COURTS = [
  { icon: 'Award', title: '9 terrains FFT', text: '8 doubles et 1 single, homologués pour les tournois officiels.' },
  { icon: 'Thermometer', title: 'Chauffés et climatisés', text: 'Les mêmes conditions de jeu été comme hiver.' },
  { icon: 'Ruler', title: '9 m sous plafond', text: 'Éclairage anti-éblouissement dernière génération.' },
  { icon: 'Video', title: 'Courts centraux filmés', text: 'Vidéo et statistiques de match en temps réel.', tag: '+1 €' },
  { icon: 'CalendarClock', title: 'Ouvert 365 jours', text: 'De 6 h à minuit, accès autonome tôt le matin et tard le soir.' },
];

const MENU = [
  { icon: 'Pizza', title: 'Pizzas', text: 'Pizzas fraîches de Ma Minute Pizza.' },
  { icon: 'Fish', title: 'Sushis et poke', text: 'Par Washoku by Zoé.' },
  { icon: 'UtensilsCrossed', title: 'Planches apéro', text: 'Fromages et charcuterie à partager.' },
  { icon: 'Beer', title: 'Bières locales', text: 'Le Gué de Moines, La Berlue, jus artisanaux et vins.' },
  { icon: 'IceCream', title: 'Glaces', text: 'Glaces artisanales La Prairie des Glaces.' },
  { icon: 'Coffee', title: 'Petit-déjeuner', text: 'Dès 9 h, et un menu enfant pour les familles.' },
];

const EVENTS = [
  { icon: 'Presentation', title: 'Salle de séminaire', text: "45 m² climatisés, jusqu'à 35 personnes, écran connecté.", tag: '35 pers.' },
  { icon: 'Sun', title: 'Terrasse privatisable', text: 'Afterworks, associations, comités d’entreprise.' },
  { icon: 'Cake', title: 'Anniversaires enfants', text: 'Une session de padel puis le goûter au club.' },
  { icon: 'Tv', title: 'Soirées sport', text: 'Écran géant pour le foot, le rugby, le tennis et le vélo.' },
];

export default function LeClub() {
  return (
    <>
      <Header />
      <main>
        <PageHero title="Le club" lead="Plus qu'un club de padel. Un lieu de vie." image="/images/hero-padel.webp" alt="Terrains de padel indoor éclairés" />
        <div className="wrap">
          <section className="block">
            <h2>Les terrains</h2>
            <ServiceGrid items={COURTS} />
          </section>

          <section className="block">
            <div className="split-media">
              <img src="/images/tournois.webp" alt="Le club-house, avec ses canapés face aux terrains" />
              <div>
                <h2>Bar et snacking</h2>
                <p className="muted">Ouvert de 9 h à 22 h 30, dans le club-house climatisé ou en terrasse.</p>
              </div>
            </div>
            <ServiceGrid items={MENU} />
          </section>

          <section className="block">
            <h2>Événements et séminaires</h2>
            <ServiceGrid items={EVENTS} />
          </section>

          <section className="block">
            <h2>Venir au club</h2>
            <ServiceGrid items={[
              { icon: 'ParkingSquare', title: 'Parking gratuit', text: 'Devant le club, avec bornes de recharge électrique.' },
              { icon: 'PlugZap', title: 'Accès A62', text: `${ADDRESS[0]}, ${ADDRESS[1]}. Axe Toulouse – Montauban.` },
            ]} />
            <div className="row" style={{ marginTop: 16 }}>
              <a className="btn btn-blue" href={MAPS_HREF} target="_blank" rel="noreferrer">Itinéraire</a>
              <a className="btn btn-line" href={PHONE_HREF}>{PHONE}</a>
              <a className="btn btn-line" href={`mailto:${EMAIL}`}>{EMAIL}</a>
            </div>
          </section>
        </div>
        <div className="block" />
        <CallBand title="Passez nous voir" text="Ouvert tous les jours de 6 h à minuit." />
      </main>
      <Footer />
    </>
  );
}
