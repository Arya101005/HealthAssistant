import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Button,
  LinearProgress,
  Chip,
  Avatar,
  Stack,
  IconButton,
  useTheme,
  Badge,
} from '@mui/material';
import {
  CheckCircle as CheckIcon,
  Star as StarIcon,
  EmojiEvents as TrophyIcon,
  LocalHospital as HealthIcon,
  DirectionsRun as RunIcon,
  Restaurant as FoodIcon,
  Opacity as WaterIcon,
  Bedtime as SleepIcon,
  FitnessCenter as ExerciseIcon,
  Medication as MedicationIcon,
  LocalHospital,
} from '@mui/icons-material';

interface Task {
  id: string;
  title: string;
  description: string;
  points: number;
  category: 'exercise' | 'nutrition' | 'wellness' | 'medical';
  completed: boolean;
  icon: React.ReactNode;
  streak: number;
}

const initialTasks: Task[] = [
  {
    id: '1',
    title: 'Morning Exercise',
    description: 'Complete 30 minutes of cardio exercise',
    points: 100,
    category: 'exercise',
    completed: false,
    icon: <ExerciseIcon />,
    streak: 3,
  },
  {
    id: '2',
    title: 'Healthy Breakfast',
    description: 'Eat a balanced breakfast with protein and fruits',
    points: 50,
    category: 'nutrition',
    completed: false,
    icon: <FoodIcon />,
    streak: 5,
  },
  {
    id: '3',
    title: 'Water Intake',
    description: 'Drink 8 glasses of water throughout the day',
    points: 75,
    category: 'wellness',
    completed: false,
    icon: <WaterIcon />,
    streak: 7,
  },
  {
    id: '4',
    title: 'Take Medications',
    description: 'Take prescribed medications on time',
    points: 50,
    category: 'medical',
    completed: false,
    icon: <MedicationIcon />,
    streak: 10,
  },
  {
    id: '5',
    title: 'Steps Goal',
    description: 'Complete 10,000 steps',
    points: 100,
    category: 'exercise',
    completed: false,
    icon: <RunIcon />,
    streak: 2,
  },
  {
    id: '6',
    title: 'Sleep Schedule',
    description: 'Get 7-8 hours of sleep',
    points: 75,
    category: 'wellness',
    completed: false,
    icon: <SleepIcon />,
    streak: 4,
  },
];

export const DailyTasksPage: React.FC = () => {
  const theme = useTheme();
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [totalPoints, setTotalPoints] = useState(0);
  const [level, setLevel] = useState(1);

  const handleCompleteTask = (taskId: string) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        const updatedTask = { ...task, completed: true };
        setTotalPoints(prev => prev + task.points);
        // Level up every 500 points
        setLevel(Math.floor((totalPoints + task.points) / 500) + 1);
        return updatedTask;
      }
      return task;
    }));
  };

  const getProgressToNextLevel = () => {
    const pointsInCurrentLevel = totalPoints % 500;
    return (pointsInCurrentLevel / 500) * 100;
  };

  const getCategoryColor = (category: Task['category']) => {
    switch (category) {
      case 'exercise':
        return theme.palette.success.main;
      case 'nutrition':
        return theme.palette.warning.main;
      case 'wellness':
        return theme.palette.info.main;
      case 'medical':
        return theme.palette.error.main;
      default:
        return theme.palette.primary.main;
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Paper
        sx={{
          p: 3,
          mb: 4,
          background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
          color: 'white',
          borderRadius: 2,
        }}
      >
        <Grid container alignItems="center" spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" gutterBottom fontWeight="bold">
              Daily Health Quests
            </Typography>
            <Typography variant="subtitle1">
              Complete tasks, earn points, and level up your health journey!
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ textAlign: 'right' }}>
              <Badge
                overlap="circular"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                badgeContent={
                  <Avatar sx={{ width: 22, height: 22, bgcolor: theme.palette.secondary.main }}>
                    <StarIcon sx={{ fontSize: 16 }} />
                  </Avatar>
                }
              >
                <Avatar
                  sx={{
                    width: 80,
                    height: 80,
                    bgcolor: theme.palette.primary.light,
                    border: `4px solid ${theme.palette.primary.main}`,
                  }}
                >
                  <Typography variant="h4">
                    {level}
                  </Typography>
                </Avatar>
              </Badge>
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  Progress to Level {level + 1}
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={getProgressToNextLevel()}
                  sx={{
                    height: 8,
                    borderRadius: 5,
                    bgcolor: 'rgba(255, 255, 255, 0.2)',
                    '& .MuiLinearProgress-bar': {
                      bgcolor: 'white',
                    },
                  }}
                />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Stats Overview */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        {[
          { icon: <TrophyIcon />, label: 'Total Points', value: totalPoints },
          { icon: <StarIcon />, label: 'Current Level', value: level },
          { icon: <CheckIcon />, label: 'Tasks Completed', value: tasks.filter(t => t.completed).length },
          { icon: <HealthIcon />, label: 'Health Streak', value: '7 Days' },
        ].map((stat, index) => (
          <Grid item xs={6} md={3} key={index}>
            <Paper sx={{ p: 2, textAlign: 'center' }}>
              <IconButton
                sx={{
                  bgcolor: `${theme.palette.primary.main}15`,
                  color: theme.palette.primary.main,
                  mb: 1,
                }}
              >
                {stat.icon}
              </IconButton>
              <Typography variant="h5" sx={{ mb: 0.5 }}>
                {stat.value}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {stat.label}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Tasks Grid */}
      <Grid container spacing={3}>
        {tasks.map((task) => (
          <Grid item xs={12} sm={6} md={4} key={task.id}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar
                    sx={{
                      bgcolor: `${getCategoryColor(task.category)}15`,
                      color: getCategoryColor(task.category),
                      mr: 2,
                    }}
                  >
                    {task.icon}
                  </Avatar>
                  <Box>
                    <Typography variant="h6">{task.title}</Typography>
                    <Chip
                      size="small"
                      label={task.category}
                      sx={{
                        bgcolor: `${getCategoryColor(task.category)}15`,
                        color: getCategoryColor(task.category),
                      }}
                    />
                  </Box>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {task.description}
                </Typography>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Chip
                    icon={<StarIcon />}
                    label={`${task.points} pts`}
                    size="small"
                    color="primary"
                  />
                  <Chip
                    icon={<LocalHospital />}
                    label={`${task.streak} day streak`}
                    size="small"
                    variant="outlined"
                  />
                </Stack>
                <Button
                  fullWidth
                  variant={task.completed ? "outlined" : "contained"}
                  color={task.completed ? "success" : "primary"}
                  onClick={() => handleCompleteTask(task.id)}
                  disabled={task.completed}
                  sx={{ mt: 2 }}
                  startIcon={task.completed ? <CheckIcon /> : null}
                >
                  {task.completed ? 'Completed' : 'Complete Task'}
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default DailyTasksPage; 