import React from 'react';
import { TasteProfile } from '../types';
import { 
  X, 
  Sparkles, 
  Award, 
  Layers, 
  TrendingUp, 
  Sliders, 
  Eye, 
  Heart,
  Tag,
  CheckCircle2,
  Zap
} from 'lucide-react';

interface TasteProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  tasteProfile: TasteProfile;
  onExploreRecommendations: () => void;
}

export const TasteProfileModal: React.FC<TasteProfileModalProps> = ({
  isOpen,
  onClose,
  tasteProfile,
  onExploreRecommendations
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#180B26]/70 backdrop-blur-md flex items-center justify-center p-3 sm:p-6">
      <div 
        id="taste-profile-modal"
        className="bg-white border border-purple-100 rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-150 max-h-[92vh] flex flex-col"
      >
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-fuchsia-900 text-white p-6 relative">
          <button
            id="close-taste-profile-btn"
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-xl bg-pink-500/20 border border-pink-400/40 flex items-center justify-center text-pink-300">
              <Sparkles className="w-4 h-4" />
            </div>
            <span className="text-xs font-semibold tracking-wider uppercase text-pink-300">
              Personal Recommendation Engine
            </span>
          </div>

          <h2 className="text-2xl font-bold font-display tracking-tight text-white mb-1">
            Your Taste Profile
          </h2>
          <p className="text-xs text-purple-200">
            Synthesized from {tasteProfile.totalRated} product reviews & {tasteProfile.totalViews} browsing signals
          </p>

          <div className="mt-4 bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-3 flex items-center justify-between">
            <div>
              <span className="text-2xs uppercase tracking-wider text-pink-300 font-semibold block">
                Primary Aesthetic Vibe
              </span>
              <span className="text-sm font-semibold text-white">
                {tasteProfile.primaryVibe}
              </span>
            </div>
            <div className="text-right">
              <span className="text-2xs uppercase tracking-wider text-purple-200 font-semibold block">
                Holy Grails
              </span>
              <span className="text-sm font-bold text-pink-300">
                {tasteProfile.holyGrailCount} items
              </span>
            </div>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1 text-slate-800">
          
          {/* Category Affinity Breakdown */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-purple-600" />
                <h3 className="text-sm font-bold text-purple-950">
                  Category Distribution
                </h3>
              </div>
              <span className="text-xs text-purple-600 font-medium">
                {tasteProfile.totalRated} rated total
              </span>
            </div>

            <div className="space-y-2.5 bg-purple-50/50 p-4 rounded-2xl border border-purple-100/70">
              {tasteProfile.topCategories.map((item) => (
                <div key={item.category} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold capitalize text-slate-700">
                      {item.category}
                    </span>
                    <span className="text-purple-700 font-bold">
                      {item.count} items ({item.percentage}%)
                    </span>
                  </div>
                  <div className="w-full bg-purple-200/50 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-violet-600 to-pink-500 h-full rounded-full transition-all duration-500"
                      style={{ width: `${Math.max(item.percentage, 4)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dimension Importance Scoring */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Sliders className="w-4 h-4 text-pink-600" />
              <h3 className="text-sm font-bold text-purple-950">
                What Matters Most to You (Dimensional Weights)
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {tasteProfile.dimensionAffinities.map((dim) => (
                <div 
                  key={dim.name}
                  className="p-3 bg-white rounded-xl border border-purple-100 shadow-2xs flex items-center justify-between"
                >
                  <div>
                    <div className="text-xs font-semibold text-slate-800">
                      {dim.name}
                    </div>
                    <div className="text-2xs text-purple-500 font-medium">
                      Priority: {dim.importance}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-bold text-violet-700">
                      {dim.score.toFixed(1)}
                    </span>
                    <span className="text-2xs text-slate-400">/5</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Brands & Tags */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Top Brands */}
            <div className="bg-pink-50/40 border border-pink-100 p-4 rounded-2xl">
              <div className="flex items-center gap-1.5 text-xs font-bold text-pink-950 mb-2.5">
                <Award className="w-4 h-4 text-pink-600" />
                <span>Highest-Rated Brands</span>
              </div>
              {tasteProfile.favoriteBrands.length === 0 ? (
                <p className="text-xs text-slate-500">Rate products to discover brand affinities.</p>
              ) : (
                <div className="space-y-2">
                  {tasteProfile.favoriteBrands.map((b) => (
                    <div key={b.brand} className="flex items-center justify-between text-xs bg-white p-2 rounded-lg border border-pink-100">
                      <span className="font-semibold text-slate-700">{b.brand}</span>
                      <span className="text-pink-600 font-bold">{b.avgRating.toFixed(1)} ★</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Favorite Aesthetic Tags */}
            <div className="bg-violet-50/40 border border-violet-100 p-4 rounded-2xl">
              <div className="flex items-center gap-1.5 text-xs font-bold text-violet-950 mb-2.5">
                <Tag className="w-4 h-4 text-violet-600" />
                <span>Favorite Product Attributes</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {tasteProfile.topAestheticTags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2.5 py-1 rounded-full bg-white text-violet-800 border border-violet-200 font-medium"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-purple-50/60 border-t border-purple-100 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-purple-700">
            <Zap className="w-4 h-4 text-pink-500" />
            <span>Updated instantly with each rating & view</span>
          </div>

          <button
            id="view-recommendations-cta-btn"
            onClick={() => {
              onClose();
              onExploreRecommendations();
            }}
            className="px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-violet-600 to-pink-600 hover:from-violet-700 hover:to-pink-700 rounded-xl shadow-sm transition-all"
          >
            Explore Recommendations →
          </button>
        </div>
      </div>
    </div>
  );
};
