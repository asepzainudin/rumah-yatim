/* Konfigurasi warna & font Smart Yatim untuk Tailwind Play CDN (lokal) */
if (window.tailwind) {
  tailwind.config = {
    theme: {
      extend: {
        colors: {
          "brand-green": "#28a745",
          "brand-green-dark": "#1f8a38",
          "brand-green-light": "#e7f7eb",
          "brand-purple": "#7b1fa2",
          "brand-purple-dark": "#611886",
          "brand-purple-light": "#f3e8fb",
          "brand-gray": "#f8f9fa",
        },
        fontFamily: {
          sans: ['"Plus Jakarta Sans"', "ui-sans-serif", "system-ui", "sans-serif"],
        },
      },
    },
  };
}
