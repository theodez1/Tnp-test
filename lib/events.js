// Calendrier du club affiché sur l'accueil et la page Tournois.
// Données d'exemple pour la démo : à remplacer par le vrai calendrier.
// kind : 'tournoi' (homologué) ou 'animation' (américano, soirée…)
export const EVENTS = [
  { date: '2026-11-15', time: '09:00', title: 'Tournoi P250', category: 'Hommes', kind: 'tournoi', teams: 32, left: 6 },
  { date: '2026-11-20', time: '19:30', title: 'Soirée américano', category: 'Mixte', kind: 'animation', teams: 16, left: 4, level: 'Tous niveaux' },
  { date: '2026-11-22', time: '09:00', title: 'Tournoi P100', category: 'Femmes', kind: 'tournoi', teams: 16, left: 9 },
  { date: '2026-11-29', time: '09:00', title: 'Tournoi P500', category: 'Hommes', kind: 'tournoi', teams: 32, left: 0 },
  { date: '2026-12-04', time: '19:30', title: 'Soirée américano', category: 'Mixte', kind: 'animation', teams: 16, left: 16, level: 'Débutants' },
  { date: '2026-12-06', time: '09:00', title: 'Tournoi P250', category: 'Mixte', kind: 'tournoi', teams: 24, left: 12 },
  { date: '2026-12-13', time: '09:00', title: 'Tournoi P100', category: 'Hommes', kind: 'tournoi', teams: 24, left: 20 },
  { date: '2026-12-19', time: '14:00', title: 'Tournoi de Noël', category: 'Mixte', kind: 'animation', teams: 32, left: 18, level: 'Tous niveaux' },
];

export function upcoming() {
  const today = new Date().toISOString().slice(0, 10);
  return EVENTS.filter((e) => e.date >= today).sort((a, b) => a.date.localeCompare(b.date));
}
