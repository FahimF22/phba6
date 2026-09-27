'use client';

import { useEffect, useState } from 'react';
import { Library } from './components/library';
import {
  Navbar,
  Footer,
  PageButton,
} from './components/site';
import { LoadingState } from './components/loading-state';
import { fetchWorkouts } from './lib/api';
import { fallbackWorkouts } from './lib/fallback';
import type { Workout } from './lib/types';

export default function HomePage() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWorkouts()
      .then((items) =>
        setWorkouts(
          items.length
            ? items
            : fallbackWorkouts
        )
      )
      .catch(() =>
        setWorkouts(fallbackWorkouts)
      )
      .finally(() =>
        setLoading(false)
      );
  }, []);

  return (
    <>
      <Navbar />

      <main>
        <section className="hero-grid overflow-hidden border-b border-line">
          <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[1.1fr_.9fr] lg:px-8 lg:py-24">
            <div className="slide-up">
              <p className="mb-5 inline-flex rounded-full border border-line bg-panel px-3 py-1 text-[10px] font-black uppercase tracking-[.2em] text-lime">
                WORKOUT LIBRARY
              </p>

              <h1 className="font-display text-6xl uppercase leading-[.88] sm:text-7xl lg:text-8xl">
                TRAIN WITH INTENT.
                <br />
                LOG EVERY SET.
              </h1>

              <p className="mt-6 max-w-xl text-sm leading-7 text-muted">
                FitLog is a dark, no-nonsense gym companion:
                pick a lift, lock it into today's plan,
                and watch the week's work add up.
              </p>

              <div className="mt-8">
                <PageButton href="#library">
                  BROWSE WORKOUTS
                </PageButton>
              </div>
            </div>

            <div className="relative flex min-h-[320px] items-center justify-center lg:min-h-[460px]">
              <div className="absolute h-64 w-64 rounded-full bg-lime/10 blur-3xl sm:h-80 sm:w-80" />

              <img
                src="/banner.png"
                alt="Workout illustration"
                className="relative w-[min(100%,420px)] object-contain drop-shadow-2xl"
              />

              <div className="absolute bottom-2 right-0 hidden rounded-2xl border border-line bg-panel/90 p-4 backdrop-blur sm:block">
                <p className="text-[9px] font-bold uppercase tracking-[.18em] text-muted">
                  TODAY'S RULE
                </p>

                <p className="mt-1 font-display text-xl uppercase text-lime">
                  No empty sets.
                </p>
              </div>
            </div>
          </div>
        </section>

        {loading ? (
          <section
            id="library"
            className="scroll-mt-28 bg-[#0c0e0e] py-16 sm:py-20"
          >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <LoadingState />
            </div>
          </section>
        ) : (
          <Library workouts={workouts} />
        )}
      </main>

      <Footer />
    </>
  );
}