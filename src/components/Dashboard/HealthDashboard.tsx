import React from 'react';
import { Grid, Box, Paper, Typography, useTheme, Button, Stack } from '@mui/material';
import { UserHealthProfile, HealthMetrics } from '../../types/health';
import { HealthScoreCard } from './HealthScoreCard';
import MetricsOverview from './MetricsOverview';
import RecommendationsList from './RecommendationsList';
import DietTracker, { DietLog } from './DietTracker';
import ChatIcon from '@mui/icons-material/Chat';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import { useNavigate } from 'react-router-dom';

interface HealthDashboardProps {
  profile: UserHealthProfile;
  onMetricUpdate: (metricType: keyof HealthMetrics, value: number | DietLog) => void;
}

const HealthDashboard: React.FC<HealthDashboardProps> = ({ profile, onMetricUpdate }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={3}>
        {/* Health Score Section */}
        <Grid item xs={12}>
          <Paper 
            sx={{ 
              p: 3,
              background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
              color: 'white',
              borderRadius: 2,
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 2 }}>
              <Box>
                <Typography variant="h4" gutterBottom fontWeight="bold">
                  Health Dashboard
                </Typography>
                <Typography variant="subtitle1">
                  Track your health metrics and stay on top of your wellness goals
                </Typography>
              </Box>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <Button
                  variant="contained"
                  startIcon={<ChatIcon />}
                  onClick={() => navigate('/chatbot')}
                  sx={{
                    bgcolor: 'rgba(255, 255, 255, 0.2)',
                    backdropFilter: 'blur(10px)',
                    '&:hover': {
                      bgcolor: 'rgba(255, 255, 255, 0.3)',
                    },
                  }}
                >
                  Health Assistant
                </Button>
                <Button
                  variant="contained"
                  startIcon={<MedicalServicesIcon />}
                  onClick={() => navigate('/appointments')}
                  sx={{
                    bgcolor: 'rgba(255, 255, 255, 0.2)',
                    backdropFilter: 'blur(10px)',
                    '&:hover': {
                      bgcolor: 'rgba(255, 255, 255, 0.3)',
                    },
                  }}
                >
                  Book Appointment
                </Button>
              </Stack>
            </Box>
          </Paper>
        </Grid>

        {/* Health Score Card */}
        <Grid item xs={12} lg={4}>
          <Paper 
            sx={{ 
              height: '100%',
              p: 3,
              background: theme.palette.background.paper,
              borderRadius: 2,
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: 4,
              },
            }}
          >
            <HealthScoreCard 
              score={profile.riskScores.overall}
              recommendations={profile.recommendations}
              totalPoints={100}
              earnedPoints={0}
              onTaskComplete={(taskId) => {
                console.log('Task completed:', taskId);
              }}
            />
          </Paper>
        </Grid>

        {/* Recommendations */}
        <Grid item xs={12} lg={8}>
          <Paper 
            sx={{ 
              height: '100%',
              p: 3,
              background: theme.palette.background.paper,
              borderRadius: 2,
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: 4,
              },
            }}
          >
            <RecommendationsList recommendations={profile.recommendations} />
          </Paper>
        </Grid>

        {/* Metrics Overview */}
        <Grid item xs={12}>
          <MetricsOverview metrics={profile.metrics} onMetricUpdate={onMetricUpdate} />
        </Grid>

        {/* Diet Tracker */}
        <Grid item xs={12}>
          <Paper 
            sx={{ 
              p: 3,
              background: theme.palette.background.paper,
              borderRadius: 2,
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: 4,
              },
            }}
          >
            <DietTracker 
              dietLogs={profile.dietLogs} 
              onLogMeal={(mealData: DietLog) => onMetricUpdate('diet' as keyof HealthMetrics, mealData)} 
            />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HealthDashboard; 