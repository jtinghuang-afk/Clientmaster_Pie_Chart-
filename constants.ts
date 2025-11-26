import { DeviceData } from './types';

// Data extracted from the image
export const INITIAL_DATA: DeviceData[] = [
  { id: 'fbb', name: 'FBB', value: 381, color: '#1d4ed8' }, // Blue-ish
  { id: 'starlink', name: 'Starlink', value: 340, color: '#a3e635' }, // Lime/Green-ish
  { id: 'vsat', name: 'VSAT', value: 312, color: '#15803d' }, // Green
  { id: 'fx', name: 'FX', value: 150, color: '#f87171' }, // Red/Pink
  { id: 'nexus', name: 'Nexus Wave', value: 19, color: '#ef4444' }, // Red
  { id: '4g', name: '4G', value: 4, color: '#f59e0b' }, // Orange/Yellow
  { id: 'other', name: 'Other', value: 1119, color: '#93c5fd' }, // Light Blue
];

export const TOTAL_ITEMS = 2325;