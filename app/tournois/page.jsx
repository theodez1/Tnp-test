import { Header, Footer, PageHero, CallBand, EventCard } from '../../components/Site';
import { upcoming } from '../../lib/events';

export const dynamic = 'force-dynamic';

export const metadata = { title: 'Tournois | Toulouse Nord Padel' };

export default function Tournois() {
  return (
    <>
      <Header />
      <main>
        <PageHero
          title="Tournois et rencontres"
          lead="Des compétitions pour se mesurer, des rencontres pour se retrouver, à tous les niveaux."
          image="/images/tournois.webp"
          alt="Espace détente face aux terrains pendant un match"
        />
        <section className="wrap prose-grid">
          <div className="prose">
            <h2>Ce que le club organise</h2>
            <dl className="defs">
              <div><dt>Tournois</dt><dd>Des compétitions organisées au club au fil de la saison, avec des tableaux adaptés aux différents niveaux.</dd></div>
              <div><dt>Rencontres</dt><dd>Des soirées et animations pour jouer avec d'autres membres et trouver de nouveaux partenaires.</dd></div>
              <div><dt>Après le match</dt><dd>Le club-house et son bar donnent sur les terrains : on y suit la fin des tableaux.</dd></div>
            </dl>
          </div>
          <aside className="side">
            <p className="side-h">Calendrier</p>
            {upcoming().length > 0 && <div className="events">{upcoming().map((e) => <EventCard key={e.date + e.title} event={e} />)}</div>}
            <p>Les dates, catégories et places disponibles changent au cours de la saison. L'accueil vous donne le programme à jour et prend votre inscription.</p>
          </aside>
        </section>
        <CallBand title="Inscrire votre équipe" text="Demandez les prochaines dates et réservez votre place auprès de l'accueil." />
      </main>
      <Footer />
    </>
  );
}
