import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { UserHealthProfile, HealthMetrics } from '../types/health';
import { DietLog } from '../components/Dashboard/DietTracker';
import { WearableDevice, aggregateHealthData } from '../services/healthDataService';
import { calculateHealthRisks, generateRecommendations } from '../services/healthRiskService';

interface Task {
  id: string;
  title: string;
  description: string;
  points: number;
  difficulty: string;
  category: string;
  completed: boolean;
  deadline?: string;
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

interface HealthState {
  profile: UserHealthProfile | null;
  metricsHistory: HealthMetrics[];
  isLoading: boolean;
  error: string | null;
  selectedDevice: WearableDevice;
  tasks: Task[];
  earnedPoints: number;
  totalAvailablePoints: number;
  recommendations: HealthRecommendation[];
}

const initialState: HealthState = {
  profile: null,
  metricsHistory: [],
  isLoading: false,
  error: null,
  selectedDevice: WearableDevice.GOOGLE_FIT,
  tasks: [],
  earnedPoints: 0,
  totalAvailablePoints: 0,
  recommendations: [],
};

// Async thunk for fetching health data
export const fetchHealthData = createAsyncThunk(
  'health/fetchHealthData',
  async () => {
    const healthData = await aggregateHealthData();
    
    // Transform HealthData into HealthMetrics
    const metrics: HealthMetrics = {
      bloodPressure: {
        systolic: healthData.labData.bloodPressure?.systolic || 120,
        diastolic: healthData.labData.bloodPressure?.diastolic || 80,
        timestamp: new Date().toISOString(),
      },
      bloodSugar: {
        value: healthData.labData.bloodSugar || 95,
        type: 'fasting',
        timestamp: new Date().toISOString(),
      },
      cholesterol: {
        totalCholesterol: healthData.labData.cholesterol?.total || 180,
        hdl: healthData.labData.cholesterol?.hdl || 50,
        ldl: healthData.labData.cholesterol?.ldl || 110,
        triglycerides: healthData.labData.cholesterol?.triglycerides || 150,
        timestamp: new Date().toISOString(),
      },
      activity: {
        steps: 8000,
        activeMinutes: 45,
        caloriesBurned: 400,
        timestamp: new Date().toISOString(),
      },
      sleep: {
        duration: 7.5,
        quality: 85,
        timestamp: new Date().toISOString(),
      },
      heartRate: {
        current: 72,
        resting: 65,
        timestamp: new Date().toISOString(),
      },
      diet: [],
      timestamp: new Date().toISOString(),
    };

    const response = await fetch('http://localhost:8000/api/predict-risk', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(metrics),
    });

    if (!response.ok) {
      throw new Error('Failed to predict health risks');
    }

    const riskData = await response.json();

    return {
      metrics,
      healthScore: riskData.health_score,
      riskScores: riskData.risk_scores,
      recommendations: riskData.recommendations,
      totalAvailablePoints: riskData.total_available_points,
    };
  }
);

const healthSlice = createSlice({
  name: 'health',
  initialState,
  reducers: {
    initializeProfile(state, action: PayloadAction<UserHealthProfile>) {
      state.profile = action.payload;
      state.metricsHistory = [action.payload.metrics];
      state.isLoading = false;
      state.error = null;
    },
    setSelectedDevice(state, action: PayloadAction<WearableDevice>) {
      state.selectedDevice = action.payload;
    },
    addDietLog(state, action: PayloadAction<DietLog>) {
      if (state.profile) {
        state.profile.dietLogs = [action.payload, ...state.profile.dietLogs];
      }
    },
    updateMetrics(state, action: PayloadAction<HealthMetrics>) {
      if (state.profile) {
        state.profile.metrics = action.payload;
        state.metricsHistory.push(action.payload);

        // Keep only last 30 days of history
        if (state.metricsHistory.length > 30) {
          state.metricsHistory.shift();
        }
      }
    },
    completeTask(state, action: PayloadAction<string>) {
      const taskId = action.payload;
      let taskFound = false;

      // Update task in recommendations
      state.recommendations = state.recommendations.map(rec => ({
        ...rec,
        tasks: rec.tasks.map(task => {
          if (task.id === taskId && !task.completed) {
            taskFound = true;
            state.earnedPoints += task.points;
            return { ...task, completed: true };
          }
          return task;
        })
      }));

      // Update task in tasks array
      if (!taskFound) {
        state.tasks = state.tasks.map(task => {
          if (task.id === taskId && !task.completed) {
            state.earnedPoints += task.points;
            return { ...task, completed: true };
          }
          return task;
        });
      }
    },
    resetDailyTasks(state) {
      // Reset all tasks to uncompleted
      state.recommendations = state.recommendations.map(rec => ({
        ...rec,
        tasks: rec.tasks.map(task => ({ ...task, completed: false }))
      }));
      state.tasks = state.tasks.map(task => ({ ...task, completed: false }));
      state.earnedPoints = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHealthData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchHealthData.fulfilled, (state, action) => {
        state.isLoading = false;
        if (state.profile) {
          state.profile.metrics = action.payload.metrics;
          state.profile.riskScores = {
            overall: action.payload.healthScore,
            categories: action.payload.riskScores,
            lastUpdated: new Date().toISOString(),
          };
          state.recommendations = action.payload.recommendations;
          state.totalAvailablePoints = action.payload.totalAvailablePoints;
          state.metricsHistory.push(action.payload.metrics);

          // Keep only last 30 days of history
          if (state.metricsHistory.length > 30) {
            state.metricsHistory.shift();
          }
        }
      })
      .addCase(fetchHealthData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch health data';
      });
  },
});

export const {
  setSelectedDevice,
  addDietLog,
  updateMetrics,
  initializeProfile,
  completeTask,
  resetDailyTasks,
} = healthSlice.actions;
export default healthSlice.reducer; 