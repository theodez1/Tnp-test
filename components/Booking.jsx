'use client';
import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Check } from 'lucide-react';
import { useUser, addBooking, setPending, takePending } from '../lib/store';
import { COURTS } from '../lib/info';

const DURATIONS = [{ min: 60, label: '1 h' }, { min: 90, label: '1 h 30' }, { min: 120, label: '2 h' }];
const iso = (d) => d.toISOString().slice(0, 10);
const hhmm = (m) => `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`;

// Disponibilités simulées, stables pour un même créneau. À remplacer par l'API du club.
function freeCourts(date, start) {
  let h = 0;
  for (const c of date + start) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  const evening = parseInt(start) >= 18 && parseInt(start) < 22;
  return h % (evening ? 4 : 10) === 0 ? 0 : (h % (evening ? 3 : COURTS)) + 1;
}

export default function Booking() {
  const router = useRouter();
  const user = useUser();
  const days = useMemo(() => Array.from({ length: 14 }, (_, i) => { const d = new Date(); d.setDate(d.getDate() + i); return d; }), []);
  const [date, setDate] = useState(iso(days[0]));
  const [duration, setDuration] = useState(90);
  const [time, setTime] = useState(null);
  const [players, setPlayers] = useState(4);
  const [done, setDone] = useState(null);

  // Reprendre une réservation commencée avant la connexion
  useEffect(() => {
    if (!user) return;
    const p = takePending();
    if (p) { setDate(p.date); setDuration(p.duration); setTime(p.time); setPlayers(p.players); }
  }, [user]);

  const now = new Date();
  const slots = [];
  for (let m = 6 * 60; m + duration <= 24 * 60; m += 30) {
    const start = hhmm(m);
    const past = date === iso(now) && m <= now.getHours() * 60 + now.getMinutes();
    slots.push({ start, free: past ? 0 : freeCourts(date, start) });
  }

  function confirm() {
    const b = { date, time, duration, players };
    if (!user) { setPending(b); router.push('/compte?suite=reserver'); return; }
    addBooking({ ...b, email: user.email, court: (parseInt(time) % COURTS) + 1 });
    setDone(b); setTime(null);
  }

  const label = (d) => new Date(d + 'T12:00:00').toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' });

  if (done) {
    return (
      <div className="bk-done">
        <span className="bk-check"><Check size={30} strokeWidth={2.6} /></span>
        <h2>Terrain réservé</h2>
        <p>Le {label(done.date)} à {done.time.replace(':', ' h ')}, pour {DURATIONS.find((d) => d.min === done.duration).label}.</p>
        <div className="row">
          <Link className="btn btn-blue" href="/compte">Voir mes réservations</Link>
          <button className="btn btn-line" onClick={() => setDone(null)}>Réserver un autre créneau</button>
        </div>
      </div>
    );
  }

  return (
    <div className="bk">
      <fieldset className="bk-step">
        <legend>Jour</legend>
        <div className="chips chips-scroll">
          {days.map((d) => {
            const v = iso(d);
            return (
              <button key={v} type="button" className={`day ${date === v ? 'is-on' : ''}`} aria-pressed={date === v} onClick={() => { setDate(v); setTime(null); }}>
                <span>{d.toLocaleDateString('fr-FR', { weekday: 'short' }).replace('.', '')}</span>
                <strong>{d.getDate()}</strong>
                <span>{d.toLocaleDateString('fr-FR', { month: 'short' }).replace('.', '')}</span>
              </button>
            );
          })}
        </div>
      </fieldset>

      <div className="bk-two">
        <fieldset className="bk-step">
          <legend>Durée</legend>
          <div className="chips">
            {DURATIONS.map((d) => (
              <button key={d.min} type="button" className={`chip ${duration === d.min ? 'is-on' : ''}`} aria-pressed={duration === d.min} onClick={() => { setDuration(d.min); setTime(null); }}>{d.label}</button>
            ))}
          </div>
        </fieldset>
        <fieldset className="bk-step">
          <legend>Joueurs</legend>
          <div className="chips">
            {[2, 4].map((n) => (
              <button key={n} type="button" className={`chip ${players === n ? 'is-on' : ''}`} aria-pressed={players === n} onClick={() => setPlayers(n)}>{n === 2 ? 'Simple · 2' : 'Double · 4'}</button>
            ))}
          </div>
        </fieldset>
      </div>

      <fieldset className="bk-step">
        <legend>Heure de début</legend>
        <div className="slots">
          {slots.map((s) => (
            <button key={s.start} type="button" disabled={!s.free} className={`slot ${time === s.start ? 'is-on' : ''}`} aria-pressed={time === s.start} onClick={() => setTime(s.start)}>
              <strong>{s.start}</strong>
              <span>{s.free ? `${s.free} terrain${s.free > 1 ? 's' : ''}` : 'Complet'}</span>
            </button>
          ))}
        </div>
      </fieldset>

      <div className={`bk-bar ${time ? 'is-on' : ''}`}>
        <div>
          {time ? (
            <><strong>{label(date)}</strong><span>{time.replace(':', ' h ')} · {DURATIONS.find((d) => d.min === duration).label} · {players} joueurs</span></>
          ) : (
            <span>Choisissez une heure de début.</span>
          )}
        </div>
        <button className="btn btn-blue btn-lg" disabled={!time} onClick={confirm}>
          {user === null ? 'Se connecter pour réserver' : 'Réserver ce créneau'}
        </button>
      </div>
    </div>
  );
}
