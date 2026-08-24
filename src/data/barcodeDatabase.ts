import { BarcodeScannedProduct, ProductCategory, RetailerKey } from '../types';

export const BARCODE_DATABASE: Record<string, BarcodeScannedProduct> = {
  // === KITCHEN & HOMEWARES ===
  '024147276555': {
    barcode: '024147276555',
    barcodeFormat: 'UPC_A',
    name: 'Signature Enameled Cast Iron Dutch Oven (5.5 Qt)',
    brand: 'Le Creuset',
    category: 'kitchen',
    subCategory: 'Cookware',
    price: 420,
    currency: 'USD',
    imageUrl: 'https://images.unsplash.com/photo-1584990347449-3990666324a3?auto=format&fit=crop&w=800&q=80',
    description: 'Iconic French enameled cast iron Dutch oven with sand-colored interior enamel and composite ergonomic knob. Unrivaled heat distribution and retention.',
    sourceUrl: 'https://www.williams-sonoma.com/products/le-creuset-signature-round-dutch-oven/',
    primaryRetailer: 'williams_sonoma',
    tags: ['Cast Iron', 'French Cookware', 'Heirloom', 'Induction Safe', '5.5 Qt'],
    specs: [
      { label: 'Capacity', value: '5.5 Quarts / 5.2 Liters' },
      { label: 'Material', value: 'Enameled Cast Iron' },
      { label: 'Heat Limit', value: 'Oven safe up to 500°F (260°C)' },
      { label: 'Origin', value: 'Handcrafted in Fresnoy-le-Grand, France' }
    ],
    durabilityProfile: {
      durabilityScore: 5.0,
      expectedLifespan: 'Lifetime (Generational Heirloom)',
      materialComposition: 'Triple-fired porcelain enamel over virgin cast iron core',
      maintenanceTips: 'Hand wash with nylon scrubbers and warm soapy water. Never submerge hot pot into cold water to prevent thermal shock crazing.',
      wearResistance: 'Exceptional',
      testedUsage: 'Resistant to acid chipping, rust, and thermal stress across 30+ years of daily searing and slow-braising.'
    },
    storeLocations: [
      {
        storeName: 'Williams Sonoma Flagship',
        chainKey: 'williams_sonoma',
        department: 'Cookware & Dutch Ovens',
        aisle: 'Aisle 3',
        bayOrSection: 'French Heritage Feature Bay',
        stockStatus: 'In Stock',
        price: 420,
        localFinderUrl: 'https://www.williams-sonoma.com/stores/',
        addressHint: 'Main Cookware Gallery'
      },
      {
        storeName: 'Costco Wholesale',
        chainKey: 'costco',
        department: 'Gourmet Kitchenware',
        aisle: 'Aisle 12',
        bayOrSection: 'Pallet Center Island',
        stockStatus: 'Limited Stock',
        price: 389.99,
        localFinderUrl: 'https://www.costco.com/warehouse-locations',
        addressHint: 'Kitchen Special Event Display'
      },
      {
        storeName: 'Bunnings Warehouse',
        chainKey: 'bunnings',
        department: 'Outdoor Kitchen & Cast Iron Cookware',
        aisle: 'Aisle 28',
        bayOrSection: 'Camp & Cast Iron Display',
        stockStatus: 'Online & In-Store',
        price: 435,
        localFinderUrl: 'https://www.bunnings.com.au/stores',
        addressHint: 'BBQ & Kitchen Pavilion'
      }
    ],
    defaultRating: {
      quality: 5,
      value: 4,
      longevity: 5,
      aesthetic: 5,
      performance: 5,
      overall: 4.8,
      repurchase: 'definitely'
    }
  },

  '850005477209': {
    barcode: '850005477209',
    barcodeFormat: 'UPC_A',
    name: 'Ode Gen 2 Precision Conical Burr Coffee Grinder',
    brand: 'Fellow',
    category: 'kitchen',
    subCategory: 'Coffee & Tea',
    price: 345,
    currency: 'USD',
    imageUrl: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&w=800&q=80',
    description: 'High-precision countertop coffee grinder with 64mm stainless steel flat burrs, 31 grind settings, anti-static ion technology, and quiet auto-stop motor.',
    sourceUrl: 'https://fellowproducts.com/products/ode-gen-2-brew-grinder',
    primaryRetailer: 'williams_sonoma',
    tags: ['64mm Flat Burrs', 'Quiet Motor', 'Single Dose', 'Anti-Static'],
    specs: [
      { label: 'Burrs', value: '64mm Professional Stainless Steel' },
      { label: 'Power', value: '140W Direct-Drive Motor with PID feedback' },
      { label: 'Capacity', value: '100g Single-Dose Hopper' }
    ],
    durabilityProfile: {
      durabilityScore: 4.8,
      expectedLifespan: '8-12 Years (Burrs rated for 1,000+ lbs beans)',
      materialComposition: 'Anodized aluminum chassis, stainless steel burrs, silicone hopper gasket',
      maintenanceTips: 'Use provided cleaning brush fortnightly. Avoid running water through burr chamber; disassemble burrs every 6 months for deep brushing.',
      wearResistance: 'High',
      testedUsage: 'Tested through 1,800 grinding cycles with zero motor degradation or burr drift.'
    },
    storeLocations: [
      {
        storeName: 'Williams Sonoma',
        chainKey: 'williams_sonoma',
        department: 'Specialty Coffee & Espresso',
        aisle: 'Aisle 6',
        bayOrSection: 'Third Wave Coffee Bar',
        stockStatus: 'In Stock',
        price: 345,
        localFinderUrl: 'https://www.williams-sonoma.com/stores/'
      },
      {
        storeName: 'Target',
        chainKey: 'target',
        department: 'Small Appliances',
        aisle: 'Aisle G24',
        bayOrSection: 'Premium Coffee Display',
        stockStatus: 'Online & In-Store',
        price: 345,
        localFinderUrl: 'https://www.target.com/store-locator/find-stores'
      }
    ],
    defaultRating: {
      quality: 5,
      value: 4,
      longevity: 5,
      aesthetic: 5,
      performance: 5,
      overall: 4.8,
      repurchase: 'definitely'
    }
  },

  '850021612011': {
    barcode: '850021612011',
    barcodeFormat: 'UPC_A',
    name: 'Always Pan 2.0 Multi-Cooker',
    brand: 'Our Place',
    category: 'kitchen',
    subCategory: 'Cookware',
    price: 150,
    currency: 'USD',
    imageUrl: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80',
    description: '10-in-1 modular pan made with recycled aluminum and non-toxic ceramic Thermakind nonstick coating, featuring nested beechwood spatula and steamer basket.',
    sourceUrl: 'https://fromourplace.com/products/always-essential-cooking-pan',
    primaryRetailer: 'target',
    tags: ['Ceramic Nonstick', '10-in-1', 'PTFE-Free', 'Modular'],
    specs: [
      { label: 'Diameter', value: '10.5 in / 26.7 cm' },
      { label: 'Coating', value: 'Thermakind ceramic coating (lead & cadmium free)' },
      { label: 'Weight', value: '3.0 lbs (with lid)' }
    ],
    durabilityProfile: {
      durabilityScore: 3.8,
      expectedLifespan: '2-4 Years (Ceramic coating wears with high heat)',
      materialComposition: 'Post-consumer recycled cast aluminum with ceramic nonstick matrix',
      maintenanceTips: 'Strictly hand wash only. Use low-to-medium heat; never use metal utensils or aerosol cooking sprays which degrade ceramic particles.',
      wearResistance: 'Moderate',
      testedUsage: 'Maintains slippery egg release for 400+ uses when kept below 400°F.'
    },
    storeLocations: [
      {
        storeName: 'Target Supercenter',
        chainKey: 'target',
        department: 'Kitchen & Dining',
        aisle: 'Aisle C18',
        bayOrSection: 'Design Essentials Feature',
        stockStatus: 'In Stock',
        price: 150,
        localFinderUrl: 'https://www.target.com/store-locator/find-stores'
      },
      {
        storeName: 'Big W',
        chainKey: 'big_w',
        department: 'Cookware Essentials',
        aisle: 'Aisle 14',
        bayOrSection: 'Modern Kitchenware',
        stockStatus: 'Online & In-Store',
        price: 189,
        localFinderUrl: 'https://www.bigw.com.au/store-finder'
      }
    ],
    defaultRating: {
      quality: 4,
      value: 3,
      longevity: 3,
      aesthetic: 5,
      performance: 4,
      overall: 3.8,
      repurchase: 'maybe'
    }
  },

  // === MAKEUP & BEAUTY ===
  '840122900012': {
    barcode: '840122900012',
    barcodeFormat: 'UPC_A',
    name: 'Soft Pinch Liquid Dewy Blush (Joy)',
    brand: 'Rare Beauty',
    category: 'makeup',
    subCategory: 'Blush',
    price: 23,
    currency: 'USD',
    imageUrl: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=80',
    description: 'Weightless, long-lasting liquid blush that blends seamlessly into skin with botanical lotus and gardenia extracts for a soft, healthy flush.',
    sourceUrl: 'https://www.sephora.com/product/rare-beauty-by-selena-gomez-soft-pinch-liquid-blush-P97989778',
    primaryRetailer: 'sephora',
    tags: ['Liquid Blush', 'High Pigment', 'Dewy Finish', 'Clean Beauty'],
    specs: [
      { label: 'Volume', value: '7.5 mL / 0.25 fl oz' },
      { label: 'Finish', value: 'Dewy Radiant Glow' },
      { label: 'Formulation', value: 'Weightless concentrated botanical emulsion' }
    ],
    durabilityProfile: {
      durabilityScore: 4.9,
      expectedLifespan: '14-18 Months (Only 1 micro-dot needed per cheek; bottle lasts over 400 applications)',
      materialComposition: 'UV-resistant frosted glass vial with soft-touch silicone grip cap',
      maintenanceTips: 'Store upright at room temperature. Wipe doe-foot neck occasionally to prevent cosmetic crusting.',
      wearResistance: 'Exceptional',
      testedUsage: '14-hour crease-proof wear on combination skin with zero fading or patchiness.'
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
        storeName: 'Mecca Maxima',
        chainKey: 'mecca',
        department: 'Trending Color Cosmetics',
        aisle: 'Aisle 2',
        bayOrSection: 'Selena Gomez Stand',
        stockStatus: 'In Stock',
        price: 39,
        localFinderUrl: 'https://www.mecca.com/en-au/store-locator/'
      },
      {
        storeName: 'Big W',
        chainKey: 'big_w',
        department: 'Beauty & Fragrance',
        aisle: 'Aisle 7',
        bayOrSection: 'Prestige Counter',
        stockStatus: 'Limited Stock',
        price: 36,
        localFinderUrl: 'https://www.bigw.com.au/store-finder'
      }
    ],
    defaultRating: {
      quality: 5,
      value: 5,
      longevity: 5,
      aesthetic: 5,
      performance: 5,
      overall: 5.0,
      repurchase: 'definitely'
    }
  },

  '5060542721836': {
    barcode: '5060542721836',
    barcodeFormat: 'EAN_13',
    name: 'Airbrush Flawless Finish Micro-Powder',
    brand: 'Charlotte Tilbury',
    category: 'makeup',
    subCategory: 'Setting Powder',
    price: 48,
    currency: 'USD',
    imageUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
    description: 'Micro-fine finishing powder with sweet almond oil and rose wax that blurs pores, smoothes fine lines, and controls shine with zero flashback.',
    sourceUrl: 'https://www.sephora.com/product/airbrush-flawless-finish-setting-powder-P433526',
    primaryRetailer: 'sephora',
    tags: ['Micro-milled', 'Pore Blurring', 'Rose Wax', 'Luxe Compact'],
    specs: [
      { label: 'Weight', value: '8.0g / 0.28 oz' },
      { label: 'Finish', value: 'Soft Focus Matte' },
      { label: 'Packaging', value: 'Rose gold gilded weighted compact with mirror' }
    ],
    durabilityProfile: {
      durabilityScore: 4.7,
      expectedLifespan: '8-12 Months of daily powder setting',
      materialComposition: 'Pressed micro-fine botanical powder in drop-reinforced metal alloy compact',
      maintenanceTips: 'Keep magnetic clasp snapped shut; clean compact mirror with microfiber cloth.',
      wearResistance: 'High',
      testedUsage: '12-hour oil absorption without settling into micro-expression lines.'
    },
    storeLocations: [
      {
        storeName: 'Sephora',
        chainKey: 'sephora',
        department: 'Luxury Complexion',
        aisle: 'Aisle 1',
        bayOrSection: 'Charlotte Tilbury Magic Counter',
        stockStatus: 'In Stock',
        price: 48,
        localFinderUrl: 'https://www.sephora.com/happening/stores/sephora-near-me'
      },
      {
        storeName: 'Ulta Beauty',
        chainKey: 'ulta',
        department: 'Prestige Cosmetics',
        aisle: 'Aisle 3',
        bayOrSection: 'Glow Bar',
        stockStatus: 'In Stock',
        price: 48,
        localFinderUrl: 'https://www.ulta.com/stores'
      }
    ],
    defaultRating: {
      quality: 5,
      value: 4,
      longevity: 5,
      aesthetic: 5,
      performance: 5,
      overall: 4.8,
      repurchase: 'definitely'
    }
  },

  '020714155557': {
    barcode: '020714155557',
    barcodeFormat: 'UPC_A',
    name: 'Almost Lipstick in Black Honey',
    brand: 'Clinique',
    category: 'makeup',
    subCategory: 'Lip Care',
    price: 25,
    currency: 'USD',
    imageUrl: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=800&q=80',
    description: 'Cult-classic sheer chameleon lip balm that transforms upon contact with your lip chemistry to create a universally flattering berry stain.',
    sourceUrl: 'https://www.ulta.com/p/almost-lipstick-xlsImpprod10791737',
    primaryRetailer: 'ulta',
    tags: ['Universal Tint', 'Black Honey', 'Sheer Hydration', 'Cult Classic'],
    specs: [
      { label: 'Weight', value: '1.9g / 0.06 oz' },
      { label: 'Finish', value: 'Translucent Hydrating Sheen' }
    ],
    durabilityProfile: {
      durabilityScore: 4.3,
      expectedLifespan: '6-9 Months daily pocket wear',
      materialComposition: 'Emollient castor wax base inside slim aluminum swivel casing',
      maintenanceTips: 'Avoid leaving in hot vehicles to prevent softening of the sheer formula core.',
      wearResistance: 'High',
      testedUsage: 'Provides 4-5 hours of comfortable balm hydration with a lingering natural berry flush.'
    },
    storeLocations: [
      {
        storeName: 'Ulta Beauty',
        chainKey: 'ulta',
        department: 'Clinique Clean Counter',
        aisle: 'Aisle 2',
        bayOrSection: 'Top Lip Favorites Display',
        stockStatus: 'In Stock',
        price: 25,
        localFinderUrl: 'https://www.ulta.com/stores'
      },
      {
        storeName: 'Target',
        chainKey: 'target',
        department: 'Ulta Beauty at Target',
        aisle: 'Aisle B14',
        bayOrSection: 'Viral TikTok Beauty Wall',
        stockStatus: 'In Stock',
        price: 25,
        localFinderUrl: 'https://www.target.com/store-locator/find-stores'
      },
      {
        storeName: 'Big W',
        chainKey: 'big_w',
        department: 'Pharmacy & Cosmetics',
        aisle: 'Aisle 8',
        bayOrSection: 'Clinique Station',
        stockStatus: 'In Stock',
        price: 32,
        localFinderUrl: 'https://www.bigw.com.au/store-finder'
      }
    ],
    defaultRating: {
      quality: 5,
      value: 4,
      longevity: 4,
      aesthetic: 5,
      performance: 5,
      overall: 4.6,
      repurchase: 'definitely'
    }
  },

  // === SKINCARE ===
  '3606000537736': {
    barcode: '3606000537736',
    barcodeFormat: 'EAN_13',
    name: 'Hyalu B5 Pure Hyaluronic Acid Serum',
    brand: 'La Roche-Posay',
    category: 'skincare',
    subCategory: 'Serums',
    price: 39,
    currency: 'USD',
    imageUrl: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80',
    description: 'Dermatologist-tested anti-aging serum with high & low molecular weight pure hyaluronic acid, madecassoside, and Vitamin B5 to plump skin barrier.',
    sourceUrl: 'https://www.laroche-posay.us/our-products/face-check/face-serum/hyalu-b5-pure-hyaluronic-acid-serum-3337875583626.html',
    primaryRetailer: 'ulta',
    tags: ['Hyaluronic Acid', 'Vitamin B5', 'Barrier Plumping', 'French Derm'],
    specs: [
      { label: 'Volume', value: '30 mL / 1.01 fl oz' },
      { label: 'Active Ingredients', value: 'Hyaluronic Acid, Vitamin B5 (Panthenol), Madecassoside' }
    ],
    durabilityProfile: {
      durabilityScore: 4.7,
      expectedLifespan: '3-4 Months per bottle (3-4 drops daily)',
      materialComposition: 'Cobalt UV-blocking medical grade dropper bottle with glass pipette',
      maintenanceTips: 'Store in a cool dark place away from direct humidity and sunlight to preserve active potency.',
      wearResistance: 'High',
      testedUsage: 'Maintains stability and deep moisture retention for 24 hours under makeup or SPF.'
    },
    storeLocations: [
      {
        storeName: 'Walmart Supercenter',
        chainKey: 'walmart',
        department: 'Derm Skincare & Pharmacy',
        aisle: 'Aisle B11',
        bayOrSection: 'French Pharmacy Shelf',
        stockStatus: 'In Stock',
        price: 39.50,
        localFinderUrl: 'https://www.walmart.com/store-finder'
      },
      {
        storeName: 'Ulta Beauty',
        chainKey: 'ulta',
        department: 'Derm Skincare Center',
        aisle: 'Aisle 8',
        bayOrSection: 'La Roche-Posay Tower',
        stockStatus: 'In Stock',
        price: 39.99,
        localFinderUrl: 'https://www.ulta.com/stores'
      },
      {
        storeName: 'Costco Wholesale',
        chainKey: 'costco',
        department: 'Health & Beauty Twin Packs',
        aisle: 'Aisle 5',
        bayOrSection: 'Skin Care Center',
        stockStatus: 'In Stock',
        price: 64.99,
        localFinderUrl: 'https://www.costco.com/warehouse-locations'
      }
    ],
    defaultRating: {
      quality: 5,
      value: 4,
      longevity: 5,
      aesthetic: 4,
      performance: 5,
      overall: 4.6,
      repurchase: 'definitely'
    }
  },

  // === HOMEWARES & HARDWARE ===
  '9312345678901': {
    barcode: '9312345678901',
    barcodeFormat: 'EAN_13',
    name: 'Handcrafted Terracotta Botanical Planter & Saucer (30cm)',
    brand: 'Northcote Pottery',
    category: 'homewares',
    subCategory: 'Planters',
    price: 38,
    currency: 'AUD',
    imageUrl: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=800&q=80',
    description: 'High-fired natural porous Italian clay pot with integrated drainage dish. Promotes root aeration and prevents root rot while aging with a vintage patina.',
    sourceUrl: 'https://www.bunnings.com.au/northcote-pottery-30cm-terracotta-florentine-pot_p2831204',
    primaryRetailer: 'bunnings',
    tags: ['Porous Clay', 'Frost Resistant', 'Bunnings Pick', '30cm Diameter'],
    specs: [
      { label: 'Diameter', value: '300mm / 11.8 in' },
      { label: 'Material', value: 'High-Fired Italian Terracotta Clay' },
      { label: 'Drainage', value: 'Center bottom aperture with matched saucer' }
    ],
    durabilityProfile: {
      durabilityScore: 4.9,
      expectedLifespan: '15+ Years (Weatherproof & UV-stable)',
      materialComposition: '100% natural kiln-fired porous terracotta with salt-efflorescence resistance',
      maintenanceTips: 'Soak pot in water before initial repotting. Wipe exterior with damp sponge if mineral patina buildup is undesired.',
      wearResistance: 'Exceptional',
      testedUsage: 'Tested across 10 outdoor seasons with freeze-thaw cycles without surface cracking.'
    },
    storeLocations: [
      {
        storeName: 'Bunnings Warehouse',
        chainKey: 'bunnings',
        department: 'Garden & Outdoor Living',
        aisle: 'Aisle 14',
        bayOrSection: 'Pots & Planters Bay 3',
        stockStatus: 'In Stock',
        price: 38,
        localFinderUrl: 'https://www.bunnings.com.au/stores',
        addressHint: 'Outdoor Nursery & Garden Pavilion'
      },
      {
        storeName: 'IKEA',
        chainKey: 'ikea',
        department: 'Indoor & Outdoor Gardening',
        aisle: 'Self-Serve Aisle 7',
        bayOrSection: 'Bin 18',
        stockStatus: 'In Stock',
        price: 35,
        localFinderUrl: 'https://www.ikea.com/us/en/stores/'
      },
      {
        storeName: 'Kmart',
        chainKey: 'kmart',
        department: 'Home & Garden Living',
        aisle: 'Aisle 19',
        bayOrSection: 'Planters Shelf',
        stockStatus: 'In Stock',
        price: 29,
        localFinderUrl: 'https://www.kmart.com.au/store-locator/'
      }
    ],
    defaultRating: {
      quality: 5,
      value: 5,
      longevity: 5,
      aesthetic: 5,
      performance: 5,
      overall: 5.0,
      repurchase: 'definitely'
    }
  },

  '7041234567890': {
    barcode: '7041234567890',
    barcodeFormat: 'EAN_13',
    name: '100% French Flax Washed Linen Sheet Set (Queen)',
    brand: 'Bed Threads',
    category: 'homewares',
    subCategory: 'Bedding',
    price: 280,
    currency: 'USD',
    imageUrl: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80',
    description: '170 GSM pure pre-washed French flax linen that regulates temperature through all seasons, becoming progressively softer with every single wash.',
    sourceUrl: 'https://bedthreads.com/products/turmeric-100-flax-linen-sheet-set',
    primaryRetailer: 'target',
    tags: ['100% French Flax', 'Pre-Washed', 'Thermo-regulating', '170 GSM'],
    specs: [
      { label: 'Thread Weight', value: '170 GSM Natural Flax' },
      { label: 'Set Includes', value: '1 Fitted Sheet, 1 Flat Sheet, 2 Pillowcases' },
      { label: 'Certification', value: 'OEKO-TEX Standard 100 Certified' }
    ],
    durabilityProfile: {
      durabilityScore: 4.8,
      expectedLifespan: '6-10 Years (Stronger than cotton when wet)',
      materialComposition: '100% Long-staple flax sourced from Normandy, France',
      maintenanceTips: 'Machine wash cold on gentle cycle with liquid eco detergent. Line dry in shade or tumble dry on low heat.',
      wearResistance: 'Exceptional',
      testedUsage: 'Tested through 150+ wash cycles with tensile strength increasing over time.'
    },
    storeLocations: [
      {
        storeName: 'Target Supercenter',
        chainKey: 'target',
        department: 'Home & Bedding Sanctuary',
        aisle: 'Aisle E12',
        bayOrSection: 'Luxe Linen Display',
        stockStatus: 'Online & In-Store',
        price: 280,
        localFinderUrl: 'https://www.target.com/store-locator/find-stores'
      },
      {
        storeName: 'Costco Wholesale',
        chainKey: 'costco',
        department: 'Home Textiles',
        aisle: 'Aisle 8',
        bayOrSection: 'Center Floor Textiles',
        stockStatus: 'Limited Stock',
        price: 249.99,
        localFinderUrl: 'https://www.costco.com/warehouse-locations'
      }
    ],
    defaultRating: {
      quality: 5,
      value: 4,
      longevity: 5,
      aesthetic: 5,
      performance: 5,
      overall: 4.8,
      repurchase: 'definitely'
    }
  },

  '8809614470123': {
    barcode: '8809614470123',
    barcodeFormat: 'EAN_13',
    name: 'Snail 96 Mucin Power Essence (100ml)',
    brand: 'COSRX',
    category: 'skincare',
    subCategory: 'Essences',
    price: 25,
    currency: 'USD',
    imageUrl: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80',
    description: 'Enriched with 96.3% skin-boosting snail secretion filtrate to deliver intense, soothing moisture and repair damaged barrier with lightweight absorption.',
    sourceUrl: 'https://www.ulta.com/p/advanced-snail-96-mucin-power-essence-xlsImpprod15641052',
    primaryRetailer: 'ulta',
    tags: ['96% Snail Mucin', 'K-Beauty', 'Barrier Repair', 'Hydrating'],
    specs: [
      { label: 'Volume', value: '100 mL / 3.38 fl oz' },
      { label: 'Active', value: '96.3% Snail Secretion Filtrate, Sodium Hyaluronate, Panthenol' }
    ],
    durabilityProfile: {
      durabilityScore: 4.6,
      expectedLifespan: '4-6 Months daily usage (2 pumps twice daily)',
      materialComposition: 'Recyclable PET bottle with vacuum-sealed pump dispenser',
      maintenanceTips: 'Store in bathroom vanity away from direct heat. Keep pump nozzle clean.',
      wearResistance: 'High',
      testedUsage: 'Zero oxidation or texture breakdown across 180 days after opening.'
    },
    storeLocations: [
      {
        storeName: 'Ulta Beauty',
        chainKey: 'ulta',
        department: 'K-Beauty & Skincare',
        aisle: 'Aisle 5',
        bayOrSection: 'COSRX Endcap',
        stockStatus: 'In Stock',
        price: 25,
        localFinderUrl: 'https://www.ulta.com/stores'
      },
      {
        storeName: 'Walmart Supercenter',
        chainKey: 'walmart',
        department: 'Beauty & Skincare',
        aisle: 'Aisle B14',
        bayOrSection: 'K-Beauty Trending Shelf',
        stockStatus: 'In Stock',
        price: 21.99,
        localFinderUrl: 'https://www.walmart.com/store-finder'
      },
      {
        storeName: 'Target',
        chainKey: 'target',
        department: 'Beauty Essentials',
        aisle: 'Aisle C04',
        bayOrSection: 'Clean Skincare',
        stockStatus: 'In Stock',
        price: 24.99,
        localFinderUrl: 'https://www.target.com/store-locator/find-stores'
      }
    ],
    defaultRating: {
      quality: 5,
      value: 5,
      longevity: 5,
      aesthetic: 4,
      performance: 5,
      overall: 4.8,
      repurchase: 'definitely'
    }
  }
};

/**
 * Curated list of quick test barcodes for instant testing across categories
 */
export const SAMPLE_BARCODES = [
  {
    barcode: '024147276555',
    name: 'Le Creuset 5.5 Qt Cast Iron Dutch Oven',
    brand: 'Le Creuset',
    category: 'kitchen' as ProductCategory,
    price: 420,
    store: 'Williams Sonoma / Bunnings / Costco',
    durability: 'Lifetime (5.0/5)'
  },
  {
    barcode: '840122900012',
    name: 'Soft Pinch Dewy Blush (Joy)',
    brand: 'Rare Beauty',
    category: 'makeup' as ProductCategory,
    price: 23,
    store: 'Sephora / Mecca / Big W',
    durability: '14-18 Mos (4.9/5)'
  },
  {
    barcode: '850005477209',
    name: 'Ode Gen 2 Conical Burr Grinder',
    brand: 'Fellow',
    category: 'kitchen' as ProductCategory,
    price: 345,
    store: 'Williams Sonoma / Target',
    durability: '8-12 Years (4.8/5)'
  },
  {
    barcode: '9312345678901',
    name: 'Terracotta Botanical Planter 30cm',
    brand: 'Northcote Pottery',
    category: 'homewares' as ProductCategory,
    price: 38,
    store: 'Bunnings Warehouse Aisle 14',
    durability: '15+ Years (4.9/5)'
  },
  {
    barcode: '5060542721836',
    name: 'Airbrush Flawless Micro-Powder',
    brand: 'Charlotte Tilbury',
    category: 'makeup' as ProductCategory,
    price: 48,
    store: 'Sephora / Ulta Beauty',
    durability: '8-12 Mos (4.7/5)'
  },
  {
    barcode: '3606000537736',
    name: 'Hyalu B5 Hyaluronic Acid Serum',
    brand: 'La Roche-Posay',
    category: 'skincare' as ProductCategory,
    price: 39,
    store: 'Walmart / Ulta / Costco',
    durability: '3-4 Mos (4.7/5)'
  }
];

/**
 * Looks up a barcode from the database with clean formatting
 */
export function lookupBarcode(rawCode: string): BarcodeScannedProduct | null {
  if (!rawCode) return null;
  const cleanCode = rawCode.trim().replace(/[\s-]/g, '');
  
  // Exact match
  if (BARCODE_DATABASE[cleanCode]) {
    return BARCODE_DATABASE[cleanCode];
  }

  // Check without leading zeroes or padded zeroes
  const stripped = cleanCode.replace(/^0+/, '');
  for (const key of Object.keys(BARCODE_DATABASE)) {
    if (key.replace(/^0+/, '') === stripped) {
      return BARCODE_DATABASE[key];
    }
  }

  return null;
}

/**
 * Creates an intelligent fallback product profile for any uncataloged physical barcode scanned by the user
 */
export function generateGenericScannedProduct(barcode: string, format: string = 'EAN_13'): BarcodeScannedProduct {
  const clean = barcode.trim();
  return {
    barcode: clean,
    barcodeFormat: format,
    name: `Scanned Product (${clean.slice(-4)})`,
    brand: 'Unspecified Brand',
    category: 'makeup',
    subCategory: 'Beauty & Kitchen Essentials',
    price: 29,
    currency: 'USD',
    imageUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
    description: `Scanned barcode ${clean}. Tap "Rate & Edit" to customize all dimensions, durability score, and store locations.`,
    tags: ['Scanned Barcode', 'Durability Verified'],
    durabilityProfile: {
      durabilityScore: 4.5,
      expectedLifespan: '12-24 Months',
      materialComposition: 'Commercial Grade Construction',
      maintenanceTips: 'Store in dry conditions away from extreme temperature spikes.',
      wearResistance: 'High',
      testedUsage: 'Verified barcode item added via camera scanner.'
    },
    storeLocations: [
      {
        storeName: 'Local Retailer',
        chainKey: 'other',
        department: 'Main Merchandising Floor',
        aisle: 'Aisle 1',
        stockStatus: 'In Stock',
        price: 29
      }
    ],
    defaultRating: {
      quality: 4.5,
      value: 4.0,
      longevity: 4.5,
      aesthetic: 4.5,
      performance: 4.5,
      overall: 4.4,
      repurchase: 'definitely'
    }
  };
}
