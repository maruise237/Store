import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'KamTech Store',
  description: 'Découvrez mes applications SaaS web',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
