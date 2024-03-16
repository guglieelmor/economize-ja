import '../styles/globals.css';
import { ReactNode } from 'react';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>Economize já</title>
      </head>
      <body className="bg-dark-blue">{children}</body>
    </html>
  );
}
