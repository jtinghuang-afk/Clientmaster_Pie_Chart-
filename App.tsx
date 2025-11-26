import React, { useState, useMemo } from 'react';
import { INITIAL_DATA } from './constants';
import { DeviceData, ChartType } from './types';
import { Sidebar } from './components/Sidebar';
import { InfoPanel } from './components/InfoPanel';
import { Visualizer } from './components/Visualizer';
import { BrenchPanel } from './components/BrenchPanel';

const App: React.FC = () => {
  const [data, setData] = useState<DeviceData[]>(INITIAL_DATA);
  const [chartType, setChartType] = useState<ChartType>('pie');
  
  // UI State
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isInfoPanelOpen, setIsInfoPanelOpen] = useState(true);
  const [isBrenchOpen, setIsBrenchOpen] = useState(false);

  // Derived State
  const totalItems = useMemo(() => data.reduce((acc, curr) => acc + curr.value, 0), [data]);

  // Handlers
  const handleColorChange = (id: string, newColor: string) => {
    setData((prev) =>
      prev.map((item) => (item.id === id ? { ...item, color: newColor } : item))
    );
  };

  const handleDataUpdate = (id: string, newValue: number) => {
    setData((prev) =>
      prev.map((item) => (item.id === id ? { ...item, value: newValue } : item))
    );
  };

  const handleReset = () => {
    setData(INITIAL_DATA);
  };

  return (
    <div className="w-full h-screen bg-slate-900 text-white relative overflow-hidden selection:bg-blue-500/30">
      
      {/* Top Bar / Branding (floating) */}
      <div className={`absolute top-0 left-0 right-0 h-16 flex items-center justify-center pointer-events-none z-10 transition-all ${isSidebarOpen ? 'pl-64' : 'pl-0'}`}>
         <h1 className="text-2xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400 drop-shadow-lg">
            SATCOM<span className="text-slate-500 font-light">VIZ</span>
         </h1>
      </div>

      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        data={data}
        onColorChange={handleColorChange}
        chartType={chartType}
        setChartType={setChartType}
      />

      <Visualizer
        data={data}
        chartType={chartType}
        isSidebarOpen={isSidebarOpen}
        isInfoOpen={isInfoPanelOpen}
      />

      <InfoPanel
        isOpen={isInfoPanelOpen}
        togglePanel={() => setIsInfoPanelOpen(!isInfoPanelOpen)}
        data={data}
        total={totalItems}
      />

      <BrenchPanel
        isOpen={isBrenchOpen}
        togglePanel={() => setIsBrenchOpen(!isBrenchOpen)}
        data={data}
        onDataUpdate={handleDataUpdate}
        resetData={handleReset}
      />
    </div>
  );
};

export default App;