/* Helper UI: toast, drawer, format, kartu anak */

const UI = {
  formatRupiah(angka) {
    return "Rp" + Number(angka || 0).toLocaleString("id-ID");
  },

  escapeHtml(str) {
    return String(str ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;");
  },

  /* Toast notifikasi respon input */
  toast(pesan, tipe = "sukses") {
    const warna = {
      sukses: "bg-brand-green",
      error: "bg-red-500",
      info: "bg-brand-purple",
    }[tipe] || "bg-slate-800";

    const ikon = {
      sukses: '<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"/></svg>',
      error: '<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>',
      info: '<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"/></svg>',
    }[tipe] || "";

    let container = document.getElementById("toast-container");
    if (!container) {
      container = document.createElement("div");
      container.id = "toast-container";
      container.className = "pointer-events-none fixed inset-x-0 bottom-6 z-[999] flex flex-col items-center gap-2 px-4";
      document.body.appendChild(container);
    }

    const el = document.createElement("div");
    el.className = `pointer-events-auto flex w-full max-w-sm items-center gap-3 rounded-2xl ${warna} px-4 py-3 text-sm font-medium text-white shadow-lg transition-all duration-300 translate-y-4 opacity-0`;
    el.innerHTML = `${ikon}<span>${this.escapeHtml(pesan)}</span>`;
    container.appendChild(el);

    requestAnimationFrame(() => {
      el.classList.remove("translate-y-4", "opacity-0");
    });

    setTimeout(() => {
      el.classList.add("translate-y-4", "opacity-0");
      setTimeout(() => el.remove(), 300);
    }, 2800);
  },

  /* Drawer/sidebar: toggle berdasarkan id */
  toggleDrawer(id) {
    const drawer = document.getElementById(id);
    if (!drawer) return;
    const overlay = document.getElementById(id + "-overlay");
    const terbuka = !drawer.classList.contains("translate-x-0");
    drawer.classList.toggle("translate-x-0", terbuka);
    drawer.classList.toggle("-translate-x-full", !terbuka);
    if (overlay) overlay.classList.toggle("hidden", !terbuka);
    document.body.classList.toggle("overflow-hidden", terbuka);
  },

  closeDrawer(id) {
    const drawer = document.getElementById(id);
    if (!drawer) return;
    const overlay = document.getElementById(id + "-overlay");
    drawer.classList.add("-translate-x-full");
    drawer.classList.remove("translate-x-0");
    if (overlay) overlay.classList.add("hidden");
    document.body.classList.remove("overflow-hidden");
  },

  /* Avatar inisial (placeholder pengganti foto) */
  avatarHtml(nama, jenis = "l", ukuran = "h-12 w-12") {
    const inisial = nama.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase();
    const gradient =
      jenis === "p"
        ? "from-brand-purple to-fuchsia-400"
        : "from-brand-green to-emerald-400";
    return `<div class="${ukuran} flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${gradient} text-sm font-bold text-white">${this.escapeHtml(inisial)}</div>`;
  },

  persen(target, terkumpul) {
    return Math.min(100, Math.round((terkumpul / target) * 100));
  },

  /* Kartu rekomendasi anak (untuk grid beranda & katalog) */
  kartuAnak(anak) {
    const terkumpul = Store.getTerkumpul(anak);
    const pct = this.persen(anak.target, terkumpul);
    return `
      <a href="detail-anak.html?id=${anak.id}" class="card group block w-full overflow-hidden p-0 text-left transition hover:-translate-y-0.5 hover:shadow-md">
        <div class="relative flex h-28 items-center justify-center bg-gradient-to-br from-brand-green/10 to-brand-purple/10">
          ${this.avatarHtml(anak.nama, anak.jenis, "h-16 w-16 text-xl")}
          <span class="absolute right-2 top-2 rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-semibold text-brand-purple shadow-sm">${this.escapeHtml(anak.provinsi)}</span>
        </div>
        <div class="space-y-2 p-3">
          <div class="flex items-center justify-between">
            <h3 class="truncate text-sm font-bold">${this.escapeHtml(anak.nama)}</h3>
            <span class="shrink-0 text-[10px] font-medium text-slate-400">${anak.umur} th</span>
          </div>
          <p class="text-xs text-slate-500">Terkumpul <span class="font-semibold text-brand-green">${this.formatRupiah(terkumpul)}</span> dari ${this.formatRupiah(anak.target)}</p>
          <div class="progress-track"><div class="progress-fill" style="width:${pct}%"></div></div>
          <div class="flex items-center justify-between text-[10px] text-slate-400">
            <span>${pct}% tercapai</span>
            <span>${anak.jumlahDonatur} donatur</span>
          </div>
        </div>
      </a>`;
  },
};
