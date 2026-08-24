import React from 'react';
import { ProductItem } from '../types';
import { CATEGORY_METRIC_LABELS } from '../data/initialProducts';
import { 
  X, 
  Star, 
  Check, 
  RotateCcw, 
  Scale, 
  Trash2, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';

interface CompareModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: ProductItem[];
  onRemoveFromCompare: (id: string) => void;
  onClearAll: () => void;
}

export const CompareModal: React.FC<CompareModalProps> = ({
  isOpen,
  onClose,
  products,
  onRemoveFromCompare,
  onClearAll
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#180B26]/70 backdrop-blur-md flex items-center justify-center p-3 sm:p-6">
      <div 
        id="compare-products-modal"
        className="bg-white border border-purple-100 rounded-3xl max-w-5xl w-full overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-150 max-h-[92vh] flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-purple-100 bg-purple-50/70">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-gradient-to-tr from-violet-600 to-pink-500 text-white rounded-xl shadow-xs">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold font-display text-purple-950">
                Side-by-Side Comparison
              </h2>
              <p className="text-xs text-purple-700">
                Comparing {products.length} product{products.length === 1 ? '' : 's'} across formula quality, longevity, value, and aesthetic
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {products.length > 0 && (
              <button
                id="clear-all-compare-btn"
                onClick={onClearAll}
                className="text-xs text-purple-600 hover:text-rose-600 px-2 py-1 rounded-lg transition-colors font-semibold"
              >
                Clear All
              </button>
            )}
            <button
              id="close-compare-modal-btn"
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-purple-100 text-purple-900 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Content */}
        <div className="overflow-x-auto overflow-y-auto p-6 flex-1 text-slate-800">
          {products.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center mx-auto mb-3">
                <Scale className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-1">
                No products currently selected for comparison
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto mb-4">
                Click "+ Compare" on product cards across your shelf to review their metrics side-by-side.
              </p>
              <button
                onClick={onClose}
                className="px-4 py-2 text-xs font-bold bg-purple-900 text-white rounded-xl hover:bg-purple-950 transition-colors"
              >
                Back to Shelf
              </button>
            </div>
          ) : (
            <div className="min-w-[640px]">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-purple-100">
                    <th className="py-3 px-3 w-40 text-2xs font-bold uppercase tracking-wider text-purple-900">
                      Product
                    </th>
                    {products.map((prod) => (
                      <th key={prod.id} className="py-3 px-3 min-w-[180px] align-top">
                        <div className="relative">
                          <button
                            onClick={() => onRemoveFromCompare(prod.id)}
                            className="absolute -top-1 -right-1 p-1 rounded-full bg-purple-100 hover:bg-rose-100 hover:text-rose-600 text-purple-700 transition-colors"
                            title="Remove from comparison"
                          >
                            <X className="w-3 h-3" />
                          </button>
                          <img
                            src={prod.imageUrl}
                            alt={prod.name}
                            referrerPolicy="no-referrer"
                            className="w-16 h-16 rounded-xl object-cover border border-purple-100 mb-2"
                          />
                          <div className="text-2xs font-bold uppercase tracking-wider text-purple-600">
                            {prod.brand}
                          </div>
                          <div className="text-xs font-bold text-slate-900 line-clamp-2">
                            {prod.name}
                          </div>
                          <div className="text-xs font-bold text-purple-900 mt-0.5">
                            ${prod.price}
                          </div>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody className="divide-y divide-purple-50 text-xs">
                  {/* Overall Rating */}
                  <tr className="bg-purple-50/40">
                    <td className="py-3 px-3 font-bold text-purple-950">Overall Rating</td>
                    {products.map((prod) => (
                      <td key={prod.id} className="py-3 px-3">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-pink-500 fill-pink-400" />
                          <span className="text-sm font-bold text-slate-900">
                            {prod.overallRating.toFixed(1)}
                          </span>
                          <span className="text-2xs text-slate-400">/ 5.0</span>
                        </div>
                      </td>
                    ))}
                  </tr>

                  {/* Repurchase Status */}
                  <tr>
                    <td className="py-3 px-3 font-bold text-purple-950">Repurchase Verdict</td>
                    {products.map((prod) => (
                      <td key={prod.id} className="py-3 px-3">
                        {prod.repurchase === 'definitely' ? (
                          <span className="inline-flex items-center gap-1 text-2xs font-bold px-2 py-0.5 rounded-full bg-pink-50 text-pink-700 border border-pink-200">
                            <Check className="w-3 h-3 stroke-[3]" />
                            Definitely Buy
                          </span>
                        ) : prod.repurchase === 'maybe' ? (
                          <span className="inline-flex items-center gap-1 text-2xs font-bold px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200">
                            <RotateCcw className="w-3 h-3" />
                            Maybe
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-2xs font-bold px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200">
                            <X className="w-3 h-3 stroke-[3]" />
                            Would Not
                          </span>
                        )}
                      </td>
                    ))}
                  </tr>

                  {/* Quality Score */}
                  <tr>
                    <td className="py-3 px-3 font-medium text-slate-600">Formula / Build Quality</td>
                    {products.map((prod) => (
                      <td key={prod.id} className="py-3 px-3 font-bold text-slate-900">
                        {prod.dimensions.quality.toFixed(1)} / 5.0
                      </td>
                    ))}
                  </tr>

                  {/* Longevity Score */}
                  <tr>
                    <td className="py-3 px-3 font-medium text-slate-600">Longevity / Wear Time</td>
                    {products.map((prod) => (
                      <td key={prod.id} className="py-3 px-3 font-bold text-slate-900">
                        {prod.dimensions.longevity.toFixed(1)} / 5.0
                      </td>
                    ))}
                  </tr>

                  {/* Performance Score */}
                  <tr>
                    <td className="py-3 px-3 font-medium text-slate-600">Performance & Utility</td>
                    {products.map((prod) => (
                      <td key={prod.id} className="py-3 px-3 font-bold text-slate-900">
                        {prod.dimensions.performance.toFixed(1)} / 5.0
                      </td>
                    ))}
                  </tr>

                  {/* Aesthetic Score */}
                  <tr>
                    <td className="py-3 px-3 font-medium text-slate-600">Aesthetic / Finish</td>
                    {products.map((prod) => (
                      <td key={prod.id} className="py-3 px-3 font-bold text-slate-900">
                        {prod.dimensions.aesthetic.toFixed(1)} / 5.0
                      </td>
                    ))}
                  </tr>

                  {/* Value Score */}
                  <tr>
                    <td className="py-3 px-3 font-medium text-slate-600">Value for Price</td>
                    {products.map((prod) => (
                      <td key={prod.id} className="py-3 px-3 font-bold text-slate-900">
                        {prod.dimensions.value.toFixed(1)} / 5.0
                      </td>
                    ))}
                  </tr>

                  {/* Key Highlights */}
                  <tr className="bg-purple-50/30">
                    <td className="py-3 px-3 font-bold text-purple-950">Key Pros</td>
                    {products.map((prod) => (
                      <td key={prod.id} className="py-3 px-3">
                        <ul className="space-y-1 text-2xs text-slate-600">
                          {prod.pros.slice(0, 2).map((p, i) => (
                            <li key={i} className="flex items-start gap-1">
                              <span className="text-pink-600 font-bold">•</span>
                              <span>{p}</span>
                            </li>
                          ))}
                        </ul>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-purple-50/60 border-t border-purple-100 flex items-center justify-between">
          <span className="text-2xs text-purple-700 font-medium">
            Comparing up to 4 items simultaneously
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-bold bg-purple-900 text-white rounded-xl hover:bg-purple-950 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
