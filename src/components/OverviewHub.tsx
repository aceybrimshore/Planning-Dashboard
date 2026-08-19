import React from 'react';
import { PlanningTool } from '../types';
import { getToolIcon } from './icons';
import { ArrowRight, ExternalLink } from './icons';

interface OverviewHubProps {
  tools: PlanningTool[];
  onSelectTool: (toolId: string) => void;
}

export const OverviewHub: React.FC<OverviewHubProps> = ({
  tools,
  onSelectTool,
}) => {
  return (
    <div className="space-y-8 py-2">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
          Operations Suite
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Access your centralized planning and inventory tools.
        </p>
      </div>

      {/* 2x2 Grid of Planning Tools Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tools.map((tool) => {
          // Determine icon background & color based on category/accent
          let iconBg = 'bg-purple-50 text-purple-600 border-purple-100';
          if (tool.id === 'scheduling-tool' || tool.category === 'scheduling') {
            iconBg = 'bg-emerald-50 text-emerald-600 border-emerald-100';
          } else if (tool.id === 'export-backorder' || tool.category === 'reporting') {
            iconBg = 'bg-amber-50 text-amber-600 border-amber-100';
          } else if (tool.id === 'backorder-mgmt' || tool.category === 'backorder') {
            iconBg = 'bg-rose-50 text-rose-600 border-rose-100';
          } else if (tool.id === 'material-gap-risk' || tool.category === 'analysis') {
            iconBg = 'bg-indigo-50 text-indigo-600 border-indigo-100';
          }

          return (
            <div
              key={tool.id}
              id={`tool-card-${tool.id}`}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-md hover:border-slate-300 transition-all p-6 flex flex-col justify-between group cursor-pointer"
              onClick={() => onSelectTool(tool.id)}
            >
              <div>
                {/* Card Top Row: Icon & Badge */}
                <div className="flex items-center justify-between">
                  <div
                    className={`w-11 h-11 rounded-xl border flex items-center justify-center ${iconBg} shadow-xs`}
                  >
                    {getToolIcon(tool.icon, 'w-5 h-5')}
                  </div>

                  {/* Badge Pills */}
                  {tool.badge && (
                    <div>
                      {tool.badge.variant === 'live' && (
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-600 border border-emerald-200">
                          {tool.badge.text}
                        </span>
                      )}
                      {tool.badge.variant === 'critical' && (
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-50 text-rose-600 border border-rose-200">
                          {tool.badge.text}
                        </span>
                      )}
                      {tool.badge.variant === 'version' && (
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200/60 font-mono">
                          {tool.badge.text}
                        </span>
                      )}
                      {tool.badge.variant === 'default' && (
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600">
                          {tool.badge.text}
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Title & Description */}
                <div className="mt-5 space-y-1.5">
                  <h2 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {tool.name}
                  </h2>
                  <p className="text-sm text-slate-500 leading-relaxed line-clamp-2">
                    {tool.description}
                  </p>
                </div>
              </div>

              {/* Card Footer: Left Stat + Right Open Module Link */}
              <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-400 font-medium">
                  {tool.footerStat}
                </span>

                <div className="flex items-center gap-3">
                  <a
                    id={`btn-ext-tab-${tool.id}`}
                    href={tool.url}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="text-slate-400 hover:text-slate-600 p-1 transition-colors"
                    title="Open in new window"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <button
                    id={`btn-open-module-${tool.id}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectTool(tool.id);
                    }}
                    className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1 group-hover:translate-x-0.5 transition-all"
                  >
                    <span>Open Module</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
