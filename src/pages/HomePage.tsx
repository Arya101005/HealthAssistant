import React from 'react';
import { Box, Button, Container, Grid, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { GlassmorphicCard, ParallaxContainer, ParallaxLayer } from '../components/styled/AdvancedUIEffects';
import FavoriteIcon from '@mui/icons-material/Favorite';
import TimelineIcon from '@mui/icons-material/Timeline';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';

const HomePage = () => {
  const features = [
    {
      icon: <MonitorHeartIcon sx={{ fontSize: 40, color: '#f44336' }} />,
      title: 'Health Score Tracking',
      description: 'Monitor your overall health score and get personalized insights.',
    },
    {
      icon: <TimelineIcon sx={{ fontSize: 40, color: '#4caf50' }} />,
      title: 'Real-time Metrics',
      description: 'Track vital health metrics in real-time with beautiful visualizations.',
    },
    {
      icon: <RestaurantIcon sx={{ fontSize: 40, color: '#ff9800' }} />,
      title: 'Diet Management',
      description: 'Log and track your meals with detailed nutritional information.',
    },
    {
      icon: <FavoriteIcon sx={{ fontSize: 40, color: '#2196f3' }} />,
      title: 'Health Recommendations',
      description: 'Receive personalized health recommendations based on your data.',
    },
  ];

  return (
    <ParallaxContainer>
      <Box
        sx={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #f6f9fc 0%, #edf2f7 100%)',
          overflow: 'hidden',
        }}
      >
        {/* Hero Section */}
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center" sx={{ minHeight: '90vh' }}>
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Typography
                  variant="h2"
                  component="h1"
                  sx={{
                    fontWeight: 800,
                    mb: 3,
                    background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  Your Personal Health Assistant
                </Typography>
                <Typography variant="h5" color="text.secondary" sx={{ mb: 4 }}>
                  Track, monitor, and improve your health with our intelligent dashboard.
                </Typography>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    component={Link}
                    to="/dashboard"
                    variant="contained"
                    size="large"
                    sx={{
                      background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                      color: 'white',
                      px: 4,
                      py: 2,
                      borderRadius: 2,
                      boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
                    }}
                  >
                    Get Started
                  </Button>
                </motion.div>
              </motion.div>
            </Grid>
            <Grid item xs={12} md={6}>
              <ParallaxLayer depth={0.2}>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <Box
                    component="img"
                    src="/health-dashboard-preview.png"
                    alt="Health Dashboard Preview"
                    sx={{
                      width: '100%',
                      height: 'auto',
                      borderRadius: 4,
                      boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                    }}
                  />
                </motion.div>
              </ParallaxLayer>
            </Grid>
          </Grid>
        </Container>

        {/* Features Section */}
        <Box sx={{ py: 10, backgroundColor: 'rgba(255,255,255,0.5)' }}>
          <Container maxWidth="lg">
            <Typography
              variant="h3"
              align="center"
              sx={{
                mb: 8,
                fontWeight: 700,
                background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Key Features
            </Typography>
            <Grid container spacing={4}>
              {features.map((feature, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <GlassmorphicCard
                      sx={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        textAlign: 'center',
                        p: 4,
                      }}
                    >
                      <Box sx={{ mb: 2 }}>{feature.icon}</Box>
                      <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                        {feature.title}
                      </Typography>
                      <Typography color="text.secondary">
                        {feature.description}
                      </Typography>
                    </GlassmorphicCard>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>
      </Box>
    </ParallaxContainer>
  );
};

export default HomePage; 