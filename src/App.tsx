import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { 
  ProductItem, 
  ProductCategory, 
  SortOption, 
  RepurchaseStatus, 
  BrowsingHistoryItem, 
  AppTab, 
  RecommendedProduct,
  PricePoint,
  BarcodeScannedProduct
} from './types';
import { INITIAL_PRODUCTS } from './data/initialProducts';
import { CatalogItem } from './data/discoverCatalog';
import { computeRecommendations, generateTasteProfile } from './utils/recommendationEngine';

// Components
import { Header } from './components/Header';
import { ShelfSummary } from './components/ShelfSummary';
import { CategoryFilter } from './components/CategoryFilter';
import { FilterBar } from './components/FilterBar';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { AddEditProductModal } from './components/AddEditProductModal';
import { CompareModal } from './components/CompareModal';
import { TasteProfileModal } from './components/TasteProfileModal';
import { BrowsingHistoryModal } from './components/BrowsingHistoryModal';
import { RecommendationsView } from './components/RecommendationsView';
import { DiscoverCatalogView } from './components/DiscoverCatalogView';
import { BarcodeScannerModal } from './components/BarcodeScannerModal';
import { ShareDurabilityModal } from './components/ShareDurabilityModal';

import { 
  Sparkles, 
  Layers, 
  Compass, 
  Sliders, 
  Plus, 
  Scale, 
  History,
  Heart,
  RotateCcw,
  Barcode
} from 'lucide-react';

const STORAGE_KEY_PRODUCTS = 'makeithup_products_v2';
const STORAGE_KEY_HISTORY = 'makeithup_browsing_history_v2';

export default function App() {
  // 1. Rated Products State
  const [products, setProducts] = useState<ProductItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PRODUCTS);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Error reading products from localStorage', e);
    }
    return INITIAL_PRODUCTS;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_PRODUCTS, JSON.stringify(products));
    } catch (e) {
      console.error('Error saving products to localStorage', e);
    }
  }, [products]);

  // 2. Browsing History State
  const [browsingHistory, setBrowsingHistory] = useState<BrowsingHistoryItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_HISTORY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Error reading browsing history', e);
    }
    // Seed with 2 initial browsing events to bootstrap engine signals
    return [
      {
        productId: 'prod-2',
        productName: 'Washed Linen Duvet Cover Set',
        brand: 'Cultiver',
        category: 'homewares',
        subCategory: 'Bedding',
        imageUrl: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80',
        price: 240,
        viewedAt: Date.now() - 1000 * 60 * 30, // 30m ago
        viewCount: 3,
        source: 'shelf'
      },
      {
        productId: 'prod-1',
        productName: 'Soft Pinch Liquid Dewy Blush',
        brand: 'Rare Beauty',
        category: 'makeup',
        subCategory: 'Blush',
        imageUrl: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=80',
        price: 23,
        viewedAt: Date.now() - 1000 * 60 * 120, // 2h ago
        viewCount: 2,
        source: 'shelf'
      }
    ];
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_HISTORY, JSON.stringify(browsingHistory));
    } catch (e) {
      console.error('Error saving browsing history', e);
    }
  }, [browsingHistory]);

  // Record browsing history interaction
  const recordBrowsingEvent = useCallback((
    item: {
      productId: string;
      productName: string;
      brand: string;
      category: ProductCategory;
      subCategory?: string;
      imageUrl: string;
      price: number;
      source: 'shelf' | 'discover' | 'recommendation';
    }
  ) => {
    setBrowsingHistory((prev) => {
      const existingIdx = prev.findIndex((h) => h.productId === item.productId);
      if (existingIdx >= 0) {
        const updated = [...prev];
        updated[existingIdx] = {
          ...updated[existingIdx],
          viewedAt: Date.now(),
          viewCount: updated[existingIdx].viewCount + 1,
          source: item.source
        };
        return updated;
      }
      return [
        {
          ...item,
          viewedAt: Date.now(),
          viewCount: 1
        },
        ...prev.slice(0, 29) // keep last 30
      ];
    });
  }, []);

  // 3. Navigation State
  const [currentTab, setCurrentTab] = useState<AppTab>('for_you');

  // 4. Shelf Filtering & Sorting
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [minRating, setMinRating] = useState<number>(0);
  const [repurchaseFilter, setRepurchaseFilter] = useState<RepurchaseStatus | 'all'>('all');
  const [priceFilter, setPriceFilter] = useState<'all' | 'under50' | '50to150' | 'over150'>('all');
  const [sortBy, setSortBy] = useState<SortOption>('highest_rated');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isFavoriteOnly, setIsFavoriteOnly] = useState(false);

  // 5. Modals State
  const [detailProduct, setDetailProduct] = useState<ProductItem | null>(null);
  const [isAddEditModalOpen, setIsAddEditModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductItem | null>(null);
  const [initialPrefill, setInitialPrefill] = useState<Partial<ProductItem> | null>(null);
  const [compareList, setCompareList] = useState<ProductItem[]>([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  const [isTasteProfileModalOpen, setIsTasteProfileModalOpen] = useState(false);
  const [isBrowsingHistoryModalOpen, setIsBrowsingHistoryModalOpen] = useState(false);
  const [isBarcodeScannerOpen, setIsBarcodeScannerOpen] = useState(false);
  const [shareDurabilityProduct, setShareDurabilityProduct] = useState<ProductItem | null>(null);

  // 6. Recommendation Engine Output
  const recommendations = useMemo(() => {
    return computeRecommendations(products, browsingHistory);
  }, [products, browsingHistory]);

  const tasteProfile = useMemo(() => {
    return generateTasteProfile(products, browsingHistory);
  }, [products, browsingHistory]);

  const ratedProductNames = useMemo(() => {
    return new Set(products.map((p) => p.name.toLowerCase()));
  }, [products]);

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<ProductCategory | 'all', number> = {
      all: products.length,
      makeup: 0,
      skincare: 0,
      homewares: 0,
      kitchen: 0,
      decor: 0
    };
    products.forEach((p) => {
      if (counts[p.category] !== undefined) {
        counts[p.category]++;
      }
    });
    return counts;
  }, [products]);

  // Active filter count
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (minRating > 0) count++;
    if (repurchaseFilter !== 'all') count++;
    if (priceFilter !== 'all') count++;
    if (searchQuery.trim().length > 0) count++;
    if (isFavoriteOnly) count++;
    return count;
  }, [minRating, repurchaseFilter, priceFilter, searchQuery, isFavoriteOnly]);

  const handleResetFilters = () => {
    setMinRating(0);
    setRepurchaseFilter('all');
    setPriceFilter('all');
    setSearchQuery('');
    setIsFavoriteOnly(false);
  };

  const handleFilterHolyGrail = () => {
    if (repurchaseFilter === 'definitely') {
      setRepurchaseFilter('all');
    } else {
      setRepurchaseFilter('definitely');
    }
  };

  const handleFilterFavorites = () => {
    setIsFavoriteOnly((prev) => !prev);
  };

  // Filtered rated shelf products
  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        if (selectedCategory !== 'all' && product.category !== selectedCategory) {
          return false;
        }
        if (minRating > 0 && product.overallRating < minRating) {
          return false;
        }
        if (repurchaseFilter !== 'all' && product.repurchase !== repurchaseFilter) {
          return false;
        }
        if (isFavoriteOnly && !product.isFavorite) {
          return false;
        }
        if (priceFilter === 'under50' && product.price >= 50) return false;
        if (priceFilter === '50to150' && (product.price < 50 || product.price > 150)) return false;
        if (priceFilter === 'over150' && product.price <= 150) return false;

        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = product.name.toLowerCase().includes(q);
          const matchBrand = product.brand.toLowerCase().includes(q);
          const matchSubCat = product.subCategory?.toLowerCase().includes(q);
          const matchReview = product.reviewText.toLowerCase().includes(q);
          const matchTags = product.tags?.some((t) => t.toLowerCase().includes(q));
          const matchProsCons =
            product.pros.some((p) => p.toLowerCase().includes(q)) ||
            product.cons.some((c) => c.toLowerCase().includes(q));

          if (!matchName && !matchBrand && !matchSubCat && !matchReview && !matchTags && !matchProsCons) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case 'highest_rated':
            return b.overallRating - a.overallRating;
          case 'lowest_rated':
            return a.overallRating - b.overallRating;
          case 'newest':
            return new Date(b.dateRated).getTime() - new Date(a.dateRated).getTime();
          case 'price_low':
            return a.price - b.price;
          case 'price_high':
            return b.price - a.price;
          case 'most_repurchased': {
            const repWeight = { definitely: 3, maybe: 2, never: 1 };
            return repWeight[b.repurchase] - repWeight[a.repurchase];
          }
          default:
            return 0;
        }
      });
  }, [products, selectedCategory, minRating, repurchaseFilter, priceFilter, searchQuery, sortBy, isFavoriteOnly]);

  // Product Inspection (logs browsing history event)
  const handleInspectShelfProduct = (product: ProductItem) => {
    recordBrowsingEvent({
      productId: product.id,
      productName: product.name,
      brand: product.brand,
      category: product.category,
      subCategory: product.subCategory,
      imageUrl: product.imageUrl,
      price: product.price,
      source: 'shelf'
    });
    setDetailProduct(product);
  };

  const handleInspectRecommendation = (item: RecommendedProduct) => {
    recordBrowsingEvent({
      productId: item.id,
      productName: item.name,
      brand: item.brand,
      category: item.category,
      subCategory: item.subCategory,
      imageUrl: item.imageUrl,
      price: item.price,
      source: 'recommendation'
    });

    // Synthesize product preview item
    const previewProduct: ProductItem = {
      id: item.id,
      name: item.name,
      brand: item.brand,
      category: item.category,
      subCategory: item.subCategory,
      price: item.price,
      currency: item.currency || '$',
      overallRating: item.estimatedRating,
      repurchase: 'definitely',
      imageUrl: item.imageUrl,
      usageDuration: 'Recommended Pick',
      reviewText: `${item.description} Highlighted reason: ${item.primaryReason}`,
      pros: item.highlights,
      cons: ['Not yet added to personal shelf'],
      dimensions: item.keyDimensions,
      tags: item.tags,
      dateRated: new Date().toISOString().split('T')[0],
      isFavorite: false
    };
    setDetailProduct(previewProduct);
  };

  const handleInspectCatalogItem = (item: CatalogItem) => {
    recordBrowsingEvent({
      productId: item.id,
      productName: item.name,
      brand: item.brand,
      category: item.category,
      subCategory: item.subCategory,
      imageUrl: item.imageUrl,
      price: item.price,
      source: 'discover'
    });

    const previewProduct: ProductItem = {
      id: item.id,
      name: item.name,
      brand: item.brand,
      category: item.category,
      subCategory: item.subCategory,
      price: item.price,
      currency: item.currency,
      overallRating: item.communityRating,
      repurchase: 'definitely',
      imageUrl: item.imageUrl,
      usageDuration: 'Catalog Item',
      reviewText: item.description,
      pros: item.highlights,
      cons: [],
      dimensions: item.dimensions,
      tags: item.tags,
      dateRated: new Date().toISOString().split('T')[0],
      isFavorite: false
    };
    setDetailProduct(previewProduct);
  };

  // Direct Rate actions from recommendations or discover
  const handleRateRecommendedProduct = (item: RecommendedProduct) => {
    setEditingProduct(null);
    setInitialPrefill({
      name: item.name,
      brand: item.brand,
      category: item.category,
      subCategory: item.subCategory,
      price: item.price,
      overallRating: item.estimatedRating,
      imageUrl: item.imageUrl,
      tags: item.tags,
      reviewText: `Discovered via MAKEITHUP Recommendation Engine. Match Reason: ${item.primaryReason}`,
      pros: item.highlights,
      dimensions: item.keyDimensions
    });
    setIsAddEditModalOpen(true);
  };

  const handleRateCatalogItem = (item: CatalogItem) => {
    // If already exists in user's shelf, edit that item
    const existing = products.find((p) => p.name.toLowerCase() === item.name.toLowerCase());
    if (existing) {
      setEditingProduct(existing);
      setInitialPrefill(null);
    } else {
      setEditingProduct(null);
      setInitialPrefill({
        name: item.name,
        brand: item.brand,
        category: item.category,
        subCategory: item.subCategory,
        price: item.price,
        overallRating: item.communityRating,
        imageUrl: item.imageUrl,
        tags: item.tags,
        reviewText: item.description,
        pros: item.highlights,
        dimensions: item.dimensions
      });
    }
    setIsAddEditModalOpen(true);
  };

  // Toggle favorite
  const handleToggleFavorite = (id: string) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isFavorite: !p.isFavorite } : p))
    );
    if (detailProduct && detailProduct.id === id) {
      setDetailProduct((prev) => (prev ? { ...prev, isFavorite: !prev.isFavorite } : null));
    }
  };

  // Quick star update
  const handleUpdateScore = (productId: string, newScore: number) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, overallRating: newScore } : p))
    );
    if (detailProduct && detailProduct.id === productId) {
      setDetailProduct((prev) => (prev ? { ...prev, overallRating: newScore } : null));
    }
  };

  // Save product (Adds to shelf or updates)
  const handleSaveProduct = (savedProduct: ProductItem) => {
    setProducts((prev) => {
      const exists = prev.some((p) => p.id === savedProduct.id);
      if (exists) {
        return prev.map((p) => (p.id === savedProduct.id ? savedProduct : p));
      }
      return [savedProduct, ...prev];
    });

    // Record browsing signal as well
    recordBrowsingEvent({
      productId: savedProduct.id,
      productName: savedProduct.name,
      brand: savedProduct.brand,
      category: savedProduct.category,
      subCategory: savedProduct.subCategory,
      imageUrl: savedProduct.imageUrl,
      price: savedProduct.price,
      source: 'shelf'
    });

    if (detailProduct && detailProduct.id === savedProduct.id) {
      setDetailProduct(savedProduct);
    }
  };

  const handleDeleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    setCompareList((prev) => prev.filter((p) => p.id !== id));
  };

  const handleToggleCompare = (product: ProductItem) => {
    if (compareList.some((p) => p.id === product.id)) {
      setCompareList((prev) => prev.filter((p) => p.id !== product.id));
    } else {
      if (compareList.length >= 4) {
        alert('You can compare up to 4 products at a time.');
        return;
      }
      setCompareList((prev) => [...prev, product]);
    }
  };

  const handleOpenAddModal = () => {
    setEditingProduct(null);
    setInitialPrefill(null);
    setIsAddEditModalOpen(true);
  };

  const handleOpenEditModal = (product: ProductItem) => {
    setEditingProduct(product);
    setInitialPrefill(null);
    setIsAddEditModalOpen(true);
  };

  const handleOpenShareDurability = (product: ProductItem) => {
    setShareDurabilityProduct(product);
  };

  const handleSelectProductForRating = (scannedProduct: BarcodeScannedProduct) => {
    // If it already matches a product on shelf, view it in details modal
    const existing = products.find(
      (p) => (p.barcode && p.barcode === scannedProduct.barcode) || p.name.toLowerCase() === scannedProduct.name.toLowerCase()
    );

    if (existing) {
      setDetailProduct(existing);
    } else {
      // Pre-fill rating modal with scanned barcode info
      setInitialPrefill({
        name: scannedProduct.name,
        brand: scannedProduct.brand,
        category: scannedProduct.category,
        subCategory: scannedProduct.subCategory,
        price: scannedProduct.price,
        imageUrl: scannedProduct.imageUrl,
        barcode: scannedProduct.barcode,
        durabilityProfile: scannedProduct.durabilityProfile,
        storeLocations: scannedProduct.storeLocations,
        primaryRetailer: scannedProduct.primaryRetailer,
        sourceUrl: scannedProduct.sourceUrl
      });
      setEditingProduct(null);
      setIsAddEditModalOpen(true);
    }
  };

  const handleClearBrowsingHistory = () => {
    setBrowsingHistory([]);
  };

  // Add new price point to a product's price history
  const handleAddPricePoint = (productId: string, pricePoint: PricePoint) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id !== productId) return p;
        const currentHistory = p.priceHistory && p.priceHistory.length > 0
          ? [...p.priceHistory]
          : [{ date: p.dateRated || new Date().toISOString().split('T')[0], price: p.price, note: 'Initial shelf entry' }];
        
        const newHistory = [...currentHistory, pricePoint].sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );
        // Latest price becomes the product's active price
        const latestPrice = newHistory[newHistory.length - 1].price;

        return {
          ...p,
          price: latestPrice,
          priceHistory: newHistory
        };
      })
    );

    if (detailProduct && detailProduct.id === productId) {
      setDetailProduct((prev) => {
        if (!prev) return null;
        const currentHistory = prev.priceHistory && prev.priceHistory.length > 0
          ? [...prev.priceHistory]
          : [{ date: prev.dateRated || new Date().toISOString().split('T')[0], price: prev.price, note: 'Initial shelf entry' }];
        const newHistory = [...currentHistory, pricePoint].sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );
        const latestPrice = newHistory[newHistory.length - 1].price;
        return {
          ...prev,
          price: latestPrice,
          priceHistory: newHistory
        };
      });
    }
  };

  // Delete a price point from a product's price history
  const handleDeletePricePoint = (productId: string, pointIndex: number) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id !== productId || !p.priceHistory) return p;
        const newHistory = p.priceHistory.filter((_, idx) => idx !== pointIndex);
        const latestPrice = newHistory.length > 0 ? newHistory[newHistory.length - 1].price : p.price;
        return {
          ...p,
          price: latestPrice,
          priceHistory: newHistory
        };
      })
    );

    if (detailProduct && detailProduct.id === productId && detailProduct.priceHistory) {
      setDetailProduct((prev) => {
        if (!prev || !prev.priceHistory) return null;
        const newHistory = prev.priceHistory.filter((_, idx) => idx !== pointIndex);
        const latestPrice = newHistory.length > 0 ? newHistory[newHistory.length - 1].price : prev.price;
        return {
          ...prev,
          price: latestPrice,
          priceHistory: newHistory
        };
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7FC] text-slate-900 font-sans flex flex-col selection:bg-pink-200 selection:text-purple-950 pb-20 sm:pb-8">
      
      {/* App Header */}
      <Header
        currentTab={currentTab}
        onTabChange={setCurrentTab}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onOpenAddModal={handleOpenAddModal}
        onOpenBarcodeScanner={() => setIsBarcodeScannerOpen(true)}
        compareCount={compareList.length}
        onOpenCompare={() => setIsCompareModalOpen(true)}
        totalProducts={products.length}
        onOpenTasteProfile={() => setIsTasteProfileModalOpen(true)}
        onOpenBrowsingHistory={() => setIsBrowsingHistoryModalOpen(true)}
        historyCount={browsingHistory.length}
      />

      {/* Main App Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        
        {/* Tab 1: For You (Personalized Recommendation Engine) */}
        {currentTab === 'for_you' && (
          <RecommendationsView
            recommendations={recommendations}
            tasteProfile={tasteProfile}
            onOpenTasteProfile={() => setIsTasteProfileModalOpen(true)}
            onOpenBrowsingHistory={() => setIsBrowsingHistoryModalOpen(true)}
            onInspectProduct={handleInspectRecommendation}
            onRateProduct={handleRateRecommendedProduct}
            onOpenAddModal={handleOpenAddModal}
          />
        )}

        {/* Tab 2: My Rated Shelf */}
        {currentTab === 'my_shelf' && (
          <div className="space-y-6">
            {/* Shelf Overview Analytics */}
            <ShelfSummary
              products={products}
              onFilterHolyGrail={handleFilterHolyGrail}
              isHolyGrailFilterActive={repurchaseFilter === 'definitely'}
              onFilterFavorites={handleFilterFavorites}
              isFavoriteFilterActive={isFavoriteOnly}
            />

            {/* Category Tabs */}
            <div>
              <CategoryFilter
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
                categoryCounts={categoryCounts}
              />
            </div>

            {/* Filters and Controls */}
            <FilterBar
              sortBy={sortBy}
              onSortChange={setSortBy}
              minRating={minRating}
              onMinRatingChange={setMinRating}
              repurchaseFilter={repurchaseFilter}
              onRepurchaseFilterChange={setRepurchaseFilter}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
              priceFilter={priceFilter}
              onPriceFilterChange={setPriceFilter}
              onResetFilters={handleResetFilters}
              activeFilterCount={activeFilterCount}
            />

            {/* Products Display Grid / List */}
            {filteredProducts.length === 0 ? (
              <div className="bg-white border border-purple-100 rounded-3xl p-12 text-center shadow-xs">
                <div className="w-12 h-12 bg-pink-50 rounded-2xl flex items-center justify-center text-pink-600 mx-auto mb-3">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold font-display text-slate-900 mb-1">
                  No shelf items found
                </h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto mb-5">
                  {activeFilterCount > 0
                    ? 'Try adjusting your search query, minimum rating, or repurchase filters.'
                    : `No products rated in the ${selectedCategory} category yet.`}
                </p>
                <div className="flex items-center justify-center gap-3">
                  {activeFilterCount > 0 && (
                    <button
                      id="empty-reset-filters-btn"
                      onClick={handleResetFilters}
                      className="px-4 py-2 text-xs font-bold bg-purple-100 text-purple-900 rounded-xl hover:bg-purple-200 transition-colors"
                    >
                      Clear Filters
                    </button>
                  )}
                  <button
                    id="empty-add-product-btn"
                    onClick={handleOpenAddModal}
                    className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold bg-gradient-to-r from-violet-600 to-pink-600 text-white rounded-xl shadow-xs transition-colors"
                  >
                    <Plus className="w-4 h-4 stroke-[3]" />
                    <span>Rate a Product</span>
                  </button>
                </div>
              </div>
            ) : viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    viewMode="grid"
                    onViewDetails={handleInspectShelfProduct}
                    onEditProduct={handleOpenEditModal}
                    onToggleFavorite={handleToggleFavorite}
                    isCompared={compareList.some((p) => p.id === product.id)}
                    onToggleCompare={handleToggleCompare}
                    onShareDurability={handleOpenShareDurability}
                  />
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    viewMode="list"
                    onViewDetails={handleInspectShelfProduct}
                    onEditProduct={handleOpenEditModal}
                    onToggleFavorite={handleToggleFavorite}
                    isCompared={compareList.some((p) => p.id === product.id)}
                    onToggleCompare={handleToggleCompare}
                    onShareDurability={handleOpenShareDurability}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Discover & Rate */}
        {currentTab === 'discover' && (
          <DiscoverCatalogView
            onInspectProduct={handleInspectCatalogItem}
            onRateProduct={handleRateCatalogItem}
            ratedProductNames={ratedProductNames}
          />
        )}

        {/* Tab 4: Taste Profile View */}
        {currentTab === 'taste_profile' && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl border border-purple-100 p-6 sm:p-8 shadow-xs">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-purple-100 pb-6 mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-2xs font-bold uppercase tracking-wider text-pink-600 bg-pink-50 px-2 py-0.5 rounded-md">
                      MAKEITHUP Profile
                    </span>
                    <span className="text-2xs text-slate-400">
                      • {tasteProfile.totalRated} rated • {tasteProfile.totalViews} views
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold font-display text-purple-950">
                    Your Personalized Taste Architecture
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    A real-time mathematical breakdown of your category preferences, brand loyalty, and quality benchmarks.
                  </p>
                </div>

                <button
                  onClick={() => setCurrentTab('for_you')}
                  className="px-4 py-2.5 bg-gradient-to-r from-violet-600 to-pink-600 text-white rounded-2xl font-bold text-xs shadow-sm hover:scale-[1.02] transition-all shrink-0"
                >
                  View Tailored Matches →
                </button>
              </div>

              {/* Grid of Profile Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Category Weight */}
                <div className="space-y-3 bg-purple-50/50 p-5 rounded-2xl border border-purple-100/80">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-purple-950">
                    Category Affinity Distribution
                  </h3>
                  <div className="space-y-2.5">
                    {tasteProfile.topCategories.map((cat) => (
                      <div key={cat.category} className="space-y-1">
                        <div className="flex justify-between text-xs font-semibold text-slate-700 capitalize">
                          <span>{cat.category}</span>
                          <span className="text-purple-700 font-bold">{cat.count} items ({cat.percentage}%)</span>
                        </div>
                        <div className="w-full bg-purple-200/50 rounded-full h-2 overflow-hidden">
                          <div
                            className="bg-gradient-to-r from-violet-600 to-pink-500 h-full rounded-full"
                            style={{ width: `${Math.max(cat.percentage, 5)}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Dimension Importance */}
                <div className="space-y-3 bg-purple-50/50 p-5 rounded-2xl border border-purple-100/80">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-purple-950">
                    Dimensional Importance Ratings
                  </h3>
                  <div className="space-y-2">
                    {tasteProfile.dimensionAffinities.map((dim) => (
                      <div key={dim.name} className="flex items-center justify-between p-2.5 bg-white rounded-xl border border-purple-100">
                        <div>
                          <div className="text-xs font-bold text-slate-800">{dim.name}</div>
                          <div className="text-2xs text-purple-500 font-medium">Importance: {dim.importance}</div>
                        </div>
                        <span className="text-xs font-bold text-violet-700">{dim.score.toFixed(1)} / 5</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* Floating compare notification drawer */}
      {compareList.length > 0 && (
        <div className="fixed bottom-20 sm:bottom-5 right-5 z-40 bg-[#180A28] text-white rounded-2xl shadow-2xl border border-purple-800/80 p-3 sm:p-4 flex items-center gap-3 animate-in slide-in-from-bottom-4">
          <div className="flex items-center gap-2">
            <Scale className="w-4 h-4 text-pink-400" />
            <span className="text-xs sm:text-sm font-semibold">
              {compareList.length} product{compareList.length === 1 ? '' : 's'} selected
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              id="floating-compare-trigger-btn"
              onClick={() => setIsCompareModalOpen(true)}
              className="px-3 py-1.5 text-xs font-bold bg-gradient-to-r from-violet-600 to-pink-600 text-white rounded-xl transition-all shadow-xs"
            >
              Compare
            </button>
            <button
              onClick={() => setCompareList([])}
              className="text-purple-300 hover:text-white text-xs px-1.5 py-1"
            >
              Clear
            </button>
          </div>
        </div>
      )}

      {/* Mobile Bottom Navigation Bar for Authentic App Experience */}
      <nav className="sm:hidden fixed bottom-0 left-0 right-0 z-30 bg-[#180A28]/95 backdrop-blur-lg border-t border-purple-900/60 px-4 py-2 flex items-center justify-around">
        {[
          { id: 'for_you' as AppTab, label: 'For You', icon: <Sparkles className="w-4 h-4" /> },
          { id: 'my_shelf' as AppTab, label: 'My Shelf', icon: <Layers className="w-4 h-4" /> },
          { id: 'discover' as AppTab, label: 'Discover', icon: <Compass className="w-4 h-4" /> },
          { id: 'taste_profile' as AppTab, label: 'Taste', icon: <Sliders className="w-4 h-4" /> }
        ].map((tab) => {
          const isActive = currentTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setCurrentTab(tab.id)}
              className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-xl transition-colors ${
                isActive ? 'text-pink-400 font-bold' : 'text-purple-300 hover:text-white'
              }`}
            >
              <div className={`p-1 rounded-lg ${isActive ? 'bg-pink-500/20' : ''}`}>
                {tab.icon}
              </div>
              <span className="text-2xs">{tab.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Modals */}
      <ProductDetailModal
        product={detailProduct}
        onClose={() => setDetailProduct(null)}
        onEdit={handleOpenEditModal}
        onDelete={handleDeleteProduct}
        onToggleFavorite={handleToggleFavorite}
        onUpdateScore={handleUpdateScore}
        onAddPricePoint={handleAddPricePoint}
        onDeletePricePoint={handleDeletePricePoint}
        onShareDurability={handleOpenShareDurability}
      />

      <AddEditProductModal
        isOpen={isAddEditModalOpen}
        onClose={() => {
          setIsAddEditModalOpen(false);
          setEditingProduct(null);
          setInitialPrefill(null);
        }}
        onSave={handleSaveProduct}
        editingProduct={editingProduct}
        initialPrefill={initialPrefill}
      />

      <CompareModal
        isOpen={isCompareModalOpen}
        onClose={() => setIsCompareModalOpen(false)}
        products={compareList}
        onRemoveFromCompare={(id) => setCompareList((prev) => prev.filter((p) => p.id !== id))}
        onClearAll={() => setCompareList([])}
      />

      <TasteProfileModal
        isOpen={isTasteProfileModalOpen}
        onClose={() => setIsTasteProfileModalOpen(false)}
        tasteProfile={tasteProfile}
        onExploreRecommendations={() => setCurrentTab('for_you')}
      />

      <BrowsingHistoryModal
        isOpen={isBrowsingHistoryModalOpen}
        onClose={() => setIsBrowsingHistoryModalOpen(false)}
        history={browsingHistory}
        onClearHistory={handleClearBrowsingHistory}
        onSelectProduct={(productId) => {
          const item = products.find((p) => p.id === productId);
          if (item) setDetailProduct(item);
        }}
        onExploreRecommendations={() => setCurrentTab('for_you')}
      />

      <BarcodeScannerModal
        isOpen={isBarcodeScannerOpen}
        onClose={() => setIsBarcodeScannerOpen(false)}
        onSelectProductForRating={handleSelectProductForRating}
        existingProducts={products}
      />

      <ShareDurabilityModal
        isOpen={!!shareDurabilityProduct}
        onClose={() => setShareDurabilityProduct(null)}
        product={shareDurabilityProduct}
      />

    </div>
  );
}
