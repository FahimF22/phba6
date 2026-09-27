'use client';

import Link from 'next/link';
import type { Workout } from '../lib/types';
import {
  ClockIcon,
  FireIcon,
  StarIcon,
} from './icons';

export function WorkoutCard({
  workout,
  compact = false,
  done = false,
  actions,
}: {
  workout: Workout;
  compact?: boolean;
  done?: boolean;
  actions?: React.ReactNode;
}) {
  return (
    <article
      className={`card-shine group rounded-2xl border border-line bg-panel ${
        done ? 'opacity-70' : ''
      }`}
    >
      <Link
        href={`/workout/${workout.id}`}
        className="block"
      >
        <div
          className={`${
            compact ? 'h-40' : 'h-52'
          } overflow-hidden rounded-t-2xl bg-[#161a18]`}
        >
          <img
            src={workout.image || '/banner.png'}
            alt={workout.name}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            onError={(e) => {
              e.currentTarget.src = '/banner.png';
            }}
          />
        </div>

        <div className="p-5">
          <div className="mb-3 flex flex-wrap gap-2">
            {workout.category
              .slice(0, 3)
              .map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-line bg-panel2 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[.13em] text-lime"
                >
                  {tag}
                </span>
              ))}
          </div>

          <h3 className="font-display text-2xl uppercase leading-none">
            {workout.name}
          </h3>

          <p className="mt-2 truncate text-xs text-muted">
            {workout.equipment}
          </p>

          <div className="mt-5 flex items-center justify-between gap-2 border-t border-line pt-4 text-[11px] font-bold text-muted">
            <span className="inline-flex items-center gap-1">
              <ClockIcon /> {workout.duration} min
            </span>

            <span className="inline-flex items-center gap-1">
              <FireIcon /> {workout.calories} kcal
            </span>

            <span className="inline-flex items-center gap-1 text-lime">
              <StarIcon /> {workout.rating}
            </span>
          </div>
        </div>
      </Link>

      {actions && (
        <div className="border-t border-line p-3">
          {actions}
        </div>
      )}
    </article>
  );
}