-- 0001_init.sql — VeVit Art backend schema (Supabase)
-- Nahrazuje ruční PHP/MySQL auth + bearer-token backend (api/*.php).
-- Auth řeší Supabase Auth; password_hash / auth_token / token_expires mizí.
-- RLS reprodukuje PHP requireAuth + artist_id scoping (veřejný select,
-- write jen pro vlastníka řádku).

create extension if not exists "pgcrypto";

-- =========================================================================
-- artists  (1 řádek = 1 umělec; user_id váže na Supabase Auth)
-- =========================================================================
create table if not exists public.artists (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid unique references auth.users(id) on delete cascade,
  artist_name   text not null,
  email         text not null unique,
  field         text not null check (field in ('hudba','vytvarne_umeni','literatura','cosplay','jine')),
  real_name            text,
  genre                text,
  bio                  text,
  phone                text,
  instagram_handle     text,
  profile_photo_url    text,
  logo_url             text,
  current_plans        text,
  looking_for          text,
  music_role           text,
  main_instrument      text,
  art_technique        text,
  writing_genre        text,
  published_works_count int default 0,
  cosplay_characters   text,
  offers_costume_rental boolean default false,
  created_at   timestamptz not null default now()
);

create index if not exists artists_user_id_idx     on public.artists(user_id);
create index if not exists artists_email_idx       on public.artists(email);
create index if not exists artists_field_idx       on public.artists(field);

-- =========================================================================
-- Related tabulky (vše s artist_id → artists(id) on delete cascade)
-- =========================================================================

create table if not exists public.social_links (
  id         uuid primary key default gen_random_uuid(),
  artist_id  uuid not null references public.artists(id) on delete cascade,
  platform   text not null,
  url        text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.portfolio_samples (
  id          uuid primary key default gen_random_uuid(),
  artist_id   uuid not null references public.artists(id) on delete cascade,
  title       text,
  image_url   text not null,
  description text,
  sort_order  int default 0,
  created_at  timestamptz not null default now()
);

create table if not exists public.experiences (
  id          uuid primary key default gen_random_uuid(),
  artist_id   uuid not null references public.artists(id) on delete cascade,
  role        text not null,
  organization text,
  start_date  text,
  end_date    text,
  description text,
  sort_order  int default 0,
  created_at  timestamptz not null default now()
);

create table if not exists public.collaborations (
  id          uuid primary key default gen_random_uuid(),
  artist_id   uuid not null references public.artists(id) on delete cascade,
  with_whom   text not null,
  project     text,
  url         text,
  description text,
  sort_order  int default 0,
  created_at  timestamptz not null default now()
);

create table if not exists public.awards (
  id          uuid primary key default gen_random_uuid(),
  artist_id   uuid not null references public.artists(id) on delete cascade,
  title       text not null,
  issuer      text,
  date        text,
  description text,
  sort_order  int default 0,
  created_at  timestamptz not null default now()
);

create table if not exists public.education (
  id            uuid primary key default gen_random_uuid(),
  artist_id     uuid not null references public.artists(id) on delete cascade,
  institution   text not null,
  degree        text,
  field_of_study text,
  start_year    int,
  end_year      int,
  description   text,
  sort_order    int default 0,
  created_at    timestamptz not null default now()
);

create index if not exists social_links_artist_idx      on public.social_links(artist_id);
create index if not exists portfolio_samples_artist_idx on public.portfolio_samples(artist_id);
create index if not exists experiences_artist_idx       on public.experiences(artist_id);
create index if not exists collaborations_artist_idx    on public.collaborations(artist_id);
create index if not exists awards_artist_idx            on public.awards(artist_id);
create index if not exists education_artist_idx         on public.education(artist_id);

-- =========================================================================
-- Row Level Security
-- =========================================================================

alter table public.artists             enable row level security;
alter table public.social_links        enable row level security;
alter table public.portfolio_samples   enable row level security;
alter table public.experiences         enable row level security;
alter table public.collaborations      enable row level security;
alter table public.awards              enable row level security;
alter table public.education           enable row level security;

-- artists: veřejný select; write jen pro vlastníka (user_id = auth.uid())
create policy "artists_select_public" on public.artists
  for select using (true);

create policy "artists_insert_own" on public.artists
  for insert with check (user_id = auth.uid());

create policy "artists_update_own" on public.artists
  for update using (user_id = auth.uid()) with check (user_id = auth.uid());

create policy "artists_delete_own" on public.artists
  for delete using (user_id = auth.uid());

-- Pomocný výraz: artist_id patří přihlášenému uživateli.
-- Používáno pro related tabulky (using i with check).
create function public.artist_owned_by_current_user(a_id uuid)
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.artists a
    where a.id = a_id and a.user_id = auth.uid()
  );
$$;

-- Related tabulky: veřejný select; write jen pro umělce, kterýmu patří artist_id.
-- (Stejný scoping jako PHP `artist_id = $artist['id']` po requireAuth.)

create policy "social_links_select_public" on public.social_links
  for select using (true);
create policy "social_links_insert_own" on public.social_links
  for insert with check (public.artist_owned_by_current_user(artist_id));
create policy "social_links_update_own" on public.social_links
  for update using (public.artist_owned_by_current_user(artist_id))
  with check (public.artist_owned_by_current_user(artist_id));
create policy "social_links_delete_own" on public.social_links
  for delete using (public.artist_owned_by_current_user(artist_id));

create policy "portfolio_samples_select_public" on public.portfolio_samples
  for select using (true);
create policy "portfolio_samples_insert_own" on public.portfolio_samples
  for insert with check (public.artist_owned_by_current_user(artist_id));
create policy "portfolio_samples_update_own" on public.portfolio_samples
  for update using (public.artist_owned_by_current_user(artist_id))
  with check (public.artist_owned_by_current_user(artist_id));
create policy "portfolio_samples_delete_own" on public.portfolio_samples
  for delete using (public.artist_owned_by_current_user(artist_id));

create policy "experiences_select_public" on public.experiences
  for select using (true);
create policy "experiences_insert_own" on public.experiences
  for insert with check (public.artist_owned_by_current_user(artist_id));
create policy "experiences_update_own" on public.experiences
  for update using (public.artist_owned_by_current_user(artist_id))
  with check (public.artist_owned_by_current_user(artist_id));
create policy "experiences_delete_own" on public.experiences
  for delete using (public.artist_owned_by_current_user(artist_id));

create policy "collaborations_select_public" on public.collaborations
  for select using (true);
create policy "collaborations_insert_own" on public.collaborations
  for insert with check (public.artist_owned_by_current_user(artist_id));
create policy "collaborations_update_own" on public.collaborations
  for update using (public.artist_owned_by_current_user(artist_id))
  with check (public.artist_owned_by_current_user(artist_id));
create policy "collaborations_delete_own" on public.collaborations
  for delete using (public.artist_owned_by_current_user(artist_id));

create policy "awards_select_public" on public.awards
  for select using (true);
create policy "awards_insert_own" on public.awards
  for insert with check (public.artist_owned_by_current_user(artist_id));
create policy "awards_update_own" on public.awards
  for update using (public.artist_owned_by_current_user(artist_id))
  with check (public.artist_owned_by_current_user(artist_id));
create policy "awards_delete_own" on public.awards
  for delete using (public.artist_owned_by_current_user(artist_id));

create policy "education_select_public" on public.education
  for select using (true);
create policy "education_insert_own" on public.education
  for insert with check (public.artist_owned_by_current_user(artist_id));
create policy "education_update_own" on public.education
  for update using (public.artist_owned_by_current_user(artist_id))
  with check (public.artist_owned_by_current_user(artist_id));
create policy "education_delete_own" on public.education
  for delete using (public.artist_owned_by_current_user(artist_id));

-- =========================================================================
-- Trigger: nový auth.users → automaticky založ artists řádek.
-- (Zrcadlí register.php: artist_name + field z raw_user_meta_data.)
-- Registrace v appce = supabase.auth.signUp({ email, password, options:
--   { data: { artist_name, field } } })
-- =========================================================================

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.artists (user_id, email, artist_name, field)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'artist_name', split_part(new.email, '@', 1)),
    coalesce(new.raw_user_meta_data ->> 'field', 'jine')
  )
  on conflict (user_id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();