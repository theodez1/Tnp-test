import { Header, Footer, PageHero, CallBand } from '../../components/Site';

export const metadata = { title: 'Courts filmés | Toulouse Nord Padel' };

export default function CourtsFilmes() {
  return (
    <>
      <Header />
      <main>
        <PageHero
          title="Courts filmés"
          lead="Deux terrains sont équipés de caméras Spash. Jouez, puis revoyez vos échanges."
          image="/images/courts-filmes.webp"
          alt="Terrain vu à travers la vitre, sous la verrière"
        />
        <section className="wrap prose-grid">
          <div className="prose">
            <h2>Comment ça marche</h2>
            <ol className="flow">
              <li><strong>Réservez un terrain filmé</strong> : activez le filtre « Terrain filmé Spash » sur la page de réservation.</li>
              <li><strong>Jouez votre match</strong> normalement, sans rien installer.</li>
              <li><strong>Récupérez vos vidéos</strong> selon les modalités indiquées par l'accueil.</li>
            </ol>
          </div>
          <aside className="side">
            <p className="side-h">À quoi ça sert</p>
            <p>Partager un point gagnant, bien sûr. Mais aussi voir votre placement, comprendre vos fautes et suivre vos progrès d'un match à l'autre.</p>
          </aside>
        </section>
        <CallBand title="Réserver un court filmé" text="Deux terrains sont équipés Spash. Choisissez-les directement au moment de réserver." />
      </main>
      <Footer />
    </>
  );
}
