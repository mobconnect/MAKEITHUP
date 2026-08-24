import { ProductCategory, RetailerKey, RetailerLink } from '../types';
import { buildProductRetailerLinks } from '../utils/retailerData';

export interface CatalogItem {
  id: string;
  name: string;
  brand: string;
  category: ProductCategory;
  subCategory: string;
  price: number;
  currency: string;
  communityRating: number;
  imageUrl: string;
  description: string;
  highlights: string[];
  sourceUrl?: string; // Website address where product is being viewed
  primaryRetailer?: RetailerKey | string;
  retailers?: RetailerLink[];
  dimensions: {
    quality: number;
    value: number;
    longevity: number;
    aesthetic: number;
    performance: number;
  };
  tags: string[];
}

export const DISCOVER_CATALOG: CatalogItem[] = [
  // Makeup
  {
    id: 'disc-1',
    name: 'Airbrush Flawless Setting Spray',
    brand: 'Charlotte Tilbury',
    category: 'makeup',
    subCategory: 'Setting Spray',
    price: 38,
    currency: '$',
    communityRating: 4.8,
    primaryRetailer: 'sephora',
    sourceUrl: 'https://www.sephora.com/product/charlotte-tilbury-airbrush-flawless-setting-spray-P461110',
    retailers: buildProductRetailerLinks(
      'Airbrush Flawless Setting Spray',
      'Charlotte Tilbury',
      'makeup',
      'sephora',
      'https://www.sephora.com/product/charlotte-tilbury-airbrush-flawless-setting-spray-P461110',
      38
    ),
    imageUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
    description: 'A weightless, pore-blurring setting spray that locks makeup in place for up to 16 hours with green tea and aloe leaf extracts.',
    highlights: ['Micro-fine mist nozzle', '16-hr locked finish', 'Pore blurring'],
    dimensions: { quality: 4.9, value: 4.3, longevity: 5.0, aesthetic: 4.8, performance: 4.9 },
    tags: ['Longwear', 'Pore Blurring', 'Weightless', 'Luxury', 'High Pigment']
  },
  {
    id: 'disc-2',
    name: 'Cheeks Out Freestyle Cream Blush in Petal Poppin',
    brand: 'Fenty Beauty',
    category: 'makeup',
    subCategory: 'Blush',
    price: 26,
    currency: '$',
    communityRating: 4.6,
    primaryRetailer: 'sephora',
    sourceUrl: 'https://www.sephora.com/product/fenty-beauty-rihanna-cheeks-out-freestyle-cream-blush-P457930',
    retailers: buildProductRetailerLinks(
      'Cheeks Out Freestyle Cream Blush in Petal Poppin',
      'Fenty Beauty',
      'makeup',
      'sephora',
      'https://www.sephora.com/product/fenty-beauty-rihanna-cheeks-out-freestyle-cream-blush-P457930',
      26
    ),
    imageUrl: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=80',
    description: 'Light-as-air, non-greasy cream blush that melts effortlessly into skin for a natural wash of color.',
    highlights: ['Sheer buildable glow', 'Sweat resistant', 'Non-sticky'],
    dimensions: { quality: 4.7, value: 4.5, longevity: 4.3, aesthetic: 4.7, performance: 4.6 },
    tags: ['Dewy', 'Cream Formula', 'Cruelty Free', 'High Pigment', 'Natural Finish']
  },
  {
    id: 'disc-3',
    name: 'Almost Lipstick in Black Honey',
    brand: 'Clinique',
    category: 'makeup',
    subCategory: 'Lip Tint',
    price: 24,
    currency: '$',
    communityRating: 4.7,
    primaryRetailer: 'ulta',
    sourceUrl: 'https://www.ulta.com/p/almost-lipstick-black-honey-xlsImpprod10791743',
    retailers: buildProductRetailerLinks(
      'Almost Lipstick in Black Honey',
      'Clinique',
      'makeup',
      'ulta',
      'https://www.ulta.com/p/almost-lipstick-black-honey-xlsImpprod10791743',
      24
    ),
    imageUrl: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=800&q=80',
    description: 'Cult-classic sheer blackberry tint that merges with the unique undertones of your lips to create a custom flattering shade.',
    highlights: ['Adaptive sheer pigment', 'Balm cushion feel', 'Universal undertone'],
    dimensions: { quality: 4.8, value: 4.6, longevity: 3.8, aesthetic: 4.6, performance: 4.8 },
    tags: ['Cult Classic', 'Sheer', 'Glossy', 'Hydrating', 'Everyday']
  },
  {
    id: 'disc-4',
    name: 'Hollywood Flawless Filter Complexion Booster',
    brand: 'Charlotte Tilbury',
    category: 'makeup',
    subCategory: 'Primer / Glow',
    price: 49,
    currency: '$',
    communityRating: 4.7,
    primaryRetailer: 'mecca',
    sourceUrl: 'https://www.mecca.com/en-au/charlotte-tilbury/hollywood-flawless-filter-V-031868/',
    retailers: buildProductRetailerLinks(
      'Hollywood Flawless Filter Complexion Booster',
      'Charlotte Tilbury',
      'makeup',
      'mecca',
      'https://www.mecca.com/en-au/charlotte-tilbury/hollywood-flawless-filter-V-031868/',
      49
    ),
    imageUrl: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80',
    description: 'A customizable complexion booster that delivers an illuminated, filtered glow with smoothing squalane oils.',
    highlights: ['Glass-skin radiance', 'Wear solo or under foundation', 'Smooth blurring polymers'],
    dimensions: { quality: 4.8, value: 3.9, longevity: 4.4, aesthetic: 5.0, performance: 4.8 },
    tags: ['Glow', 'Dewy', 'Luxury', 'Complexion', 'Glass Skin']
  },

  // Skincare
  {
    id: 'disc-5',
    name: 'Water Drench Hyaluronic Cloud Cream Hydrating Moisturizer',
    brand: 'Peter Thomas Roth',
    category: 'skincare',
    subCategory: 'Moisturizer',
    price: 54,
    currency: '$',
    communityRating: 4.8,
    primaryRetailer: 'costco',
    sourceUrl: 'https://www.costco.com/peter-thomas-roth-water-drench-hyaluronic-cloud-cream.html',
    retailers: buildProductRetailerLinks(
      'Water Drench Hyaluronic Cloud Cream Hydrating Moisturizer',
      'Peter Thomas Roth',
      'skincare',
      'costco',
      'https://www.costco.com/peter-thomas-roth-water-drench-hyaluronic-cloud-cream.html',
      54
    ),
    imageUrl: 'https://images.unsplash.com/photo-1608248597359-38374a5893a7?auto=format&fit=crop&w=800&q=80',
    description: '30% hyaluronic acid complex that draws in pure atmospheric moisture for continuous 72-hour hydration.',
    highlights: ['Cloud-light whip texture', 'Fragrance free', 'Plumping peptides'],
    dimensions: { quality: 4.9, value: 4.2, longevity: 4.8, aesthetic: 4.6, performance: 4.9 },
    tags: ['Barrier Support', 'Hydrating', 'Fragrance-Free', 'Plumping', 'Peptides']
  },
  {
    id: 'disc-6',
    name: 'Cicapair Tiger Grass Sleepair Intensive Mask',
    brand: 'Dr. Jart+',
    category: 'skincare',
    subCategory: 'Overnight Mask',
    price: 42,
    currency: '$',
    communityRating: 4.6,
    primaryRetailer: 'sephora',
    sourceUrl: 'https://www.sephora.com/product/dr-jart-cicapair-tiger-grass-sleepair-intensive-mask-P454378',
    retailers: buildProductRetailerLinks(
      'Cicapair Tiger Grass Sleepair Intensive Mask',
      'Dr. Jart+',
      'skincare',
      'sephora',
      'https://www.sephora.com/product/dr-jart-cicapair-tiger-grass-sleepair-intensive-mask-P454378',
      42
    ),
    imageUrl: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80',
    description: 'Intensive gel-cream overnight treatment infused with Centella Asiatica to soothe redness and restore tired, stressed skin barriers.',
    highlights: ['Calms redness rapidly', 'Jelly lock texture', 'Centella Asiatica'],
    dimensions: { quality: 4.7, value: 4.4, longevity: 4.7, aesthetic: 4.5, performance: 4.7 },
    tags: ['Barrier Support', 'Centella', 'Calming', 'Overnight', 'Sensitive Skin']
  },
  {
    id: 'disc-7',
    name: 'Squalane + Amino Aloe Gentle Cleanser',
    brand: 'Biossance',
    category: 'skincare',
    subCategory: 'Cleanser',
    price: 28,
    currency: '$',
    communityRating: 4.7,
    primaryRetailer: 'walmart',
    sourceUrl: 'https://www.walmart.com/ip/Biossance-Squalane-Amino-Aloe-Gentle-Cleanser-200ml/94318721',
    retailers: buildProductRetailerLinks(
      'Squalane + Amino Aloe Gentle Cleanser',
      'Biossance',
      'skincare',
      'walmart',
      'https://www.walmart.com/ip/Biossance-Squalane-Amino-Aloe-Gentle-Cleanser-200ml/94318721',
      28
    ),
    imageUrl: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80',
    description: 'Foaming jelly cleanser that removes daily grime and makeup without stripping the skin mantle.',
    highlights: ['Sustainably sourced squalane', 'No tight feeling after wash', 'Cruelty free'],
    dimensions: { quality: 4.8, value: 4.6, longevity: 4.5, aesthetic: 4.7, performance: 4.8 },
    tags: ['Clean', 'Cruelty Free', 'Barrier Support', 'Gentle', 'Hydrating']
  },

  // Homewares & Linen
  {
    id: 'disc-8',
    name: 'French Flax Linen Waffle Bath Towel Set',
    brand: 'Bed Threads',
    category: 'homewares',
    subCategory: 'Bath & Towels',
    price: 90,
    currency: '$',
    communityRating: 4.7,
    primaryRetailer: 'big_w',
    sourceUrl: 'https://www.bigw.com.au/home-appliances/bathroom/towels',
    retailers: buildProductRetailerLinks(
      'French Flax Linen Waffle Bath Towel Set',
      'Bed Threads',
      'homewares',
      'big_w',
      'https://www.bigw.com.au/home-appliances/bathroom/towels',
      90
    ),
    imageUrl: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80',
    description: 'Generously sized waffle texture woven from 100% French flax linen. Highly absorbent, fast-drying, and naturally antibacterial.',
    highlights: ['100% French Flax', 'Honeycomb waffle weave', 'Dries twice as fast as cotton'],
    dimensions: { quality: 4.9, value: 4.4, longevity: 4.9, aesthetic: 4.9, performance: 4.7 },
    tags: ['100% Flax', 'Pre-washed', 'Breathable', 'Textured', 'Sustainable']
  },
  {
    id: 'disc-9',
    name: 'Hand-Poured Amber Santal Diffuser',
    brand: 'Brooklinen',
    category: 'homewares',
    subCategory: 'Home Fragrance',
    price: 48,
    currency: '$',
    communityRating: 4.6,
    primaryRetailer: 'kmart',
    sourceUrl: 'https://www.kmart.com.au/category/home-living/home-decor/reed-diffusers/',
    retailers: buildProductRetailerLinks(
      'Hand-Poured Amber Santal Diffuser',
      'Brooklinen',
      'homewares',
      'kmart',
      'https://www.kmart.com.au/category/home-living/home-decor/reed-diffusers/',
      48
    ),
    imageUrl: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=800&q=80',
    description: 'Rich santal, cardamom, and amber reed diffuser delivering steady, flame-free botanical aroma for 4+ months.',
    highlights: ['4+ months continuous throw', 'Minimalist apothecary vessel', 'Natural rattan reeds'],
    dimensions: { quality: 4.6, value: 4.4, longevity: 4.8, aesthetic: 4.9, performance: 4.6 },
    tags: ['Amber Jar', 'Clean Burn', 'Minimalist', 'Aroma', 'Warmth']
  },
  {
    id: 'disc-10',
    name: 'Chunky Merino Wool Weighted Throw',
    brand: 'Bearaby',
    category: 'homewares',
    subCategory: 'Blankets',
    price: 199,
    currency: '$',
    communityRating: 4.9,
    primaryRetailer: 'costco',
    sourceUrl: 'https://www.costco.com/bearaby-chunky-knit-weighted-blanket.html',
    retailers: buildProductRetailerLinks(
      'Chunky Merino Wool Weighted Throw',
      'Bearaby',
      'homewares',
      'costco',
      'https://www.costco.com/bearaby-chunky-knit-weighted-blanket.html',
      199
    ),
    imageUrl: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=800&q=80',
    description: 'Hand-knit, breathable weighted blanket made from sustainable organic yarn for restorative relaxation and even pressure.',
    highlights: ['Evenly distributed open knit', 'No plastic bead fillers', 'Therapeutic weight'],
    dimensions: { quality: 5.0, value: 4.3, longevity: 4.9, aesthetic: 5.0, performance: 5.0 },
    tags: ['Organic', 'Heirloom', 'Breathable', 'Handmade', 'Cozy']
  },

  // Kitchen
  {
    id: 'disc-11',
    name: 'Ode Gen 2 Brew Grinder',
    brand: 'Fellow',
    category: 'kitchen',
    subCategory: 'Coffee Equipment',
    price: 345,
    currency: '$',
    communityRating: 4.9,
    primaryRetailer: 'williams_sonoma',
    sourceUrl: 'https://www.williams-sonoma.com/products/fellow-ode-gen-2-coffee-grinder/',
    retailers: buildProductRetailerLinks(
      'Ode Gen 2 Brew Grinder',
      'Fellow',
      'kitchen',
      'williams_sonoma',
      'https://www.williams-sonoma.com/products/fellow-ode-gen-2-coffee-grinder/',
      345
    ),
    imageUrl: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=800&q=80',
    description: 'Precision home coffee grinder with 64mm professional-grade flat burrs, anti-static technology, and ultra-quiet motor.',
    highlights: ['64mm flat burrs', 'Anti-static chute', 'Quiet auto-stop motor'],
    dimensions: { quality: 5.0, value: 4.3, longevity: 4.9, aesthetic: 5.0, performance: 5.0 },
    tags: ['PID Controller', 'Matte Black', 'Precision', 'Coffee', 'Minimalist']
  },
  {
    id: 'disc-12',
    name: 'Always Pan 2.0 Nonstick Skillet',
    brand: 'Our Place',
    category: 'kitchen',
    subCategory: 'Cookware',
    price: 150,
    currency: '$',
    communityRating: 4.4,
    primaryRetailer: 'sams_club',
    sourceUrl: 'https://www.samsclub.com/p/our-place-always-pan-2-set/prod25114',
    retailers: buildProductRetailerLinks(
      'Always Pan 2.0 Nonstick Skillet',
      'Our Place',
      'kitchen',
      'sams_club',
      'https://www.samsclub.com/p/our-place-always-pan-2-set/prod25114',
      150
    ),
    imageUrl: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=800&q=80',
    description: 'An 8-in-1 multi-cookware pan with non-toxic Thermakind ceramic coating, built-in beechwood spoon rest, and nesting steamer basket.',
    highlights: ['Toxin-free nonstick', 'Modular beechwood spatula rest', 'Oven safe to 450°F'],
    dimensions: { quality: 4.3, value: 4.2, longevity: 4.0, aesthetic: 5.0, performance: 4.5 },
    tags: ['Enameled Iron', 'Nonstick', 'Oven Safe', 'Countertop', 'Minimalist']
  },
  {
    id: 'disc-13',
    name: 'Japanese Stainless Steel Chef Knife (8-inch)',
    brand: 'Misen',
    category: 'kitchen',
    subCategory: 'Cutlery',
    price: 75,
    currency: '$',
    communityRating: 4.8,
    primaryRetailer: 'ikea',
    sourceUrl: 'https://www.ikea.com/us/en/cat/knives-knife-blocks-15948/',
    retailers: buildProductRetailerLinks(
      'Japanese Stainless Steel Chef Knife (8-inch)',
      'Misen',
      'kitchen',
      'ikea',
      'https://www.ikea.com/us/en/cat/knives-knife-blocks-15948/',
      75
    ),
    imageUrl: 'https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&w=800&q=80',
    description: 'AICHI AUS-10 high-carbon Japanese steel with a sloped bolster and razor-sharp 15-degree blade angle for effortless prep work.',
    highlights: ['AUS-10 Japanese steel', '15° acute edge', 'Ergonomic sloped bolster'],
    dimensions: { quality: 4.9, value: 4.9, longevity: 4.8, aesthetic: 4.6, performance: 4.9 },
    tags: ['Heirloom', 'Precision', 'Handmade', 'Stainless', 'Investment Worthy']
  },

  // Decor & Home Improvement
  {
    id: 'disc-14',
    name: 'Nordic Dough Arch Stoneware Vessel',
    brand: 'Ferm Living',
    category: 'decor',
    subCategory: 'Ceramics',
    price: 85,
    currency: '$',
    communityRating: 4.7,
    primaryRetailer: 'bunnings',
    sourceUrl: 'https://www.bunnings.com.au/products/home-decor/decorative-pots',
    retailers: buildProductRetailerLinks(
      'Nordic Dough Arch Stoneware Vessel',
      'Ferm Living',
      'decor',
      'bunnings',
      'https://www.bunnings.com.au/products/home-decor/decorative-pots',
      85
    ),
    imageUrl: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80',
    description: 'Architectural ceramic vessel finished with an unglazed raw exterior and water-sealed interior glaze.',
    highlights: ['Matte tactile exterior', 'Architectural arch silhouette', 'Watertight interior'],
    dimensions: { quality: 4.8, value: 4.4, longevity: 4.9, aesthetic: 5.0, performance: 4.5 },
    tags: ['Matte Glaze', 'Minimalist', 'Sculptural', 'Ceramic', 'Warm Neutral']
  },
  {
    id: 'disc-15',
    name: 'Portable Rechargeable Mushroom Table Lamp',
    brand: '&Tradition',
    category: 'decor',
    subCategory: 'Lighting',
    price: 195,
    currency: '$',
    communityRating: 4.8,
    primaryRetailer: 'ikea',
    sourceUrl: 'https://www.ikea.com/us/en/cat/table-lamps-10732/',
    retailers: buildProductRetailerLinks(
      'Portable Rechargeable Mushroom Table Lamp',
      '&Tradition',
      'decor',
      'ikea',
      'https://www.ikea.com/us/en/cat/table-lamps-10732/',
      195
    ),
    imageUrl: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80',
    description: 'Iconic Flowerpot VP9 cordless table lamp by Verner Panton with 3-level touch dimmer and 10 hours of warm ambient glow.',
    highlights: ['3-stage touch dimmer', 'Cordless rechargeable battery', 'Iconic Danish silhouette'],
    dimensions: { quality: 4.9, value: 4.2, longevity: 4.8, aesthetic: 5.0, performance: 4.8 },
    tags: ['Sculptural', 'Minimalist', 'Cordless', 'Warm Glow', 'Danish Design']
  }
];

