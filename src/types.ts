export interface PlanningTool {
  id: string;
  name: string;
  shortName: string;
  url: string;
  description: string;
  category: 'ingestion' | 'scheduling' | 'backorder' | 'reporting' | 'custom';
  icon: 'UploadCloud' | 'Calendar' | 'Download' | 'ClipboardList' | 'FileSpreadsheet' | 'Boxes' | 'Layers';
  badge?: {
    text: string;
    variant: 'default' | 'live' | 'critical' | 'version' | 'ready';
  };
  footerStat: string;
  workflowStep: number;
  accentColor: string;
  tags: string[];
  isCustom?: boolean;
}

export interface WorkflowItem {
  id: string;
  title: string;
  toolId: string;
  completed: boolean;
  notes?: string;
  priority?: 'High' | 'Medium' | 'Low';
  status?: string;
}

export interface PlanningNote {
  id: string;
  title: string;
  content: string;
  updatedAt: string;
  category?: string;
}

export type ViewMode = 'dashboard' | 'active-tasks' | 'global-reports' | 'settings' | 'tool' | 'split';
