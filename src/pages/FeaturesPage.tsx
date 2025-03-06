import React, { useState } from 'react';
import { Box, Container, Grid, Typography, Card, IconButton, Tooltip } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { styled } from '@mui/material/styles';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import TimelineIcon from '@mui/icons-material/Timeline';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { GlassmorphicCard } from '../components/styled/AdvancedUIEffects';

const FeatureCard = styled(GlassmorphicCard)(({ theme }) => ({
  cursor: 'pointer',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-10px)',
  },
}));

const features = [
  {
    icon: <MonitorHeartIcon sx={{ fontSize: 48, color: '#f44336' }} />,
    title: 'Health Monitoring',
    shortDescription: 'Track vital health metrics in real-time',
    longDescription: 'Our advanced health monitoring system provides real-time tracking of vital metrics including heart rate, blood pressure, and sleep patterns. Get detailed insights and trends over time.',
    benefits: [
      'Real-time vital monitoring',
      'Historical data analysis',
      'Personalized health insights',
      'Alert system for abnormal readings'
    ]
  },
  {
    icon: <FitnessCenterIcon sx={{ fontSize: 48, color: '#4caf50' }} />,
    title: 'Workout Planning',
    shortDescription: 'Personalized workout routines',
    longDescription: 'Get access to customized workout plans based on your fitness level, goals, and preferences. Our AI-powered system adapts as you progress.',
    benefits: [
      'AI-generated workout plans',
      'Progress tracking',
      'Form guidance',
      'Recovery monitoring'
    ]
  },
  {
    icon: <RestaurantIcon sx={{ fontSize: 48, color: '#ff9800' }} />,
    title: 'Nutrition Tracking',
    shortDescription: 'Smart diet and nutrition management',
    longDescription: 'Track your nutrition with our intelligent food logging system. Get detailed breakdowns of macro and micronutrients, and receive personalized dietary recommendations.',
    benefits: [
      'Detailed nutrient tracking',
      'Meal recommendations',
      'Diet plan generation',
      'Food diary analysis'
    ]
  },
  {
    icon: <TimelineIcon sx={{ fontSize: 48, color: '#2196f3' }} />,
    title: 'Progress Analytics',
    shortDescription: 'Comprehensive progress tracking',
    longDescription: 'Visualize your health journey with advanced analytics. Track improvements across all health metrics and receive detailed progress reports.',
    benefits: [
      'Visual progress charts',
      'Trend analysis',
      'Goal tracking',
      'Performance predictions'
    ]
  }
];

const FeaturesPage = () => {
  const [expandedFeature, setExpandedFeature] = useState<number | null>(null);

  const handleFeatureClick = (index: number) => {
    setExpandedFeature(expandedFeature === index ? null : index);
  };

  return (
    <Box sx={{ minHeight: '100vh', py: 8, bgcolor: 'background.default' }}>
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Typography
            variant="h2"
            align="center"
            sx={{
              mb: 6,
              background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Powerful Features for Your Health Journey
          </Typography>
        </motion.div>

        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={6} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <FeatureCard onClick={() => handleFeatureClick(index)}>
                  <Box sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Tooltip title="Click to learn more" arrow>
                        <Box sx={{ mr: 2 }}>{feature.icon}</Box>
                      </Tooltip>
                      <Typography variant="h5" sx={{ fontWeight: 600 }}>
                        {feature.title}
                      </Typography>
                      <IconButton
                        sx={{
                          ml: 'auto',
                          transform: expandedFeature === index ? 'rotate(180deg)' : 'none',
                          transition: 'transform 0.3s ease',
                        }}
                      >
                        <ExpandMoreIcon />
                      </IconButton>
                    </Box>
                    <Typography color="text.secondary" sx={{ mb: 2 }}>
                      {feature.shortDescription}
                    </Typography>
                    <AnimatePresence>
                      {expandedFeature === index && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Typography sx={{ mb: 2 }}>
                            {feature.longDescription}
                          </Typography>
                          <Box sx={{ mt: 2 }}>
                            <Typography variant="h6" sx={{ mb: 1 }}>Key Benefits:</Typography>
                            {feature.benefits.map((benefit, benefitIndex) => (
                              <motion.div
                                key={benefitIndex}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: benefitIndex * 0.1 }}
                              >
                                <Typography
                                  sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    mb: 0.5,
                                    '&:before': {
                                      content: '""',
                                      width: 6,
                                      height: 6,
                                      borderRadius: '50%',
                                      bgcolor: 'primary.main',
                                      mr: 1,
                                    },
                                  }}
                                >
                                  {benefit}
                                </Typography>
                              </motion.div>
                            ))}
                          </Box>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Box>
                </FeatureCard>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default FeaturesPage; 