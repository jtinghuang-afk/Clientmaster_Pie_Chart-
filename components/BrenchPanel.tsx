import React from 'react';
import { DeviceData } from '../types';
import { Icon } from './Icon';

interface BrenchPanelProps {
  isOpen: boolean;
  togglePanel: () => void;
  data: DeviceData[];
  onDataUpdate: (id: string, newValue: number) => void;
  resetData: () => void;
}

export const BrenchPanel: React.FC<BrenchPanelProps> = ({
  isOpen,
  togglePanel,
  data,
  onDataUpdate,
  resetData,
}) => {
  return (
    <div
      className={`fixed bottom-0 left-0 w-full bg-slate-900/95 backdrop-blur-xl border-t border-slate-700 transition-all duration-300 ease-in-out z-30 flex flex-col ${
        isOpen ? 'h-64' : 'h-12'
      }`}
    >
      {/* Header / Toggle Bar */}
      <div
        className="h-12 flex items-center justify-between px-6 bg-slate-800/50 cursor-pointer hover:bg-slate-800 transition-colors"
        onClick={togglePanel}
      >
        <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-1 rounded">
                <Icon name="GitBranch" size={16} className="text-white" />
            </div>
            <span className="font-bold text-white tracking-wider text-sm">BENCH SIMULATION (BRENCH)</span>
        </div>
        <Icon name={isOpen ? 'ChevronDown' : 'ChevronUp'} size={20} className="text-slate-400" />
      </div>

      {/* Content */}
      <div className="flex-1 overflow-x-auto overflow-y-hidden p-6">
        <div className="flex items-center gap-8 min-w-max">
            
          {/* Controls Information */}
          <div className="w-48 pr-6 border-r border-slate-700">
            <p className="text-sm text-slate-300 mb-4">
              Adjust sliders to simulate different device distributions.
            </p>
            <button
              onClick={(e) => {
                e.stopPropagation();
                resetData();
              }}
              className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-colors"
            >
              <Icon name="RotateCcw" size={14} />
              Reset Data
            </button>
          </div>

          {/* Sliders */}
          <div className="flex items-start gap-8">
            {data.map((item) => (
              <div key={item.id} className="w-32 flex flex-col items-center gap-2">
                <span className="text-xs font-semibold text-slate-400 truncate w-full text-center">
                  {item.name}
                </span>
                <div className="h-32 bg-slate-800 w-2 rounded-full relative group">
                  <div
                    className="absolute bottom-0 left-0 w-full rounded-full transition-all duration-100"
                    style={{
                      height: `${Math.min((item.value / 1500) * 100, 100)}%`, // Scale visually
                      backgroundColor: item.color,
                    }}
                  ></div>
                  <input
                    type="range"
                    min="0"
                    max="1500"
                    value={item.value}
                    onChange={(e) => onDataUpdate(item.id, parseInt(e.target.value))}
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-2 -rotate-90 origin-bottom-left translate-y-2 opacity-0 group-hover:opacity-100 cursor-ns-resize"
                  />
                </div>
                <input 
                    type="number"
                    value={item.value}
                    onChange={(e) => onDataUpdate(item.id, parseInt(e.target.value) || 0)}
                    className="w-20 bg-slate-800 border border-slate-700 rounded px-2 py-1 text-center text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};