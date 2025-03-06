import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import {
  scanDevices,
  connectDevice,
  disconnectDeviceThunk,
  fetchMetrics,
  setSelectedDevice,
  updateConnectedDevices,
  updateDeviceMetrics,
  setDeviceLoading,
  setDeviceError
} from '../store/slices/deviceSlice';
import { DeviceMetrics, Device } from '../types/device';

export const useDevice = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    selectedDevice,
    connectedDevices,
    deviceMetrics,
    loading,
    error
  } = useSelector((state: RootState) => state.device);

  // Auto-fetch metrics for connected devices
  useEffect(() => {
    if (selectedDevice && connectedDevices.some(device => device.id === selectedDevice.id && device.connected)) {
      const interval = setInterval(() => {
        dispatch(fetchMetrics(selectedDevice.id));
      }, 5000); // Fetch every 5 seconds

      return () => clearInterval(interval);
    }
  }, [dispatch, selectedDevice, connectedDevices]);

  const handleScanDevices = async () => {
    try {
      dispatch(setDeviceLoading(true));
      await dispatch(scanDevices()).unwrap();
    } catch (error) {
      dispatch(setDeviceError(error instanceof Error ? error.message : 'Failed to scan devices'));
    } finally {
      dispatch(setDeviceLoading(false));
    }
  };

  const handleConnectDevice = async (deviceId: string) => {
    try {
      dispatch(setDeviceLoading(true));
      const device = await dispatch(connectDevice(deviceId)).unwrap();
      if (device) {
        dispatch(setSelectedDevice(device));
      }
    } catch (error) {
      dispatch(setDeviceError(error instanceof Error ? error.message : 'Failed to connect device'));
    } finally {
      dispatch(setDeviceLoading(false));
    }
  };

  const handleDisconnectDevice = async (deviceId: string) => {
    try {
      dispatch(setDeviceLoading(true));
      await dispatch(disconnectDeviceThunk(deviceId)).unwrap();
      if (selectedDevice?.id === deviceId) {
        dispatch(setSelectedDevice(null));
        // Clear device metrics when disconnecting
        dispatch(updateDeviceMetrics({
          heartRate: 0,
          steps: 0,
          activeMinutes: 0,
          timestamp: new Date().toISOString(),
        }));
      }
    } catch (error) {
      dispatch(setDeviceError(error instanceof Error ? error.message : 'Failed to disconnect device'));
    } finally {
      dispatch(setDeviceLoading(false));
    }
  };

  const handleFetchMetrics = async (deviceId: string) => {
    try {
      dispatch(setDeviceLoading(true));
      const metrics = await dispatch(fetchMetrics(deviceId)).unwrap();
      if (metrics) {
        dispatch(updateDeviceMetrics(metrics));
      }
    } catch (error) {
      dispatch(setDeviceError(error instanceof Error ? error.message : 'Failed to fetch metrics'));
    } finally {
      dispatch(setDeviceLoading(false));
    }
  };

  return {
    selectedDevice,
    connectedDevices,
    deviceMetrics,
    loading,
    error,
    scanDevices: handleScanDevices,
    connectDevice: handleConnectDevice,
    disconnectDevice: handleDisconnectDevice,
    fetchMetrics: handleFetchMetrics,
  };
}; 