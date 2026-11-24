import { CheckCircle2, Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import { formatRupiah, type UmkmProduct } from '../data/sukoharjoUmkm';

export interface CartItem {
  product: UmkmProduct;
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  items: CartItem[];
  onClose: () => void;
  onUpdateQty: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export function CartDrawer({
  isOpen,
  items,
  onClose,
  onUpdateQty,
  onRemoveItem,
  onClearCart,
}: CartDrawerProps) {
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'COD Sukoharjo' | 'Ambil di Warung'>(
    'COD Sukoharjo'
  );
  const [confirmedOrder, setConfirmedOrder] = useState<{
    orderCode: string;
    total: number;
    customerName: string;
    method: string;
  } | null>(null);

  if (!isOpen) return null;

  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const deliveryFee = paymentMethod === 'COD Sukoharjo' && subtotal > 0 && subtotal < 100000 ? 8000 : 0;
  const total = subtotal + deliveryFee;

  const handleCheckout = (e: FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !phone.trim() || items.length === 0) return;

    const code = `SKH-${Math.floor(1000 + Math.random() * 9000)}`;
    setConfirmedOrder({
      orderCode: code,
      total,
      customerName: customerName.trim(),
      method: paymentMethod,
    });
    onClearCart();
  };

  const handleClose = () => {
    setConfirmedOrder(null);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-slate-950/55 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-label="Keranjang Pesanan UMKM Sukoharjo"
      onClick={handleClose}
    >
      <div
        className="w-full max-w-md bg-white h-full flex flex-col shadow-2xl border-l border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-4 h-4 text-[#0044BD]" aria-hidden="true" />
            <h3 className="font-display text-base font-bold text-slate-900">
              Keranjang Pesanan
            </h3>
          </div>
          <button
            type="button"
            onClick={handleClose}
            aria-label="Tutup keranjang"
            className="w-8 h-8 rounded-lg hover:bg-slate-100 text-slate-600 flex items-center justify-center cursor-pointer"
          >
            <X className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto p-6">
          {confirmedOrder ? (
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center">
              <CheckCircle2
                className="w-10 h-10 text-emerald-600 mx-auto mb-3"
                aria-hidden="true"
              />
              <p className="font-mono text-xs font-semibold text-emerald-800 mb-1">
                Pesanan #{confirmedOrder.orderCode} Dikonfirmasi
              </p>
              <h4 className="font-display text-lg font-bold text-slate-900 mb-2">
                Terima kasih, {confirmedOrder.customerName}
              </h4>
              <p className="text-sm text-slate-600 mb-4">
                Pesanan Anda sedang diteruskan ke mitra UMKM Sukoharjo dengan metode{' '}
                <strong>{confirmedOrder.method}</strong>.
              </p>
              <div className="bg-white rounded-xl border border-emerald-200 px-4 py-3 mb-5 flex items-center justify-between text-sm">
                <span className="text-slate-600">Total Pembayaran</span>
                <span className="font-mono tabular-nums font-bold text-slate-900">
                  {formatRupiah(confirmedOrder.total)}
                </span>
              </div>
              <button
                type="button"
                onClick={handleClose}
                className="w-full py-2.5 rounded-xl bg-[#0044BD] text-white text-xs font-semibold hover:bg-[#003594] transition-colors cursor-pointer"
              >
                Kembali ke Katalog
              </button>
            </div>
          ) : items.length === 0 ? (
            <div className="text-center py-16">
              <ShoppingBag
                className="w-10 h-10 text-slate-300 mx-auto mb-3"
                aria-hidden="true"
              />
              <p className="font-display text-base font-semibold text-slate-800 mb-1">
                Keranjang masih kosong
              </p>
              <p className="text-sm text-slate-500">
                Pilih sajian dari Etalase atau Katalog UMKM Sukoharjo untuk mulai memesan.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Itemized List */}
              <div className="space-y-4">
                {items.map(({ product, quantity }) => (
                  <div
                    key={product.id}
                    className="flex gap-3.5 pb-4 border-b border-slate-100"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="w-20 h-16 rounded-xl object-cover bg-slate-100 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-slate-900 truncate">
                        {product.name}
                      </p>
                      <p className="text-xs text-slate-500 truncate mb-2">
                        {product.umkmName} · {product.kecamatan}
                      </p>

                      <div className="flex items-center justify-between gap-2">
                        <div className="inline-flex items-center border border-slate-200 rounded-lg">
                          <button
                            type="button"
                            onClick={() => onUpdateQty(product.id, -1)}
                            aria-label={`Kurangi ${product.name}`}
                            className="w-7 h-7 flex items-center justify-center text-slate-600 hover:bg-slate-100 cursor-pointer"
                          >
                            <Minus className="w-3 h-3" aria-hidden="true" />
                          </button>
                          <span className="font-mono tabular-nums text-xs font-semibold w-7 text-center">
                            {quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => onUpdateQty(product.id, 1)}
                            aria-label={`Tambah ${product.name}`}
                            className="w-7 h-7 flex items-center justify-center text-slate-600 hover:bg-slate-100 cursor-pointer"
                          >
                            <Plus className="w-3 h-3" aria-hidden="true" />
                          </button>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="font-mono tabular-nums text-xs font-bold text-slate-900">
                            {formatRupiah(product.price * quantity)}
                          </span>
                          <button
                            type="button"
                            onClick={() => onRemoveItem(product.id)}
                            aria-label={`Hapus ${product.name}`}
                            className="text-slate-400 hover:text-red-600 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Verification Form */}
              <form id="checkout-form" onSubmit={handleCheckout} className="space-y-3.5">
                <h4 className="font-display text-sm font-bold text-slate-900">
                  Data Pemesan & Pengiriman Lokal
                </h4>

                <div className="grid grid-cols-2 gap-2 bg-slate-100 p-1 rounded-xl">
                  {(['COD Sukoharjo', 'Ambil di Warung'] as const).map((method) => (
                    <button
                      key={method}
                      type="button"
                      onClick={() => setPaymentMethod(method)}
                      className={`py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                        paymentMethod === method
                          ? 'bg-white text-[#0044BD] shadow-sm'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {method}
                    </button>
                  ))}
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Contoh: Budi Santoso"
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Nomor WhatsApp
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="08xx-xxxx-xxxx"
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                {paymentMethod === 'COD Sukoharjo' && (
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Alamat & Kecamatan Pengantaran
                    </label>
                    <textarea
                      rows={2}
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Jl. Slamet Riyadi No. 12, Kec. Sukoharjo"
                      className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                )}
              </form>
            </div>
          )}
        </div>

        {/* Drawer Footer */}
        {items.length > 0 && !confirmedOrder && (
          <div className="p-6 border-t border-slate-200 bg-slate-50 space-y-3">
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal Produk</span>
                <span className="font-mono tabular-nums">{formatRupiah(subtotal)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Ongkir Lokal (Gratis ≥ Rp100rb)</span>
                <span className="font-mono tabular-nums">
                  {deliveryFee === 0 ? 'Gratis' : formatRupiah(deliveryFee)}
                </span>
              </div>
              <div className="flex justify-between font-bold text-slate-900 pt-2 border-t border-slate-200">
                <span>Total</span>
                <span className="font-mono tabular-nums">{formatRupiah(total)}</span>
              </div>
            </div>

            <button
              type="submit"
              form="checkout-form"
              className="w-full py-3 rounded-xl bg-[#0044BD] text-white text-sm font-semibold hover:bg-[#003594] transition-colors cursor-pointer"
            >
              Konfirmasi Pesanan ({formatRupiah(total)})
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
