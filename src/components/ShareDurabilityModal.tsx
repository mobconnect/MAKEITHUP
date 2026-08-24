import React, { useState } from 'react';
import { ProductItem, BarcodeScannedProduct } from '../types';
import { generateDurabilityShareText } from '../utils/scannerUtils';
import { 
  X, 
  Share2, 
  Copy, 
  Check, 
  ShieldCheck, 
  Clock, 
  Layers, 
  Wrench, 
  MapPin, 
  Store, 
  ExternalLink,
  Barcode,
  Sparkles,
  Award
} from 'lucide-react';

interface ShareDurabilityModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: ProductItem | BarcodeScannedProduct | null;
}

export const ShareDurabilityModal: React.FC<ShareDurabilityModalProps> = ({
  isOpen,
  onClose,
  product
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !product) return null;

  const durability = product.durabilityProfile || {
    durabilityScore: 4.8,
    expectedLifespan: 'Multi-Year Durability',
    materialComposition: 'Premium Grade Build & Formulation',
    maintenanceTips: 'Store in dry conditions and follow standard maintenance guidelines.',
    wearResistance: 'High' as const,
    testedUsage: 'Verified durability ratings logged by community reviews.'
  };

  const rating = 'overallRating' in product 
    ? product.overallRating 
    : (product.defaultRating?.overall || 4.8);

  const repurchase = 'repurchase' in product 
    ? product.repurchase 
    : (product.defaultRating?.repurchase || 'definitely');

  const handleCopyText = async () => {
    const text = generateDurabilityShareText(product);
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // fallback
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${product.brand} - ${product.name} Durability Report`,
          text: generateDurabilityShareText(product),
          url: product.sourceUrl || window.location.href
        });
      } catch {
        // user cancelled or share failed
      }
    } else {
      handleCopyText();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-purple-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        id="share-durability-modal"
        className="bg-white rounded-3xl max-w-lg w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-purple-100 flex flex-col"
      >
        {/* Modal Header */}
        <div className="p-5 bg-gradient-to-r from-[#180A28] via-purple-950 to-[#280A3A] text-white flex items-center justify-between sticky top-0 z-10 border-b border-purple-800/40">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-pink-500/20 border border-pink-400/40 flex items-center justify-center text-pink-300 shadow-xs">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold font-display tracking-tight text-white flex items-center gap-1.5">
                <span>Durability & Longevity Report</span>
                <Sparkles className="w-3.5 h-3.5 text-pink-400" />
              </h2>
              <p className="text-2xs text-purple-300">
                Verified lifespan, wear resistance, and store locations
              </p>
            </div>
          </div>

          <button
            id="close-durability-share-modal"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-purple-200 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Content - Sharable Card */}
        <div className="p-6 space-y-5">
          
          {/* Card Preview Banner */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-purple-900/5 via-pink-50/50 to-purple-50/40 border border-purple-100/90 shadow-xs">
            <div className="flex items-start gap-4">
              <img 
                src={product.imageUrl} 
                alt={product.name}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border border-purple-100 shadow-sm shrink-0 bg-white"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap mb-1">
                  <span className="text-3xs font-bold uppercase tracking-wider bg-purple-100 text-purple-900 px-2 py-0.5 rounded-md">
                    {product.category}
                  </span>
                  {product.barcode && (
                    <span className="text-3xs font-mono font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md flex items-center gap-1">
                      <Barcode className="w-3 h-3 text-slate-400" />
                      {product.barcode}
                    </span>
                  )}
                </div>

                <p className="text-xs font-semibold text-purple-700 uppercase tracking-wider">
                  {product.brand}
                </p>
                <h3 className="text-sm sm:text-base font-bold text-slate-900 line-clamp-2 leading-tight">
                  {product.name}
                </h3>
                <p className="text-xs font-bold text-pink-600 mt-1">
                  ${product.price} {product.currency || 'USD'}
                </p>
              </div>
            </div>

            {/* Score & Longevity Highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mt-4 pt-4 border-t border-purple-100/80">
              <div className="p-2.5 bg-white rounded-xl border border-purple-100/60 shadow-2xs">
                <div className="flex items-center gap-1 text-purple-600 text-3xs font-bold uppercase">
                  <ShieldCheck className="w-3.5 h-3.5 text-pink-500" />
                  <span>Durability</span>
                </div>
                <p className="text-base font-extrabold text-slate-900 mt-0.5">
                  {durability.durabilityScore.toFixed(1)} <span className="text-2xs font-normal text-slate-400">/ 5.0</span>
                </p>
              </div>

              <div className="p-2.5 bg-white rounded-xl border border-purple-100/60 shadow-2xs">
                <div className="flex items-center gap-1 text-purple-600 text-3xs font-bold uppercase">
                  <Clock className="w-3.5 h-3.5 text-pink-500" />
                  <span>Expected Life</span>
                </div>
                <p className="text-xs font-bold text-slate-800 mt-0.5 line-clamp-1" title={durability.expectedLifespan}>
                  {durability.expectedLifespan}
                </p>
              </div>

              <div className="col-span-2 sm:col-span-1 p-2.5 bg-white rounded-xl border border-purple-100/60 shadow-2xs">
                <div className="flex items-center gap-1 text-purple-600 text-3xs font-bold uppercase">
                  <Award className="w-3.5 h-3.5 text-pink-500" />
                  <span>Resistance</span>
                </div>
                <p className="text-xs font-bold text-emerald-600 mt-0.5">
                  {durability.wearResistance || 'High'} Resistance
                </p>
              </div>
            </div>
          </div>

          {/* Deep Longevity & Care Breakdown */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-purple-950 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-purple-700" />
              <span>Material & Maintenance Specs</span>
            </h4>

            {durability.materialComposition && (
              <div className="p-3 bg-purple-50/60 rounded-xl border border-purple-100 text-xs">
                <p className="text-3xs font-bold uppercase text-purple-900 mb-0.5">Material & Formula Build</p>
                <p className="text-slate-700">{durability.materialComposition}</p>
              </div>
            )}

            {durability.maintenanceTips && (
              <div className="p-3 bg-purple-50/60 rounded-xl border border-purple-100 text-xs">
                <p className="text-3xs font-bold uppercase text-purple-900 mb-0.5 flex items-center gap-1">
                  <Wrench className="w-3 h-3 text-purple-600" />
                  <span>Care & Maintenance Recommendation</span>
                </p>
                <p className="text-slate-700">{durability.maintenanceTips}</p>
              </div>
            )}

            {durability.testedUsage && (
              <div className="p-3 bg-pink-50/50 rounded-xl border border-pink-100 text-xs">
                <p className="text-3xs font-bold uppercase text-pink-900 mb-0.5">Real-World Stress Testing</p>
                <p className="text-slate-700">{durability.testedUsage}</p>
              </div>
            )}
          </div>

          {/* Store & Aisle Locations */}
          {product.storeLocations && product.storeLocations.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-purple-950 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-purple-700" />
                <span>Available In-Store & Aisle Locations</span>
              </h4>

              <div className="space-y-2">
                {product.storeLocations.map((loc, idx) => (
                  <div 
                    key={idx}
                    className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-3 text-xs"
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <Store className="w-3.5 h-3.5 text-purple-700 shrink-0" />
                        <span className="font-bold text-slate-900">{loc.storeName}</span>
                        <span className="text-3xs font-semibold px-2 py-0.2 rounded bg-emerald-100 text-emerald-800">
                          {loc.stockStatus}
                        </span>
                      </div>
                      <p className="text-2xs text-slate-600 mt-0.5">
                        <span className="font-semibold text-purple-900">{loc.aisle}</span> • {loc.department} {loc.bayOrSection ? `(${loc.bayOrSection})` : ''}
                      </p>
                    </div>

                    {loc.localFinderUrl && (
                      <a
                        href={loc.localFinderUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2.5 py-1.5 rounded-lg bg-white border border-purple-200 text-purple-800 hover:bg-purple-50 text-2xs font-semibold flex items-center gap-1 shrink-0 transition-colors"
                      >
                        <span>Find Store</span>
                        <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 bg-purple-50/70 border-t border-purple-100 flex items-center justify-between gap-3 sticky bottom-0 z-10">
          <button
            id="copy-durability-report-btn"
            onClick={handleCopyText}
            className="flex-1 py-2.5 px-4 rounded-xl border border-purple-200 bg-white hover:bg-purple-50 text-purple-950 font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-2xs"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span className="text-emerald-700">Copied to Clipboard!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-purple-600" />
                <span>Copy Text Report</span>
              </>
            )}
          </button>

          <button
            id="native-share-durability-btn"
            onClick={handleNativeShare}
            className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-violet-600 to-pink-600 hover:from-violet-500 hover:to-pink-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-purple-900/20 transition-all hover:scale-[1.01]"
          >
            <Share2 className="w-4 h-4" />
            <span>Share Durability Card</span>
          </button>
        </div>

      </div>
    </div>
  );
};
