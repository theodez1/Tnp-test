'use client';
import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Check, Video, User, Users } from 'lucide-react';
import { useUser, addBooking, setPending, takePending } from '../lib/store';
import { COURT_LIST, courtName, tierFor, CENTRAL_EXTRA, SINGLE_PRICE } from '../lib/info';

const DURATIONS = [{ min: 60, label: '1 h' }, { min: 90, label: '1 h 30' }];
const durLabel = (m) => DURATIONS.find((d) => d.min === m).label;
const iso = (d) => d.toISOString().slice(0, 10);
const hhmm = (m) => `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`;
const toMin = (t) => parseInt(t) * 60 + parseInt(t.slice(3));

// Photo affichée sur chaque carte de terrain
const PHOTOS = ['/images/hero-padel.webp', '/images/courts-filmes.webp', '/images/tournois.webp'];
const photoFor = (c) => (c.filmed ? '/images/courts-filmes.webp' : c.type === 'simple' ? '/images/jouer.webp' : PHOTOS[c.n % PHOTOS.length]);

// Occupation simulée, stable pour un même terrain et une même demi-heure. À remplacer par l'API du club.
function takenHalfHour(date, m, n) {
  let h = 2166136261;
  for (const c of `${date}|${m}|${n}`) h = Math.imul(h ^ c.charCodeAt(0), 16777619) >>> 0;
  const evening = m >= 18 * 60 && m < 22 * 60;
  return h % 100 < (evening ? 70 : 30);
}
function courtFree(date, start, duration, n) {
  for (let m = toMin(start); m < toMin(start) + duration; m += 30) if (takenHalfHour(date, m, n)) return false;
  return true;
}

// Tarifs réels du club (voir lib/info.js)
function priceFor(court, t) {
  if (court.type === 'simple') return SINGLE_PRICE;
  return tierFor(toMin(t)).price + (court.filmed ? CENTRAL_EXTRA : 0);
}

// En double, pas de terrain 1v1. En simple, le terrain 1v1 et les terrains de double.
function eligible(court, players, filmedOnly) {
  if (players === 4 && court.type === 'simple') return false;
  if (filmedOnly && !court.filmed) return false;
  return true;
}

export default function Booking() {
  const router = useRouter();
  const user = useUser();
  const days = useMemo(() => Array.from({ length: 14 }, (_, i) => { const d = new Date(); d.setDate(d.getDate() + i); return d; }), []);
  const [date, setDate] = useState(iso(days[0]));
  const [players, setPlayers] = useState(4);
  const duration = players === 2 ? 60 : 90; // créneaux du club : double 1 h 30, single 1 h
  const [filmedOnly, setFilmedOnly] = useState(false);
  const [pick, setPick] = useState(null); // { court, time }
  const [done, setDone] = useState(null);

  useEffect(() => {
    if (!user) return;
    const p = takePending();
    if (p) { setDate(p.date); setPlayers(p.players); setFilmedOnly(!!p.filmedOnly); setPick({ court: p.court, time: p.time }); }
  }, [user]);

  const reset = (fn) => (v) => { fn(v); setPick(null); };

  // Pour le simple, le terrain 1v1 passe en premier
  const courts = COURT_LIST.filter((c) => eligible(c, players, filmedOnly))
    .sort((a, b) => (players === 2 ? (a.type === 'simple' ? -1 : b.type === 'simple' ? 1 : 0) : 0));

  const now = new Date();
  const startMin = date === iso(now) ? Math.ceil((now.getHours() * 60 + now.getMinutes() + 1) / 30) * 30 : 6 * 60;
  const timesFor = (c) => {
    const out = [];
    for (let m = Math.max(startMin, 6 * 60); m + duration <= 24 * 60; m += 30) {
      const t = hhmm(m);
      if (courtFree(date, t, duration, c.n)) out.push(t);
    }
    return out;
  };

  const selected = pick && COURT_LIST.find((c) => c.n === pick.court);

  function confirm() {
    const b = { date, time: pick.time, duration, players, court: pick.court, filmedOnly };
    if (!user) { setPending(b); router.push('/compte?suite=reserver'); return; }
    addBooking({ date, time: pick.time, duration, players, court: pick.court, courtName: courtName(selected), filmed: !!selected.filmed, simple: selected.type === 'simple', email: user.email });
    setDone({ ...b, name: courtName(selected), filmed: selected.filmed });
    setPick(null);
  }

  const label = (d) => new Date(d + 'T12:00:00').toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' });

  if (done) {
    return (
      <div className="bk-done">
        <span className="bk-check"><Check size={30} strokeWidth={2.6} /></span>
        <h2>{done.name} réservé</h2>
        <p>Le {label(done.date)} à {done.time.replace(':', ' h ')}, pour {durLabel(done.duration)}.{done.filmed && ' Votre match sera filmé.'}</p>
        <div className="row">
          <Link className="btn btn-blue" href="/compte">Voir mes réservations</Link>
          <button className="btn btn-line" onClick={() => setDone(null)}>Réserver un autre créneau</button>
        </div>
      </div>
    );
  }

  return (
    <div className="bk">
      <div className="chips chips-scroll" role="group" aria-label="Jour">
        {days.map((d) => {
          const v = iso(d);
          return (
            <button key={v} type="button" className={`day ${date === v ? 'is-on' : ''}`} aria-pressed={date === v} onClick={() => reset(setDate)(v)}>
              <span>{d.toLocaleDateString('fr-FR', { weekday: 'short' })}</span>
              <strong>{d.getDate()}</strong>
              <span>{d.toLocaleDateString('fr-FR', { month: 'short' })}</span>
            </button>
          );
        })}
      </div>

      <div className="chips filters" role="group" aria-label="Filtres">
        <button type="button" className={`chip ${players === 4 ? 'is-on' : ''}`} aria-pressed={players === 4} onClick={() => reset(setPlayers)(4)}><Users size={18} /> Double</button>
        <button type="button" className={`chip ${players === 2 ? 'is-on' : ''}`} aria-pressed={players === 2} onClick={() => reset(setPlayers)(2)}><User size={18} /> Simple 1v1</button>
        <span className="chip-sep" aria-hidden="true" />
        <button type="button" className={`chip ${filmedOnly ? 'is-on' : ''}`} aria-pressed={filmedOnly} onClick={() => reset(setFilmedOnly)(!filmedOnly)}><Video size={18} /> Filmé</button>
      </div>

      <div className="court-list">
        {courts.map((c) => {
          const times = timesFor(c);
          return (
            <article key={c.n} className="court-item">
              <div className="court-photo">
                <img src={photoFor(c)} alt="" loading="lazy" />
                <div className="court-badges">
                  <span className="badge">Padel</span>
                  <span className="badge badge-solid">Indoor</span>
                  {c.type === 'simple' && <span className="badge badge-solid"><User size={14} /> 1v1</span>}
                  {c.filmed && <span className="badge badge-blue"><Video size={14} /> Filmé</span>}
                </div>
              </div>
              <div className="court-body">
                <h3>{courtName(c)}</h3>
                {times.length ? (
                  <div className="times">
                    {times.map((t) => {
                      const on = pick && pick.court === c.n && pick.time === t;
                      return (
                        <button key={t} type="button" className={`time ${on ? 'is-on' : ''}`} aria-pressed={on} aria-label={`${courtName(c)} à ${t}`} onClick={() => setPick(on ? null : { court: c.n, time: t })}><strong>{t}</strong><span>{priceFor(c, t)} €</span></button>
                      );
                    })}
                  </div>
                ) : (
                  <p className="court-full">Complet ce jour-là pour {durLabel(duration)}.</p>
                )}
              </div>
            </article>
          );
        })}
      </div>

      {pick && selected && (
        <div className="bk-bar">
          <div>
            <strong>{courtName(selected)}</strong>
            <span>{label(date)} · {pick.time.replace(':', ' h ')} · {durLabel(duration)} · {priceFor(selected, pick.time)} €</span>
          </div>
          <button className="btn btn-blue btn-lg" onClick={confirm}>
            {user === null ? 'Se connecter pour réserver' : 'Réserver'}
          </button>
        </div>
      )}
    </div>
  );
}
