import { Header, Footer, PageHero, CallBand } from '../../components/Site';
import { ADDRESS, MAPS_HREF, EMAIL, PHONE, PHONE_HREF } from '../../lib/info';

export const metadata = { title: 'Le club | Toulouse Nord Padel' };

export default function LeClub() {
  return (
    <>
      <Header />
      <main>
        <PageHero
          title="Le club"
          lead="Plus qu'un club de padel. Un lieu de vie."
          image="/images/tournois.webp"
          alt="Le club-house, avec ses canapés face aux terrains"
        />
        <div className="wrap">
          <section className="block">
            <h2>Les terrains</h2>
            <ul className="rows">
              <li><div><strong>9 terrains indoor homologués FFT</strong><br /><span>8 doubles et 1 single, chauffés et climatisés</span></div><b>9</b></li>
              <li><div><strong>9 m sous plafond</strong><br /><span>Éclairage anti-éblouissement dernière génération</span></div><b>9 m</b></li>
              <li><div><strong>Courts centraux filmés</strong><br /><span>Vidéo et statistiques de match en temps réel</span></div><b>+1 €</b></li>
              <li><div><strong>Ouvert 365 jours par an</strong><br /><span>De 6 h à minuit, accès autonome tôt le matin et tard le soir</span></div><b>6 h – 0 h</b></li>
            </ul>
          </section>

          <section className="block">
            <h2>Bar et snacking</h2>
            <p className="muted">Ouvert de 9 h à 22 h 30, au club-house climatisé ou en terrasse. Écran géant pour le foot, le rugby, le tennis et le vélo.</p>
            <div className="menu-grid">
              <div className="menu-item"><h3>Pizzas</h3><p>Pizzas fraîches de Ma Minute Pizza.</p></div>
              <div className="menu-item"><h3>Sushis et poke</h3><p>Par Washoku by Zoé.</p></div>
              <div className="menu-item"><h3>Planches apéro</h3><p>Fromages de Xavier et charcuterie.</p></div>
              <div className="menu-item"><h3>À boire</h3><p>Bières locales Le Gué de Moines et La Berlue, jus artisanaux, vins.</p></div>
              <div className="menu-item"><h3>Glaces</h3><p>Glaces artisanales La Prairie des Glaces.</p></div>
              <div className="menu-item"><h3>En famille</h3><p>Menu enfant, petit-déjeuner dès 9 h.</p></div>
            </div>
          </section>

          <section className="block">
            <h2>Événements et séminaires</h2>
            <ul className="rows">
              <li><div><strong>Salle de séminaire climatisée</strong><br /><span>45 m², jusqu'à 35 personnes, écran connecté et rétroprojecteur</span></div><b>35 pers.</b></li>
              <li><div><strong>Terrasse privatisable</strong><br /><span>Anniversaires, afterworks, associations, comités d'entreprise</span></div><b>Sur devis</b></li>
              <li><div><strong>Anniversaires enfants</strong><br /><span>Padel et goûter au club</span></div><b>Sur devis</b></li>
            </ul>
          </section>

          <section className="block">
            <h2>Venir au club</h2>
            <ul className="rows">
              <li><div><strong>{ADDRESS[0]}, {ADDRESS[1]}</strong><br /><span>Accès direct par l'A62, axe Toulouse – Montauban</span></div><a href={MAPS_HREF} target="_blank" rel="noreferrer">Itinéraire</a></li>
              <li><div><strong>Parking gratuit</strong><br /><span>Avec bornes de recharge électrique</span></div><b>0 €</b></li>
              <li><div><strong>Contact</strong><br /><span>{EMAIL}</span></div><a href={PHONE_HREF}>{PHONE}</a></li>
            </ul>
          </section>
        </div>
        <div className="block" />
        <CallBand title="Passez nous voir" text="Ouvert tous les jours de 6 h à minuit." />
      </main>
      <Footer />
    </>
  );
}
