import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { 
  fetchHealthData, 
  updateMetrics, 
  addDietLog as addDietLogAction,
  setSelectedDevice 
} from '../store/healthSlice';
import { HealthMetrics, BloodPressureData, BloodSugarData, HeartRateData, ActivityData } from '../types/health';
import { DietLog } from '../components/Dashboard/DietTracker';
import { WearableDevice } from '../services/healthDataService';

type MetricUpdateAction = 
  | { type: 'bloodPressure'; data: Omit<BloodPressureData, 'timestamp'> }
  | { type: 'bloodSugar'; data: Omit<BloodSugarData, 'timestamp'> }
  | { type: 'heartRate'; data: Omit<HeartRateData, 'timestamp'> }
  | { type: 'activity'; data: Omit<ActivityData, 'timestamp'> }
  | { type: 'sleep'; data: { duration: number; quality: number } }
  | { type: 'diet'; data: DietLog[] };

export const useHealth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { 
    profile,
    metricsHistory,
    isLoading: loading,
    error,
    selectedDevice 
  } = useSelector((state: RootState) => state.health);

  useEffect(() => {
    // Fetch health data when the component mounts or when device changes
    dispatch(fetchHealthData());
  }, [dispatch, selectedDevice]);

  const updateHealthMetrics = (action: MetricUpdateAction) => {
    if (!profile) return;

    const timestamp = new Date().toISOString();
    const currentMetrics = profile.metrics;

    const updatedMetrics: HealthMetrics = {
      ...currentMetrics,
      [action.type]: {
        ...currentMetrics[action.type],
        ...action.data,
        timestamp,
      },
      timestamp,
    };

    dispatch(updateMetrics(updatedMetrics));
  };

  const addDietLog = (log: DietLog) => {
    if (!profile) return;
    
    const timestamp = new Date().toISOString();
    const updatedMetrics: HealthMetrics = {
      ...profile.metrics,
      diet: [...profile.metrics.diet, log],
      timestamp,
    };

    dispatch(updateMetrics(updatedMetrics));
    dispatch(addDietLogAction(log));
  };

  const changeDevice = (device: WearableDevice) => {
    dispatch(setSelectedDevice(device));
  };

  return {
    profile,
    metricsHistory,
    loading,
    error,
    selectedDevice,
    updateMetrics: updateHealthMetrics,
    addDietLog,
    changeDevice,
  };
}; 