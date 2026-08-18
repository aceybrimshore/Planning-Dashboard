import React, { useState } from 'react';
import { PlanningTool } from '../types';
import { Columns, RefreshCw, ExternalLink, ChevronLeft } from './icons';

interface SplitToolViewProps {
  tools: PlanningTool[];
  onBackToDashboard: () => void;
}

export const SplitToolView: React.FC<SplitToolViewProps> = ({
  tools,
  onBackToDashboard,
}) => {
  const [leftToolId, setLeftToolId] = useState<string>(tools[3]?.id || tools[0]?.id || '');
  const [rightToolId, setRightToolId] = useState<string>(tools[2]?.id || tools[1]?.id || '');
  const [leftReloadKey, setLeftReloadKey] = useState(0);
  const [rightReloadKey, setRightReloadKey] = useState(0);

  const leftTool = tools.find((t) => t.id === leftToolId) || tools[0];
  const rightTool = tools.find((t) => t.id === rightToolId) || tools[1] || tools[0];

  const handleSwap = () => {
    const temp = leftToolId;
    setLeftToolId(rightToolId);
    setRightToolId(temp);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] min-h-[580px] bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
      {/* Top Split View Toolbar */}
      <div className="bg-slate-50 border-b border-slate-200 px-4 py-3 flex flex-wrap items-center justify-between gap-3 text-slate-800">
        <div className="flex items-center gap-3">
          <button
            id="btn-split-back-to-dashboard"
            onClick={onBackToDashboard}
            className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 shadow-2xs transition-colors"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span>Back to Dashboard</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="font-bold text-base text-slate-900">Dual Comparative Workspace</span>
            <span className="hidden sm:inline-block text-xs text-slate-500">
              Cross-reference inventory & schedules simultaneously
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            id="btn-swap-panes"
            onClick={handleSwap}
            className="px-3 py-1.5 text-xs font-semibold bg-white hover:bg-slate-100 text-slate-700 rounded-lg border border-slate-200 shadow-2xs transition-colors"
          >
            ⇄ Swap Left/Right Panes
          </button>
        </div>
      </div>

      {/* Side-by-Side Dual Viewport */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-slate-200 bg-slate-100 overflow-hidden">
        {/* Left Pane */}
        <div className="flex flex-col h-full overflow-hidden bg-white">
          <div className="bg-slate-50 border-b border-slate-200 px-3 py-2 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="text-[11px] uppercase font-bold text-slate-500 font-mono">Pane 1:</span>
              <select
                id="select-left-split-tool"
                value={leftToolId}
                onChange={(e) => setLeftToolId(e.target.value)}
                className="bg-white text-slate-900 font-semibold text-xs px-2.5 py-1 rounded-md border border-slate-200 focus:outline-none shadow-2xs"
              >
                {tools.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                id="btn-reload-left-pane"
                onClick={() => setLeftReloadKey((k) => k + 1)}
                className="p-1 text-slate-500 hover:text-slate-900"
                title="Reload left pane"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
              <a
                id="btn-link-left-pane"
                href={leftTool?.url}
                target="_blank"
                rel="noreferrer"
                className="p-1 text-slate-500 hover:text-slate-900"
                title="Open in new window"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          <div className="flex-1 relative bg-white">
            {leftTool && (
              <iframe
                key={`${leftTool.id}-${leftReloadKey}`}
                src={leftTool.url}
                title={`Left: ${leftTool.name}`}
                className="w-full h-full border-none"
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-downloads allow-modals"
              />
            )}
          </div>
        </div>

        {/* Right Pane */}
        <div className="flex flex-col h-full overflow-hidden bg-white">
          <div className="bg-slate-50 border-b border-slate-200 px-3 py-2 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="text-[11px] uppercase font-bold text-slate-500 font-mono">Pane 2:</span>
              <select
                id="select-right-split-tool"
                value={rightToolId}
                onChange={(e) => setRightToolId(e.target.value)}
                className="bg-white text-slate-900 font-semibold text-xs px-2.5 py-1 rounded-md border border-slate-200 focus:outline-none shadow-2xs"
              >
                {tools.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                id="btn-reload-right-pane"
                onClick={() => setRightReloadKey((k) => k + 1)}
                className="p-1 text-slate-500 hover:text-slate-900"
                title="Reload right pane"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
              <a
                id="btn-link-right-pane"
                href={rightTool?.url}
                target="_blank"
                rel="noreferrer"
                className="p-1 text-slate-500 hover:text-slate-900"
                title="Open in new window"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          <div className="flex-1 relative bg-white">
            {rightTool && (
              <iframe
                key={`${rightTool.id}-${rightReloadKey}`}
                src={rightTool.url}
                title={`Right: ${rightTool.name}`}
                className="w-full h-full border-none"
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-downloads allow-modals"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
