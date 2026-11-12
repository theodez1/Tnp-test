'use client';
import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Video, User, Users } from 'lucide-react';
import { COURT_LIST, courtName, tierFor, CENTRAL_EXTRA, SINGLE_PRICE } from '../lib/info';

export const DURATIONS = [{ min: 60, label: '1 h' }, { min: 90, label: '1 h 30' }];
export const durLabel = (m) => DURATIONS.find((d) => d.min === m).label;
export const iso = (d) => d.toISOString().slice(0, 10);
const hhmm = (m) => `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`;
export const toMin = (t) => parseInt(t) * 60 + parseInt(t.slice(3));

// Photo affichée sur chaque carte de terrain
const PHOTOS = ['/images/hero-padel.webp', '/images/courts-filmes.webp', '/images/tournois.webp'];
export const photoFor = (c) => (c.filmed ? '/images/courts-filmes.webp' : c.type === 'simple' ? '/images/jouer.webp' : PHOTOS[c.n % PHOTOS.length]);

// Occupation simulée, stable pour un même terrain et une même demi-heure. À remplacer par l'API du club.
function takenHalfHour(date, m, n) {
  let h = 2166136261;
  for (const c of `${date}|${m}|${n}`) h = Math.imul(h ^ c.charCodeAt(0), 16777619) >>> 0;
  const evening = m >= 18 * 60 && m < 22 * 60;
  return h % 100 < (evening ? 70 : 30);
}
export function courtFree(date, start, duration, n) {
  for (let m = toMin(start); m < toMin(start) + duration; m += 30) if (takenHalfHour(date, m, n)) return false;
  return true;
}

// Tarifs réels du club (voir lib/info.js)
export function priceFor(court, t) {
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
  const days = useMemo(() => Array.from({ length: 14 }, (_, i) => { const d = new Date(); d.setDate(d.getDate() + i); return d; }), []);
  const [date, setDate] = useState(iso(days[0]));
  const [players, setPlayers] = useState(4);
  const duration = players === 2 ? 60 : 90; // créneaux du club : double 1 h 30, single 1 h
  const [filmedOnly, setFilmedOnly] = useState(false);

  const reset = (fn) => (v) => fn(v);

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
                      return (
                        <Link key={t} className="time" aria-label={`${courtName(c)} à ${t}, ${priceFor(c, t)} €`} href={`/reserver/confirmer?d=${date}&t=${t}&c=${c.n}&p=${players}`}><strong>{t}</strong><span>{priceFor(c, t)} €</span></Link>
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

    </div>
  );
}
