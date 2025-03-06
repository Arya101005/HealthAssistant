import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  Chip,
  LinearProgress,
} from '@mui/material';
import {
  CheckCircle as CheckCircleIcon,
  RadioButtonUnchecked as UncheckedIcon,
  EmojiEvents as TrophyIcon,
  Star as StarIcon,
  LocalHospital as MedicalIcon,
  DirectionsRun as ExerciseIcon,
  Restaurant as DietIcon,
  Spa as LifestyleIcon,
} from '@mui/icons-material';

interface Task {
  id: string;
  title: string;
  description: string;
  points: number;
  difficulty: string;
  category: string;
  completed: boolean;
}

interface HealthRecommendation {
  type: string;
  priority: string;
  title: string;
  description: string;
  impact: string;
  tasks: Task[];
  potential_points: number;
}

interface Props {
  score: number;
  recommendations: HealthRecommendation[];
  totalPoints: number;
  earnedPoints: number;
  onTaskComplete: (taskId: string) => void;
}

const getCategoryIcon = (category: string) => {
  switch (category.toLowerCase()) {
    case 'medical':
      return <MedicalIcon />;
    case 'exercise':
      return <ExerciseIcon />;
    case 'diet':
      return <DietIcon />;
    case 'lifestyle':
      return <LifestyleIcon />;
    default:
      return <StarIcon />;
  }
};

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty.toLowerCase()) {
    case 'easy':
      return 'success';
    case 'medium':
      return 'warning';
    case 'hard':
      return 'error';
    default:
      return 'default';
  }
};

export const HealthScoreCard: React.FC<Props> = ({
  score,
  recommendations,
  totalPoints,
  earnedPoints,
  onTaskComplete,
}) => {
  const progress = (earnedPoints / totalPoints) * 100;

  return (
    <Card>
      <CardContent>
        <Box sx={{ textAlign: 'center', mb: 2 }}>
          <Typography variant="h5" gutterBottom>
            Health Score
          </Typography>
          <Box sx={{ position: 'relative', display: 'inline-flex' }}>
            <CircularProgress
              variant="determinate"
              value={score}
              size={120}
              thickness={4}
              sx={{
                color: (theme) =>
                  score > 70
                    ? theme.palette.success.main
                    : score > 40
                    ? theme.palette.warning.main
                    : theme.palette.error.main,
              }}
            />
            <Box
              sx={{
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                position: 'absolute',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography variant="h4" component="div">
                {score}
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <TrophyIcon color="primary" />
            Points Progress
          </Typography>
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{ height: 10, borderRadius: 5, mb: 1 }}
          />
          <Typography variant="body2" color="textSecondary">
            {earnedPoints} / {totalPoints} points earned
          </Typography>
        </Box>

        <Typography variant="h6" gutterBottom>
          Daily Health Tasks
        </Typography>
        <List>
          {recommendations.map((rec) =>
            rec.tasks.map((task) => (
              <ListItem
                key={task.id}
                secondaryAction={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Chip
                      label={`${task.points} pts`}
                      size="small"
                      color="primary"
                      variant="outlined"
                    />
                    <Chip
                      label={task.difficulty}
                      size="small"
                      color={getDifficultyColor(task.difficulty) as any}
                    />
                    <IconButton
                      edge="end"
                      onClick={() => onTaskComplete(task.id)}
                      disabled={task.completed}
                    >
                      {task.completed ? (
                        <CheckCircleIcon color="success" />
                      ) : (
                        <UncheckedIcon />
                      )}
                    </IconButton>
                  </Box>
                }
              >
                <ListItemIcon>{getCategoryIcon(task.category)}</ListItemIcon>
                <ListItemText
                  primary={task.title}
                  secondary={task.description}
                  primaryTypographyProps={{
                    style: { textDecoration: task.completed ? 'line-through' : 'none' },
                  }}
                />
              </ListItem>
            ))
          )}
        </List>
      </CardContent>
    </Card>
  );
}; 