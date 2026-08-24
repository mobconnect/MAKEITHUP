import React, { useState } from 'react';
import { RetailerKey, RetailerLink, ProductCategory } from '../types';
import { 
  MAJOR_RETAILERS, 
  MAJOR_RETAILERS_LIST, 
  getRetailerSearchUrl, 
  extractDomainFromUrl,
  detectRetailerKeyFromUrlOrName 
} from '../utils/retailerData';
import { 
  ExternalLink, 
  ShoppingBag, 
  Globe, 
  Copy, 
  Check, 
  Plus, 
  Store, 
  Sparkles,
  Search,
  DollarSign
} from 'lucide-react';

interface RetailerLinksSectionProps {
  productName: string;
  brand: string;
  category: ProductCategory;
  price: number;
  sourceUrl?: string;
  primaryRetailer?: RetailerKey | string;
  retailers?: RetailerLink[];
  onAddRetailerLink?: (newLink: RetailerLink) => void;
  compact?: boolean;
}

export const RetailerLinksSection: React.FC<RetailerLinksSectionProps> = ({
  productName,
  brand,
  category,
  price,
  sourceUrl,
  primaryRetailer,
  retailers = [],
  onAddRetailerLink,
  compact = false
}) => {
  const [copied, setCopied] = useState(false);
  const [isAddingCustom, setIsAddingCustom] = useState(false);
  const [customRetailerKey, setCustomRetailerKey] = useState<RetailerKey>('bunnings');
  const [customUrl, setCustomUrl] = useState('');
  const [customPrice, setCustomPrice] = useState<number | ''>(price || '');

  // Resolve current active viewing URL and primary retailer
  const activeRetailerKey: RetailerKey = (primaryRetailer as RetailerKey) || detectRetailerKeyFromUrlOrName(sourceUrl) || 'sephora';
  const activeRetailerInfo = MAJOR_RETAILERS[activeRetailerKey] || MAJOR_RETAILERS.other;
  const currentViewUrl = sourceUrl || getRetailerSearchUrl(activeRetailerKey, productName, brand);
  const currentDomain = sourceUrl ? extractDomainFromUrl(sourceUrl) : activeRetailerInfo.domain;

  const handleCopyUrl = (urlToCopy: string) => {
    navigator.clipboard.writeText(urlToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveCustomRetailer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customUrl.trim()) return;

    const detectedKey = customRetailerKey !== 'other' ? customRetailerKey : detectRetailerKeyFromUrlOrName(customUrl);
    const retailerInfo = MAJOR_RETAILERS[detectedKey] || MAJOR_RETAILERS.other;

    const newLink: RetailerLink = {
      retailerKey: detectedKey,
      name: retailerInfo.name,
      url: customUrl.trim(),
      domain: extractDomainFromUrl(customUrl.trim()),
      price: typeof customPrice === 'number' ? customPrice : price,
      inStock: true,
      isPrimary: false
    };

    if (onAddRetailerLink) {
      onAddRetailerLink(newLink);
    }
    setCustomUrl('');
    setIsAddingCustom(false);
  };

  // Combine provided retailers with quick access to all major stores
  const displayedRetailers: RetailerLink[] = React.useMemo(() => {
    const map = new Map<string, RetailerLink>();

    // 1. Add primary / source link
    map.set(activeRetailerKey, {
      retailerKey: activeRetailerKey,
      name: activeRetailerInfo.name,
      url: currentViewUrl,
      domain: currentDomain,
      price: price,
      inStock: true,
      isPrimary: true
    });

    // 2. Add existing retailer links
    retailers.forEach((r) => {
      if (!map.has(r.retailerKey)) {
        map.set(r.retailerKey, r);
      }
    });

    // 3. Ensure priority major retailers are always quickly searchable
    const priorityKeys: RetailerKey[] = [
      'bunnings',
      'big_w',
      'costco',
      'walmart',
      'sephora',
      'kmart',
      'ikea',
      'sams_club',
      'target',
      'ulta',
      'williams_sonoma',
      'amazon'
    ];

    priorityKeys.forEach((key) => {
      if (!map.has(key)) {
        const info = MAJOR_RETAILERS[key];
        if (info) {
          map.set(key, {
            retailerKey: key,
            name: info.name,
            url: getRetailerSearchUrl(key, productName, brand),
            domain: info.domain,
            inStock: true,
            isPrimary: false
          });
        }
      }
    });

    return Array.from(map.values());
  }, [activeRetailerKey, activeRetailerInfo, currentViewUrl, currentDomain, price, retailers, productName, brand]);

  if (compact) {
    return (
      <div className="flex items-center gap-1.5 flex-wrap">
        <a
          href={currentViewUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-purple-900/90 hover:bg-purple-800 text-white text-2xs font-semibold shadow-xs transition-colors"
          title={`View on ${activeRetailerInfo.name} (${currentDomain})`}
        >
          <Store className="w-3 h-3 text-pink-300" />
          <span>{activeRetailerInfo.shortName}</span>
          <ExternalLink className="w-2.5 h-2.5 text-purple-300" />
        </a>
      </div>
    );
  }

  return (
    <div className="space-y-4 bg-gradient-to-br from-purple-50/70 via-white to-pink-50/40 rounded-2xl border border-purple-100 p-4 sm:p-5 shadow-xs">
      
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-purple-100/80">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-purple-600 text-white flex items-center justify-center shadow-xs">
            <Store className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold font-display text-purple-950 flex items-center gap-1.5">
              <span>Where to Buy & Major Retailers</span>
              <span className="text-3xs font-semibold px-2 py-0.5 rounded-full bg-purple-100 text-purple-800">
                Live Retail Links
              </span>
            </h3>
            <p className="text-2xs text-purple-700">
              Direct website addresses across Bunnings, Big W, Costco, Walmart, Sephora, Kmart, IKEA, Sam's Club & more
            </p>
          </div>
        </div>

        {onAddRetailerLink && !isAddingCustom && (
          <button
            type="button"
            onClick={() => setIsAddingCustom(true)}
            className="inline-flex items-center gap-1 text-2xs font-bold text-purple-700 hover:text-purple-900 bg-purple-100/70 hover:bg-purple-200/80 px-2.5 py-1 rounded-lg transition-colors self-start sm:self-auto"
          >
            <Plus className="w-3 h-3" />
            <span>Add Store URL</span>
          </button>
        )}
      </div>

      {/* Primary Viewing Website Address Bar */}
      <div className="bg-white rounded-xl border border-purple-200/80 p-3 shadow-2xs space-y-2">
        <div className="flex items-center justify-between gap-2 text-2xs">
          <div className="flex items-center gap-1.5 font-bold text-slate-700">
            <Globe className="w-3.5 h-3.5 text-purple-600" />
            <span>Viewing Source Website:</span>
            <span className="px-2 py-0.5 rounded-md bg-purple-50 text-purple-900 font-semibold border border-purple-100">
              {activeRetailerInfo.name}
            </span>
          </div>

          <span className="text-3xs text-slate-400 font-mono">
            {currentDomain}
          </span>
        </div>

        {/* Live URL bar with actions */}
        <div className="flex items-center gap-2 bg-purple-50/50 border border-purple-100 rounded-lg px-3 py-2">
          <span className="text-2xs font-mono text-slate-600 truncate flex-1 select-all" title={currentViewUrl}>
            {currentViewUrl}
          </span>

          <div className="flex items-center gap-1 shrink-0">
            <button
              type="button"
              onClick={() => handleCopyUrl(currentViewUrl)}
              className="p-1 rounded-md text-slate-500 hover:text-purple-700 hover:bg-purple-100 transition-colors"
              title="Copy website address"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            </button>

            <a
              href={currentViewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-purple-600 hover:bg-purple-700 text-white font-bold text-2xs shadow-xs transition-colors"
              title="Open product website in new tab"
            >
              <span>Visit</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>

      {/* Add Custom Store Form */}
      {isAddingCustom && onAddRetailerLink && (
        <form onSubmit={handleSaveCustomRetailer} className="p-3 bg-purple-50/80 border border-purple-200 rounded-xl space-y-3 animate-in fade-in duration-150">
          <div className="flex items-center justify-between text-2xs font-bold text-purple-950">
            <span>Add Custom Store Link</span>
            <button
              type="button"
              onClick={() => setIsAddingCustom(false)}
              className="text-slate-400 hover:text-slate-600"
            >
              Cancel
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div>
              <label className="block text-3xs font-bold text-slate-600 mb-1">Select Major Retailer</label>
              <select
                value={customRetailerKey}
                onChange={(e) => setCustomRetailerKey(e.target.value as RetailerKey)}
                className="w-full bg-white border border-purple-200 text-xs rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-purple-400 text-slate-800"
              >
                {MAJOR_RETAILERS_LIST.map((ret) => (
                  <option key={ret.key} value={ret.key}>
                    {ret.name} ({ret.domain})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-3xs font-bold text-slate-600 mb-1">Store Price ($ optional)</label>
              <input
                type="number"
                value={customPrice}
                onChange={(e) => setCustomPrice(e.target.value ? Number(e.target.value) : '')}
                placeholder={price ? String(price) : '0'}
                className="w-full bg-white border border-purple-200 text-xs rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-purple-400 text-slate-800"
              />
            </div>
          </div>

          <div>
            <label className="block text-3xs font-bold text-slate-600 mb-1">Product Web Address (URL)</label>
            <input
              type="url"
              required
              value={customUrl}
              onChange={(e) => setCustomUrl(e.target.value)}
              placeholder="https://www.bunnings.com.au/product/... or https://www.walmart.com/..."
              className="w-full bg-white border border-purple-200 text-xs rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-purple-400 text-slate-800 font-mono text-2xs"
            />
          </div>

          <div className="flex justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={() => setIsAddingCustom(false)}
              className="px-3 py-1 text-2xs font-semibold text-slate-600 hover:text-slate-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-3 py-1 bg-purple-600 text-white rounded-lg text-2xs font-bold hover:bg-purple-700 shadow-2xs"
            >
              Save Store Link
            </button>
          </div>
        </form>
      )}

      {/* Major Retailers Grid */}
      <div className="space-y-2">
        <div className="text-3xs font-bold uppercase tracking-wider text-purple-900 flex items-center justify-between">
          <span>Search & Compare Across Major Retailers</span>
          <span className="text-slate-400 font-normal">Click any store to open live page</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {displayedRetailers.map((item) => {
            const info = MAJOR_RETAILERS[item.retailerKey] || MAJOR_RETAILERS.other;
            const isSelectedSource = item.retailerKey === activeRetailerKey;

            return (
              <a
                key={item.retailerKey}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative p-2.5 rounded-xl border transition-all duration-200 flex items-center justify-between gap-2 ${
                  isSelectedSource
                    ? 'bg-purple-900 text-white border-purple-700 shadow-xs'
                    : 'bg-white hover:bg-purple-50/60 text-slate-800 border-purple-100 hover:border-purple-300'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div 
                    className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-2xs shrink-0 shadow-2xs ${
                      isSelectedSource ? 'bg-pink-500 text-white' : `${info.badgeBg} ${info.badgeText}`
                    }`}
                  >
                    {info.shortName.charAt(0)}
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className={`text-xs font-bold truncate ${isSelectedSource ? 'text-white' : 'text-slate-900 group-hover:text-purple-950'}`}>
                        {info.shortName}
                      </span>
                      {isSelectedSource && (
                        <span className="text-3xs bg-pink-500/80 text-white px-1.5 py-0.2 rounded font-bold">
                          Viewed
                        </span>
                      )}
                    </div>
                    <p className={`text-3xs truncate font-mono ${isSelectedSource ? 'text-purple-200' : 'text-slate-600'}`}>
                      {info.domain}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  {item.price !== undefined && item.price > 0 && (
                    <span className={`text-xs font-bold ${isSelectedSource ? 'text-pink-300' : 'text-slate-900'}`}>
                      ${item.price}
                    </span>
                  )}
                  <div className={`p-1 rounded-md transition-transform group-hover:translate-x-0.5 ${
                    isSelectedSource ? 'bg-purple-800 text-purple-200' : 'bg-purple-100/60 text-purple-700'
                  }`}>
                    <ExternalLink className="w-3 h-3" />
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};
