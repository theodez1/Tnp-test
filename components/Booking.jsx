'use client';
import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Check, Video, User, Users } from 'lucide-react';
import { useUser, addBooking, setPending, takePending } from '../lib/store';
import { COURT_LIST } from '../lib/info';

const DURATIONS = [{ min: 60, label: '1 h' }, { min: 90, label: '1 h 30' }, { min: 120, label: '2 h' }];
const durLabel = (m) => DURATIONS.find((d) => d.min === m).label;
const iso = (d) => d.toISOString().slice(0, 10);
const hhmm = (m) => `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`;
const toMin = (t) => parseInt(t) * 60 + parseInt(t.slice(3));

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

// Terrains proposés : en simple, le terrain 1v1 et les terrains de double ; en double, pas le terrain 1v1.
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
  const [duration, setDuration] = useState(90);
  const [players, setPlayers] = useState(4);
  const [filmedOnly, setFilmedOnly] = useState(false);
  const [time, setTime] = useState(null);
  const [court, setCourt] = useState(null);
  const [done, setDone] = useState(null);

  useEffect(() => {
    if (!user) return;
    const p = takePending();
    if (p) { setDate(p.date); setDuration(p.duration); setPlayers(p.players); setFilmedOnly(!!p.filmedOnly); setTime(p.time); setCourt(p.court); }
  }, [user]);

  const courts = COURT_LIST.filter((c) => eligible(c, players, filmedOnly));
  const now = new Date();
  const slots = [];
  for (let m = 6 * 60; m + duration <= 24 * 60; m += 30) {
    const start = hhmm(m);
    const past = date === iso(now) && m <= now.getHours() * 60 + now.getMinutes();
    slots.push({ start, free: past ? 0 : courts.filter((c) => courtFree(date, start, duration, c.n)).length });
  }

  const reset = (fn) => (v) => { fn(v); setTime(null); setCourt(null); };
  const pickTime = (t) => {
    setTime(t);
    // On présélectionne le premier terrain libre, l'utilisateur peut en changer
    const first = courts.find((c) => courtFree(date, t, duration, c.n));
    setCourt(first ? first.n : null);
  };

  function confirm() {
    const b = { date, time, duration, players, court, filmedOnly };
    if (!user) { setPending(b); router.push('/compte?suite=reserver'); return; }
    const c = COURT_LIST.find((x) => x.n === court);
    addBooking({ date, time, duration, players, court, filmed: !!c.filmed, simple: c.type === 'simple', email: user.email });
    setDone({ ...b, filmed: c.filmed }); setTime(null); setCourt(null);
  }

  const label = (d) => new Date(d + 'T12:00:00').toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' });

  if (done) {
    return (
      <div className="bk-done">
        <span className="bk-check"><Check size={30} strokeWidth={2.6} /></span>
        <h2>Terrain {done.court} réservé</h2>
        <p>Le {label(done.date)} à {done.time.replace(':', ' h ')}, pour {durLabel(done.duration)}.{done.filmed && ' Votre match sera filmé par Spash.'}</p>
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
              <button key={v} type="button" className={`day ${date === v ? 'is-on' : ''}`} aria-pressed={date === v} onClick={() => reset(setDate)(v)}>
                <span>{d.toLocaleDateString('fr-FR', { weekday: 'short' }).replace('.', '')}</span>
                <strong>{d.getDate()}</strong>
                <span>{d.toLocaleDateString('fr-FR', { month: 'short' }).replace('.', '')}</span>
              </button>
            );
          })}
        </div>
      </fieldset>

      <div className="bk-three">
        <fieldset className="bk-step">
          <legend>Format</legend>
          <div className="chips">
            <button type="button" className={`chip ${players === 4 ? 'is-on' : ''}`} aria-pressed={players === 4} onClick={() => reset(setPlayers)(4)}><Users size={18} /> Double · 4</button>
            <button type="button" className={`chip ${players === 2 ? 'is-on' : ''}`} aria-pressed={players === 2} onClick={() => reset(setPlayers)(2)}><User size={18} /> Simple · 2</button>
          </div>
        </fieldset>
        <fieldset className="bk-step">
          <legend>Durée</legend>
          <div className="chips">
            {DURATIONS.map((d) => (
              <button key={d.min} type="button" className={`chip ${duration === d.min ? 'is-on' : ''}`} aria-pressed={duration === d.min} onClick={() => reset(setDuration)(d.min)}>{d.label}</button>
            ))}
          </div>
        </fieldset>
        <fieldset className="bk-step">
          <legend>Vidéo</legend>
          <div className="chips">
            <button type="button" className={`chip ${filmedOnly ? 'is-on' : ''}`} aria-pressed={filmedOnly} onClick={() => reset(setFilmedOnly)(!filmedOnly)}><Video size={18} /> Terrain filmé Spash</button>
          </div>
        </fieldset>
      </div>

      <fieldset className="bk-step">
        <legend>Heure de début</legend>
        <div className="slots">
          {slots.map((s) => (
            <button key={s.start} type="button" disabled={!s.free} className={`slot ${time === s.start ? 'is-on' : ''}`} aria-pressed={time === s.start} onClick={() => pickTime(s.start)}>
              <strong>{s.start}</strong>
              <span>{s.free ? `${s.free} terrain${s.free > 1 ? 's' : ''}` : 'Complet'}</span>
            </button>
          ))}
        </div>
      </fieldset>

      {time && (
        <fieldset className="bk-step">
          <legend>Terrain, à {time.replace(':', ' h ')}</legend>
          <div className="courts">
            {COURT_LIST.map((c) => {
              const ok = eligible(c, players, filmedOnly);
              const free = ok && courtFree(date, time, duration, c.n);
              const why = !ok ? (c.type === 'simple' ? 'Réservé au simple' : 'Non filmé') : free ? 'Libre' : 'Occupé';
              return (
                <button key={c.n} type="button" disabled={!free} className={`court-card ${court === c.n ? 'is-on' : ''} ${c.type === 'simple' ? 'is-simple' : ''}`} aria-pressed={court === c.n} onClick={() => setCourt(c.n)}>
                  <span className="court-num">{c.n}</span>
                  <span className="court-tags">
                    {c.type === 'simple' && <span className="tag"><User size={14} /> 1v1</span>}
                    {c.filmed && <span className="tag tag-video"><Video size={14} /> Spash</span>}
                  </span>
                  <span className="court-state">{why}</span>
                </button>
              );
            })}
          </div>
        </fieldset>
      )}

      <div className="bk-bar">
        <div>
          {time && court ? (
            <><strong>{label(date)}</strong><span>{time.replace(':', ' h ')} · {durLabel(duration)} · Terrain {court}{COURT_LIST.find((c) => c.n === court).filmed ? ' · filmé' : ''}</span></>
          ) : (
            <span>{time ? 'Choisissez un terrain libre.' : 'Choisissez une heure de début.'}</span>
          )}
        </div>
        <button className="btn btn-blue btn-lg" disabled={!time || !court} onClick={confirm}>
          {user === null ? 'Se connecter pour réserver' : 'Réserver ce terrain'}
        </button>
      </div>
    </div>
  );
}
