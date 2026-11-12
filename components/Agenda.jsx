'use client';
import { useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight, Users, Clock3 } from 'lucide-react';
import { upcoming } from '../lib/events';
import { PHONE_HREF } from '../lib/info';

const FILTERS = [
  { id: 'all', label: 'Tout' },
  { id: 'Hommes', label: 'Hommes' },
  { id: 'Femmes', label: 'Femmes' },
  { id: 'Mixte', label: 'Mixte' },
  { id: 'animation', label: 'Animations' },
];
const WEEK = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
const ym = (d) => d.slice(0, 7);
const fr = (d, o) => new Date(d + 'T12:00:00').toLocaleDateString('fr-FR', o).replace('.', '');

export default function Agenda() {
  const all = useMemo(() => upcoming(), []);
  const [filter, setFilter] = useState('all');
  const [month, setMonth] = useState(() => new Date().toISOString().slice(0, 7));
  const [day, setDay] = useState(null);

  const match = (e) => filter === 'all' || (filter === 'animation' ? e.kind === 'animation' : e.category === filter);
  const events = all.filter(match);
  const byDay = Object.groupBy ? Object.groupBy(events, (e) => e.date) : events.reduce((a, e) => ((a[e.date] ||= []).push(e), a), {});

  const [y, m] = month.split('-').map(Number);
  const first = new Date(y, m - 1, 1);
  const offset = (first.getDay() + 6) % 7;
  const days = new Date(y, m, 0).getDate();
  const cells = [...Array(offset).fill(null), ...Array.from({ length: days }, (_, i) => `${month}-${String(i + 1).padStart(2, '0')}`)];
  const shift = (n) => { const d = new Date(y, m - 1 + n, 1); setMonth(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`); setDay(null); };
  const today = new Date().toISOString().slice(0, 10);

  const list = events.filter((e) => (day ? e.date === day : ym(e.date) === month));

  return (
    <div className="agenda">
      <div className="chips" role="group" aria-label="Catégorie">
        {FILTERS.map((f) => (
          <button key={f.id} type="button" className={`chip ${filter === f.id ? 'is-on' : ''}`} aria-pressed={filter === f.id} onClick={() => { setFilter(f.id); setDay(null); }}>{f.label}</button>
        ))}
      </div>

      <div className="agenda-grid">
        <div className="cal">
          <div className="cal-head">
            <button type="button" className="round" onClick={() => shift(-1)} aria-label="Mois précédent"><ChevronLeft size={20} /></button>
            <h2>{first.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}</h2>
            <button type="button" className="round" onClick={() => shift(1)} aria-label="Mois suivant"><ChevronRight size={20} /></button>
          </div>
          <div className="cal-grid">
            {WEEK.map((w, i) => <span key={i} className="cal-w">{w}</span>)}
            {cells.map((d, i) => {
              if (!d) return <span key={i} />;
              const ev = byDay[d] || [];
              const on = day === d;
              return (
                <button key={d} type="button" disabled={!ev.length} className={`cal-d ${ev.length ? 'has' : ''} ${on ? 'is-on' : ''} ${d === today ? 'is-today' : ''}`} aria-pressed={on}
                  aria-label={`${fr(d, { day: 'numeric', month: 'long' })}${ev.length ? `, ${ev.length} événement${ev.length > 1 ? 's' : ''}` : ''}`}
                  onClick={() => setDay(on ? null : d)}>
                  <span className="cal-num">{Number(d.slice(8))}</span>
                  {ev.length > 0 && <span className="cal-dots">{ev.map((e, k) => <i key={k} className={e.kind} />)}</span>}
                </button>
              );
            })}
          </div>
          <p className="cal-legend"><span><i className="tournoi" /> Tournoi</span><span><i className="animation" /> Animation</span></p>
        </div>

        <div className="agenda-list">
          <div className="agenda-list-head">
            <h2>{day ? fr(day, { weekday: 'long', day: 'numeric', month: 'long' }) : `En ${first.toLocaleDateString('fr-FR', { month: 'long' })}`}</h2>
            {day && <button type="button" className="link-btn" onClick={() => setDay(null)}>Tout le mois</button>}
          </div>
          {list.length ? list.map((e) => (
            <article key={e.date + e.title + e.category} className="ev">
              <span className="event-date">
                <span>{fr(e.date, { weekday: 'short' })}</span>
                <strong>{fr(e.date, { day: 'numeric' })}</strong>
                <span>{fr(e.date, { month: 'short' })}</span>
              </span>
              <div className="ev-body">
                <div className="ev-tags">
                  <span className={`pill ${e.kind}`}>{e.kind === 'tournoi' ? 'Tournoi' : 'Animation'}</span>
                  <span className="pill">{e.category}</span>
                  {e.level && <span className="pill">{e.level}</span>}
                </div>
                <h3>{e.title}</h3>
                <p className="ev-meta"><span><Clock3 size={16} /> {e.time.replace(':', ' h ')}</span><span><Users size={16} /> {e.teams} équipes</span></p>
                <div className="ev-foot">
                  <div className="fill" aria-hidden="true"><span style={{ width: `${((e.teams - e.left) / e.teams) * 100}%` }} /></div>
                  <span className={`ev-left ${e.left === 0 ? 'full' : ''}`}>{e.left === 0 ? 'Complet' : `${e.left} place${e.left > 1 ? 's' : ''} restante${e.left > 1 ? 's' : ''}`}</span>
                </div>
              </div>
              {e.left > 0
                ? <a className="btn btn-blue ev-cta" href={PHONE_HREF}>S'inscrire</a>
                : <a className="btn btn-line ev-cta" href={PHONE_HREF}>Liste d'attente</a>}
            </article>
          )) : (
            <p className="empty">Aucun événement {day ? 'ce jour-là' : 'ce mois-ci'} pour ce filtre. Essayez un autre mois.</p>
          )}
        </div>
      </div>
    </div>
  );
}
