import React from 'react';
import { PlanningTool, ViewMode } from '../types';
import { getToolIcon } from './icons';
import {
  LayoutGrid,
  Columns,
  CheckCircle2,
  ExternalLink,
  Plus,
  Bookmark,
  Layers,
  Sparkles,
  ShieldCheck
} from './icons';

interface SidebarProps {
  tools: PlanningTool[];
  activeView: ViewMode;
  selectedToolId: string | null;
  onSelectView: (view: ViewMode) => void;
  onSelectTool: (toolId: string) => void;
  onOpenAddModal: () => void;
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  tools,
  activeView,
  selectedToolId,
  onSelectView,
  onSelectTool,
  onOpenAddModal,
  isOpen,
  onClose,
}) => {
  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          id="sidebar-backdrop"
          onClick={onClose}
          className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-xs"
        />
      )}

      <aside
        id="main-app-sidebar"
        className={`fixed top-16 bottom-0 left-0 z-40 w-72 bg-slate-900 border-r border-slate-800 transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } flex flex-col justify-between overflow-y-auto`}
      >
        <div className="p-4 space-y-6">
          {/* Main Navigation Modes */}
          <div className="space-y-1">
            <p className="px-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Workspace Views
            </p>
            <button
              id="sidebar-btn-hub"
              onClick={() => {
                onSelectView('hub');
                onClose();
              }}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                activeView === 'hub'
                  ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <LayoutGrid className="w-4 h-4 text-indigo-400" />
                <span>Dashboard Hub</span>
              </div>
              <span className="text-xs px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 font-mono">
                {tools.length}
              </span>
            </button>

            <button
              id="sidebar-btn-split"
              onClick={() => {
                onSelectView('split');
                onClose();
              }}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                activeView === 'split'
                  ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Columns className="w-4 h-4 text-cyan-400" />
                <span>Split View (Dual Tool)</span>
              </div>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-950/60 text-cyan-300 border border-cyan-800/50">
                2x
              </span>
            </button>

            <button
              id="sidebar-btn-checklist"
              onClick={() => {
                onSelectView('checklist');
                onClose();
              }}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                activeView === 'checklist'
                  ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Daily Workflow</span>
              </div>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-800/50">
                Steps
              </span>
            </button>
          </div>

          {/* Planning Tools List */}
          <div className="space-y-1">
            <div className="flex items-center justify-between px-3 mb-2">
              <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Planning Tools Sequence
              </p>
              <button
                id="sidebar-btn-add-tool"
                onClick={onOpenAddModal}
                className="text-slate-400 hover:text-indigo-300 transition-colors"
                title="Add new planning tool"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>

            {tools.map((tool) => {
              const isSelected = activeView === 'tool' && selectedToolId === tool.id;
              return (
                <div
                  key={tool.id}
                  className={`group relative flex items-center justify-between rounded-xl px-3 py-2 text-xs transition-all ${
                    isSelected
                      ? 'bg-slate-800 text-white font-medium shadow-sm border border-slate-700'
                      : 'text-slate-300 hover:bg-slate-800/50 hover:text-white'
                  }`}
                >
                  <button
                    id={`sidebar-tool-select-${tool.id}`}
                    onClick={() => {
                      onSelectTool(tool.id);
                      onSelectView('tool');
                      onClose();
                    }}
                    className="flex items-center gap-2.5 flex-1 min-w-0 text-left"
                  >
                    <div className={`p-1.5 rounded-lg ${isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-300 group-hover:text-indigo-300'}`}>
                      {getToolIcon(tool.icon, 'w-4 h-4')}
                    </div>
                    <div className="truncate flex-1">
                      <div className="flex items-center gap-1.5">
                        <span className="truncate">{tool.name}</span>
                      </div>
                      <span className="text-[10px] text-slate-500 block truncate">
                        {tool.badgeText}
                      </span>
                    </div>
                  </button>

                  <a
                    id={`sidebar-tool-external-${tool.id}`}
                    href={tool.url}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1 text-slate-500 hover:text-slate-200 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                    title={`Open ${tool.name} in new tab`}
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              );
            })}
          </div>

          {/* Quick Launchpad Info Card */}
          <div className="p-3.5 rounded-xl bg-slate-800/50 border border-slate-800 text-slate-300 text-xs space-y-2">
            <div className="flex items-center gap-2 text-indigo-400 font-medium">
              <Sparkles className="w-4 h-4" />
              <span>Unified Hub Sync</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              All 4 planning tools can be embedded directly in your workspace or launched independently.
            </p>
          </div>
        </div>

        {/* Footer Meta */}
        <div className="p-4 border-t border-slate-800 bg-slate-900/50">
          <div className="flex items-center justify-between text-[11px] text-slate-500">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Operational Ready
            </span>
            <span>4 GitHub Tools</span>
          </div>
        </div>
      </aside>
    </>
  );
};
