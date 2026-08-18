import React, { useState } from 'react';
import { PlanningTool } from '../types';
import { Settings, Plus, ExternalLink, RefreshCw, Trash2 } from './icons';

interface SettingsViewProps {
  tools: PlanningTool[];
  onOpenAddModal: () => void;
  onResetTools: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  tools,
  onOpenAddModal,
  onResetTools,
}) => {
  return (
    <div className="space-y-6 py-2 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Planning Hub Settings & Integrations
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage your GitHub Pages tool connections and dashboard preferences.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            id="btn-settings-reset"
            onClick={onResetTools}
            className="px-3 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-semibold shadow-2xs transition-colors flex items-center gap-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5 text-slate-500" />
            <span>Reset Defaults</span>
          </button>

          <button
            id="btn-settings-add"
            onClick={onOpenAddModal}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-2xs transition-colors flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Tool</span>
          </button>
        </div>
      </div>

      {/* Linked GitHub Tools list */}
      <div className="bg-white rounded-2xl border border-slate-200 divide-y divide-slate-100 overflow-hidden shadow-xs">
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-xs font-semibold text-slate-700">
          <span>Connected Planning Modules ({tools.length})</span>
          <span className="font-mono text-slate-500">Repository Links</span>
        </div>

        {tools.map((tool) => (
          <div key={tool.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/50">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-slate-900">{tool.name}</span>
                {tool.badge && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold bg-slate-100 text-slate-600">
                    {tool.badge.text}
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 mt-0.5 font-mono truncate max-w-md">
                {tool.url}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={tool.url}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-700 hover:bg-slate-100 flex items-center gap-1.5 transition-colors"
              >
                <span>Visit URL</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
