export const PHONE = '05 32 00 23 91';
export const PHONE_HREF = 'tel:+33532002391';
export const ADDRESS = ['5 impasse Novital', '31790 Saint-Jory'];
export const MAPS_HREF = 'https://www.google.com/maps/search/?api=1&query=5+impasse+Novital+31790+Saint-Jory';
export const COURTS = 9;
export const EMAIL = 'contact@toulousenordpadel.fr';
export const BOOKING_APP = 'https://15a.fr/';

// Source : toulousenordpadel.fr/nos-tarifs (mise à jour du 25/09/2026)
export const PRICE_TIERS = [
  { id: 'autonome', label: 'Heures autonomes', hours: '6 h – 9 h et 22 h 30 – minuit', price: 9 },
  { id: 'creuse', label: 'Heures creuses', hours: '9 h – 12 h et 13 h 30 – 16 h 30', price: 11 },
  { id: 'pleine', label: 'Heures pleines', hours: '12 h – 13 h 30 et 16 h 30 – 22 h 30', price: 13 },
];
export const CENTRAL_EXTRA = 1; // option court central filmé
export const SINGLE_PRICE = 9; // séance de 1 h
export function tierFor(min) {
  if (min < 9 * 60 || min >= 22 * 60 + 30) return PRICE_TIERS[0];
  if (min < 12 * 60 || (min >= 13 * 60 + 30 && min < 16 * 60 + 30)) return PRICE_TIERS[1];
  return PRICE_TIERS[2];
}

// Les 9 terrains du club. Renseignez ici le nom du sponsor de chaque terrain.
// type 'simple' = terrain 1 contre 1 ; filmed = équipé de caméras Spash.
export const COURT_LIST = [
  { n: 1, type: 'simple', sponsor: '' },
  { n: 2, type: 'double', filmed: true, sponsor: '' },
  { n: 3, type: 'double', filmed: true, sponsor: 'Booster immobilier' },
  { n: 4, type: 'double', sponsor: '' },
  { n: 5, type: 'double', sponsor: '' },
  { n: 6, type: 'double', sponsor: '' },
  { n: 7, type: 'double', sponsor: '' },
  { n: 8, type: 'double', sponsor: '' },
  { n: 9, type: 'double', sponsor: '' },
];

export const courtName = (c) => `Court ${c.n}${c.sponsor ? ' ' + c.sponsor : ''}`;
