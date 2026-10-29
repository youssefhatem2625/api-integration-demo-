import React, { useState } from 'react';
import { X, Copy, Check, Terminal } from 'lucide-react';

export const JsonModal = ({ asset, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!asset) return null;

  const payloadString = JSON.stringify(asset, null, 2);

  const handleCopy = () => {
    navigator.clipboard.writeText(payloadString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-zinc-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="p-4 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/90">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-mono font-semibold text-zinc-200">
              Response Payload · {asset.name} ({asset.symbol.toUpperCase()})
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs border border-zinc-700 transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy JSON</span>
                </>
              )}
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* JSON Viewer */}
        <div className="p-4 overflow-y-auto font-mono text-xs text-zinc-300 bg-zinc-950/80 flex-1">
          <pre className="text-emerald-300/90 whitespace-pre-wrap leading-relaxed">
            {payloadString}
          </pre>
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-zinc-800 text-[11px] font-mono text-zinc-500 flex items-center justify-between bg-zinc-900">
          <span>HTTP/2 200 OK · Content-Type: application/json</span>
          <span>Size: ~1.2 KB</span>
        </div>
      </div>
    </div>
  );
};
