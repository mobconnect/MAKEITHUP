import React, { useState, useEffect } from 'react';
import { ProductItem, ProductCategory, RepurchaseStatus } from '../types';
import { CATEGORY_METRIC_LABELS } from '../data/initialProducts';
import { 
  X, 
  Star, 
  Check, 
  RotateCcw, 
  AlertCircle, 
  Plus, 
  Trash2, 
  Sparkles,
  DollarSign
} from 'lucide-react';

interface AddEditProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: ProductItem) => void;
  editingProduct: ProductItem | null;
  initialPrefill?: Partial<ProductItem> | null;
}

const PRESET_IMAGES: Record<ProductCategory, string[]> = {
  makeup: [
    'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80'
  ],
  skincare: [
    'https://images.unsplash.com/photo-1608248597359-38374a5893a7?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80'
  ],
  homewares: [
    'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=800&q=80'
  ],
  kitchen: [
    'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&w=800&q=80'
  ],
  decor: [
    'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1534349762230-e0cadf78f5da?auto=format&fit=crop&w=800&q=80'
  ]
};

export const AddEditProductModal: React.FC<AddEditProductModalProps> = ({
  isOpen,
  onClose,
  onSave,
  editingProduct,
  initialPrefill
}) => {
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState<ProductCategory>('makeup');
  const [subCategory, setSubCategory] = useState('');
  const [price, setPrice] = useState<number>(25);
  const [overallRating, setOverallRating] = useState<number>(4.5);
  const [repurchase, setRepurchase] = useState<RepurchaseStatus>('definitely');
  const [imageUrl, setImageUrl] = useState('');
  const [usageDuration, setUsageDuration] = useState('3 months');
  const [reviewText, setReviewText] = useState('');
  
  // Dimensions
  const [quality, setQuality] = useState(4.5);
  const [valueScore, setValueScore] = useState(4.0);
  const [longevity, setLongevity] = useState(4.5);
  const [aesthetic, setAesthetic] = useState(4.5);
  const [performance, setPerformance] = useState(4.5);

  // Pros & Cons
  const [pros, setPros] = useState<string[]>([]);
  const [newPro, setNewPro] = useState('');
  const [cons, setCons] = useState<string[]>([]);
  const [newCon, setNewCon] = useState('');

  // Tags
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (editingProduct) {
      setName(editingProduct.name);
      setBrand(editingProduct.brand);
      setCategory(editingProduct.category);
      setSubCategory(editingProduct.subCategory || '');
      setPrice(editingProduct.price);
      setOverallRating(editingProduct.overallRating);
      setRepurchase(editingProduct.repurchase);
      setImageUrl(editingProduct.imageUrl);
      setUsageDuration(editingProduct.usageDuration);
      setReviewText(editingProduct.reviewText);
      setQuality(editingProduct.dimensions.quality);
      setValueScore(editingProduct.dimensions.value);
      setLongevity(editingProduct.dimensions.longevity);
      setAesthetic(editingProduct.dimensions.aesthetic);
      setPerformance(editingProduct.dimensions.performance);
      setPros(editingProduct.pros || []);
      setCons(editingProduct.cons || []);
      setTags(editingProduct.tags || []);
      setIsFavorite(!!editingProduct.isFavorite);
    } else if (initialPrefill) {
      setName(initialPrefill.name || '');
      setBrand(initialPrefill.brand || '');
      setCategory(initialPrefill.category || 'makeup');
      setSubCategory(initialPrefill.subCategory || '');
      setPrice(initialPrefill.price || 25);
      setOverallRating(initialPrefill.overallRating || 4.7);
      setRepurchase(initialPrefill.repurchase || 'definitely');
      setImageUrl(initialPrefill.imageUrl || PRESET_IMAGES[initialPrefill.category || 'makeup'][0]);
      setUsageDuration(initialPrefill.usageDuration || '1 month');
      setReviewText(initialPrefill.reviewText || '');
      setQuality(initialPrefill.dimensions?.quality || 4.7);
      setValueScore(initialPrefill.dimensions?.value || 4.4);
      setLongevity(initialPrefill.dimensions?.longevity || 4.6);
      setAesthetic(initialPrefill.dimensions?.aesthetic || 4.8);
      setPerformance(initialPrefill.dimensions?.performance || 4.7);
      setPros(initialPrefill.pros || []);
      setCons(initialPrefill.cons || []);
      setTags(initialPrefill.tags || []);
      setIsFavorite(false);
    } else {
      // Reset form
      setName('');
      setBrand('');
      setCategory('makeup');
      setSubCategory('');
      setPrice(25);
      setOverallRating(4.5);
      setRepurchase('definitely');
      setImageUrl(PRESET_IMAGES.makeup[0]);
      setUsageDuration('3 months');
      setReviewText('');
      setQuality(4.5);
      setValueScore(4.0);
      setLongevity(4.5);
      setAesthetic(4.5);
      setPerformance(4.5);
      setPros([]);
      setCons([]);
      setTags(['Dewy', 'High Pigment']);
      setIsFavorite(false);
    }
  }, [editingProduct, initialPrefill, isOpen]);

  if (!isOpen) return null;

  const categoryLabels = CATEGORY_METRIC_LABELS[category] || CATEGORY_METRIC_LABELS.homewares;

  const handleAddPro = () => {
    if (newPro.trim()) {
      setPros([...pros, newPro.trim()]);
      setNewPro('');
    }
  };

  const handleAddCon = () => {
    if (newCon.trim()) {
      setCons([...cons, newCon.trim()]);
      setNewCon('');
    }
  };

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !brand.trim()) {
      alert('Please provide a product name and brand.');
      return;
    }

    const numPrice = Number(price) || 0;
    const todayStr = new Date().toISOString().split('T')[0];

    // Compute updated price history
    let updatedPriceHistory = editingProduct?.priceHistory ? [...editingProduct.priceHistory] : [];
    if (editingProduct) {
      if (editingProduct.price !== numPrice) {
        updatedPriceHistory.push({
          date: todayStr,
          price: numPrice,
          note: 'Price updated in rating edit'
        });
      }
    } else {
      updatedPriceHistory = [
        {
          date: todayStr,
          price: numPrice,
          note: 'Initial shelf entry'
        }
      ];
    }

    const finalProduct: ProductItem = {
      id: editingProduct ? editingProduct.id : `prod-${Date.now()}`,
      name: name.trim(),
      brand: brand.trim(),
      category,
      subCategory: subCategory.trim() || undefined,
      price: numPrice,
      currency: '$',
      priceHistory: updatedPriceHistory,
      overallRating: Number(overallRating),
      repurchase,
      imageUrl: imageUrl.trim() || PRESET_IMAGES[category][0],
      usageDuration: usageDuration.trim() || '1 month',
      reviewText: reviewText.trim() || 'No detailed review added.',
      pros,
      cons,
      dimensions: {
        quality: Number(quality),
        value: Number(valueScore),
        longevity: Number(longevity),
        aesthetic: Number(aesthetic),
        performance: Number(performance)
      },
      tags,
      dateRated: editingProduct ? editingProduct.dateRated : todayStr,
      isFavorite
    };

    onSave(finalProduct);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#180B26]/70 backdrop-blur-md flex items-center justify-center p-3 sm:p-6">
      <div 
        id="add-edit-product-modal"
        className="bg-white border border-purple-100 rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-150 max-h-[92vh] flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-purple-100 bg-purple-50/70">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-violet-600 to-pink-500 text-white flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <h2 className="text-lg font-bold font-display text-purple-950">
              {editingProduct ? 'Edit Product Review' : 'Rate a Product'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-purple-100 text-purple-900 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="overflow-y-auto p-6 space-y-6 flex-1 text-slate-800">
          
          {/* Category Selector */}
          <div>
            <label className="block text-2xs font-bold uppercase tracking-wider text-purple-900 mb-2">
              Category
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
              {(['makeup', 'skincare', 'homewares', 'kitchen', 'decor'] as ProductCategory[]).map((cat) => (
                <button
                  type="button"
                  key={cat}
                  onClick={() => {
                    setCategory(cat);
                    if (!editingProduct && !imageUrl) {
                      setImageUrl(PRESET_IMAGES[cat][0]);
                    }
                  }}
                  className={`py-2 px-2 text-xs font-bold rounded-xl border capitalize transition-all ${
                    category === cat
                      ? 'bg-purple-900 text-white border-purple-900 shadow-xs'
                      : 'bg-purple-50/60 text-slate-700 border-purple-100 hover:bg-purple-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Name & Brand */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-2xs font-bold uppercase tracking-wider text-purple-900 mb-1">
                Product Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Soft Pinch Liquid Blush"
                className="w-full bg-purple-50/40 border border-purple-100 rounded-xl px-3.5 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
            </div>

            <div>
              <label className="block text-2xs font-bold uppercase tracking-wider text-purple-900 mb-1">
                Brand *
              </label>
              <input
                type="text"
                required
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                placeholder="e.g. Rare Beauty"
                className="w-full bg-purple-50/40 border border-purple-100 rounded-xl px-3.5 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
            </div>
          </div>

          {/* Subcategory & Price */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-2xs font-bold uppercase tracking-wider text-purple-900 mb-1">
                Sub-Type / Formula
              </label>
              <input
                type="text"
                value={subCategory}
                onChange={(e) => setSubCategory(e.target.value)}
                placeholder="e.g. Liquid Blush, Linen..."
                className="w-full bg-purple-50/40 border border-purple-100 rounded-xl px-3.5 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
            </div>

            <div>
              <label className="block text-2xs font-bold uppercase tracking-wider text-purple-900 mb-1">
                Price ($ USD)
              </label>
              <input
                type="number"
                min="0"
                step="1"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full bg-purple-50/40 border border-purple-100 rounded-xl px-3.5 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
            </div>

            <div>
              <label className="block text-2xs font-bold uppercase tracking-wider text-purple-900 mb-1">
                Testing Duration
              </label>
              <input
                type="text"
                value={usageDuration}
                onChange={(e) => setUsageDuration(e.target.value)}
                placeholder="e.g. 6 months daily"
                className="w-full bg-purple-50/40 border border-purple-100 rounded-xl px-3.5 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
            </div>
          </div>

          {/* Overall Rating & Repurchase Verdict */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-purple-50/60 p-4 rounded-2xl border border-purple-100">
            <div>
              <label className="block text-2xs font-bold uppercase tracking-wider text-purple-950 mb-1">
                Overall Star Rating ({overallRating.toFixed(1)} / 5.0)
              </label>
              <div className="flex items-center gap-1.5 py-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    type="button"
                    key={star}
                    onClick={() => setOverallRating(star)}
                    className="focus:outline-none transition-transform hover:scale-110"
                  >
                    <Star
                      className={`w-6 h-6 ${
                        overallRating >= star
                          ? 'text-pink-500 fill-pink-400'
                          : 'text-purple-200 fill-purple-50'
                      }`}
                    />
                  </button>
                ))}
              </div>
              <input
                type="range"
                min="1.0"
                max="5.0"
                step="0.1"
                value={overallRating}
                onChange={(e) => setOverallRating(Number(e.target.value))}
                className="w-full accent-pink-500 mt-1 cursor-pointer"
              />
            </div>

            <div>
              <label className="block text-2xs font-bold uppercase tracking-wider text-purple-950 mb-1">
                Repurchase Verdict
              </label>
              <div className="grid grid-cols-3 gap-1.5 pt-1">
                {[
                  { id: 'definitely', label: 'Definitely', color: 'bg-pink-500 text-white' },
                  { id: 'maybe', label: 'Maybe', color: 'bg-purple-600 text-white' },
                  { id: 'never', label: 'Never', color: 'bg-rose-600 text-white' }
                ].map((rep) => (
                  <button
                    type="button"
                    key={rep.id}
                    onClick={() => setRepurchase(rep.id as RepurchaseStatus)}
                    className={`py-2 text-xs font-bold rounded-xl border transition-all ${
                      repurchase === rep.id
                        ? `${rep.color} border-transparent shadow-xs`
                        : 'bg-white text-slate-600 border-purple-100 hover:bg-purple-100'
                    }`}
                  >
                    {rep.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 5 Dimensional Scores */}
          <div>
            <h3 className="text-2xs font-bold uppercase tracking-wider text-purple-950 mb-2.5">
              Category Criteria Metrics (1.0 to 5.0)
            </h3>
            <div className="space-y-3 bg-purple-50/40 p-4 rounded-2xl border border-purple-100">
              {[
                { label: categoryLabels.quality, val: quality, setter: setQuality },
                { label: categoryLabels.longevity, val: longevity, setter: setLongevity },
                { label: categoryLabels.performance, val: performance, setter: setPerformance },
                { label: categoryLabels.aesthetic, val: aesthetic, setter: setAesthetic },
                { label: categoryLabels.value, val: valueScore, setter: setValueScore }
              ].map((dim) => (
                <div key={dim.label} className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold text-slate-700">
                    <span>{dim.label}</span>
                    <span className="text-purple-900 font-bold">{dim.val.toFixed(1)}</span>
                  </div>
                  <input
                    type="range"
                    min="1.0"
                    max="5.0"
                    step="0.1"
                    value={dim.val}
                    onChange={(e) => dim.setter(Number(e.target.value))}
                    className="w-full accent-violet-600 cursor-pointer"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Review Text */}
          <div>
            <label className="block text-2xs font-bold uppercase tracking-wider text-purple-900 mb-1">
              Personal Review & Experience
            </label>
            <textarea
              rows={3}
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="How does it feel? Does it hold up over time? Would you recommend it?"
              className="w-full bg-purple-50/40 border border-purple-100 rounded-xl p-3 text-xs font-normal focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
          </div>

          {/* Pros & Cons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Pros */}
            <div>
              <label className="block text-2xs font-bold uppercase tracking-wider text-pink-700 mb-1">
                Pros (Highlights)
              </label>
              <div className="flex gap-1.5 mb-2">
                <input
                  type="text"
                  value={newPro}
                  onChange={(e) => setNewPro(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddPro(); } }}
                  placeholder="Add a pro..."
                  className="flex-1 bg-pink-50/40 border border-pink-100 rounded-xl px-3 py-1.5 text-xs"
                />
                <button
                  type="button"
                  onClick={handleAddPro}
                  className="px-3 py-1.5 bg-pink-600 text-white rounded-xl text-xs font-bold"
                >
                  Add
                </button>
              </div>
              <div className="space-y-1">
                {pros.map((p, i) => (
                  <div key={i} className="flex items-center justify-between text-xs bg-pink-50/80 p-1.5 rounded-lg border border-pink-100">
                    <span className="truncate">{p}</span>
                    <button type="button" onClick={() => setPros(pros.filter((_, idx) => idx !== i))} className="text-pink-600 hover:text-pink-800">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Cons */}
            <div>
              <label className="block text-2xs font-bold uppercase tracking-wider text-purple-700 mb-1">
                Cons (Drawbacks)
              </label>
              <div className="flex gap-1.5 mb-2">
                <input
                  type="text"
                  value={newCon}
                  onChange={(e) => setNewCon(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddCon(); } }}
                  placeholder="Add a con..."
                  className="flex-1 bg-purple-50/40 border border-purple-100 rounded-xl px-3 py-1.5 text-xs"
                />
                <button
                  type="button"
                  onClick={handleAddCon}
                  className="px-3 py-1.5 bg-purple-600 text-white rounded-xl text-xs font-bold"
                >
                  Add
                </button>
              </div>
              <div className="space-y-1">
                {cons.map((c, i) => (
                  <div key={i} className="flex items-center justify-between text-xs bg-purple-50/80 p-1.5 rounded-lg border border-purple-100">
                    <span className="truncate">{c}</span>
                    <button type="button" onClick={() => setCons(cons.filter((_, idx) => idx !== i))} className="text-purple-600 hover:text-purple-800">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-2xs font-bold uppercase tracking-wider text-purple-900 mb-1">
              Formula & Aesthetic Tags
            </label>
            <div className="flex gap-1.5 mb-2">
              <input
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddTag(); } }}
                placeholder="e.g. Dewy, Linen, Minimalist, Matte..."
                className="flex-1 bg-purple-50/40 border border-purple-100 rounded-xl px-3 py-1.5 text-xs"
              />
              <button
                type="button"
                onClick={handleAddTag}
                className="px-3 py-1.5 bg-violet-700 text-white rounded-xl text-xs font-bold"
              >
                + Tag
              </button>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {tags.map((t) => (
                <span key={t} className="inline-flex items-center gap-1 text-xs px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-900 font-semibold">
                  #{t}
                  <button type="button" onClick={() => setTags(tags.filter((tag) => tag !== t))}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Image URL & Presets */}
          <div>
            <label className="block text-2xs font-bold uppercase tracking-wider text-purple-900 mb-1">
              Image URL
            </label>
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://..."
              className="w-full bg-purple-50/40 border border-purple-100 rounded-xl px-3.5 py-2 text-xs font-medium mb-2"
            />
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              <span className="text-2xs text-purple-600 font-bold shrink-0">Presets:</span>
              {(PRESET_IMAGES[category] || []).map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`preset-${i}`}
                  onClick={() => setImageUrl(img)}
                  referrerPolicy="no-referrer"
                  className={`w-10 h-10 rounded-lg object-cover cursor-pointer border-2 shrink-0 ${
                    imageUrl === img ? 'border-pink-500 scale-105' : 'border-purple-100 opacity-70'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Submit Footer */}
          <div className="pt-4 border-t border-purple-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
            >
              Cancel
            </button>
            <button
              id="save-product-submit-btn"
              type="submit"
              className="px-5 py-2 text-xs font-bold bg-gradient-to-r from-violet-600 to-pink-600 hover:from-violet-700 hover:to-pink-700 text-white rounded-xl shadow-sm transition-all"
            >
              {editingProduct ? 'Save Changes' : 'Add to Shelf'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
