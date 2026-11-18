'use client';
import { useEffect, useState } from 'react';

// Le club ouvre à 6 h et ferme à minuit, tous les jours : l'état se lit sur l'heure de Paris.
const OPEN_FROM = 6;

function parisHour() {
  return Number(new Intl.DateTimeFormat('fr-FR', { hour: 'numeric', hour12: false, timeZone: 'Europe/Paris' }).format(new Date())) % 24;
}

export default function OpenNow() {
  const [open, setOpen] = useState(null); // null tant que l'heure n'est pas lue : texte fixe, sans décalage
  useEffect(() => {
    const tick = () => setOpen(parisHour() >= OPEN_FROM);
    tick();
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, []);
  const text = open === null ? 'Ouvert 7j/7, de 6 h à minuit' : open ? 'Ouvert maintenant, jusqu’à minuit' : 'Fermé, ouvre à 6 h';
  return (
    <p className="hero-open" data-open={open === null ? 'unknown' : open ? 'yes' : 'no'}>
      <i aria-hidden="true" />
      {text}
    </p>
  );
}
