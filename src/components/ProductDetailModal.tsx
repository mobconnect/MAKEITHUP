import React, { useState } from 'react';
import { ProductItem, PricePoint } from '../types';
import { CATEGORY_METRIC_LABELS } from '../data/initialProducts';
import { PriceHistoryChart } from './PriceHistoryChart';
import { 
  X, 
  Star, 
  RotateCcw, 
  Check, 
  Trash2, 
  Edit3, 
  Heart, 
  Calendar, 
  Clock, 
  DollarSign, 
  CheckCircle2, 
  AlertCircle,
  Copy,
  CheckCheck,
  Sparkles,
  TrendingDown
} from 'lucide-react';

interface ProductDetailModalProps {
  product: ProductItem | null;
  onClose: () => void;
  onEdit: (product: ProductItem) => void;
  onDelete: (id: string) => void;
  onToggleFavorite: (id: string) => void;
  onUpdateScore: (productId: string, newScore: number) => void;
  onAddPricePoint?: (productId: string, pricePoint: PricePoint) => void;
  onDeletePricePoint?: (productId: string, pointIndex: number) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onEdit,
  onDelete,
  onToggleFavorite,
  onUpdateScore,
  onAddPricePoint,
  onDeletePricePoint
}) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'review' | 'price_history'>('review');

  if (!product) return null;

  const categoryLabels = CATEGORY_METRIC_LABELS[product.category] || CATEGORY_METRIC_LABELS.homewares;

  const dimensionsList = [
    { key: 'quality', label: categoryLabels.quality, score: product.dimensions.quality },
    { key: 'longevity', label: categoryLabels.longevity, score: product.dimensions.longevity },
    { key: 'performance', label: categoryLabels.performance, score: product.dimensions.performance },
    { key: 'aesthetic', label: categoryLabels.aesthetic, score: product.dimensions.aesthetic },
    { key: 'value', label: categoryLabels.value, score: product.dimensions.value },
  ];

  const handleCopyReview = () => {
    const text = `${product.name} by ${product.brand} - Rating: ${product.overallRating}/5.0\nRepurchase: ${product.repurchase}\nReview: ${product.reviewText}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((starIndex) => {
          const filled = rating >= starIndex;
          const half = !filled && rating >= starIndex - 0.5;

          return (
            <button
              key={starIndex}
              onClick={() => onUpdateScore(product.id, starIndex)}
              className="group focus:outline-none"
              title={`Set rating to ${starIndex} stars`}
            >
              <Star
                className={`w-6 h-6 transition-transform group-hover:scale-110 ${
                  filled
                    ? 'text-pink-500 fill-pink-400'
                    : half
                    ? 'text-pink-400 fill-pink-300/50'
                    : 'text-purple-200 fill-purple-50'
                }`}
              />
            </button>
          );
        })}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#180B26]/70 backdrop-blur-md flex items-center justify-center p-3 sm:p-6">
      <div 
        id="product-detail-modal"
        className="bg-white border border-purple-100 rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-150 max-h-[92vh] flex flex-col"
      >
        {/* Modal Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-purple-100 bg-purple-50/70">
          <div className="flex items-center gap-2">
            <span className="text-2xs font-bold uppercase tracking-wider bg-purple-900 text-white px-2.5 py-1 rounded-full">
              {product.category}
            </span>
            {product.subCategory && (
              <span className="text-xs text-purple-800 font-semibold">
                • {product.subCategory}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              id="detail-fav-btn"
              onClick={() => onToggleFavorite(product.id)}
              className={`p-2 rounded-xl border transition-colors ${
                product.isFavorite
                  ? 'bg-pink-50 text-pink-600 border-pink-200'
                  : 'bg-white text-purple-300 border-purple-100 hover:text-purple-700'
              }`}
              title="Save to favorites"
            >
              <Heart className={`w-4 h-4 ${product.isFavorite ? 'fill-pink-500 text-pink-500' : ''}`} />
            </button>

            <button
              id="detail-edit-btn"
              onClick={() => {
                onClose();
                onEdit(product);
              }}
              className="p-2 rounded-xl border border-purple-100 bg-white text-purple-700 hover:text-purple-950 hover:bg-purple-50 transition-colors"
              title="Edit Product"
            >
              <Edit3 className="w-4 h-4" />
            </button>

            <button
              id="detail-close-btn"
              onClick={onClose}
              className="p-2 rounded-xl bg-purple-100/80 hover:bg-purple-200 text-purple-900 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Navigation Subtabs (Review Details vs Historical Price Tracking) */}
        <div className="flex items-center px-6 pt-3 border-b border-purple-100/80 bg-white gap-4">
          <button
            id="detail-tab-review-btn"
            onClick={() => setActiveTab('review')}
            className={`pb-3 text-xs font-bold transition-all border-b-2 flex items-center gap-1.5 ${
              activeTab === 'review'
                ? 'border-purple-900 text-purple-950'
                : 'border-transparent text-slate-400 hover:text-purple-700'
            }`}
          >
            <span>Review & Criteria</span>
          </button>

          <button
            id="detail-tab-price-btn"
            onClick={() => setActiveTab('price_history')}
            className={`pb-3 text-xs font-bold transition-all border-b-2 flex items-center gap-1.5 ${
              activeTab === 'price_history'
                ? 'border-pink-500 text-pink-600'
                : 'border-transparent text-slate-400 hover:text-purple-700'
            }`}
          >
            <TrendingDown className="w-3.5 h-3.5" />
            <span>Price History Chart</span>
            {product.priceHistory && product.priceHistory.length > 0 && (
              <span className="text-2xs bg-pink-100 text-pink-700 px-1.5 py-0.2 rounded-full font-bold">
                {product.priceHistory.length}
              </span>
            )}
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto p-6 space-y-6 flex-1 text-slate-800">
          
          {/* Main Info Hero */}
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="w-full md:w-56 aspect-square rounded-2xl overflow-hidden bg-purple-50 shrink-0 border border-purple-100 relative group shadow-sm">
              <img
                src={product.imageUrl}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <span className="absolute bottom-2 right-2 text-xs bg-purple-950/80 backdrop-blur-md text-white font-bold px-2 py-0.5 rounded-lg">
                ${product.price}
              </span>
            </div>

            <div className="flex-1 min-w-0 space-y-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-purple-600">
                  {product.brand}
                </p>
                <h2 className="text-xl sm:text-2xl font-bold font-display text-slate-900 leading-tight">
                  {product.name}
                </h2>
              </div>

              {/* Overall Score & Interactive Stars */}
              <div className="bg-purple-50/80 border border-purple-100 rounded-2xl p-3.5 flex items-center justify-between">
                <div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-3xl font-display font-bold text-purple-950">
                      {product.overallRating.toFixed(1)}
                    </span>
                    <span className="text-xs font-semibold text-purple-500">/ 5.0</span>
                  </div>
                  <span className="text-2xs text-purple-600 font-medium">
                    Tap any star to quickly tune score
                  </span>
                </div>
                <div>{renderStars(product.overallRating)}</div>
              </div>

              {/* Repurchase Verdict & Metadata */}
              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600 pt-1">
                <div className="flex items-center gap-1.5 font-medium">
                  <Clock className="w-4 h-4 text-purple-500" />
                  <span>Tested for: <strong>{product.usageDuration}</strong></span>
                </div>
                <div className="flex items-center gap-1.5 font-medium">
                  <Calendar className="w-4 h-4 text-purple-500" />
                  <span>Rated on: <strong>{product.dateRated}</strong></span>
                </div>
              </div>
            </div>
          </div>

          {/* Conditional Subtab View */}
          {activeTab === 'review' ? (
            <div className="space-y-6">
              {/* Full Review Text */}
              <div className="bg-purple-50/40 border border-purple-100 rounded-2xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-purple-900">
                    Detailed User Review
                  </span>
                  <button
                    id="copy-review-btn"
                    onClick={handleCopyReview}
                    className="flex items-center gap-1 text-2xs text-purple-700 hover:text-purple-950 font-semibold"
                  >
                    {copied ? <CheckCheck className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied!' : 'Copy'}</span>
                  </button>
                </div>
                <p className="text-sm text-slate-700 leading-relaxed italic">
                  "{product.reviewText}"
                </p>
              </div>

              {/* Category Dimensions Breakdown */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-purple-900">
                  Category Dimension Scores
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {dimensionsList.map((dim) => (
                    <div 
                      key={dim.key}
                      className="bg-white border border-purple-100 p-3 rounded-2xl shadow-2xs space-y-1.5"
                    >
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-slate-700">{dim.label}</span>
                        <span className="font-bold text-purple-900">{dim.score.toFixed(1)} / 5</span>
                      </div>
                      <div className="w-full bg-purple-100/70 rounded-full h-2 overflow-hidden">
                        <div 
                          className="bg-gradient-to-r from-violet-600 to-pink-500 h-full rounded-full"
                          style={{ width: `${(dim.score / 5) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pros & Cons */}
              {(product.pros.length > 0 || product.cons.length > 0) && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Pros */}
                  <div className="bg-pink-50/50 border border-pink-100 p-4 rounded-2xl">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-pink-950 mb-2">
                      <CheckCircle2 className="w-4 h-4 text-pink-600" />
                      <span>The Highlights (Pros)</span>
                    </div>
                    <ul className="space-y-1.5 text-xs text-slate-700">
                      {product.pros.map((pro, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-pink-600 font-bold">•</span>
                          <span>{pro}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Cons */}
                  <div className="bg-purple-50/50 border border-purple-100 p-4 rounded-2xl">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-purple-950 mb-2">
                      <AlertCircle className="w-4 h-4 text-purple-600" />
                      <span>Considerations (Cons)</span>
                    </div>
                    <ul className="space-y-1.5 text-xs text-slate-700">
                      {product.cons.map((con, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-purple-600 font-bold">•</span>
                          <span>{con}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Tags */}
              {product.tags && product.tags.length > 0 && (
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-2xs font-bold uppercase tracking-wider text-purple-700">
                    Aesthetic & Formula Tags:
                  </span>
                  {product.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-800 border border-purple-100 font-medium"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ) : (
            /* Historical Price Chart View */
            <PriceHistoryChart
              product={product}
              onAddPricePoint={(pt) => {
                if (onAddPricePoint) {
                  onAddPricePoint(product.id, pt);
                }
              }}
              onDeletePricePoint={(idx) => {
                if (onDeletePricePoint) {
                  onDeletePricePoint(product.id, idx);
                }
              }}
            />
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-purple-50/60 border-t border-purple-100 flex items-center justify-between">
          <button
            id="delete-product-btn"
            onClick={() => {
              if (confirm('Are you sure you want to delete this rating from your shelf?')) {
                onDelete(product.id);
                onClose();
              }
            }}
            className="flex items-center gap-1.5 text-xs text-rose-600 hover:text-rose-700 font-semibold px-3 py-1.5 rounded-xl hover:bg-rose-50 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            <span>Remove</span>
          </button>

          <button
            id="close-detail-modal-btn"
            onClick={onClose}
            className="px-5 py-2 text-xs font-bold bg-purple-900 hover:bg-purple-950 text-white rounded-xl shadow-xs transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
