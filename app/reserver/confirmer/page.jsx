import { Suspense } from 'react';
import { Header, Footer } from '../../../components/Site';
import ConfirmBooking from '../../../components/ConfirmBooking';

export const metadata = { title: 'Confirmer la réservation | Toulouse Nord Padel' };

export default function Confirmer() {
  return (
    <>
      <Header />
      <main className="wrap page page-narrow">
        <Suspense><ConfirmBooking /></Suspense>
      </main>
      <Footer />
    </>
  );
}
