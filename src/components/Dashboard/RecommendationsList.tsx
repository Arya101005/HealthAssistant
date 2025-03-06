import React, { useState } from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  Paper,
  IconButton,
  Collapse,
  useTheme,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { styled } from '@mui/material/styles';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import SpaOutlinedIcon from '@mui/icons-material/SpaOutlined';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { HealthRecommendation } from '../../types/health';

interface RecommendationsListProps {
  recommendations: HealthRecommendation[];
}

const StyledCard = styled(Paper)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  borderRadius: theme.spacing(2),
  background: theme.palette.background.paper,
  transition: 'all 0.3s ease-in-out',
  overflow: 'hidden',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[4],
  },
}));

const PriorityChip = styled(Chip)<{ priority: 'high' | 'medium' | 'low' }>(({ theme, priority }) => {
  const colors = {
    high: theme.palette.error.main,
    medium: theme.palette.warning.main,
    low: theme.palette.success.main,
  };
  return {
    backgroundColor: `${colors[priority]}15`,
    color: colors[priority],
    fontWeight: 600,
    '& .MuiChip-label': {
      padding: '0 12px',
    },
  };
});

const getRecommendationIcon = (type: string) => {
  switch (type.toLowerCase()) {
    case 'exercise':
      return <FitnessCenterIcon />;
    case 'diet':
      return <RestaurantIcon />;
    default:
      return <SpaOutlinedIcon />;
  }
};

const RecommendationsList: React.FC<RecommendationsListProps> = ({ recommendations }) => {
  const theme = useTheme();
  const [expandedItems, setExpandedItems] = useState<{ [key: string]: boolean }>({});

  const toggleExpand = (title: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  const getIconColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'exercise':
        return theme.palette.success.main;
      case 'diet':
        return theme.palette.warning.main;
      default:
        return theme.palette.primary.main;
    }
  };

  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
        Personalized Recommendations
      </Typography>

      <List sx={{ '& > *:last-child': { mb: 0 } }}>
        <AnimatePresence>
          {recommendations.map((recommendation, index) => (
            <motion.div
              key={recommendation.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <StyledCard>
                <ListItem
                  sx={{
                    flexDirection: 'column',
                    alignItems: 'stretch',
                    p: 0,
                  }}
                >
                  {/* Header */}
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      p: 2,
                      cursor: 'pointer',
                      '&:hover': { bgcolor: 'action.hover' },
                    }}
                    onClick={() => toggleExpand(recommendation.title)}
                  >
                    <ListItemIcon sx={{ color: getIconColor(recommendation.type) }}>
                      {getRecommendationIcon(recommendation.type)}
                    </ListItemIcon>
                    <Box sx={{ flex: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600, mr: 2 }}>
                          {recommendation.title}
                        </Typography>
                        <PriorityChip
                          priority={recommendation.priority}
                          label={recommendation.priority.toUpperCase()}
                          size="small"
                        />
                      </Box>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          display: '-webkit-box',
                          WebkitLineClamp: expandedItems[recommendation.title] ? 'unset' : 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                        }}
                      >
                        {recommendation.description}
                      </Typography>
                    </Box>
                    <IconButton edge="end" onClick={() => toggleExpand(recommendation.title)}>
                      {expandedItems[recommendation.title] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    </IconButton>
                  </Box>

                  {/* Expanded Content */}
                  <Collapse in={expandedItems[recommendation.title]}>
                    <Box sx={{ px: 2, pb: 2 }}>
                      <Box
                        sx={{
                          p: 2,
                          borderRadius: 1,
                          bgcolor: `${getIconColor(recommendation.type)}08`,
                          mb: 2,
                        }}
                      >
                        <Typography
                          variant="body2"
                          sx={{
                            color: getIconColor(recommendation.type),
                            fontWeight: 500,
                          }}
                        >
                          Impact: {recommendation.impact}
                        </Typography>
                      </Box>

                      <Typography variant="subtitle2" sx={{ mb: 1, color: 'text.secondary' }}>
                        Tasks:
                      </Typography>
                      {recommendation.tasks.map((task, itemIndex) => (
                        <motion.div
                          key={task.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 + itemIndex * 0.1 }}
                        >
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                            <ArrowRightIcon
                              sx={{
                                color: getIconColor(recommendation.type),
                                fontSize: 20,
                                mr: 1,
                              }}
                            />
                            <Box sx={{ flex: 1 }}>
                              <Typography variant="body2" color="text.primary">
                                {task.title}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                {task.description}
                              </Typography>
                              <Box sx={{ mt: 0.5 }}>
                                <Chip
                                  size="small"
                                  label={`${task.points} points`}
                                  color="primary"
                                  variant="outlined"
                                  sx={{ mr: 1 }}
                                />
                                <Chip
                                  size="small"
                                  label={task.difficulty}
                                  color={
                                    task.difficulty === 'easy'
                                      ? 'success'
                                      : task.difficulty === 'medium'
                                      ? 'warning'
                                      : 'error'
                                  }
                                  variant="outlined"
                                />
                              </Box>
                            </Box>
                          </Box>
                        </motion.div>
                      ))}
                    </Box>
                  </Collapse>
                </ListItem>
              </StyledCard>
            </motion.div>
          ))}
        </AnimatePresence>
      </List>
    </Box>
  );
};

export default RecommendationsList; 