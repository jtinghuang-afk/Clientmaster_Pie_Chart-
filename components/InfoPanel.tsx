import React from 'react';
import { DeviceData } from '../types';
import { Icon } from './Icon';

interface InfoPanelProps {
  isOpen: boolean;
  togglePanel: () => void;
  data: DeviceData[];
  total: number;
}

export const InfoPanel: React.FC<InfoPanelProps> = ({ isOpen, togglePanel, data, total }) => {
  return (
    <div
      className={`fixed right-0 top-0 h-full bg-slate-800/90 backdrop-blur-md border-l border-slate-700 transition-all duration-300 ease-in-out z-20 flex flex-col ${
        isOpen ? 'w-80' : 'w-12'
      }`}
    >
      <div className="h-16 flex items-center justify-start px-2 border-b border-slate-700">
        <button
          onClick={togglePanel}
          className="p-2 rounded-lg hover:bg-slate-700 text-slate-300 transition-colors"
        >
          <Icon name={isOpen ? 'ChevronRight' : 'Info'} size={20} />
        </button>
        {isOpen && <h1 className="ml-3 text-lg font-bold text-white tracking-wider">DETAILS</h1>}
      </div>

      <div className="flex-1 overflow-y-auto">
        {isOpen && (
          <div className="p-6 space-y-8">
            {/* Summary Card */}
            <div className="bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 p-5 rounded-xl">
              <div className="text-slate-400 text-xs uppercase tracking-widest mb-1">Total Devices</div>
              <div className="text-4xl font-bold text-white">{total.toLocaleString()}</div>
              <div className="mt-2 text-xs text-indigo-300 flex items-center gap-1">
                <Icon name="Activity" size={12} />
                <span>Active Slots</span>
              </div>
            </div>

            {/* Breakdown */}
            <div className="space-y-4">
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Distribution Stats
              </h3>
              {/* Fix: Create a shallow copy with [...data] before sorting */}
              {[...data].sort((a, b) => b.value - a.value).map((item) => {
                const percentage = total > 0 ? ((item.value / total) * 100).toFixed(1) : '0.0';
                return (
                  <div key={item.id} className="bg-slate-700/30 p-3 rounded-lg border border-slate-700 hover:border-slate-500 transition-colors">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-3 h-3 rounded-full shadow-[0_0_8px_rgba(0,0,0,0.5)]"
                          style={{ backgroundColor: item.color }}
                        ></div>
                        <span className="font-medium text-slate-200">{item.name}</span>
                      </div>
                      <span className="text-sm font-bold text-white">{percentage}%</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${percentage}%`, backgroundColor: item.color }}
                      ></div>
                    </div>
                    <div className="text-right mt-1 text-xs text-slate-500">
                      {item.value.toLocaleString()} units
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};