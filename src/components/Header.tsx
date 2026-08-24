import React from 'react';
import { Sparkles, Plus, Search, Scale, History, Sliders, Heart, Layers, Compass, Barcode, Camera, Film, Video } from 'lucide-react';
import { AppTab } from '../types';

interface HeaderProps {
  currentTab: AppTab;
  onTabChange: (tab: AppTab) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onOpenAddModal: () => void;
  onOpenBarcodeScanner?: () => void;
  compareCount: number;
  onOpenCompare: () => void;
  totalProducts: number;
  onOpenTasteProfile: () => void;
  onOpenBrowsingHistory: () => void;
  historyCount: number;
  tutorialsCount?: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onTabChange,
  searchQuery,
  onSearchChange,
  onOpenAddModal,
  onOpenBarcodeScanner,
  compareCount,
  onOpenCompare,
  totalProducts,
  onOpenTasteProfile,
  onOpenBrowsingHistory,
  historyCount,
  tutorialsCount = 0
}) => {
  return (
    <header className="bg-[#180A28] text-white border-b border-purple-900/50 sticky top-0 z-30 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top brand & actions bar */}
        <div className="flex items-center justify-between h-16 gap-3 sm:gap-6">
          
          {/* Brand Logo & Title */}
          <div className="flex items-center gap-3 shrink-0 cursor-pointer" onClick={() => onTabChange('for_you')}>
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-violet-600 via-fuchsia-600 to-pink-500 flex items-center justify-center text-white shadow-md shadow-pink-500/20">
              <Sparkles className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold font-display tracking-tight text-white">
                  MAKEITHUP
                </h1>
                <span className="text-2xs bg-pink-500/20 border border-pink-400/40 text-pink-300 px-2 py-0.5 rounded-full font-sans font-semibold">
                  {totalProducts} rated
                </span>
              </div>
              <p className="text-2xs text-purple-300 hidden sm:block font-medium">
                Minimalist Product Ratings & Personalized Recommendations
              </p>
            </div>
          </div>

          {/* Search bar */}
          <div className="flex-1 max-w-sm hidden md:block">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-purple-400 pointer-events-none" />
              <input
                id="search-input-header"
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search products, brands, ingredients..."
                className="w-full bg-purple-950/60 border border-purple-800/70 text-purple-100 placeholder-purple-400 text-xs rounded-xl pl-9 pr-8 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all"
              />
              {searchQuery && (
                <button
                  id="clear-search-btn"
                  onClick={() => onSearchChange('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-2xs text-purple-400 hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            
            {/* History Signal Button */}
            <button
              id="header-history-btn"
              onClick={onOpenBrowsingHistory}
              className="p-2 sm:px-3 sm:py-2 text-xs font-semibold bg-purple-950/80 hover:bg-purple-900 text-purple-200 border border-purple-800/60 rounded-xl transition-colors flex items-center gap-1.5"
              title="View Browsing History"
            >
              <History className="w-4 h-4 text-pink-400" />
              <span className="hidden lg:inline">History</span>
              {historyCount > 0 && (
                <span className="text-2xs bg-pink-500 text-white rounded-full px-1.5 py-0.2 font-bold">
                  {historyCount}
                </span>
              )}
            </button>

            {/* Compare Button */}
            {compareCount > 0 && (
              <button
                id="open-compare-btn"
                onClick={onOpenCompare}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold bg-purple-900 text-pink-300 border border-pink-500/40 rounded-xl transition-colors shadow-xs"
              >
                <Scale className="w-4 h-4 text-pink-400" />
                <span>Compare ({compareCount})</span>
              </button>
            )}

            {/* Scan Barcode / Camera Button */}
            {onOpenBarcodeScanner && (
              <button
                id="header-barcode-scan-btn"
                onClick={onOpenBarcodeScanner}
                className="flex items-center gap-1.5 px-3 sm:px-3.5 py-2 text-xs font-bold bg-purple-900/90 hover:bg-purple-800 text-pink-300 border border-pink-500/40 hover:border-pink-400 rounded-xl shadow-xs transition-all hover:scale-[1.02]"
                title="Scan Physical Product Barcode"
              >
                <Barcode className="w-4 h-4 text-pink-400" />
                <span className="hidden sm:inline">Scan Barcode</span>
                <span className="sm:hidden">Scan</span>
              </button>
            )}

            {/* Rate New Product Button */}
            <button
              id="add-new-product-header-btn"
              onClick={onOpenAddModal}
              className="flex items-center gap-1.5 px-3.5 sm:px-4 py-2 text-xs font-bold bg-gradient-to-r from-violet-600 to-pink-600 hover:from-violet-500 hover:to-pink-500 text-white rounded-xl shadow-md shadow-purple-900/40 transition-all hover:scale-[1.02]"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span className="hidden sm:inline">Rate Product</span>
              <span className="sm:hidden">Rate</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation Navigation Strip */}
        <div className="flex items-center justify-between gap-1 overflow-x-auto py-2 border-t border-purple-900/40 scrollbar-none">
          <div className="flex items-center gap-1 sm:gap-2">
            {[
              { id: 'for_you' as AppTab, label: 'For You', icon: <Sparkles className="w-4 h-4" />, badge: 'Engine' },
              { id: 'my_shelf' as AppTab, label: 'My Rated Shelf', icon: <Layers className="w-4 h-4" />, count: totalProducts },
              { id: 'discover' as AppTab, label: 'Discover & Rate', icon: <Compass className="w-4 h-4" /> },
              { id: 'taste_profile' as AppTab, label: 'Taste Profile', icon: <Sliders className="w-4 h-4" /> }
            ].map((tab) => {
              const isActive = currentTab === tab.id;
              return (
                <button
                  key={tab.id}
                  id={`tab-btn-${tab.id}`}
                  onClick={() => onTabChange(tab.id)}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-gradient-to-r from-pink-500 to-violet-600 text-white shadow-sm'
                      : 'text-purple-300 hover:text-white hover:bg-purple-900/50'
                  }`}
                >
                  <span className={isActive ? 'text-white' : 'text-purple-400'}>
                    {tab.icon}
                  </span>
                  <span>{tab.label}</span>
                  {tab.badge && (
                    <span className="text-2xs bg-white/20 text-white px-1.5 py-0.2 rounded-full font-sans">
                      {tab.badge}
                    </span>
                  )}
                  {tab.count !== undefined && (
                    <span className={`text-2xs px-1.5 py-0.2 rounded-full font-sans ${isActive ? 'bg-white/25 text-white' : 'bg-purple-900 text-purple-300'}`}>
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </header>
  );
};
