import { Header, Footer, PageHero, CallBand } from '../../components/Site';
import { PRICE_TIERS, CENTRAL_EXTRA } from '../../lib/info';

export const metadata = { title: 'Courts filmés | Toulouse Nord Padel' };

export default function CourtsFilmes() {
  return (
    <>
      <Header />
      <main>
        <PageHero
          title="Courts filmés"
          lead="Les courts centraux enregistrent la vidéo de votre match et vos statistiques en temps réel."
          image="/images/courts-filmes.webp"
          alt="Terrain vu à travers la vitre, sous la verrière"
        />
        <section className="wrap prose-grid">
          <div className="prose">
            <h2>Comment ça marche</h2>
            <ol className="flow">
              <li><strong>Réservez un court central.</strong> Sur la page Réserver, activez le filtre « Filmé ».</li>
              <li><strong>Jouez votre match</strong> normalement, il n'y a rien à installer.</li>
              <li><strong>Revoyez vos points</strong> et vos statistiques après la partie.</li>
            </ol>
          </div>
          <aside className="side">
            <p className="side-h">Prix</p>
            <p className="side-big">+{CENTRAL_EXTRA} € le créneau</p>
            <p>Soit de {PRICE_TIERS[0].price + CENTRAL_EXTRA} € à {PRICE_TIERS[2].price + CENTRAL_EXTRA} € selon l'heure.</p>
          </aside>
        </section>
        <CallBand title="Réserver un court filmé" text="Choisissez un court central au moment de réserver." />
      </main>
      <Footer />
    </>
  );
}
