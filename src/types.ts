export type ProductCategory = 
  | 'makeup'
  | 'skincare'
  | 'homewares'
  | 'kitchen'
  | 'decor';

export type RepurchaseStatus = 'definitely' | 'maybe' | 'never';

export interface RatingDimension {
  name: string;
  score: number; // 1-5 scale
  max: number;
}

export interface PricePoint {
  date: string; // YYYY-MM-DD
  price: number;
  note?: string;
}

export type RetailerKey = 
  | 'bunnings'
  | 'big_w'
  | 'costco'
  | 'walmart'
  | 'sephora'
  | 'kmart'
  | 'ikea'
  | 'sams_club'
  | 'target'
  | 'ulta'
  | 'amazon'
  | 'mecca'
  | 'williams_sonoma'
  | 'other';

export interface RetailerLink {
  retailerKey: RetailerKey;
  name: string;
  url: string;
  domain: string;
  price?: number;
  inStock?: boolean;
  isPrimary?: boolean;
}

export interface DurabilityProfile {
  durabilityScore: number; // 1-5 or 0-100
  expectedLifespan: string; // e.g. "5+ Years", "Lifetime", "12-18 Months", "All-day 16hr wear"
  materialComposition?: string; // e.g. "Enameled Cast Iron", "French Flax Linen", "Ceramic Quartz"
  maintenanceTips?: string; // e.g. "Hand wash with mild soap, re-season periodically"
  wearResistance?: 'Exceptional' | 'High' | 'Moderate' | 'Delicate';
  testedUsage?: string; // e.g. "Tested across 250+ dishwasher cycles without fading"
}

export interface StoreLocationInfo {
  storeName: string;
  chainKey: RetailerKey | string;
  department: string;
  aisle: string;
  bayOrSection?: string;
  stockStatus: 'In Stock' | 'Limited Stock' | 'Online & In-Store' | 'Special Order';
  price?: number;
  localFinderUrl?: string;
  addressHint?: string;
}

export interface BarcodeScannedProduct {
  barcode: string;
  barcodeFormat?: string; // e.g. "EAN_13", "UPC_A", "CODE_128"
  name: string;
  brand: string;
  category: ProductCategory;
  subCategory: string;
  price: number;
  currency?: string;
  imageUrl: string;
  description: string;
  durabilityProfile: DurabilityProfile;
  storeLocations: StoreLocationInfo[];
  sourceUrl?: string;
  primaryRetailer?: RetailerKey | string;
  tags: string[];
  specs?: { label: string; value: string }[];
  defaultRating?: {
    quality: number;
    value: number;
    longevity: number;
    aesthetic: number;
    performance: number;
    overall: number;
    repurchase: RepurchaseStatus;
  };
}

export interface ProductMediaItem {
  id: string;
  type: 'image' | 'video';
  url: string;
  title?: string;
  description?: string;
  isCover?: boolean;
  thumbnailUrl?: string;
  uploadedAt?: string;
}

export interface TutorialStep {
  stepNumber: number;
  title: string;
  instruction: string;
  timecode?: string; // e.g. "0:45"
  mediaUrl?: string;
  mediaType?: 'image' | 'video';
  proTip?: string;
}

export interface ProductTutorial {
  id: string;
  productId: string;
  productName: string;
  productBrand: string;
  productCategory: ProductCategory;
  productImageUrl?: string;
  title: string;
  description: string;
  authorName: string;
  authorAvatar: string;
  authorBadge?: string; // e.g. "Verified Owner", "Pro MUA", "Skincare Specialist", "Home Chef"
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  durationMinutes: number;
  videoUrl?: string;
  coverImageUrl: string;
  mediaGallery?: ProductMediaItem[];
  steps: TutorialStep[];
  proTips: string[];
  toolsRequired?: string[];
  beforeAfter?: {
    beforeImageUrl: string;
    afterImageUrl: string;
    beforeLabel?: string;
    afterLabel?: string;
    description: string;
  };
  likesCount: number;
  userLiked?: boolean;
  savesCount: number;
  userSaved?: boolean;
  viewsCount: number;
  datePosted: string;
  tags: string[];
}

export interface ProductItem {
  id: string;
  barcode?: string;
  name: string;
  brand: string;
  category: ProductCategory;
  subCategory?: string;
  price: number;
  currency?: string;
  priceHistory?: PricePoint[];
  sourceUrl?: string; // Live website address where product is being viewed / cataloged
  primaryRetailer?: RetailerKey | string;
  retailers?: RetailerLink[];
  durabilityProfile?: DurabilityProfile;
  storeLocations?: StoreLocationInfo[];
  overallRating: number; // 1.0 - 5.0
  repurchase: RepurchaseStatus;
  imageUrl: string;
  mediaGallery?: ProductMediaItem[];
  demoVideoUrl?: string;
  usageDuration: string;
  reviewText: string;
  pros: string[];
  cons: string[];
  dimensions: {
    quality: number; // 1-5
    value: number; // 1-5
    longevity: number; // 1-5
    aesthetic: number; // 1-5
    performance: number; // 1-5
  };
  tags: string[];
  dateRated: string;
  isFavorite?: boolean;
}

export interface BrowsingHistoryItem {
  productId: string;
  productName: string;
  brand: string;
  category: ProductCategory;
  subCategory?: string;
  imageUrl: string;
  price: number;
  sourceUrl?: string; // Website address where product is being viewed from
  retailerName?: string;
  viewedAt: number; // timestamp
  viewCount: number;
  source: 'shelf' | 'discover' | 'recommendation';
}

export interface RecommendedProduct {
  id: string;
  name: string;
  brand: string;
  category: ProductCategory;
  subCategory: string;
  price: number;
  currency?: string;
  sourceUrl?: string; // Website address where product is being viewed
  primaryRetailer?: RetailerKey | string;
  retailers?: RetailerLink[];
  estimatedRating: number; // e.g., 4.7
  matchScore: number; // 0 - 100%
  matchReasons: string[];
  primaryReason: string;
  imageUrl: string;
  description: string;
  highlights: string[];
  keyDimensions: {
    quality: number;
    value: number;
    longevity: number;
    aesthetic: number;
    performance: number;
  };
  tags: string[];
  matchType: 'rating_affinity' | 'browsing_history' | 'holy_grail_twin' | 'dimension_match' | 'category_leader';
}

export interface TasteProfile {
  topCategories: { category: ProductCategory; percentage: number; count: number }[];
  favoriteBrands: { brand: string; avgRating: number; count: number }[];
  topAestheticTags: string[];
  dimensionAffinities: {
    name: string;
    score: number;
    importance: 'High' | 'Very High' | 'Balanced';
  }[];
  avgSpend: number;
  holyGrailCount: number;
  totalRated: number;
  totalViews: number;
  primaryVibe: string;
}

export type AppTab = 'for_you' | 'my_shelf' | 'discover' | 'tutorials' | 'taste_profile';

export type SortOption = 
  | 'highest_rated'
  | 'lowest_rated'
  | 'newest'
  | 'price_low'
  | 'price_high'
  | 'most_repurchased';
