import React from 'react';
import { ProductItem } from '../types';
import { Star, RotateCcw, Award, TrendingUp, Sparkles, Heart } from 'lucide-react';

interface ShelfSummaryProps {
  products: ProductItem[];
  onFilterHolyGrail: () => void;
  isHolyGrailFilterActive: boolean;
  onFilterFavorites: () => void;
  isFavoriteFilterActive: boolean;
}

export const ShelfSummary: React.FC<ShelfSummaryProps> = ({
  products,
  onFilterHolyGrail,
  isHolyGrailFilterActive,
  onFilterFavorites,
  isFavoriteFilterActive
}) => {
  if (products.length === 0) return null;

  const total = products.length;
  const avgRating = (
    products.reduce((acc, p) => acc + p.overallRating, 0) / total
  ).toFixed(1);

  const definitelyRepurchase = products.filter(
    (p) => p.repurchase === 'definitely'
  ).length;
  const repurchasePercent = Math.round((definitelyRepurchase / total) * 100);

  const favoritesCount = products.filter((p) => p.isFavorite).length;

  // Group by category to find highest average
  const categoryMap: Record<string, { sum: number; count: number }> = {};
  products.forEach((p) => {
    if (!categoryMap[p.category]) {
      categoryMap[p.category] = { sum: 0, count: 0 };
    }
    categoryMap[p.category].sum += p.overallRating;
    categoryMap[p.category].count += 1;
  });

  let topCategoryName = 'None';
  let topCategoryAvg = 0;
  Object.entries(categoryMap).forEach(([cat, data]) => {
    const avg = data.sum / data.count;
    if (avg > topCategoryAvg) {
      topCategoryAvg = avg;
      topCategoryName = cat.charAt(0).toUpperCase() + cat.slice(1);
    }
  });

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
      {/* Total Rated */}
      <div className="bg-white/90 backdrop-blur-md border border-purple-100/90 rounded-2xl p-4 shadow-xs">
        <div className="flex items-center justify-between text-purple-900 mb-1">
          <span className="text-2xs font-bold uppercase tracking-wider text-purple-700">
            Rated Shelf
          </span>
          <Award className="w-4 h-4 text-purple-400" />
        </div>
        <div className="text-xl sm:text-2xl font-display font-bold text-slate-900">
          {total} <span className="text-xs font-sans font-medium text-slate-500">items</span>
        </div>
        <div className="text-2xs text-purple-600 font-medium mt-0.5">
          Beauty, Skincare & Living
        </div>
      </div>

      {/* Average Score */}
      <div className="bg-white/90 backdrop-blur-md border border-purple-100/90 rounded-2xl p-4 shadow-xs">
        <div className="flex items-center justify-between text-purple-900 mb-1">
          <span className="text-2xs font-bold uppercase tracking-wider text-purple-700">
            Average Score
          </span>
          <Star className="w-4 h-4 text-pink-500 fill-pink-400" />
        </div>
        <div className="text-xl sm:text-2xl font-display font-bold text-slate-900 flex items-baseline gap-1">
          {avgRating} <span className="text-xs font-sans font-medium text-slate-500">/ 5.0</span>
        </div>
        <div className="text-2xs text-purple-600 font-medium mt-0.5">
          Across 5 custom metrics
        </div>
      </div>

      {/* Holy Grails / Repurchase Rate */}
      <div 
        id="repurchase-summary-card"
        onClick={onFilterHolyGrail}
        className={`border rounded-2xl p-4 shadow-xs cursor-pointer transition-all ${
          isHolyGrailFilterActive 
            ? 'border-pink-500 ring-2 ring-pink-500/20 bg-pink-50/80' 
            : 'bg-white/90 backdrop-blur-md border-purple-100/90 hover:border-pink-300'
        }`}
      >
        <div className="flex items-center justify-between text-purple-900 mb-1">
          <span className="text-2xs font-bold uppercase tracking-wider text-pink-700">
            Holy Grails
          </span>
          <RotateCcw className="w-4 h-4 text-pink-500" />
        </div>
        <div className="text-xl sm:text-2xl font-display font-bold text-pink-900 flex items-baseline gap-1.5">
          {repurchasePercent}%
          <span className="text-xs font-sans font-bold text-pink-600 bg-pink-100 px-1.5 py-0.5 rounded-md">
            {definitelyRepurchase} items
          </span>
        </div>
        <div className="text-2xs text-pink-600 font-medium mt-0.5">
          {isHolyGrailFilterActive ? 'Filtering "Definitely buy"' : 'Tap to filter 100% repurchases'}
        </div>
      </div>

      {/* Top Category */}
      <div className="bg-white/90 backdrop-blur-md border border-purple-100/90 rounded-2xl p-4 shadow-xs">
        <div className="flex items-center justify-between text-purple-900 mb-1">
          <span className="text-2xs font-bold uppercase tracking-wider text-purple-700">
            Top Affinity
          </span>
          <TrendingUp className="w-4 h-4 text-violet-600" />
        </div>
        <div className="text-lg sm:text-xl font-display font-bold text-slate-900 truncate">
          {topCategoryName}
        </div>
        <div className="text-2xs text-violet-600 font-medium mt-0.5">
          Averaging {topCategoryAvg.toFixed(1)} ★ overall
        </div>
      </div>
    </div>
  );
};
