import React, { useState, useRef } from 'react';
import { PlanningTool } from '../types';
import { getToolIcon } from './icons';
import {
  ExternalLink,
  RefreshCw,
  Maximize2,
  Minimize2,
  Copy,
  Check,
  ChevronLeft,
  ShieldCheck,
  ArrowRight
} from './icons';

interface EmbeddedToolViewProps {
  tool: PlanningTool;
  allTools: PlanningTool[];
  onSelectTool: (toolId: string) => void;
  onBackToDashboard: () => void;
}

export const EmbeddedToolView: React.FC<EmbeddedToolViewProps> = ({
  tool,
  allTools,
  onSelectTool,
  onBackToDashboard,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [iframeKey, setIframeKey] = useState(0);
  const [isCopied, setIsCopied] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleReload = () => {
    setIsLoading(true);
    setIframeKey((prev) => prev + 1);
  };

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(tool.url);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleToggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  return (
    <div
      ref={containerRef}
      className="flex flex-col h-[calc(100vh-140px)] min-h-[580px] bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm"
    >
      {/* Workspace Top Toolbar */}
      <div className="bg-slate-50 border-b border-slate-200 px-4 py-3 flex flex-wrap items-center justify-between gap-3 text-slate-800">
        {/* Left: Back button & Tool title */}
        <div className="flex items-center gap-3">
          <button
            id="btn-back-to-dashboard"
            onClick={onBackToDashboard}
            className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 shadow-2xs transition-colors"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span>Back to Dashboard</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="font-bold text-base text-slate-900">{tool.name}</span>
            {tool.badge && (
              <span className="px-2 py-0.5 text-[11px] font-semibold uppercase bg-slate-200 text-slate-700 rounded-full">
                {tool.badge.text}
              </span>
            )}
          </div>
        </div>

        {/* Center: Quick Switcher */}
        <div className="hidden lg:flex items-center gap-1 bg-slate-200/60 p-1 rounded-lg">
          {allTools.map((t) => (
            <button
              key={t.id}
              id={`btn-hop-${t.id}`}
              onClick={() => onSelectTool(t.id)}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
                t.id === tool.id
                  ? 'bg-white text-blue-600 font-semibold shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {t.name}
            </button>
          ))}
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          <a
            id="btn-open-external-window"
            href={tool.url}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-2xs transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Open in New Window</span>
          </a>

          <button
            id="btn-workspace-reload"
            onClick={handleReload}
            className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-white rounded-lg border border-slate-200 transition-colors"
            title="Reload Frame"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
          </button>

          <button
            id="btn-workspace-copy-url"
            onClick={handleCopyUrl}
            className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-white rounded-lg border border-slate-200 transition-colors"
            title="Copy URL"
          >
            {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
          </button>

          <button
            id="btn-workspace-fullscreen"
            onClick={handleToggleFullscreen}
            className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-white rounded-lg border border-slate-200 transition-colors hidden sm:inline-flex"
            title="Fullscreen"
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Main Iframe Viewer */}
      <div className="relative flex-1 bg-slate-50 overflow-hidden">
        {isLoading && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-slate-50 text-slate-600 gap-2">
            <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin" />
            <p className="text-xs font-medium text-slate-700">Loading {tool.name}...</p>
            <p className="text-[11px] text-slate-400 font-mono">{tool.url}</p>
          </div>
        )}

        <iframe
          key={iframeKey}
          src={tool.url}
          title={tool.name}
          onLoad={() => setIsLoading(false)}
          className="w-full h-full border-none bg-white"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-downloads allow-modals"
          allow="clipboard-read; clipboard-write; fullscreen"
        />
      </div>

      {/* Iframe Footer Info */}
      <div className="bg-slate-50 border-t border-slate-200 px-4 py-2 flex items-center justify-between text-xs text-slate-500">
        <div className="flex items-center gap-2 truncate">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
          <span className="truncate">Live GitHub Pages: <span className="font-mono text-slate-700">{tool.url}</span></span>
        </div>
        <a
          href={tool.url}
          target="_blank"
          rel="noreferrer"
          className="text-blue-600 hover:text-blue-700 font-medium shrink-0 ml-2"
        >
          Direct Link →
        </a>
      </div>
    </div>
  );
};
