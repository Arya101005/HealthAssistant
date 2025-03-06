import { configureStore } from '@reduxjs/toolkit';
import healthReducer, { fetchHealthData, initializeProfile } from './healthSlice';
import deviceReducer from './slices/deviceSlice';

export const store = configureStore({
  reducer: {
    health: healthReducer,
    device: deviceReducer,
  },
});

// Initialize the store with health data
store.dispatch(fetchHealthData()).then(() => {
  // Initialize profile with mock data for development
  store.dispatch(initializeProfile({
    id: '1',
    name: 'John Doe',
    age: 30,
    height: 175,
    weight: 70,
    gender: 'male',
    metrics: store.getState().health.metricsHistory[0],
    goals: {
      steps: 10000,
      activeMinutes: 60,
      calories: 2000,
      sleep: 8,
    },
    medicalConditions: [],
    medications: [],
    allergies: [],
    dietLogs: [],
    riskScores: {
      overall: 0,
      categories: {
        diabetes: 0,
        heartDisease: 0,
        stroke: 0,
        hypertension: 0,
      },
      lastUpdated: new Date().toISOString(),
    },
    recommendations: [],
  }));
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 