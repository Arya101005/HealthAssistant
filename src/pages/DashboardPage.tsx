import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Grid,
  Container,
  Typography,
  useTheme,
  Paper,
  Box,
  Card,
  CardContent,
  Button,
  Divider,
  Stack,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  Favorite as HeartIcon,
  DeviceHub as DeviceIcon,
  DirectionsRun as ActivityIcon,
  Restaurant as RestaurantIcon,
  Analytics as AnalyticsIcon,
  Timer as TimerIcon,
  Security as SecurityIcon,
  MonitorHeart as MonitorHeartIcon,
  FitnessCenter as FitnessCenterIcon,
  Medication as MedicationIcon,
  LocalHospital as LocalHospitalIcon,
  Timeline as TimelineIcon,
  Chat as ChatIcon,
} from '@mui/icons-material';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { RootState } from '../store';
import { fetchHealthData } from '../store/healthSlice';
import { AppDispatch } from '../store';

const healthData = [
  { time: '00:00', heartRate: 72, bloodPressure: 120, glucose: 95 },
  { time: '04:00', heartRate: 68, bloodPressure: 118, glucose: 92 },
  { time: '08:00', heartRate: 75, bloodPressure: 122, glucose: 98 },
  { time: '12:00', heartRate: 82, bloodPressure: 125, glucose: 105 },
  { time: '16:00', heartRate: 79, bloodPressure: 121, glucose: 99 },
  { time: '20:00', heartRate: 74, bloodPressure: 119, glucose: 97 },
];

const activityData = [
  { day: 'Mon', steps: 8000, calories: 400 },
  { day: 'Tue', steps: 10000, calories: 500 },
  { day: 'Wed', steps: 7500, calories: 380 },
  { day: 'Thu', steps: 9000, calories: 450 },
  { day: 'Fri', steps: 11000, calories: 550 },
];

export const DashboardPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const theme = useTheme();
  const healthProfile = useSelector((state: RootState) => state.health.profile);
  const featuresRef = useRef<HTMLDivElement>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  useEffect(() => {
    dispatch(fetchHealthData());
  }, [dispatch]);

  const scrollToFeatures = () => {
    featuresRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Hero Section */}
      <Box
        sx={{
          position: 'relative',
          mb: 6,
          borderRadius: 4,
          overflow: 'hidden',
          minHeight: '300px',
          background: theme.palette.background.paper,
          display: 'flex',
          alignItems: 'center',
          boxShadow: 1,
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Box sx={{ p: 4 }}>
                <Typography variant="h3" gutterBottom fontWeight="bold" sx={{ mb: 3 }}>
                  Welcome Back!
                </Typography>
                <Typography variant="h6" sx={{ mb: 3, color: theme.palette.text.secondary }}>
                  Track your health journey and achieve your wellness goals
                </Typography>
                <Typography variant="body1" sx={{ mb: 4, lineHeight: 1.8, color: theme.palette.text.secondary }}>
                  Experience comprehensive health management with real-time monitoring, personalized insights, and intelligent recommendations.
                </Typography>
                <Button
                  variant="outlined"
                  size="large"
                  color="primary"
                  onClick={scrollToFeatures}
                >
                  Learn More
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Grid container spacing={2}>
                {[
                  {
                    icon: <AnalyticsIcon sx={{ fontSize: 40 }} />,
                    title: 'Smart Analytics',
                    description: 'Track and analyze your health data for better insights',
                  },
                  {
                    icon: <TimerIcon sx={{ fontSize: 40 }} />,
                    title: 'Real-time Monitoring',
                    description: 'Track your vital signs and health metrics in real-time',
                  },
                  {
                    icon: <SecurityIcon sx={{ fontSize: 40 }} />,
                    title: 'Secure & Private',
                    description: 'Your health data is protected with enterprise-grade security',
                  },
                ].map((feature, index) => (
                  <Grid item xs={12} key={index}>
                    <Paper sx={{ p: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ mr: 2, color: theme.palette.primary.main }}>{feature.icon}</Box>
                        <Box>
                          <Typography variant="h6" gutterBottom>
                            {feature.title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {feature.description}
                          </Typography>
                        </Box>
                      </Box>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Quick Stats */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {[
          { icon: <HeartIcon />, title: 'Heart Rate', value: '75 bpm', color: theme.palette.error.main },
          { icon: <ActivityIcon />, title: 'Daily Steps', value: '8,547', color: theme.palette.success.main },
          { icon: <DeviceIcon />, title: 'Connected Devices', value: '2', color: theme.palette.info.main },
          { icon: <AnalyticsIcon />, title: 'Health Score', value: '85%', color: theme.palette.warning.main },
        ].map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Box
                    sx={{
                      p: 1,
                      borderRadius: 1,
                      bgcolor: `${stat.color}15`,
                      color: stat.color,
                      mr: 2,
                    }}
                  >
                    {stat.icon}
                  </Box>
                  <Typography variant="h6">{stat.title}</Typography>
                </Box>
                <Typography variant="h4" sx={{ color: stat.color }}>
                  {stat.value}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Health Monitoring */}
      <Grid container spacing={3}>
        {/* Live Health Data */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              Live Health Monitoring
            </Typography>
            <Box sx={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={healthData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="heartRate"
                    stroke={theme.palette.error.main}
                    name="Heart Rate"
                  />
                  <Line
                    type="monotone"
                    dataKey="bloodPressure"
                    stroke={theme.palette.primary.main}
                    name="Blood Pressure"
                  />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>

        {/* Activity Overview */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h5" gutterBottom>
              Activity Overview
            </Typography>
            <Box sx={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={activityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="steps"
                    stroke={theme.palette.success.main}
                    fill={theme.palette.success.light}
                    name="Steps"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>

        {/* Features Section */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              Available Features
            </Typography>
            <Grid container spacing={3}>
              {[
                {
                  icon: <HeartIcon />,
                  title: 'Health Monitoring',
                  description: 'Track vital signs and health metrics in real-time',
                },
                {
                  icon: <DeviceIcon />,
                  title: 'Device Integration',
                  description: 'Connect and manage your health monitoring devices',
                },
                {
                  icon: <ActivityIcon />,
                  title: 'Activity Tracking',
                  description: 'Monitor daily, weekly, and monthly activity levels',
                },
                {
                  icon: <AnalyticsIcon />,
                  title: 'Health Analytics',
                  description: 'View detailed health reports and trends',
                },
              ].map((feature, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <Card sx={{ height: '100%' }}>
                    <CardContent>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          mb: 2,
                          color: theme.palette.primary.main,
                        }}
                      >
                        {feature.icon}
                        <Typography variant="h6" sx={{ ml: 1 }}>
                          {feature.title}
                        </Typography>
                      </Box>
                      <Typography variant="body2" color="text.secondary">
                        {feature.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>

        {/* About Section */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              About AI HealthGuard
            </Typography>
            <Typography paragraph>
              AI HealthGuard is your comprehensive health companion, designed to help you maintain a healthy lifestyle through smart tracking and personalized recommendations. Our platform combines advanced AI technology with user-friendly features to provide you with the best health monitoring experience.
            </Typography>
            <Stack direction="row" spacing={2}>
              <Button variant="contained" color="primary" startIcon={<ChatIcon />}>
                Contact Support
              </Button>
              <Button variant="outlined" color="primary">
                Learn More
              </Button>
            </Stack>
          </Paper>
        </Grid>
      </Grid>

      {/* Detailed Features Section */}
      <div ref={featuresRef}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Typography variant="h4" gutterBottom sx={{ mb: 4, textAlign: 'center' }}>
              Our Comprehensive Features
            </Typography>
          </Grid>
          
          {/* Health Monitoring */}
          <Grid item xs={12}>
            <Paper sx={{ p: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <MonitorHeartIcon sx={{ fontSize: 40, color: theme.palette.primary.main, mr: 2 }} />
                <Typography variant="h5">Health Monitoring</Typography>
              </Box>
              <Typography variant="body1" paragraph>
                Our advanced health monitoring system provides real-time tracking of vital signs including heart rate, blood pressure, and blood glucose levels. The system continuously analyzes your health data to provide early warnings and personalized insights.
              </Typography>
            </Paper>
          </Grid>

          {/* Fitness Tracking */}
          <Grid item xs={12}>
            <Paper sx={{ p: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <FitnessCenterIcon sx={{ fontSize: 40, color: theme.palette.primary.main, mr: 2 }} />
                <Typography variant="h5">Fitness Tracking</Typography>
              </Box>
              <Typography variant="body1" paragraph>
                Keep track of your daily activities, workouts, and fitness goals with our comprehensive activity tracking features. Monitor steps, calories burned, and active minutes while receiving personalized workout recommendations.
              </Typography>
            </Paper>
          </Grid>

          {/* Nutrition Planning */}
          <Grid item xs={12}>
            <Paper sx={{ p: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <RestaurantIcon sx={{ fontSize: 40, color: theme.palette.primary.main, mr: 2 }} />
                <Typography variant="h5">Nutrition Planning</Typography>
              </Box>
              <Typography variant="body1" paragraph>
                Get personalized diet recommendations and meal plans based on your health goals and preferences. Track your nutritional intake and receive guidance on maintaining a balanced diet.
              </Typography>
            </Paper>
          </Grid>

          {/* Medical Management */}
          <Grid item xs={12}>
            <Paper sx={{ p: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <MedicationIcon sx={{ fontSize: 40, color: theme.palette.primary.main, mr: 2 }} />
                <Typography variant="h5">Medical Management</Typography>
              </Box>
              <Typography variant="body1" paragraph>
                Never miss your medications with our smart reminder system. Keep track of your prescriptions, dosages, and medical appointments all in one place. Receive timely notifications and maintain a complete medical history.
              </Typography>
            </Paper>
          </Grid>

          {/* Doctor Appointments */}
          <Grid item xs={12}>
            <Paper sx={{ p: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <LocalHospitalIcon sx={{ fontSize: 40, color: theme.palette.primary.main, mr: 2 }} />
                <Typography variant="h5">Doctor Appointments</Typography>
              </Box>
              <Typography variant="body1" paragraph>
                Easily schedule and manage your doctor appointments. Find healthcare providers based on specialty, location, and availability. Share your health data securely with your healthcare team for better care coordination.
              </Typography>
            </Paper>
          </Grid>

          {/* Health Analytics */}
          <Grid item xs={12}>
            <Paper sx={{ p: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <TimelineIcon sx={{ fontSize: 40, color: theme.palette.primary.main, mr: 2 }} />
                <Typography variant="h5">Health Analytics</Typography>
              </Box>
              <Typography variant="body1" paragraph>
                Gain deep insights into your health trends with our advanced analytics. View detailed reports and visualizations of your health metrics over time. Receive predictive insights and recommendations for improving your overall wellness.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </Box>
  );
};

export default DashboardPage; 