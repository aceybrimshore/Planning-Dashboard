import React from 'react';

export const StatusBar: React.FC = () => {
  return (
    <footer
      id="main-app-status-bar"
      className="bg-[#0b1120] text-slate-300 py-3.5 px-6 border-t border-slate-800"
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] font-mono font-semibold tracking-wider uppercase">
        {/* Left: Operational status */}
        <div className="flex items-center gap-2 text-slate-300">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>SYSTEM HEALTH: OPERATIONAL</span>
        </div>

        {/* Center: Version info */}
        <div className="text-slate-400">
          <span>CENTRALIZED PLANNING INTERFACE V1.0.0</span>
        </div>

        {/* Right: GitHub profile link */}
        <div className="text-slate-400 flex items-center gap-1">
          <span>GITHUB LINKED:</span>
          <a
            href="https://github.com/aceybrimshore"
            target="_blank"
            rel="noreferrer"
            className="text-blue-400 hover:text-blue-300 underline underline-offset-2 transition-colors"
          >
            ACEYBRIMSHORE
          </a>
        </div>
      </div>
    </footer>
  );
};
