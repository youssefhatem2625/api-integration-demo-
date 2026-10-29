import React, { useState, useMemo } from 'react';
import {
  Search,
  ArrowUpRight,
  ArrowDownRight,
  Code2,
  SlidersHorizontal,
  X,
} from 'lucide-react';

export const DataTable = ({ assets, loading, onInspect }) => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('market_cap_rank'); // 'market_cap_rank' | 'price' | 'change'

  const categories = ['All', 'Layer 1', 'DeFi', 'Smart Contracts'];

  const filteredAssets = useMemo(() => {
    return assets
      .filter((item) => {
        const matchesSearch =
          item.name.toLowerCase().includes(search.toLowerCase()) ||
          item.symbol.toLowerCase().includes(search.toLowerCase());
        const matchesCategory =
          selectedCategory === 'All' || item.category === selectedCategory;
        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => {
        if (sortBy === 'price') return b.current_price - a.current_price;
        if (sortBy === 'change')
          return b.price_change_percentage_24h - a.price_change_percentage_24h;
        return a.market_cap_rank - b.market_cap_rank;
      });
  }, [assets, search, selectedCategory, sortBy]);

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: val < 10 ? 2 : 2,
    }).format(val);
  };

  const formatCompact = (val) => {
    return new Intl.NumberFormat('en-US', {
      notation: 'compact',
      compactDisplay: 'short',
    }).format(val);
  };

  return (
    <div className="space-y-4">
      {/* Controls & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Search */}
        <div className="relative flex-1 max-w-sm">
          <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by asset name or symbol..."
            className="w-full bg-zinc-900 border border-zinc-800 rounded-lg pl-9 pr-8 py-2 text-xs text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:border-zinc-600 transition-colors"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Category & Sorting */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          <div className="inline-flex bg-zinc-900 p-1 rounded-lg border border-zinc-800 text-xs">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 rounded-md transition-all ${
                  selectedCategory === cat
                    ? 'bg-zinc-800 text-zinc-100 font-medium shadow-xs'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs rounded-lg px-2.5 py-2 focus:outline-none focus:border-zinc-600"
          >
            <option value="market_cap_rank">Rank</option>
            <option value="price">Highest Price</option>
            <option value="change">24h Gainers</option>
          </select>
        </div>
      </div>

      {/* Table Container */}
      <div className="border border-zinc-800 rounded-xl overflow-hidden bg-zinc-900/40">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-zinc-800 bg-zinc-900/80 text-zinc-400 font-mono text-[11px] uppercase tracking-wider">
                <th className="py-3 px-4 font-medium w-12 text-center">#</th>
                <th className="py-3 px-4 font-medium">Asset</th>
                <th className="py-3 px-4 font-medium text-right">Price</th>
                <th className="py-3 px-4 font-medium text-right">24h Change</th>
                <th className="py-3 px-4 font-medium text-right hidden md:table-cell">
                  24h High / Low
                </th>
                <th className="py-3 px-4 font-medium text-right hidden lg:table-cell">
                  24h Volume
                </th>
                <th className="py-3 px-4 font-medium text-right hidden sm:table-cell">
                  Market Cap
                </th>
                <th className="py-3 px-4 font-medium text-center w-24">Payload</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60 font-mono">
              {loading ? (
                // Skeleton loading rows
                [...Array(6)].map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="py-4 px-4 text-center">
                      <div className="w-4 h-3 bg-zinc-800 rounded mx-auto" />
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-zinc-800" />
                        <div className="space-y-1">
                          <div className="w-16 h-3 bg-zinc-800 rounded" />
                          <div className="w-10 h-2.5 bg-zinc-800/60 rounded" />
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <div className="w-20 h-3 bg-zinc-800 rounded ml-auto" />
                    </td>
                    <td className="py-4 px-4 text-right">
                      <div className="w-14 h-4 bg-zinc-800 rounded ml-auto" />
                    </td>
                    <td className="py-4 px-4 text-right hidden md:table-cell">
                      <div className="w-24 h-3 bg-zinc-800 rounded ml-auto" />
                    </td>
                    <td className="py-4 px-4 text-right hidden lg:table-cell">
                      <div className="w-16 h-3 bg-zinc-800 rounded ml-auto" />
                    </td>
                    <td className="py-4 px-4 text-right hidden sm:table-cell">
                      <div className="w-20 h-3 bg-zinc-800 rounded ml-auto" />
                    </td>
                    <td className="py-4 px-4 text-center">
                      <div className="w-12 h-5 bg-zinc-800 rounded mx-auto" />
                    </td>
                  </tr>
                ))
              ) : filteredAssets.length === 0 ? (
                <tr>
                  <td colSpan="8" className="py-12 text-center text-zinc-500">
                    No assets matched your search query.
                  </td>
                </tr>
              ) : (
                filteredAssets.map((asset) => {
                  const isPositive = asset.price_change_percentage_24h >= 0;
                  return (
                    <tr
                      key={asset.id}
                      className="hover:bg-zinc-800/40 transition-colors group"
                    >
                      {/* Rank */}
                      <td className="py-3.5 px-4 text-center text-zinc-500 text-[11px]">
                        {asset.market_cap_rank}
                      </td>

                      {/* Asset name & symbol */}
                      <td className="py-3.5 px-4 font-sans">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-lg bg-zinc-800 border border-zinc-700/60 flex items-center justify-center font-mono text-[10px] font-bold text-zinc-300 uppercase">
                            {asset.symbol.slice(0, 3)}
                          </div>
                          <div>
                            <span className="font-semibold text-zinc-100 block leading-tight">
                              {asset.name}
                            </span>
                            <span className="text-[10px] text-zinc-500 uppercase font-mono">
                              {asset.symbol} · {asset.category}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Price */}
                      <td className="py-3.5 px-4 text-right font-semibold text-zinc-100">
                        {formatCurrency(asset.current_price)}
                      </td>

                      {/* 24h Change */}
                      <td className="py-3.5 px-4 text-right">
                        <span
                          className={`inline-flex items-center gap-0.5 px-2 py-0.5 rounded text-[11px] font-medium ${
                            isPositive
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                              : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                          }`}
                        >
                          {isPositive ? (
                            <ArrowUpRight className="w-3 h-3" />
                          ) : (
                            <ArrowDownRight className="w-3 h-3" />
                          )}
                          {Math.abs(asset.price_change_percentage_24h).toFixed(2)}%
                        </span>
                      </td>

                      {/* 24h High / Low */}
                      <td className="py-3.5 px-4 text-right text-zinc-400 text-[11px] hidden md:table-cell">
                        <span className="text-zinc-300">
                          {formatCurrency(asset.high_24h)}
                        </span>
                        <span className="text-zinc-600 mx-1">/</span>
                        <span className="text-zinc-500">
                          {formatCurrency(asset.low_24h)}
                        </span>
                      </td>

                      {/* Volume */}
                      <td className="py-3.5 px-4 text-right text-zinc-400 hidden lg:table-cell">
                        ${formatCompact(asset.total_volume)}
                      </td>

                      {/* Market Cap */}
                      <td className="py-3.5 px-4 text-right text-zinc-300 font-medium hidden sm:table-cell">
                        ${formatCompact(asset.market_cap)}
                      </td>

                      {/* Action */}
                      <td className="py-3.5 px-4 text-center">
                        <button
                          onClick={() => onInspect(asset)}
                          className="inline-flex items-center gap-1 px-2 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-[11px] border border-zinc-700/80 transition-colors"
                          title="عرض حمولة الـ JSON الأصلية"
                        >
                          <Code2 className="w-3 h-3 text-zinc-400" />
                          <span>JSON</span>
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
