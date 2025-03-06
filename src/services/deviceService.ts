import { Device, DeviceMetrics } from '../types/device';

// Mock data for available devices
const mockDevices: Device[] = [
  {
    id: 'device1',
    name: 'Fitbit Charge 5',
    type: 'fitnessBand',
    batteryLevel: 85,
    connected: false,
    status: 'disconnected',
    lastSync: new Date().toISOString(),
  },
  {
    id: 'device2',
    name: 'Apple Watch Series 7',
    type: 'smartwatch',
    batteryLevel: 90,
    connected: false,
    status: 'disconnected',
    lastSync: new Date().toISOString(),
  },
  {
    id: 'device3',
    name: 'Polar H10',
    type: 'heartRateMonitor',
    batteryLevel: 95,
    connected: false,
    status: 'disconnected',
    lastSync: new Date().toISOString(),
  },
];

// Simulate scanning for available devices
export const scanForDevices = async (): Promise<Device[]> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  return mockDevices;
};

// Simulate connecting to a device
export const connectToDevice = async (deviceId: string): Promise<Device> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  const device = mockDevices.find(d => d.id === deviceId);
  
  if (!device) {
    throw new Error('Device not found');
  }

  return {
    ...device,
    connected: true,
    status: 'connected',
    lastSync: new Date().toISOString(),
  };
};

// Simulate disconnecting from a device
export const disconnectFromDevice = async (deviceId: string): Promise<void> => {
  await new Promise(resolve => setTimeout(resolve, 800));
  const device = mockDevices.find(d => d.id === deviceId);
  
  if (!device) {
    throw new Error('Device not found');
  }

  device.connected = false;
  device.status = 'disconnected';
  device.lastSync = new Date().toISOString();
};

// Simulate fetching metrics from a device
export const fetchDeviceMetrics = async (deviceId: string): Promise<DeviceMetrics> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const device = mockDevices.find(d => d.id === deviceId);
  
  if (!device) {
    throw new Error('Device not found');
  }

  if (!device.connected) {
    throw new Error('Device is not connected');
  }

  // Generate random metrics
  return {
    heartRate: Math.floor(Math.random() * 40) + 60, // 60-100 bpm
    steps: Math.floor(Math.random() * 5000) + 2000, // 2000-7000 steps
    activeMinutes: Math.floor(Math.random() * 60) + 30, // 30-90 minutes
    sleepDuration: Math.floor(Math.random() * 4) + 5, // 5-9 hours
    sleepQuality: Math.floor(Math.random() * 30) + 70, // 70-100%
    timestamp: new Date().toISOString(),
  };
};

// Helper function to check if a device exists
export const deviceExists = (deviceId: string): boolean => {
  return mockDevices.some(d => d.id === deviceId);
};

// Helper function to check if a device is connected
export const isDeviceConnected = (deviceId: string): boolean => {
  const device = mockDevices.find(d => d.id === deviceId);
  return device?.connected || false;
}; 