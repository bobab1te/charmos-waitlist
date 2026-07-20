# CharmOS Waitlist (standalone)

A standalone landing page for collecting CharmOS waitlist signups, built to match
CharmOS's existing design tokens (Tailwind v4 + the CharmOS pink/lavender palette)
so it can be dropped into the main CharmOS repo later as a route.

This lives outside the CharmOS repo for now because it was built on a different
machine than the one with the full CharmOS project cloned. It uses its own
**dedicated** Supabase project (`VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY`
in `.env`) — deliberately separate from the main CharmOS app's project, so
waitlist experimentation never touches production data. When merging into
CharmOS later, either keep this as a separate project or migrate the data
into the main app's database at that point.

## Setup

```bash
npm install
npm run dev
```

Runs on http://localhost:3001.

## One-time Supabase setup

Run this once in the Supabase SQL editor (Dashboard → SQL Editor) for the
dedicated waitlist project at `lduyinzizvqebtievjgl`:

```sql
create table if not exists waitlist (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  purpose text[],
  purpose_other text,
  creator_type text,
  follower_range text,
  location text,
  niche text[],
  niche_other text,
  platforms text[],
  newsletter_opt_in boolean not null default false,
  suggestions text,
  created_at timestamptz not null default now()
);

alter table waitlist enable row level security;

create policy "Anyone can join the waitlist"
  on waitlist for insert
  to anon
  with check (true);
```

This creates the table and allows anonymous (public) inserts only — no one can
read or modify existing rows with the anon key, only add new ones.

### Migrating an existing `waitlist` table

If you already created the table before these extra fields were added, run
this instead to add any missing columns without losing existing rows:

```sql
alter table waitlist add column if not exists purpose_other text;
alter table waitlist add column if not exists creator_type text;
alter table waitlist add column if not exists follower_range text;
alter table waitlist add column if not exists location text;
alter table waitlist add column if not exists niche_other text;
alter table waitlist add column if not exists platforms text[];
alter table waitlist add column if not exists newsletter_opt_in boolean not null default false;
alter table waitlist add column if not exists suggestions text;

alter table waitlist add column if not exists purpose text[];
alter table waitlist add column if not exists niche text[];
```

This is safe to run any number of times — `if not exists` skips columns that
are already there. If `purpose` or `niche` already exist as plain `text`
columns from an earlier version, convert them to arrays instead of adding
them fresh:

```sql
alter table waitlist
  alter column purpose type text[]
  using case when purpose is null then null else array[purpose] end;

alter table waitlist
  alter column niche type text[]
  using case when niche is null then null else array[niche] end;
```

## Merging into CharmOS later

1. Copy these into the matching folders under `CharmOS/src/`:
   - `src/components/WaitlistPage.tsx`
   - `src/components/RevealSection.tsx`
   - `src/components/SunGlow.tsx`
   - `src/components/MultiSelectDropdown.tsx`
   - `src/components/SearchableSelect.tsx`
   - `src/components/sections/` (HeroSection, BioSection, WhatYoullGetSection, FormSection)
   - `src/hooks/useRevealOnScroll.ts`
   - `src/hooks/useScrollProgress.ts`
   - `src/lib/countries.ts`
2. Copy `public/charm-cloud.png` and `public/bio-photo.jpg` into `CharmOS/public/`,
   and the `public/fonts/visby-cf/` folder if not already present there.
3. Create a new route file, e.g. `CharmOS/src/routes/waitlist.tsx`:

   ```tsx
   import { createFileRoute } from '@tanstack/react-router'
   import { WaitlistPage } from '#/components/WaitlistPage'

   export const Route = createFileRoute('/waitlist')({
     component: WaitlistPage,
   })
   ```

4. Delete this standalone project (or keep it around, doesn't matter — the
   Supabase table and data carry over regardless since it's the same project).

No other changes needed — CharmOS already has `@supabase/supabase-js`,
Tailwind v4, and the same color tokens in `src/styles.css`.
