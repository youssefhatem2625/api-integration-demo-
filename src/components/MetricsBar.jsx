import React from 'react';
import { Terminal, Clock, Database, Globe, Layers } from 'lucide-react';

export const MetricsBar = ({ latency, source, count, timestamp }) => {
  return (
    <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-3 sm:p-4 text-xs font-mono text-zinc-400">
      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* Endpoint path */}
        <div className="flex items-center gap-2">
          <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold">
            GET
          </span>
          <span className="text-zinc-300 truncate max-w-xs sm:max-w-md">
            /api/v3/coins/markets?vs_currency=usd
          </span>
        </div>

        {/* Technical Stats */}
        <div className="flex flex-wrap items-center gap-4 text-[11px]">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-zinc-500" />
            <span className="text-zinc-500">Latency:</span>
            <span className="text-zinc-200 font-semibold">{latency} ms</span>
          </div>

          <div className="flex items-center gap-1.5">
            <Database className="w-3.5 h-3.5 text-zinc-500" />
            <span className="text-zinc-500">Source:</span>
            <span className="text-zinc-200">{source}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-zinc-500" />
            <span className="text-zinc-500">Records:</span>
            <span className="text-zinc-200 font-semibold">{count}</span>
          </div>

          <div className="text-zinc-500 hidden lg:inline">
            Updated: <span className="text-zinc-300">{timestamp}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
