import { Archivo } from 'next/font/google';
import './globals.css';

const archivo = Archivo({ subsets: ['latin'], axes: ['wdth'], variable: '--font-archivo', display: 'swap' });

export const metadata = {
  title: 'Toulouse Nord Padel | Club de padel indoor à Saint-Jory',
  description: 'Neuf terrains de padel indoor à Saint-Jory, ouverts de 6 h à minuit, tous les jours. Réservation, tournois, cours et courts filmés.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className={archivo.variable}>
      <body>{children}</body>
    </html>
  );
}
