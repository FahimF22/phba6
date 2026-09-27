'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { Navbar, Footer } from '../components/site';
import { LoadingState } from '../components/loading-state';
import { WorkoutCard } from '../components/workout-card';
import { fetchWorkouts } from '../lib/api';
import { fallbackWorkouts } from '../lib/fallback';
import type { Workout } from '../lib/types';
import { useFitLog } from '../hooks/use-fitlog';
import { CheckIcon, CloseIcon } from '../components/icons';

export default function MyPlanPage() {
  const { plan, saved, done, removeFromPlan, markDone } = useFitLog();
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<'plan' | 'saved'>('plan');

  useEffect(() => {
    fetchWorkouts().then((items) => setWorkouts(items.length ? items : fallbackWorkouts)).catch(() => setWorkouts(fallbackWorkouts)).finally(() => setLoading(false));
  }, []);

  const visible = useMemo(() => {
    const ids = tab === 'plan' ? plan : saved;
    return ids.map((id) => workouts.find((w) => w.id === id)).filter(Boolean) as Workout[];
  }, [tab, plan, saved, workouts]);

  const minutes = plan.reduce((sum, id) => sum + (workouts.find((w) => w.id === id)?.duration || 0), 0);
  const calories = plan.reduce((sum, id) => sum + (workouts.find((w) => w.id === id)?.calories || 0), 0);

  return <><Navbar /><main className="min-h-[70vh] bg-[#0c0e0e]"><div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
    <div className="max-w-2xl"><p className="mb-2 text-[11px] font-black uppercase tracking-[.22em] text-lime">THE LOG</p><h1 className="font-display text-5xl uppercase leading-none sm:text-6xl">MY PLAN</h1><p className="mt-3 text-sm text-muted">Cap of five lifts for today. Finish them, then load more.</p></div>
    <div className="mt-8 grid grid-cols-3 gap-3">{[['Exercises', plan.length], ['Minutes', minutes], ['Calories', calories]].map(([label, value]) => <div key={label} className="rounded-2xl border border-line bg-panel p-4 sm:p-5"><p className="text-[9px] font-bold uppercase tracking-[.15em] text-muted">{label}</p><p className="mt-2 font-display text-4xl text-white">{value}</p></div>)}</div>
    <div className="mt-8 flex border-b border-line"><button onClick={() => setTab('plan')} className={`px-1 pb-4 pr-7 text-xs font-black uppercase tracking-[.16em] ${tab === 'plan' ? 'border-b-2 border-lime text-lime' : 'text-muted'}`}>Today&apos;s Plan <span className="ml-1">{plan.length}</span></button><button onClick={() => setTab('saved')} className={`px-1 pb-4 text-xs font-black uppercase tracking-[.16em] ${tab === 'saved' ? 'border-b-2 border-lime text-lime' : 'text-muted'}`}>Saved <span className="ml-1">{saved.length}</span></button></div>
    <div className="mt-8">{loading ? <LoadingState /> : visible.length === 0 ? <div className="rounded-2xl border border-dashed border-line bg-panel px-5 py-20 text-center"><p className="text-[11px] font-black uppercase tracking-[.22em] text-lime">EMPTY LOG</p><h2 className="mt-3 font-display text-4xl uppercase">NOTHING HERE YET</h2><p className="mx-auto mt-3 max-w-md text-sm leading-6 text-muted">Browse the library and add a lift to get today moving.</p><Link href="/" className="mt-6 inline-flex rounded-xl bg-lime px-5 py-3 text-xs font-black uppercase tracking-[.12em] text-ink">Go to workouts →</Link></div> : <div className="grid gap-5 md:grid-cols-2">
      {visible.map((workout) => <WorkoutCard key={workout.id} workout={workout} compact done={done.includes(workout.id)} actions={<div className="flex flex-wrap gap-2"><Link href={`/workout/${workout.id}`} className="flex-1 rounded-lg border border-line px-3 py-2 text-center text-[10px] font-black uppercase tracking-[.12em]">View Details</Link>{tab === 'plan' && <><button onClick={() => markDone(workout.id)} disabled={done.includes(workout.id)} className="flex-1 rounded-lg bg-lime px-3 py-2 text-[10px] font-black uppercase tracking-[.12em] text-ink disabled:opacity-50"><CheckIcon /> {done.includes(workout.id) ? 'Done' : 'Mark as Done'}</button><button aria-label="Remove" onClick={() => removeFromPlan(workout.id)} className="grid h-9 w-9 place-items-center rounded-lg border border-line text-muted hover:border-red-400 hover:text-red-300"><CloseIcon /></button></>}</div>} />)}
    </div>}</div>
  </div></main><Footer /></>;
}