import Link from 'next/link';
import { Header, Footer, PageHero, CallBand } from '../../components/Site';

export const metadata = { title: 'Académie | Toulouse Nord Padel' };

const COACHES = [
  { name: 'Yannick', bio: 'Ancien joueur de tennis professionnel (590e mondial, top 40 français), diplômé TFP Padel.' },
  { name: 'Erwan Corbon', bio: '29 ans, ancien 104e joueur français de padel.' },
  { name: 'Paul', bio: 'Coach diplômé, cours collectifs et particuliers.' },
];

export default function Academie() {
  return (
    <>
      <Header />
      <main>
        <PageHero
          title="L'académie"
          lead="Trois coachs diplômés, des cours pour tous les niveaux et une école de padel dès 5 ans."
          image="/images/academie.webp"
          alt="Raquette de padel et balle posées sur le gazon synthétique"
        />
        <div className="wrap">
          <section className="block">
            <h2>Les coachs</h2>
            <div className="coaches">
              {COACHES.map((c) => (
                <div key={c.name} className="coach">
                  <span className="coach-ini">{c.name[0]}</span>
                  <h3>{c.name}</h3>
                  <p>{c.bio}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="block">
            <h2>Les formules</h2>
            <ul className="rows">
              <li><div><strong>Cours collectifs adultes</strong><br /><span>25 séances de 1 h 30, tous niveaux, cours femmes et mixtes</span></div><b>525 €</b></li>
              <li><div><strong>École jeunes 11 – 17 ans</strong><br /><span>25 séances de 1 h 30</span></div><b>470 €</b></li>
              <li><div><strong>École Pitchouns 5 – 10 ans</strong><br /><span>25 séances de 1 h</span></div><b>275 €</b></li>
              <li><div><strong>Cours particulier</strong><br /><span>1 h seul avec un coach</span></div><b>45 €</b></li>
              <li><div><strong>Cours en duo</strong><br /><span>1 h à deux</span></div><b>60 €</b></li>
              <li><div><strong>Stages vacances</strong><br /><span>Journée ou demi-journée, enfants et adultes</span></div><b>Sur devis</b></li>
            </ul>
            <p className="block-note">Aussi : préparation au championnat par équipes. <Link href="/tarifs">Tous les tarifs</Link></p>
          </section>
        </div>
        <div className="block" />
        <CallBand phoneOnly title="Réserver un premier cours" text="Dites-nous votre niveau, on vous oriente vers le bon groupe." />
      </main>
      <Footer />
    </>
  );
}
