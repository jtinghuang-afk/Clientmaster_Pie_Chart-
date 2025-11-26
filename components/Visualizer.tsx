import React from 'react';
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  Treemap
} from 'recharts';
import { DeviceData, ChartType } from '../types';

interface VisualizerProps {
  data: DeviceData[];
  chartType: ChartType;
  isSidebarOpen: boolean;
  isInfoOpen: boolean;
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-slate-900/90 border border-slate-600 p-3 rounded shadow-xl backdrop-blur-sm">
        <p className="text-white font-bold">{data.name}</p>
        <p className="text-slate-300 text-sm">
          Value: <span className="text-white font-mono">{data.value}</span>
        </p>
        <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider">Click to focus</p>
      </div>
    );
  }
  return null;
};

// Customized Treemap Content
const CustomizedTreemapContent = (props: any) => {
    const { root, depth, x, y, width, height, index, colors, name, value } = props;
    
    return (
      <g>
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          style={{
            fill: props.color || '#333',
            stroke: '#1e293b',
            strokeWidth: 2,
            strokeOpacity: 1,
          }}
        />
        {width > 30 && height > 30 && (
          <text
            x={x + width / 2}
            y={y + height / 2}
            textAnchor="middle"
            fill="#fff"
            fontSize={12}
            fontWeight="bold"
            style={{ textShadow: '0 1px 3px rgba(0,0,0,0.8)' }}
          >
            {name}
          </text>
        )}
      </g>
    );
  };

export const Visualizer: React.FC<VisualizerProps> = ({
  data,
  chartType,
  isSidebarOpen,
  isInfoOpen,
}) => {
  const containerClass = `absolute top-16 bottom-12 transition-all duration-300 ease-in-out flex items-center justify-center p-8 
  ${isSidebarOpen ? 'left-80' : 'left-16'} 
  ${isInfoOpen ? 'right-80' : 'right-12'}`;

  const renderChart = () => {
    switch (chartType) {
      case 'pie':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <defs>
                 {data.map((entry, index) => (
                   <filter key={`shadow-${index}`} id={`shadow-${index}`}>
                      <feDropShadow dx="0" dy="5" stdDeviation="5" floodColor={entry.color} floodOpacity="0.4" />
                   </filter>
                 ))}
              </defs>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius="40%"
                outerRadius="70%"
                paddingAngle={5}
                dataKey="value"
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.color} 
                    style={{ filter: `drop-shadow(0px 10px 10px ${entry.color}40)` }}
                    stroke="rgba(255,255,255,0.1)"
                    strokeWidth={1}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        );

      case 'bar':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
              <XAxis dataKey="name" stroke="#94a3b8" tick={{ fill: '#94a3b8' }} />
              <YAxis stroke="#94a3b8" tick={{ fill: '#94a3b8' }} />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.05)' }} />
              <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        );

      case 'radar':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
              <PolarGrid stroke="#334155" />
              <PolarAngleAxis dataKey="name" tick={{ fill: '#e2e8f0', fontSize: 12 }} />
              <PolarRadiusAxis angle={30} domain={[0, 'auto']} stroke="#94a3b8" />
              <Radar
                name="Distribution"
                dataKey="value"
                stroke="#8884d8"
                fill="#8884d8"
                fillOpacity={0.6}
              />
               <Tooltip content={<CustomTooltip />} />
            </RadarChart>
          </ResponsiveContainer>
        );
        
      case 'treemap':
        return (
             <ResponsiveContainer width="100%" height="100%">
                <Treemap
                    data={data}
                    dataKey="value"
                    aspectRatio={4 / 3}
                    stroke="#fff"
                    fill="#8884d8"
                    content={<CustomizedTreemapContent />}
                >
                     <Tooltip content={<CustomTooltip />} />
                </Treemap>
            </ResponsiveContainer>
        );

      default:
        return null;
    }
  };

  return (
    <div className={containerClass}>
       {/* Background Grid Effect */}
       <div className="absolute inset-0 z-[-1] opacity-20 pointer-events-none" 
            style={{ 
                backgroundImage: 'radial-gradient(circle at 1px 1px, #475569 1px, transparent 0)',
                backgroundSize: '40px 40px' 
            }}>
       </div>
       
      <div className="w-full h-full relative">
         {/* 3D Platform Base Effect */}
         {chartType === 'pie' && (
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-3xl -z-10"></div>
         )}
        {renderChart()}
      </div>
    </div>
  );
};