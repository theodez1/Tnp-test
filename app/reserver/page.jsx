import { Header, Footer, PageHero, CallBand, PHONE, PHONE_HREF } from '../../components/Site';

export const metadata = { title: 'Jouer | Toulouse Nord Padel' };

export default function Reserver() {
  return (
    <>
      <Header />
      <main>
        <PageHero
          title="Réserver un terrain"
          lead="Neuf terrains indoor, disponibles de 6 h à minuit, tous les jours."
          image="/images/jouer.webp"
          alt="Joueur en position de coup droit sur un terrain bleu"
        />
        <section className="wrap prose-grid">
          <div className="prose">
            <h2>Comment réserver</h2>
            <ol className="flow">
              <li><strong>Choisissez votre créneau.</strong> Un match de padel dure en général 1 h 30. Prévoyez quatre joueurs pour un double.</li>
              <li><strong>Appelez l'accueil.</strong> L'équipe vérifie les disponibilités et confirme votre terrain.</li>
              <li><strong>Arrivez un peu avant.</strong> Le temps de vous garer, de vous changer et de vous échauffer.</li>
            </ol>
          </div>
          <aside className="side">
            <p className="side-h">Accueil du club</p>
            <p className="side-big"><a href={PHONE_HREF}>{PHONE}</a></p>
            <p>Tous les jours, de 6 h à minuit.</p>
            <p>Pas de raquette ? Renseignez-vous à l'accueil sur le prêt de matériel.</p>
          </aside>
        </section>
        <CallBand title="Un terrain pour ce soir ?" text="Les créneaux en soirée partent vite. Appelez pour connaître les disponibilités." />
      </main>
      <Footer />
    </>
  );
}
