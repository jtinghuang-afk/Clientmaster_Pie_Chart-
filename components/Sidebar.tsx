import React from 'react';
import { DeviceData, ChartType } from '../types';
import { Icon } from './Icon';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
  data: DeviceData[];
  onColorChange: (id: string, color: string) => void;
  chartType: ChartType;
  setChartType: (type: ChartType) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  toggleSidebar,
  data,
  onColorChange,
  chartType,
  setChartType,
}) => {
  return (
    <div
      className={`fixed left-0 top-0 h-full bg-slate-800/90 backdrop-blur-md border-r border-slate-700 transition-all duration-300 ease-in-out z-20 flex flex-col ${
        isOpen ? 'w-80' : 'w-16'
      }`}
    >
      {/* Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-slate-700">
        {isOpen && <h1 className="text-lg font-bold text-white tracking-wider">CONTROLS</h1>}
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-lg hover:bg-slate-700 text-slate-300 transition-colors"
        >
          <Icon name={isOpen ? 'ChevronLeft' : 'Menu'} size={20} />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden">
        {isOpen ? (
          <div className="p-4 space-y-8">
            {/* Chart Type Selector */}
            <section>
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">
                Visualization Model
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'pie', label: '3D Pie', icon: 'PieChart' },
                  { id: 'bar', label: 'Bar Stack', icon: 'BarChart3' },
                  { id: 'radar', label: 'Radar', icon: 'Radar' },
                  { id: 'treemap', label: 'Density', icon: 'LayoutGrid' },
                ].map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setChartType(type.id as ChartType)}
                    className={`flex items-center gap-2 p-3 rounded-lg border transition-all ${
                      chartType === type.id
                        ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-500/20'
                        : 'bg-slate-700/50 border-slate-600 text-slate-400 hover:bg-slate-700 hover:text-slate-200'
                    }`}
                  >
                    <Icon name={type.icon as any} size={16} />
                    <span className="text-sm font-medium">{type.label}</span>
                  </button>
                ))}
              </div>
            </section>

            {/* Color Customization */}
            <section>
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">
                Data Appearance
              </h3>
              <div className="space-y-3">
                {data.map((item) => (
                  <div key={item.id} className="flex items-center justify-between group">
                    <span className="text-sm text-slate-300">{item.name}</span>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={item.color}
                        onChange={(e) => onColorChange(item.id, e.target.value)}
                        className="w-8 h-8 rounded cursor-pointer bg-transparent border-0"
                      />
                      <span className="text-xs font-mono text-slate-500 w-16 text-right">
                        {item.color}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        ) : (
          <div className="flex flex-col items-center py-4 space-y-4">
             <button onClick={() => setChartType('pie')} className="p-2 rounded hover:bg-slate-700 text-slate-400">
               <Icon name="PieChart" size={20} />
             </button>
             <button onClick={() => setChartType('bar')} className="p-2 rounded hover:bg-slate-700 text-slate-400">
               <Icon name="BarChart3" size={20} />
             </button>
             <button onClick={() => setChartType('radar')} className="p-2 rounded hover:bg-slate-700 text-slate-400">
               <Icon name="Radar" size={20} />
             </button>
          </div>
        )}
      </div>
    </div>
  );
};