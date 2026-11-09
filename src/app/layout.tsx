import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'WAZUKA',
  description: 'Beautiful kitchen essentials for everyday life.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body>{children}</body>
    </html>
  );
}
