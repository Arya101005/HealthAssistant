import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Select,
  MenuItem,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
  SelectChangeEvent,
  Paper,
  useTheme,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { styled } from '@mui/material/styles';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import AddIcon from '@mui/icons-material/Add';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

export interface DietLog {
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  items: {
    name: string;
    calories: number;
    nutrients: {
      protein: number;
      carbs: number;
      fats: number;
    };
  }[];
  timestamp: string;
}

export interface DietTrackerProps {
  dietLogs: DietLog[];
  onLogMeal: (mealData: DietLog) => void;
}

const StyledForm = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.spacing(2),
  background: theme.palette.background.paper,
  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
}));

const NutrientBox = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: theme.spacing(2),
  background: theme.palette.background.paper,
  textAlign: 'center',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
  },
}));

const DietTracker: React.FC<DietTrackerProps> = ({ dietLogs, onLogMeal }) => {
  const theme = useTheme();
  const [mealType, setMealType] = useState<DietLog['mealType']>('breakfast');
  const [foodItem, setFoodItem] = useState('');
  const [calories, setCalories] = useState('');
  const [protein, setProtein] = useState('');
  const [carbs, setCarbs] = useState('');
  const [fats, setFats] = useState('');

  const handleMealTypeChange = (event: SelectChangeEvent<DietLog['mealType']>) => {
    setMealType(event.target.value as DietLog['mealType']);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newMeal: DietLog = {
      mealType,
      items: [
        {
          name: foodItem,
          calories: parseInt(calories),
          nutrients: {
            protein: parseInt(protein),
            carbs: parseInt(carbs),
            fats: parseInt(fats),
          },
        },
      ],
      timestamp: new Date().toISOString(),
    };
    onLogMeal(newMeal);
    // Reset form
    setFoodItem('');
    setCalories('');
    setProtein('');
    setCarbs('');
    setFats('');
  };

  const calculateTotalNutrients = () => {
    return dietLogs.reduce(
      (acc, log) => {
        log.items.forEach((item) => {
          acc.calories += item.calories;
          acc.protein += item.nutrients.protein;
          acc.carbs += item.nutrients.carbs;
          acc.fats += item.nutrients.fats;
        });
        return acc;
      },
      { calories: 0, protein: 0, carbs: 0, fats: 0 }
    );
  };

  const totals = calculateTotalNutrients();

  const nutrientDistribution = [
    { name: 'Protein', value: totals.protein, color: theme.palette.primary.main },
    { name: 'Carbs', value: totals.carbs, color: theme.palette.success.main },
    { name: 'Fats', value: totals.fats, color: theme.palette.warning.main },
  ];

  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
        Diet Tracker
      </Typography>

      <Grid container spacing={4}>
        {/* Nutrient Summary */}
        <Grid item xs={12}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Box sx={{ height: 200 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={nutrientDistribution}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      innerRadius={60}
                      paddingAngle={5}
                    >
                      {nutrientDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
            </Grid>
            <Grid item xs={12} md={8}>
              <Grid container spacing={2}>
                {[
                  { label: 'Calories', value: totals.calories, unit: 'kcal', color: theme.palette.error.main },
                  { label: 'Protein', value: totals.protein, unit: 'g', color: theme.palette.primary.main },
                  { label: 'Carbs', value: totals.carbs, unit: 'g', color: theme.palette.success.main },
                  { label: 'Fats', value: totals.fats, unit: 'g', color: theme.palette.warning.main },
                ].map((nutrient, index) => (
                  <Grid item xs={6} sm={3} key={nutrient.label}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <NutrientBox>
                        <Typography variant="subtitle2" color="text.secondary">
                          {nutrient.label}
                        </Typography>
                        <Typography
                          variant="h4"
                          sx={{
                            fontWeight: 700,
                            color: nutrient.color,
                            my: 1,
                          }}
                        >
                          {nutrient.value}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {nutrient.unit}
                        </Typography>
                      </NutrientBox>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        {/* Meal Log Form */}
        <Grid item xs={12} md={6}>
          <StyledForm elevation={0}>
            <Box component="form" onSubmit={handleSubmit}>
              <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
                Log a Meal
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Select
                    fullWidth
                    value={mealType}
                    onChange={handleMealTypeChange}
                    sx={{ mb: 2 }}
                  >
                    <MenuItem value="breakfast">Breakfast</MenuItem>
                    <MenuItem value="lunch">Lunch</MenuItem>
                    <MenuItem value="dinner">Dinner</MenuItem>
                    <MenuItem value="snack">Snack</MenuItem>
                  </Select>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Food Item"
                    value={foodItem}
                    onChange={(e) => setFoodItem(e.target.value)}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Calories"
                    type="number"
                    value={calories}
                    onChange={(e) => setCalories(e.target.value)}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Protein (g)"
                    type="number"
                    value={protein}
                    onChange={(e) => setProtein(e.target.value)}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Carbs (g)"
                    type="number"
                    value={carbs}
                    onChange={(e) => setCarbs(e.target.value)}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Fats (g)"
                    type="number"
                    value={fats}
                    onChange={(e) => setFats(e.target.value)}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    startIcon={<AddIcon />}
                    sx={{
                      mt: 2,
                      background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.primary.light} 90%)`,
                      color: 'white',
                      textTransform: 'none',
                      fontSize: '1rem',
                      py: 1.5,
                    }}
                  >
                    Add Meal
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </StyledForm>
        </Grid>

        {/* Recent Meals */}
        <Grid item xs={12} md={6}>
          <StyledForm elevation={0}>
            <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
              Recent Meals
            </Typography>
            <List>
              <AnimatePresence>
                {dietLogs.slice(0, 5).map((log, index) => (
                  <motion.div
                    key={log.timestamp}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <ListItem>
                      <ListItemText
                        primary={
                          <Typography variant="subtitle2" sx={{ textTransform: 'capitalize' }}>
                            {log.mealType}
                          </Typography>
                        }
                        secondary={
                          <>
                            {log.items.map((item, i) => (
                              <Typography key={i} variant="body2" color="text.secondary">
                                {item.name} - {item.calories} kcal
                              </Typography>
                            ))}
                            <Typography variant="caption" color="text.secondary">
                              {new Date(log.timestamp).toLocaleString()}
                            </Typography>
                          </>
                        }
                      />
                    </ListItem>
                    {index < dietLogs.length - 1 && <Divider />}
                  </motion.div>
                ))}
              </AnimatePresence>
            </List>
          </StyledForm>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DietTracker; 