'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { Workout } from '../lib/types';

type Toast = { id: number; message: string };
type FitLogContextValue = {
  plan: string[];
  saved: string[];
  done: string[];
  addToPlan: (id: string) => boolean;
  saveForLater: (id: string) => boolean;
  removeFromPlan: (id: string) => void;
  markDone: (id: string) => void;
  isInPlan: (id: string) => boolean;
  isSaved: (id: string) => boolean;
  isDone: (id: string) => boolean;
  toast: (message: string) => void;
};

const Context = createContext<FitLogContextValue | null>(null);
const read = (key: string): string[] => {
  try { return JSON.parse(localStorage.getItem(key) || '[]'); } catch { return []; }
};

export function FitLogProvider({ children }: { children: React.ReactNode }) {
  const [plan, setPlan] = useState<string[]>([]);
  const [saved, setSaved] = useState<string[]>([]);
  const [done, setDone] = useState<string[]>([]);
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    setPlan(read('fitlog-plan'));
    setSaved(read('fitlog-saved'));
    setDone(read('fitlog-done'));
  }, []);
  useEffect(() => { localStorage.setItem('fitlog-plan', JSON.stringify(plan)); }, [plan]);
  useEffect(() => { localStorage.setItem('fitlog-saved', JSON.stringify(saved)); }, [saved]);
  useEffect(() => { localStorage.setItem('fitlog-done', JSON.stringify(done)); }, [done]);

  const toast = (message: string) => {
    const id = Date.now() + Math.random();
    setToasts((current) => [...current, { id, message }]);
    window.setTimeout(() => setToasts((current) => current.filter((item) => item.id !== id)), 2300);
  };

  const value = useMemo<FitLogContextValue>(() => ({
    plan, saved, done,
    addToPlan: (id) => {
      if (plan.includes(id)) { toast('Workout is already in today’s plan'); return false; }
      if (plan.length >= 5) { toast('Today’s plan is capped at five lifts'); return false; }
      setPlan((current) => [...current, id]); toast('Added to today’s plan'); return true;
    },
    saveForLater: (id) => {
      if (saved.includes(id)) { toast('Workout is already saved'); return false; }
      setSaved((current) => [...current, id]); toast('Saved for later'); return true;
    },
    removeFromPlan: (id) => { setPlan((current) => current.filter((item) => item !== id)); setDone((current) => current.filter((item) => item !== id)); toast('Removed from today’s plan'); },
    markDone: (id) => { setDone((current) => current.includes(id) ? current : [...current, id]); toast('Workout marked as done'); },
    isInPlan: (id) => plan.includes(id), isSaved: (id) => saved.includes(id), isDone: (id) => done.includes(id), toast,
  }), [plan, saved, done]);

  return <Context.Provider value={value}>{children}<div className="fixed right-4 top-20 z-50 flex w-[min(360px,calc(100vw-2rem))] flex-col gap-2">{toasts.map((item) => <div key={item.id} className="fade-in rounded-xl border border-lime/50 bg-lime px-4 py-3 text-sm font-bold text-ink shadow-lime">{item.message}</div>)}</div></Context.Provider>;
}

export function useFitLog() {
  const ctx = useContext(Context);
  if (!ctx) throw new Error('useFitLog must be used inside FitLogProvider');
  return ctx;
}

export function useWorkoutList(source: Workout[], ids: string[]) {
  return useMemo(() => ids.map((id) => source.find((workout) => workout.id === id)).filter(Boolean) as Workout[], [source, ids]);
}