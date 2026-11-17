import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import './globals.css';

export const metadata: Metadata = {
  title: 'Una foto, dos formas de verla | Intercepting Routes',
  description: 'Un laboratorio de Next.js sobre cómo abrir una foto sin perder el contexto de la galería.',
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
