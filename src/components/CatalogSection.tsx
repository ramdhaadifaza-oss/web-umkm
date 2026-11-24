import { MapPin, Plus, Search, RotateCcw, Utensils } from 'lucide-react';
import { useState } from 'react';
import {
  FOOD_THEMES,
  formatRupiah,
  type FoodCategory,
  type FoodThemeId,
  type UmkmProduct,
} from '../data/sukoharjoUmkm';

interface CatalogSectionProps {
  products: UmkmProduct[];
  activeCategory: FoodCategory;
  onChangeCategory: (category: FoodCategory) => void;
  activeTheme: FoodThemeId;
  onClearTheme: () => void;
  activeKecamatan: string;
  onChangeKecamatan: (kecamatan: string) => void;
  searchQuery: string;
  onChangeSearch: (query: string) => void;
  onSelectProduct: (product: UmkmProduct) => void;
  onFocusOnMap: (product: UmkmProduct) => void;
  onAddToCart: (product: UmkmProduct) => void;
}

const CATEGORIES: FoodCategory[] = [
  'Semua',
  'Makanan Berat',
  'Jamu & Minuman',
  'Jajanan & Oleh-oleh',
];

export function CatalogSection({
  products,
  activeCategory,
  onChangeCategory,
  activeTheme,
  onClearTheme,
  activeKecamatan,
  onChangeKecamatan,
  searchQuery,
  onChangeSearch,
  onSelectProduct,
  onFocusOnMap,
  onAddToCart,
}: CatalogSectionProps) {
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});
  const [recentlyAddedId, setRecentlyAddedId] = useState<string | null>(null);

  const kecamatanList = Array.from(new Set(products.map((p) => p.kecamatan)));

  const filteredProducts = products.filter((item) => {
    const matchCategory = activeCategory === 'Semua' || item.category === activeCategory;
    const matchTheme = activeTheme === 'all' || item.themeId === activeTheme;
    const matchKecamatan =
      activeKecamatan === 'Semua' || item.kecamatan === activeKecamatan;
    const q = searchQuery.trim().toLowerCase();
    const matchQuery =
      q === '' ||
      item.name.toLowerCase().includes(q) ||
      item.umkmName.toLowerCase().includes(q) ||
      item.kecamatan.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q);

    return matchCategory && matchTheme && matchKecamatan && matchQuery;
  });

  const activeThemeLabel = FOOD_THEMES.find((t) => t.id === activeTheme)?.label;

  const handleAdd = (product: UmkmProduct) => {
    onAddToCart(product);
    setRecentlyAddedId(product.id);
    window.setTimeout(() => {
      setRecentlyAddedId((prev) => (prev === product.id ? null : prev));
    }, 1000);
  };

  const resetAllFilters = () => {
    onChangeCategory('Semua');
    onClearTheme();
    onChangeKecamatan('Semua');
    onChangeSearch('');
  };

  return (
    <section id="katalog" className="bg-slate-50 py-16 lg:py-20">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <p className="text-xs font-medium text-[#0044BD] mb-2">
              Katalog Produk Kuliner · Terverifikasi Lokal
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 text-balance">
              Produk Unggulan UMKM Sukoharjo
            </h2>
          </div>

          <p className="text-sm text-slate-600 tabular-nums">
            Menampilkan <strong className="text-slate-900">{filteredProducts.length}</strong>{' '}
            dari {products.length} produk kuliner
          </p>
        </div>

        {/* Filter Toolbar */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 mb-8 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Interactive Category Segmented Buttons */}
          <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
            {CATEGORIES.map((category) => {
              const isActive = activeCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => onChangeCategory(category)}
                  className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'bg-white text-[#0044BD] shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>

          {/* Search & Kecamatan Select */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative">
              <Search
                className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                aria-hidden="true"
              />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => onChangeSearch(e.target.value)}
                placeholder="Cari menu atau UMKM..."
                aria-label="Cari menu atau nama UMKM"
                className="w-full sm:w-56 pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white"
              />
            </div>

            <select
              value={activeKecamatan}
              onChange={(e) => onChangeKecamatan(e.target.value)}
              aria-label="Filter berdasarkan kecamatan"
              className="px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-blue-600 cursor-pointer"
            >
              <option value="Semua">Semua Kecamatan</option>
              {kecamatanList.map((kec) => (
                <option key={kec} value={kec}>
                  Kec. {kec}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Active Wheel Theme Filter Notice */}
        {activeTheme !== 'all' && activeThemeLabel && (
          <div className="mb-6 flex items-center justify-between gap-4 px-4 py-3 rounded-xl bg-blue-50 border border-blue-200 text-sm text-blue-950">
            <span>
              Filter aktif dari Tema Kuliner: <strong>{activeThemeLabel}</strong>
            </span>
            <button
              type="button"
              onClick={onClearTheme}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0044BD] hover:underline cursor-pointer whitespace-nowrap"
            >
              <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Tampilkan Semua Tema</span>
            </button>
          </div>
        )}

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center">
            <p className="font-display text-lg font-semibold text-slate-900 mb-1">
              Belum ada produk yang cocok
            </p>
            <p className="text-sm text-slate-600 mb-5">
              Coba ubah kata kunci pencarian, kategori, atau pilihan kecamatan Sukoharjo.
            </p>
            <button
              type="button"
              onClick={resetAllFilters}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0044BD] text-white text-xs font-semibold hover:bg-[#003594] transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Reset Semua Filter</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => {
              const isImgFailed = failedImages[product.id];
              const isJustAdded = recentlyAddedId === product.id;

              return (
                <article
                  key={product.id}
                  className="group bg-white border border-slate-200 rounded-2xl overflow-hidden flex flex-col transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-slate-900/5"
                >
                  {/* 4:3 Product Image Slot */}
                  <button
                    type="button"
                    onClick={() => onSelectProduct(product)}
                    className="relative aspect-[4/3] w-full bg-slate-100 overflow-hidden cursor-pointer text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-600"
                  >
                    {isImgFailed ? (
                      <div className="w-full h-full bg-gradient-to-br from-slate-100 to-blue-50 flex flex-col items-center justify-center p-6 text-center">
                        <Utensils className="w-8 h-8 text-blue-600 mb-2" aria-hidden="true" />
                        <span className="text-sm font-semibold text-slate-800">
                          {product.name}
                        </span>
                      </div>
                    ) : (
                      <img
                        src={product.image}
                        alt={`${product.name} oleh ${product.umkmName}`}
                        referrerPolicy="no-referrer"
                        onError={() =>
                          setFailedImages((prev) => ({ ...prev, [product.id]: true }))
                        }
                        className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
                      />
                    )}
                  </button>

                  {/* Card Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between gap-4">
                    <div>
                      {/* Clean Zero-Pill Metadata */}
                      <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1.5 truncate">
                        <span className="font-medium text-slate-700">{product.kecamatan}</span>
                        <span aria-hidden="true">·</span>
                        <span>{product.category}</span>
                        <span aria-hidden="true">·</span>
                        <span className="tabular-nums">★ {product.rating}</span>
                      </div>

                      <h3 className="font-display text-base font-bold text-slate-900 leading-snug mb-1">
                        <button
                          type="button"
                          onClick={() => onSelectProduct(product)}
                          className="text-left hover:text-[#0044BD] transition-colors cursor-pointer"
                        >
                          {product.name}
                        </button>
                      </h3>

                      <p className="text-sm text-slate-600 truncate">{product.umkmName}</p>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <p className="font-mono tabular-nums text-base font-bold text-slate-900">
                          {formatRupiah(product.price)}
                        </p>
                        <p className="text-[11px] text-slate-500 truncate">{product.unit}</p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          type="button"
                          onClick={() => onFocusOnMap(product)}
                          title={`Lihat lokasi ${product.umkmName} di peta`}
                          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:border-blue-600 hover:text-[#0044BD] transition-colors cursor-pointer whitespace-nowrap"
                        >
                          <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>Peta</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleAdd(product)}
                          className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                            isJustAdded
                              ? 'bg-emerald-700 text-white'
                              : 'bg-[#0044BD] text-white hover:bg-[#003594]'
                          }`}
                        >
                          <Plus className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>{isJustAdded ? 'Ditambah' : 'Pesan'}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
