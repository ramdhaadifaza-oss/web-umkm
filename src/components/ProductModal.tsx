import { Clock, MapPin, Minus, Plus, ShoppingBag, X } from 'lucide-react';
import { useState } from 'react';
import { formatRupiah, type UmkmProduct } from '../data/sukoharjoUmkm';

interface ProductModalProps {
  product: UmkmProduct | null;
  onClose: () => void;
  onAddToCart: (product: UmkmProduct, quantity: number) => void;
  onFocusOnMap: (product: UmkmProduct) => void;
}

export function ProductModal({
  product,
  onClose,
  onAddToCart,
  onFocusOnMap,
}: ProductModalProps) {
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/65 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-modal-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl bg-white rounded-[24px] overflow-hidden shadow-2xl border border-slate-200 grid grid-cols-1 md:grid-cols-12"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Tutup detail produk"
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/95 border border-slate-200 text-slate-700 hover:text-slate-950 flex items-center justify-center shadow-sm cursor-pointer"
        >
          <X className="w-4 h-4" aria-hidden="true" />
        </button>

        {/* Left Image */}
        <div className="md:col-span-6 bg-slate-100">
          <img
            src={product.image}
            alt={product.name}
            referrerPolicy="no-referrer"
            className="w-full h-64 md:h-full object-cover"
          />
        </div>

        {/* Right Purchase & Info Module */}
        <div className="md:col-span-6 p-6 sm:p-7 flex flex-col justify-between gap-5">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-1.5">
              <span className="font-semibold text-[#0044BD]">Kec. {product.kecamatan}</span>
              <span aria-hidden="true">·</span>
              <span>{product.category}</span>
              <span aria-hidden="true">·</span>
              <span className="tabular-nums">★ {product.rating}</span>
            </div>

            <h3
              id="product-modal-title"
              className="font-display text-xl sm:text-2xl font-bold text-slate-900 leading-tight mb-1"
            >
              {product.name}
            </h3>
            <p className="text-sm font-medium text-slate-600 mb-4">{product.umkmName}</p>

            <p className="font-mono tabular-nums text-2xl font-bold text-slate-900 mb-1">
              {formatRupiah(product.price)}
            </p>
            <p className="text-xs text-slate-500 mb-4">Satuan: {product.unit}</p>

            <p className="text-sm text-slate-600 leading-relaxed mb-4">
              {product.description}
            </p>

            <ul className="space-y-1.5 text-xs text-slate-600 mb-4">
              {product.signatureNotes.map((note) => (
                <li key={note} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0044BD]" aria-hidden="true" />
                  <span>{note}</span>
                </li>
              ))}
            </ul>

            <div className="pt-3 border-t border-slate-100 space-y-1.5 text-xs text-slate-600">
              <p className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#0044BD] shrink-0 mt-0.5" aria-hidden="true" />
                <span>{product.address}</span>
              </p>
              <p className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-slate-500 shrink-0" aria-hidden="true" />
                <span className="tabular-nums">{product.hours}</span>
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200 flex flex-col gap-3">
            <div className="flex items-center justify-between gap-4">
              <span className="text-xs font-semibold text-slate-700">Jumlah</span>
              <div className="inline-flex items-center border border-slate-200 rounded-xl bg-slate-50">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  aria-label="Kurangi jumlah"
                  className="w-9 h-9 flex items-center justify-center text-slate-700 hover:bg-slate-200/70 rounded-l-xl cursor-pointer"
                >
                  <Minus className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
                <span className="font-mono tabular-nums text-sm font-semibold w-10 text-center text-slate-900">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  aria-label="Tambah jumlah"
                  className="w-9 h-9 flex items-center justify-center text-slate-700 hover:bg-slate-200/70 rounded-r-xl cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onFocusOnMap(product);
                }}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-300 text-slate-800 text-xs font-semibold hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Lihat di Peta</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  onAddToCart(product, quantity);
                  setQuantity(1);
                  onClose();
                }}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#0044BD] text-white text-xs font-semibold hover:bg-[#003594] transition-colors cursor-pointer"
              >
                <ShoppingBag className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Tambah ({formatRupiah(product.price * quantity)})</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
