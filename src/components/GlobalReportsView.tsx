import React from 'react';
import { PlanningTool } from '../types';
import { Download, ExternalLink, ArrowRight, FileText, CheckCircle2 } from './icons';

interface GlobalReportsViewProps {
  tools: PlanningTool[];
  onSelectTool: (toolId: string) => void;
}

export const GlobalReportsView: React.FC<GlobalReportsViewProps> = ({
  tools,
  onSelectTool,
}) => {
  const exportTool = tools.find((t) => t.id === 'export-backorder') || tools[2];
  const backorderTool = tools.find((t) => t.id === 'backorder-mgmt') || tools[3];

  return (
    <div className="space-y-6 py-2 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
          Global Backorder & Export Reports
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Export fulfillment schedules, supplier backorder summaries, and warehouse dispatch sheets.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Export Backorder Module Card */}
        {exportTool && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 border border-amber-100 flex items-center justify-center">
                <Download className="w-5 h-5" />
              </div>
              <span className="text-xs px-2.5 py-0.5 rounded-full font-medium bg-amber-50 text-amber-700 border border-amber-200">
                Ready for Export
              </span>
            </div>

            <div>
              <h3 className="font-bold text-base text-slate-900">{exportTool.name}</h3>
              <p className="text-sm text-slate-500 mt-1">{exportTool.description}</p>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <button
                id="btn-reports-open-export"
                onClick={() => onSelectTool(exportTool.id)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-2xs transition-colors"
              >
                Launch Export Module
              </button>
              <a
                href={exportTool.url}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Direct URL</span>
              </a>
            </div>
          </div>
        )}

        {/* Backorder Triage Card */}
        {backorderTool && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 border border-rose-100 flex items-center justify-center">
                <FileText className="w-5 h-5" />
              </div>
              <span className="text-xs px-2.5 py-0.5 rounded-full font-semibold bg-rose-50 text-rose-600 border border-rose-200">
                12 Critical Alerts
              </span>
            </div>

            <div>
              <h3 className="font-bold text-base text-slate-900">{backorderTool.name}</h3>
              <p className="text-sm text-slate-500 mt-1">{backorderTool.description}</p>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <button
                id="btn-reports-open-backorder"
                onClick={() => onSelectTool(backorderTool.id)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-2xs transition-colors"
              >
                View Backorder Queue
              </button>
              <a
                href={backorderTool.url}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Direct URL</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
