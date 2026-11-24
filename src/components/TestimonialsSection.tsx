import { Star, ArrowUpRight } from 'lucide-react';
import { UMKM_PRODUCTS, type UmkmProduct } from '../data/sukoharjoUmkm';

interface TestimonialItem {
  id: string;
  buyerName: string;
  buyerRole: string;
  productId: string;
  productName: string;
  umkmName: string;
  kecamatan: string;
  rating: string;
  dateLabel: string;
  quote: string;
}

const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'testi-1',
    buyerName: 'Ratna Dewi Kusuma',
    buyerRole: 'Ibu Rumah Tangga, Solo Baru',
    productId: 'jamu-nguter-lestari',
    productName: 'Jamu Kunir Asem & Beras Kencur',
    umkmName: 'Koperasi Jamu Lestari Nguter',
    kecamatan: 'Nguter',
    rating: '5.0',
    dateLabel: 'November 2026',
    quote:
      'Sebelumnya harus jauh-jauh ke Pasar Nguter kalau mau stok jamu botol kaca. Sekarang tinggal pilih lewat katalog, kemasan tersegel rapi dan rasa kunyit asamnya tetap segar tanpa ampas berlebih.',
  },
  {
    id: 'testi-2',
    buyerName: 'Hendra Wijaya',
    buyerRole: 'Karyawan Swasta, Kartasura',
    productId: 'liwet-bu-sri',
    productName: 'Nasi Liwet Pincuk Komplit',
    umkmName: 'Dapur Liwet Bu Sri Kartasura',
    kecamatan: 'Kartasura',
    rating: '5.0',
    dateLabel: 'November 2026',
    quote:
      'Pesan 15 pincuk untuk sarapan rapat kantor di Kartasura. Pengiriman tepat waktu sebelum jam 8 pagi, nasi masih hangat, areh gurihnya pas, dan daun pisangnya bersih.',
  },
  {
    id: 'testi-3',
    buyerName: 'Siti Aminah',
    buyerRole: 'Pengajar, Sukoharjo Kota',
    productId: 'jenang-mojolaban-asli',
    productName: 'Jenang Krasikan & Wajik Ketan',
    umkmName: 'Sentra Jenang Mbah Karto Mojolaban',
    kecamatan: 'Mojolaban',
    rating: '4.9',
    dateLabel: 'Oktober 2026',
    quote:
      'Cocok sekali untuk oleh-oleh keluarga ke luar kota. Tekstur jenang krasikannya lembut berpasir, manis gula kelapanya alami, dan besek anyamannya rapi tanpa perlu bungkus ulang.',
  },
  {
    id: 'testi-4',
    buyerName: 'Bagus Prakoso',
    buyerRole: 'Wiraswasta, Grogol',
    productId: 'bakmi-jawa-slamet',
    productName: 'Bakmi Jawa Godog & Goreng Arang',
    umkmName: 'Bakmi Jawa Pak Slamet Grogol',
    kecamatan: 'Grogol',
    rating: '4.9',
    dateLabel: 'November 2026',
    quote:
      'Aroma bakaran arangnya terasa kuat dan kuah kaldunya gurih meski dibawa pulang. Titik lokasi di peta juga sangat akurat sehingga mudah ditemukan saat mampir makan malam.',
  },
  {
    id: 'testi-5',
    buyerName: 'Nadia Putri Lestari',
    buyerRole: 'Mahasiswa, Baki',
    productId: 'intip-goreng-baki',
    productName: 'Intip Goreng Gula Jawa Renyah',
    umkmName: 'Camilan Sari Beras Baki',
    kecamatan: 'Baki',
    rating: '4.8',
    dateLabel: 'Oktober 2026',
    quote:
      'Awalnya ragu beli intip kemasan takut melempem, ternyata setelah coba produk UMKM Baki ini renyahnya tahan lama dan karamel gula jawanya tidak bikin enek.',
  },
  {
    id: 'testi-6',
    buyerName: 'Agus Setiawan',
    buyerRole: 'Aparatur Sipil, Bendosari',
    productId: 'sate-buntel-bendosari',
    productName: 'Sate Buntel Bakar Kecap Rempah',
    umkmName: 'Warung Sate Pak Harto Bendosari',
    kecamatan: 'Bendosari',
    rating: '5.0',
    dateLabel: 'November 2026',
    quote:
      'Daging kambingnya empuk dan tidak berbau prengus, bumbu ketumbarnya meresap sampai ke dalam. Praktis bisa langsung cek jam buka sebelum berangkat ke Bendosari.',
  },
];

interface TestimonialsSectionProps {
  onSelectProduct: (product: UmkmProduct) => void;
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase();
}

export function TestimonialsSection({ onSelectProduct }: TestimonialsSectionProps) {
  const handleInspectProduct = (productId: string) => {
    const found = UMKM_PRODUCTS.find((p) => p.id === productId);
    if (found) {
      onSelectProduct(found);
    }
  };

  return (
    <section
      id="testimoni-umkm"
      className="bg-slate-50 border-t border-slate-200 py-16 lg:py-20"
    >
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <p className="text-xs font-medium text-[#0044BD] mb-2">
              Ulasan Pembeli Terverifikasi · Produk Lokal Sukoharjo
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 text-balance">
              Testimoni UMKM
            </h2>
          </div>

          <div className="flex items-center gap-3 text-sm text-slate-600">
            <div className="flex items-center gap-1 text-amber-500" aria-hidden="true">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            </div>
            <span className="tabular-nums">
              <strong className="text-slate-900">4,9 / 5,0</strong> rata-rata dari{' '}
              <strong className="text-slate-900">1.240+</strong> pesanan lokal
            </span>
          </div>
        </div>

        {/* 3-Column Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TESTIMONIALS.map((item) => (
            <article
              key={item.id}
              className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col justify-between gap-5"
            >
              <div>
                {/* Rating & Date Row (Zero-pill unboxed metadata) */}
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="inline-flex items-center gap-1.5">
                    <div className="flex items-center gap-0.5" aria-hidden="true">
                      {Array.from({ length: 5 }).map((_, idx) => (
                        <Star
                          key={idx}
                          className="w-3.5 h-3.5 fill-amber-400 text-amber-400"
                        />
                      ))}
                    </div>
                    <span className="font-mono tabular-nums text-xs font-semibold text-slate-800">
                      {item.rating}
                    </span>
                  </div>

                  <span className="text-xs text-slate-400">{item.dateLabel}</span>
                </div>

                {/* Review Quote */}
                <blockquote className="text-sm text-slate-700 leading-relaxed mb-4">
                  “{item.quote}”
                </blockquote>

                {/* Reviewed Product Reference */}
                <button
                  type="button"
                  onClick={() => handleInspectProduct(item.productId)}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#0044BD] hover:underline cursor-pointer text-left"
                >
                  <span>{item.productName}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                </button>
              </div>

              {/* Reviewer Attribution */}
              <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
                <div
                  aria-hidden="true"
                  className="w-10 h-10 rounded-full bg-blue-50 border border-blue-100 text-[#0044BD] font-display text-xs font-bold flex items-center justify-center shrink-0"
                >
                  {getInitials(item.buyerName)}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-slate-900 truncate">
                    {item.buyerName}
                  </p>
                  <p className="text-xs text-slate-500 truncate">
                    {item.buyerRole} · Kec. {item.kecamatan}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
