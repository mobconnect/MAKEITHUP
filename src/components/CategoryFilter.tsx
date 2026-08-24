import React from 'react';
import { ProductCategory } from '../types';
import { Sparkles, Heart, Coffee, Home, Paintbrush, Compass, Layers } from 'lucide-react';

interface CategoryFilterProps {
  selectedCategory: ProductCategory | 'all';
  onSelectCategory: (category: ProductCategory | 'all') => void;
  categoryCounts: Record<ProductCategory | 'all', number>;
}

export const CATEGORIES: { id: ProductCategory | 'all'; label: string; icon: React.ReactNode }[] = [
  { id: 'all', label: 'All Shelf Items', icon: <Layers className="w-3.5 h-3.5" /> },
  { id: 'makeup', label: 'Makeup & Beauty', icon: <Paintbrush className="w-3.5 h-3.5" /> },
  { id: 'skincare', label: 'Skincare', icon: <Sparkles className="w-3.5 h-3.5" /> },
  { id: 'homewares', label: 'Homewares & Linen', icon: <Home className="w-3.5 h-3.5" /> },
  { id: 'kitchen', label: 'Kitchen & Dining', icon: <Coffee className="w-3.5 h-3.5" /> },
  { id: 'decor', label: 'Decor & Objects', icon: <Compass className="w-3.5 h-3.5" /> }
];

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onSelectCategory,
  categoryCounts
}) => {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
      {CATEGORIES.map((cat) => {
        const isSelected = selectedCategory === cat.id;
        const count = categoryCounts[cat.id] || 0;

        return (
          <button
            key={cat.id}
            id={`category-tab-${cat.id}`}
            onClick={() => onSelectCategory(cat.id)}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-2xl text-xs font-semibold whitespace-nowrap transition-all border ${
              isSelected
                ? 'bg-gradient-to-r from-violet-700 to-purple-900 text-white border-transparent shadow-sm'
                : 'bg-white text-slate-700 border-purple-100/90 hover:bg-purple-50 hover:text-purple-950'
            }`}
          >
            <span className={isSelected ? 'text-pink-300' : 'text-purple-500'}>
              {cat.icon}
            </span>
            <span>{cat.label}</span>
            <span
              className={`text-2xs px-1.5 py-0.5 rounded-full font-bold ${
                isSelected
                  ? 'bg-white/20 text-white'
                  : 'bg-purple-50 text-purple-700'
              }`}
            >
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
};
