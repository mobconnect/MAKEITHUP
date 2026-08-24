import React, { useState, useMemo } from 'react';
import { ProductTutorial, ProductCategory } from '../types';
import { TutorialCard } from './TutorialCard';
import { 
  Film, 
  Search, 
  Plus, 
  Filter, 
  Sparkles, 
  Video, 
  Layers, 
  Flame, 
  Camera,
  PlayCircle
} from 'lucide-react';

interface TutorialsHubViewProps {
  tutorials: ProductTutorial[];
  onOpenTutorial: (tutorial: ProductTutorial) => void;
  onOpenCreateTutorial: () => void;
  onToggleLike: (tutorialId: string) => void;
  onToggleSave: (tutorialId: string) => void;
}

export const TutorialsHubView: React.FC<TutorialsHubViewProps> = ({
  tutorials,
  onOpenTutorial,
  onOpenCreateTutorial,
  onToggleLike,
  onToggleSave
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState<'all' | 'Beginner' | 'Intermediate' | 'Advanced'>('all');
  const [onlyWithVideo, setOnlyWithVideo] = useState(false);

  const categories: { id: ProductCategory | 'all'; label: string }[] = [
    { id: 'all', label: 'All Categories' },
    { id: 'makeup', label: 'Makeup & Glam' },
    { id: 'skincare', label: 'Skincare Routines' },
    { id: 'kitchen', label: 'Kitchen & Barista' },
    { id: 'homewares', label: 'Homewares & Linens' },
    { id: 'decor', label: 'Home Decor' }
  ];

  const filteredTutorials = useMemo(() => {
    return tutorials.filter(tut => {
      // Category filter
      if (selectedCategory !== 'all' && tut.productCategory !== selectedCategory) {
        return false;
      }
      // Difficulty filter
      if (difficultyFilter !== 'all' && tut.difficulty !== difficultyFilter) {
        return false;
      }
      // Video only filter
      if (onlyWithVideo && !tut.videoUrl) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = tut.title.toLowerCase().includes(q);
        const matchesProduct = tut.productName.toLowerCase().includes(q) || tut.productBrand.toLowerCase().includes(q);
        const matchesAuthor = tut.authorName.toLowerCase().includes(q);
        const matchesTags = tut.tags.some(t => t.toLowerCase().includes(q));
        if (!matchesTitle && !matchesProduct && !matchesAuthor && !matchesTags) {
          return false;
        }
      }
      return true;
    });
  }, [tutorials, selectedCategory, difficultyFilter, onlyWithVideo, searchQuery]);

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      
      {/* Hero / Header Banner */}
      <div className="bg-gradient-to-r from-purple-950 via-slate-900 to-pink-950 rounded-3xl p-6 md:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-pink-500/10 to-transparent pointer-events-none" />
        
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-500/20 border border-pink-500/30 text-pink-300 text-3xs font-bold uppercase tracking-wider mb-3">
            <Video className="w-3.5 h-3.5" />
            <span>Community Video & In-Use Demos</span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white mb-2">
            Master Every Product in Real Life
          </h1>

          <p className="text-xs sm:text-sm text-purple-200 leading-relaxed mb-5">
            Step-by-step application routines, wear tests, temperature profiling, and expert techniques from real owners and creators.
          </p>

          <div className="flex items-center gap-3 flex-wrap">
            <button
              id="hub-create-tutorial-btn"
              onClick={onOpenCreateTutorial}
              className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white text-xs font-bold rounded-xl shadow-lg transition-all hover:scale-105"
            >
              <Plus className="w-4 h-4" />
              <span>Share In-Use Tutorial</span>
            </button>

            <span className="text-2xs text-purple-300 font-medium">
              {tutorials.length} community tutorials published
            </span>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-purple-100/90 shadow-xs space-y-3">
        {/* Top search & quick toggles */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-purple-400" />
            <input
              type="text"
              placeholder="Search tutorials by product, technique, or creator..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-purple-50/50 border border-purple-200/80 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:bg-white"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto shrink-0 justify-end">
            <button
              id="filter-video-only-btn"
              onClick={() => setOnlyWithVideo(!onlyWithVideo)}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl border transition-colors ${
                onlyWithVideo 
                  ? 'bg-pink-100 text-pink-800 border-pink-300 font-bold' 
                  : 'bg-white text-slate-700 border-purple-200 hover:bg-purple-50'
              }`}
            >
              <PlayCircle className="w-3.5 h-3.5 text-pink-600" />
              <span>Video Demonstrations Only</span>
            </button>

            <select
              value={difficultyFilter}
              onChange={(e) => setDifficultyFilter(e.target.value as any)}
              className="bg-white border border-purple-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700"
            >
              <option value="all">All Levels</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                id={`tutorial-cat-filter-${cat.id}`}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-xl whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-purple-900 text-white shadow-xs'
                    : 'bg-purple-50/70 text-purple-900 hover:bg-purple-100 border border-purple-100'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid of Tutorial Cards */}
      {filteredTutorials.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredTutorials.map((tut) => (
            <TutorialCard
              key={tut.id}
              tutorial={tut}
              onOpenTutorial={onOpenTutorial}
              onToggleLike={onToggleLike}
              onToggleSave={onToggleSave}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-3xl border border-purple-100 p-8 space-y-4">
          <div className="w-14 h-14 rounded-full bg-pink-50 text-pink-600 flex items-center justify-center mx-auto">
            <Film className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">No tutorials match your filter</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              Try adjusting your search query, difficulty level, or be the first to upload an in-use tutorial!
            </p>
          </div>
          <button
            onClick={onOpenCreateTutorial}
            className="inline-flex items-center gap-2 px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white text-xs font-bold rounded-xl shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Create First Tutorial</span>
          </button>
        </div>
      )}

    </div>
  );
};
