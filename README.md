# NW28 Keuangan

Rekap keuangan proyek NW28: RAB, pemasukan, pengeluaran, alokasi proyek, laba rugi, serta unduh PDF dan Excel.

- `index.html` adalah seluruh aplikasinya (satu file statis, tanpa proses build).
- Tampilan mengikuti NW28 Command Center (sidebar kiri, bilah atas, panel), dengan UI dominan hitam.
- Data disimpan di proyek Supabase "NW28 Keuangan". Browser hanya memanggil fungsi `keu_*`, dan setiap fungsi memeriksa sesi login. Tabelnya tidak bisa dibaca langsung dari luar.
- Password pengguna disimpan terenkripsi (bcrypt) di database, tidak ada di repo ini.
- `supabase/schema.sql` berisi struktur tabel dan fungsi, untuk dokumentasi.

## Deploy ke Vercel

Import repo ini di Vercel. Framework Preset: Other. Root Directory: `.` (kosongkan). Build Command dan Output Directory dikosongkan, karena ini situs statis.

Scan bukti transfer otomatis hanya tersedia di versi Claude. Di versi ini bukti tetap bisa diunggah dan angkanya diisi manual.

Dipindahkan dari folder `keuangan/` di repo ABSENSI-NW28 (commit 53eb53e).

## Install di HP (Android)

Aplikasi ini bisa dipasang seperti aplikasi biasa (PWA). Ada tiga file pendukung: `manifest.webmanifest`, `sw.js`, dan folder `icons/`.

- **Cara pasang:** buka link Vercel di Chrome Android, lalu ketuk tombol **Install** di banner. Kalau banner tidak muncul, buka menu ⋮ lalu pilih **Instal aplikasi** / **Tambahkan ke layar utama**.
- **Data selalu langsung dari Supabase.** `sw.js` hanya menyimpan kerangka aplikasi (halaman, ikon, pustaka), tidak pernah menyimpan data transaksi.
- **Update:** setiap push ke `main` langsung terpakai saat aplikasi dibuka ulang, karena halaman selalu diambil versi terbaru dulu.
