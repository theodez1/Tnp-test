'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowLeft, Check, CalendarDays, Clock3, Users, User, Video, Euro } from 'lucide-react';
import { useUser, addBooking } from '../lib/store';
import { COURT_LIST, courtName } from '../lib/info';
import { durLabel, priceFor, photoFor } from './Booking';

export default function ConfirmBooking() {
  const router = useRouter();
  const q = useSearchParams();
  const user = useUser();
  const [done, setDone] = useState(false);

  const date = q.get('d');
  const time = q.get('t');
  const players = Number(q.get('p')) === 2 ? 2 : 4;
  const court = COURT_LIST.find((c) => c.n === Number(q.get('c')));
  if (!date || !time || !court) {
    return <p className="empty">Ce créneau n'existe plus. <Link href="/reserver">Choisir un autre créneau</Link></p>;
  }
  const duration = players === 2 ? 60 : 90;
  const price = priceFor(court, time);
  const day = new Date(date + 'T12:00:00').toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' });

  function confirm() {
    if (!user) {
      router.push(`/compte?suite=${encodeURIComponent(`/reserver/confirmer?${q.toString()}`)}`);
      return;
    }
    addBooking({ date, time, duration, players, court: court.n, courtName: courtName(court), filmed: !!court.filmed, simple: court.type === 'simple', email: user.email });
    setDone(true);
  }

  if (done) {
    return (
      <div className="bk-done">
        <span className="bk-check"><Check size={30} strokeWidth={2.6} /></span>
        <h2>{courtName(court)} réservé</h2>
        <p>Le {day} à {time.replace(':', ' h ')}, pour {durLabel(duration)}.{court.filmed && ' Votre match sera filmé.'}</p>
        <div className="row">
          <Link className="btn btn-blue" href="/compte">Voir mes réservations</Link>
          <Link className="btn btn-line" href="/reserver">Réserver un autre créneau</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="confirm">
      <Link href="/reserver" className="back"><ArrowLeft size={18} /> Changer de créneau</Link>
      <div className="confirm-card">
        <div className="court-photo">
          <img src={photoFor(court)} alt="" />
          <div className="court-badges">
            <span className="badge">Padel</span>
            <span className="badge badge-solid">Indoor</span>
            {court.type === 'simple' && <span className="badge badge-solid"><User size={14} /> 1v1</span>}
            {court.filmed && <span className="badge badge-blue"><Video size={14} /> Filmé</span>}
          </div>
        </div>
        <div className="confirm-body">
          <h1>{courtName(court)}</h1>
          <ul className="confirm-list">
            <li><CalendarDays size={20} /><span>Date</span><strong>{day}</strong></li>
            <li><Clock3 size={20} /><span>Horaire</span><strong>{time.replace(':', ' h ')} · {durLabel(duration)}</strong></li>
            <li>{players === 2 ? <User size={20} /> : <Users size={20} />}<span>Format</span><strong>{players === 2 ? 'Simple, 2 joueurs' : 'Double, 4 joueurs'}</strong></li>
            {court.filmed && <li><Video size={20} /><span>Vidéo</span><strong>Match filmé et statistiques</strong></li>}
            <li className="confirm-total"><Euro size={20} /><span>Total</span><strong>{price} €</strong></li>
          </ul>
          <button className="btn btn-blue btn-lg confirm-btn" onClick={confirm} disabled={user === undefined}>
            {user === null ? 'Se connecter pour réserver' : `Réserver pour ${price} €`}
          </button>
          <p className="note">Démo : la réservation est enregistrée sur cet appareil uniquement.</p>
        </div>
      </div>
    </div>
  );
}
