import { Header, Footer } from '../../components/Site';
import Booking from '../../components/Booking';
import { PHONE, PHONE_HREF } from '../../lib/info';

export const metadata = { title: 'Réserver un terrain | Toulouse Nord Padel' };

export default function Reserver() {
  return (
    <>
      <Header />
      <main className="wrap page">
        <div className="page-head">
          <h1>Réserver un terrain</h1>
          <p className="muted">9 terrains indoor, de 6 h à minuit, tous les jours. Une question ? <a href={PHONE_HREF}>{PHONE}</a></p>
        </div>
        <Booking />
      </main>
      <Footer />
    </>
  );
}
