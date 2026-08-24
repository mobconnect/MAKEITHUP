import React, { useState, useRef } from 'react';
import { ProductTutorial, TutorialStep } from '../types';
import { 
  X, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Clock, 
  Sparkles, 
  Heart, 
  Bookmark, 
  Share2, 
  CheckCircle2, 
  ExternalLink, 
  ChevronRight, 
  Layers, 
  Wrench, 
  Lightbulb, 
  Maximize2,
  RotateCcw,
  Film,
  Camera,
  Eye,
  Check
} from 'lucide-react';

interface TutorialDetailModalProps {
  tutorial: ProductTutorial | null;
  onClose: () => void;
  onViewProduct?: (productId: string) => void;
  onToggleLike?: (tutorialId: string) => void;
  onToggleSave?: (tutorialId: string) => void;
}

export const TutorialDetailModal: React.FC<TutorialDetailModalProps> = ({
  tutorial,
  onClose,
  onViewProduct,
  onToggleLike,
  onToggleSave
}) => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [beforeAfterSplit, setBeforeAfterSplit] = useState(50);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  if (!tutorial) return null;

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(() => {});
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleCopyShare = () => {
    const text = `Check out this tutorial: "${tutorial.title}" for ${tutorial.productName} by ${tutorial.authorName}!`;
    navigator.clipboard.writeText(text);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleSelectStep = (index: number) => {
    setActiveStepIndex(index);
    // If step has timecode, parse and jump video
    const step = tutorial.steps[index];
    if (step.timecode && videoRef.current) {
      const parts = step.timecode.split(':').map(Number);
      if (parts.length === 2) {
        const seconds = parts[0] * 60 + parts[1];
        videoRef.current.currentTime = seconds;
        if (!isPlaying) {
          videoRef.current.play().catch(() => {});
          setIsPlaying(true);
        }
      }
    }
  };

  const currentStep: TutorialStep | undefined = tutorial.steps[activeStepIndex];

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto animate-fadeIn">
      <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl border border-purple-100 overflow-hidden flex flex-col max-h-[92vh] my-auto">
        
        {/* Header Bar */}
        <div className="px-5 py-3.5 bg-gradient-to-r from-purple-950 via-slate-900 to-purple-950 text-white flex items-center justify-between border-b border-purple-800/40 shrink-0">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-pink-500/20 border border-pink-500/30 flex items-center justify-center text-pink-400 shrink-0">
              <Film className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-3xs font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-pink-500/30 text-pink-300 border border-pink-500/40">
                  {tutorial.productCategory} In-Use Tutorial
                </span>
                <span className="text-3xs text-purple-300">
                  {tutorial.difficulty} • {tutorial.durationMinutes} min
                </span>
              </div>
              <h2 className="text-sm font-bold text-white truncate max-w-md">
                {tutorial.title}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              id="share-tutorial-modal-btn"
              onClick={handleCopyShare}
              className="p-2 text-purple-200 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
              title="Share tutorial"
            >
              {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
            </button>

            {onToggleLike && (
              <button
                id="like-tutorial-modal-btn"
                onClick={() => onToggleLike(tutorial.id)}
                className={`p-2 rounded-xl transition-colors ${
                  tutorial.userLiked ? 'text-pink-400 bg-pink-500/20' : 'text-purple-200 hover:text-white hover:bg-white/10'
                }`}
                title="Like tutorial"
              >
                <Heart className={`w-4 h-4 ${tutorial.userLiked ? 'fill-current' : ''}`} />
              </button>
            )}

            <button
              id="close-tutorial-modal-btn"
              onClick={onClose}
              className="p-2 text-purple-200 hover:text-white hover:bg-white/10 rounded-xl transition-colors ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto flex-1 p-5 md:p-6 space-y-6">
          
          {/* Main Video Player / Featured Media */}
          <div className="relative rounded-2xl overflow-hidden bg-slate-950 aspect-video shadow-lg border border-purple-200">
            {tutorial.videoUrl ? (
              <video
                ref={videoRef}
                src={tutorial.videoUrl}
                poster={tutorial.coverImageUrl}
                playsInline
                loop
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                className="w-full h-full object-cover"
              />
            ) : (
              <img
                src={tutorial.coverImageUrl}
                alt={tutorial.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            )}

            {/* Video Controls Overlay */}
            {tutorial.videoUrl && (
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/20 flex flex-col justify-between p-4 opacity-90 hover:opacity-100 transition-opacity">
                {/* Top overlay info */}
                <div className="flex items-center justify-between text-white text-xs">
                  <div className="flex items-center gap-2 bg-slate-950/60 px-2.5 py-1 rounded-lg backdrop-blur-xs">
                    <Sparkles className="w-3.5 h-3.5 text-pink-400" />
                    <span className="font-semibold">{tutorial.productBrand} • {tutorial.productName}</span>
                  </div>
                  {currentStep && (
                    <span className="bg-pink-600/90 text-white font-bold text-3xs px-2.5 py-1 rounded-lg backdrop-blur-xs">
                      Step {currentStep.stepNumber} of {tutorial.steps.length}: {currentStep.title}
                    </span>
                  )}
                </div>

                {/* Center play / pause overlay when paused */}
                {!isPlaying && (
                  <div className="flex items-center justify-center">
                    <button
                      id="center-play-tutorial-video-btn"
                      onClick={togglePlay}
                      className="w-16 h-16 rounded-full bg-pink-500 hover:bg-pink-600 text-white flex items-center justify-center shadow-xl transform hover:scale-105 transition-transform"
                    >
                      <Play className="w-7 h-7 ml-1 fill-current" />
                    </button>
                  </div>
                )}

                {/* Bottom playback controls bar */}
                <div className="flex items-center justify-between gap-3 text-white">
                  <div className="flex items-center gap-2">
                    <button
                      id="play-pause-video-btn"
                      onClick={togglePlay}
                      className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
                    >
                      {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
                    </button>

                    <button
                      id="mute-video-btn"
                      onClick={toggleMute}
                      className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
                    >
                      {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    </button>
                  </div>

                  {/* Step Markers / Quick jump pills */}
                  <div className="flex items-center gap-1.5 overflow-x-auto py-1 max-w-md">
                    {tutorial.steps.map((step, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSelectStep(idx)}
                        className={`text-3xs px-2 py-0.5 rounded font-medium whitespace-nowrap transition-all ${
                          activeStepIndex === idx
                            ? 'bg-pink-500 text-white font-bold'
                            : 'bg-slate-900/80 text-slate-300 hover:bg-slate-800'
                        }`}
                      >
                        {step.timecode || `Step ${step.stepNumber}`}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Product Link & Author Card */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-purple-50/70 border border-purple-100 rounded-2xl">
            <div className="flex items-center gap-3">
              <img
                src={tutorial.authorAvatar}
                alt={tutorial.authorName}
                className="w-11 h-11 rounded-full object-cover border-2 border-pink-300 shadow-xs"
                referrerPolicy="no-referrer"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-xs font-bold text-slate-900">{tutorial.authorName}</h4>
                  {tutorial.authorBadge && (
                    <span className="text-3xs font-semibold px-2 py-0.5 rounded-full bg-pink-100 text-pink-700 border border-pink-200">
                      {tutorial.authorBadge}
                    </span>
                  )}
                </div>
                <p className="text-3xs text-slate-500 mt-0.5">
                  Posted on {tutorial.datePosted} • {tutorial.viewsCount.toLocaleString()} community views
                </p>
              </div>
            </div>

            {onViewProduct && (
              <button
                id="view-featured-product-btn"
                onClick={() => {
                  onViewProduct(tutorial.productId);
                  onClose();
                }}
                className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-bold bg-purple-900 hover:bg-purple-800 text-pink-200 hover:text-white rounded-xl transition-all shadow-xs shrink-0 self-start sm:self-auto"
              >
                <Sparkles className="w-3.5 h-3.5 text-pink-400" />
                <span>View Product on Shelf</span>
                <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
              </button>
            )}
          </div>

          {/* Step-by-Step Interactive Guide */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-purple-700" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-purple-950">
                  Step-by-Step Protocol ({tutorial.steps.length} Steps)
                </h3>
              </div>
              <span className="text-2xs text-slate-500 font-medium">Click step to jump timestamp</span>
            </div>

            <div className="space-y-3">
              {tutorial.steps.map((step, idx) => {
                const isActive = activeStepIndex === idx;
                return (
                  <div
                    key={idx}
                    id={`tutorial-step-${step.stepNumber}`}
                    onClick={() => handleSelectStep(idx)}
                    className={`cursor-pointer p-4 rounded-2xl border transition-all ${
                      isActive 
                        ? 'bg-pink-50/70 border-pink-300 ring-2 ring-pink-300/40 shadow-xs' 
                        : 'bg-white border-purple-100 hover:border-purple-200 hover:bg-purple-50/30'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-2.5">
                        <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                          isActive ? 'bg-pink-500 text-white shadow-xs' : 'bg-purple-100 text-purple-800'
                        }`}>
                          {step.stepNumber}
                        </span>
                        <h4 className="text-xs font-bold text-slate-900">{step.title}</h4>
                      </div>

                      {step.timecode && (
                        <span className="inline-flex items-center gap-1 text-3xs font-mono px-2 py-0.5 rounded bg-purple-100/70 text-purple-800 shrink-0 font-semibold">
                          <Clock className="w-3 h-3 text-pink-600" />
                          <span>{step.timecode}</span>
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-slate-700 mt-2 pl-8.5 leading-relaxed">
                      {step.instruction}
                    </p>

                    {step.proTip && (
                      <div className="mt-2.5 ml-8.5 p-2.5 bg-amber-50/80 border border-amber-200/70 rounded-xl text-3xs text-amber-900 flex items-start gap-2">
                        <Lightbulb className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                        <div>
                          <strong className="font-bold text-amber-950">Pro Tip: </strong>
                          <span>{step.proTip}</span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Interactive Before & After Slider Comparison */}
          {tutorial.beforeAfter && (
            <div className="bg-purple-50/50 border border-purple-100 rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <Camera className="w-4 h-4 text-purple-700" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-purple-950">
                  Wear Test / In-Use Before & After
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                {/* Before Card */}
                <div className="bg-white rounded-xl border border-purple-200 overflow-hidden">
                  <div className="relative aspect-4/3 bg-slate-900">
                    <img
                      src={tutorial.beforeAfter.beforeImageUrl}
                      alt="Before"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <span className="absolute top-2 left-2 text-3xs font-bold px-2 py-0.5 rounded bg-slate-900/80 text-white backdrop-blur-xs">
                      {tutorial.beforeAfter.beforeLabel || 'Before'}
                    </span>
                  </div>
                </div>

                {/* After Card */}
                <div className="bg-white rounded-xl border border-pink-200 overflow-hidden">
                  <div className="relative aspect-4/3 bg-slate-900">
                    <img
                      src={tutorial.beforeAfter.afterImageUrl}
                      alt="After"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <span className="absolute top-2 left-2 text-3xs font-bold px-2 py-0.5 rounded bg-pink-600 text-white backdrop-blur-xs">
                      {tutorial.beforeAfter.afterLabel || 'After Finished Technique'}
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-2xs text-slate-700 leading-relaxed bg-white p-3 rounded-xl border border-purple-100">
                {tutorial.beforeAfter.description}
              </p>
            </div>
          )}

          {/* Tools & Pro Tips Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Tools Required */}
            {tutorial.toolsRequired && tutorial.toolsRequired.length > 0 && (
              <div className="bg-white p-4 rounded-2xl border border-purple-100">
                <div className="flex items-center gap-2 mb-2.5">
                  <Wrench className="w-3.5 h-3.5 text-purple-700" />
                  <h4 className="text-2xs font-bold uppercase tracking-wider text-purple-950">
                    Recommended Tools & Equipment
                  </h4>
                </div>
                <ul className="space-y-1.5">
                  {tutorial.toolsRequired.map((tool, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-xs text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-pink-600 shrink-0" />
                      <span>{tool}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* General Pro Tips */}
            {tutorial.proTips && tutorial.proTips.length > 0 && (
              <div className="bg-white p-4 rounded-2xl border border-purple-100">
                <div className="flex items-center gap-2 mb-2.5">
                  <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
                  <h4 className="text-2xs font-bold uppercase tracking-wider text-amber-950">
                    Technique & Care Insights
                  </h4>
                </div>
                <ul className="space-y-1.5">
                  {tutorial.proTips.map((tip, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 mt-1.5" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

        </div>

        {/* Footer */}
        <div className="px-5 py-3.5 bg-slate-50 border-t border-purple-100 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2 text-2xs text-slate-500 font-medium">
            <span>Tagged:</span>
            <div className="flex items-center gap-1 flex-wrap">
              {tutorial.tags.map((tag, idx) => (
                <span key={idx} className="bg-white px-2 py-0.5 rounded border border-purple-100 text-purple-800">
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          <button
            id="done-tutorial-modal-btn"
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white rounded-xl transition-colors shadow-xs"
          >
            Close Tutorial
          </button>
        </div>

      </div>
    </div>
  );
};
