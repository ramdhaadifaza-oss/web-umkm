import { ShoppingBag } from 'lucide-react';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
}

export function Header({ cartCount, onOpenCart }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full bg-[#0044BD]/95 backdrop-blur-md border-b border-white/15">
      <div className="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between gap-8">
        <a
          href="#beranda"
          className="font-display text-lg font-bold tracking-tight text-white whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 rounded"
        >
          LokaRasa Sukoharjo
        </a>

        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-blue-100">
          <a
            href="#beranda"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 underline-offset-4 hover:underline"
          >
            Beranda
          </a>
          <a
            href="#etalase"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 underline-offset-4 hover:underline"
          >
            Etalase
          </a>
          <a
            href="#katalog"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 underline-offset-4 hover:underline"
          >
            Katalog
          </a>
          <a
            href="#peta-umkm"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 underline-offset-4 hover:underline"
          >
            Peta UMKM
          </a>
          <a
            href="#testimoni-umkm"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 underline-offset-4 hover:underline"
          >
            Testimoni
          </a>
        </nav>

        <div className="flex items-center shrink-0">
          <button
            type="button"
            onClick={onOpenCart}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-[#003DA8] text-xs font-semibold hover:bg-blue-50 transition-colors whitespace-nowrap shrink-0 cursor-pointer shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <ShoppingBag className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Keranjang</span>
            <span className="tabular-nums font-mono text-[11px] bg-blue-100 text-[#003DA8] px-1.5 py-0.5 rounded-full">
              {cartCount}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
