import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import DietTracker from '../components/Dashboard/DietTracker';

export const NutritionPage: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Paper 
        sx={{ 
          p: 3,
          mb: 3,
          background: (theme) => `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
          color: 'white',
          borderRadius: 2,
        }}
      >
        <Typography variant="h4" gutterBottom fontWeight="bold">
          Nutrition Tracker
        </Typography>
        <Typography variant="subtitle1">
          Monitor your diet and maintain a healthy eating habit
        </Typography>
      </Paper>
      
      <DietTracker 
        dietLogs={[]} 
        onLogMeal={(mealData) => {
          console.log('Meal logged:', mealData);
        }} 
      />
    </Box>
  );
}; 