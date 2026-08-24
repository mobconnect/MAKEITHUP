import React from 'react';
import { ProductItem } from '../types';
import { CATEGORY_METRIC_LABELS } from '../data/initialProducts';
import { 
  Star, 
  RotateCcw, 
  Check, 
  X, 
  Heart, 
  Plus, 
  SlidersHorizontal,
  ChevronRight,
  TrendingDown,
  TrendingUp,
  Sparkles
} from 'lucide-react';

interface ProductCardProps {
  product: ProductItem;
  viewMode: 'grid' | 'list';
  onViewDetails: (product: ProductItem) => void;
  onEditProduct: (product: ProductItem) => void;
  onToggleFavorite: (id: string) => void;
  isCompared: boolean;
  onToggleCompare: (product: ProductItem) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  viewMode,
  onViewDetails,
  onEditProduct,
  onToggleFavorite,
  isCompared,
  onToggleCompare
}) => {
  const categoryLabels = CATEGORY_METRIC_LABELS[product.category] || CATEGORY_METRIC_LABELS.homewares;

  const priceTrend = React.useMemo(() => {
    if (!product.priceHistory || product.priceHistory.length < 2) return null;
    const history = [...product.priceHistory].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    const first = history[0].price;
    const current = history[history.length - 1].price;
    const min = Math.min(...history.map(h => h.price));
    const diff = current - first;
    const isLowest = current <= min;

    return {
      diff,
      isLowest,
      percent: first > 0 ? Math.round((diff / first) * 100) : 0,
      pointsCount: history.length
    };
  }, [product.priceHistory]);

  const renderRepurchaseBadge = (status: ProductItem['repurchase']) => {
    switch (status) {
      case 'definitely':
        return (
          <span className="inline-flex items-center gap-1 text-2xs font-bold px-2.5 py-0.5 rounded-full bg-pink-50 text-pink-700 border border-pink-200/80">
            <Check className="w-3 h-3 stroke-[3]" />
            Would Repurchase
          </span>
        );
      case 'maybe':
        return (
          <span className="inline-flex items-center gap-1 text-2xs font-bold px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200/80">
            <RotateCcw className="w-3 h-3" />
            Maybe / On Fence
          </span>
        );
      case 'never':
        return (
          <span className="inline-flex items-center gap-1 text-2xs font-bold px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200/80">
            <X className="w-3 h-3 stroke-[3]" />
            Would Not Repurchase
          </span>
        );
    }
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((starIndex) => {
          const filled = rating >= starIndex;
          const half = !filled && rating >= starIndex - 0.5;

          return (
            <span key={starIndex} className="relative inline-block">
              <Star
                className={`w-3.5 h-3.5 ${
                  filled
                    ? 'text-pink-500 fill-pink-400'
                    : half
                    ? 'text-pink-400 fill-pink-300/50'
                    : 'text-purple-200 fill-purple-50'
                }`}
              />
            </span>
          );
        })}
      </div>
    );
  };

  if (viewMode === 'list') {
    return (
      <div 
        id={`product-card-${product.id}`}
        className="bg-white/95 backdrop-blur-md border border-purple-100/90 rounded-2xl p-4 shadow-xs hover:shadow-md transition-all flex flex-col md:flex-row gap-4 items-start md:items-center justify-between"
      >
        {/* Left: Image & Main Info */}
        <div className="flex items-start gap-4 flex-1">
          <div 
            onClick={() => onViewDetails(product)}
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-purple-50 shrink-0 cursor-pointer border border-purple-100 relative group"
          >
            <img
              src={product.imageUrl}
              alt={product.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="flex items-center gap-1.5 absolute bottom-1 right-1">
              <span className="text-2xs bg-purple-950/80 backdrop-blur-xs text-white px-1.5 py-0.5 rounded-md font-bold">
                ${product.price}
              </span>
              {priceTrend && (
                <span
                  className={`text-3xs px-1 py-0.5 rounded font-bold backdrop-blur-xs flex items-center gap-0.5 ${
                    priceTrend.isLowest
                      ? 'bg-emerald-600/90 text-white'
                      : priceTrend.diff < 0
                      ? 'bg-pink-600/90 text-white'
                      : 'bg-purple-900/80 text-purple-200'
                  }`}
                  title={`${priceTrend.pointsCount} price logs recorded`}
                >
                  {priceTrend.isLowest ? (
                    <Sparkles className="w-2.5 h-2.5" />
                  ) : priceTrend.diff < 0 ? (
                    <TrendingDown className="w-2.5 h-2.5" />
                  ) : (
                    <TrendingUp className="w-2.5 h-2.5" />
                  )}
                  {priceTrend.isLowest ? 'Low' : `${Math.abs(priceTrend.percent)}%`}
                </span>
              )}
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span className="text-2xs font-bold uppercase tracking-wider text-violet-700 bg-violet-50 px-2 py-0.5 rounded-md border border-violet-200/60">
                {product.category}
              </span>
              {product.subCategory && (
                <span className="text-2xs text-slate-500 font-medium">
                  {product.subCategory}
                </span>
              )}
              {renderRepurchaseBadge(product.repurchase)}
            </div>

            <h3 
              onClick={() => onViewDetails(product)}
              className="text-base font-bold text-slate-900 hover:text-purple-700 cursor-pointer transition-colors leading-snug line-clamp-1"
            >
              {product.name}
            </h3>
            <p className="text-xs text-slate-500 mb-1.5">
              by <span className="font-semibold text-purple-950">{product.brand}</span> • Used for {product.usageDuration}
            </p>

            <p className="text-xs text-slate-600 line-clamp-2 italic">
              "{product.reviewText}"
            </p>
          </div>
        </div>

        {/* Middle: Rating Breakdown */}
        <div className="flex items-center gap-4 border-t md:border-t-0 md:border-l border-purple-100 pt-3 md:pt-0 md:pl-6 shrink-0 w-full md:w-auto justify-between md:justify-end">
          <div className="text-left md:text-right">
            <div className="flex items-baseline gap-1.5 justify-start md:justify-end">
              <span className="text-2xl font-display font-bold text-purple-950">
                {product.overallRating.toFixed(1)}
              </span>
              <span className="text-xs text-slate-400">/ 5.0</span>
            </div>
            {renderStars(product.overallRating)}
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            <button
              id={`fav-btn-list-${product.id}`}
              onClick={() => onToggleFavorite(product.id)}
              className={`p-2 rounded-xl border transition-colors ${
                product.isFavorite
                  ? 'bg-pink-50 text-pink-600 border-pink-200'
                  : 'bg-purple-50/60 text-purple-400 border-purple-100 hover:text-purple-700'
              }`}
              title="Save to favorites"
            >
              <Heart className={`w-4 h-4 ${product.isFavorite ? 'fill-pink-500 text-pink-500' : ''}`} />
            </button>

            <button
              id={`compare-btn-list-${product.id}`}
              onClick={() => onToggleCompare(product)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-xl border transition-colors ${
                isCompared
                  ? 'bg-purple-900 text-white border-purple-900'
                  : 'bg-purple-50/60 text-purple-800 border-purple-100 hover:bg-purple-100'
              }`}
            >
              {isCompared ? 'Comparing' : 'Compare'}
            </button>

            <button
              id={`view-btn-list-${product.id}`}
              onClick={() => onViewDetails(product)}
              className="flex items-center gap-1 px-3.5 py-1.5 text-xs font-bold bg-gradient-to-r from-violet-600 to-pink-600 hover:from-violet-700 hover:to-pink-700 text-white rounded-xl shadow-xs transition-colors"
            >
              <span>Review</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Grid layout
  return (
    <div 
      id={`product-card-${product.id}`}
      className="bg-white/95 backdrop-blur-md border border-purple-100/90 rounded-3xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
    >
      {/* Product Image Header */}
      <div>
        <div className="relative aspect-4/3 bg-purple-50 overflow-hidden cursor-pointer" onClick={() => onViewDetails(product)}>
          <img
            src={product.imageUrl}
            alt={product.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />

          {/* Gradient scrim for tags */}
          <div className="absolute inset-0 bg-gradient-to-t from-purple-950/80 via-transparent to-black/20" />

          {/* Top Badges */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
            <span className="text-2xs font-bold uppercase tracking-wider bg-white/95 backdrop-blur-md text-purple-950 px-2.5 py-1 rounded-full shadow-2xs">
              {product.category}
            </span>

            <div className="flex items-center gap-1.5">
              <button
                id={`fav-btn-grid-${product.id}`}
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleFavorite(product.id);
                }}
                className={`p-2 rounded-full backdrop-blur-md transition-all ${
                  product.isFavorite
                    ? 'bg-pink-500 text-white shadow-xs'
                    : 'bg-purple-950/60 text-white hover:bg-purple-950/90'
                }`}
                title="Save to favorites"
              >
                <Heart className={`w-3.5 h-3.5 ${product.isFavorite ? 'fill-white' : ''}`} />
              </button>
            </div>
          </div>

          {/* Bottom image overlay stats */}
          <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between text-white">
            <div>
              <span className="text-xs font-semibold text-purple-200">
                {product.brand}
              </span>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-display font-bold text-white leading-tight">
                  ${product.price}
                </span>
                {priceTrend && (
                  <span
                    className={`text-3xs px-1.5 py-0.5 rounded-full font-bold backdrop-blur-xs flex items-center gap-0.5 ${
                      priceTrend.isLowest
                        ? 'bg-emerald-500/90 text-white'
                        : priceTrend.diff < 0
                        ? 'bg-pink-500/90 text-white'
                        : 'bg-purple-900/80 text-purple-200'
                    }`}
                  >
                    {priceTrend.isLowest ? (
                      <Sparkles className="w-2.5 h-2.5" />
                    ) : priceTrend.diff < 0 ? (
                      <TrendingDown className="w-2.5 h-2.5" />
                    ) : (
                      <TrendingUp className="w-2.5 h-2.5" />
                    )}
                    {priceTrend.isLowest ? 'All-Time Low' : `${Math.abs(priceTrend.percent)}%`}
                  </span>
                )}
              </div>
            </div>

            <div className="bg-purple-950/80 backdrop-blur-xs border border-purple-500/30 px-2.5 py-1 rounded-xl flex items-center gap-1 shadow-xs">
              <Star className="w-3.5 h-3.5 text-pink-400 fill-pink-400" />
              <span className="text-xs font-bold text-white">
                {product.overallRating.toFixed(1)}
              </span>
            </div>
          </div>
        </div>

        {/* Card Content Body */}
        <div className="p-5 flex-1 flex flex-col justify-between">
          <div>
            {/* Repurchase Badge & Subcategory */}
            <div className="flex items-center justify-between gap-2 mb-2">
              {renderRepurchaseBadge(product.repurchase)}
              <span className="text-2xs text-purple-700 font-medium truncate">
                {product.usageDuration}
              </span>
            </div>

            {/* Title */}
            <h3 
              onClick={() => onViewDetails(product)}
              className="text-base font-bold text-slate-900 hover:text-purple-700 cursor-pointer transition-colors leading-snug line-clamp-1 mb-1.5"
            >
              {product.name}
            </h3>

            {/* Written review excerpt */}
            <p className="text-xs text-slate-600 line-clamp-2 mb-3.5">
              "{product.reviewText}"
            </p>

            {/* Category-Specific Criteria Breakdown Bars */}
            <div className="space-y-1.5 mb-4 bg-purple-50/60 p-3 rounded-2xl border border-purple-100/80">
              <div className="flex items-center justify-between text-2xs text-slate-600">
                <span className="font-semibold truncate">{categoryLabels.quality}</span>
                <span className="font-bold text-purple-900">{product.dimensions.quality.toFixed(1)}</span>
              </div>
              <div className="w-full bg-purple-200/50 rounded-full h-1.5 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-violet-600 to-pink-500 h-full rounded-full" 
                  style={{ width: `${(product.dimensions.quality / 5) * 100}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-2xs text-slate-600 pt-1">
                <span className="font-semibold truncate">{categoryLabels.longevity}</span>
                <span className="font-bold text-purple-900">{product.dimensions.longevity.toFixed(1)}</span>
              </div>
              <div className="w-full bg-purple-200/50 rounded-full h-1.5 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-violet-600 to-pink-500 h-full rounded-full" 
                  style={{ width: `${(product.dimensions.longevity / 5) * 100}%` }}
                />
              </div>
            </div>

            {/* Pros list highlight */}
            {product.pros.length > 0 && (
              <div className="flex items-center gap-1.5 text-2xs text-pink-900 bg-pink-50 border border-pink-100 rounded-xl px-2.5 py-1 mb-2 line-clamp-1">
                <Check className="w-3 h-3 text-pink-600 shrink-0 stroke-[3]" />
                <span className="truncate font-medium">{product.pros[0]}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="p-5 pt-0 border-t border-purple-50 flex items-center justify-between gap-2 mt-1">
        <button
          id={`compare-toggle-${product.id}`}
          onClick={() => onToggleCompare(product)}
          className={`text-2xs font-semibold px-2.5 py-1.5 rounded-xl transition-colors ${
            isCompared
              ? 'bg-purple-900 text-white font-bold'
              : 'text-purple-700 hover:text-purple-950 bg-purple-50 hover:bg-purple-100'
          }`}
        >
          {isCompared ? '✓ Selected' : '+ Compare'}
        </button>

        <div className="flex items-center gap-1.5">
          <button
            id={`edit-rating-btn-${product.id}`}
            onClick={() => onEditProduct(product)}
            className="text-2xs font-semibold text-purple-700 hover:text-purple-950 px-2.5 py-1.5 rounded-xl hover:bg-purple-50 transition-colors"
          >
            Edit Score
          </button>
          <button
            id={`view-details-btn-${product.id}`}
            onClick={() => onViewDetails(product)}
            className="text-2xs font-bold bg-gradient-to-r from-violet-600 to-pink-600 hover:from-violet-700 hover:to-pink-700 text-white px-3 py-1.5 rounded-xl transition-colors shadow-xs"
          >
            Details
          </button>
        </div>
      </div>
    </div>
  );
};
