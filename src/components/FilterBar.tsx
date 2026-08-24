import React from 'react';
import { SortOption, RepurchaseStatus } from '../types';
import { 
  ArrowUpDown, 
  LayoutGrid, 
  List, 
  Star, 
  RotateCcw, 
  X,
  DollarSign
} from 'lucide-react';

interface FilterBarProps {
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  minRating: number;
  onMinRatingChange: (rating: number) => void;
  repurchaseFilter: RepurchaseStatus | 'all';
  onRepurchaseFilterChange: (status: RepurchaseStatus | 'all') => void;
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
  priceFilter: 'all' | 'under50' | '50to150' | 'over150';
  onPriceFilterChange: (price: 'all' | 'under50' | '50to150' | 'over150') => void;
  onResetFilters: () => void;
  activeFilterCount: number;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  sortBy,
  onSortChange,
  minRating,
  onMinRatingChange,
  repurchaseFilter,
  onRepurchaseFilterChange,
  viewMode,
  onViewModeChange,
  priceFilter,
  onPriceFilterChange,
  onResetFilters,
  activeFilterCount
}) => {
  return (
    <div className="bg-white/90 backdrop-blur-md border border-purple-100/90 rounded-2xl p-3 sm:p-4 mb-6 shadow-xs">
      <div className="flex flex-wrap items-center justify-between gap-3">
        
        {/* Left side filters */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 flex-1 min-w-[280px]">
          
          {/* Min Rating Dropdown */}
          <div className="flex items-center gap-1.5 bg-purple-50/70 border border-purple-100 rounded-xl px-2.5 py-1.5 text-xs text-slate-700">
            <Star className="w-3.5 h-3.5 text-pink-500 fill-pink-400 shrink-0" />
            <select
              id="filter-min-rating-select"
              aria-label="Filter by minimum star rating"
              value={minRating}
              onChange={(e) => onMinRatingChange(Number(e.target.value))}
              className="bg-transparent text-xs font-semibold text-purple-950 focus:outline-none cursor-pointer"
            >
              <option value={0}>All Ratings</option>
              <option value={4.5}>4.5★ & up</option>
              <option value={4.0}>4.0★ & up</option>
              <option value={3.5}>3.5★ & up</option>
            </select>
          </div>

          {/* Repurchase Verdict Filter */}
          <div className="flex items-center gap-1.5 bg-purple-50/70 border border-purple-100 rounded-xl px-2.5 py-1.5 text-xs text-slate-700">
            <RotateCcw className="w-3.5 h-3.5 text-purple-600 shrink-0" />
            <select
              id="filter-repurchase-select"
              aria-label="Filter by repurchase verdict"
              value={repurchaseFilter}
              onChange={(e) => onRepurchaseFilterChange(e.target.value as RepurchaseStatus | 'all')}
              className="bg-transparent text-xs font-semibold text-purple-950 focus:outline-none cursor-pointer"
            >
              <option value="all">Any Repurchase</option>
              <option value="definitely">Definitely buy again</option>
              <option value="maybe">Maybe / Neutral</option>
              <option value="never">Would not buy again</option>
            </select>
          </div>

          {/* Price Bracket */}
          <div className="flex items-center gap-1.5 bg-purple-50/70 border border-purple-100 rounded-xl px-2.5 py-1.5 text-xs text-slate-700">
            <DollarSign className="w-3.5 h-3.5 text-purple-600 shrink-0" />
            <select
              id="filter-price-select"
              aria-label="Filter by price tier"
              value={priceFilter}
              onChange={(e) => onPriceFilterChange(e.target.value as 'all' | 'under50' | '50to150' | 'over150')}
              className="bg-transparent text-xs font-semibold text-purple-950 focus:outline-none cursor-pointer"
            >
              <option value="all">All Prices</option>
              <option value="under50">Under $50</option>
              <option value="50to150">$50 - $150</option>
              <option value="over150">$150+</option>
            </select>
          </div>

          {/* Reset Filters button */}
          {activeFilterCount > 0 && (
            <button
              id="reset-filters-btn"
              onClick={onResetFilters}
              className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-bold text-pink-700 bg-pink-50 hover:bg-pink-100 border border-pink-200 rounded-xl transition-colors"
            >
              <X className="w-3.5 h-3.5" />
              <span>Reset ({activeFilterCount})</span>
            </button>
          )}
        </div>

        {/* Right side: Sorting & View Mode */}
        <div className="flex items-center gap-2">
          {/* Sort selector */}
          <div className="flex items-center gap-1.5 bg-purple-50/70 border border-purple-100 rounded-xl px-2.5 py-1.5 text-xs text-slate-700">
            <ArrowUpDown className="w-3.5 h-3.5 text-purple-600" />
            <select
              id="sort-by-select"
              aria-label="Sort products by"
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value as SortOption)}
              className="bg-transparent text-xs font-semibold text-purple-950 focus:outline-none cursor-pointer"
            >
              <option value="highest_rated">Highest Rated</option>
              <option value="lowest_rated">Lowest Rated</option>
              <option value="newest">Recently Rated</option>
              <option value="price_low">Price: Low to High</option>
              <option value="price_high">Price: High to Low</option>
              <option value="most_repurchased">Holy Grails First</option>
            </select>
          </div>

          {/* View toggle */}
          <div className="flex items-center border border-purple-100 rounded-xl p-0.5 bg-purple-50/70">
            <button
              id="view-mode-grid-btn"
              onClick={() => onViewModeChange('grid')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'grid'
                  ? 'bg-white text-purple-950 shadow-2xs font-bold'
                  : 'text-purple-400 hover:text-purple-700'
              }`}
              title="Grid View"
              aria-label="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              id="view-mode-list-btn"
              onClick={() => onViewModeChange('list')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'list'
                  ? 'bg-white text-purple-950 shadow-2xs font-bold'
                  : 'text-purple-400 hover:text-purple-700'
              }`}
              title="List View"
              aria-label="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
