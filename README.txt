PHANTOM MARKET
===========================
Mysterious Product Management

DESKRIPSI
----------
Aplikasi Single Page Application (SPA) untuk mengelola data produk
menggunakan DummyJSON API dengan metode HTTP:
- POST (Tambah Data)
- PUT (Edit Data)  
- DELETE (Hapus Data)

FITUR LENGKAP
--------------
✅ CREATE (POST) - Tambah produk baru dengan form yang sudah divalidasi
✅ READ (GET) - Tampilkan daftar produk dari API
✅ UPDATE (PUT) - Edit produk yang sudah ada
✅ DELETE (DELETE) - Hapus produk dengan konfirmasi

KEUNGGULAN APLIKASI
--------------------
🎨 Desain modern dengan tema Soft Purple (ungu pastel)
📱 Responsive layout (mobile friendly)
✨ Animasi halus pada card dan button
🔔 Toast notification untuk feedback pengguna
🎲 Random icon untuk setiap produk
💰 Format mata uang Rupiah (IDR)
🛡️ Protection terhadap XSS (escape HTML)
⚡ Loading state indicator

TEKNOLOGI YANG DIGUNAKAN
-------------------------
- HTML5 (Semantic Elements)
- CSS3 (Grid, Flexbox, Animations, Variables)
- JavaScript ES6+ (async/await, Fetch API, Destructuring)
- DummyJSON API (Mock API untuk testing)

CARA MENJALANKAN
-----------------
1. Ekstrak file ZIP ke folder tujuan
2. Buka file index.html dengan web browser modern
   (Chrome, Firefox, Edge, Safari)
   
REKOMENDASI: Gunakan Live Server di VS Code
1. Install VS Code
2. Install extension "Live Server"
3. Klik kanan index.html → "Open with Live Server"

CARA PENGGUNAAN
----------------
[1] TAMBAH PRODUK
    - Isi form (Nama Produk wajib, Harga wajib)
    - Klik tombol "Tambah Produk"
    - Produk akan muncul di daftar dengan icon random

[2] EDIT PRODUK
    - Klik tombol "Edit" pada produk yang ingin diubah
    - Form akan terisi otomatis
    - Ubah data yang diperlukan
    - Klik "Update Produk"

[3] HAPUS PRODUK
    - Klik tombol "Hapus" pada produk
    - Konfirmasi penghapusan
    - Produk akan hilang dari daftar

PALET WARNA (Soft Purple Theme)
-------------------------------
Primary: #a855f7 (Soft Purple)
Secondary: #9333ea (Medium Purple)
Background: Gradient dari #f3e8ff ke #e9d5ff
Accent: #c084fc (Light Purple)
Success: #10b981 (Green)
Danger: #ef4444 (Red)

STRUKTUR FILE
--------------
index.html  - Struktur dan layout halaman
style.css   - Styling dengan tema Soft Purple
script.js   - Logika CRUD dengan Fetch API
README.txt  - Dokumentasi project

CATATAN PENTING
----------------
- DummyJSON adalah mock API, data tidak disimpan permanen
- Refresh halaman akan mengembalikan data ke awal
- Fokus utama: Logika HTTP Request & Manipulasi DOM
- Semua request menggunakan async/await (bukan .then)
- Error handling menggunakan try-catch

BROWSER SUPPORT
----------------
✅ Chrome (latest)
✅ Firefox (latest)
✅ Edge (latest)
✅ Safari (latest)

