export const settingsSeed = {
  brand: {
    nameEn: 'Meka Water Tanker',
    nameAm: 'መካ የውሀ ታንከር',
    taglineEn: 'Water, held to a higher standard.',
    taglineAm: 'እኛ እያለን ውሀ አይጠማዎትም።',
  },
  contact: {
    phone: '+251909911551',
    phoneAlt: '+251911000000',
    whatsapp: '+251909911551',
    email: 'info@mekatanker.com',
    addressEn: 'Lideta, Addis Ababa, Ethiopia',
    addressAm: 'ልደታ፣ አዲስ አበባ፣ ኢትዮጵያ',
    hoursEn: 'Mon – Sat · 8:00 AM – 6:00 PM',
    hoursAm: 'ሰኞ – ቅዳሜ · ከጠዋቱ 2:00 – ከሰዓት 12:00',
  },
  socials: {
    telegram: 'https://t.me/Mekish',
    facebook: 'https://www.facebook.com/share/1Z1FmbEAN3/',
    tiktok: '',
    instagram: '',
    youtube: '',
  },
  stats: [
    { value: '10', suffix: 'yr', labelEn: 'Written warranty', labelAm: 'የፃፍ ዋስትና' },
    { value: '25,000', suffix: 'L', labelEn: 'Largest capacity', labelAm: 'ከፍተኛ አቅም' },
    { value: '5,000', suffix: '+', labelEn: 'Tanks installed', labelAm: 'የተገጠሙ ታንከሮች' },
    { value: '48', suffix: 'hr', labelEn: 'City delivery', labelAm: 'በከተማ ውስጥ አቅርቦት' },
  ],
};

export const categoriesSeed = [
  {
    slug: 'fiber',
    name_en: 'Fiber Tanks',
    name_am: 'የፋይበር ታንከሮች',
    tagline_en: 'Filament-wound strength for the long haul.',
    tagline_am: 'ለረጅም ጊዜ የሚቆይ ጥንካሬ።',
    image: '/images/fiber our.png',
    sort_order: 1,
  },
  {
    slug: 'plastic',
    name_en: 'Plastic Tanks',
    name_am: 'የፕላስቲክ ታንከሮች',
    tagline_en: 'Light to move. Built to last.',
    tagline_am: 'ቀላል ለማንቀሳቀስ። ጠንካራ ለመቆየት።',
    image: '/images/plastic our.png',
    sort_order: 2,
  },
  {
    slug: 'underground',
    name_en: 'Underground Tanks',
    name_am: 'የከርሰ ምድር ታንከሮች',
    tagline_en: 'Space, quietly reclaimed.',
    tagline_am: 'ቦታን በጥበብ መጠቀም።',
    image: '/images/under our.png',
    sort_order: 3,
  },
  {
    slug: 'flower-pots',
    name_en: 'Fiber Flower Pots',
    name_am: 'የአበባ ማስቀመጫዎች',
    tagline_en: 'Sculptural shapes for living spaces.',
    tagline_am: 'ለአካባቢዎ ውበት የሚጨምሩ ቅርጾች።',
    image: '/images/flower our.png',
    sort_order: 4,
  },
];

const fiberFeaturesEn = [
  'Anti-bacterial food-grade inner layer',
  'UV-stabilised shell, rated for direct sun',
  'Reinforced base and seamless wall',
  '10-year written warranty',
];
const fiberFeaturesAm = [
  'ፀረ-ባክቴሪያ የሆነ የውስጥ ንብርብር',
  'ለፀሐይ የማይበገር ውጫዊ ንብርብር',
  'የተጠናከረ ግርጌ እና አንድ ወጥ ግድግዳ',
  'የ10 አመት የፃፍ ዋስትና',
];
const plasticFeaturesEn = [
  'Impact-resistant PVC compound',
  'Chemical and rust resistant',
  'Lightweight — easy transport',
  'Screw lid with brass outlet',
];
const plasticFeaturesAm = [
  'ጠንካራ የPVC ግብአት',
  'ለኬሚካል እና ዝገት የማይበገር',
  'ቀላል — ለማጓጓዝ አመቺ',
  'የነሀስ ቧንቧ እና የሚሸፈን ክዳን',
];
const underFeaturesEn = [
  'Made to measure, any footprint',
  'Structural ribbing for soil load',
  'Leak-tested before handover',
  'Professional excavation and install',
];
const underFeaturesAm = [
  'በሚፈልጉት ስፋት የሚሰራ',
  'የአፈር ጫናን የሚቋቋም ግንባታ',
  'ከማስረከብ በፊት የመፍሰስ ምርመራ',
  'በባለሙያ የሚገጠም',
];
const potFeaturesEn = [
  'Frost and crack resistant',
  'Colour-fast under sunlight',
  'Multiple sizes and finishes',
  'Drainage-ready base',
];
const potFeaturesAm = [
  'መሰንጠቅን የሚቋቋም',
  'በፀሐይ ቀለሙ የማይለቅ',
  'የተለያየ መጠን እና ቀለም',
  'የፍሳሽ መውጫ ያለው',
];

const P = (p) => ({
  description_en: '',
  description_am: '',
  features_en: [],
  features_am: [],
  gallery: [],
  badge_en: '',
  badge_am: '',
  in_stock: true,
  featured: false,
  is_active: true,
  ...p,
});

export const productsSeed = [
  P({
    category_slug: 'fiber',
    slug: 'fiber-500',
    name_en: 'Meka Fiber 500',
    name_am: 'መካ ፋይበር 500',
    capacity_l: 500,
    price_etb: 8500,
    image: '/images/fi1.png',
    gallery: ['/images/fi1.png', '/images/fi2.png', '/images/fi7.png'],
    description_en:
      'A compact fiber tank for households and small shops. Filament-wound for a seamless wall that will not crack under pressure.',
    description_am:
      'ለቤት እና ለአነስተኛ ሱቅ ተስማሚ የሆነ አነስተኛ ፋይበር ታንከር። ያለስንጥቅ የሚቆይ ጠንካራ ግድግዳ ያለው።',
    features_en: fiberFeaturesEn,
    features_am: fiberFeaturesAm,
    badge_en: 'Best seller',
    badge_am: 'ተመራጭ',
    featured: true,
    sort_order: 1,
  }),
  P({
    category_slug: 'fiber',
    slug: 'fiber-1000',
    name_en: 'Meka Fiber 1000',
    name_am: 'መካ ፋይበር 1000',
    capacity_l: 1000,
    price_etb: 13500,
    image: '/images/fi2.png',
    gallery: ['/images/fi2.png', '/images/fi3.png', '/images/fi8.png'],
    description_en:
      'The everyday workhorse. Food-grade interior keeps water clean while the UV-stabilised shell handles direct rooftop sun.',
    description_am:
      'ለዕለት ተዕለት አገልግሎት የተዘጋጀ። የውስጥ ንብርብሩ ውሀውን ንፁህ ያደርጋል፣ ውጫዊው ደግሞ ለፀሐይ የማይበገር ነው።',
    features_en: fiberFeaturesEn,
    features_am: fiberFeaturesAm,
    featured: true,
    sort_order: 2,
  }),
  P({
    category_slug: 'fiber',
    slug: 'fiber-2000',
    name_en: 'Meka Fiber 2000',
    name_am: 'መካ ፋይበር 2000',
    capacity_l: 2000,
    price_etb: 22000,
    image: '/images/fi3.png',
    gallery: ['/images/fi3.png', '/images/fi4.png', '/images/fi1.png'],
    description_en:
      'Our most specified size for villas, guest houses and small factories. Balanced footprint with generous reserve capacity.',
    description_am:
      'ለቪላ፣ ለእንግዳ ማረፊያ እና ለአነስተኛ ፋብሪካዎች በብዛት የሚመረጥ መጠን። ጠቅላላ አቅሙ ከፍተኛ ነው።',
    features_en: fiberFeaturesEn,
    features_am: fiberFeaturesAm,
    badge_en: 'Most specified',
    badge_am: 'በብዛት የሚመረጥ',
    featured: true,
    sort_order: 3,
  }),
  P({
    category_slug: 'fiber',
    slug: 'fiber-3000',
    name_en: 'Meka Fiber 3000',
    name_am: 'መካ ፋይበር 3000',
    capacity_l: 3000,
    price_etb: 30500,
    image: '/images/fi4.png',
    gallery: ['/images/fi4.png', '/images/fi5.png'],
    description_en:
      'Built for compounds and commercial kitchens where a single refill should last the week.',
    description_am:
      'ለግቢ እና ለንግድ ኩሽና ተስማሚ፤ አንድ ጊዜ ሞልቶ ሳምንቱን የሚያሳልፍ።',
    features_en: fiberFeaturesEn,
    features_am: fiberFeaturesAm,
    sort_order: 4,
  }),
  P({
    category_slug: 'fiber',
    slug: 'fiber-5000',
    name_en: 'Meka Fiber 5000',
    name_am: 'መካ ፋይበር 5000',
    capacity_l: 5000,
    price_etb: 45000,
    image: '/images/fi5.png',
    gallery: ['/images/fi5.png', '/images/fi6.png'],
    description_en:
      'Commercial-grade storage with reinforced ribbing, delivered and set on a prepared base by our crew.',
    description_am:
      'ለንግድ አገልግሎት የተዘጋጀ ጠንካራ ታንከር፤ በባለሙያ ቡድናችን ተገጥሞ ይቀርባል።',
    features_en: fiberFeaturesEn,
    features_am: fiberFeaturesAm,
    sort_order: 5,
  }),
  P({
    category_slug: 'fiber',
    slug: 'fiber-10000',
    name_en: 'Meka Fiber 10000',
    name_am: 'መካ ፋይበር 10000',
    capacity_l: 10000,
    price_etb: 82000,
    image: '/images/fi6.png',
    gallery: ['/images/fi6.png', '/images/fi7.png'],
    description_en:
      'Bulk storage for factories, farms and apartment blocks. Site survey included before fabrication.',
    description_am:
      'ለፋብሪካ፣ ለእርሻ እና ለአፓርታማ ብዛት ያለው ውሀ ማጠራቀሚያ። ከምርት በፊት የቦታ ምርመራ ይካሄዳል።',
    features_en: fiberFeaturesEn,
    features_am: fiberFeaturesAm,
    sort_order: 6,
  }),
  P({
    category_slug: 'fiber',
    slug: 'fiber-15000',
    name_en: 'Meka Fiber 15000',
    name_am: 'መካ ፋይበር 15000',
    capacity_l: 15000,
    price_etb: 118000,
    image: '/images/fi7.png',
    gallery: ['/images/fi7.png', '/images/fi8.png'],
    description_en:
      'Engineered with extra wall thickness for high-demand industrial supply lines.',
    description_am:
      'ለከፍተኛ ፍላጎት ያላቸው የኢንዱስትሪ አቅርቦቶች የተጨመረ ግድግዳ ውፍረት ያለው።',
    features_en: fiberFeaturesEn,
    features_am: fiberFeaturesAm,
    sort_order: 7,
  }),
  P({
    category_slug: 'fiber',
    slug: 'fiber-25000',
    name_en: 'Meka Fiber 25000',
    name_am: 'መካ ፋይበር 25000',
    capacity_l: 25000,
    price_etb: 175000,
    image: '/images/fi8.png',
    gallery: ['/images/fi8.png', '/images/strong last.jpg'],
    description_en:
      'Our largest standard tank. Delivered by crane-equipped truck and commissioned on site.',
    description_am:
      'ትልቁ መደበኛ ታንከራችን። በክሬን የተገጠመ ተሽከርካሪ ተጓጉዞ በቦታው ይሰራል።',
    features_en: fiberFeaturesEn,
    features_am: fiberFeaturesAm,
    badge_en: 'Flagship',
    badge_am: 'ትልቁ',
    sort_order: 8,
  }),

  P({
    category_slug: 'plastic',
    slug: 'plastic-200',
    name_en: 'Meka Plastic 200',
    name_am: 'መካ ፕላስቲክ 200',
    capacity_l: 200,
    price_etb: 3200,
    image: '/images/p2.png',
    gallery: ['/images/p2.png', '/images/p3.png'],
    description_en:
      'A tidy 200-litre drum for kitchens, kiosks and small gardens. Carries easily by two people.',
    description_am:
      'ለኩሽና፣ ለኪዮስክ እና ለአነስተኛ ጓሮ ተስማሚ የ200 ሊትር ታንከር። በሁለት ሰው በቀላሉ ይንቀሳቀሳል።',
    features_en: plasticFeaturesEn,
    features_am: plasticFeaturesAm,
    sort_order: 1,
  }),
  P({
    category_slug: 'plastic',
    slug: 'plastic-500',
    name_en: 'Meka Plastic 500',
    name_am: 'መካ ፕላስቲክ 500',
    capacity_l: 500,
    price_etb: 5600,
    image: '/images/p3.png',
    gallery: ['/images/p3.png', '/images/p4.png'],
    description_en:
      'The value pick. Rust-free, food-safe and light enough to reposition whenever you need.',
    description_am:
      'በተመጣጣኝ ዋጋ የሚገኝ። ዝገት የማይይዝ፣ ለምግብ አገልግሎት ተስማሚ እና ቀላል።',
    features_en: plasticFeaturesEn,
    features_am: plasticFeaturesAm,
    featured: true,
    sort_order: 2,
  }),
  P({
    category_slug: 'plastic',
    slug: 'plastic-1000',
    name_en: 'Meka Plastic 1000',
    name_am: 'መካ ፕላስቲክ 1000',
    capacity_l: 1000,
    price_etb: 9800,
    image: '/images/p4.png',
    gallery: ['/images/p4.png', '/images/p5.png', '/images/plast1.png'],
    description_en:
      'A household standard with a wide screw lid and brass outlet for quick, clean access.',
    description_am:
      'የቤት ውስጥ መደበኛ ታንከር፤ ሰፊ ክዳን እና የነሀስ መውጫ ያለው።',
    features_en: plasticFeaturesEn,
    features_am: plasticFeaturesAm,
    badge_en: 'Best value',
    badge_am: 'ምርጥ ዋጋ',
    featured: true,
    sort_order: 3,
  }),
  P({
    category_slug: 'plastic',
    slug: 'plastic-1500',
    name_en: 'Meka Plastic 1500',
    name_am: 'መካ ፕላስቲክ 1500',
    capacity_l: 1500,
    price_etb: 12400,
    image: '/images/p5.png',
    gallery: ['/images/p5.png', '/images/p6.png'],
    description_en:
      'Extra headroom for families and small businesses without taking a large footprint.',
    description_am:
      'ለቤተሰብ እና ለአነስተኛ ንግድ ተጨማሪ አቅም የሚሰጥ፣ ቦታ የማይዙ።',
    features_en: plasticFeaturesEn,
    features_am: plasticFeaturesAm,
    sort_order: 4,
  }),
  P({
    category_slug: 'plastic',
    slug: 'plastic-2000',
    name_en: 'Meka Plastic 2000',
    name_am: 'መካ ፕላስቲክ 2000',
    capacity_l: 2000,
    price_etb: 15900,
    image: '/images/p6.png',
    gallery: ['/images/p6.png', '/images/p7.png'],
    description_en:
      'Double-layer wall for better temperature stability in hot climates.',
    description_am:
      'በሞቃት አካባቢ የውሀውን ሙቀት ለመጠበቅ ሁለት ንብርብር ግድግዳ ያለው።',
    features_en: plasticFeaturesEn,
    features_am: plasticFeaturesAm,
    sort_order: 5,
  }),
  P({
    category_slug: 'plastic',
    slug: 'plastic-3000',
    name_en: 'Meka Plastic 3000',
    name_am: 'መካ ፕላስቲክ 3000',
    capacity_l: 3000,
    price_etb: 21500,
    image: '/images/p7.png',
    gallery: ['/images/p7.png', '/images/p8.png'],
    description_en:
      'Commercial capacity with reinforced shoulders so it can be sited on a simple concrete pad.',
    description_am:
      'ለንግድ አገልግሎት የሚሆን አቅም፤ በቀላሉ በኮንክሪት ላይ ሊቀመጥ ይችላል።',
    features_en: plasticFeaturesEn,
    features_am: plasticFeaturesAm,
    sort_order: 6,
  }),
  P({
    category_slug: 'plastic',
    slug: 'plastic-5000',
    name_en: 'Meka Plastic 5000',
    name_am: 'መካ ፕላስቲክ 5000',
    capacity_l: 5000,
    price_etb: 32000,
    image: '/images/plast1.png',
    gallery: ['/images/plast1.png', '/images/p9.png', '/images/p10.png'],
    description_en:
      'Bulk plastic storage for compounds and small industry, installed by our team.',
    description_am:
      'ለግቢ እና ለአነስተኛ ኢንዱስትሪ ብዛት ያለው የፕላስቲክ ማጠራቀሚያ፤ በቡድናችን ይገጠማል።',
    features_en: plasticFeaturesEn,
    features_am: plasticFeaturesAm,
    sort_order: 7,
  }),

  P({
    category_slug: 'underground',
    slug: 'underground-5000',
    name_en: 'Meka Underground 5000',
    name_am: 'መካ ከርሰ ምድር 5000',
    capacity_l: 5000,
    price_etb: 68000,
    image: '/images/under1.png',
    gallery: ['/images/under1.png', '/images/u2.png'],
    description_en:
      'Buried storage that frees your compound. Ribbed structure resists soil load and keeps water cool.',
    description_am:
      'ግቢዎን ነፃ የሚያደርግ የመሬት ውስጥ ማጠራቀሚያ። ጠንካራ ግንባታው የአፈር ጫናን ይቋቋማል።',
    features_en: underFeaturesEn,
    features_am: underFeaturesAm,
    featured: true,
    badge_en: 'Space saver',
    badge_am: 'ቦታ ቆጣቢ',
    sort_order: 1,
  }),
  P({
    category_slug: 'underground',
    slug: 'underground-10000',
    name_en: 'Meka Underground 10000',
    name_am: 'መካ ከርሰ ምድር 10000',
    capacity_l: 10000,
    price_etb: 112000,
    image: '/images/u2.png',
    gallery: ['/images/u2.png', '/images/under grond.jpg'],
    description_en:
      'A discreet reservoir for apartment blocks, with inspection hatch and sealed inlet.',
    description_am:
      'ለአፓርታማ ተስማሚ የመሬት ውስጥ ማጠራቀሚያ፤ የፍተሻ ቀዳዳ እና የተዘጋ ማስገቢያ ያለው።',
    features_en: underFeaturesEn,
    features_am: underFeaturesAm,
    sort_order: 2,
  }),
  P({
    category_slug: 'underground',
    slug: 'underground-20000',
    name_en: 'Meka Underground 20000',
    name_am: 'መካ ከርሰ ምድር 20000',
    capacity_l: 20000,
    price_etb: 186000,
    image: '/images/u3.png',
    gallery: ['/images/u3.png', '/images/u2.png'],
    description_en:
      'Large-capacity buried storage for industry, installed with a full structural survey.',
    description_am:
      'ለኢንዱስትሪ የሚሆን ትልቅ የመሬት ውስጥ ማጠራቀሚያ፤ ከግንባታ ምርመራ ጋር።',
    features_en: underFeaturesEn,
    features_am: underFeaturesAm,
    sort_order: 3,
  }),
  P({
    category_slug: 'underground',
    slug: 'underground-custom',
    name_en: 'Meka Underground — Made to Measure',
    name_am: 'መካ ከርሰ ምድር — በልዩ ስፋት',
    capacity_l: null,
    price_etb: 0,
    image: '/images/under grond.jpg',
    gallery: ['/images/under grond.jpg', '/images/under1.png'],
    description_en:
      'Told us your footprint and volume — we fabricate to the square metre, on your site.',
    description_am:
      'በሚፈልጉት ስፋት እና አቅም — በቦታዎ ላይ እንሰራለን።',
    features_en: underFeaturesEn,
    features_am: underFeaturesAm,
    badge_en: 'Custom build',
    badge_am: 'በልዩ ትዕዛዝ',
    sort_order: 4,
  }),

  P({
    category_slug: 'flower-pots',
    slug: 'flower-pot-ribbed',
    name_en: 'Ribbed Planter',
    name_am: 'የተዘረገፈ የአበባ ማስቀመጫ',
    capacity_l: null,
    price_etb: 4500,
    image: '/images/f1.png',
    gallery: ['/images/f1.png', '/images/f2.png'],
    description_en:
      'A tall ribbed silhouette in matte fiber — striking at an entrance, calm indoors.',
    description_am:
      'በማቲ ፋይበር የተሰራ ረጅም ውብ ቅርፅ — በመግቢያ በር ላይ የሚያምር።',
    features_en: potFeaturesEn,
    features_am: potFeaturesAm,
    featured: true,
    sort_order: 1,
  }),
  P({
    category_slug: 'flower-pots',
    slug: 'flower-pot-seed',
    name_en: 'Seed Bowl Planter',
    name_am: 'የዘር ቅርፅ ማስቀመጫ',
    capacity_l: null,
    price_etb: 3800,
    image: '/images/f2.png',
    gallery: ['/images/f2.png', '/images/f3.png'],
    description_en:
      'Rounded and generous, for low planting schemes and tabletop greenery.',
    description_am:
      'ክብ እና ሰፊ — ለጠረጴዛ ላይ እና ለአነስተኛ አበቦች ተስማሚ።',
    features_en: potFeaturesEn,
    features_am: potFeaturesAm,
    sort_order: 2,
  }),
  P({
    category_slug: 'flower-pots',
    slug: 'flower-pot-tall',
    name_en: 'Tall Column Planter',
    name_am: 'ረጅም አምድ ማስቀመጫ',
    capacity_l: null,
    price_etb: 5200,
    image: '/images/f3.png',
    gallery: ['/images/f3.png', '/images/f4.png'],
    description_en:
      'Upright and architectural — pair two at a doorway for a composed entrance.',
    description_am:
      'ቀጥ ያለ እና ውብ — ሁለቱን በበር ላይ አድርገው ያስውቡ።',
    features_en: potFeaturesEn,
    features_am: potFeaturesAm,
    sort_order: 3,
  }),
  P({
    category_slug: 'flower-pots',
    slug: 'flower-pot-bowl',
    name_en: 'Wide Bowl Planter',
    name_am: 'ሰፊ ሳህን ማስቀመጫ',
    capacity_l: null,
    price_etb: 4200,
    image: '/images/f4.png',
    gallery: ['/images/f4.png', '/images/f5.png'],
    description_en:
      'A shallow bowl for succulents and seasonal arrangements on terraces.',
    description_am:
      'ለበረንዳ ላይ ለሚቀመጡ አበቦች ተስማሚ ጥልቀት የሌለው ሳህን።',
    features_en: potFeaturesEn,
    features_am: potFeaturesAm,
    sort_order: 4,
  }),
  P({
    category_slug: 'flower-pots',
    slug: 'flower-pot-classic',
    name_en: 'Classic Pot',
    name_am: 'ክላሲክ ማስቀመጫ',
    capacity_l: null,
    price_etb: 3200,
    image: '/images/f5.png',
    gallery: ['/images/f5.png', '/images/f1.png'],
    description_en:
      'The dependable classic — available in a range of colours to match your facade.',
    description_am:
      'የተመረጠ ክላሲክ — ከፊት ገፅታዎ ጋር በሚስማሙ ቀለማት።',
    features_en: potFeaturesEn,
    features_am: potFeaturesAm,
    sort_order: 5,
  }),
];

export const testimonialsSeed = [
  {
    name: 'ወርቅነሽ ቶሎሳ',
    location: 'Addis Ababa',
    quote_en:
      'The fiber tank we bought from Meka is genuinely solid. I have already recommended it to my neighbours.',
    quote_am:
      'ከመካ የውሀ ታንከር የወሰድኩት የፋይበር ታንከር ጠንካራ እና አሪፍ እቃ ነው። ሌሎችም እንዲጠቀሙበት መክሬያለሁ።',
    avatar: '/images/old girl.jpg',
    rating: 5,
    sort_order: 1,
  },
  {
    name: 'ሰላም ፍቃዱ',
    location: 'Bishoftu',
    quote_en:
      'They installed our underground tank beautifully. The crew was patient, tidy and clearly experienced.',
    quote_am:
      'የመሬት ታንከር የገጠሙበት መንገድ በጣም የሚገርም ነው። በጣም ታታሪ እና ልምድ ያላቸው ሰራተኞች ናቸው።',
    avatar: '/images/young girl.jpg',
    rating: 5,
    sort_order: 2,
  },
  {
    name: 'ካሊድ አባስ',
    location: 'Addis Ababa',
    quote_en:
      'Excellent plastic tank at a fair price, delivered the same week. Exactly what a small business needs.',
    quote_am:
      'በጣም ጥሩ ጥራት ያለው የፕላስቲክ ታንከር በተመጣጣኝ ዋጋ ገዝቻለሁ። በዚያው ሳምንት አደረሱልኝ።',
    avatar: '/images/young boy.jpg',
    rating: 5,
    sort_order: 3,
  },
];

export const faqsSeed = [
  {
    question_en: 'Do you offer a warranty on your products?',
    question_am: 'ለምርቶቻችሁ ዋስትና ትሰጣላችሁ ወይ?',
    answer_en:
      'Yes. Every fiber and plastic tank carries a 10-year written warranty. Terms and conditions apply, and our team handles any claim directly.',
    answer_am:
      'አዎ። ለሁሉም የፋይበር እና የፕላስቲክ ታንከሮች የ10 አመት የፃፍ ዋስትና እንሰጣለን። ደንብ እና ሁኔታዎች ተፈፃሚ ናቸው።',
    sort_order: 1,
  },
  {
    question_en: 'Can I order a tank in a custom size?',
    question_am: 'በምፈልገው መጠን ታንከር ማዘዝ እችላለሁ?',
    answer_en:
      'Absolutely. Standard production covers 200 – 25,000 litres, and underground tanks are built to your exact footprint and volume.',
    answer_am:
      'በእርግጥ። መደበኛ ምርታችን ከ200 እስከ 25,000 ሊትር ሲሆን የመሬት ውስጥ ታንከሮች በሚፈልጉት ስፋት ይሰራሉ።',
    sort_order: 2,
  },
  {
    question_en: 'How long does production take?',
    question_am: 'አንድ ታንከር ለመስራት ምን ያህል ጊዜ ይወስዳል?',
    answer_en:
      'Most sizes are kept in stock and dispatched within 48 hours in Addis Ababa. Custom builds take 3 – 7 working days after confirmation.',
    answer_am:
      'አብዛኞቹ መጠኖች በመጋዘን ይገኛሉ እና በአዲስ አበባ በ48 ሰዓት ውስጥ ይደርሳሉ። በልዩ ትዕዛዝ የሚሰሩ 3–7 የስራ ቀናት ይወስዳሉ።',
    sort_order: 3,
  },
  {
    question_en: 'Do you deliver and install?',
    question_am: 'ዴሊቨሪ እና ገጠማ ታደርጋላችሁ?',
    answer_en:
      'Yes — with our own transport and certified installers, at no extra labour charge in Addis Ababa and nearby towns. Regional delivery is quoted per route.',
    answer_am:
      'አዎ — በራሳችን ትራንስፖርት እና በባለሙያ ቡድን ፣ በአዲስ አበባ እና አካባቢዋ ያለ ተጨማሪ የሰው ዋጋ። ለክልል በመስመር ይሰላል።',
    sort_order: 4,
  },
  {
    question_en: 'Is the water safe to drink from the tank?',
    question_am: 'ከታንከሩ ውሀ መጠጣት ይቻላል?',
    answer_en:
      'Our tanks use food-grade, anti-bacterial materials that protect water quality. We also recommend a periodic clean and a standard filter at the outlet.',
    answer_am:
      'ታንከሮቻችን ለምግብ ተስማሚ እና ፀረ-ባክቴሪያ የሆኑ ግብአቶችን ይጠቀማሉ። በየጊዜው ማጽዳት እና ማጣሪያ መጠቀም ይመከራል።',
    sort_order: 5,
  },
];

export const partnersSeed = [
  { name: 'Awaj Promotion', logo: '/images/Awaj Promotion Logo.jpg', sort_order: 1 },
  { name: 'Ethio-Turkish', logo: '/images/Ethio-Turkish Logo.jpg', sort_order: 2 },
  { name: 'Hamer Graphics', logo: '/images/Hamer Graphics Logo.jpg', sort_order: 3 },
  { name: 'Salah Store', logo: '/images/Salah Store Logo.jpg', sort_order: 4 },
  { name: 'Semer Luxury', logo: '/images/Semer Luxury Logo.jpg', sort_order: 5 },
  { name: 'Yeni Trends', logo: '/images/Yeni Trends Logo.jpg', sort_order: 6 },
];
