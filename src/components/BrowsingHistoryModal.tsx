import React from 'react';
import { BrowsingHistoryItem } from '../types';
import { 
  X, 
  History, 
  Trash2, 
  ExternalLink, 
  Eye, 
  Sparkles, 
  Clock,
  Layers,
  ArrowRight
} from 'lucide-react';

interface BrowsingHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  history: BrowsingHistoryItem[];
  onClearHistory: () => void;
  onSelectProduct: (productId: string) => void;
  onExploreRecommendations: () => void;
}

export const BrowsingHistoryModal: React.FC<BrowsingHistoryModalProps> = ({
  isOpen,
  onClose,
  history,
  onClearHistory,
  onSelectProduct,
  onExploreRecommendations
}) => {
  if (!isOpen) return null;

  const formatTimeAgo = (timestamp: number) => {
    const diffSeconds = Math.floor((Date.now() - timestamp) / 1000);
    if (diffSeconds < 60) return 'Just now';
    const diffMinutes = Math.floor(diffSeconds / 60);
    if (diffMinutes < 60) return `${diffMinutes}m ago`;
    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${Math.floor(diffHours / 24)}d ago`;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#180B26]/70 backdrop-blur-md flex items-center justify-center p-3 sm:p-6">
      <div 
        id="browsing-history-modal"
        className="bg-white border border-purple-100 rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-150 max-h-[90vh] flex flex-col"
      >
        {/* Header */}
        <div className="p-5 border-b border-purple-100 bg-gradient-to-r from-purple-50 via-pink-50 to-purple-50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-purple-600 text-white flex items-center justify-center shadow-sm">
              <History className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold font-display text-purple-950">
                Browsing History & Signals
              </h2>
              <p className="text-xs text-purple-700">
                {history.length} unique item{history.length === 1 ? '' : 's'} viewed recently
              </p>
            </div>
          </div>

          <button
            id="close-browsing-history-btn"
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-purple-200/50 text-purple-900 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Engine influence note */}
        <div className="bg-purple-900 text-purple-100 px-5 py-3 text-xs flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-pink-400 shrink-0" />
            <span>
              Your browsing activity dynamically influences your <strong>For You</strong> recommendations.
            </span>
          </div>
          <button
            onClick={() => {
              onClose();
              onExploreRecommendations();
            }}
            className="text-pink-300 hover:text-white font-semibold text-2xs uppercase tracking-wider shrink-0 underline"
          >
            View Engine
          </button>
        </div>

        {/* Body List */}
        <div className="p-5 overflow-y-auto flex-1 divide-y divide-purple-50">
          {history.length === 0 ? (
            <div className="py-12 text-center text-slate-500 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center mx-auto">
                <Eye className="w-6 h-6" />
              </div>
              <p className="text-sm font-semibold text-slate-800">
                No browsing history yet
              </p>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                As you tap and inspect products across makeup, skincare, and homewares, your browsing trail will appear here.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {history.map((item) => (
                <div
                  key={item.productId}
                  className="flex items-center justify-between gap-3 p-3 rounded-2xl bg-white hover:bg-purple-50/50 border border-purple-100/60 transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={item.imageUrl}
                      alt={item.productName}
                      referrerPolicy="no-referrer"
                      className="w-12 h-12 rounded-xl object-cover border border-purple-100 shrink-0"
                    />
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <span className="text-2xs font-bold uppercase tracking-wider text-pink-600 bg-pink-50 px-1.5 py-0.5 rounded">
                          {item.category}
                        </span>
                        <span className="text-2xs text-slate-400">
                          • {formatTimeAgo(item.viewedAt)}
                        </span>
                      </div>
                      <h4 className="text-xs font-bold text-slate-900 truncate">
                        {item.productName}
                      </h4>
                      <p className="text-2xs text-slate-500">
                        {item.brand} • ${item.price} • Viewed {item.viewCount}x
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      onClose();
                      onSelectProduct(item.productId);
                    }}
                    className="p-2 rounded-xl bg-purple-100 text-purple-700 hover:bg-purple-600 hover:text-white transition-all shrink-0"
                    title="View Product Details"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {history.length > 0 && (
          <div className="p-4 bg-purple-50/40 border-t border-purple-100 flex items-center justify-between">
            <button
              id="clear-history-btn"
              onClick={onClearHistory}
              className="flex items-center gap-1.5 text-xs text-rose-600 hover:text-rose-700 font-semibold px-3 py-1.5 rounded-lg hover:bg-rose-50 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear History</span>
            </button>

            <button
              id="close-history-modal-btn"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold bg-purple-900 text-white rounded-xl hover:bg-purple-950 transition-colors"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
