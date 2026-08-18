import React from 'react';
import { WorkflowItem, PlanningTool } from '../types';
import { CheckCircle2, Circle, ArrowRight, ExternalLink, RefreshCw } from './icons';

interface ActiveTasksViewProps {
  workflowSteps: WorkflowItem[];
  tools: PlanningTool[];
  onToggleStep: (id: string) => void;
  onResetWorkflow: () => void;
  onSelectTool: (toolId: string) => void;
}

export const ActiveTasksView: React.FC<ActiveTasksViewProps> = ({
  workflowSteps,
  tools,
  onToggleStep,
  onResetWorkflow,
  onSelectTool,
}) => {
  const completedCount = workflowSteps.filter((s) => s.completed).length;
  const percent = Math.round((completedCount / workflowSteps.length) * 100);

  return (
    <div className="space-y-6 py-2 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Active Planning Tasks
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Operational pipeline and daily order fulfillment routines.
          </p>
        </div>

        <button
          id="btn-reset-tasks"
          onClick={onResetWorkflow}
          className="self-start sm:self-center px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-lg text-xs font-semibold shadow-2xs transition-colors flex items-center gap-1.5"
        >
          <RefreshCw className="w-3.5 h-3.5 text-slate-500" />
          <span>Reset Routine</span>
        </button>
      </div>

      {/* Progress Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-2">
        <div className="flex items-center justify-between text-xs font-semibold">
          <span className="text-slate-700">Completion Status: {completedCount} / {workflowSteps.length} Steps</span>
          <span className="text-blue-600 font-mono">{percent}% Complete</span>
        </div>
        <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-600 rounded-full transition-all duration-300"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>

      {/* Tasks List */}
      <div className="space-y-3">
        {workflowSteps.map((step) => {
          const associatedTool = tools.find((t) => t.id === step.toolId);

          return (
            <div
              key={step.id}
              className={`p-5 rounded-2xl border transition-all bg-white flex items-start gap-4 ${
                step.completed
                  ? 'border-emerald-200 bg-emerald-50/20'
                  : 'border-slate-200 hover:border-slate-300 shadow-xs'
              }`}
            >
              <button
                id={`task-toggle-${step.id}`}
                onClick={() => onToggleStep(step.id)}
                className="mt-0.5 text-slate-400 hover:text-blue-600 transition-colors shrink-0"
              >
                {step.completed ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                ) : (
                  <Circle className="w-5 h-5 text-slate-400" />
                )}
              </button>

              <div className="flex-1 space-y-1.5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3
                    className={`font-semibold text-sm ${
                      step.completed ? 'line-through text-slate-400' : 'text-slate-900'
                    }`}
                  >
                    {step.title}
                  </h3>

                  {step.status && (
                    <span className="text-xs px-2.5 py-0.5 rounded-full font-medium bg-slate-100 text-slate-600">
                      {step.status}
                    </span>
                  )}
                </div>

                {step.notes && (
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {step.notes}
                  </p>
                )}

                {associatedTool && (
                  <div className="pt-2 flex items-center gap-3">
                    <button
                      id={`task-open-module-${associatedTool.id}`}
                      onClick={() => onSelectTool(associatedTool.id)}
                      className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
                    >
                      <span>Open {associatedTool.name}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <a
                      href={associatedTool.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-slate-400 hover:text-slate-600 flex items-center gap-1"
                    >
                      <ExternalLink className="w-3 h-3" />
                      <span>New Tab</span>
                    </a>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
