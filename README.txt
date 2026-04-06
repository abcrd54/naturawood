Naturawood React + Supabase Auth

Isi:
- Landing page premium
- Portfolio
- Ready Stock terhubung ke Supabase
- Hero slider terhubung ke Supabase table + Storage
- Gambar ready stock upload ke Supabase Storage
- Floating WhatsApp button
- Admin panel di /admin-panel
- Login admin pakai Supabase Auth email + password
- File SQL: supabase-ready-stock.sql

Cara setup:
1. Extract zip
2. Jalankan: npm install
3. Buat file .env lalu isi:
   VITE_SUPABASE_URL=
   VITE_SUPABASE_ANON_KEY=
   VITE_SUPABASE_STORAGE_BUCKET=website-assets
4. Di Supabase SQL Editor, jalankan:
   supabase-ready-stock.sql
5. Di Supabase Dashboard > Storage:
   buat bucket public dengan nama yang sama seperti VITE_SUPABASE_STORAGE_BUCKET
   contoh: website-assets
6. Di bucket itu, admin panel akan upload gambar slider ke folder hero-slides dan gambar produk ke folder ready-stock/before serta ready-stock/after
7. Di Supabase Dashboard > Authentication > Users:
   buat 1 user admin email + password
8. Jalankan: npm run dev

Route:
- Homepage: /
- Admin panel: /admin-panel

Catatan:
- Section Hero Slider sekarang bisa diatur dari admin panel.
- Gambar ready stock juga bisa upload langsung dari admin panel ke Supabase Storage.
- Jika tabel hero_slides kosong atau belum siap, website tetap pakai fallback slider bawaan.
