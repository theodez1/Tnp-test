import { Header, Footer, PageHero, CallBand } from '../../components/Site';

export const metadata = { title: 'Académie | Toulouse Nord Padel' };

export default function Academie() {
  return (
    <>
      <Header />
      <main>
        <PageHero
          title="L'académie"
          lead="Des cours pour apprendre le padel ou pour passer un cap, à votre rythme."
          image="/images/academie.webp"
          alt="Raquette de padel et balle posées sur le gazon synthétique"
        />
        <section className="wrap prose-grid">
          <div className="prose">
            <h2>Pour qui</h2>
            <dl className="defs">
              <div><dt>Vous débutez</dt><dd>La prise de raquette, le service, le jeu avec les vitres : les bases pour tenir l'échange dès les premières séances.</dd></div>
              <div><dt>Vous jouez déjà</dt><dd>Placement, régularité, coups au-dessus de la tête : on travaille ce qui vous fait perdre des points.</dd></div>
              <div><dt>En groupe ou seul</dt><dd>Cours collectifs, cours particuliers et stages pendant les vacances, selon les disponibilités.</dd></div>
            </dl>
          </div>
          <aside className="side">
            <p className="side-h">Formules et horaires</p>
            <p>L'accueil vous présente les formules en cours, les niveaux et les créneaux encore ouverts.</p>
          </aside>
        </section>
        <CallBand phoneOnly title="Réserver un premier cours" text="Dites-nous votre niveau, on vous oriente vers le bon groupe." />
      </main>
      <Footer />
    </>
  );
}
