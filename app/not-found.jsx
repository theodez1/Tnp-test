import Link from 'next/link';
import { Header, Footer } from '../components/Site';

export const metadata = { title: 'Page introuvable | Toulouse Nord Padel' };

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="wrap page page-narrow nf">
        <p className="nf-code">404</p>
        <h1>Balle dehors</h1>
        <p className="muted">Cette page n'existe pas ou a été déplacée.</p>
        <div className="row">
          <Link className="btn btn-blue btn-lg" href="/">Retour à l'accueil</Link>
          <Link className="btn btn-line btn-lg" href="/reserver">Réserver un terrain</Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
