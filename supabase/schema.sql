-- ============================================================
-- Cloud Platform | Full Database Schema for Supabase (Postgres)
-- Run this in: Supabase Dashboard > SQL Editor > New query
-- ============================================================

-- Extensions
create extension if not exists "pgcrypto";

-- ============================================================
-- 1. PROFILES (extends auth.users)
-- ============================================================
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  avatar_url text,
  phone text,
  role text not null default 'user' check (role in ('user','admin')),
  membership_tier text not null default 'free' check (membership_tier in ('free','pro','business')),
  created_at timestamptz not null default now()
);

-- Auto-create a profile row whenever a new auth user signs up
create function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, role)
  values (new.id, coalesce(new.raw_user_meta_data->>'full_name', new.email), 'user');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ============================================================
-- 2. SERVICES (صفحة الخدمات)
-- ============================================================
create table public.services (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  description text,
  price numeric(10,2) not null default 0,
  icon text default '⚙️',
  image_url text,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

-- ============================================================
-- 3. COURSES (منصة الدورات)
-- ============================================================
create table public.courses (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  description text,
  thumbnail_url text,
  price numeric(10,2) not null default 0,
  is_free boolean not null default false,
  instructor_name text,
  level text default 'beginner' check (level in ('beginner','intermediate','advanced')),
  is_published boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.course_lessons (
  id uuid primary key default gen_random_uuid(),
  course_id uuid not null references public.courses(id) on delete cascade,
  title text not null,
  video_url text,
  content text,
  order_index int not null default 0,
  is_preview boolean not null default false,
  created_at timestamptz not null default now()
);

create table public.enrollments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  course_id uuid not null references public.courses(id) on delete cascade,
  progress int not null default 0,
  enrolled_at timestamptz not null default now(),
  unique (user_id, course_id)
);

-- ============================================================
-- 4. DIGITAL STORE (المتجر الرقمي)
-- ============================================================
create table public.products (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  description text,
  price numeric(10,2) not null default 0,
  file_url text,
  thumbnail_url text,
  category text,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  total numeric(10,2) not null default 0,
  status text not null default 'pending' check (status in ('pending','paid','cancelled')),
  created_at timestamptz not null default now()
);

create table public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id uuid references public.products(id),
  course_id uuid references public.courses(id),
  price numeric(10,2) not null default 0
);

-- ============================================================
-- 5. BLOG (المدونة)
-- ============================================================
create table public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  excerpt text,
  content text,
  cover_image text,
  author_id uuid references public.profiles(id),
  is_published boolean not null default true,
  created_at timestamptz not null default now()
);

-- ============================================================
-- 6. FREE LIBRARY (المكتبة المجانية)
-- ============================================================
create table public.library_items (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  file_url text not null,
  category text,
  downloads_count int not null default 0,
  created_at timestamptz not null default now()
);

-- ============================================================
-- 7. MEMBERSHIPS (نظام العضويات)
-- ============================================================
create table public.memberships (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  price numeric(10,2) not null default 0,
  interval text not null default 'monthly' check (interval in ('monthly','yearly')),
  features jsonb not null default '[]',
  created_at timestamptz not null default now()
);

create table public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  membership_id uuid not null references public.memberships(id),
  status text not null default 'active' check (status in ('active','cancelled','expired')),
  started_at timestamptz not null default now(),
  ends_at timestamptz
);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================
alter table public.profiles enable row level security;
alter table public.services enable row level security;
alter table public.courses enable row level security;
alter table public.course_lessons enable row level security;
alter table public.enrollments enable row level security;
alter table public.products enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.blog_posts enable row level security;
alter table public.library_items enable row level security;
alter table public.memberships enable row level security;
alter table public.subscriptions enable row level security;

-- Helper: is the current user an admin?
create function public.is_admin()
returns boolean as $$
  select exists (
    select 1 from public.profiles where id = auth.uid() and role = 'admin'
  );
$$ language sql security definer stable;

-- PROFILES: users see/update their own row, admins see/update all
create policy "profiles_select_own_or_admin" on public.profiles
  for select using (auth.uid() = id or public.is_admin());
create policy "profiles_update_own_or_admin" on public.profiles
  for update using (auth.uid() = id or public.is_admin());

-- SERVICES: public can read active services, only admins write
create policy "services_public_read" on public.services
  for select using (is_active = true or public.is_admin());
create policy "services_admin_write" on public.services
  for all using (public.is_admin()) with check (public.is_admin());

-- COURSES: public read published, admin full
create policy "courses_public_read" on public.courses
  for select using (is_published = true or public.is_admin());
create policy "courses_admin_write" on public.courses
  for all using (public.is_admin()) with check (public.is_admin());

-- LESSONS: preview lessons public, full lessons for enrolled users or admin
create policy "lessons_read" on public.course_lessons
  for select using (
    is_preview = true
    or public.is_admin()
    or exists (
      select 1 from public.enrollments e
      where e.course_id = course_lessons.course_id and e.user_id = auth.uid()
    )
  );
create policy "lessons_admin_write" on public.course_lessons
  for all using (public.is_admin()) with check (public.is_admin());

-- ENROLLMENTS: users see their own, admin sees all; users can enroll themselves
create policy "enrollments_select_own_or_admin" on public.enrollments
  for select using (auth.uid() = user_id or public.is_admin());
create policy "enrollments_insert_own" on public.enrollments
  for insert with check (auth.uid() = user_id);
create policy "enrollments_admin_write" on public.enrollments
  for all using (public.is_admin()) with check (public.is_admin());

-- PRODUCTS: public read active, admin write
create policy "products_public_read" on public.products
  for select using (is_active = true or public.is_admin());
create policy "products_admin_write" on public.products
  for all using (public.is_admin()) with check (public.is_admin());

-- ORDERS / ORDER_ITEMS: users see their own, admin sees all
create policy "orders_select_own_or_admin" on public.orders
  for select using (auth.uid() = user_id or public.is_admin());
create policy "orders_insert_own" on public.orders
  for insert with check (auth.uid() = user_id);
create policy "orders_admin_write" on public.orders
  for all using (public.is_admin()) with check (public.is_admin());

create policy "order_items_select_own_or_admin" on public.order_items
  for select using (
    public.is_admin() or exists (
      select 1 from public.orders o where o.id = order_items.order_id and o.user_id = auth.uid()
    )
  );
create policy "order_items_insert_own" on public.order_items
  for insert with check (
    exists (select 1 from public.orders o where o.id = order_items.order_id and o.user_id = auth.uid())
  );

-- BLOG: public read published, admin write
create policy "blog_public_read" on public.blog_posts
  for select using (is_published = true or public.is_admin());
create policy "blog_admin_write" on public.blog_posts
  for all using (public.is_admin()) with check (public.is_admin());

-- LIBRARY: public read all, admin write
create policy "library_public_read" on public.library_items
  for select using (true);
create policy "library_admin_write" on public.library_items
  for all using (public.is_admin()) with check (public.is_admin());

-- MEMBERSHIPS: public read, admin write
create policy "memberships_public_read" on public.memberships
  for select using (true);
create policy "memberships_admin_write" on public.memberships
  for all using (public.is_admin()) with check (public.is_admin());

-- SUBSCRIPTIONS: users see their own, admin sees all
create policy "subscriptions_select_own_or_admin" on public.subscriptions
  for select using (auth.uid() = user_id or public.is_admin());
create policy "subscriptions_admin_write" on public.subscriptions
  for all using (public.is_admin()) with check (public.is_admin());

-- ============================================================
-- DONE. Next: run supabase/seed.sql, then promote your admin
-- (see README.md, step "إنشاء حساب الأدمن")
-- ============================================================
