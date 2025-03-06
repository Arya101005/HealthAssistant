import React from 'react';
import { Grid, Card, CardContent, Typography, IconButton, Box } from '@mui/material';
import { HealthMetrics } from '../../types/health';
import { DietLog } from './DietTracker';
import FavoriteIcon from '@mui/icons-material/Favorite';
import BloodtypeIcon from '@mui/icons-material/Bloodtype';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import NightsStayIcon from '@mui/icons-material/NightsStay';
import BiotechIcon from '@mui/icons-material/Biotech';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

interface MetricsOverviewProps {
  metrics: HealthMetrics;
  onMetricUpdate: (metricType: keyof HealthMetrics, value: number | DietLog) => void;
}

// Mock data for trends - in real app, this would come from your API
const mockTrendData = {
  heartRate: [
    { time: '00:00', value: 72 },
    { time: '04:00', value: 68 },
    { time: '08:00', value: 75 },
    { time: '12:00', value: 80 },
    { time: '16:00', value: 78 },
    { time: '20:00', value: 73 },
  ],
  steps: [
    { time: '00:00', value: 0 },
    { time: '04:00', value: 1000 },
    { time: '08:00', value: 3000 },
    { time: '12:00', value: 5000 },
    { time: '16:00', value: 7000 },
    { time: '20:00', value: 9000 },
  ],
};

const MetricsOverview: React.FC<MetricsOverviewProps> = ({ metrics, onMetricUpdate }) => {
  const getMetricValue = (metric: keyof HealthMetrics) => {
    if (!metrics || !metrics[metric]) return 'N/A';

    switch (metric) {
      case 'heartRate':
        return metrics.heartRate?.current ?? 'N/A';
      case 'bloodPressure':
        return metrics.bloodPressure ? 
          `${metrics.bloodPressure.systolic}/${metrics.bloodPressure.diastolic}` : 
          'N/A';
      case 'bloodSugar':
        return metrics.bloodSugar?.value ?? 'N/A';
      case 'activity':
        return metrics.activity?.steps ?? 'N/A';
      case 'sleep':
        return metrics.sleep?.duration ?? 'N/A';
      case 'cholesterol':
        return metrics.cholesterol?.totalCholesterol ?? 'N/A';
      default:
        return 'N/A';
    }
  };

  const getProgressValue = (metric: keyof HealthMetrics) => {
    if (!metrics || !metrics[metric]) return 0;

    switch (metric) {
      case 'heartRate':
        return ((metrics.heartRate?.current ?? 0) / 200) * 100; // Max heart rate approx 200
      case 'activity':
        return ((metrics.activity?.steps ?? 0) / 10000) * 100; // Goal: 10000 steps
      case 'sleep':
        return ((metrics.sleep?.duration ?? 0) / 8) * 100; // Goal: 8 hours
      default:
        return 0;
    }
  };

  const metricCards = [
    {
      type: 'heartRate' as keyof HealthMetrics,
      label: 'Heart Rate',
      value: getMetricValue('heartRate'),
      unit: 'bpm',
      icon: <FavoriteIcon />,
      color: '#ff4081',
      trendData: mockTrendData.heartRate,
    },
    {
      type: 'bloodPressure' as keyof HealthMetrics,
      label: 'Blood Pressure',
      value: getMetricValue('bloodPressure'),
      unit: 'mmHg',
      icon: <BloodtypeIcon />,
      color: '#2196f3',
    },
    {
      type: 'bloodSugar' as keyof HealthMetrics,
      label: 'Blood Sugar',
      value: getMetricValue('bloodSugar'),
      unit: 'mg/dL',
      icon: <MonitorHeartIcon />,
      color: '#4caf50',
    },
    {
      type: 'activity' as keyof HealthMetrics,
      label: 'Activity',
      value: getMetricValue('activity'),
      unit: 'steps',
      icon: <DirectionsRunIcon />,
      color: '#ff9800',
      trendData: mockTrendData.steps,
    },
    {
      type: 'sleep' as keyof HealthMetrics,
      label: 'Sleep',
      value: getMetricValue('sleep'),
      unit: 'hours',
      icon: <NightsStayIcon />,
      color: '#9c27b0',
    },
    {
      type: 'cholesterol' as keyof HealthMetrics,
      label: 'Cholesterol',
      value: getMetricValue('cholesterol'),
      unit: 'mg/dL',
      icon: <BiotechIcon />,
      color: '#f44336',
    },
  ];

  return (
    <Card sx={{ p: 2 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
          Health Metrics
        </Typography>
        <Grid container spacing={3}>
          {metricCards.map((metric) => (
            <Grid item xs={12} sm={6} md={4} key={metric.type}>
              <Card 
                sx={{ 
                  height: '100%',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 4,
                  },
                }}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <IconButton 
                      sx={{ 
                        bgcolor: `${metric.color}15`,
                        color: metric.color,
                        mr: 1,
                      }}
                    >
                      {metric.icon}
                    </IconButton>
                    <Typography variant="h6" color="text.primary">
                      {metric.label}
                    </Typography>
                  </Box>

                  <Box sx={{ height: 120, mb: 2 }}>
                    {metric.trendData ? (
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={metric.trendData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="time" />
                          <YAxis />
                          <Tooltip />
                          <Line
                            type="monotone"
                            dataKey="value"
                            stroke={metric.color}
                            strokeWidth={2}
                            dot={false}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    ) : (
                      <Box sx={{ width: 100, height: 100, margin: '0 auto' }}>
                        <CircularProgressbar
                          value={getProgressValue(metric.type)}
                          text={`${metric.value}`}
                          styles={buildStyles({
                            pathColor: metric.color,
                            textColor: metric.color,
                            trailColor: `${metric.color}30`,
                          })}
                        />
                      </Box>
                    )}
                  </Box>

                  <Typography 
                    variant="body2" 
                    color="text.secondary"
                    sx={{ textAlign: 'center' }}
                  >
                    {metric.unit}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default MetricsOverview; 