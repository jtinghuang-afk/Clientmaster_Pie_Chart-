export interface DeviceData {
  name: string;
  value: number;
  color: string;
  id: string;
}

export type ChartType = 'pie' | 'bar' | 'radar' | 'treemap';

export interface ViewSettings {
  chartType: ChartType;
  showLabels: boolean;
  showLegend: boolean;
  is3DMode: boolean; // Simulates 3D effect in 2D charts via shadows/gradients
}