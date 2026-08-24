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

export interface ProductItem {
  id: string;
  name: string;
  brand: string;
  category: ProductCategory;
  subCategory?: string;
  price: number;
  currency?: string;
  priceHistory?: PricePoint[];
  overallRating: number; // 1.0 - 5.0
  repurchase: RepurchaseStatus;
  imageUrl: string;
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

export type AppTab = 'for_you' | 'my_shelf' | 'discover' | 'taste_profile';

export type SortOption = 
  | 'highest_rated'
  | 'lowest_rated'
  | 'newest'
  | 'price_low'
  | 'price_high'
  | 'most_repurchased';
