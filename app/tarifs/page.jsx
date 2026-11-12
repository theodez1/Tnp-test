import Link from 'next/link';
import { Header, Footer } from '../../components/Site';
import { PRICE_TIERS, CENTRAL_EXTRA, SINGLE_PRICE } from '../../lib/info';

export const metadata = { title: 'Tarifs | Toulouse Nord Padel' };

export default function Tarifs() {
  return (
    <>
      <Header />
      <main className="wrap page">
        <div className="page-head">
          <h1>Tarifs</h1>
          <p className="muted">Prix d'un créneau de 1 h 30 en double, selon l'heure de début.</p>
        </div>

        <div className="price-grid">
          {PRICE_TIERS.map((t) => (
            <div key={t.id} className={`price ${t.id === 'pleine' ? 'is-hot' : ''}`}>
              <h3>{t.label}</h3>
              <p className="hrs">{t.hours}</p>
              <p className="amount">{t.price} €<small>le créneau</small></p>
              <p className="extra">{t.price + CENTRAL_EXTRA} € sur un court central filmé</p>
            </div>
          ))}
        </div>
        <p className="block-note">Les heures autonomes s'appliquent aussi aux créneaux autonomes du week-end.</p>

        <section className="block">
          <h2>Single et réductions</h2>
          <ul className="rows">
            <li><div><strong>Single</strong><br /><span>Séance de 1 h sur le terrain 1v1</span></div><b>{SINGLE_PRICE} €</b></li>
            <li><div><strong>Pitchouns</strong><br /><span>5 – 10 ans</span></div><b>8 €</b></li>
            <li><div><strong>Jeunes</strong><br /><span>11 – 17 ans</span></div><b>9 €</b></li>
            <li><div><strong>Étudiants</strong><br /><span>Sur présentation de la carte</span></div><b>-10 %</b></li>
            <li><div><strong>Carte 10 parties</strong><br /><span>10 parties achetées</span></div><b>1 offerte</b></li>
          </ul>
        </section>

        <section className="block">
          <h2>Académie</h2>
          <ul className="rows">
            <li><div><strong>Adultes</strong><br /><span>25 séances de 1 h 30</span></div><b>525 €</b></li>
            <li><div><strong>Jeunes 11 – 17 ans</strong><br /><span>25 séances de 1 h 30</span></div><b>470 €</b></li>
            <li><div><strong>Pitchouns 5 – 10 ans</strong><br /><span>25 séances de 1 h</span></div><b>275 €</b></li>
            <li><div><strong>Leçon solo</strong><br /><span>1 h avec un coach</span></div><b>45 €</b></li>
            <li><div><strong>Leçon duo</strong><br /><span>1 h</span></div><b>60 €</b></li>
            <li><div><strong>Leçon trio</strong><br /><span>1 h 30</span></div><b>90 €</b></li>
            <li><div><strong>Leçon quatuor</strong><br /><span>1 h 30</span></div><b>100 €</b></li>
          </ul>
          <p className="block-note">Tarifs du club au 25 septembre 2026. <Link href="/reserver">Réserver un terrain</Link></p>
        </section>
      </main>
      <Footer />
    </>
  );
}
