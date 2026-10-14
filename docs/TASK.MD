# TASK - Build Steps Yatim Orta (Smart Yatim)

> Berdasarkan `PRD_YATIM_ORTA.MD` — **murni tampilan HTML** (presentasi), tanpa backend.
>
> **Keputusan build (RALAT):**
> - **Tanpa login** — halaman awal `index.html` berisi pilihan pengguna: **Admin, Petugas Lapangan, Donatur** → diarahkan ke halaman masing-masing.
> - **Tanpa build CSS** — Tailwind Play CDN lokal (`assets/tailwind.js`) + komponen plain CSS (`css/style.css`). Tidak perlu `npm`/`run watch`.
> - **Tanpa server** — semua halaman bisa dibuka langsung via double-click (protocol `file://`).
> - Semua input memberi respon toast/validasi; data disimpan ke `localStorage` bila tersedia (opsional, UI tetap jalan jika tidak).

---

## Phase 0: Setup Proyek ✅
- [x] Struktur folder: `css/`, `js/`, `assets/images/`
- [x] Tailwind Play CDN diunduh lokal (`assets/tailwind.js`) + konfigurasi warna (`js/theme.js`)
- [x] Komponen plain CSS (`css/style.css`): `btn`, `card`, `input`, `progress` — tema hijau `#28A745`, ungu `#7B1FA2`, abu `#F8F9FA`
- [x] Helper UI (`js/ui.js`): toast, drawer, format rupiah, kartu anak, avatar
- [x] Mock data (`js/data.js`): 8 anak asuh, daftar provinsi; penyimpanan (`js/store.js`)

---

## Phase 1: Halaman Awal — Pilihan Pengguna ✅
- [x] Buat `index.html` sebagai halaman awal dengan 3 kartu pilihan: **Admin**, **Petugas Lapangan**, **Donatur**
- [x] Pilihan role disimpan ke `localStorage` (`pilihRole`) + toast konfirmasi
- [x] Redirect: Admin/Petugas → `admin-dashboard.html`, Donatur → `beranda.html`

---

## Phase 2: Donatur Portal - Halaman Utama (Mobile-First) ✅
- [x] Buat `beranda.html` (beranda donatur):
  - [x] Header: tombol hamburger (sidebar drawer), logo Smart Yatim, ikon notifikasi
  - [x] Widget saldo: info saldo aktif, tombol `[+ Top Up]` (modal berfungsi + toast), tombol `[Riwayat]`
  - [x] Banner kampanye *"Bersama... Melukis Masa Depan Mereka"*
  - [x] Grid rekomendasi anak asuh (avatar, nama, dana terkumpul, progress bar) + tombol *"Lainnya"*
- [x] Sidebar drawer: Beranda, Anak Asuh Saya, Riwayat Donasi, Profil Donatur, Tentang Rumah Yatim, Ganti Pengguna
- [x] `admin-dashboard.html`: preview dashboard internal (ringkasan + 6 kartu modul, detail Phase C)

> ⏸ **Checkpoint terlewati** — Phase 0–6 selesai. Tersisa Phase 7 (poles & verifikasi akhir).

---

## Phase 3: Katalog & Detail Anak Asuh ✅
- [x] Buat `catalog.html`:
  - [x] Daftar seluruh profil anak asuh + pencarian (nama/kota/id)
  - [x] Filter modal: dropdown *"Pilih Provinsi Tempat Tinggal"* + tombol `[Terapkan]` (juga Reset & chip hapus filter)
- [x] Buat `detail-anak.html`:
  - [x] Foto utama (avatar), target vs dana terkumpul, statistik jumlah donatur
  - [x] Keterangan sebab yatim/piatu, profil data diri (tanggal lahir, umur, sekolah, alamat)
  - [x] Riwayat kegiatan anak + strip dokumentasi foto
  - [x] Tombol aksi sticky `[DONASI]` di bagian bawah
- [x] Kartu anak di beranda & katalog tertaut ke `detail-anak.html?id=`

---

## Phase 4: Modul Pembayaran & Donasi ✅
- [x] Modal pilihan metode donasi: QRIS, Transfer, Donasi dari Saldo, Daftar Orang Tua Asuh (OTA)
- [x] Buat `form-ota.html`:
  - [x] Syarat & ketentuan (komitmen minimal 4 bulan, pemotongan otomatis, notifikasi tagihan)
  - [x] Input nominal/bulan, pilih jumlah bulan (min. 4), ringkasan total live, checkbox persetujuan
- [x] Buat `donasi-saldo.html`:
  - [x] Info saldo, input nominal (chip + bebas), kolom doa opsional, tombol `[Konfirmasi Donasi]`
- [x] Simulasi transaksi → toast + `localStorage` (saldo, riwayat, progres anak, anak saya) dengan validasi saldo

---

## Phase 5: Halaman Profil Donatur & Pendukung ✅
- [x] `anak-asuh-saya.html`: daftar anak yang didukung + status Donatur/OTA (empty state)
- [x] `riwayat.html`: log transaksi + ringkasan total & saldo (empty state)
- [x] `profil.html`: kartu profil + statistik + form edit data diri (toast simpan)
- [x] `tentang.html`: profil lembaga, SK Kemenag No.209/2017, program IPM, 17 cabang, audit WTP, sistem boarding/family based
- [x] Menu drawer & tombol beranda tersambung ke semua halaman di atas

---

## Phase 6: Admin & User Dashboard (Desktop) ✅
- [x] `admin-dashboard.html` — SPA single-file (sidebar navigasi + 7 view):
  - [x] **Dashboard**: kartu ringkasan, aktivitas terbaru, akses cepat, catatan mode role
  - [x] **CRUD data anak asuh**: tabel + modal tambah/edit + konfirmasi hapus (data di localStorage)
  - [x] **Input data kebutuhan**: form + riwayat (jenis: pangan, pendidikan, kesehatan, dll)
  - [x] **Input laporan kegiatan**: form + upload foto simulasi + riwayat
  - [x] **Input realisasi anggaran**: form + total + flag "Terikat Laporan Orta"
  - [x] **Input laporan perkembangan**: form + status evaluasi (Sangat Baik/Baik/Perlu Perhatian)
  - [x] **Laporan Terintegrasi (Laporan Orta)**: tabel rekap otomatis per anak (target, realisasi, kegiatan, kebutuhan, perkembangan terakhir) + tombol *Rekap Otomatis* + kartu ringkasan + seed data contoh
- [x] Bedakan tampilan: **Admin** (CRUD penuh) vs **Petugas Lapangan** (data anak read-only, input operasional) dari `pilihRole`

---

## Phase 7: Poles & Verifikasi Akhir ✅
- [x] Uji render **Chrome headless** semua 11 halaman: **0 error JS**, semua konten dinamis ter-render
  - beranda: 4 kartu anak tertaut · katalog: 8 kartu + filter · detail: profil + riwayat kegiatan
  - donasi-saldo & form-ota: info saldo + total live (4×Rp50.000 = Rp200.000)
  - admin: stat anak=8, anggaran seed Rp900.000, tabel rekap semua anak
- [x] Uji **localStorage di `file://`**: bekerja & **persist lintas file** (alur pilih role → beranda/dashboard aman)
- [x] Konsistensi 11 halaman: `style.css` + `assets/tailwind.js` lokal + `js/theme.js` + font Plus Jakarta Sans
- [x] Empty state: riwayat, anak asuh saya, katalog, aktivitas dashboard, daftar input admin
- [x] Verifikasi statis: referensi file, sintaks semua script inline, kecocokan `getElementById`, cek class Tailwind tak valid (dibersihkan)
- [x] Review checklist PRD: seluruh modul tercakup (modul login diganti pilihan role sesuai ralat)
- [x] Tidak ada file sisa (build tooling, probe) — struktur bersih, buka `index.html` langsung jalan

---

## Status: SEMUA PHASE SELESAI ✅ (Phase 0–7)

## Urutan Build (Ringkas)
```
Phase 0 → Phase 1 → Phase 2 → [approval] → Phase 3 → Phase 4 → Phase 5 → Phase 6 → Phase 7 ✅
```

## Cara Menjalankan
```text
Double-click index.html — selesai. Tidak perlu npm, build CSS, atau server.
```
