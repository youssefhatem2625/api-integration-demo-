import React, { useState, useEffect, useCallback } from 'react';
import { fetchMarketData, fallbackAssets } from './services/marketApi';
import { Header } from './components/Header';
import { MetricsBar } from './components/MetricsBar';
import { DataTable } from './components/DataTable';
import { JsonModal } from './components/JsonModal';
import {
  AlertTriangle,
  RefreshCw,
  Cpu,
  Layers,
  ArrowRight,
  ShieldCheck,
  Zap,
} from 'lucide-react';

function App() {
  const [assets, setAssets] = useState(fallbackAssets);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [latency, setLatency] = useState(140);
  const [status, setStatus] = useState(200);
  const [source, setSource] = useState('in-memory-cache');
  const [timestamp, setTimestamp] = useState('Just now');
  const [simulateError, setSimulateError] = useState(false);
  const [inspectAsset, setInspectAsset] = useState(null);

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetchMarketData(simulateError);
      setAssets(res.data);
      setStatus(res.status);
      setLatency(res.latency);
      setSource(res.source);
      setTimestamp(res.timestamp);
    } catch (err) {
      setError(err.message || 'Failed to fetch API data');
      setStatus(500);
    } finally {
      setLoading(false);
    }
  }, [simulateError]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans selection:bg-zinc-800 selection:text-zinc-100">
      {/* Navbar */}
      <Header
        status={status}
        latency={latency}
        lastUpdated={timestamp}
        loading={loading}
        simulateError={simulateError}
        setSimulateError={setSimulateError}
        onRefresh={loadData}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex-grow space-y-6 w-full">
        {/* Intro Banner */}
        <div className="border-b border-zinc-800 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-mono bg-zinc-900 border border-zinc-800 text-zinc-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              Live Dynamic API Demonstration
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-100">
              Real-Time Market Data Explorer
            </h1>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-xl">
              Production-ready React application showcasing live REST API integration, loading skeletons, error resilience, and payload inspection.
            </p>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono text-zinc-500">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Graceful Fallback
            </span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-zinc-300" /> Debounced Search
            </span>
          </div>
        </div>

        {/* Developer Metrics Bar */}
        <MetricsBar
          latency={latency}
          source={source}
          count={assets.length}
          timestamp={timestamp}
        />

        {/* Error Alert Box (if triggered) */}
        {error && (
          <div className="p-4 rounded-xl border border-rose-900/60 bg-rose-950/20 text-rose-300 flex items-start justify-between gap-3 text-xs animate-in fade-in">
            <div className="flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 text-rose-400 mt-0.5 flex-shrink-0" />
              <div>
                <span className="font-semibold block">{error}</span>
                <span className="text-rose-400/80 text-[11px]">
                  The application safely intercepted the failure using structured error handling instead of crashing the UI.
                </span>
              </div>
            </div>
            <button
              onClick={() => {
                setSimulateError(false);
                setTimeout(loadData, 50);
              }}
              className="px-2.5 py-1 rounded bg-rose-900/40 hover:bg-rose-900/60 border border-rose-800 text-xs font-medium text-rose-200 transition-colors whitespace-nowrap"
            >
              Reset & Retry
            </button>
          </div>
        )}

        {/* Dynamic Data Table */}
        <DataTable
          assets={assets}
          loading={loading}
          onInspect={(asset) => setInspectAsset(asset)}
        />

        {/* Developer Capabilities Section (Client-facing) */}
        <div className="mt-12 pt-8 border-t border-zinc-800/80 grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
          <div className="p-4 rounded-xl border border-zinc-800/80 bg-zinc-900/30 space-y-1.5">
            <div className="text-xs font-semibold text-zinc-200 flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-emerald-400" /> Robust Data Fetching
            </div>
            <p className="text-[11px] text-zinc-400 leading-relaxed">
              Clean async/await with custom hooks, AbortController timeouts, and automatic retry patterns for high availability.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-zinc-800/80 bg-zinc-900/30 space-y-1.5">
            <div className="text-xs font-semibold text-zinc-200 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-indigo-400" /> State & Payload Normalization
            </div>
            <p className="text-[11px] text-zinc-400 leading-relaxed">
              Transforming complex nested JSON payloads into clean, type-safe structures ready for instant UI rendering.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-zinc-800/80 bg-zinc-900/30 space-y-1.5">
            <div className="text-xs font-semibold text-zinc-200 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Defensive Error Handling
            </div>
            <p className="text-[11px] text-zinc-400 leading-relaxed">
              Zero white-screen-of-death crashes: graceful skeletons, user-friendly toasts, and offline cached fallback streams.
            </p>
          </div>
        </div>
      </main>

      {/* JSON Modal Inspector */}
      {inspectAsset && (
        <JsonModal
          asset={inspectAsset}
          onClose={() => setInspectAsset(null)}
        />
      )}

      {/* Footer */}
      <footer className="border-t border-zinc-800/80 py-6 text-center text-xs font-mono text-zinc-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span>PulseAPI · Built by Youssef (React & REST API Specialist)</span>
          <span className="text-[11px] text-zinc-600">Clean Architecture · Zero Template Clutter</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
