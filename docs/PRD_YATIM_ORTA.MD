# PRODUCT REQUIREMENT DOCUMENT (PRD)
## Aplikasi Yatim Orta (Smart Yatim) - Versi Web Responsive & Mobile UI

---

### 1. RINGKASAN EKSEKUTIF
* **Nama Produk:** Yatim Orta / Smart Yatim
* **Platform:** Website Responsive (Tampilan Desktop untuk Dashboard Admin & Mobile-First UI untuk Portal Donatur)
* **Tujuan:** Membangun platform digital transparansi penyaluran donasi, pengelolaan data anak asuh, serta pelaporan berkala antara pengelola (Admin/User) dan donatur (Orang Tua Asuh).

---

### 2. HAK AKSES PENGGUNA (USER ROLES)
1. **Admin:** Hak akses penuh terhadap manajemen data anak, kebutuhan, laporan kegiatan, realisasi anggaran, dan rekapitulasi laporan terintegrasi.
2. **User / Petugas Lapangan:** Menginput data operasional harian seperti kegiatan anak, update kondisi, dan realisasi anggaran.
3. **Donatur / Orang Tua Asuh:** Mengakses portal donatur untuk memilih anak asuh, melakukan top-up saldo, pembayaran donasi, komitmen bulanan, serta memantau laporan perkembangan.

---

### 3. DETAIL KEBUTUHAN FITUR DAN HALAMAN

#### A. Modul Autentikasi (`login.html` & Simulasi Frontend)
* **Input Field:** Username, Password.
* **Dropdown Level Akses:** Admin, User, Donatur.
* **Validasi & Error Handling:** 
  * Jika kolom kosong/salah: Menampilkan pesan error *"Username/Password Salah"*.
  * Jika berhasil: Dialihkan ke Dashboard yang sesuai dengan level akses.
* **Ketentuan Teknis Frontend (Mock Login tanpa Backend):** 
  * Menggunakan skrip JavaScript sederhana untuk simulasi otentikasi tanpa memerlukan *backend* di tahap awal.
  * Menggunakan penyimpanan lokal browser (`localStorage` atau `sessionStorage`) untuk menyimpan status sesi pengguna agar halaman web mengenali level akses saat berpindah halaman secara interaktif.

#### B. Modul Donatur Portal (Mobile-First Web View)
1. **Halaman Beranda (`index.html`):**
   * **Header:** Tombol Hamburger Menu (Sidebar Drawer), Logo Smart Yatim, dan Ikon Notifikasi.
   * **Widget Saldo:** Informasi saldo aktif, tombol `[+ Top Up]`, dan tombol `[Riwayat]` transaksi.
   * **Banner Kampanye:** Banner interaktif utama *"Bersama... Melukis Masa Depan Mereka"*.
   * **Rekomendasi Anak Asuh:** Grid kartu profil anak (foto, nama, nominal dana terkumpul, dan *progress bar*) serta tombol *"Lainnya"*.
2. **Sidebar Navigasi (Drawer Menu):**
   * Berisi menu: Beranda, Anak Asuh Saya, Riwayat Donasi, Profil Donatur, dan Tentang Rumah Yatim.
3. **Katalog & Filter Anak Asuh (`catalog.html`):**
   * Daftar seluruh profil anak asuh dengan pencarian.
   * **Fitur Filter Modal:** Filter berdasarkan dropdown *"Pilih Provinsi Tempat Tinggal"* (Nanggroe Aceh Darussalam, DKI Jakarta, Jawa Barat, dll) dengan tombol `[Terapkan]`.
4. **Halaman Detail Anak Asuh (`detail-anak.html`):**
   * Informasi foto utama, target vs dana terkumpul (misal: *Rp447,000 dari Rp725,000*), dan statistik jumlah donatur.
   * Keterangan sebab yatim/piatu, profil data diri (tanggal lahir, umur, sekolah, alamat), serta riwayat kegiatan anak lengkap dengan dokumentasi foto.
   * Tombol aksi utama sticky di bagian bawah: `[DONASI]`.
5. **Modals & Formulir Pembayaran:**
   * **Pilihan Metode Donasi:** QRIS, Transfer, Donasi dari Saldo, dan Daftar Orang Tua Asuh (OTA).
   * **Formulir Orang Tua Asuh (`form-ota.html`):** Syarat dan Ketentuan (komitmen minimal 4 bulan, pemotongan otomatis, notifikasi tagihan), input nominal, jumlah bulan, dan tombol konfirmasi persetujuan.
   * **Formulir Donasi Saldo (`donasi-saldo.html`):** Informasi saldo, input nominal, kolom doa opsional, dan tombol `[Konfirmasi Donasi]`.
6. **Halaman Tentang Rumah Yatim (`tentang.html`):**
   * Informasi profil lembaga, legalitas SK Kemenag RI No.209 Tahun 2017, program IPM, jumlah cabang, audit WTP, dan sistem pengelolaan *boarding/family based*.

#### C. Modul Admin & User Dashboard (Desktop Web View)
1. **Pengelolaan Data Anak Asuh (`admin-dashboard.html`):** CRUD lengkap data anak dan profil.
2. **Input Data Kebutuhan:** Pencatatan kebutuhan rutin anak asuh (pangan, pendidikan, kesehatan, dll).
3. **Input Laporan Kegiatan:** Pencatatan aktivitas harian (tanggal, jenis kegiatan, dokumentasi foto).
4. **Input Realisasi Anggaran:** Pencatatan penggunaan anggaran yang terikat dengan laporan Orta.
5. **Input Laporan Perkembangan:** Evaluasi berkala pendidikan, kesehatan, dan kondisi anak.
6. **Laporan Terintegrasi (Laporan Orta):** Pusat rekapitulasi data yang menghubungkan anggaran dan perkembangan anak secara otomatis.

---

### 4. KEBUTUHAN TEKNIS & DESAIN (NON-FUNGSIONAL)
* **Framework Design:** HTML5, CSS3 / Tailwind CSS (untuk mendukung responsivitas perangkat desktop dan *mobile view*).
* **Skema Warna Utama:** Hijau Toska/Muda (`#28A745`), Ungu/Magenta (`#7B1FA2`), dan Abu-abu Terang (`#F8F9FA`).
* **Struktur File Proyek Web:**
  - `login.html` (Autentikasi dengan Mock Login JS)
  - `index.html` (Beranda Donatur)
  - `catalog.html` (Daftar & Filter Anak Asuh)
  - `detail-anak.html` (Detail Profil & Donasi)
  - `tentang.html` (Profil Organisasi)
  - `admin-dashboard.html` (Panel Internal Admin)