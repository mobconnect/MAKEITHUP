import React, { useState, useMemo } from 'react';
import { ProductCategory, ProductItem } from '../types';
import { DISCOVER_CATALOG, CatalogItem } from '../data/discoverCatalog';
import { 
  Search, 
  Sparkles, 
  Star, 
  Plus, 
  Eye, 
  Tag, 
  SlidersHorizontal,
  CheckCircle2
} from 'lucide-react';

interface DiscoverCatalogViewProps {
  onInspectProduct: (item: CatalogItem) => void;
  onRateProduct: (item: CatalogItem) => void;
  ratedProductNames: Set<string>;
}

export const DiscoverCatalogView: React.FC<DiscoverCatalogViewProps> = ({
  onInspectProduct,
  onRateProduct,
  ratedProductNames
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | 'all'>('all');

  // Extract all unique tags
  const allTags = useMemo(() => {
    const set = new Set<string>();
    DISCOVER_CATALOG.forEach((item) => {
      item.tags.forEach((t) => set.add(t));
    });
    return Array.from(set);
  }, []);

  const filteredCatalog = useMemo(() => {
    return DISCOVER_CATALOG.filter((item) => {
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }
      if (selectedTag !== 'all' && !item.tags.includes(selectedTag)) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = item.name.toLowerCase().includes(q);
        const matchBrand = item.brand.toLowerCase().includes(q);
        const matchDesc = item.description.toLowerCase().includes(q);
        const matchTags = item.tags.some((t) => t.toLowerCase().includes(q));
        if (!matchName && !matchBrand && !matchDesc && !matchTags) return false;
      }
      return true;
    });
  }, [selectedCategory, selectedTag, searchQuery]);

  return (
    <div className="space-y-6">
      {/* Top Header & Search */}
      <div className="bg-white rounded-3xl border border-purple-100 p-6 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold font-display text-purple-950">
              Discover & Rate Products
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Explore trending items across beauty, skincare, and homewares to expand your shelf.
            </p>
          </div>

          {/* Search Input */}
          <div className="w-full md:w-72">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-purple-400 pointer-events-none" />
              <input
                id="discover-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search catalog, brands, tags..."
                className="w-full bg-purple-50/50 border border-purple-100 text-slate-800 placeholder-slate-400 text-xs rounded-xl pl-9 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none border-t border-purple-50 pt-3">
          {[
            { id: 'all', label: 'All Items' },
            { id: 'makeup', label: 'Makeup' },
            { id: 'skincare', label: 'Skincare' },
            { id: 'homewares', label: 'Homewares' },
            { id: 'kitchen', label: 'Kitchen' },
            { id: 'decor', label: 'Decor' }
          ].map((cat) => (
            <button
              key={cat.id}
              id={`discover-cat-${cat.id}`}
              onClick={() => setSelectedCategory(cat.id as ProductCategory | 'all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedCategory === cat.id
                  ? 'bg-purple-900 text-white shadow-xs'
                  : 'bg-purple-50 text-slate-600 hover:bg-purple-100 hover:text-purple-950'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Popular Tags */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-2xs font-bold uppercase tracking-wider text-purple-600 shrink-0 mr-1">
            Tags:
          </span>
          <button
            onClick={() => setSelectedTag('all')}
            className={`text-2xs px-2 py-0.5 rounded-md font-medium transition-colors ${
              selectedTag === 'all'
                ? 'bg-pink-500 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-purple-100'
            }`}
          >
            All
          </button>
          {allTags.slice(0, 10).map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(selectedTag === tag ? 'all' : tag)}
              className={`text-2xs px-2 py-0.5 rounded-md font-medium whitespace-nowrap transition-colors ${
                selectedTag === tag
                  ? 'bg-pink-500 text-white'
                  : 'bg-purple-50 text-purple-700 hover:bg-purple-100'
              }`}
            >
              #{tag}
            </button>
          ))}
        </div>
      </div>

      {/* Catalog Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCatalog.map((item) => {
          const isAlreadyRated = ratedProductNames.has(item.name.toLowerCase());

          return (
            <div
              key={item.id}
              id={`discover-item-${item.id}`}
              className="bg-white rounded-3xl border border-purple-100 overflow-hidden shadow-xs hover:shadow-lg transition-all flex flex-col justify-between group"
            >
              <div>
                <div 
                  className="relative aspect-16/10 bg-purple-50 overflow-hidden cursor-pointer"
                  onClick={() => onInspectProduct(item)}
                >
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-950/70 via-transparent to-black/20" />

                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className="text-2xs font-bold uppercase tracking-wider bg-white/95 text-purple-950 px-2 py-0.5 rounded-md">
                      {item.category}
                    </span>

                    {isAlreadyRated ? (
                      <span className="bg-emerald-500 text-white text-2xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        Rated on Shelf
                      </span>
                    ) : (
                      <span className="bg-purple-950/80 backdrop-blur-md text-white text-2xs font-bold px-2 py-0.5 rounded-md flex items-center gap-1">
                        <Star className="w-3 h-3 text-pink-400 fill-pink-400" />
                        {item.communityRating.toFixed(1)} ★
                      </span>
                    )}
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between text-white">
                    <div>
                      <span className="text-xs font-semibold text-purple-200">
                        {item.brand}
                      </span>
                      <div className="text-lg font-bold font-display text-white">
                        ${item.price}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-5 space-y-2.5">
                  <h3 
                    onClick={() => onInspectProduct(item)}
                    className="text-base font-bold text-slate-900 hover:text-purple-700 cursor-pointer transition-colors leading-snug line-clamp-1"
                  >
                    {item.name}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-2">
                    {item.description}
                  </p>

                  <div className="flex flex-wrap gap-1 pt-1">
                    {item.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-2xs px-2 py-0.5 rounded-md bg-purple-50 text-purple-700 font-medium"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0 flex items-center justify-between gap-2 border-t border-purple-50 mt-2">
                <button
                  id={`inspect-catalog-${item.id}`}
                  onClick={() => onInspectProduct(item)}
                  className="flex-1 py-2 text-xs font-semibold text-purple-700 bg-purple-50 hover:bg-purple-100 rounded-xl transition-colors text-center flex items-center justify-center gap-1"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Inspect</span>
                </button>

                <button
                  id={`rate-catalog-${item.id}`}
                  onClick={() => onRateProduct(item)}
                  className="flex-1 py-2 text-xs font-bold text-white bg-gradient-to-r from-violet-600 to-pink-600 hover:from-violet-700 hover:to-pink-700 rounded-xl shadow-xs transition-all text-center flex items-center justify-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5 stroke-[3]" />
                  <span>{isAlreadyRated ? 'Edit Score' : 'Rate It'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
