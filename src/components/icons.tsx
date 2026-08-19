import React from 'react';
import {
  UploadCloud,
  Calendar,
  Download,
  ClipboardList,
  FileSpreadsheet,
  Boxes,
  Layers,
  LayoutGrid,
  ExternalLink,
  CheckCircle2,
  Circle,
  Plus,
  Trash2,
  Edit2,
  Maximize2,
  Minimize2,
  RefreshCw,
  Copy,
  Check,
  Columns,
  Search,
  Sparkles,
  ArrowRight,
  Info,
  Clock,
  Bookmark,
  ShieldCheck,
  FolderSync,
  HelpCircle,
  ChevronRight,
  ChevronLeft,
  Sun,
  Moon,
  Menu,
  X,
  AlertTriangle,
  Settings,
  FileText,
  Activity,
  ListTodo
} from 'lucide-react';

export const getToolIcon = (iconName: string, className = 'w-5 h-5') => {
  switch (iconName) {
    case 'UploadCloud':
      return <UploadCloud className={className} />;
    case 'Calendar':
      return <Calendar className={className} />;
    case 'Download':
      return <Download className={className} />;
    case 'ClipboardList':
      return <ClipboardList className={className} />;
    case 'FileSpreadsheet':
      return <FileSpreadsheet className={className} />;
    case 'Boxes':
      return <Boxes className={className} />;
    case 'AlertTriangle':
      return <AlertTriangle className={className} />;
    case 'Activity':
      return <Activity className={className} />;
    default:
      return <Layers className={className} />;
  }
};

export {
  UploadCloud,
  Calendar,
  Download,
  ClipboardList,
  FileSpreadsheet,
  Boxes,
  Layers,
  LayoutGrid,
  ExternalLink,
  CheckCircle2,
  Circle,
  Plus,
  Trash2,
  Edit2,
  Maximize2,
  Minimize2,
  RefreshCw,
  Copy,
  Check,
  Columns,
  Search,
  Sparkles,
  ArrowRight,
  Info,
  Clock,
  Bookmark,
  ShieldCheck,
  FolderSync,
  HelpCircle,
  ChevronRight,
  ChevronLeft,
  Sun,
  Moon,
  Menu,
  X,
  AlertTriangle,
  Settings,
  FileText,
  Activity,
  ListTodo
};
