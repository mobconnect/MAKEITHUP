import React from 'react';
import { ProductTutorial } from '../types';
import { Play, Clock, Heart, Bookmark, Sparkles, CheckCircle2, User, ChevronRight, Video, Flame } from 'lucide-react';

interface TutorialCardProps {
  tutorial: ProductTutorial;
  onOpenTutorial: (tutorial: ProductTutorial) => void;
  onToggleLike?: (tutorialId: string) => void;
  onToggleSave?: (tutorialId: string) => void;
}

export const TutorialCard: React.FC<TutorialCardProps> = ({
  tutorial,
  onOpenTutorial,
  onToggleLike,
  onToggleSave
}) => {
  const getCategoryBadgeClass = (category: string) => {
    switch (category) {
      case 'makeup':
        return 'bg-pink-100 text-pink-800 border-pink-200';
      case 'skincare':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'kitchen':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'homewares':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'decor':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-purple-100 text-purple-800 border-purple-200';
    }
  };

  const getDifficultyBadge = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Intermediate':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Advanced':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      default:
        return 'bg-purple-50 text-purple-700 border-purple-200';
    }
  };

  return (
    <div 
      id={`tutorial-card-${tutorial.id}`}
      className="group bg-white rounded-2xl border border-purple-100/90 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col overflow-hidden hover:-translate-y-0.5"
    >
      {/* Cover / Video Thumbnail */}
      <div 
        onClick={() => onOpenTutorial(tutorial)}
        className="relative aspect-video w-full bg-slate-900 cursor-pointer overflow-hidden"
      >
        <img
          src={tutorial.coverImageUrl}
          alt={tutorial.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90 group-hover:opacity-100"
          referrerPolicy="no-referrer"
        />

        {/* Video / Play Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-pink-500/90 text-white flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
            <Play className="w-5 h-5 ml-0.5 fill-current" />
          </div>
        </div>

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
          <span className={`text-3xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border backdrop-blur-xs ${getCategoryBadgeClass(tutorial.productCategory)}`}>
            {tutorial.productCategory}
          </span>
          <span className="inline-flex items-center gap-1 text-3xs font-medium bg-slate-950/80 text-slate-100 px-2 py-0.5 rounded-md backdrop-blur-xs">
            <Clock className="w-3 h-3 text-pink-400" />
            <span>{tutorial.durationMinutes} min</span>
          </span>
        </div>

        {/* Bottom Specs Bar */}
        <div className="absolute bottom-2 left-2.5 right-2.5 flex items-center justify-between text-3xs text-slate-200 font-medium">
          <span className={`px-2 py-0.5 rounded border text-3xs font-semibold ${getDifficultyBadge(tutorial.difficulty)}`}>
            {tutorial.difficulty}
          </span>
          <span className="bg-slate-950/70 px-2 py-0.5 rounded text-slate-300">
            {tutorial.steps.length} Steps
          </span>
        </div>
      </div>

      {/* Content Body */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Product Tag */}
          <div className="flex items-center gap-1.5 text-2xs font-semibold text-pink-600 mb-1 truncate">
            <Sparkles className="w-3 h-3 shrink-0" />
            <span className="truncate">{tutorial.productBrand} • {tutorial.productName}</span>
          </div>

          {/* Title */}
          <h3 
            onClick={() => onOpenTutorial(tutorial)}
            className="text-sm font-bold text-slate-900 line-clamp-2 hover:text-pink-600 cursor-pointer transition-colors leading-snug mb-2"
          >
            {tutorial.title}
          </h3>

          {/* Description */}
          <p className="text-xs text-slate-600 line-clamp-2 mb-3 leading-relaxed">
            {tutorial.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1 mb-3">
            {tutorial.tags.slice(0, 3).map((tag, idx) => (
              <span 
                key={idx}
                className="text-3xs px-2 py-0.5 rounded bg-purple-50 text-purple-700 font-medium border border-purple-100"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Footer info & author */}
        <div className="pt-3 border-t border-purple-50 flex items-center justify-between">
          <div className="flex items-center gap-2 min-w-0">
            <img
              src={tutorial.authorAvatar}
              alt={tutorial.authorName}
              className="w-6 h-6 rounded-full object-cover border border-purple-200 shrink-0"
              referrerPolicy="no-referrer"
            />
            <div className="min-w-0">
              <p className="text-2xs font-bold text-slate-800 truncate">{tutorial.authorName}</p>
              {tutorial.authorBadge && (
                <p className="text-3xs text-pink-600 truncate font-medium">{tutorial.authorBadge}</p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {onToggleLike && (
              <button
                id={`like-tutorial-btn-${tutorial.id}`}
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleLike(tutorial.id);
                }}
                className={`inline-flex items-center gap-1 text-2xs font-medium px-2 py-1 rounded-lg transition-colors ${
                  tutorial.userLiked 
                    ? 'bg-pink-100 text-pink-700 font-bold' 
                    : 'text-slate-500 hover:bg-pink-50 hover:text-pink-600'
                }`}
                title="Like tutorial"
              >
                <Heart className={`w-3.5 h-3.5 ${tutorial.userLiked ? 'fill-pink-600 text-pink-600' : ''}`} />
                <span>{tutorial.likesCount}</span>
              </button>
            )}

            <button
              id={`watch-tutorial-btn-${tutorial.id}`}
              onClick={() => onOpenTutorial(tutorial)}
              className="inline-flex items-center gap-1 px-2.5 py-1 text-2xs font-bold bg-pink-50 hover:bg-pink-100 text-pink-700 rounded-lg transition-colors"
            >
              <span>Watch</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
