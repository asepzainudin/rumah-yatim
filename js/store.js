/* Penyimpanan lokal (localStorage) — simulasi backend untuk presentasi */

const Store = {
  PREFIX: "yatim_",

  get(key, fallback = null) {
    try {
      const raw = localStorage.getItem(this.PREFIX + key);
      return raw === null ? fallback : JSON.parse(raw);
    } catch {
      return fallback;
    }
  },

  set(key, value) {
    try {
      localStorage.setItem(this.PREFIX + key, JSON.stringify(value));
    } catch {
      /* localStorage tidak tersedia (mis. mode privat) — abaikan, UI tetap jalan */
    }
  },

  remove(key) {
    try {
      localStorage.removeItem(this.PREFIX + key);
    } catch {
      /* abaikan */
    }
  },

  /* Saldo donatur */
  getSaldo() {
    const saldo = this.get("saldo");
    if (saldo === null) {
      this.set("saldo", 150000);
      return 150000;
    }
    return saldo;
  },

  topUp(nominal) {
    const baru = this.getSaldo() + nominal;
    this.set("saldo", baru);
    return baru;
  },

  kurangiSaldo(nominal) {
    const baru = Math.max(0, this.getSaldo() - nominal);
    this.set("saldo", baru);
    return baru;
  },

  /* Riwayat transaksi */
  getRiwayat() {
    return this.get("riwayat", []);
  },

  tambahRiwayat(transaksi) {
    const riwayat = this.getRiwayat();
    riwayat.unshift({
      id: "TRX-" + Date.now(),
      waktu: new Date().toLocaleString("id-ID", { dateStyle: "medium", timeStyle: "short" }),
      ...transaksi,
    });
    this.set("riwayat", riwayat);
    return riwayat;
  },

  /* Progres anak (disesuaikan saat ada donasi agar terlihat di kartu) */
  getProgresAnak() {
    return this.get("progresAnak", {});
  },

  tambahDonasiAnak(anakId, nominal) {
    const progres = this.getProgresAnak();
    progres[anakId] = (progres[anakId] || 0) + nominal;
    this.set("progresAnak", progres);
  },

  getTerkumpul(anak) {
    return anak.terkumpul + (this.getProgresAnak()[anak.id] || 0);
  },

  /* Anak asuh yang didukung donatur */
  getAnakSaya() {
    return this.get("anakSaya", []);
  },

  dukungAnak(anakId, status = "Donatur") {
    const daftar = this.getAnakSaya();
    if (!daftar.find((d) => d.id === anakId)) {
      daftar.push({ id: anakId, status, sejak: new Date().toLocaleDateString("id-ID", { dateStyle: "medium" }) });
      this.set("anakSaya", daftar);
    }
    return daftar;
  },
};
