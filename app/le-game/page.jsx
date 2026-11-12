import { Header, Footer, PageHero, CallBand, ADDRESS, MAPS_HREF } from '../../components/Site';

export const metadata = { title: 'Le club | Toulouse Nord Padel' };

export default function LeClub() {
  return (
    <>
      <Header />
      <main>
        <PageHero
          title="Le club"
          lead="Un lieu pour jouer, et pour rester un peu après."
          image="/images/hero-padel.webp"
          alt="Terrains de padel indoor éclairés, vus depuis l'allée vitrée"
        />
        <section className="wrap prose-grid">
          <div className="prose">
            <h2>Sur place</h2>
            <dl className="defs">
              <div><dt>Neuf terrains indoor</dt><dd>Gazon bleu, vitres, éclairage homogène : les mêmes conditions de jeu toute l'année, à 6 h comme à 23 h.</dd></div>
              <div><dt>Club-house et bar</dt><dd>Des canapés face aux terrains pour attendre son créneau ou refaire le match.</dd></div>
              <div><dt>Parking gratuit</dt><dd>Devant le club, sans limite de temps.</dd></div>
            </dl>
          </div>
          <aside className="side">
            <p className="side-h">Adresse</p>
            <p className="side-big">{ADDRESS[0]}<br />{ADDRESS[1]}</p>
            <p><a href={MAPS_HREF} target="_blank" rel="noreferrer">Voir l'itinéraire</a></p>
          </aside>
        </section>
        <CallBand title="Passez nous voir" text="Ouvert tous les jours de 6 h à minuit. L'accueil répond à vos questions par téléphone." />
      </main>
      <Footer />
    </>
  );
}
