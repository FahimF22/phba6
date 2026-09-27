# FitLog — Workout Library

A responsive workout-library and daily training-plan web app built from the FitLog assignment design. FitLog lets users browse workouts, open a workout detail page, add lifts to today’s capped five-exercise plan, save workouts for later, and mark planned workouts as completed.

## Technologies

- **Next.js 14** — App Router and page navigation
- **React 18** — interactive UI and shared state
- **Tailwind CSS** — responsive styling and layout
- **TypeScript** — typed components and API normalization
- **FitLog API** — workout data source
- **localStorage** — persistence for plan, saved, and completed items

## Key Features

1. Responsive dark FitLog UI matching the supplied design direction.
2. Workout library with API loading state and Duration/Calories/Rating sorting.
3. Workout detail pages with specs, instructions, Add to Plan and Save for Later actions.
4. My Plan page with live Exercises/Minutes/Calories metrics, Today’s Plan and Saved tabs.
5. Five-lift daily cap with toast notifications, Mark as Done, and Remove actions.
6. Persistent plan/saved state through localStorage.
7. Custom 404 page and loading states for smooth navigation.
8. Responsive navigation, hero section, card grid, and mobile layout.

## API

- All workouts: `https://api.abcz.workers.dev/api/fitlog`
- Single workout: `https://api.abcz.workers.dev/api/fitlog/:id`

The frontend normalizes common API field names so the UI remains resilient to small response-shape differences. A local fallback dataset is included for development/offline preview only; the live app attempts the provided API first.

## Run Locally

```bash
npm install
npm run dev