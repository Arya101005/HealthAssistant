import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  ToggleButton,
  ToggleButtonGroup,
  Card,
  CardContent,
  LinearProgress,
  useTheme,
  Tabs,
  Tab,
} from '@mui/material';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import {
  DirectionsRun as RunIcon,
  LocalFireDepartment as CalorieIcon,
  Timer as DurationIcon,
  Favorite as HeartIcon,
} from '@mui/icons-material';

const dailyData = [
  { hour: '00:00', steps: 0, calories: 0, heartRate: 65 },
  { hour: '04:00', steps: 100, calories: 50, heartRate: 68 },
  { hour: '08:00', steps: 2000, calories: 200, heartRate: 75 },
  { hour: '12:00', steps: 5000, calories: 450, heartRate: 85 },
  { hour: '16:00', steps: 7500, calories: 600, heartRate: 80 },
  { hour: '20:00', steps: 9000, calories: 750, heartRate: 72 },
  { hour: '23:59', steps: 10000, calories: 800, heartRate: 70 },
];

const weeklyData = [
  { day: 'Mon', steps: 8000, calories: 400, activeMinutes: 45, distance: 5.2 },
  { day: 'Tue', steps: 10000, calories: 500, activeMinutes: 60, distance: 6.5 },
  { day: 'Wed', steps: 7500, calories: 380, activeMinutes: 40, distance: 4.8 },
  { day: 'Thu', steps: 9000, calories: 450, activeMinutes: 55, distance: 5.8 },
  { day: 'Fri', steps: 11000, calories: 550, activeMinutes: 65, distance: 7.1 },
  { day: 'Sat', steps: 6000, calories: 300, activeMinutes: 35, distance: 3.9 },
  { day: 'Sun', steps: 8500, calories: 420, activeMinutes: 50, distance: 5.5 },
];

const monthlyData = [
  { week: 'Week 1', steps: 52000, calories: 2600, activeMinutes: 310, distance: 33.8 },
  { week: 'Week 2', steps: 58000, calories: 2900, activeMinutes: 350, distance: 37.7 },
  { week: 'Week 3', steps: 45000, calories: 2250, activeMinutes: 270, distance: 29.3 },
  { week: 'Week 4', steps: 61000, calories: 3050, activeMinutes: 370, distance: 39.7 },
];

const activityDistribution = [
  { name: 'Walking', value: 45 },
  { name: 'Running', value: 20 },
  { name: 'Cycling', value: 25 },
  { name: 'Other', value: 10 },
];

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`activity-tabpanel-${index}`}
      aria-labelledby={`activity-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
};

export const ActivityPage: React.FC = () => {
  const theme = useTheme();
  const [timeRange, setTimeRange] = useState('daily');
  const [tabValue, setTabValue] = useState(0);

  const handleTimeRangeChange = (event: React.MouseEvent<HTMLElement>, newTimeRange: string) => {
    if (newTimeRange !== null) {
      setTimeRange(newTimeRange);
    }
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const COLORS = [
    theme.palette.primary.main,
    theme.palette.secondary.main,
    theme.palette.success.main,
    theme.palette.warning.main,
  ];

  return (
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
          Activity Tracker
        </Typography>
        <Typography variant="subtitle1">
          Monitor your daily activities and fitness progress
        </Typography>
      </Paper>

      {/* Quick Stats */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {[
          { icon: <RunIcon />, label: 'Total Steps', value: '10,000', target: '12,000' },
          { icon: <CalorieIcon />, label: 'Calories Burned', value: '800', target: '1,000' },
          { icon: <DurationIcon />, label: 'Active Minutes', value: '65', target: '90' },
          { icon: <HeartIcon />, label: 'Avg Heart Rate', value: '75', target: '80' },
        ].map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Box sx={{
                    p: 1,
                    borderRadius: 1,
                    bgcolor: `${theme.palette.primary.main}15`,
                    color: theme.palette.primary.main,
                    mr: 2
                  }}>
                    {stat.icon}
                  </Box>
                  <Typography variant="subtitle2" color="textSecondary">
                    {stat.label}
                  </Typography>
                </Box>
                <Typography variant="h4" sx={{ mb: 1 }}>
                  {stat.value}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Typography variant="caption" color="textSecondary">
                    Target: {stat.target}
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={(parseInt(stat.value.replace(',', '')) / parseInt(stat.target.replace(',', ''))) * 100}
                  sx={{
                    height: 6,
                    borderRadius: 3,
                    bgcolor: `${theme.palette.primary.main}20`,
                    '& .MuiLinearProgress-bar': {
                      bgcolor: theme.palette.primary.main,
                      borderRadius: 3,
                    },
                  }}
                />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Time Range Toggle */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <ToggleButtonGroup
          value={timeRange}
          exclusive
          onChange={handleTimeRangeChange}
          aria-label="time range"
        >
          <ToggleButton value="daily">Daily</ToggleButton>
          <ToggleButton value="weekly">Weekly</ToggleButton>
          <ToggleButton value="monthly">Monthly</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {/* Activity Charts */}
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Tabs value={tabValue} onChange={handleTabChange} aria-label="activity tabs">
              <Tab label="Steps" />
              <Tab label="Calories" />
              <Tab label="Active Minutes" />
              <Tab label="Distance" />
            </Tabs>

            <TabPanel value={tabValue} index={0}>
              <Box sx={{ height: 400 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={timeRange === 'daily' ? dailyData : timeRange === 'weekly' ? weeklyData : monthlyData}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey={timeRange === 'daily' ? 'hour' : timeRange === 'weekly' ? 'day' : 'week'} />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="steps" fill={theme.palette.primary.main} />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </TabPanel>

            <TabPanel value={tabValue} index={1}>
              <Box sx={{ height: 400 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={timeRange === 'daily' ? dailyData : timeRange === 'weekly' ? weeklyData : monthlyData}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey={timeRange === 'daily' ? 'hour' : timeRange === 'weekly' ? 'day' : 'week'} />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="calories" stroke={theme.palette.secondary.main} />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            </TabPanel>

            <TabPanel value={tabValue} index={2}>
              <Box sx={{ height: 400 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={timeRange === 'weekly' ? weeklyData : monthlyData}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey={timeRange === 'weekly' ? 'day' : 'week'} />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="activeMinutes" fill={theme.palette.success.main} />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </TabPanel>

            <TabPanel value={tabValue} index={3}>
              <Box sx={{ height: 400 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={timeRange === 'weekly' ? weeklyData : monthlyData}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey={timeRange === 'weekly' ? 'day' : 'week'} />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="distance" stroke={theme.palette.warning.main} />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            </TabPanel>
          </Paper>
        </Grid>

        {/* Activity Distribution */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Activity Distribution
            </Typography>
            <Box sx={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={activityDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {activityDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>

        {/* Activity Trends */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Heart Rate Trends
            </Typography>
            <Box sx={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dailyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="hour" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="heartRate"
                    stroke={theme.palette.error.main}
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}; 