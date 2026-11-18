import { Suspense } from 'react';
import { Header, Footer } from '../../components/Site';
import Account from '../../components/Account';

export const metadata = { title: 'Mon compte | TNP Padel Club' };

export default function Compte() {
  return (
    <>
      <Header />
      <main className="wrap page page-narrow">
        <Suspense><Account /></Suspense>
      </main>
      <Footer />
    </>
  );
}
