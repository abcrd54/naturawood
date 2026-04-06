create extension if not exists pgcrypto;

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  title_id text not null,
  title_en text,
  size text,
  condition_id text,
  condition_en text,
  status text not null default 'ready' check (status in ('ready', 'sold_out')),
  before_image text,
  after_image text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.hero_slides (
  id uuid primary key default gen_random_uuid(),
  slide_key text not null unique,
  image_url text not null,
  title_id text,
  title_en text,
  subtitle_id text,
  subtitle_en text,
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists products_set_updated_at on public.products;
create trigger products_set_updated_at
before update on public.products
for each row
execute function public.set_updated_at();

drop trigger if exists hero_slides_set_updated_at on public.hero_slides;
create trigger hero_slides_set_updated_at
before update on public.hero_slides
for each row
execute function public.set_updated_at();

alter table public.products enable row level security;
alter table public.hero_slides enable row level security;

drop policy if exists "Public can read products" on public.products;
create policy "Public can read products"
on public.products
for select
to anon, authenticated
using (true);

drop policy if exists "Authenticated can insert products" on public.products;
create policy "Authenticated can insert products"
on public.products
for insert
to authenticated
with check (true);

drop policy if exists "Authenticated can update products" on public.products;
create policy "Authenticated can update products"
on public.products
for update
to authenticated
using (true)
with check (true);

drop policy if exists "Authenticated can delete products" on public.products;
create policy "Authenticated can delete products"
on public.products
for delete
to authenticated
using (true);

drop policy if exists "Public can read hero slides" on public.hero_slides;
create policy "Public can read hero slides"
on public.hero_slides
for select
to anon, authenticated
using (true);

drop policy if exists "Authenticated can insert hero slides" on public.hero_slides;
create policy "Authenticated can insert hero slides"
on public.hero_slides
for insert
to authenticated
with check (true);

drop policy if exists "Authenticated can update hero slides" on public.hero_slides;
create policy "Authenticated can update hero slides"
on public.hero_slides
for update
to authenticated
using (true)
with check (true);

drop policy if exists "Authenticated can delete hero slides" on public.hero_slides;
create policy "Authenticated can delete hero slides"
on public.hero_slides
for delete
to authenticated
using (true);

insert into public.products (code, title_id, title_en, size, condition_id, condition_en, status, before_image, after_image, sort_order)
values
('NW-PR-017', 'Grand Suar Slab', 'Grand Suar Slab', '275 × 98 cm', 'Kayu sudah kiln dried, kondisi mentah', 'Kiln dried, unfinished slab', 'ready',
 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=1200&q=80',
 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80', 1),
('NW-PR-021', 'Contour Trembesi Slab', 'Contour Trembesi Slab', '240 × 90 cm', 'Sudah diratakan dan siap masuk finishing', 'Flattened and ready for finishing', 'ready',
 'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80',
 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80', 2),
('NW-PR-026', 'Signature Organic Top', 'Signature Organic Top', '220 × 85 cm', 'Sudah terjual dan diarsipkan sebagai referensi', 'Sold out and archived as reference', 'sold_out',
 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
 'https://images.unsplash.com/photo-1484101403633-562f891dc89a?auto=format&fit=crop&w=1200&q=80', 3)
on conflict (code) do nothing;

insert into public.hero_slides (slide_key, image_url, title_id, title_en, subtitle_id, subtitle_en, sort_order, is_active)
values
('hero-1', 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1800&q=80', 'Kayu solid premium dengan karakter alami di setiap seratnya.', 'Premium solid wood with natural character in every grain.', 'Naturawood menghadirkan meja solid, slab siap pilih, dan custom project dengan tampilan yang rapi, hangat, dan premium.', 'Naturawood presents solid tables, curated slabs, and custom project pieces with a warm, refined, and premium visual language.', 1, true),
('hero-2', 'https://images.unsplash.com/photo-1484101403633-562f891dc89a?auto=format&fit=crop&w=1800&q=80', 'Dari slab mentah menjadi karya akhir yang berkelas.', 'From raw slab to a finished piece with presence.', 'Lihat bagaimana material pilihan diproses menjadi table top, resin piece, dan kebutuhan interior dengan pendekatan yang detail.', 'See how selected materials are transformed into table tops, resin pieces, and interior elements through a careful and detailed process.', 2, true),
('hero-3', 'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1800&q=80', 'Dibuat di Indonesia untuk ruang tinggal, hospitality, dan project statement.', 'Crafted in Indonesia for living spaces, hospitality, and statement projects.', 'Cocok untuk rumah, villa, hotel, cafe, maupun project komersial yang membutuhkan karakter kayu yang kuat dan presentasi yang elegan.', 'Suitable for homes, villas, hotels, cafes, and commercial projects that need strong wood character with an elegant final presentation.', 3, true)
on conflict (slide_key) do nothing;
