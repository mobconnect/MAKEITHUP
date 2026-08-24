import React, { useState, useMemo } from 'react';
import { PricePoint, ProductItem } from '../types';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Area,
  ReferenceLine
} from 'recharts';
import {
  TrendingDown,
  TrendingUp,
  Minus,
  DollarSign,
  Calendar,
  Plus,
  Trash2,
  Tag,
  ArrowDownRight,
  ArrowUpRight,
  Sparkles,
  Info,
  Clock
} from 'lucide-react';

interface PriceHistoryChartProps {
  product: ProductItem;
  onAddPricePoint?: (pricePoint: PricePoint) => void;
  onDeletePricePoint?: (index: number) => void;
}

export const PriceHistoryChart: React.FC<PriceHistoryChartProps> = ({
  product,
  onAddPricePoint,
  onDeletePricePoint
}) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newPrice, setNewPrice] = useState<number>(product.price || 0);
  const [newDate, setNewDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [newNote, setNewNote] = useState<string>('');
  const [activeRange, setActiveRange] = useState<'all' | '6m' | '1y'>('all');

  // Normalize price history points, sorting chronologically
  const rawHistory: PricePoint[] = useMemo(() => {
    if (product.priceHistory && product.priceHistory.length > 0) {
      return [...product.priceHistory].sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      );
    }
    // Default baseline if none exists
    return [
      {
        date: product.dateRated || new Date().toISOString().split('T')[0],
        price: product.price,
        note: 'Initial shelf entry'
      }
    ];
  }, [product.priceHistory, product.dateRated, product.price]);

  // Filter based on active range
  const filteredHistory = useMemo(() => {
    if (activeRange === 'all') return rawHistory;
    const now = new Date().getTime();
    const cutoffDays = activeRange === '6m' ? 180 : 365;
    const cutoffTime = now - cutoffDays * 24 * 60 * 60 * 1000;
    const subset = rawHistory.filter(
      (pt) => new Date(pt.date).getTime() >= cutoffTime
    );
    return subset.length > 0 ? subset : rawHistory;
  }, [rawHistory, activeRange]);

  // Chart data formatting
  const chartData = useMemo(() => {
    return filteredHistory.map((item) => {
      const dateObj = new Date(item.date);
      const formattedDate = !isNaN(dateObj.getTime())
        ? dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: '2-digit' })
        : item.date;

      return {
        date: item.date,
        displayDate: formattedDate,
        price: item.price,
        note: item.note || ''
      };
    });
  }, [filteredHistory]);

  // Stats calculation
  const stats = useMemo(() => {
    const prices = rawHistory.map((p) => p.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    const currentPrice = rawHistory[rawHistory.length - 1].price;
    const firstPrice = rawHistory[0].price;
    const netDiff = currentPrice - firstPrice;
    const netPercent = firstPrice > 0 ? ((netDiff / firstPrice) * 100).toFixed(1) : '0';
    const isAtAllTimeLow = currentPrice <= minPrice;
    const discountFromMax = maxPrice > minPrice && maxPrice > currentPrice
      ? Math.round(((maxPrice - currentPrice) / maxPrice) * 100)
      : 0;

    return {
      currentPrice,
      minPrice,
      maxPrice,
      netDiff,
      netPercent,
      isAtAllTimeLow,
      discountFromMax,
      totalEntries: rawHistory.length
    };
  }, [rawHistory]);

  const handleCreatePricePoint = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDate || Number(newPrice) < 0) return;
    if (onAddPricePoint) {
      onAddPricePoint({
        date: newDate,
        price: Number(newPrice),
        note: newNote.trim() || undefined
      });
      setNewNote('');
      setShowAddForm(false);
    }
  };

  // Custom Chart Tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-[#180A28]/95 backdrop-blur-md border border-purple-800/80 rounded-xl p-3 shadow-xl text-white text-xs space-y-1 z-50">
          <div className="flex items-center justify-between gap-3 text-purple-300 font-medium">
            <span>{data.displayDate}</span>
            <span className="text-2xs bg-purple-900/80 px-1.5 py-0.5 rounded text-pink-300">
              {product.currency || '$'}
            </span>
          </div>
          <div className="text-lg font-bold font-display text-pink-400">
            {product.currency || '$'}{Number(data.price).toFixed(2)}
          </div>
          {data.note && (
            <div className="text-2xs text-slate-300 italic max-w-48 line-clamp-2">
              "{data.note}"
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-4 bg-purple-50/50 border border-purple-100 rounded-3xl p-5 sm:p-6">
      
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-purple-100/80 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-2xs font-bold uppercase tracking-wider text-pink-600 bg-pink-100/70 px-2 py-0.5 rounded-full">
              Price Intelligence
            </span>
            {stats.isAtAllTimeLow && (
              <span className="text-2xs font-bold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> All-Time Low
              </span>
            )}
          </div>
          <h3 className="text-base font-bold font-display text-purple-950">
            Historical Price Tracking
          </h3>
          <p className="text-xs text-slate-500">
            Monitor price fluctuations, sales, and retail changes across time.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Time Filter Pills */}
          <div className="bg-white border border-purple-100 rounded-xl p-0.5 flex text-2xs font-bold">
            {(['all', '1y', '6m'] as const).map((rng) => (
              <button
                key={rng}
                onClick={() => setActiveRange(rng)}
                className={`px-2.5 py-1 rounded-lg capitalize transition-colors ${
                  activeRange === rng
                    ? 'bg-purple-900 text-white shadow-2xs'
                    : 'text-purple-700 hover:text-purple-950'
                }`}
              >
                {rng === 'all' ? 'All' : rng}
              </button>
            ))}
          </div>

          {/* Add Price Log Button */}
          {onAddPricePoint && (
            <button
              id="log-price-point-toggle-btn"
              onClick={() => setShowAddForm((prev) => !prev)}
              className={`flex items-center gap-1 px-3 py-1.5 text-xs font-bold rounded-xl border transition-all ${
                showAddForm
                  ? 'bg-pink-600 text-white border-pink-600'
                  : 'bg-white text-purple-900 border-purple-200 hover:border-purple-300 shadow-2xs'
              }`}
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{showAddForm ? 'Close Form' : 'Log Price'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white border border-purple-100 rounded-2xl p-3.5 shadow-2xs">
          <span className="text-2xs font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
            Current Price
          </span>
          <div className="text-lg sm:text-xl font-bold font-display text-purple-950">
            {product.currency || '$'}{stats.currentPrice}
          </div>
          <span className="text-2xs text-purple-600 font-medium">
            Latest tracked entry
          </span>
        </div>

        <div className="bg-white border border-purple-100 rounded-2xl p-3.5 shadow-2xs">
          <span className="text-2xs font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
            Lowest Recorded
          </span>
          <div className="text-lg sm:text-xl font-bold font-display text-emerald-600">
            {product.currency || '$'}{stats.minPrice}
          </div>
          <span className="text-2xs text-slate-500 font-medium">
            Best opportunity mark
          </span>
        </div>

        <div className="bg-white border border-purple-100 rounded-2xl p-3.5 shadow-2xs">
          <span className="text-2xs font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
            Highest Recorded
          </span>
          <div className="text-lg sm:text-xl font-bold font-display text-rose-600">
            {product.currency || '$'}{stats.maxPrice}
          </div>
          <span className="text-2xs text-slate-500 font-medium">
            Peak historical MSRP
          </span>
        </div>

        <div className="bg-white border border-purple-100 rounded-2xl p-3.5 shadow-2xs">
          <span className="text-2xs font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
            Overall Trend
          </span>
          <div className="flex items-center gap-1 text-lg sm:text-xl font-bold font-display">
            {stats.netDiff < 0 ? (
              <>
                <TrendingDown className="w-4 h-4 text-emerald-600" />
                <span className="text-emerald-600">{stats.netPercent}%</span>
              </>
            ) : stats.netDiff > 0 ? (
              <>
                <TrendingUp className="w-4 h-4 text-rose-500" />
                <span className="text-rose-500">+{stats.netPercent}%</span>
              </>
            ) : (
              <>
                <Minus className="w-4 h-4 text-purple-400" />
                <span className="text-purple-700">0.0%</span>
              </>
            )}
          </div>
          <span className="text-2xs text-slate-500 font-medium">
            {stats.netDiff < 0 ? 'Decreased over time' : stats.netDiff > 0 ? 'Increased over time' : 'Stable pricing'}
          </span>
        </div>
      </div>

      {/* Inline Form to Add New Price Point */}
      {showAddForm && onAddPricePoint && (
        <form 
          onSubmit={handleCreatePricePoint}
          className="bg-white border border-pink-200 rounded-2xl p-4 shadow-sm animate-in fade-in slide-in-from-top-2 duration-150 space-y-3"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-pink-900 uppercase tracking-wider">
              Log New Price Observation
            </span>
            <span className="text-2xs text-slate-400">
              Track a recent store sale, coupon, or price change
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-2xs font-bold uppercase text-purple-900 mb-1">
                Observed Price ({product.currency || '$'}) *
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                required
                value={newPrice}
                onChange={(e) => setNewPrice(Number(e.target.value))}
                className="w-full bg-purple-50/40 border border-purple-100 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
            </div>

            <div>
              <label className="block text-2xs font-bold uppercase text-purple-900 mb-1">
                Date Observed *
              </label>
              <input
                type="date"
                required
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
                className="w-full bg-purple-50/40 border border-purple-100 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
            </div>

            <div>
              <label className="block text-2xs font-bold uppercase text-purple-900 mb-1">
                Context / Store Note
              </label>
              <input
                type="text"
                placeholder="e.g. Labor Day 20% off sale"
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                className="w-full bg-purple-50/40 border border-purple-100 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-3 py-1.5 text-xs text-slate-600 hover:text-slate-900 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 text-xs font-bold bg-pink-600 hover:bg-pink-700 text-white rounded-xl shadow-xs transition-colors"
            >
              Save Price Point
            </button>
          </div>
        </form>
      )}

      {/* Chart Canvas */}
      <div className="bg-white border border-purple-100/90 rounded-2xl p-4 sm:p-5 shadow-xs">
        <div className="h-56 sm:h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{ top: 15, right: 20, left: -10, bottom: 5 }}
            >
              <defs>
                <linearGradient id="priceLineGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#8b5cf6" />
                  <stop offset="50%" stopColor="#d946ef" />
                  <stop offset="100%" stopColor="#ec4899" />
                </linearGradient>
                <linearGradient id="areaFillGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ec4899" stopOpacity={0.15} />
                  <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0.0} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" stroke="#f1e8f8" vertical={false} />

              <XAxis
                dataKey="displayDate"
                stroke="#9485a3"
                fontSize={11}
                tickLine={false}
                axisLine={{ stroke: '#e9dff3' }}
                dy={6}
              />

              <YAxis
                stroke="#9485a3"
                fontSize={11}
                tickLine={false}
                axisLine={{ stroke: '#e9dff3' }}
                domain={['auto', 'auto']}
                tickFormatter={(val) => `${product.currency || '$'}${val}`}
              />

              <Tooltip content={<CustomTooltip />} />

              {/* Reference line for all-time minimum */}
              {stats.minPrice && (
                <ReferenceLine
                  y={stats.minPrice}
                  stroke="#10b981"
                  strokeDasharray="4 4"
                  strokeOpacity={0.6}
                  label={{
                    value: `Low: ${product.currency || '$'}${stats.minPrice}`,
                    position: 'insideBottomRight',
                    fill: '#059669',
                    fontSize: 10,
                    fontWeight: 600
                  }}
                />
              )}

              <Line
                type="monotone"
                dataKey="price"
                stroke="url(#priceLineGrad)"
                strokeWidth={3}
                dot={{
                  r: 4,
                  fill: '#ffffff',
                  stroke: '#ec4899',
                  strokeWidth: 2
                }}
                activeDot={{
                  r: 6,
                  fill: '#ec4899',
                  stroke: '#ffffff',
                  strokeWidth: 2,
                  className: 'animate-pulse'
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recorded Price History Log Table / Badges */}
      <div className="space-y-2">
        <span className="text-2xs font-bold uppercase tracking-wider text-purple-900 block">
          Observation Timeline ({rawHistory.length} Record{rawHistory.length === 1 ? '' : 's'})
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {rawHistory.map((item, idx) => {
            const prevItem = idx > 0 ? rawHistory[idx - 1] : null;
            const diff = prevItem ? item.price - prevItem.price : 0;
            const isLatest = idx === rawHistory.length - 1;

            return (
              <div
                key={idx}
                className={`p-2.5 rounded-xl border flex items-center justify-between transition-colors ${
                  isLatest
                    ? 'bg-purple-100/60 border-purple-200 text-purple-950 font-medium'
                    : 'bg-white border-purple-100 text-slate-700'
                }`}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <Clock className="w-3.5 h-3.5 text-purple-500 shrink-0" />
                  <div className="truncate">
                    <div className="flex items-center gap-1.5 text-xs">
                      <span className="font-bold">{item.date}</span>
                      {isLatest && (
                        <span className="text-3xs bg-purple-900 text-white font-bold px-1.5 py-0.2 rounded">
                          Current
                        </span>
                      )}
                    </div>
                    {item.note && (
                      <span className="text-2xs text-slate-500 truncate block">
                        {item.note}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <div className="text-right">
                    <span className="text-xs font-bold font-display text-purple-950">
                      {product.currency || '$'}{item.price}
                    </span>
                    {diff !== 0 && (
                      <span
                        className={`text-3xs block font-bold ${
                          diff < 0 ? 'text-emerald-600' : 'text-rose-500'
                        }`}
                      >
                        {diff < 0 ? `-${Math.abs(diff)}` : `+${diff}`}
                      </span>
                    )}
                  </div>

                  {onDeletePricePoint && rawHistory.length > 1 && (
                    <button
                      onClick={() => onDeletePricePoint(idx)}
                      className="p-1 rounded-md text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                      title="Remove price point"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
