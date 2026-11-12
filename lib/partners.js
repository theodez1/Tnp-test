import fs from 'fs';
import path from 'path';

// Partenaires affichés sur l'accueil et la page Le club.
// Pour afficher un vrai logo : déposer le fichier dans public/images/partenaires/
// avec le nom indiqué dans `logo` (PNG ou SVG, fond transparent de préférence).
export const SPONSORS = [
  { name: 'Booster Immobilier', note: 'Partenaire du court 3', logo: 'booster-immobilier.png' },
];

export const SUPPLIERS = [
  { name: 'Ma Minute Pizza', note: 'Pizzas fraîches', logo: 'ma-minute-pizza.png' },
  { name: 'Washoku by Zoé', note: 'Sushis et poke bowls', logo: 'washoku.png' },
  { name: 'La Berlue', note: 'Bières artisanales de Gaillac', logo: 'la-berlue.png' },
  { name: 'Le Gué de Moines', note: 'Bières locales', logo: 'gue-de-moines.png' },
  { name: 'La Prairie des Glaces', note: 'Glaces artisanales', logo: 'prairie-des-glaces.png' },
];

// Renvoie l'URL du logo si le fichier existe, sinon null (le nom s'affiche à la place)
export function logoUrl(file) {
  const p = path.join(process.cwd(), 'public', 'images', 'partenaires', file);
  return fs.existsSync(p) ? `/images/partenaires/${file}` : null;
}
