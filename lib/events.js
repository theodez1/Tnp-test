// Prochains événements affichés sur l'accueil et la page Tournois.
// À tenir à jour : date au format AAAA-MM-JJ.
export const EVENTS = [
  { date: '2026-11-15', title: 'Tournoi P250', category: 'Hommes', teams: 32 },
];

export function upcoming() {
  const today = new Date().toISOString().slice(0, 10);
  return EVENTS.filter((e) => e.date >= today).sort((a, b) => a.date.localeCompare(b.date));
}
