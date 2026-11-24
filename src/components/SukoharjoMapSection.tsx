import {
  Check,
  Clock,
  Compass,
  Copy,
  MapPin,
  Minus,
  Phone,
  Plus,
  RotateCcw,
  ShoppingBag,
} from 'lucide-react';
import { useRef, useState } from 'react';
import {
  SUKOHARJO_DISTRICTS,
  formatRupiah,
  type UmkmProduct,
} from '../data/sukoharjoUmkm';

interface SukoharjoMapSectionProps {
  products: UmkmProduct[];
  selectedProduct: UmkmProduct;
  onSelectProduct: (product: UmkmProduct) => void;
  onOpenDetail: (product: UmkmProduct) => void;
  onAddToCart: (product: UmkmProduct) => void;
}

export function SukoharjoMapSection({
  products,
  selectedProduct,
  onSelectProduct,
  onOpenDetail,
  onAddToCart,
}: SukoharjoMapSectionProps) {
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [hoveredDistrict, setHoveredDistrict] = useState<string | null>(null);

  const dragStateRef = useRef<{
    active: boolean;
    startX: number;
    startY: number;
    origX: number;
    origY: number;
  }>({
    active: false,
    startX: 0,
    startY: 0,
    origX: 0,
    origY: 0,
  });

  const handleZoomIn = () => setZoom((z) => Math.min(Number((z + 0.25).toFixed(2)), 2));
  const handleZoomOut = () => setZoom((z) => Math.max(Number((z - 0.25).toFixed(2)), 0.85));
  const handleResetView = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  const handleCopyCoords = async (product: UmkmProduct) => {
    const coords = `${product.lat.toFixed(4)}, ${product.lng.toFixed(4)}`;
    try {
      await navigator.clipboard.writeText(coords);
      setCopiedId(product.id);
      window.setTimeout(() => setCopiedId(null), 1600);
    } catch {
      setCopiedId(product.id);
      window.setTimeout(() => setCopiedId(null), 1600);
    }
  };

  const activeDistrictInfo = SUKOHARJO_DISTRICTS.find(
    (d) =>
      d.name.toLowerCase() === (hoveredDistrict ?? selectedProduct.kecamatan).toLowerCase()
  );

  return (
    <section id="peta-umkm" className="bg-white border-t border-slate-200 py-16 lg:py-20">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <p className="text-xs font-medium text-[#0044BD] mb-2">
              Peta Sebaran Interaktif · 12 Kecamatan Kabupaten Sukoharjo
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 text-balance">
              Peta Lokasi UMKM Kuliner Sukoharjo
            </h2>
          </div>

          <p className="text-sm text-slate-600 max-w-md">
            Pilih titik pin di peta atau geser kanvas untuk menelusuri sentra kuliner dari
            Kartasura hingga Kampung Jamu Nguter.
          </p>
        </div>

        {/* Map + Inspector Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left: Interactive Vector Cartography Map of Kabupaten Sukoharjo */}
          <div className="lg:col-span-7 relative rounded-[24px] border border-slate-200 bg-[#EEF3FB] overflow-hidden min-h-[460px] lg:min-h-[540px] flex flex-col">
            {/* Map Top Floating Control Bar */}
            <div className="relative z-10 flex items-center justify-between gap-3 px-4 py-3 bg-white/90 backdrop-blur-sm border-b border-slate-200/80">
              <div className="flex items-center gap-2 min-w-0">
                <Compass className="w-4 h-4 text-[#0044BD] shrink-0" aria-hidden="true" />
                <span className="text-xs font-semibold text-slate-900 truncate">
                  {activeDistrictInfo
                    ? `Kec. ${activeDistrictInfo.name} · ${activeDistrictInfo.highlight}`
                    : 'Peta Wilayah Kabupaten Sukoharjo'}
                </span>
              </div>

              <div className="flex items-center gap-1 shrink-0">
                <button
                  type="button"
                  onClick={handleZoomOut}
                  aria-label="Perkecil peta"
                  className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 flex items-center justify-center cursor-pointer transition-colors"
                >
                  <Minus className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
                <span className="font-mono tabular-nums text-[11px] font-medium text-slate-600 w-11 text-center">
                  {Math.round(zoom * 100)}%
                </span>
                <button
                  type="button"
                  onClick={handleZoomIn}
                  aria-label="Perbesar peta"
                  className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 flex items-center justify-center cursor-pointer transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={handleResetView}
                  aria-label="Reset posisi peta"
                  className="ml-1 px-2.5 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium inline-flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <RotateCcw className="w-3 h-3" aria-hidden="true" />
                  <span>Reset</span>
                </button>
              </div>
            </div>

            {/* Pan & Zoom Interactive SVG Map Stage */}
            <div
              className="relative flex-1 overflow-hidden cursor-grab active:cursor-grabbing select-none"
              onPointerDown={(e) => {
                if ((e.target as HTMLElement).closest('button')) return;
                dragStateRef.current = {
                  active: true,
                  startX: e.clientX,
                  startY: e.clientY,
                  origX: pan.x,
                  origY: pan.y,
                };
                (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
              }}
              onPointerMove={(e) => {
                if (!dragStateRef.current.active) return;
                const dx = e.clientX - dragStateRef.current.startX;
                const dy = e.clientY - dragStateRef.current.startY;
                setPan({
                  x: Math.max(-180, Math.min(180, dragStateRef.current.origX + dx)),
                  y: Math.max(-150, Math.min(150, dragStateRef.current.origY + dy)),
                });
              }}
              onPointerUp={() => {
                dragStateRef.current.active = false;
              }}
              onPointerCancel={() => {
                dragStateRef.current.active = false;
              }}
            >
              <div
                className="w-full h-full transition-transform duration-150 ease-out"
                style={{
                  transform: `translate3d(${pan.x}px, ${pan.y}px, 0) scale(${zoom})`,
                  transformOrigin: 'center center',
                }}
              >
                <svg
                  viewBox="0 0 1000 760"
                  className="w-full h-full min-h-[420px]"
                  role="img"
                  aria-label="Peta interaktif 12 kecamatan Kabupaten Sukoharjo"
                >
                  {/* Background cartographic grid */}
                  <defs>
                    <pattern
                      id="map-grid"
                      width="40"
                      height="40"
                      patternUnits="userSpaceOnUse"
                    >
                      <path
                        d="M 40 0 L 0 0 0 40"
                        fill="none"
                        stroke="#CBD5E1"
                        strokeWidth="0.6"
                        strokeOpacity="0.55"
                      />
                    </pattern>
                  </defs>
                  <rect width="1000" height="760" fill="url(#map-grid)" />

                  {/* Neighboring region labels for geographic orientation */}
                  <text
                    x="430"
                    y="75"
                    textAnchor="middle"
                    className="fill-slate-400 text-[13px] font-semibold tracking-widest"
                  >
                    KOTA SURAKARTA (SOLO)
                  </text>
                  <text
                    x="80"
                    y="410"
                    textAnchor="middle"
                    transform="rotate(-90 80 410)"
                    className="fill-slate-400 text-[12px] font-semibold tracking-widest"
                  >
                    KLATEN
                  </text>
                  <text
                    x="915"
                    y="380"
                    textAnchor="middle"
                    transform="rotate(90 915 380)"
                    className="fill-slate-400 text-[12px] font-semibold tracking-widest"
                  >
                    KARANGANYAR
                  </text>
                  <text
                    x="510"
                    y="740"
                    textAnchor="middle"
                    className="fill-slate-400 text-[12px] font-semibold tracking-widest"
                  >
                    WONOGIRI & GUNUNGKIDUL
                  </text>

                  {/* 12 Kecamatan Polygons */}
                  {SUKOHARJO_DISTRICTS.map((district) => {
                    const isSelectedDistrict =
                      selectedProduct.kecamatan.toLowerCase() === district.name.toLowerCase();
                    const isHovered = hoveredDistrict === district.name;

                    return (
                      <g
                        key={district.id}
                        onMouseEnter={() => setHoveredDistrict(district.name)}
                        onMouseLeave={() => setHoveredDistrict(null)}
                        onClick={() => {
                          const match = products.find(
                            (p) => p.kecamatan.toLowerCase() === district.name.toLowerCase()
                          );
                          if (match) onSelectProduct(match);
                        }}
                        className="cursor-pointer"
                      >
                        <path
                          d={district.path}
                          fill={
                            isSelectedDistrict
                              ? '#DBEAFE'
                              : isHovered
                              ? '#E2E8F0'
                              : '#FFFFFF'
                          }
                          stroke={isSelectedDistrict ? '#0044BD' : '#94A3B8'}
                          strokeWidth={isSelectedDistrict ? 2.4 : 1.2}
                          strokeLinejoin="round"
                          className="transition-colors duration-150"
                        />
                        <text
                          x={district.centerX}
                          y={district.centerY + 28}
                          textAnchor="middle"
                          className={`text-[12px] font-semibold pointer-events-none select-none ${
                            isSelectedDistrict ? 'fill-[#003594]' : 'fill-slate-600'
                          }`}
                        >
                          {district.name}
                        </text>
                      </g>
                    );
                  })}

                  {/* Bengawan Solo River Path */}
                  <path
                    d="M490,95 C520,175 540,260 565,335 C585,395 570,480 595,620"
                    fill="none"
                    stroke="#60A5FA"
                    strokeWidth="5"
                    strokeOpacity="0.55"
                    strokeLinecap="round"
                  />
                  <text
                    x="558"
                    y="120"
                    className="fill-blue-600/75 text-[10px] font-medium italic"
                  >
                    Sungai Bengawan Solo
                  </text>

                  {/* Main Arterial Roads: Kartasura - Solo Baru - Sukoharjo - Nguter */}
                  <path
                    d="M270,165 L430,225 L485,365 L555,515"
                    fill="none"
                    stroke="#F59E0B"
                    strokeWidth="2.5"
                    strokeDasharray="6 4"
                    strokeOpacity="0.8"
                  />
                  <path
                    d="M270,165 L325,265 L485,365 L645,365"
                    fill="none"
                    stroke="#94A3B8"
                    strokeWidth="1.6"
                    strokeDasharray="4 4"
                  />

                  {/* UMKM Marker Pins */}
                  {products.map((item) => {
                    const isActive = item.id === selectedProduct.id;
                    return (
                      <g
                        key={item.id}
                        transform={`translate(${item.mapX}, ${item.mapY})`}
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectProduct(item);
                        }}
                        className="cursor-pointer"
                        role="button"
                        tabIndex={0}
                        aria-label={`Pilih lokasi ${item.umkmName} di ${item.kecamatan}`}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            onSelectProduct(item);
                          }
                        }}
                      >
                        {isActive && (
                          <circle
                            r="24"
                            fill="#0044BD"
                            fillOpacity="0.18"
                            stroke="#0044BD"
                            strokeWidth="1.5"
                          />
                        )}
                        <circle
                          r={isActive ? 13 : 10}
                          fill={isActive ? '#0044BD' : '#0F172A'}
                          stroke="#FFFFFF"
                          strokeWidth="2.5"
                        />
                        <circle r={isActive ? 4 : 3} fill="#FFFFFF" />

                        {/* Pin Label */}
                        <g transform="translate(0, -20)">
                          <rect
                            x="-74"
                            y="-20"
                            width="148"
                            height="22"
                            rx="6"
                            fill={isActive ? '#0044BD' : '#0F172A'}
                            fillOpacity={isActive ? 0.96 : 0.85}
                          />
                          <text
                            y="-6"
                            textAnchor="middle"
                            className="fill-white text-[10px] font-semibold"
                          >
                            {item.umkmName.length > 22
                              ? `${item.umkmName.slice(0, 21)}…`
                              : item.umkmName}
                          </text>
                        </g>
                      </g>
                    );
                  })}
                </svg>
              </div>
            </div>

            {/* Map Footer Legend */}
            <div className="relative z-10 px-4 py-2.5 bg-white/90 border-t border-slate-200/80 flex flex-wrap items-center justify-between gap-4 text-[11px] text-slate-600">
              <div className="flex items-center gap-4">
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#0044BD]" aria-hidden="true" />
                  <span>UMKM Dipilih</span>
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-900" aria-hidden="true" />
                  <span>Lokasi UMKM Lainnya</span>
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-4 h-0.5 bg-amber-500" aria-hidden="true" />
                  <span>Jalur Utama Solo–Wonogiri</span>
                </span>
              </div>
              <span className="font-mono tabular-nums text-slate-500">
                {products.length} Titik Kuliner
              </span>
            </div>
          </div>

          {/* Right: Selected UMKM Location Inspector Card */}
          <div className="lg:col-span-5 bg-slate-50 border border-slate-200 rounded-[24px] p-5 sm:p-6 flex flex-col justify-between gap-5">
            <div>
              {/* Quick Pin Selector Strip */}
              <div className="mb-4">
                <label
                  htmlFor="umkm-map-select"
                  className="block text-xs font-semibold text-slate-600 mb-1.5"
                >
                  Pilih Titik Lokasi UMKM
                </label>
                <select
                  id="umkm-map-select"
                  value={selectedProduct.id}
                  onChange={(e) => {
                    const found = products.find((p) => p.id === e.target.value);
                    if (found) onSelectProduct(found);
                  }}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 cursor-pointer"
                >
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>
                      Kec. {p.kecamatan} — {p.umkmName}
                    </option>
                  ))}
                </select>
              </div>

              {/* Selected UMKM Photo */}
              <div className="aspect-[4/3] w-full rounded-2xl overflow-hidden bg-slate-200 mb-4 border border-slate-200">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Unboxed Metadata */}
              <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                <span className="font-semibold text-[#0044BD]">
                  Kec. {selectedProduct.kecamatan}
                </span>
                <span aria-hidden="true">·</span>
                <span>{selectedProduct.category}</span>
                <span aria-hidden="true">·</span>
                <span className="tabular-nums">★ {selectedProduct.rating}</span>
              </div>

              <h3 className="font-display text-xl font-bold text-slate-900 mb-1">
                {selectedProduct.umkmName}
              </h3>
              <p className="text-sm font-medium text-slate-700 mb-3">
                Menu Unggulan: {selectedProduct.name} ·{' '}
                <span className="font-mono tabular-nums font-bold text-slate-900">
                  {formatRupiah(selectedProduct.price)}
                </span>
              </p>

              <div className="space-y-2.5 text-sm text-slate-600 border-t border-slate-200 pt-4">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#0044BD] shrink-0 mt-0.5" aria-hidden="true" />
                  <span>{selectedProduct.address}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-slate-500 shrink-0" aria-hidden="true" />
                  <span className="tabular-nums">{selectedProduct.hours}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-slate-500 shrink-0" aria-hidden="true" />
                  <span className="font-mono tabular-nums text-xs">{selectedProduct.phone}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-slate-200 flex flex-col gap-2.5">
              <div className="flex items-center justify-between gap-2 text-xs text-slate-500 bg-white px-3.5 py-2.5 rounded-xl border border-slate-200">
                <span className="font-mono tabular-nums">
                  {selectedProduct.lat.toFixed(4)}, {selectedProduct.lng.toFixed(4)}
                </span>
                <button
                  type="button"
                  onClick={() => handleCopyCoords(selectedProduct)}
                  className="inline-flex items-center gap-1 font-semibold text-[#0044BD] hover:underline cursor-pointer"
                >
                  {copiedId === selectedProduct.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" aria-hidden="true" />
                      <span className="text-emerald-700">Disalin</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Salin Koordinat</span>
                    </>
                  )}
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => onOpenDetail(selectedProduct)}
                  className="px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-800 text-xs font-semibold hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  Lihat Detail
                </button>
                <button
                  type="button"
                  onClick={() => onAddToCart(selectedProduct)}
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#0044BD] text-white text-xs font-semibold hover:bg-[#003594] transition-colors cursor-pointer"
                >
                  <ShoppingBag className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Tambah Pesanan</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
