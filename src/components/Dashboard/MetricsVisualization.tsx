import React from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { Box, Card, CardContent, Typography, Grid, useTheme } from '@mui/material';
import { HealthMetrics } from '../../types/health';

interface ActivityData {
  steps: number;
  activeMinutes: number;
  caloriesBurned: number;
  timestamp: string;
}

interface MetricsVisualizationProps {
  metrics: HealthMetrics & {
    activity: ActivityData;
  };
  historicalData: {
    timestamp: string;
    heartRate: number;
    bloodPressure: { systolic: number; diastolic: number };
    bloodSugar: number;
    activity: ActivityData;
    sleep: number;
  }[];
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

export const MetricsVisualization: React.FC<MetricsVisualizationProps> = ({
  metrics,
  historicalData,
}) => {
  const theme = useTheme();

  const activityData = [
    { name: 'Steps', value: metrics.activity.steps },
    { name: 'Active Minutes', value: metrics.activity.activeMinutes },
    { name: 'Calories', value: metrics.activity.caloriesBurned },
  ];

  return (
    <Box sx={{ mt: 3 }}>
      <Grid container spacing={3}>
        {/* Heart Rate Trend */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Heart Rate Trend
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={historicalData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="timestamp"
                    tickFormatter={(value) => new Date(value).toLocaleDateString()}
                  />
                  <YAxis />
                  <Tooltip
                    labelFormatter={(value) => new Date(value).toLocaleString()}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="heartRate"
                    stroke={theme.palette.primary.main}
                    name="Heart Rate (bpm)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Blood Pressure */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Blood Pressure History
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={historicalData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="timestamp"
                    tickFormatter={(value) => new Date(value).toLocaleDateString()}
                  />
                  <YAxis />
                  <Tooltip
                    labelFormatter={(value) => new Date(value).toLocaleString()}
                  />
                  <Legend />
                  <Bar
                    dataKey="bloodPressure.systolic"
                    fill={theme.palette.primary.main}
                    name="Systolic"
                  />
                  <Bar
                    dataKey="bloodPressure.diastolic"
                    fill={theme.palette.secondary.main}
                    name="Diastolic"
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Activity Distribution */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Activity Distribution
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={activityData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label
                  >
                    {activityData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Sleep Pattern */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Sleep Pattern
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={historicalData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="timestamp"
                    tickFormatter={(value) => new Date(value).toLocaleDateString()}
                  />
                  <YAxis />
                  <Tooltip
                    labelFormatter={(value) => new Date(value).toLocaleString()}
                  />
                  <Legend />
                  <Bar
                    dataKey="sleep"
                    fill={theme.palette.info.main}
                    name="Sleep Duration (hours)"
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}; 