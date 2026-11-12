import { Barlow, Barlow_Condensed } from 'next/font/google';
import './globals.css';

const display = Barlow_Condensed({ subsets: ['latin'], weight: ['600', '700', '800'], style: ['normal', 'italic'], variable: '--font-display', display: 'swap' });
const body = Barlow({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-body', display: 'swap' });

export const metadata = {
  metadataBase: new URL('https://tnp-web-roan.vercel.app'),
  openGraph: {
    title: 'Toulouse Nord Padel',
    description: '9 terrains de padel indoor à Saint-Jory, ouverts 7j/7 de 6 h à minuit.',
    images: [{ url: '/images/og-tnp.jpg', width: 1600, height: 900 }],
    locale: 'fr_FR',
    type: 'website',
  },
  title: 'Toulouse Nord Padel | Club de padel indoor à Saint-Jory',
  description: 'Neuf terrains de padel indoor à Saint-Jory, ouverts de 6 h à minuit, tous les jours. Réservation, tournois, cours et courts filmés.',
};

export const viewport = { themeColor: '#0a1a3a' };

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className={`${display.variable} ${body.variable}`}>
      <body>{children}</body>
    </html>
  );
}
