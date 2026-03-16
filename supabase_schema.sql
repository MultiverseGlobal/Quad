-- Quad Database Schema

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Profiles table
create table public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  full_name text not null,
  matric_number text, -- Allowed to be null initially if coming from auth
  department text,
  level text default '100L',
  skills text[],
  projects jsonb[],
  loops_shop_url text,
  onboarding_completed boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Trigger to create profile on signup
create function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, matric_number, department)
  values (
    new.id, 
    new.raw_user_meta_data->>'full_name', 
    new.raw_user_meta_data->>'matric_number',
    new.raw_user_meta_data->>'department'
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Communities (Departments)
create table public.communities (
  id uuid default uuid_generate_v4() primary key,
  name text not null unique, -- e.g., 'Computer Science', 'Economics'
  description text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Posts
create table public.posts (
  id uuid default uuid_generate_v4() primary key,
  author_id uuid references public.profiles(id) on delete cascade not null,
  community_id uuid references public.communities(id) on delete cascade, -- Nullable for global/main feed
  content text not null,
  media_urls text[],
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Comments
create table public.comments (
  id uuid default uuid_generate_v4() primary key,
  post_id uuid references public.posts(id) on delete cascade not null,
  author_id uuid references public.profiles(id) on delete cascade not null,
  content text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Connections (Followers/Peers)
create table public.connections (
  follower_id uuid references public.profiles(id) on delete cascade not null,
  following_id uuid references public.profiles(id) on delete cascade not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  primary key (follower_id, following_id)
);

-- Opportunities
create table public.opportunities (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  company text not null,
  description text not null,
  type text not null, -- 'Internship', 'Job', 'Gig', 'Event'
  link text,
  author_id uuid references public.profiles(id) on delete set null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Row Level Security (RLS)
alter table public.profiles enable row level security;
alter table public.communities enable row level security;
alter table public.posts enable row level security;
alter table public.comments enable row level security;
alter table public.connections enable row level security;
alter table public.opportunities enable row level security;

-- Policies
create policy "Public profiles are viewable by everyone." on public.profiles
  for select using (true);

create policy "Users can insert their own profile." on public.profiles
  for insert with check (auth.uid() = id);

create policy "Users can update own profile." on public.profiles
  for update using (auth.uid() = id);

-- Posts policies
create policy "Anyone can view posts." on public.posts
  for select using (true);

create policy "Authenticated users can create posts." on public.posts
  for insert with check (auth.uid() = author_id);
