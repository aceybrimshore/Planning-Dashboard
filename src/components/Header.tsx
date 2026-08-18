import React from 'react';
import { ViewMode, PlanningTool } from '../types';
import { Menu, Columns, Plus, Search, ExternalLink } from './icons';

interface HeaderProps {
  activeView: ViewMode;
  onSelectView: (view: ViewMode) => void;
  tools: PlanningTool[];
  onSelectTool: (toolId: string) => void;
  onOpenAddModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeView,
  onSelectView,
  tools,
  onSelectTool,
  onOpenAddModal,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: Brand logo & title */}
          <div className="flex items-center gap-3">
            <button
              id="brand-home-btn"
              onClick={() => onSelectView('dashboard')}
              className="flex items-center gap-3 text-left group focus:outline-none"
            >
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-xs group-hover:bg-blue-700 transition-colors">
                <Menu className="w-4 h-4" />
              </div>
              <span className="font-bold text-lg text-slate-900 tracking-tight">
                Planning Hub
              </span>
            </button>
          </div>

          {/* Center: Clean Navigation Tabs */}
          <nav className="flex items-center space-x-8 h-full">
            <button
              id="nav-tab-dashboard"
              onClick={() => onSelectView('dashboard')}
              className={`h-full inline-flex items-center text-sm font-medium transition-colors relative ${
                activeView === 'dashboard'
                  ? 'text-blue-600 font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>Dashboard</span>
              {activeView === 'dashboard' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
              )}
            </button>

            <button
              id="nav-tab-active-tasks"
              onClick={() => onSelectView('active-tasks')}
              className={`h-full inline-flex items-center text-sm font-medium transition-colors relative ${
                activeView === 'active-tasks'
                  ? 'text-blue-600 font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>Active Tasks</span>
              {activeView === 'active-tasks' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
              )}
            </button>

            <button
              id="nav-tab-global-reports"
              onClick={() => onSelectView('global-reports')}
              className={`h-full inline-flex items-center text-sm font-medium transition-colors relative ${
                activeView === 'global-reports'
                  ? 'text-blue-600 font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>Global Reports</span>
              {activeView === 'global-reports' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
              )}
            </button>

            <button
              id="nav-tab-split-mode"
              onClick={() => onSelectView('split')}
              className={`h-full inline-flex items-center text-sm font-medium transition-colors relative ${
                activeView === 'split'
                  ? 'text-blue-600 font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Dual comparative workspace"
            >
              <span>Split View</span>
              {activeView === 'split' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
              )}
            </button>

            <button
              id="nav-tab-settings"
              onClick={() => onSelectView('settings')}
              className={`h-full inline-flex items-center text-sm font-medium transition-colors relative ${
                activeView === 'settings'
                  ? 'text-blue-600 font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>Settings</span>
              {activeView === 'settings' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
              )}
            </button>
          </nav>

          {/* Right: User Avatar & Quick Action */}
          <div className="flex items-center gap-3">
            <button
              id="btn-quick-add"
              onClick={onOpenAddModal}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors border border-slate-200"
            >
              <Plus className="w-3.5 h-3.5 text-slate-600" />
              <span>Add Tool</span>
            </button>

            <div
              id="user-avatar-badge"
              className="w-8 h-8 rounded-full bg-slate-200 text-slate-700 font-medium text-xs flex items-center justify-center select-none shadow-inner border border-slate-300"
              title="Signed in as JS (Acey Brimshore Planning)"
            >
              JS
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
