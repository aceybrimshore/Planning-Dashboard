import React from 'react';
import { PlanningTool, WorkflowItem } from '../types';
import { getToolIcon } from './icons';
import {
  CheckCircle2,
  Circle,
  ArrowRight,
  ExternalLink,
  RefreshCw,
  Sparkles,
  Layers
} from './icons';

interface DailyWorkflowTrackerProps {
  workflowSteps: WorkflowItem[];
  tools: PlanningTool[];
  onToggleStep: (id: string) => void;
  onResetWorkflow: () => void;
  onSelectTool: (toolId: string) => void;
}

export const DailyWorkflowTracker: React.FC<DailyWorkflowTrackerProps> = ({
  workflowSteps,
  tools,
  onToggleStep,
  onResetWorkflow,
  onSelectTool,
}) => {
  const completedCount = workflowSteps.filter((s) => s.completed).length;
  const progressPercent = Math.round((completedCount / workflowSteps.length) * 100);

  return (
    <div className="space-y-6 pb-12 max-w-4xl mx-auto">
      {/* Tracker Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
              <span>Standard Operating Procedure</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Daily Planning Routine Checklist
            </h1>
            <p className="text-xs sm:text-sm text-slate-400">
              Follow this step-by-step sequence to maintain 100% planning accuracy and timely backorder resolution.
            </p>
          </div>

          <button
            id="btn-reset-workflow"
            onClick={onResetWorkflow}
            className="self-start sm:self-center px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-medium border border-slate-700 transition-colors flex items-center gap-1.5"
            title="Reset daily checklist for a new run"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Daily Checklist</span>
          </button>
        </div>

        {/* Progress Bar */}
        <div className="pt-2 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-300">
              Overall Routine Progress: {completedCount} / {workflowSteps.length} Steps
            </span>
            <span className="font-mono text-emerald-400 font-bold">{progressPercent}%</span>
          </div>
          <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden p-0.5 border border-slate-800">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 via-cyan-500 to-emerald-400 rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Step Cards List */}
      <div className="space-y-4">
        {workflowSteps.map((step, index) => {
          const associatedTool = tools.find((t) => t.id === step.toolId);

          return (
            <div
              key={step.id}
              id={`workflow-card-${step.id}`}
              className={`p-5 rounded-2xl border transition-all ${
                step.completed
                  ? 'bg-emerald-950/20 border-emerald-800/40 text-slate-300'
                  : 'bg-slate-900 border-slate-800 text-slate-100 hover:border-slate-700'
              }`}
            >
              <div className="flex items-start gap-4">
                <button
                  id={`btn-check-step-${step.id}`}
                  onClick={() => onToggleStep(step.id)}
                  className="mt-0.5 text-slate-400 hover:text-emerald-400 transition-colors shrink-0"
                >
                  {step.completed ? (
                    <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                  ) : (
                    <Circle className="w-6 h-6 text-slate-600 hover:text-slate-400" />
                  )}
                </button>

                <div className="flex-1 space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3
                      className={`font-bold text-base ${
                        step.completed ? 'line-through text-slate-400' : 'text-slate-100'
                      }`}
                    >
                      {step.title}
                    </h3>

                    {associatedTool && (
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-indigo-300 border border-slate-700">
                        {associatedTool.badgeText}
                      </span>
                    )}
                  </div>

                  {step.notes && (
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {step.notes}
                    </p>
                  )}

                  {associatedTool && (
                    <div className="pt-2 flex flex-wrap items-center gap-2">
                      <button
                        id={`btn-workflow-launch-${associatedTool.id}`}
                        onClick={() => onSelectTool(associatedTool.id)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition-colors"
                      >
                        <span>Open {associatedTool.shortName} in Workspace</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>

                      <a
                        id={`btn-workflow-ext-${associatedTool.id}`}
                        href={associatedTool.url}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>External Tab</span>
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
