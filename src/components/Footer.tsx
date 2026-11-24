export function Footer() {
  return (
    <footer className="bg-[#07090F] text-slate-300 border-t border-white/10">
      <div className="max-w-[1200px] mx-auto px-6 py-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div>
          <p className="font-display text-lg font-bold text-white mb-1">
            LokaRasa Sukoharjo
          </p>
          <p className="text-xs text-slate-400 max-w-md leading-relaxed">
            Direktori digital katalog produk kuliner dan peta sebaran pelaku UMKM
            Kabupaten Sukoharjo, Jawa Tengah.
          </p>
        </div>

        <nav className="flex flex-wrap items-center gap-6 text-xs font-medium text-slate-300">
          <a href="#beranda" className="hover:text-white transition-colors">
            Beranda
          </a>
          <a href="#etalase" className="hover:text-white transition-colors">
            Etalase
          </a>
          <a href="#katalog" className="hover:text-white transition-colors">
            Katalog UMKM
          </a>
          <a href="#peta-umkm" className="hover:text-white transition-colors">
            Peta Sukoharjo
          </a>
          <a href="#testimoni-umkm" className="hover:text-white transition-colors">
            Testimoni
          </a>
        </nav>

        <p className="text-xs text-slate-500">
          © {new Date().getFullYear()} LokaRasa Sukoharjo
        </p>
      </div>
    </footer>
  );
}
