import type { Metadata } from 'next';
import './globals.css';
import { FitLogProvider } from './hooks/use-fitlog';

export const metadata: Metadata = {
  title: 'FitLog — Workout Library',
  description: 'Train with intent. Log every set.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><FitLogProvider>{children}</FitLogProvider></body></html>;
}