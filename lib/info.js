export const PHONE = '05 32 00 23 91';
export const PHONE_HREF = 'tel:+33532002391';
export const ADDRESS = ['5 impasse Novital', '31790 Saint-Jory'];
export const MAPS_HREF = 'https://www.google.com/maps/search/?api=1&query=5+impasse+Novital+31790+Saint-Jory';
export const COURTS = 9;

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
