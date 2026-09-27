'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Navbar, Footer } from '../../components/site';
import { LoadingState } from '../../components/loading-state';
import { fetchWorkout } from '../../lib/api';
import { fallbackWorkouts } from '../../lib/fallback';
import type { Workout } from '../../lib/types';
import { useFitLog } from '../../hooks/use-fitlog';
import { BookmarkIcon, ClockIcon, FireIcon, PlusIcon, StarIcon } from '../../components/icons';

export default function WorkoutDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const [workout, setWorkout] = useState<Workout | null>(null);
  const [loading, setLoading] = useState(true);
  const { addToPlan, saveForLater, isInPlan, isSaved } = useFitLog();

  useEffect(() => {
    let active = true;
    setLoading(true);
    fetchWorkout(id)
      .then((remote) => { if (active) setWorkout(remote || fallbackWorkouts.find((item) => item.id === id) || null); })
      .catch(() => { if (active) setWorkout(fallbackWorkouts.find((item) => item.id === id) || null); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [id]);

  if (loading) return <><Navbar /><main className="min-h-[70vh] px-4 py-12"><div className="mx-auto max-w-7xl"><LoadingState label="Loading workout…" /></div></main><Footer /></>;
  if (!workout) return <><Navbar /><main className="flex min-h-[70vh] items-center justify-center px-4 text-center"><div><p className="text-xs font-black uppercase tracking-[.2em] text-lime">404</p><h1 className="mt-3 font-display text-6xl uppercase">WORKOUT NOT FOUND</h1><Link href="/" className="mt-6 inline-block rounded-xl bg-lime px-5 py-3 text-xs font-black uppercase text-ink">Return to library</Link></div></main><Footer /></>;

  return <><Navbar /><main className="bg-[#0c0e0e]"><div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[.9fr_1.1fr] lg:px-8 lg:py-16">
    <div className="min-h-[380px] overflow-hidden rounded-3xl border border-line bg-panel lg:sticky lg:top-28 lg:h-[calc(100vh-9rem)] lg:max-h-[690px]">
      <img src={workout.image || '/banner.png'} alt={workout.name} className="h-full w-full object-cover" onError={(e) => { e.currentTarget.src = '/banner.png'; }} />
    </div>
    <div className="py-2 lg:py-8">
      <Link href="/#library" className="text-[10px] font-black uppercase tracking-[.2em] text-lime">← Back to library</Link>
      <div className="mt-6 flex flex-wrap gap-2">{workout.category.map((tag) => <span key={tag} className="rounded-full border border-line bg-panel px-3 py-1 text-[10px] font-bold uppercase tracking-[.14em] text-lime">{tag}</span>)}</div>
      <h1 className="mt-5 font-display text-5xl uppercase leading-[.92] sm:text-6xl">{workout.name}</h1>
      <p className="mt-5 max-w-2xl text-sm leading-7 text-muted">{workout.description}</p>

      <section className="mt-8 rounded-2xl border border-line bg-panel p-5">
        <div className="mb-4 flex items-center justify-between"><h2 className="text-xs font-black uppercase tracking-[.2em]">KEY SPECS</h2><span className="rounded-full bg-lime px-2.5 py-1 text-[9px] font-black text-ink">{workout.difficulty}</span></div>
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-3">
          {[
            ['EQUIPMENT', workout.equipment], ['DIFFICULTY', workout.difficulty], ['SETS', workout.sets], ['REPS', workout.reps], ['DURATION', `${workout.duration} min`], ['CALORIES', `${workout.calories} kcal`], ['RATING', workout.rating.toFixed(1)],
          ].map(([label, value]) => <div key={label} className="bg-panel px-4 py-4"><p className="text-[9px] font-bold tracking-[.14em] text-muted">{label}</p><p className="mt-1 text-sm font-bold">{value}</p></div>)}
        </div>
      </section>

      <section className="mt-8"><h2 className="text-xs font-black uppercase tracking-[.2em]">INSTRUCTIONS</h2><ol className="mt-4 space-y-3">{workout.instructions.slice(0,4).map((step, i) => <li key={`${i}-${step}`} className="flex gap-4 rounded-xl border border-line bg-panel p-4"><span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-lime text-xs font-black text-ink">{i + 1}</span><span className="text-sm leading-6 text-muted">{step}</span></li>)}</ol></section>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <button onClick={() => addToPlan(workout.id)} disabled={isInPlan(workout.id)} className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-lime px-5 py-4 text-xs font-black uppercase tracking-[.12em] text-ink disabled:cursor-not-allowed disabled:opacity-60"><PlusIcon /> {isInPlan(workout.id) ? 'Already in today’s plan' : 'Add to today’s plan'}</button>
        <button onClick={() => saveForLater(workout.id)} disabled={isSaved(workout.id)} className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-line bg-panel px-5 py-4 text-xs font-black uppercase tracking-[.12em] text-white disabled:cursor-not-allowed disabled:opacity-60"><BookmarkIcon /> {isSaved(workout.id) ? 'Saved for later' : 'Save for later'}</button>
      </div>
      <div className="mt-8 grid grid-cols-3 gap-3 text-center text-xs text-muted"><span><ClockIcon /> {workout.duration} min</span><span><FireIcon /> {workout.calories} kcal</span><span className="text-lime"><StarIcon /> {workout.rating}</span></div>
    </div>
  </div></main><Footer /></>;
}