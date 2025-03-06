import React from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Grid,
  CircularProgress,
  Alert,
} from '@mui/material';
import { useDevice } from '../../hooks/useDevice';

export const DeviceManager: React.FC = () => {
  const {
    selectedDevice,
    connectedDevices,
    deviceMetrics,
    loading,
    error,
    scanDevices,
    connectDevice,
    disconnectDevice,
  } = useDevice();

  const handleConnect = async (deviceId: string) => {
    await connectDevice(deviceId);
  };

  const handleDisconnect = async (deviceId: string) => {
    await disconnectDevice(deviceId);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Device Manager
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Button
        variant="contained"
        onClick={() => scanDevices()}
        disabled={loading}
        sx={{ mb: 3 }}
      >
        {loading ? <CircularProgress size={24} /> : 'Scan for Devices'}
      </Button>

      <Grid container spacing={3}>
        {/* Available Devices */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Available Devices
              </Typography>
              {connectedDevices.length === 0 ? (
                <Typography color="textSecondary">
                  No devices found. Click "Scan for Devices" to search for available devices.
                </Typography>
              ) : (
                connectedDevices.map((device) => (
                  <Box
                    key={device.id}
                    sx={{
                      p: 2,
                      mb: 2,
                      border: '1px solid',
                      borderColor: 'divider',
                      borderRadius: 1,
                      bgcolor: device.connected ? 'action.selected' : 'background.paper',
                    }}
                  >
                    <Typography variant="subtitle1">{device.name}</Typography>
                    <Typography color="textSecondary" gutterBottom>
                      Type: {device.type}
                    </Typography>
                    <Typography color="textSecondary" gutterBottom>
                      Battery: {device.batteryLevel}%
                    </Typography>
                    <Typography color="textSecondary" gutterBottom>
                      Status: {device.status}
                    </Typography>
                    <Typography color="textSecondary" gutterBottom>
                      Last Sync: {new Date(device.lastSync).toLocaleString()}
                    </Typography>
                    <Button
                      variant="outlined"
                      onClick={() =>
                        device.connected
                          ? handleDisconnect(device.id)
                          : handleConnect(device.id)
                      }
                      color={device.connected ? 'error' : 'primary'}
                    >
                      {device.connected ? 'Disconnect' : 'Connect'}
                    </Button>
                  </Box>
                ))
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Device Metrics */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Device Metrics
              </Typography>
              {selectedDevice?.connected ? (
                deviceMetrics ? (
                  <Box>
                    <Typography variant="body1" gutterBottom>
                      Heart Rate: {deviceMetrics.heartRate} bpm
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      Steps: {deviceMetrics.steps}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      Active Minutes: {deviceMetrics.activeMinutes}
                    </Typography>
                    {deviceMetrics.sleepDuration && (
                      <Typography variant="body1" gutterBottom>
                        Sleep Duration: {deviceMetrics.sleepDuration} hours
                      </Typography>
                    )}
                    {deviceMetrics.sleepQuality && (
                      <Typography variant="body1" gutterBottom>
                        Sleep Quality: {deviceMetrics.sleepQuality}%
                      </Typography>
                    )}
                    <Typography variant="caption" color="textSecondary" display="block">
                      Last Updated: {new Date(deviceMetrics.timestamp).toLocaleString()}
                    </Typography>
                  </Box>
                ) : (
                  <Typography>Fetching metrics...</Typography>
                )
              ) : (
                <Typography>Connect a device to view metrics</Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}; 