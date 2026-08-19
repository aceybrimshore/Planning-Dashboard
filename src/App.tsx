import React, { useState, useEffect } from 'react';
import { PlanningTool, ViewMode, WorkflowItem } from './types';
import { DEFAULT_PLANNING_TOOLS, DEFAULT_WORKFLOW_STEPS } from './data/defaultTools';
import { Header } from './components/Header';
import { OverviewHub } from './components/OverviewHub';
import { EmbeddedToolView } from './components/EmbeddedToolView';
import { SplitToolView } from './components/SplitToolView';
import { ActiveTasksView } from './components/ActiveTasksView';
import { GlobalReportsView } from './components/GlobalReportsView';
import { SettingsView } from './components/SettingsView';
import { StatusBar } from './components/StatusBar';
import { AddEditToolModal } from './components/AddEditToolModal';

export default function App() {
  const [tools, setTools] = useState<PlanningTool[]>(() => {
    const saved = localStorage.getItem('planning_tools_custom_v2');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Merge with DEFAULT_PLANNING_TOOLS to ensure updated default URLs are immediately active
          const defaultMap = new Map(DEFAULT_PLANNING_TOOLS.map((t) => [t.id, t]));
          const merged = parsed.map((item: PlanningTool) => {
            if (defaultMap.has(item.id) && !item.isCustom) {
              const defaultTool = defaultMap.get(item.id)!;
              return {
                ...item,
                url: defaultTool.url,
                name: defaultTool.name,
                description: defaultTool.description,
                badge: defaultTool.badge,
                footerStat: defaultTool.footerStat,
              };
            }
            return item;
          });

          // Ensure any newly added default tools are also present
          DEFAULT_PLANNING_TOOLS.forEach((defTool) => {
            if (!merged.some((m: PlanningTool) => m.id === defTool.id)) {
              merged.push(defTool);
            }
          });

          return merged;
        }
      } catch (e) {
        console.error('Failed to parse saved custom tools', e);
      }
    }
    return DEFAULT_PLANNING_TOOLS;
  });

  const [activeView, setActiveView] = useState<ViewMode>('dashboard');
  const [selectedToolId, setSelectedToolId] = useState<string>(tools[0]?.id || 'csv-upload');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [workflowSteps, setWorkflowSteps] = useState<WorkflowItem[]>(() => {
    const saved = localStorage.getItem('planning_workflow_steps_v2');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const mergedSteps = [...parsed];
          DEFAULT_WORKFLOW_STEPS.forEach((defStep) => {
            if (!mergedSteps.some((s) => s.id === defStep.id || s.toolId === defStep.toolId)) {
              mergedSteps.push(defStep);
            }
          });
          return mergedSteps;
        }
      } catch (e) {
        console.error('Failed to parse saved workflow steps', e);
      }
    }
    return DEFAULT_WORKFLOW_STEPS;
  });

  useEffect(() => {
    localStorage.setItem('planning_workflow_steps_v2', JSON.stringify(workflowSteps));
  }, [workflowSteps]);

  useEffect(() => {
    localStorage.setItem('planning_tools_custom_v2', JSON.stringify(tools));
  }, [tools]);

  const handleToggleWorkflowStep = (id: string) => {
    setWorkflowSteps((prev) =>
      prev.map((step) =>
        step.id === id ? { ...step, completed: !step.completed } : step
      )
    );
  };

  const handleResetWorkflow = () => {
    setWorkflowSteps((prev) => prev.map((step) => ({ ...step, completed: false })));
  };

  const handleResetTools = () => {
    setTools(DEFAULT_PLANNING_TOOLS);
    localStorage.removeItem('planning_tools_custom_v2');
  };

  const handleAddTool = (newTool: PlanningTool) => {
    setTools((prev) => [...prev, newTool]);
    setSelectedToolId(newTool.id);
    setActiveView('tool');
  };

  const currentTool = tools.find((t) => t.id === selectedToolId) || tools[0];

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col font-sans selection:bg-blue-500 selection:text-white">
      {/* Top Header Navigation */}
      <Header
        activeView={activeView}
        onSelectView={(view) => setActiveView(view)}
        tools={tools}
        onSelectTool={(toolId) => {
          setSelectedToolId(toolId);
          setActiveView('tool');
        }}
        onOpenAddModal={() => setIsAddModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col justify-between">
        <div className="flex-1">
          {activeView === 'dashboard' && (
            <OverviewHub
              tools={tools}
              onSelectTool={(toolId) => {
                setSelectedToolId(toolId);
                setActiveView('tool');
              }}
            />
          )}

          {activeView === 'tool' && currentTool && (
            <EmbeddedToolView
              tool={currentTool}
              allTools={tools}
              onSelectTool={(id) => setSelectedToolId(id)}
              onBackToDashboard={() => setActiveView('dashboard')}
            />
          )}

          {activeView === 'split' && (
            <SplitToolView
              tools={tools}
              onBackToDashboard={() => setActiveView('dashboard')}
            />
          )}

          {activeView === 'active-tasks' && (
            <ActiveTasksView
              workflowSteps={workflowSteps}
              tools={tools}
              onToggleStep={handleToggleWorkflowStep}
              onResetWorkflow={handleResetWorkflow}
              onSelectTool={(toolId) => {
                setSelectedToolId(toolId);
                setActiveView('tool');
              }}
            />
          )}

          {activeView === 'global-reports' && (
            <GlobalReportsView
              tools={tools}
              onSelectTool={(toolId) => {
                setSelectedToolId(toolId);
                setActiveView('tool');
              }}
            />
          )}

          {activeView === 'settings' && (
            <SettingsView
              tools={tools}
              onOpenAddModal={() => setIsAddModalOpen(true)}
              onResetTools={handleResetTools}
            />
          )}
        </div>
      </main>

      {/* Bottom Operational Status Bar */}
      <StatusBar />

      {/* Add Custom Tool Modal */}
      <AddEditToolModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddTool={handleAddTool}
      />
    </div>
  );
}
