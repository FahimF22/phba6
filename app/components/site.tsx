'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useFitLog } from '../hooks/use-fitlog';
import { ArrowRight } from './icons';

export function Logo() {
  return (
    <span className="flex items-center gap-2 font-black tracking-[.14em]">
      <img
        src="/logo.png"
        alt=""
        className="h-7 w-7"
      />
      FITLOG
    </span>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const { plan, saved } = useFitLog();

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-ink/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" aria-label="FitLog home">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-7 text-xs font-bold uppercase tracking-[.18em] sm:flex">
          <Link
            className={
              pathname === '/'
                ? 'text-lime'
                : 'text-muted hover:text-white'
            }
            href="/"
          >
            Workout
          </Link>

          <Link
            className={
              pathname.startsWith('/my-plan')
                ? 'text-lime'
                : 'text-muted hover:text-white'
            }
            href="/my-plan"
          >
            My Plan
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/my-plan"
            className="rounded-full bg-lime px-3 py-2 text-[10px] font-black uppercase tracking-[.14em] text-ink transition hover:-translate-y-0.5"
          >
            Plan <span className="ml-1">{plan.length}</span>
          </Link>

          <Link
            href="/my-plan"
            className="rounded-full border border-muted/60 px-3 py-2 text-[10px] font-black uppercase tracking-[.14em] text-white transition hover:border-lime hover:text-lime"
          >
            Saved <span className="ml-1">{saved.length}</span>
          </Link>
        </div>
      </div>

      <nav className="mobile-scroll-x mx-auto flex max-w-7xl items-center gap-6 px-4 pb-3 text-xs font-bold uppercase tracking-[.16em] sm:hidden">
        <Link
          className={pathname === '/' ? 'text-lime' : 'text-muted'}
          href="/"
        >
          Workout
        </Link>

        <Link
          className={
            pathname.startsWith('/my-plan')
              ? 'text-lime'
              : 'text-muted'
          }
          href="/my-plan"
        >
          My Plan
        </Link>
      </nav>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-line bg-[#050606]">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-5 px-4 py-8 text-xs sm:flex-row sm:items-center sm:px-6 lg:px-8">
        <Logo />
        <p className="text-muted">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="mb-8">
      {eyebrow && (
        <p className="mb-2 text-[11px] font-black uppercase tracking-[.22em] text-lime">
          {eyebrow}
        </p>
      )}

      <h2 className="font-display text-4xl uppercase leading-none sm:text-5xl">
        {title}
      </h2>

      <p className="mt-3 max-w-xl text-sm leading-6 text-muted">
        {subtitle}
      </p>
    </div>
  );
}

export function PageButton({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 rounded-xl bg-lime px-5 py-3 text-xs font-black uppercase tracking-[.12em] text-ink transition hover:-translate-y-0.5 hover:shadow-lime"
    >
      {children}
      <ArrowRight />
    </Link>
  );
}