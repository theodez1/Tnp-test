import { Suspense } from 'react';
import { Header, Footer } from '../../../components/Site';
import ConfirmBooking from '../../../components/ConfirmBooking';

export const metadata = { title: 'Confirmer la réservation | TNP Padel Club' };

export default function Confirmer() {
  return (
    <>
      <Header />
      <main className="wrap page page-confirm">
        <Suspense><ConfirmBooking /></Suspense>
      </main>
      <Footer />
    </>
  );
}
