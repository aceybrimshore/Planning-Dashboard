import React, { useState } from 'react';
import { PlanningTool } from '../types';
import { Plus, X } from './icons';

interface AddEditToolModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTool: (tool: PlanningTool) => void;
}

export const AddEditToolModal: React.FC<AddEditToolModalProps> = ({
  isOpen,
  onClose,
  onAddTool,
}) => {
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const [footerStat, setFooterStat] = useState('Recently linked');
  const [badgeText, setBadgeText] = useState('Custom');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !url.trim()) return;

    let formattedUrl = url.trim();
    if (!formattedUrl.startsWith('http://') && !formattedUrl.startsWith('https://')) {
      formattedUrl = 'https://' + formattedUrl;
    }

    const newTool: PlanningTool = {
      id: 'tool-' + Date.now(),
      name: name.trim(),
      shortName: name.trim().slice(0, 16),
      url: formattedUrl,
      description: description.trim() || 'Custom operational planning tool.',
      category: 'custom',
      icon: 'Layers',
      badge: badgeText.trim()
        ? { text: badgeText.trim(), variant: 'default' }
        : undefined,
      footerStat: footerStat.trim() || 'Active',
      workflowStep: 99,
      accentColor: 'blue',
      tags: ['Custom', 'Module'],
      isCustom: true,
    };

    onAddTool(newTool);
    setName('');
    setUrl('');
    setDescription('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-2xs">
      <div
        id="modal-add-tool-container"
        className="w-full max-w-lg bg-white border border-slate-200 rounded-2xl shadow-xl p-6 text-slate-800 space-y-5"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <Plus className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Add Planning Module</h2>
              <p className="text-xs text-slate-500">
                Link another GitHub Pages app or operational sheet
              </p>
            </div>
          </div>
          <button
            id="btn-close-modal"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-700 font-semibold mb-1">
              Tool Name *
            </label>
            <input
              id="input-name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Master Logistics Hub"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-semibold mb-1">
              Tool URL (GitHub Pages or Web Link) *
            </label>
            <input
              id="input-url"
              type="text"
              required
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://aceybrimshore.github.io/tool-name/"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-mono placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-semibold mb-1">
              Description
            </label>
            <textarea
              id="input-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What this planning module does..."
              rows={2}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">
                Badge Label (Optional)
              </label>
              <input
                id="input-badge"
                type="text"
                value={badgeText}
                onChange={(e) => setBadgeText(e.target.value)}
                placeholder="e.g. V1.0 or Beta"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-semibold mb-1">
                Footer Status Tag
              </label>
              <input
                id="input-footer-stat"
                type="text"
                value={footerStat}
                onChange={(e) => setFooterStat(e.target.value)}
                placeholder="e.g. 5 active schedules"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
              />
            </div>
          </div>

          <div className="pt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-slate-500 hover:text-slate-800 font-medium"
            >
              Cancel
            </button>
            <button
              id="btn-submit-add-tool"
              type="submit"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors shadow-2xs"
            >
              Add Module
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
