import React, { useState, useMemo } from 'react';
import { RecommendedProduct, TasteProfile, ProductCategory, ProductItem } from '../types';
import { extractDomainFromUrl, MAJOR_RETAILERS } from '../utils/retailerData';
import { 
  Sparkles, 
  Star, 
  TrendingUp, 
  CheckCircle2, 
  Plus, 
  Sliders, 
  Heart, 
  Eye, 
  RotateCcw,
  Zap,
  Tag,
  ArrowRight,
  Filter,
  Check,
  Store,
  ExternalLink
} from 'lucide-react';

interface RecommendationsViewProps {
  recommendations: RecommendedProduct[];
  tasteProfile: TasteProfile;
  onOpenTasteProfile: () => void;
  onOpenBrowsingHistory: () => void;
  onInspectProduct: (item: RecommendedProduct) => void;
  onRateProduct: (item: RecommendedProduct) => void;
  onOpenAddModal: () => void;
}

export const RecommendationsView: React.FC<RecommendationsViewProps> = ({
  recommendations,
  tasteProfile,
  onOpenTasteProfile,
  onOpenBrowsingHistory,
  onInspectProduct,
  onRateProduct,
  onOpenAddModal
}) => {
  const [filterType, setFilterType] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter recommendations
  const filteredRecommendations = useMemo(() => {
    return recommendations.filter((item) => {
      // Category filter
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }

      // Match type filter
      if (filterType === 'holy_grails' && item.matchType !== 'holy_grail_twin') {
        return false;
      }
      if (filterType === 'browsing' && item.matchType !== 'browsing_history') {
        return false;
      }
      if (filterType === 'top_tier' && item.matchScore < 90) {
        return false;
      }
      if (filterType === 'under50' && item.price >= 50) {
        return false;
      }

      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = item.name.toLowerCase().includes(q);
        const matchBrand = item.brand.toLowerCase().includes(q);
        const matchReason = item.primaryReason.toLowerCase().includes(q);
        const matchTags = item.tags.some((t) => t.toLowerCase().includes(q));
        if (!matchName && !matchBrand && !matchReason && !matchTags) {
          return false;
        }
      }

      return true;
    });
  }, [recommendations, filterType, selectedCategory, searchQuery]);

  return (
    <div className="space-y-6">
      
      {/* Hero Recommendation Engine Taste Banner */}
      <div className="bg-gradient-to-br from-[#2D124D] via-[#4A154B] to-[#1F0B38] text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-purple-800/40 relative overflow-hidden">
        {/* Subtle decorative glow circles */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-pink-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-60 h-60 bg-violet-500/20 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-xl space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/20 border border-pink-400/30 text-pink-200 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-pink-300" />
              <span>MAKEITHUP Recommendation Engine</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold font-display tracking-tight text-white">
              Curated for Your Taste
            </h2>

            <p className="text-sm text-purple-200 leading-relaxed">
              Synthesizing your <strong className="text-pink-300">{tasteProfile.totalRated} product reviews</strong> and <strong className="text-pink-300">{tasteProfile.totalViews} browsing views</strong> into tailored product discoveries.
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-2">
              <span className="text-xs px-3 py-1 rounded-lg bg-white/10 text-purple-100 font-medium backdrop-blur-md">
                ✨ Vibe: <strong className="text-white">{tasteProfile.primaryVibe}</strong>
              </span>
              <span className="text-xs px-3 py-1 rounded-lg bg-white/10 text-purple-100 font-medium backdrop-blur-md">
                💎 {tasteProfile.holyGrailCount} Holy Grails
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col gap-2.5 shrink-0 w-full sm:w-auto">
            <button
              id="open-taste-profile-btn"
              onClick={onOpenTasteProfile}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl bg-white text-purple-950 font-bold text-xs hover:bg-purple-50 shadow-md transition-all hover:scale-[1.02]"
            >
              <Sliders className="w-4 h-4 text-violet-600" />
              <span>View Taste Profile & Weights</span>
            </button>

            <button
              id="open-browsing-history-btn"
              onClick={onOpenBrowsingHistory}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/20 backdrop-blur-md transition-all"
            >
              <Eye className="w-4 h-4 text-pink-300" />
              <span>Browsing History Signals ({tasteProfile.totalViews})</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filter & Tuning Bar */}
      <div className="bg-white/90 backdrop-blur-md border border-purple-100 rounded-2xl p-4 shadow-xs space-y-3">
        {/* Row 1: Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {[
            { id: 'all', label: 'All Top Matches', icon: <Sparkles className="w-3.5 h-3.5" /> },
            { id: 'holy_grails', label: 'Holy Grail Twins', icon: <Heart className="w-3.5 h-3.5 text-pink-500" /> },
            { id: 'browsing', label: 'Browsing Activity Signals', icon: <Eye className="w-3.5 h-3.5 text-violet-500" /> },
            { id: 'top_tier', label: '90%+ Match Tier', icon: <Zap className="w-3.5 h-3.5 text-amber-500" /> },
            { id: 'under50', label: 'Under $50', icon: <Tag className="w-3.5 h-3.5 text-emerald-500" /> }
          ].map((pill) => {
            const isSelected = filterType === pill.id;
            return (
              <button
                key={pill.id}
                id={`recomm-filter-tab-${pill.id}`}
                onClick={() => setFilterType(pill.id)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
                  isSelected
                    ? 'bg-purple-900 text-white border-purple-900 shadow-xs'
                    : 'bg-purple-50/50 text-slate-700 border-purple-100 hover:bg-purple-100 hover:text-purple-950'
                }`}
              >
                <span>{pill.icon}</span>
                <span>{pill.label}</span>
              </button>
            );
          })}
        </div>

        {/* Row 2: Category Selector & Search */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-purple-100/60">
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto scrollbar-none">
            {[
              { id: 'all', label: 'All Categories' },
              { id: 'makeup', label: 'Makeup' },
              { id: 'skincare', label: 'Skincare' },
              { id: 'homewares', label: 'Homewares' },
              { id: 'kitchen', label: 'Kitchen' },
              { id: 'decor', label: 'Decor' }
            ].map((cat) => (
              <button
                key={cat.id}
                id={`recomm-cat-filter-${cat.id}`}
                onClick={() => setSelectedCategory(cat.id as ProductCategory | 'all')}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                  selectedCategory === cat.id
                    ? 'bg-pink-100 text-pink-800 font-bold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-purple-50'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="text-xs text-purple-700 font-semibold shrink-0">
            Showing {filteredRecommendations.length} personalized recommendation{filteredRecommendations.length === 1 ? '' : 's'}
          </div>
        </div>
      </div>

      {/* Recommendations Cards Grid */}
      {filteredRecommendations.length === 0 ? (
        <div className="bg-white border border-purple-100 rounded-3xl p-12 text-center shadow-xs">
          <div className="w-12 h-12 bg-pink-50 rounded-2xl flex items-center justify-center text-pink-600 mx-auto mb-3">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900 mb-1">
            No recommendations match this filter
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto mb-4">
            Try switching filter tabs or exploring other categories to discover more products.
          </p>
          <button
            onClick={() => {
              setFilterType('all');
              setSelectedCategory('all');
            }}
            className="px-4 py-2 text-xs font-bold bg-purple-900 text-white rounded-xl hover:bg-purple-950 transition-colors"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecommendations.map((item) => {
            return (
              <div
                key={item.id}
                id={`recommendation-card-${item.id}`}
                className="bg-white rounded-3xl border border-purple-100/90 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group relative"
              >
                {/* Top Image & Match Score Banner */}
                <div>
                  <div 
                    className="relative aspect-16/10 bg-purple-50 overflow-hidden cursor-pointer"
                    onClick={() => onInspectProduct(item)}
                  >
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-purple-950/80 via-transparent to-black/20" />

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-2xs font-bold uppercase tracking-wider bg-white/95 backdrop-blur-md text-purple-950 px-2.5 py-1 rounded-full shadow-xs">
                          {item.category} • {item.subCategory}
                        </span>
                        {item.primaryRetailer && MAJOR_RETAILERS[item.primaryRetailer as keyof typeof MAJOR_RETAILERS] && (
                          <span className={`text-3xs font-bold px-2 py-0.5 rounded-full shadow-2xs ${MAJOR_RETAILERS[item.primaryRetailer as keyof typeof MAJOR_RETAILERS].badgeBg} ${MAJOR_RETAILERS[item.primaryRetailer as keyof typeof MAJOR_RETAILERS].badgeText}`}>
                            {MAJOR_RETAILERS[item.primaryRetailer as keyof typeof MAJOR_RETAILERS].shortName}
                          </span>
                        )}
                      </div>

                      {/* Match Score Badge */}
                      <div className="bg-gradient-to-r from-violet-600 to-pink-600 text-white text-xs font-extrabold px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5 fill-white" />
                        <span>{item.matchScore}% Match</span>
                      </div>
                    </div>

                    {/* Bottom Image Info */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between text-white">
                      <div>
                        <span className="text-xs font-semibold text-purple-200">
                          {item.brand}
                        </span>
                        <div className="text-xl font-bold font-display text-white">
                          ${item.price}
                        </div>
                      </div>

                      <div className="bg-purple-950/80 backdrop-blur-md border border-purple-400/30 px-2.5 py-1 rounded-xl flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 text-pink-400 fill-pink-400" />
                        <span className="text-xs font-bold text-white">
                          {item.estimatedRating.toFixed(1)} ★
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 space-y-3.5">
                    
                    {/* Explainability / Why Recommended Banner */}
                    <div className="bg-purple-50 border border-purple-200/80 rounded-2xl p-3 text-xs text-purple-950 flex items-start gap-2.5">
                      <div className="w-5 h-5 rounded-lg bg-purple-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                        <Sparkles className="w-3 h-3" />
                      </div>
                      <div className="flex-1">
                        <span className="text-2xs font-bold uppercase tracking-wider text-purple-600 block">
                          Why It Matches You
                        </span>
                        <p className="font-semibold text-xs leading-snug mt-0.5">
                          {item.primaryReason}
                        </p>
                      </div>
                    </div>

                    {/* Product Title */}
                    <div>
                      <h3 
                        onClick={() => onInspectProduct(item)}
                        className="text-base font-bold text-slate-900 hover:text-purple-700 cursor-pointer transition-colors leading-snug line-clamp-1"
                      >
                        {item.name}
                      </h3>

                      {/* Store Source Link */}
                      {item.sourceUrl && (
                        <div className="mt-1">
                          <a
                            href={item.sourceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-1 text-3xs font-medium text-purple-700 hover:text-purple-950 bg-purple-50 hover:bg-purple-100 px-2 py-0.5 rounded border border-purple-100 transition-colors truncate max-w-full font-mono"
                            title={item.sourceUrl}
                          >
                            <Store className="w-3 h-3 text-purple-600 shrink-0" />
                            <span className="truncate">{extractDomainFromUrl(item.sourceUrl)}</span>
                            <ExternalLink className="w-2.5 h-2.5 text-purple-400 shrink-0" />
                          </a>
                        </div>
                      )}

                      <p className="text-xs text-slate-600 line-clamp-2 mt-1">
                        {item.description}
                      </p>
                    </div>

                    {/* Key Attributes & Highlights */}
                    <div className="space-y-1.5">
                      <div className="flex flex-wrap gap-1">
                        {item.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="text-2xs px-2 py-0.5 rounded-md bg-purple-50 text-purple-700 border border-purple-100 font-medium"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="p-5 pt-0 flex items-center justify-between gap-2 border-t border-purple-50 mt-2">
                  <button
                    id={`inspect-btn-${item.id}`}
                    onClick={() => onInspectProduct(item)}
                    className="flex-1 py-2 text-xs font-semibold text-purple-700 bg-purple-50 hover:bg-purple-100 rounded-xl transition-colors text-center flex items-center justify-center gap-1"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Inspect</span>
                  </button>

                  <button
                    id={`rate-recomm-btn-${item.id}`}
                    onClick={() => onRateProduct(item)}
                    className="flex-1 py-2 text-xs font-bold text-white bg-gradient-to-r from-violet-600 to-pink-600 hover:from-violet-700 hover:to-pink-700 rounded-xl shadow-xs transition-all text-center flex items-center justify-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5 stroke-[3]" />
                    <span>Rate It</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
