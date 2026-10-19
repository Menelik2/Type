-- Type platform — initial schema (Phase 7)
-- Apply in Supabase SQL editor or via CLI: supabase db push
-- IMPORTANT: Enable RLS on all tables before production traffic.

create type public.user_role as enum ('student', 'editor', 'admin');
create type public.content_status as enum ('draft', 'published', 'archived');
create type public.learning_language as enum ('en', 'am');

create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text,
  display_name text,
  role public.user_role not null default 'student',
  preferred_interface_lang text default 'en',
  preferred_learning_lang text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Users can read own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

create policy "Staff can read profiles"
  on public.profiles for select
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role in ('editor', 'admin')
    )
  );

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, display_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'display_name', split_part(new.email, '@', 1))
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

create table public.courses (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title_en text not null,
  title_am text not null default '',
  description_en text not null default '',
  description_am text not null default '',
  learning_language public.learning_language not null,
  level text not null default 'beginner',
  status public.content_status not null default 'draft',
  lessons_count int not null default 0,
  estimated_hours numeric(4,1) default 0,
  created_by uuid references public.profiles (id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.courses enable row level security;

create policy "Anyone can read published courses"
  on public.courses for select
  using (status = 'published');

create policy "Staff can manage courses"
  on public.courses for all
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role in ('editor', 'admin')
    )
  );

create table public.chapters (
  id uuid primary key default gen_random_uuid(),
  course_id uuid not null references public.courses (id) on delete cascade,
  title_en text not null,
  title_am text not null default '',
  sort_order int not null default 0
);

alter table public.chapters enable row level security;

create policy "Read chapters of published courses"
  on public.chapters for select
  using (
    exists (
      select 1 from public.courses c
      where c.id = course_id and c.status = 'published'
    )
  );

create policy "Staff manage chapters"
  on public.chapters for all
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role in ('editor', 'admin')
    )
  );

create table public.lessons (
  id uuid primary key default gen_random_uuid(),
  chapter_id uuid not null references public.chapters (id) on delete cascade,
  title_en text not null,
  title_am text not null default '',
  sort_order int not null default 0,
  content jsonb not null default '{}'::jsonb
);

alter table public.lessons enable row level security;

create policy "Read lessons of published courses"
  on public.lessons for select
  using (
    exists (
      select 1
      from public.chapters ch
      join public.courses c on c.id = ch.course_id
      where ch.id = chapter_id and c.status = 'published'
    )
  );

create policy "Staff manage lessons"
  on public.lessons for all
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role in ('editor', 'admin')
    )
  );

create table public.enrollments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  course_id uuid not null references public.courses (id) on delete cascade,
  enrolled_at timestamptz not null default now(),
  unique (user_id, course_id)
);

alter table public.enrollments enable row level security;

create policy "Users manage own enrollments"
  on public.enrollments for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create table public.lesson_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  course_id uuid not null references public.courses (id) on delete cascade,
  lesson_id uuid not null references public.lessons (id) on delete cascade,
  completed boolean not null default false,
  completed_at timestamptz,
  last_accessed_at timestamptz default now(),
  unique (user_id, lesson_id)
);

alter table public.lesson_progress enable row level security;

create policy "Users manage own progress"
  on public.lesson_progress for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create table public.audit_log (
  id bigserial primary key,
  actor_id uuid references public.profiles (id),
  action text not null,
  detail text,
  created_at timestamptz not null default now()
);

alter table public.audit_log enable row level security;

create policy "Staff read audit"
  on public.audit_log for select
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role in ('editor', 'admin')
    )
  );

create policy "Authenticated insert audit"
  on public.audit_log for insert
  with check (auth.uid() = actor_id);

-- Create storage bucket "lesson-audio" in Dashboard; public read + staff write.
