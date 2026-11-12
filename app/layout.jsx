import { Barlow, Barlow_Condensed } from 'next/font/google';
import './globals.css';

const display = Barlow_Condensed({ subsets: ['latin'], weight: ['600', '700', '800'], style: ['normal', 'italic'], variable: '--font-display', display: 'swap' });
const body = Barlow({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-body', display: 'swap' });

export const metadata = {
  title: 'Toulouse Nord Padel | Club de padel indoor à Saint-Jory',
  description: 'Neuf terrains de padel indoor à Saint-Jory, ouverts de 6 h à minuit, tous les jours. Réservation, tournois, cours et courts filmés.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className={`${display.variable} ${body.variable}`}>
      <body>{children}</body>
    </html>
  );
}
