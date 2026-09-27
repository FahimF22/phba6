'use client';

import { useMemo, useState } from 'react';
import type { Workout } from '../lib/types';
import { WorkoutCard } from './workout-card';
import { ChevronDown } from './icons';

export function Library({
  workouts,
}: {
  workouts: Workout[];
}) {
  const [sort, setSort] = useState<
    'duration' | 'calories' | 'rating'
  >('duration');

  const sorted = useMemo(
    () =>
      [...workouts].sort((a, b) =>
        sort === 'duration'
          ? a.duration - b.duration
          : sort === 'calories'
            ? a.calories - b.calories
            : b.rating - a.rating
      ),
    [workouts, sort]
  );

  return (
    <section
      id="library"
      className="scroll-mt-28 border-t border-line bg-[#0c0e0e] py-16 sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="mb-2 text-[11px] font-black uppercase tracking-[.22em] text-lime">
              12 LIFTS
            </p>

            <h2 className="font-display text-4xl uppercase leading-none sm:text-5xl">
              THE LIBRARY
            </h2>

            <p className="mt-3 text-sm text-muted">
              Twelve lifts covering every major muscle group.
            </p>
          </div>

          <label className="relative inline-flex w-full max-w-xs items-center gap-3 rounded-xl border border-line bg-panel px-4 py-3 text-xs font-black uppercase tracking-[.12em] text-muted">
            <span>Sort By</span>

            <select
              value={sort}
              onChange={(e) =>
                setSort(
                  e.target.value as typeof sort
                )
              }
              className="ml-auto appearance-none bg-transparent pr-5 text-white outline-none"
            >
              <option value="duration">
                Duration
              </option>
              <option value="calories">
                Calories
              </option>
              <option value="rating">
                Rating
              </option>
            </select>

            <span className="pointer-events-none absolute right-3 text-lime">
              <ChevronDown />
            </span>
          </label>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {sorted.map((workout) => (
            <WorkoutCard
              key={workout.id}
              workout={workout}
            />
          ))}
        </div>
      </div>
    </section>
  );
}