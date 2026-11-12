import { Header, Footer } from '../../components/Site';
import Agenda from '../../components/Agenda';

export const metadata = { title: 'Tournois et animations | Toulouse Nord Padel' };

export default function Tournois() {
  return (
    <>
      <Header />
      <main className="wrap page">
        <div className="page-head">
          <h1>Tournois et animations</h1>
          <p className="muted">Tournois homologués, soirées américano et rencontres du club. Choisissez un jour pour voir le détail.</p>
        </div>
        <Agenda />
      </main>
      <Footer />
    </>
  );
}
