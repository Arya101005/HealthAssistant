import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  useTheme,
  LinearProgress,
} from '@mui/material';
import {
  Bluetooth as BluetoothIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
  Check as CheckIcon,
  Warning as WarningIcon,
  DeviceHub as DeviceIcon,
  Refresh as RefreshIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';

interface Device {
  id: string;
  name: string;
  type: string;
  status: 'connected' | 'disconnected' | 'pairing';
  batteryLevel: number;
  lastSync?: string;
}

const availableDevices: Device[] = [
  {
    id: '1',
    name: 'Apple Watch Series 8',
    type: 'Smartwatch',
    status: 'connected',
    batteryLevel: 85,
    lastSync: '2024-03-20 10:30 AM',
  },
  {
    id: '2',
    name: 'Fitbit Versa 4',
    type: 'Fitness Tracker',
    status: 'disconnected',
    batteryLevel: 0,
  },
  {
    id: '3',
    name: 'Glucose Monitor G6',
    type: 'Medical Device',
    status: 'connected',
    batteryLevel: 92,
    lastSync: '2024-03-20 11:45 AM',
  },
  {
    id: '4',
    name: 'Blood Pressure Monitor',
    type: 'Medical Device',
    status: 'disconnected',
    batteryLevel: 0,
  },
];

export const ConnectDevicePage: React.FC = () => {
  const theme = useTheme();
  const [devices, setDevices] = useState<Device[]>(availableDevices);
  const [scanning, setScanning] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

  const handleScanDevices = () => {
    setScanning(true);
    // Simulate device scanning
    setTimeout(() => {
      setScanning(false);
    }, 3000);
  };

  const handleConnectDevice = (device: Device) => {
    setSelectedDevice(device);
    setOpenDialog(true);
  };

  const handleConfirmConnect = () => {
    if (selectedDevice) {
      setDevices(devices.map(d =>
        d.id === selectedDevice.id
          ? { ...d, status: 'connected', lastSync: new Date().toLocaleString() }
          : d
      ));
    }
    setOpenDialog(false);
    setSelectedDevice(null);
  };

  const handleDisconnectDevice = (deviceId: string) => {
    setDevices(devices.map(d =>
      d.id === deviceId
        ? { ...d, status: 'disconnected', batteryLevel: 0, lastSync: undefined }
        : d
    ));
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Paper
        sx={{
          p: 3,
          mb: 3,
          background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
          color: 'white',
          borderRadius: 2,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '40%',
            height: '100%',
            background: 'linear-gradient(45deg, transparent, rgba(255,255,255,0.1))',
            transform: 'skewX(-20deg)',
            transformOrigin: 'top',
          }}
        />
        <Typography variant="h4" gutterBottom fontWeight="bold">
          Device Management
        </Typography>
        <Typography variant="subtitle1">
          Connect and manage your health monitoring devices
        </Typography>
      </Paper>

      <Grid container spacing={3}>
        {/* Connected Devices */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6">Connected Devices</Typography>
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                onClick={handleScanDevices}
                disabled={scanning}
              >
                {scanning ? 'Scanning...' : 'Scan for Devices'}
              </Button>
            </Box>
            <List>
              {devices.map((device) => (
                <Card key={device.id} sx={{ mb: 2 }}>
                  <CardContent>
                    <Grid container alignItems="center" spacing={2}>
                      <Grid item>
                        <DeviceIcon color={device.status === 'connected' ? 'primary' : 'disabled'} />
                      </Grid>
                      <Grid item xs>
                        <Typography variant="h6">{device.name}</Typography>
                        <Typography variant="body2" color="textSecondary">
                          {device.type}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                          <Chip
                            size="small"
                            icon={device.status === 'connected' ? <CheckIcon /> : <WarningIcon />}
                            label={device.status}
                            color={device.status === 'connected' ? 'success' : 'default'}
                            sx={{ mr: 1 }}
                          />
                          {device.status === 'connected' && (
                            <Typography variant="caption" color="textSecondary">
                              Last synced: {device.lastSync}
                            </Typography>
                          )}
                        </Box>
                      </Grid>
                      <Grid item>
                        {device.status === 'connected' ? (
                          <>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                              <Typography variant="caption" sx={{ mr: 1 }}>
                                Battery: {device.batteryLevel}%
                              </Typography>
                              <LinearProgress
                                variant="determinate"
                                value={device.batteryLevel}
                                sx={{
                                  width: 100,
                                  height: 8,
                                  borderRadius: 5,
                                  bgcolor: `${theme.palette.primary.main}20`,
                                  '& .MuiLinearProgress-bar': {
                                    bgcolor: device.batteryLevel > 20 ? theme.palette.success.main : theme.palette.error.main,
                                    borderRadius: 5,
                                  },
                                }}
                              />
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                              <IconButton size="small" sx={{ mr: 1 }}>
                                <RefreshIcon />
                              </IconButton>
                              <IconButton size="small" sx={{ mr: 1 }}>
                                <SettingsIcon />
                              </IconButton>
                              <IconButton
                                size="small"
                                color="error"
                                onClick={() => handleDisconnectDevice(device.id)}
                              >
                                <DeleteIcon />
                              </IconButton>
                            </Box>
                          </>
                        ) : (
                          <Button
                            variant="outlined"
                            color="primary"
                            onClick={() => handleConnectDevice(device)}
                            startIcon={<BluetoothIcon />}
                          >
                            Connect
                          </Button>
                        )}
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Device Information */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Compatible Devices
            </Typography>
            <List>
              {[
                'Smart Watches',
                'Fitness Trackers',
                'Blood Pressure Monitors',
                'Glucose Monitors',
                'Heart Rate Monitors',
                'Sleep Trackers',
              ].map((device, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    <DeviceIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText primary={device} />
                </ListItem>
              ))}
            </List>
          </Paper>

          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Connection Tips
            </Typography>
            <List>
              {[
                'Enable Bluetooth on your device',
                'Keep device within range (30 feet)',
                'Ensure device is charged',
                'Update device firmware if needed',
              ].map((tip, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    <CheckIcon color="success" />
                  </ListItemIcon>
                  <ListItemText primary={tip} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>

      {/* Connect Device Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Connect Device</DialogTitle>
        <DialogContent>
          <Typography>
            Attempting to connect to {selectedDevice?.name}. Please make sure the device is nearby and in pairing mode.
          </Typography>
          {scanning && (
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 3 }}>
              <CircularProgress />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleConfirmConnect} variant="contained" color="primary">
            Connect
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ConnectDevicePage; 