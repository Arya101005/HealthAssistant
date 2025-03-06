import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Device, DeviceMetrics, DeviceState } from '../../types/device';
import {
  scanForDevices,
  connectToDevice,
  disconnectFromDevice,
  fetchDeviceMetrics,
} from '../../services/deviceService';

// Async thunks
export const scanDevices = createAsyncThunk(
  'device/scanDevices',
  async (_, { rejectWithValue }) => {
    try {
      return await scanForDevices();
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const connectDevice = createAsyncThunk(
  'device/connectDevice',
  async (deviceId: string, { rejectWithValue }) => {
    try {
      return await connectToDevice(deviceId);
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const disconnectDeviceThunk = createAsyncThunk(
  'device/disconnectDevice',
  async (deviceId: string, { rejectWithValue }) => {
    try {
      await disconnectFromDevice(deviceId);
      return deviceId;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const fetchMetrics = createAsyncThunk(
  'device/fetchMetrics',
  async (deviceId: string, { rejectWithValue }) => {
    try {
      return await fetchDeviceMetrics(deviceId);
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

const initialState: DeviceState = {
  selectedDevice: null,
  connectedDevices: [],
  deviceMetrics: null,
  loading: false,
  error: null,
};

const deviceSlice = createSlice({
  name: 'device',
  initialState,
  reducers: {
    setSelectedDevice: (state, action: PayloadAction<Device | null>) => {
      state.selectedDevice = action.payload;
      state.error = null;
    },
    updateConnectedDevices: (state, action: PayloadAction<Device[]>) => {
      state.connectedDevices = action.payload;
    },
    updateDeviceMetrics: (state, action: PayloadAction<DeviceMetrics>) => {
      state.deviceMetrics = action.payload;
    },
    setDeviceLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setDeviceError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Scan Devices
    builder.addCase(scanDevices.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(scanDevices.fulfilled, (state, action) => {
      state.loading = false;
      state.connectedDevices = action.payload;
    });
    builder.addCase(scanDevices.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Connect Device
    builder.addCase(connectDevice.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(connectDevice.fulfilled, (state, action) => {
      state.loading = false;
      state.selectedDevice = action.payload;
      state.connectedDevices = state.connectedDevices.map(device =>
        device.id === action.payload.id ? action.payload : device
      );
    });
    builder.addCase(connectDevice.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Disconnect Device
    builder.addCase(disconnectDeviceThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(disconnectDeviceThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.connectedDevices = state.connectedDevices.filter(
        device => device.id !== action.payload
      );
      if (state.selectedDevice?.id === action.payload) {
        state.selectedDevice = null;
      }
    });
    builder.addCase(disconnectDeviceThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Fetch Metrics
    builder.addCase(fetchMetrics.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchMetrics.fulfilled, (state, action) => {
      state.loading = false;
      state.deviceMetrics = action.payload;
    });
    builder.addCase(fetchMetrics.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const {
  setSelectedDevice,
  updateConnectedDevices,
  updateDeviceMetrics,
  setDeviceLoading,
  setDeviceError,
} = deviceSlice.actions;

export default deviceSlice.reducer; 