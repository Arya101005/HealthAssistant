import { DietLog } from '../components/Dashboard/DietTracker';

export type { DietLog };

export interface ActivityData {
  steps: number;
  activeMinutes: number;
  caloriesBurned: number;
  timestamp: string;
}

export interface BloodPressureData {
  systolic: number;
  diastolic: number;
  timestamp: string;
}

export interface BloodSugarData {
  value: number;
  type: 'fasting' | 'random';
  timestamp: string;
}

export interface HeartRateData {
  resting: number;
  current?: number;
  timestamp: string;
}

export interface CholesterolData {
  totalCholesterol: number;
  hdl: number;
  ldl: number;
  triglycerides: number;
  timestamp: string;
}

export interface HealthMetrics {
  heartRate: HeartRateData;
  bloodPressure: BloodPressureData;
  bloodSugar: BloodSugarData;
  cholesterol: CholesterolData;
  activity: ActivityData;
  sleep: {
    duration: number;
    quality: number;
    timestamp: string;
  };
  diet: DietLog[];
  timestamp: string;
}

export interface HealthRiskScore {
  overall: number;
  categories: {
    diabetes: number;
    heartDisease: number;
    stroke: number;
    hypertension: number;
  };
  lastUpdated: string;
}

export interface HealthRecommendation {
  type: 'exercise' | 'diet' | 'lifestyle' | 'medical';
  priority: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  impact: string;
  tasks: {
    id: string;
    title: string;
    description: string;
    points: number;
    difficulty: string;
    category: string;
    completed: boolean;
  }[];
  potential_points: number;
}

export interface UserHealthProfile {
  id: string;
  name: string;
  age: number;
  height: number;
  weight: number;
  gender: 'male' | 'female' | 'other';
  metrics: HealthMetrics;
  goals: {
    steps: number;
    activeMinutes: number;
    calories: number;
    sleep: number;
  };
  medicalConditions: string[];
  medications: string[];
  allergies: string[];
  dietLogs: DietLog[];
  riskScores: HealthRiskScore;
  recommendations: HealthRecommendation[];
}

export enum MetricType {
  heartRate = 'heartRate',
  bloodPressure = 'bloodPressure',
  bloodSugar = 'bloodSugar',
  activity = 'activity',
  sleep = 'sleep',
  diet = 'diet'
} 