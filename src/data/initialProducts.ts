import { ProductItem } from '../types';
import { buildProductRetailerLinks } from '../utils/retailerData';

export const INITIAL_PRODUCTS: ProductItem[] = [
  {
    id: 'prod-1',
    barcode: '840122900012',
    name: 'Soft Pinch Liquid Dewy Blush',
    brand: 'Rare Beauty',
    category: 'makeup',
    subCategory: 'Blush',
    price: 23,
    currency: '$',
    primaryRetailer: 'sephora',
    sourceUrl: 'https://www.sephora.com/product/rare-beauty-soft-pinch-liquid-blush-P97989778',
    retailers: buildProductRetailerLinks(
      'Soft Pinch Liquid Dewy Blush',
      'Rare Beauty',
      'makeup',
      'sephora',
      'https://www.sephora.com/product/rare-beauty-soft-pinch-liquid-blush-P97989778',
      23
    ),
    durabilityProfile: {
      durabilityScore: 4.9,
      expectedLifespan: '14-18 Months (400+ micro-applications)',
      materialComposition: 'Frosted UV-shielded glass with silicone seal',
      maintenanceTips: 'Store upright at room temp; wipe doe-foot collar occasionally.',
      wearResistance: 'Exceptional',
      testedUsage: '14-hour crease-proof wear across combination skin without patchiness.'
    },
    storeLocations: [
      {
        storeName: 'Sephora Flagship',
        chainKey: 'sephora',
        department: 'Complexion & Cheeks',
        aisle: 'Bay 4',
        bayOrSection: 'Rare Beauty Gondola',
        stockStatus: 'In Stock',
        price: 23,
        localFinderUrl: 'https://www.sephora.com/happening/stores/sephora-near-me'
      },
      {
        storeName: 'Big W',
        chainKey: 'big_w',
        department: 'Prestige Beauty',
        aisle: 'Aisle 7',
        stockStatus: 'In Stock',
        price: 36,
        localFinderUrl: 'https://www.bigw.com.au/store-finder'
      }
    ],
    priceHistory: [
      { date: '2025-11-20', price: 20, note: 'Holiday intro price' },
      { date: '2026-01-15', price: 23, note: 'MSRP adjustment' },
      { date: '2026-04-10', price: 23, note: 'Spring Restock' },
      { date: '2026-06-25', price: 19, note: 'Summer Beauty Event' },
      { date: '2026-08-10', price: 23, note: 'Current shelf price' }
    ],
    overallRating: 4.8,
    repurchase: 'definitely',
    imageUrl: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=80',
    usageDuration: '8 months (daily)',
    reviewText: 'A single dot provides incredible pigment that blends seamlessly into skin. Lasts a full 10-hour workday without fading or turning patchy.',
    pros: ['Extreme pigmentation (tiny amount needed)', 'Weightless dewy finish', 'All-day staying power'],
    cons: ['Easy to over-apply if you are not careful'],
    dimensions: {
      quality: 4.9,
      value: 4.8,
      longevity: 5.0,
      aesthetic: 4.6,
      performance: 4.7
    },
    tags: ['Dewy', 'High Pigment', 'Cruelty Free'],
    dateRated: '2026-08-10',
    isFavorite: true
  },
  {
    id: 'prod-2',
    barcode: '7041234567890',
    name: 'Washed Linen Duvet Cover Set',
    brand: 'Cultiver',
    category: 'homewares',
    subCategory: 'Bedding',
    price: 240,
    currency: '$',
    primaryRetailer: 'ikea',
    sourceUrl: 'https://www.ikea.com/us/en/cat/duvet-covers-sets-10680/',
    retailers: buildProductRetailerLinks(
      'Washed Linen Duvet Cover Set',
      'Cultiver',
      'homewares',
      'ikea',
      'https://www.ikea.com/us/en/cat/duvet-covers-sets-10680/',
      240
    ),
    durabilityProfile: {
      durabilityScore: 5.0,
      expectedLifespan: '8-10 Years (Stronger than cotton when wet)',
      materialComposition: '100% Long-staple pre-washed Normandy French flax',
      maintenanceTips: 'Machine wash gentle cold; line dry in shade or low heat tumble.',
      wearResistance: 'Exceptional',
      testedUsage: '180+ laundry cycles with tensile strength increasing over time.'
    },
    storeLocations: [
      {
        storeName: 'IKEA',
        chainKey: 'ikea',
        department: 'Textiles & Bedding',
        aisle: 'Self-Serve Aisle 14',
        bayOrSection: 'Bin 22',
        stockStatus: 'In Stock',
        price: 240,
        localFinderUrl: 'https://www.ikea.com/us/en/stores/'
      },
      {
        storeName: 'Target Supercenter',
        chainKey: 'target',
        department: 'Luxe Bedding',
        aisle: 'Aisle E12',
        stockStatus: 'In Stock',
        price: 240,
        localFinderUrl: 'https://www.target.com/store-locator/find-stores'
      }
    ],
    priceHistory: [
      { date: '2025-05-10', price: 260, note: 'Original list price' },
      { date: '2025-11-28', price: 208, note: 'Black Friday 20% off' },
      { date: '2026-02-14', price: 250, note: 'Post-holiday revision' },
      { date: '2026-05-30', price: 240, note: 'Seasonal catalog price' },
      { date: '2026-07-22', price: 240, note: 'Current shelf price' }
    ],
    overallRating: 4.9,
    repurchase: 'definitely',
    imageUrl: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80',
    usageDuration: '1.5 years',
    reviewText: 'The 100% European flax gets softer with every wash. Super breathable for both summer humidity and winter layering.',
    pros: ['Becomes softer after every laundering', 'Exceptional temperature regulation', 'Naturally relaxed texture'],
    cons: ['Needs gentle cycle washing', 'Wrinkles naturally (though looks intentional)'],
    dimensions: {
      quality: 5.0,
      value: 4.4,
      longevity: 5.0,
      aesthetic: 5.0,
      performance: 4.9
    },
    tags: ['100% Flax', 'Pre-washed', 'Breathable'],
    dateRated: '2026-07-22',
    isFavorite: true
  },
  {
    id: 'prod-3',
    barcode: '850005477209',
    name: 'Stagg EKG Electric Pour-Over Kettle',
    brand: 'Fellow',
    category: 'kitchen',
    subCategory: 'Coffee & Tea',
    price: 165,
    currency: '$',
    primaryRetailer: 'costco',
    sourceUrl: 'https://www.costco.com/fellow-stagg-ekg-electric-kettle.html',
    retailers: buildProductRetailerLinks(
      'Stagg EKG Electric Pour-Over Kettle',
      'Fellow',
      'kitchen',
      'costco',
      'https://www.costco.com/fellow-stagg-ekg-electric-kettle.html',
      165
    ),
    durabilityProfile: {
      durabilityScore: 4.8,
      expectedLifespan: '7-10 Years daily heating cycles',
      materialComposition: '304 18/8 Stainless Steel body with heat-resistant ergonomic silicone handle',
      maintenanceTips: 'Descale every 60 days with white vinegar / citric acid solution.',
      wearResistance: 'High',
      testedUsage: 'Maintains PID temp precision (+/- 1°F) over 3,000 boils.'
    },
    storeLocations: [
      {
        storeName: 'Costco Wholesale',
        chainKey: 'costco',
        department: 'Small Gourmet Appliances',
        aisle: 'Aisle 6',
        bayOrSection: 'Center Coffee Island',
        stockStatus: 'In Stock',
        price: 165,
        localFinderUrl: 'https://www.costco.com/warehouse-locations'
      },
      {
        storeName: 'Williams Sonoma',
        chainKey: 'williams_sonoma',
        department: 'Espresso & Pour Over',
        aisle: 'Aisle 4',
        stockStatus: 'In Stock',
        price: 165,
        localFinderUrl: 'https://www.williams-sonoma.com/stores/'
      }
    ],
    priceHistory: [
      { date: '2024-09-01', price: 165, note: 'Standard retail' },
      { date: '2025-06-15', price: 195, note: 'Tariff & materials increase' },
      { date: '2025-11-25', price: 145, note: 'Cyber Week promotional drop' },
      { date: '2026-03-10', price: 175, note: 'Spring list price' },
      { date: '2026-06-15', price: 165, note: 'Current shelf price' }
    ],
    overallRating: 4.7,
    repurchase: 'definitely',
    imageUrl: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=800&q=80',
    usageDuration: '2 years',
    reviewText: 'The gooseneck spout provides pinpoint flow control for pour-over coffee. The PID controller holds exact temperatures for up to 60 minutes.',
    pros: ['Precision gooseneck pour rate', 'Rapid to-the-degree temperature dial', 'Minimalist countertop look'],
    cons: ['0.9L capacity is smaller for large families'],
    dimensions: {
      quality: 4.8,
      value: 4.2,
      longevity: 4.8,
      aesthetic: 5.0,
      performance: 4.9
    },
    tags: ['Gooseneck', 'PID Controller', 'Matte Black'],
    dateRated: '2026-06-15',
    isFavorite: true
  },
  {
    id: 'prod-4',
    name: 'Lip Glow Oil in Rosewood',
    brand: 'Dior Addict',
    category: 'makeup',
    subCategory: 'Lip Care',
    price: 40,
    currency: '$',
    primaryRetailer: 'sephora',
    sourceUrl: 'https://www.sephora.com/product/dior-lip-glow-oil-P453814',
    retailers: buildProductRetailerLinks(
      'Lip Glow Oil in Rosewood',
      'Dior Addict',
      'makeup',
      'sephora',
      'https://www.sephora.com/product/dior-lip-glow-oil-P453814',
      40
    ),
    priceHistory: [
      { date: '2025-06-01', price: 38, note: 'Retail price' },
      { date: '2025-12-01', price: 38, note: 'Holiday bundle' },
      { date: '2026-02-15', price: 40, note: 'Luxury brand price hike' },
      { date: '2026-08-01', price: 40, note: 'Current shelf price' }
    ],
    overallRating: 3.8,
    repurchase: 'maybe',
    imageUrl: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=800&q=80',
    usageDuration: '4 months',
    reviewText: 'Gives a glossy cushion finish and subtle custom tint. Very hydrating, but requires frequent reapplication every 90 minutes.',
    pros: ['Non-sticky plush cushion texture', 'Flattering natural tint', 'Iconic packaging'],
    cons: ['High price point for short wear time', 'Runs out quickly with daily use'],
    dimensions: {
      quality: 4.3,
      value: 3.0,
      longevity: 2.8,
      aesthetic: 4.9,
      performance: 4.0
    },
    tags: ['Glossy', 'Cherry Oil', 'Luxury'],
    dateRated: '2026-08-01',
    isFavorite: false
  },
  {
    id: 'prod-5',
    name: 'Cast Iron Dutch Oven (5.5 Qt)',
    brand: 'Le Creuset',
    category: 'kitchen',
    subCategory: 'Cookware',
    price: 380,
    currency: '$',
    primaryRetailer: 'williams_sonoma',
    sourceUrl: 'https://www.williams-sonoma.com/products/le-creuset-round-dutch-oven/',
    retailers: buildProductRetailerLinks(
      'Cast Iron Dutch Oven (5.5 Qt)',
      'Le Creuset',
      'kitchen',
      'williams_sonoma',
      'https://www.williams-sonoma.com/products/le-creuset-round-dutch-oven/',
      380
    ),
    priceHistory: [
      { date: '2024-03-01', price: 420, note: 'Original MSRP' },
      { date: '2024-11-20', price: 335, note: 'Factory-to-Table Sale' },
      { date: '2025-08-14', price: 400, note: 'Catalog price' },
      { date: '2026-01-05', price: 380, note: 'Annual price stabilization' },
      { date: '2026-05-18', price: 380, note: 'Current shelf price' }
    ],
    overallRating: 5.0,
    repurchase: 'definitely',
    imageUrl: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=800&q=80',
    usageDuration: '3 years',
    reviewText: 'Heirloom quality. Unbeatable heat retention and enamel durability for sourdough bread, braises, stews, and soups.',
    pros: ['Lifetime durability', 'Even heat distribution without hot spots', 'Easy-clean sand enamel'],
    cons: ['Heavy to handwash', 'Significant financial investment'],
    dimensions: {
      quality: 5.0,
      value: 4.7,
      longevity: 5.0,
      aesthetic: 4.9,
      performance: 5.0
    },
    tags: ['Enameled Iron', 'Oven Safe', 'Heirloom'],
    dateRated: '2026-05-18',
    isFavorite: true
  },
  {
    id: 'prod-6',
    name: 'Ceramic Ribbed Fluted Vase',
    brand: 'Menu / Audo Copenhagen',
    category: 'decor',
    subCategory: 'Vases',
    price: 68,
    currency: '$',
    primaryRetailer: 'bunnings',
    sourceUrl: 'https://www.bunnings.com.au/products/home-decor/pots-planters-vases',
    retailers: buildProductRetailerLinks(
      'Ceramic Ribbed Fluted Vase',
      'Menu / Audo Copenhagen',
      'decor',
      'bunnings',
      'https://www.bunnings.com.au/products/home-decor/pots-planters-vases',
      68
    ),
    priceHistory: [
      { date: '2025-09-12', price: 75, note: 'Design launch price' },
      { date: '2025-12-15', price: 60, note: 'Winter gift special' },
      { date: '2026-03-20', price: 68, note: 'Core catalog price' },
      { date: '2026-07-05', price: 68, note: 'Current shelf price' }
    ],
    overallRating: 4.6,
    repurchase: 'definitely',
    imageUrl: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80',
    usageDuration: '10 months',
    reviewText: 'Subtle off-white matte glaze with architectural fluting. Looks sculptural even when empty without fresh flowers.',
    pros: ['Sturdy weighted bottom', 'Sculptural silhouette', 'Waterproof matte glazed stoneware'],
    cons: ['Slightly narrow neck fits 5-7 stems'],
    dimensions: {
      quality: 4.8,
      value: 4.5,
      longevity: 4.8,
      aesthetic: 4.9,
      performance: 4.2
    },
    tags: ['Matte Glaze', 'Minimalist', 'Sculptural'],
    dateRated: '2026-07-05',
    isFavorite: false
  },
  {
    id: 'prod-7',
    name: 'Barrier Restore Cream',
    brand: 'Rhode Skin',
    category: 'skincare',
    subCategory: 'Moisturizer',
    price: 30,
    currency: '$',
    primaryRetailer: 'ulta',
    sourceUrl: 'https://www.ulta.com/p/barrier-restore-cream-pimprod',
    retailers: buildProductRetailerLinks(
      'Barrier Restore Cream',
      'Rhode Skin',
      'skincare',
      'ulta',
      'https://www.ulta.com/p/barrier-restore-cream-pimprod',
      30
    ),
    priceHistory: [
      { date: '2026-01-10', price: 29, note: 'Initial restock' },
      { date: '2026-04-15', price: 30, note: 'Packaging update adjustment' },
      { date: '2026-08-14', price: 30, note: 'Current shelf price' }
    ],
    overallRating: 4.4,
    repurchase: 'definitely',
    imageUrl: 'https://images.unsplash.com/photo-1608248597359-38374a5893a7?auto=format&fit=crop&w=800&q=80',
    usageDuration: '5 months',
    reviewText: 'Rich peptides and squalane that melt in without heavy greasiness. Calmed my sensitized skin barrier within 3 days.',
    pros: ['Fragrance free', 'Great under makeup primer', 'Restores flaky dry patches'],
    cons: ['Tube packaging makes getting the last bit difficult'],
    dimensions: {
      quality: 4.7,
      value: 4.2,
      longevity: 4.4,
      aesthetic: 4.5,
      performance: 4.6
    },
    tags: ['Peptides', 'Barrier Support', 'Fragrance-Free'],
    dateRated: '2026-08-14',
    isFavorite: false
  },
  {
    id: 'prod-8',
    name: 'Soy Wax Scented Candle in Teakwood',
    brand: 'P.F. Candle Co.',
    category: 'homewares',
    subCategory: 'Home Fragrance',
    price: 24,
    currency: '$',
    primaryRetailer: 'kmart',
    sourceUrl: 'https://www.kmart.com.au/category/home-living/home-decor/candles-diffusers/',
    retailers: buildProductRetailerLinks(
      'Soy Wax Scented Candle in Teakwood',
      'P.F. Candle Co.',
      'homewares',
      'kmart',
      'https://www.kmart.com.au/category/home-living/home-decor/candles-diffusers/',
      24
    ),
    priceHistory: [
      { date: '2025-10-01', price: 22, note: 'Standard retail' },
      { date: '2025-12-05', price: 18, note: 'Holiday bundle sale' },
      { date: '2026-03-01', price: 24, note: 'Spring formulation update' },
      { date: '2026-08-02', price: 24, note: 'Current shelf price' }
    ],
    overallRating: 4.5,
    repurchase: 'definitely',
    imageUrl: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=800&q=80',
    usageDuration: '2 months',
    reviewText: 'Warm notes of tobacco, cedar, and amber with an even burn pool. Scent throw fills a living room without overpowering.',
    pros: ['Clean 45-50 hour burn time', 'Reusable amber glass vessel', 'Subtle woody aroma'],
    cons: ['Needs wick trimming before each light'],
    dimensions: {
      quality: 4.6,
      value: 4.8,
      longevity: 4.4,
      aesthetic: 4.6,
      performance: 4.5
    },
    tags: ['Soy Wax', 'Amber Jar', 'Clean Burn'],
    dateRated: '2026-08-02',
    isFavorite: false
  },
  {
    id: 'prod-9',
    name: 'Teak Hand-Carved Salad Servers',
    brand: 'Hawkins New York',
    category: 'kitchen',
    subCategory: 'Utensils',
    price: 36,
    currency: '$',
    primaryRetailer: 'sams_club',
    sourceUrl: 'https://www.samsclub.com/p/teak-salad-server-set/prod24987',
    retailers: buildProductRetailerLinks(
      'Teak Hand-Carved Salad Servers',
      'Hawkins New York',
      'kitchen',
      'sams_club',
      'https://www.samsclub.com/p/teak-salad-server-set/prod24987',
      36
    ),
    priceHistory: [
      { date: '2025-11-10', price: 38, note: 'Original retail' },
      { date: '2026-01-20', price: 30, note: 'Post-holiday clearance' },
      { date: '2026-04-18', price: 36, note: 'Artisan craft restock' },
      { date: '2026-07-11', price: 36, note: 'Current shelf price' }
    ],
    overallRating: 4.2,
    repurchase: 'maybe',
    imageUrl: 'https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&w=800&q=80',
    usageDuration: '7 months',
    reviewText: 'Beautiful organic grain and great ergonomic shape. Needs regular mineral oil conditioning to prevent dryness.',
    pros: ['Warm organic wood grain', 'Comfortable grip', 'Does not scratch delicate bowls'],
    cons: ['Hand-wash only', 'Requires occasional oiling'],
    dimensions: {
      quality: 4.3,
      value: 4.0,
      longevity: 4.1,
      aesthetic: 4.7,
      performance: 4.0
    },
    tags: ['Solid Teak', 'Handmade', 'Entertaining'],
    dateRated: '2026-07-11',
    isFavorite: false
  },
  {
    id: 'prod-10',
    name: 'Telescopic Lift Washable Mascara',
    brand: "L'Oréal Paris",
    category: 'makeup',
    subCategory: 'Eyes',
    price: 15,
    currency: '$',
    primaryRetailer: 'walmart',
    sourceUrl: 'https://www.walmart.com/ip/L-Oreal-Paris-Telescopic-Lift-Washable-Mascara-Black/157294871',
    retailers: buildProductRetailerLinks(
      'Telescopic Lift Washable Mascara',
      "L'Oréal Paris",
      'makeup',
      'walmart',
      'https://www.walmart.com/ip/L-Oreal-Paris-Telescopic-Lift-Washable-Mascara-Black/157294871',
      15
    ),
    priceHistory: [
      { date: '2025-12-01', price: 14, note: 'Launch price' },
      { date: '2026-03-15', price: 12, note: 'Drugstore BOGO event' },
      { date: '2026-06-01', price: 15, note: 'Inflation adjustment' },
      { date: '2026-08-18', price: 15, note: 'Current shelf price' }
    ],
    overallRating: 4.3,
    repurchase: 'definitely',
    imageUrl: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80',
    usageDuration: '6 months',
    reviewText: 'Distinct comb bristles grab even tiny corner lashes. Lengthens without clumping and does not flake onto under-eyes.',
    pros: ['Affordable drugstore price', 'Crazy lash separation', 'Zero flaking during workday'],
    cons: ['Formula is wet when fresh, needs a week to hit sweet spot'],
    dimensions: {
      quality: 4.4,
      value: 4.9,
      longevity: 4.5,
      aesthetic: 3.8,
      performance: 4.6
    },
    tags: ['Lengthening', 'Budget Friendly', 'Comb Wand'],
    dateRated: '2026-08-18',
    isFavorite: false
  }
];

export const CATEGORY_METRIC_LABELS: Record<string, {
  quality: string;
  value: string;
  longevity: string;
  aesthetic: string;
  performance: string;
}> = {
  makeup: {
    quality: 'Formula Quality',
    value: 'Value for Money',
    longevity: 'Wear Time & Staying Power',
    aesthetic: 'Finish & Packaging',
    performance: 'Blendability & Pigment'
  },
  skincare: {
    quality: 'Ingredient Formulation',
    value: 'Cost per Oz',
    longevity: 'Hydration Longevity',
    aesthetic: 'Texture & Absorbency',
    performance: 'Visible Results'
  },
  homewares: {
    quality: 'Material & Craftsmanship',
    value: 'Price to Quality Ratio',
    longevity: 'Durability over Time',
    aesthetic: 'Design & Visual Warmth',
    performance: 'Comfort & Utility'
  },
  kitchen: {
    quality: 'Build & Materials',
    value: 'Investment Worthiness',
    longevity: 'Wear & Tear Resistance',
    aesthetic: 'Countertop Aesthetic',
    performance: 'Ease of Use & Cleaning'
  },
  decor: {
    quality: 'Finishing & Weight',
    value: 'Styling Versatility',
    longevity: 'Timelessness',
    aesthetic: 'Sculptural Appeal',
    performance: 'Spatial Presence'
  }
};
