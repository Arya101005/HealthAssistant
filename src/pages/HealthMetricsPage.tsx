import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  useTheme,
  Card,
  CardContent,
  LinearProgress,
} from '@mui/material';
import {
  Watch as WatchIcon,
  Bluetooth as BluetoothIcon,
  CheckCircle as CheckCircleIcon,
  Sync as SyncIcon,
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { WearableDevice } from '../services/healthDataService';
import { updateMetrics } from '../store/healthSlice';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';

interface DeviceStatus {
  connected: boolean;
  syncing: boolean;
  lastSync?: Date;
  error?: string;
}

const mockHeartRateData = [
  { time: '00:00', value: 68 },
  { time: '04:00', value: 65 },
  { time: '08:00', value: 72 },
  { time: '12:00', value: 85 },
  { time: '16:00', value: 78 },
  { time: '20:00', value: 71 },
  { time: '23:59', value: 68 },
];

const mockBloodPressureData = [
  { time: 'Mon', systolic: 120, diastolic: 80 },
  { time: 'Tue', systolic: 118, diastolic: 79 },
  { time: 'Wed', systolic: 122, diastolic: 82 },
  { time: 'Thu', systolic: 119, diastolic: 79 },
  { time: 'Fri', systolic: 121, diastolic: 81 },
  { time: 'Sat', systolic: 117, diastolic: 78 },
  { time: 'Sun', systolic: 120, diastolic: 80 },
];

const mockSleepData = [
  { date: 'Mon', deep: 2, light: 5, rem: 1.5 },
  { date: 'Tue', deep: 2.5, light: 4.5, rem: 1.8 },
  { date: 'Wed', deep: 1.8, light: 5.2, rem: 1.4 },
  { date: 'Thu', deep: 2.2, light: 4.8, rem: 1.6 },
  { date: 'Fri', deep: 2.4, light: 5, rem: 1.7 },
  { date: 'Sat', deep: 2.8, light: 5.5, rem: 2 },
  { date: 'Sun', deep: 2.6, light: 5.2, rem: 1.8 },
];

const mockStressData = [
  { label: 'Low', value: 45 },
  { label: 'Medium', value: 30 },
  { label: 'High', value: 25 },
];

export const HealthMetricsPage: React.FC = () => {
  const dispatch = useDispatch();
  const healthData = useSelector((state: RootState) => state.health);
  const theme = useTheme();
  
  const [deviceStatuses, setDeviceStatuses] = useState<Record<WearableDevice, DeviceStatus>>({
    [WearableDevice.GOOGLE_FIT]: { connected: false, syncing: false },
    [WearableDevice.APPLE_HEALTH]: { connected: false, syncing: false },
    [WearableDevice.FITBIT]: { connected: false, syncing: false },
  });
  
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState<WearableDevice | null>(null);

  const handleDeviceConnect = async (device: WearableDevice) => {
    setSelectedDevice(device);
    setOpenDialog(true);
  };

  const handleConfirmConnect = async () => {
    if (!selectedDevice) return;

    setDeviceStatuses(prev => ({
      ...prev,
      [selectedDevice]: { ...prev[selectedDevice], syncing: true },
    }));

    try {
      // Simulate device connection and data sync
      await new Promise(resolve => setTimeout(resolve, 2000));

      setDeviceStatuses(prev => ({
        ...prev,
        [selectedDevice]: {
          connected: true,
          syncing: false,
          lastSync: new Date(),
        },
      }));

      // Update health metrics in Redux store
      dispatch(updateMetrics({
        activity: {
          steps: Math.floor(Math.random() * 5000) + 3000,
          activeMinutes: Math.floor(Math.random() * 30) + 15,
          caloriesBurned: Math.floor(Math.random() * 300) + 100,
          timestamp: new Date().toISOString()
        },
        heartRate: {
          resting: Math.floor(Math.random() * 20) + 60,
          current: Math.floor(Math.random() * 20) + 70,
          timestamp: new Date().toISOString()
        },
        bloodPressure: {
          systolic: Math.floor(Math.random() * 40) + 100,
          diastolic: Math.floor(Math.random() * 20) + 60,
          timestamp: new Date().toISOString()
        },
        bloodSugar: {
          value: Math.floor(Math.random() * 50) + 80,
          type: 'random',
          timestamp: new Date().toISOString()
        },
        cholesterol: {
          totalCholesterol: Math.floor(Math.random() * 100) + 150,
          hdl: Math.floor(Math.random() * 40) + 40,
          ldl: Math.floor(Math.random() * 60) + 90,
          triglycerides: Math.floor(Math.random() * 100) + 100,
          timestamp: new Date().toISOString()
        },
        sleep: {
          duration: Math.floor(Math.random() * 4) + 6,
          quality: Math.floor(Math.random() * 5) + 5,
          timestamp: new Date().toISOString()
        },
        diet: [],
        timestamp: new Date().toISOString()
      }));

    } catch (error) {
      setDeviceStatuses(prev => ({
        ...prev,
        [selectedDevice]: {
          connected: false,
          syncing: false,
          error: 'Failed to connect to device',
        },
      }));
    }

    setOpenDialog(false);
    setSelectedDevice(null);
  };

  const handleSync = async (device: WearableDevice) => {
    setDeviceStatuses(prev => ({
      ...prev,
      [device]: { ...prev[device], syncing: true },
    }));

    try {
      // Simulate data sync
      await new Promise(resolve => setTimeout(resolve, 1500));

      setDeviceStatuses(prev => ({
        ...prev,
        [device]: {
          ...prev[device],
          syncing: false,
          lastSync: new Date(),
        },
      }));

      // Update health metrics in Redux store
      dispatch(updateMetrics({
        activity: {
          steps: Math.floor(Math.random() * 5000) + 3000,
          activeMinutes: Math.floor(Math.random() * 30) + 15,
          caloriesBurned: Math.floor(Math.random() * 300) + 100,
          timestamp: new Date().toISOString()
        },
        heartRate: {
          resting: Math.floor(Math.random() * 20) + 60,
          current: Math.floor(Math.random() * 20) + 70,
          timestamp: new Date().toISOString()
        },
        bloodPressure: {
          systolic: Math.floor(Math.random() * 40) + 100,
          diastolic: Math.floor(Math.random() * 20) + 60,
          timestamp: new Date().toISOString()
        },
        bloodSugar: {
          value: Math.floor(Math.random() * 50) + 80,
          type: 'random',
          timestamp: new Date().toISOString()
        },
        cholesterol: {
          totalCholesterol: Math.floor(Math.random() * 100) + 150,
          hdl: Math.floor(Math.random() * 40) + 40,
          ldl: Math.floor(Math.random() * 60) + 90,
          triglycerides: Math.floor(Math.random() * 100) + 100,
          timestamp: new Date().toISOString()
        },
        sleep: {
          duration: Math.floor(Math.random() * 4) + 6,
          quality: Math.floor(Math.random() * 5) + 5,
          timestamp: new Date().toISOString()
        },
        diet: [],
        timestamp: new Date().toISOString()
      }));

    } catch (error) {
      setDeviceStatuses(prev => ({
        ...prev,
        [device]: {
          ...prev[device],
          syncing: false,
          error: 'Failed to sync data',
        },
      }));
    }
  };

  const COLORS = [theme.palette.success.main, theme.palette.warning.main, theme.palette.error.main];

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom>
          Connected Devices
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Available Devices
              </Typography>
              <List>
                {Object.entries(deviceStatuses).map(([device, status]) => (
                  <ListItem key={device}>
                    <ListItemIcon>
                      <WatchIcon color={status.connected ? 'primary' : 'disabled'} />
                    </ListItemIcon>
                    <ListItemText
                      primary={device.replace('_', ' ')}
                      secondary={
                        status.connected
                          ? `Last synced: ${status.lastSync?.toLocaleString()}`
                          : 'Not connected'
                      }
                    />
                    {status.error && (
                      <Alert severity="error" sx={{ ml: 2 }}>
                        {status.error}
                      </Alert>
                    )}
                    {status.syncing ? (
                      <CircularProgress size={24} sx={{ ml: 2 }} />
                    ) : (
                      <Button
                        variant="contained"
                        color={status.connected ? 'secondary' : 'primary'}
                        onClick={() =>
                          status.connected
                            ? handleSync(device as WearableDevice)
                            : handleDeviceConnect(device as WearableDevice)
                        }
                        startIcon={status.connected ? <SyncIcon /> : <BluetoothIcon />}
                        sx={{ ml: 2 }}
                      >
                        {status.connected ? 'Sync' : 'Connect'}
                      </Button>
                    )}
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Recent Metrics
              </Typography>
              {healthData.profile?.metrics ? (
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <Paper elevation={2} sx={{ p: 2 }}>
                      <Typography variant="h6" gutterBottom>Activity Metrics</Typography>
                      <List>
                        <ListItem>
                          <ListItemText
                            primary="Steps"
                            secondary={healthData.profile?.metrics.activity.steps || 'No data'}
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemText
                            primary="Active Minutes"
                            secondary={`${healthData.profile?.metrics.activity.activeMinutes || 'No data'} minutes`}
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemText
                            primary="Calories Burned"
                            secondary={`${healthData.profile?.metrics.activity.caloriesBurned || 'No data'} kcal`}
                          />
                        </ListItem>
                      </List>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Paper elevation={2} sx={{ p: 2 }}>
                      <Typography variant="h6" gutterBottom>Vital Signs</Typography>
                      <List>
                        <ListItem>
                          <ListItemText
                            primary="Heart Rate"
                            secondary={`${healthData.profile?.metrics.heartRate.current || 'No data'} bpm`}
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemText
                            primary="Blood Pressure"
                            secondary={`${healthData.profile?.metrics.bloodPressure.systolic || 'No data'}/${healthData.profile?.metrics.bloodPressure.diastolic || 'No data'} mmHg`}
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemText
                            primary="Blood Sugar"
                            secondary={`${healthData.profile?.metrics.bloodSugar.value || 'No data'} mg/dL`}
                          />
                        </ListItem>
                      </List>
                    </Paper>
                  </Grid>
                </Grid>
              ) : (
                <Typography color="textSecondary">
                  Connect a device to see your health metrics
                </Typography>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Box>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Connect Device</DialogTitle>
        <DialogContent>
          <Typography>
            Please make sure your {selectedDevice?.replace('_', ' ')} device is nearby and
            Bluetooth is enabled on your device.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleConfirmConnect} variant="contained" color="primary">
            Connect
          </Button>
        </DialogActions>
      </Dialog>

      <Box sx={{ p: 3 }}>
        <Paper
          sx={{
            p: 3,
            mb: 3,
            background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
            color: 'white',
            borderRadius: 2,
          }}
        >
          <Typography variant="h4" gutterBottom fontWeight="bold">
            Health Metrics Dashboard
          </Typography>
          <Typography variant="subtitle1">
            Comprehensive view of your health data from connected devices
          </Typography>
        </Paper>

        <Grid container spacing={3}>
          {/* Heart Rate Section */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3, height: '100%' }}>
              <Typography variant="h6" gutterBottom>
                Heart Rate (24h)
              </Typography>
              <Box sx={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={mockHeartRateData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis domain={['dataMin - 10', 'dataMax + 10']} />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke={theme.palette.primary.main}
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            </Paper>
          </Grid>

          {/* Blood Pressure Section */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3, height: '100%' }}>
              <Typography variant="h6" gutterBottom>
                Blood Pressure (Weekly)
              </Typography>
              <Box sx={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={mockBloodPressureData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis domain={[60, 140]} />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="systolic"
                      stroke={theme.palette.error.main}
                      strokeWidth={2}
                      name="Systolic"
                    />
                    <Line
                      type="monotone"
                      dataKey="diastolic"
                      stroke={theme.palette.info.main}
                      strokeWidth={2}
                      name="Diastolic"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            </Paper>
          </Grid>

          {/* Sleep Analysis */}
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Sleep Analysis (Weekly)
              </Typography>
              <Box sx={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={mockSleepData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="deep"
                      stackId="1"
                      stroke={theme.palette.primary.dark}
                      fill={theme.palette.primary.dark}
                      name="Deep Sleep"
                    />
                    <Area
                      type="monotone"
                      dataKey="light"
                      stackId="1"
                      stroke={theme.palette.primary.main}
                      fill={theme.palette.primary.main}
                      name="Light Sleep"
                    />
                    <Area
                      type="monotone"
                      dataKey="rem"
                      stackId="1"
                      stroke={theme.palette.primary.light}
                      fill={theme.palette.primary.light}
                      name="REM Sleep"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </Box>
            </Paper>
          </Grid>

          {/* Stress Levels */}
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Stress Levels
              </Typography>
              <Box sx={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={mockStressData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      fill="#8884d8"
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {mockStressData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
            </Paper>
          </Grid>

          {/* Quick Stats */}
          <Grid item xs={12}>
            <Grid container spacing={2}>
              {[
                { label: 'Resting Heart Rate', value: '68 bpm', color: theme.palette.primary.main },
                { label: 'Blood Oxygen', value: '98%', color: theme.palette.info.main },
                { label: 'Sleep Score', value: '85/100', color: theme.palette.success.main },
                { label: 'Stress Level', value: 'Low', color: theme.palette.warning.main },
              ].map((stat) => (
                <Grid item xs={12} sm={6} md={3} key={stat.label}>
                  <Card>
                    <CardContent>
                      <Typography variant="subtitle2" color="textSecondary">
                        {stat.label}
                      </Typography>
                      <Typography variant="h4" sx={{ color: stat.color, my: 1 }}>
                        {stat.value}
                      </Typography>
                      <LinearProgress
                        variant="determinate"
                        value={75}
                        sx={{
                          height: 6,
                          borderRadius: 3,
                          bgcolor: `${stat.color}20`,
                          '& .MuiLinearProgress-bar': {
                            bgcolor: stat.color,
                            borderRadius: 3,
                          },
                        }}
                      />
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}; 