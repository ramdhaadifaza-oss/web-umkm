import { ArrowRight, MapPin, Eye } from 'lucide-react';
import { useState } from 'react';
import { formatRupiah, type UmkmProduct } from '../data/sukoharjoUmkm';

interface HeroSectionProps {
  featuredProducts: UmkmProduct[];
  onSelectProduct: (product: UmkmProduct) => void;
  onFocusOnMap: (product: UmkmProduct) => void;
}

export function HeroSection({
  featuredProducts,
  onSelectProduct,
  onFocusOnMap,
}: HeroSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeProduct = featuredProducts[activeIndex] ?? featuredProducts[0];
  const nextProduct =
    featuredProducts[(activeIndex + 1) % featuredProducts.length] ?? featuredProducts[0];

  const handleCycleNext = () => {
    setActiveIndex((prev) => (prev + 1) % featuredProducts.length);
  };

  return (
    <section
      id="beranda"
      className="relative overflow-hidden bg-gradient-to-br from-[#004AE0] via-[#003EB8] to-[#002E8A] text-white"
    >
      {/* Subtle geometric diagonal ribbon inspired by modern editorial storefronts */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-12 -right-24 w-[520px] h-16 rotate-[16deg] bg-white/[0.06] border-y border-white/10 hidden lg:flex items-center justify-center tracking-[0.28em] text-xs font-semibold text-white/35"
      >
        SUKOHARJO · KULINER UMKM · LOKAL
      </div>

      <div className="max-w-[1200px] mx-auto px-6 pt-12 pb-16 lg:pt-16 lg:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Typography, Primary CTA with thumbnail, and Stacked Preview */}
          <div className="lg:col-span-6 flex flex-col items-start">
            <p className="text-xs font-medium tracking-wide text-blue-200 mb-3">
              Kabupaten Sukoharjo · 12 Kecamatan · Sentra Kuliner & Jamu
            </p>

            <h1
              className="font-display font-bold tracking-tight text-white leading-[1.08] mb-4 text-balance"
              style={{ fontSize: 'clamp(2.35rem, 4.2vw, 3.75rem)' }}
            >
              Jelajah Rasa UMKM Sukoharjo
            </h1>

            <p className="text-base text-blue-100/90 leading-relaxed max-w-lg mb-7">
              Temukan hidangan legendaris, racikan jamu Kampung Nguter, hingga oleh-oleh
              khas langsung dari dapur pelaku usaha Sukoharjo dalam satu katalog dan peta
              interaktif.
            </p>

            {/* Primary CTA pill with mini food thumbnail + secondary map link */}
            <div className="flex flex-wrap items-center gap-5 mb-10">
              <a
                href="#katalog"
                className="inline-flex items-center gap-3 pl-2 pr-5 py-2 rounded-full bg-white text-[#003399] text-sm font-semibold shadow-lg shadow-blue-950/25 hover:bg-blue-50 transition-all duration-150 whitespace-nowrap shrink-0"
              >
                <span className="w-7 h-7 rounded-full overflow-hidden bg-blue-100 shrink-0">
                  <img
                    src={activeProduct.image}
                    alt={activeProduct.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </span>
                <span>Jelajahi Katalog</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>

              <a
                href="#peta-umkm"
                className="inline-flex items-center gap-2 text-sm font-medium text-blue-100 hover:text-white transition-colors whitespace-nowrap shrink-0 underline-offset-4 hover:underline"
              >
                <MapPin className="w-4 h-4" aria-hidden="true" />
                <span>Buka Peta Sebaran</span>
              </a>
            </div>

            {/* Bottom-left stacked interactive preview card */}
            <div className="relative pt-2">
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={handleCycleNext}
                  aria-label={`Lihat sorotan berikutnya: ${nextProduct.name}`}
                  className="group relative w-44 h-28 text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-2xl"
                >
                  {/* Back layered card */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 translate-y-2 translate-x-2 rotate-[3deg] rounded-2xl bg-blue-950/60 border border-white/20 overflow-hidden"
                  />
                  {/* Front card */}
                  <div className="relative w-full h-full rounded-2xl overflow-hidden border border-white/30 bg-slate-900 shadow-xl">
                    <img
                      src={nextProduct.image}
                      alt={nextProduct.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="w-9 h-9 rounded-full bg-white/95 text-[#003399] flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                        <Eye className="w-4 h-4" aria-hidden="true" />
                      </span>
                    </div>
                    <span className="absolute bottom-2 left-3 right-3 text-[11px] font-medium text-white truncate">
                      Berikutnya: {nextProduct.kecamatan}
                    </span>
                  </div>
                </button>

                <div className="hidden sm:block max-w-[200px]">
                  <p className="text-xs font-semibold text-white">Sorotan Kecamatan</p>
                  <p className="text-xs text-blue-100/80 mt-0.5 leading-relaxed">
                    Klik kartu pratinjau untuk mengganti sajian unggulan atau jelajahi etalase
                    di bawah.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Showcase Card + Pagination Dots */}
          <div className="lg:col-span-6 flex flex-col items-center">
            <div className="relative w-full max-w-[520px]">
              <div className="relative aspect-[4/3] w-full rounded-[24px] overflow-hidden border border-white/20 bg-blue-950/40 shadow-2xl shadow-blue-950/40">
                <img
                  src={activeProduct.image}
                  alt={`${activeProduct.name} — ${activeProduct.umkmName}`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-all duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent" />

                <div className="absolute bottom-0 inset-x-0 p-5 sm:p-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-xs text-blue-200 font-medium truncate">
                      {activeProduct.kecamatan} · {activeProduct.category}
                    </p>
                    <h2 className="font-display text-xl sm:text-2xl font-bold text-white truncate mt-0.5">
                      {activeProduct.name}
                    </h2>
                    <p className="text-sm text-slate-200 truncate">
                      {activeProduct.umkmName} ·{' '}
                      <span className="font-mono tabular-nums font-semibold text-white">
                        {formatRupiah(activeProduct.price)}
                      </span>
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => onSelectProduct(activeProduct)}
                      className="px-3.5 py-2 rounded-xl bg-white text-[#003399] text-xs font-semibold hover:bg-blue-50 transition-colors cursor-pointer whitespace-nowrap"
                    >
                      Detail Produk
                    </button>
                    <button
                      type="button"
                      onClick={() => onFocusOnMap(activeProduct)}
                      className="px-3.5 py-2 rounded-xl bg-white/15 text-white border border-white/25 text-xs font-semibold hover:bg-white/25 transition-colors cursor-pointer whitespace-nowrap"
                    >
                      Peta
                    </button>
                  </div>
                </div>
              </div>

              {/* Pagination dots inspired by Image 2 */}
              <div
                className="flex items-center justify-center gap-2 mt-5"
                role="tablist"
                aria-label="Pilih sorotan produk utama"
              >
                {featuredProducts.map((item, idx) => {
                  const isActive = idx === activeIndex;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      aria-label={`Tampilkan ${item.name}`}
                      onClick={() => setActiveIndex(idx)}
                      className={`h-2 rounded-full transition-all duration-200 cursor-pointer ${
                        isActive ? 'w-7 bg-white' : 'w-2 bg-white/40 hover:bg-white/70'
                      }`}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Marquee Strip */}
      <div className="border-t border-white/15 bg-[#003399]/80 py-3 overflow-hidden">
        <div className="flex w-max animate-marquee whitespace-nowrap text-xs font-semibold tracking-[0.2em] text-blue-100/85">
          <span className="px-6">NASI LIWET KARTASURA</span>
          <span aria-hidden="true">·</span>
          <span className="px-6">KAMPUNG JAMU NGUTER</span>
          <span aria-hidden="true">·</span>
          <span className="px-6">BAKMI JAWA GROGOL</span>
          <span aria-hidden="true">·</span>
          <span className="px-6">JENANG KRASIKAN MOJOLABAN</span>
          <span aria-hidden="true">·</span>
          <span className="px-6">SATE BUNTEL BENDOSARI</span>
          <span aria-hidden="true">·</span>
          <span className="px-6">INTIP GORENG BAKI</span>
          <span aria-hidden="true">·</span>
          <span className="px-6">NASI LIWET KARTASURA</span>
          <span aria-hidden="true">·</span>
          <span className="px-6">KAMPUNG JAMU NGUTER</span>
          <span aria-hidden="true">·</span>
          <span className="px-6">BAKMI JAWA GROGOL</span>
          <span aria-hidden="true">·</span>
          <span className="px-6">JENANG KRASIKAN MOJOLABAN</span>
          <span aria-hidden="true">·</span>
          <span className="px-6">SATE BUNTEL BENDOSARI</span>
          <span aria-hidden="true">·</span>
          <span className="px-6">INTIP GORENG BAKI</span>
        </div>
      </div>
    </section>
  );
}
