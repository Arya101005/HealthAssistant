export interface DeviceMetrics {
  heartRate: number;
  steps: number;
  activeMinutes: number;
  sleepDuration?: number;
  sleepQuality?: number;
  timestamp: string;
}

export interface Device {
  id: string;
  name: string;
  type: 'smartwatch' | 'fitnessBand' | 'heartRateMonitor';
  batteryLevel: number;
  connected: boolean;
  status: 'connected' | 'disconnected' | 'pairing';
  lastSync: string;
}

export interface DeviceState {
  selectedDevice: Device | null;
  connectedDevices: Device[];
  deviceMetrics: DeviceMetrics | null;
  loading: boolean;
  error: string | null;
}

export type DeviceList = Device[]; 