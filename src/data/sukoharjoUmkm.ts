export type FoodCategory =
  | 'Semua'
  | 'Makanan Berat'
  | 'Jamu & Minuman'
  | 'Jajanan & Oleh-oleh';

export type FoodThemeId =
  | 'all'
  | 'liwet'
  | 'jamu'
  | 'bakmi'
  | 'sate'
  | 'jenang'
  | 'camilan'
  | 'sambal'
  | 'minuman';

export interface FoodThemeItem {
  id: Exclude<FoodThemeId, 'all'>;
  label: string;
  subtitle: string;
  category: Exclude<FoodCategory, 'Semua'>;
  accentHex: string;
  countLabel: string;
}

export interface UmkmProduct {
  id: string;
  name: string;
  umkmName: string;
  category: Exclude<FoodCategory, 'Semua'>;
  themeId: Exclude<FoodThemeId, 'all'>;
  kecamatan: string;
  address: string;
  hours: string;
  price: number;
  unit: string;
  rating: string;
  phone: string;
  description: string;
  signatureNotes: string[];
  image: string;
  /** Projected coordinates on 1000x760 Sukoharjo cartography canvas */
  mapX: number;
  mapY: number;
  lat: number;
  lng: number;
}

export interface SukoharjoDistrict {
  id: string;
  name: string;
  centerX: number;
  centerY: number;
  path: string;
  highlight?: string;
}

export const FOOD_THEMES: FoodThemeItem[] = [
  {
    id: 'liwet',
    label: 'Nasi & Liwet',
    subtitle: 'Sajian gurih santan pincuk',
    category: 'Makanan Berat',
    accentHex: '#38BDF8',
    countLabel: 'Kartasura · Kota',
  },
  {
    id: 'jamu',
    label: 'Jamu Herbal',
    subtitle: 'Racikan asli Kampung Nguter',
    category: 'Jamu & Minuman',
    accentHex: '#FBBF24',
    countLabel: 'Nguter · Bendosari',
  },
  {
    id: 'bakmi',
    label: 'Bakmi & Kuah',
    subtitle: 'Dimasak tungku arang',
    category: 'Makanan Berat',
    accentHex: '#FB923C',
    countLabel: 'Grogol · Baki',
  },
  {
    id: 'sate',
    label: 'Sate & Bakar',
    subtitle: 'Olahan daging bumbu kecap',
    category: 'Makanan Berat',
    accentHex: '#F87171',
    countLabel: 'Bendosari · Kota',
  },
  {
    id: 'jenang',
    label: 'Jenang & Kue',
    subtitle: 'Manis legit gula kelapa',
    category: 'Jajanan & Oleh-oleh',
    accentHex: '#F472B6',
    countLabel: 'Mojolaban',
  },
  {
    id: 'camilan',
    label: 'Camilan Renyah',
    subtitle: 'Intip & keripik lokal',
    category: 'Jajanan & Oleh-oleh',
    accentHex: '#A78BFA',
    countLabel: 'Baki · Polokarto',
  },
  {
    id: 'sambal',
    label: 'Sambal & Bumbu',
    subtitle: 'Pendamping pedas rumahan',
    category: 'Makanan Berat',
    accentHex: '#34D399',
    countLabel: 'Gatak · Kartasura',
  },
  {
    id: 'minuman',
    label: 'Wedang & Segar',
    subtitle: 'Minuman rempah tradisional',
    category: 'Jamu & Minuman',
    accentHex: '#60A5FA',
    countLabel: 'Nguter · Tawangsari',
  },
];

export const UMKM_PRODUCTS: UmkmProduct[] = [
  {
    id: 'liwet-bu-sri',
    name: 'Nasi Liwet Pincuk Komplit',
    umkmName: 'Dapur Liwet Bu Sri Kartasura',
    category: 'Makanan Berat',
    themeId: 'liwet',
    kecamatan: 'Kartasura',
    address: 'Jl. Ahmad Yani No. 114, Kartasura, Sukoharjo',
    hours: '06.30 – 14.00 WIB',
    price: 22000,
    unit: 'Porsi Pincuk',
    rating: '4.9',
    phone: '0812-2640-1102',
    description:
      'Nasi gurih dimasak perlahan dengan santan segar, disajikan di atas daun pisang bersama suwiran ayam kampung, sayur labu siam pedas manis, telur pindang, dan areh kental khas Kartasura.',
    signatureNotes: ['Beras lokal Sukoharjo', 'Tanpa pengawet', 'Dimasak setiap pagi'],
    image: '/src/assets/images/umkm_nasi_liwet_sukoharjo_1795499989689.jpg',
    mapX: 285,
    mapY: 165,
    lat: -7.5563,
    lng: 110.7429,
  },
  {
    id: 'jamu-nguter-lestari',
    name: 'Jamu Kunir Asem & Beras Kencur',
    umkmName: 'Koperasi Jamu Lestari Nguter',
    category: 'Jamu & Minuman',
    themeId: 'jamu',
    kecamatan: 'Nguter',
    address: 'Pasar Jamu Nguter Blok B-12, Kec. Nguter, Sukoharjo',
    hours: '07.00 – 17.00 WIB',
    price: 28000,
    unit: 'Paket 2 Botol 250ml',
    rating: '4.9',
    phone: '0856-4719-8830',
    description:
      'Racikan herbal autentik dari sentra jamu tradisional Kampung Jamu Nguter. Mengolah rimpang kunyit kuning, asam jawa pilihan, kencur segar, dan gula aren murni dalam kemasan botol kaca higienis.',
    signatureNotes: ['Rimpang petani lokal', 'Botol kaca sterilisasi', 'Halal & BPOM P-IRT'],
    image: '/src/assets/images/umkm_jamu_nguter_herbal_1795499989437.jpg',
    mapX: 545,
    mapY: 505,
    lat: -7.7341,
    lng: 110.8692,
  },
  {
    id: 'bakmi-jawa-slamet',
    name: 'Bakmi Jawa Godog & Goreng Arang',
    umkmName: 'Bakmi Jawa Pak Slamet Grogol',
    category: 'Makanan Berat',
    themeId: 'bakmi',
    kecamatan: 'Grogol',
    address: 'Jl. Raya Solo Baru – Grogol No. 48, Grogol, Sukoharjo',
    hours: '17.00 – 23.30 WIB',
    price: 24000,
    unit: 'Porsi Mangkuk',
    rating: '4.8',
    phone: '0813-9311-4421',
    description:
      'Bakmi telur kenyal dimasak satu per satu di atas anglo arang kayu untuk menghasilkan aroma smokey khas Jawa, dilengkapi telur bebek, suwiran ayam kampung, kol segar, dan acar mentimun.',
    signatureNotes: ['Anglo arang tradisional', 'Telur bebek segar', 'Kuah kaldu ayam kampung'],
    image: '/src/assets/images/umkm_bakmi_jawa_aren_1795499990324.jpg',
    mapX: 430,
    mapY: 225,
    lat: -7.6032,
    lng: 110.8131,
  },
  {
    id: 'jenang-mojolaban-asli',
    name: 'Jenang Krasikan & Wajik Ketan',
    umkmName: 'Sentra Jenang Mbah Karto Mojolaban',
    category: 'Jajanan & Oleh-oleh',
    themeId: 'jenang',
    kecamatan: 'Mojolaban',
    address: 'Desa Bekonang RT 02/04, Kec. Mojolaban, Sukoharjo',
    hours: '08.00 – 18.00 WIB',
    price: 35000,
    unit: 'Besek 500 gram',
    rating: '4.9',
    phone: '0857-2508-7712',
    description:
      'Oleh-oleh tradisional Mojolaban dengan tekstur lembut sedikit berpasir dari tepung ketan sangrai, santan kelapa tua, dan karamel gula merah murni yang diaduk di kuali tembaga selama 4 jam.',
    signatureNotes: ['Gula kelapa murni', 'Tahan 7 hari suhu ruang', 'Kemasan besek ramah lingkungan'],
    image: '/src/assets/images/umkm_jenang_krasikan_mojolaban_1795499990898.jpg',
    mapX: 605,
    mapY: 215,
    lat: -7.5998,
    lng: 110.8924,
  },
  {
    id: 'sate-buntel-bendosari',
    name: 'Sate Buntel Bakar Kecap Rempah',
    umkmName: 'Warung Sate Pak Harto Bendosari',
    category: 'Makanan Berat',
    themeId: 'sate',
    kecamatan: 'Bendosari',
    address: 'Jl. Mulur – Bendosari Km 2, Kec. Bendosari, Sukoharjo',
    hours: '10.00 – 21.00 WIB',
    price: 42000,
    unit: 'Porsi 2 Tusuk Besar',
    rating: '4.8',
    phone: '0812-1544-9032',
    description:
      'Daging kambing muda cincang berbumbu ketumbar, merica, dan bawang putih yang dibalut lemak tipis lalu dipanggang dengan olesan kecap manis tradisional, disajikan bersama irisan bawang merah dan cabai rawit.',
    signatureNotes: ['Daging kambing muda', 'Bumbu rempah sangrai', 'Disajikan panas di piring tanah liat'],
    image: '/src/assets/images/umkm_sate_buntel_bendosari_1795499991018.jpg',
    mapX: 645,
    mapY: 365,
    lat: -7.6742,
    lng: 110.8965,
  },
  {
    id: 'intip-goreng-baki',
    name: 'Intip Goreng Gula Jawa Renyah',
    umkmName: 'Camilan Sari Beras Baki',
    category: 'Jajanan & Oleh-oleh',
    themeId: 'camilan',
    kecamatan: 'Baki',
    address: 'Jl. Jetis – Baki No. 19, Kec. Baki, Sukoharjo',
    hours: '08.00 – 19.00 WIB',
    price: 18000,
    unit: 'Pouch 200 gram',
    rating: '4.7',
    phone: '0821-3890-5561',
    description:
      'Kerak nasi pilihan yang dikeringkan di bawah sinar matahari lalu digoreng mekar renyah dan disiram lelehan gula jawa kental. Gurih, manis, dan dikemas dalam kraft pouch kedap udara.',
    signatureNotes: ['Beras C4 pilihan Baki', 'Renyah tanpa minyak berlebih', 'Siap kirim luar kota'],
    image: '/src/assets/images/umkm_intip_goreng_baki_1795499992889.jpg',
    mapX: 315,
    mapY: 255,
    lat: -7.6194,
    lng: 110.7689,
  },
  {
    id: 'liwet-alun-alun',
    name: 'Nasi Liwet Areh Telur Pindang',
    umkmName: 'Warung Mbah Darmo Sukoharjo Kota',
    category: 'Makanan Berat',
    themeId: 'sambal',
    kecamatan: 'Sukoharjo Kota',
    address: 'Jl. Jenderal Sudirman No. 72, Alun-Alun Sukoharjo',
    hours: '06.00 – 13.00 WIB',
    price: 20000,
    unit: 'Porsi Pincuk + Sambal',
    rating: '4.8',
    phone: '0852-9102-3374',
    description:
      'Cita rasa klasik alun-alun Sukoharjo sejak 1998 dengan tambahan sambal goreng krecek pedas, tempe bacem, dan ayam suwir bumbu kuning gurih.',
    signatureNotes: ['Resep keluarga 1998', 'Sambal goreng krecek', 'Dekat Alun-Alun Satya Negara'],
    image: '/src/assets/images/umkm_nasi_liwet_sukoharjo_1795499989689.jpg',
    mapX: 485,
    mapY: 365,
    lat: -7.6821,
    lng: 110.8384,
  },
  {
    id: 'wedang-empon-tawangsari',
    name: 'Paket Wedang Empon & Kunir Sirih',
    umkmName: 'Herbal Sekar Arum Tawangsari',
    category: 'Jamu & Minuman',
    themeId: 'minuman',
    kecamatan: 'Tawangsari',
    address: 'Jl. Raya Tawangsari – Weru No. 9, Tawangsari, Sukoharjo',
    hours: '08.00 – 17.30 WIB',
    price: 26000,
    unit: 'Paket 2 Botol 250ml',
    rating: '4.8',
    phone: '0878-3622-1940',
    description:
      'Minuman rempah tradisional perpaduan jahe emprit, temulawak, kayu manis, serai, dan asam jawa yang menyegarkan tubuh baik disajikan dingin maupun hangat.',
    signatureNotes: ['Jahe emprit segar', 'Tanpa pemanis buatan', 'Produksi harian'],
    image: '/src/assets/images/umkm_jamu_nguter_herbal_1795499989437.jpg',
    mapX: 385,
    mapY: 505,
    lat: -7.7412,
    lng: 110.7851,
  },
];

/**
 * 12 Kecamatan of Kabupaten Sukoharjo arranged accurately from NW (Kartasura/Gatak)
 * to SE (Weru/Bulu/Nguter) on a 1000x760 cartographic projection.
 */
export const SUKOHARJO_DISTRICTS: SukoharjoDistrict[] = [
  {
    id: 'kartasura',
    name: 'Kartasura',
    centerX: 270,
    centerY: 165,
    path: 'M175,115 L340,105 L360,210 L215,230 L165,175 Z',
    highlight: 'Gerbang Barat · Kuliner Pagi',
  },
  {
    id: 'gatak',
    name: 'Gatak',
    centerX: 195,
    centerY: 280,
    path: 'M135,230 L255,220 L270,335 L155,345 L120,285 Z',
    highlight: 'Lumbung Padi · Sentra Sambal',
  },
  {
    id: 'baki',
    name: 'Baki',
    centerX: 325,
    centerY: 265,
    path: 'M255,215 L385,205 L390,320 L270,335 Z',
    highlight: 'Camilan Intip & Beras',
  },
  {
    id: 'grogol',
    name: 'Grogol',
    centerX: 445,
    centerY: 220,
    path: 'M360,130 L525,140 L520,285 L390,295 L385,205 Z',
    highlight: 'Solo Baru · Bakmi & Kuliner Malam',
  },
  {
    id: 'mojolaban',
    name: 'Mojolaban',
    centerX: 625,
    centerY: 215,
    path: 'M525,140 L735,130 L745,275 L520,285 Z',
    highlight: 'Sentra Jenang Krasikan',
  },
  {
    id: 'polokarto',
    name: 'Polokarto',
    centerX: 735,
    centerY: 350,
    path: 'M615,280 L850,275 L845,425 L625,420 Z',
    highlight: 'Agro & Olahan Singkong',
  },
  {
    id: 'sukoharjo',
    name: 'Sukoharjo Kota',
    centerX: 475,
    centerY: 365,
    path: 'M375,295 L565,285 L575,435 L385,435 Z',
    highlight: 'Pusat Pemerintahan & Alun-Alun',
  },
  {
    id: 'bendosari',
    name: 'Bendosari',
    centerX: 635,
    centerY: 365,
    path: 'M565,285 L625,280 L635,425 L575,435 Z',
    highlight: 'Kuliner Sate & Bendungan Colo',
  },
  {
    id: 'nguter',
    name: 'Nguter',
    centerX: 555,
    centerY: 515,
    path: 'M460,435 L680,425 L695,590 L470,585 Z',
    highlight: 'Kampung Jamu Nasional',
  },
  {
    id: 'tawangsari',
    name: 'Tawangsari',
    centerX: 375,
    centerY: 510,
    path: 'M285,435 L460,435 L470,585 L290,575 Z',
    highlight: 'Pasar Tradisional & Wedang',
  },
  {
    id: 'bulu',
    name: 'Bulu',
    centerX: 465,
    centerY: 645,
    path: 'M365,580 L595,585 L575,705 L370,695 Z',
    highlight: 'Perbukitan Selatan',
  },
  {
    id: 'weru',
    name: 'Weru',
    centerX: 255,
    centerY: 635,
    path: 'M165,565 L365,580 L370,695 L180,685 Z',
    highlight: 'Gerbang Selatan & Batik',
  },
];

export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(amount);
}
