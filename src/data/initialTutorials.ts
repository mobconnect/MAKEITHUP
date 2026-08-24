import { ProductTutorial } from '../types';

export const INITIAL_TUTORIALS: ProductTutorial[] = [
  {
    id: 'tut-1',
    productId: 'prod-1',
    productName: 'Soft Pinch Liquid Dewy Blush',
    productBrand: 'Rare Beauty',
    productCategory: 'makeup',
    productImageUrl: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80&w=800',
    title: 'The Dewy Under-Painting Routine & Cloud Blending',
    description: 'Learn the viral under-painting method using 1 micro-dot of Rare Beauty dewy liquid blush before sheer skin tint for a radiant, seamless lit-from-within glow.',
    authorName: 'Camille Nguyen',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    authorBadge: 'Pro Makeup Artist',
    difficulty: 'Beginner',
    durationMinutes: 4,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    coverImageUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=800',
    mediaGallery: [
      {
        id: 'media-tut-1-1',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=800',
        title: 'Application Placement'
      },
      {
        id: 'media-tut-1-2',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&q=80&w=800',
        title: 'Blending with Dense Brush'
      }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'High Cheekbone Dotting',
        instruction: 'Wipe excess product off the doe-foot applicator against the inner rim. Tap only ONE single micro-dot along the upper orbital cheekbone.',
        timecode: '0:15',
        mediaUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=600',
        mediaType: 'image',
        proTip: 'A single pin-point dot gives full opacity for both cheeks without overwhelming foundation.'
      },
      {
        stepNumber: 2,
        title: 'Upward Stippling with Dense Angled Brush',
        instruction: 'Use a dense synthetic angled brush in upward pulsing motions towards the temples. Do not drag the pigment downward.',
        timecode: '1:05',
        mediaUrl: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&q=80&w=600',
        mediaType: 'image',
        proTip: 'Warm the bristles on the back of your hand first for an ultra-diffused watercolor veil.'
      },
      {
        stepNumber: 3,
        title: 'Sheer Veil Skin Tint Layering',
        instruction: 'Take your damp beauty sponge with any leftover hydrating skin tint and lightly tap over the edges of the blush to melt edges seamlessly into the skin.',
        timecode: '2:30',
        mediaUrl: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80&w=600',
        mediaType: 'image',
        proTip: 'This sets the dewiness for 14+ hours without requiring drying powder.'
      }
    ],
    proTips: [
      'Always start with primed, moisturized skin before liquid pigment application.',
      'Blend within 30 seconds before the weightless setting polymers lock down.',
      'Dab leftover brush residue across the bridge of your nose for a sun-kissed youthful flush.'
    ],
    toolsRequired: [
      'Dense angled stippling brush (synthetic)',
      'Damp microfiber sponge',
      'Hydrating mist or skin prep serum'
    ],
    beforeAfter: {
      beforeImageUrl: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&q=80&w=600',
      afterImageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600',
      beforeLabel: 'Bare Prepped Complexion',
      afterLabel: 'Luminous 12-Hour Tint',
      description: 'Before shows flat bare complexion; after demonstrates sculpted high cheekbones with natural dewy flush that stayed intact across full workday.'
    },
    likesCount: 342,
    savesCount: 189,
    viewsCount: 2840,
    datePosted: '2026-07-18',
    tags: ['Under-painting', 'Dewy Cheeks', 'Longwear', 'Natural Radiance']
  },
  {
    id: 'tut-2',
    productId: 'prod-3',
    productName: 'Stagg EKG Electric Pour-Over Kettle',
    productBrand: 'Fellow',
    productCategory: 'kitchen',
    productImageUrl: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&q=80&w=800',
    title: 'Dialing the Tetsu Kasuya 4:6 Pour-Over Method',
    description: 'Master precision flow rate and temperature profiling at 93°C to unlock delicate floral acidity and heavy chocolate sweetness in specialty single-origin roasts.',
    authorName: 'Marcus Vance',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    authorBadge: 'Certified Barista',
    difficulty: 'Intermediate',
    durationMinutes: 6,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    coverImageUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=800',
    mediaGallery: [
      {
        id: 'media-tut-2-1',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=800',
        title: 'Precision Temperature Dialing'
      },
      {
        id: 'media-tut-2-2',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=800',
        title: 'Gooseneck Flow Control'
      }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'PID Temperature Dial Calibration',
        instruction: 'Turn Stagg knob to set target temperature at 93°C (200°F). Engage the rear Hold toggle switch to maintain constant temperature throughout 5 extraction stages.',
        timecode: '0:30',
        mediaUrl: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&q=80&w=600',
        mediaType: 'image',
        proTip: 'Use filtered water with 120-150 ppm mineral content for optimal extraction.'
      },
      {
        stepNumber: 2,
        title: 'Initial 60g Bloom Stage',
        instruction: 'Pour 60g in tight concentric circles within 10 seconds. The counterbalanced handle allows you to pour vertically at exactly 90 degrees with zero splashing.',
        timecode: '1:45',
        mediaUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=600',
        mediaType: 'image',
        proTip: 'Let the bed de-gas for full 45 seconds to release CO2.'
      },
      {
        stepNumber: 3,
        title: 'Multi-Stage 4:6 Balance Pours',
        instruction: 'Complete remaining pours at 45-second intervals (60g, 60g, 60g, 60g) maintaining an even 5-6g/second gentle laminar stream.',
        timecode: '3:10',
        mediaUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=600',
        mediaType: 'image',
        proTip: 'Do not pour down the paper filter wall to avoid channel bypass.'
      }
    ],
    proTips: [
      'Wipe down kettle exterior with dry microfiber immediately after cooling to preserve matte powder coat.',
      'Descaling with citric acid every 2 months keeps heating response lightning-fast.'
    ],
    toolsRequired: [
      'Digital scale with 0.1g accuracy',
      'V60 ceramic or glass dripper',
      'Unbleached paper filter (rinsed)'
    ],
    beforeAfter: {
      beforeImageUrl: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&q=80&w=600',
      afterImageUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=600',
      beforeLabel: 'Standard Kettle Uncontrolled Pour',
      afterLabel: 'Laminar Stagg Flow Extraction',
      description: 'Before produced muddy over-extracted bitter brew; after produced crystal-clear floral brew with clean layered notes.'
    },
    likesCount: 512,
    savesCount: 320,
    viewsCount: 4120,
    datePosted: '2026-06-22',
    tags: ['Coffee Craft', 'Pour Over', 'Brew Temperature', 'Gooseneck Technique']
  },
  {
    id: 'tut-3',
    productId: 'prod-2',
    productName: 'Water Sleeping Mask with Squalane',
    productBrand: 'LANEIGE',
    productCategory: 'skincare',
    productImageUrl: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=800',
    title: 'Overnight Micro-Slug & Moisture Barrier Recovery',
    description: 'How to layer the probiotic sleeping mask over retinol or exfoliating acids to prevent transepidermal water loss and wake up with glass skin plumpness.',
    authorName: 'Dr. Elena Rostova',
    authorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200',
    authorBadge: 'Skin Health Specialist',
    difficulty: 'Beginner',
    durationMinutes: 3,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    coverImageUrl: 'https://images.unsplash.com/photo-1512290900672-1f55a1532f14?auto=format&fit=crop&q=80&w=800',
    mediaGallery: [
      {
        id: 'media-tut-3-1',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=800',
        title: 'Gel Cream Texture'
      }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Clean Spatula Extraction',
        instruction: 'Use the included curved spatula to measure a hazelnut-sized portion. Avoid dipping bare fingers into jar to keep probiotic culture fresh.',
        timecode: '0:20',
        mediaUrl: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=600',
        mediaType: 'image',
        proTip: 'Store jar in skincare chiller for an instant de-puffing cooling relief.'
      },
      {
        stepNumber: 2,
        title: 'Warm & Press Technique',
        instruction: 'Warm the gel texture between palms for 5 seconds until it transitions to water-veil consistency, then press firmly across forehead, cheeks, and neck.',
        timecode: '1:10',
        mediaUrl: 'https://images.unsplash.com/photo-1512290900672-1f55a1532f14?auto=format&fit=crop&q=80&w=600',
        mediaType: 'image',
        proTip: 'Do not rub vigorously; let skin absorb the squalane barrier organically.'
      }
    ],
    proTips: [
      'Apply 15 minutes before bed so pillowcase does not absorb mask.',
      'Rinse with tepid water in the morning without harsh foaming cleansers.'
    ],
    toolsRequired: [
      'Curved hygienic spatula',
      'Thermal face mist'
    ],
    beforeAfter: {
      beforeImageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=600',
      afterImageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600',
      beforeLabel: 'Flaky Dehydrated Barrier',
      afterLabel: 'Plump Restored Glass Skin',
      description: 'Morning skin showed zero redness or peeling from overnight retinol active.'
    },
    likesCount: 289,
    savesCount: 215,
    viewsCount: 3100,
    datePosted: '2026-08-05',
    tags: ['Glass Skin', 'Overnight Mask', 'Hydration Barrier', 'Squalane']
  },
  {
    id: 'tut-4',
    productId: 'prod-5',
    productName: 'Signature Enameled Cast Iron Round Dutch Oven',
    productBrand: 'Le Creuset',
    productCategory: 'kitchen',
    productImageUrl: 'https://images.unsplash.com/photo-1584990347449-39965d1d64aa?auto=format&fit=crop&q=80&w=800',
    title: 'High-Steam Artisan Sourdough Loaf Baking & Oven Spring',
    description: 'Harness the tight-fitting cast iron lid to trap steam at 245°C, yielding blistered crispy crust and airy open crumb structure.',
    authorName: 'Claire Dupont',
    authorAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200',
    authorBadge: 'Artisan Baker',
    difficulty: 'Advanced',
    durationMinutes: 8,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
    coverImageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=800',
    mediaGallery: [
      {
        id: 'media-tut-4-1',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=800',
        title: 'Crust Oven Spring'
      }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Dutch Oven 45-Min Preheating',
        instruction: 'Place empty Le Creuset with lid on into cold oven. Crank temperature to 245°C (475°F) and preheat for full 45 minutes.',
        timecode: '0:45',
        mediaUrl: 'https://images.unsplash.com/photo-1584990347449-39965d1d64aa?auto=format&fit=crop&q=80&w=600',
        mediaType: 'image',
        proTip: 'The signature black phenolic or steel knob is rated safe up to 260°C.'
      },
      {
        stepNumber: 2,
        title: 'Parchment Sling Dough Loading',
        instruction: 'Carefully lower scored sourdough boule on parchment sling into blazing hot pot. Drop 1 ice cube between parchment and pot for volcanic steam burst.',
        timecode: '2:15',
        mediaUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=600',
        mediaType: 'image',
        proTip: 'Clamp lid immediately to lock steam inside for the first 20 minutes of baking.'
      },
      {
        stepNumber: 3,
        title: 'Lid Off Browning Finish',
        instruction: 'Remove lid after 20 minutes. Lower oven to 220°C and bake for another 18-20 minutes until crust reaches deep mahogany blistered color.',
        timecode: '4:30',
        mediaUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=600',
        mediaType: 'image',
        proTip: 'Let loaf cool on wire rack for 2 hours before slicing.'
      }
    ],
    proTips: [
      'Never heat an empty enameled pan with high flame on gas stovetop; in the oven it preheats evenly with ambient convection.',
      'Clean enamel patina with warm water and baking soda paste—never use metal scourers.'
    ],
    toolsRequired: [
      'Heavy-duty silicone oven mitts',
      'Unbleached parchment paper',
      'Curved razor baker lame'
    ],
    beforeAfter: {
      beforeImageUrl: 'https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?auto=format&fit=crop&q=80&w=600',
      afterImageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=600',
      beforeLabel: 'Standard Sheet Pan Bake (Flat)',
      afterLabel: 'Steam-Trapped Le Creuset Spring',
      description: 'Lid steam trap yielded twice the vertical rise and shatter-crisp thin crust.'
    },
    likesCount: 680,
    savesCount: 490,
    viewsCount: 5600,
    datePosted: '2026-05-14',
    tags: ['Sourdough', 'Artisan Baking', 'Steam Trap', 'Cast Iron Craft']
  }
];
