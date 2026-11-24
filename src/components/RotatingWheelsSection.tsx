import { Pause, Play, RotateCcw, MousePointerClick } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import {
  FOOD_THEMES,
  UMKM_PRODUCTS,
  formatRupiah,
  type FoodThemeId,
  type UmkmProduct,
} from '../data/sukoharjoUmkm';
import { FoodThemeIcon } from './FoodThemeIcons';

interface RotatingWheelsSectionProps {
  activeTheme: FoodThemeId;
  onSelectTheme: (themeId: FoodThemeId) => void;
  onSelectProduct: (product: UmkmProduct) => void;
}

interface WheelItemPosition {
  x: number;
  y: number;
  z: number;
  scale: number;
  opacity: number;
  rotateY: number;
  zIndex: number;
}

function computeOrbitalPosition(
  index: number,
  total: number,
  angleDeg: number,
  radiusX: number,
  radiusY: number,
  tiltDeg = 16
): WheelItemPosition {
  const step = 360 / total;
  const rad = ((index * step + angleDeg) * Math.PI) / 180;
  const tiltRad = (tiltDeg * Math.PI) / 180;

  const rawX = Math.sin(rad) * radiusX;
  const rawZ = Math.cos(rad); // -1 (back) .. +1 (front)
  const rawY = -rawZ * radiusY * Math.sin(tiltRad) + Math.sin(rad) * 26;

  const depthNorm = (rawZ + 1) / 2; // 0 (back) .. 1 (front)
  const scale = 0.64 + depthNorm * 0.42;
  const opacity = 0.36 + depthNorm * 0.64;
  const rotateY = -Math.sin(rad) * 26;
  const zIndex = Math.round(depthNorm * 100);

  return {
    x: rawX,
    y: rawY,
    z: rawZ,
    scale,
    opacity,
    rotateY,
    zIndex,
  };
}

export function RotatingWheelsSection({
  activeTheme,
  onSelectTheme,
  onSelectProduct,
}: RotatingWheelsSectionProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [themeAngle, setThemeAngle] = useState(0);
  const [photoAngle, setPhotoAngle] = useState(18);
  const [scrollBoost, setScrollBoost] = useState(0);
  const [hoveredThemeId, setHoveredThemeId] = useState<string | null>(null);
  const [hoveredPhotoId, setHoveredPhotoId] = useState<string | null>(null);

  const dragThemeRef = useRef<{ active: boolean; startX: number; moved: boolean }>({
    active: false,
    startX: 0,
    moved: false,
  });
  const dragPhotoRef = useRef<{ active: boolean; startX: number; moved: boolean }>({
    active: false,
    startX: 0,
    moved: false,
  });
  const lastScrollYRef = useRef(0);
  const boostRef = useRef(0);

  // Respect prefers-reduced-motion
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) {
      setIsPlaying(false);
    }
  }, []);

  // Scroll acceleration (speeds up on scroll just like the ImageWheel spec)
  useEffect(() => {
    lastScrollYRef.current = window.scrollY;
    const onScroll = () => {
      const currentY = window.scrollY;
      const delta = Math.abs(currentY - lastScrollYRef.current);
      lastScrollYRef.current = currentY;
      if (delta > 0) {
        boostRef.current = Math.min(boostRef.current + delta * 0.045, 3.8);
        setScrollBoost(boostRef.current);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Continuous animation loop for both 3D rotating wheels
  useEffect(() => {
    let rafId = 0;
    let lastTime = performance.now();

    const tick = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;

      // Decay scroll boost smoothly
      if (boostRef.current > 0.01) {
        boostRef.current *= Math.pow(0.08, dt);
        setScrollBoost(boostRef.current);
      } else if (boostRef.current !== 0) {
        boostRef.current = 0;
        setScrollBoost(0);
      }

      if (isPlaying) {
        const baseSpeed = 14; // deg/sec
        const effectiveSpeed = baseSpeed * (1 + boostRef.current);

        if (!dragThemeRef.current.active && !hoveredThemeId) {
          setThemeAngle((prev) => (prev + effectiveSpeed * dt) % 360);
        }
        if (!dragPhotoRef.current.active && !hoveredPhotoId) {
          // Rotate product wheel smoothly in counter-harmony
          setPhotoAngle((prev) => (prev - effectiveSpeed * 0.88 * dt + 360) % 360);
        }
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [isPlaying, hoveredThemeId, hoveredPhotoId]);

  // Filter / highlight photo wheel cards based on selected theme
  const photoWheelItems =
    activeTheme === 'all'
      ? UMKM_PRODUCTS
      : (() => {
          const matched = UMKM_PRODUCTS.filter((p) => p.themeId === activeTheme);
          // Repeat matched items so the 3D orbital ring stays rich and balanced
          if (matched.length === 0) return UMKM_PRODUCTS;
          const ring: UmkmProduct[] = [];
          while (ring.length < 6) {
            ring.push(...matched);
          }
          return ring.slice(0, 6);
        })();

  const activeThemeObj = FOOD_THEMES.find((t) => t.id === activeTheme);

  // Determine frontmost photo card for live caption
  const frontPhoto = photoWheelItems.reduce<{ item: UmkmProduct; z: number }>(
    (best, item, idx) => {
      const pos = computeOrbitalPosition(idx, photoWheelItems.length, photoAngle, 185, 115, 22);
      return pos.z > best.z ? { item, z: pos.z } : best;
    },
    { item: photoWheelItems[0], z: -2 }
  ).item;

  return (
    <section id="etalase" className="bg-[#07090F] text-white py-16 lg:py-20 border-y border-white/10">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <p className="text-xs font-medium text-blue-400 mb-2">
              Eksplorasi 3D Interaktif · Seret untuk menggeser & gulir untuk mempercepat
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white text-balance">
              Etalase Ikon Tema Makanan & Foto Produk Makanan
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            {activeTheme !== 'all' && (
              <button
                type="button"
                onClick={() => onSelectTheme('all')}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-blue-600/20 border border-blue-400/40 text-xs font-medium text-blue-200 hover:bg-blue-600/35 transition-colors cursor-pointer whitespace-nowrap"
              >
                <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Reset Tema ({activeThemeObj?.label})</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => setIsPlaying((prev) => !prev)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 border border-white/15 text-xs font-medium text-white hover:bg-white/15 transition-colors cursor-pointer whitespace-nowrap"
            >
              {isPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Jeda Putaran</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Putar Etalase</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Dual 3D Rotating Wheels Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* WHEEL 1: Ikon Tema Makanan */}
          <div className="rounded-[24px] bg-[#0C101B] border border-white/10 p-6 flex flex-col justify-between">
            <div className="flex items-start justify-between gap-4 mb-2">
              <div>
                <h3 className="font-display text-lg font-semibold text-white">
                  Ikon Tema Makanan
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Klik ikon tema untuk menyaring foto produk makanan & katalog Sukoharjo
                </p>
              </div>
              <span className="font-mono tabular-nums text-[11px] text-slate-400 whitespace-nowrap">
                {FOOD_THEMES.length} Tema
              </span>
            </div>

            {/* 3D Ring for Food Theme Icons */}
            <div
              role="region"
              aria-label="Ikon tema makanan dapat diseret"
              className="relative h-[320px] sm:h-[350px] w-full overflow-hidden select-none cursor-grab active:cursor-grabbing flex items-center justify-center"
              style={{ perspective: '1000px' }}
              onPointerDown={(e) => {
                dragThemeRef.current = { active: true, startX: e.clientX, moved: false };
                (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
              }}
              onPointerMove={(e) => {
                if (!dragThemeRef.current.active) return;
                const dx = e.clientX - dragThemeRef.current.startX;
                if (Math.abs(dx) > 4) dragThemeRef.current.moved = true;
                dragThemeRef.current.startX = e.clientX;
                setThemeAngle((prev) => (prev + dx * 0.45 + 360) % 360);
              }}
              onPointerUp={() => {
                dragThemeRef.current.active = false;
              }}
              onPointerCancel={() => {
                dragThemeRef.current.active = false;
              }}
            >
              {/* Subtle orbital track ellipse */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute w-[360px] h-[140px] rounded-full border border-white/[0.06] rotate-[-8deg]"
              />

              {FOOD_THEMES.map((theme, idx) => {
                const pos = computeOrbitalPosition(
                  idx,
                  FOOD_THEMES.length,
                  themeAngle,
                  168,
                  105,
                  24
                );
                const isSelected = activeTheme === theme.id;

                return (
                  <button
                    key={theme.id}
                    type="button"
                    onMouseEnter={() => setHoveredThemeId(theme.id)}
                    onMouseLeave={() => setHoveredThemeId(null)}
                    onClick={() => {
                      if (dragThemeRef.current.moved) return;
                      onSelectTheme(isSelected ? 'all' : theme.id);
                    }}
                    style={{
                      transform: `translate3d(${pos.x}px, ${pos.y}px, 0) scale(${pos.scale}) rotateY(${pos.rotateY}deg)`,
                      opacity: pos.opacity,
                      zIndex: pos.zIndex,
                    }}
                    className={`absolute w-[112px] h-[126px] rounded-[20px] p-3 flex flex-col items-center justify-center gap-2 transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 ${
                      isSelected
                        ? 'bg-blue-600/35 border-2 border-blue-400 shadow-lg shadow-blue-500/25'
                        : 'bg-[#141B2D]/95 border border-white/15 hover:border-white/40 shadow-xl shadow-black/50'
                    }`}
                  >
                    <FoodThemeIcon themeId={theme.id} className="w-11 h-11" />
                    <span className="text-[11px] font-semibold text-white text-center leading-tight line-clamp-2">
                      {theme.label}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-4 text-xs text-slate-400">
              <span className="truncate">
                {activeThemeObj
                  ? `Tema aktif: ${activeThemeObj.label} — ${activeThemeObj.subtitle}`
                  : 'Semua tema kuliner Sukoharjo aktif'}
              </span>
              <span className="inline-flex items-center gap-1 text-blue-300 whitespace-nowrap shrink-0">
                <MousePointerClick className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Seret / Klik</span>
              </span>
            </div>
          </div>

          {/* WHEEL 2: Foto Produk Makanan */}
          <div className="rounded-[24px] bg-[#0C101B] border border-white/10 p-6 flex flex-col justify-between">
            <div className="flex items-start justify-between gap-4 mb-2">
              <div>
                <h3 className="font-display text-lg font-semibold text-white">
                  Foto Produk Makanan
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Galeri foto produk makanan UMKM Sukoharjo · Klik foto untuk detail & lokasi
                </p>
              </div>
              <span className="font-mono tabular-nums text-[11px] text-slate-400 whitespace-nowrap">
                {scrollBoost > 0.25 ? 'Kecepatan +' : 'Putaran Halus'}
              </span>
            </div>

            {/* 3D Ring for Generated Food Product Photos */}
            <div
              role="region"
              aria-label="Foto produk makanan dapat diseret"
              className="relative h-[320px] sm:h-[350px] w-full overflow-hidden select-none cursor-grab active:cursor-grabbing flex items-center justify-center"
              style={{ perspective: '1100px' }}
              onPointerDown={(e) => {
                dragPhotoRef.current = { active: true, startX: e.clientX, moved: false };
                (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
              }}
              onPointerMove={(e) => {
                if (!dragPhotoRef.current.active) return;
                const dx = e.clientX - dragPhotoRef.current.startX;
                if (Math.abs(dx) > 4) dragPhotoRef.current.moved = true;
                dragPhotoRef.current.startX = e.clientX;
                setPhotoAngle((prev) => (prev + dx * 0.45 + 360) % 360);
              }}
              onPointerUp={() => {
                dragPhotoRef.current.active = false;
              }}
              onPointerCancel={() => {
                dragPhotoRef.current.active = false;
              }}
            >
              {/* Subtle orbital track ellipse */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute w-[390px] h-[150px] rounded-full border border-blue-400/15 rotate-[7deg]"
              />

              {photoWheelItems.map((product, idx) => {
                const pos = computeOrbitalPosition(
                  idx,
                  photoWheelItems.length,
                  photoAngle,
                  185,
                  115,
                  22
                );

                return (
                  <button
                    key={`${product.id}-${idx}`}
                    type="button"
                    onMouseEnter={() => setHoveredPhotoId(`${product.id}-${idx}`)}
                    onMouseLeave={() => setHoveredPhotoId(null)}
                    onClick={() => {
                      if (dragPhotoRef.current.moved) return;
                      onSelectProduct(product);
                    }}
                    style={{
                      transform: `translate3d(${pos.x}px, ${pos.y}px, 0) scale(${pos.scale}) rotateY(${pos.rotateY}deg)`,
                      opacity: pos.opacity,
                      zIndex: pos.zIndex,
                    }}
                    className="group absolute w-[144px] h-[112px] rounded-[20px] overflow-hidden border border-white/25 hover:border-blue-400 bg-slate-900 shadow-2xl shadow-black/70 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      draggable={false}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />
                    <div className="absolute bottom-2 left-2.5 right-2.5 text-left">
                      <p className="text-[11px] font-semibold text-white truncate">
                        {product.name}
                      </p>
                      <p className="text-[10px] text-blue-200 truncate">
                        {product.kecamatan}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-4 text-xs">
              <div className="min-w-0">
                <span className="text-white font-medium truncate block">
                  {frontPhoto.name}
                </span>
                <span className="text-slate-400 truncate block">
                  {frontPhoto.umkmName} · {frontPhoto.kecamatan}
                </span>
              </div>
              <span className="font-mono tabular-nums text-blue-300 font-semibold whitespace-nowrap shrink-0">
                {formatRupiah(frontPhoto.price)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
