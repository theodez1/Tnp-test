'use client';
/*
  Stockage local (navigateur) des comptes et réservations.
  C'est une démo : à remplacer par l'API du logiciel de réservation du club.
*/
import { useEffect, useState } from 'react';

const K = { users: 'tnp.users', session: 'tnp.session', bookings: 'tnp.bookings', pending: 'tnp.pending' };

function read(key, fallback) {
  try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; } catch { return fallback; }
}
function write(key, value) {
  try { if (localStorage.getItem(key) === (value === null ? null : JSON.stringify(value))) return; } catch {}
  try { value === null ? localStorage.removeItem(key) : localStorage.setItem(key, JSON.stringify(value)); } catch {}
  window.dispatchEvent(new Event('tnp-store'));
}

async function hash(text) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, '0')).join('');
}

export async function signUp({ name, email, phone, password }) {
  const users = read(K.users, {});
  const id = email.trim().toLowerCase();
  if (users[id]) throw new Error('Un compte existe déjà avec cet e-mail. Connectez-vous.');
  users[id] = { name: name.trim(), email: id, phone: phone.trim(), pass: await hash(password) };
  write(K.users, users);
  write(K.session, id);
}

export async function signIn({ email, password }) {
  const users = read(K.users, {});
  const u = users[email.trim().toLowerCase()];
  if (!u || u.pass !== (await hash(password))) throw new Error('E-mail ou mot de passe incorrect.');
  write(K.session, u.email);
}

export function signOut() { write(K.session, null); }

export function useUser() {
  const [user, setUser] = useState(undefined); // undefined = chargement
  useEffect(() => {
    const sync = () => {
      const id = read(K.session, null);
      const u = id ? read(K.users, {})[id] || null : null;
      setUser((prev) => (JSON.stringify(prev) === JSON.stringify(u) ? prev : u));
    };
    sync();
    window.addEventListener('tnp-store', sync);
    return () => window.removeEventListener('tnp-store', sync);
  }, []);
  return user;
}

export function useBookings(email) {
  const [list, setList] = useState([]);
  useEffect(() => {
    const sync = () => setList(read(K.bookings, []).filter((b) => b.email === email).sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time)));
    sync();
    window.addEventListener('tnp-store', sync);
    return () => window.removeEventListener('tnp-store', sync);
  }, [email]);
  return list;
}

export function addBooking(b) {
  write(K.bookings, [...read(K.bookings, []), { ...b, id: Date.now().toString(36) }]);
}
export function cancelBooking(id) {
  write(K.bookings, read(K.bookings, []).filter((b) => b.id !== id));
}

export const setPending = (b) => write(K.pending, b);
export const takePending = () => { const p = read(K.pending, null); if (p) write(K.pending, null); return p; };
