'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { CalendarDays } from 'lucide-react';
import { useUser, useBookings, signIn, signUp, signOut, cancelBooking } from '../lib/store';

const longDate = (d) => new Date(d + 'T12:00:00').toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' });
const dur = (m) => (m === 60 ? '1 h' : m === 90 ? '1 h 30' : '2 h');

export default function Account() {
  const user = useUser();
  if (user === undefined) return null;
  return user ? <Profile user={user} /> : <AuthForm />;
}

function AuthForm() {
  const router = useRouter();
  const next = useSearchParams().get('suite');
  const [mode, setMode] = useState('in');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function submit(e) {
    e.preventDefault();
    const f = Object.fromEntries(new FormData(e.currentTarget));
    setError('');
    if (mode === 'up' && f.password.length < 8) return setError('Le mot de passe doit faire au moins 8 caractères.');
    setBusy(true);
    try {
      mode === 'in' ? await signIn(f) : await signUp(f);
      if (next === 'reserver') router.push('/reserver');
    } catch (err) { setError(err.message); }
    setBusy(false);
  }

  return (
    <div className="auth">
      <h1>{mode === 'in' ? 'Se connecter' : 'Créer un compte'}</h1>
      <p className="muted">{next === 'reserver' ? 'Connectez-vous pour confirmer votre créneau. Votre sélection est gardée.' : 'Réservez vos terrains et retrouvez vos parties au même endroit.'}</p>
      <div className="seg" role="tablist">
        <button role="tab" aria-selected={mode === 'in'} onClick={() => { setMode('in'); setError(''); }}>Se connecter</button>
        <button role="tab" aria-selected={mode === 'up'} onClick={() => { setMode('up'); setError(''); }}>Créer un compte</button>
      </div>
      <form onSubmit={submit} className="form" key={mode}>
        {mode === 'up' && (
          <>
            <label>Prénom et nom<input name="name" required autoComplete="name" /></label>
            <label>Téléphone<input name="phone" type="tel" required autoComplete="tel" /></label>
          </>
        )}
        <label>E-mail<input name="email" type="email" required autoComplete="email" /></label>
        <label>Mot de passe<input name="password" type="password" required autoComplete={mode === 'in' ? 'current-password' : 'new-password'} /></label>
        {error && <p className="error" role="alert">{error}</p>}
        <button className="btn btn-blue btn-lg" disabled={busy}>{mode === 'in' ? 'Se connecter' : 'Créer mon compte'}</button>
      </form>
      <p className="note">Version de démonstration : les comptes et réservations sont enregistrés sur cet appareil uniquement.</p>
    </div>
  );
}

function Profile({ user }) {
  const bookings = useBookings(user.email);
  const today = new Date().toISOString().slice(0, 10);
  const coming = bookings.filter((b) => b.date >= today);
  return (
    <div className="profile">
      <div className="profile-head">
        <span className="avatar avatar-lg">{user.name.slice(0, 1).toUpperCase()}</span>
        <div>
          <h1>Bonjour {user.name.split(' ')[0]}</h1>
          <p className="muted">{user.email} · {user.phone}</p>
        </div>
      </div>

      <div className="sect-head">
        <h2>Mes réservations</h2>
        <Link href="/reserver" className="btn btn-blue">Réserver</Link>
      </div>
      {coming.length ? (
        <ul className="bookings">
          {coming.map((b) => (
            <li key={b.id}>
              <CalendarDays size={22} />
              <div>
                <strong>{longDate(b.date)}</strong>
                <span>{b.time.replace(':', ' h ')} · {dur(b.duration)} · Terrain {b.court} · {b.players} joueurs</span>
              </div>
              <button className="link-btn" onClick={() => cancelBooking(b.id)}>Annuler</button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="empty">Aucune réservation à venir. <Link href="/reserver">Réservez votre prochain terrain.</Link></p>
      )}
      <button className="btn btn-line" onClick={signOut}>Se déconnecter</button>
    </div>
  );
}
