import type { Workout } from './types';

export const FITLOG_API =
  'https://api.abcz.workers.dev/api/fitlog';

const fallbackImages = ['/banner.png'];

function pick<T>(
  ...values: Array<T | null | undefined>
): T | undefined {
  return values.find(
    (value) => value !== null && value !== undefined
  );
}

function toNumber(
  value: unknown,
  fallback = 0
): number {
  const n = Number(
    String(value ?? '').replace(/[^0-9.]/g, '')
  );

  return Number.isFinite(n) ? n : fallback;
}

function toArray(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.map(String).filter(Boolean);
  }

  if (typeof value === 'string') {
    return value
      .split(/[,|]/)
      .map((v) => v.trim())
      .filter(Boolean);
  }

  return [];
}

export function normalizeWorkout(
  raw: any,
  index = 0
): Workout {
  const name = String(
    pick(
      raw?.name,
      raw?.title,
      raw?.workoutName,
      raw?.exercise,
      `Workout ${index + 1}`
    )
  );

  const categories = toArray(
    pick(
      raw?.category,
      raw?.categories,
      raw?.muscleGroup,
      raw?.muscle_groups,
      raw?.target
    )
  );

  const equipmentValue = pick(
    raw?.equipment,
    raw?.equipments,
    raw?.equipmentName
  );

  const image = String(
    pick(
      raw?.image,
      raw?.imageUrl,
      raw?.image_url,
      raw?.thumbnail,
      raw?.photo,
      fallbackImages[0]
    ) || fallbackImages[0]
  );

  const instructions = toArray(
    pick(
      raw?.instructions,
      raw?.steps,
      raw?.instruction
    )
  );

  return {
    id: String(
      pick(
        raw?.id,
        raw?._id,
        raw?.uuid,
        index + 1
      )
    ),
    name: name.toUpperCase(),
    description: String(
      pick(
        raw?.description,
        raw?.desc,
        'A focused movement designed to build strength and consistency in your training.'
      )
    ),
    category: categories.length
      ? categories
      : ['FULL BODY'],
    equipment: Array.isArray(equipmentValue)
      ? equipmentValue.join(', ')
      : String(
          equipmentValue ??
          'Standard gym equipment'
        ),
    difficulty: String(
      pick(
        raw?.difficulty,
        raw?.level,
        'Intermediate'
      )
    ),
    sets: String(
      pick(raw?.sets, raw?.set, '4')
    ),
    reps: String(
      pick(raw?.reps, raw?.rep, '8-12')
    ),
    duration: toNumber(
      pick(
        raw?.duration,
        raw?.durationMin,
        raw?.minutes,
        raw?.time
      ),
      25
    ),
    calories: Math.round(
      toNumber(
        pick(
          raw?.calories,
          raw?.kcal,
          raw?.calorie
        ),
        180
      )
    ),
    rating: toNumber(
      pick(raw?.rating, raw?.score),
      4.8
    ),
    image,
    instructions: instructions.length
      ? instructions
      : [
          'Set your position and brace your core before the first rep.',
          'Move through the full range of motion with controlled tempo.',
          'Keep the target muscles under tension and avoid rushing.',
          'Finish the final rep safely and reset before the next set.',
        ],
  };
}

export async function fetchWorkouts(): Promise<Workout[]> {
  const response = await fetch(
    FITLOG_API,
    { cache: 'no-store' }
  );

  if (!response.ok) {
    throw new Error(
      `FitLog API returned ${response.status}`
    );
  }

  const data = await response.json();

  const rows = Array.isArray(data)
    ? data
    : Array.isArray(data?.data)
      ? data.data
      : Array.isArray(data?.workouts)
        ? data.workouts
        : [];

  return rows.map(normalizeWorkout);
}

export async function fetchWorkout(
  id: string
): Promise<Workout | null> {
  const response = await fetch(
    `${FITLOG_API}/${encodeURIComponent(id)}`,
    { cache: 'no-store' }
  );

  if (!response.ok) return null;

  const data = await response.json();
  const raw =
    data?.data ??
    data?.workout ??
    data;

  return raw
    ? normalizeWorkout(raw)
    : null;
}