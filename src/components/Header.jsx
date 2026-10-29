import React from 'react';
import { Activity, RefreshCw, AlertOctagon, CheckCircle2, ShieldCheck } from 'lucide-react';

export const Header = ({
  status,
  latency,
  lastUpdated,
  loading,
  simulateError,
  setSimulateError,
  onRefresh,
}) => {
  return (
    <header className="border-b border-zinc-800 bg-zinc-950/90 backdrop-blur-md sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-700/80 flex items-center justify-center text-zinc-100 shadow-xs">
            <Activity className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-semibold text-sm tracking-tight text-zinc-100">
              PulseAPI
            </span>
            <span className="text-[11px] font-mono text-zinc-500 hidden sm:inline">
              / Live Market Explorer
            </span>
          </div>
        </div>

        {/* Center / Right controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Status Indicator */}
          <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-[11px] font-mono">
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                status === 200 ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'
              }`}
            />
            <span className="text-zinc-400">Status:</span>
            <span className={status === 200 ? 'text-emerald-400' : 'text-rose-400'}>
              {status} OK
            </span>
            <span className="text-zinc-600">·</span>
            <span className="text-zinc-400">{latency}ms</span>
          </div>

          {/* Simulate Error Toggle */}
          <button
            onClick={() => setSimulateError(!simulateError)}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
              simulateError
                ? 'bg-rose-950/40 border-rose-800 text-rose-300'
                : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-zinc-200'
            }`}
            title="اختبار معالجة الأخطاء (Error Handling Test)"
          >
            <AlertOctagon className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">
              {simulateError ? 'خطأ 500 مفعل' : 'اختبار عطل API'}
            </span>
          </button>

          {/* Refresh Button */}
          <button
            onClick={onRefresh}
            disabled={loading}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-zinc-100 hover:bg-white text-zinc-950 disabled:opacity-50 transition-all active:scale-[0.98]"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>تحديث البيانات</span>
          </button>
        </div>
      </div>
    </header>
  );
};
