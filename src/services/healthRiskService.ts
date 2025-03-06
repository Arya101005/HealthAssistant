import { HealthMetrics, HealthRiskScore } from '../types/health';

// Mock ML model weights (in a real app, these would come from a trained model)
const riskWeights = {
  bloodPressure: {
    systolic: 0.3,
    diastolic: 0.2,
  },
  bloodSugar: 0.25,
  cholesterol: {
    total: 0.15,
    hdl: -0.1, // Negative because higher HDL is better
    ldl: 0.2,
    triglycerides: 0.1,
  },
  activity: {
    steps: -0.15, // Negative because more steps is better
    activeMinutes: -0.1, // Negative because more active minutes is better
  },
  heartRate: {
    resting: 0.15,
  },
};

// Normalize values to 0-1 range
const normalize = (value: number, min: number, max: number): number => {
  return (value - min) / (max - min);
};

// Calculate individual risk scores
const calculateDiabetesRisk = (metrics: HealthMetrics): number => {
  const normalizedSugar = normalize(metrics.bloodSugar.value, 70, 200);
  const normalizedActivity = normalize(metrics.activity.activeMinutes, 0, 60);
  
  // Higher blood sugar and lower activity increase risk
  const risk = (normalizedSugar * 0.7) + ((1 - normalizedActivity) * 0.3);
  return Math.min(Math.max(risk * 100, 0), 100);
};

const calculateHeartDiseaseRisk = (metrics: HealthMetrics): number => {
  const normalizedSystolic = normalize(metrics.bloodPressure.systolic, 90, 180);
  const normalizedDiastolic = normalize(metrics.bloodPressure.diastolic, 60, 120);
  const normalizedCholesterol = normalize(metrics.cholesterol.totalCholesterol, 150, 300);
  const normalizedHeartRate = normalize(metrics.heartRate.resting, 60, 100);

  const risk = (
    normalizedSystolic * riskWeights.bloodPressure.systolic +
    normalizedDiastolic * riskWeights.bloodPressure.diastolic +
    normalizedCholesterol * riskWeights.cholesterol.total +
    normalizedHeartRate * riskWeights.heartRate.resting
  );

  return Math.min(Math.max(risk * 100, 0), 100);
};

const calculateStrokeRisk = (metrics: HealthMetrics): number => {
  const normalizedSystolic = normalize(metrics.bloodPressure.systolic, 90, 180);
  const normalizedActivity = normalize(metrics.activity.steps, 0, 10000);
  
  // Higher blood pressure and lower activity increase risk
  const risk = (normalizedSystolic * 0.6) + ((1 - normalizedActivity) * 0.4);
  return Math.min(Math.max(risk * 100, 0), 100);
};

const calculateHypertensionRisk = (metrics: HealthMetrics): number => {
  const normalizedSystolic = normalize(metrics.bloodPressure.systolic, 90, 180);
  const normalizedDiastolic = normalize(metrics.bloodPressure.diastolic, 60, 120);
  
  // Both systolic and diastolic pressure contribute to risk
  const risk = (normalizedSystolic * 0.6) + (normalizedDiastolic * 0.4);
  return Math.min(Math.max(risk * 100, 0), 100);
};

export const calculateHealthRisks = (metrics: HealthMetrics): HealthRiskScore => {
  const diabetesRisk = calculateDiabetesRisk(metrics);
  const heartDiseaseRisk = calculateHeartDiseaseRisk(metrics);
  const strokeRisk = calculateStrokeRisk(metrics);
  const hypertensionRisk = calculateHypertensionRisk(metrics);

  // Calculate overall health score (100 - average risk)
  const overallRisk = (diabetesRisk + heartDiseaseRisk + strokeRisk + hypertensionRisk) / 4;
  const overallScore = 100 - overallRisk;

  return {
    overall: overallScore,
    categories: {
      diabetes: diabetesRisk,
      heartDisease: heartDiseaseRisk,
      stroke: strokeRisk,
      hypertension: hypertensionRisk,
    },
    lastUpdated: new Date().toISOString(),
  };
};

export const analyzeHealthTrends = (
  metricsHistory: HealthMetrics[],
  currentRisks: HealthRiskScore
): string[] => {
  const warnings: string[] = [];

  // Analyze blood sugar trends
  const sugarTrend = metricsHistory
    .slice(-7) // Last 7 readings
    .map(m => m.bloodSugar.value);
  const avgSugar = sugarTrend.reduce((a, b) => a + b, 0) / sugarTrend.length;
  if (avgSugar > 100 && currentRisks.categories.diabetes > 30) {
    warnings.push(
      'Your average blood sugar levels are elevated. Consider consulting a healthcare provider about diabetes risk.'
    );
  }

  // Analyze blood pressure trends
  const systolicTrend = metricsHistory
    .slice(-7)
    .map(m => m.bloodPressure.systolic);
  const avgSystolic = systolicTrend.reduce((a, b) => a + b, 0) / systolicTrend.length;
  if (avgSystolic > 130 && currentRisks.categories.hypertension > 30) {
    warnings.push(
      'Your blood pressure has been consistently high. Schedule a check-up to discuss hypertension management.'
    );
  }

  // Analyze activity trends
  const activityTrend = metricsHistory
    .slice(-7)
    .map(m => m.activity.steps);
  const avgActivity = activityTrend.reduce((a, b) => a + b, 0) / activityTrend.length;
  if (avgActivity < 5000) {
    warnings.push(
      'Your activity levels have been low. Aim for at least 7,000 steps daily to reduce health risks.'
    );
  }

  return warnings;
};

export const generateRecommendations = (
  metrics: HealthMetrics,
  risks: HealthRiskScore
): string[] => {
  const recommendations: string[] = [];

  // Activity recommendations
  if (metrics.activity.steps < 7000) {
    recommendations.push(
      'Increase your daily steps to 7,000-10,000 by taking short walks throughout the day.'
    );
  }

  // Blood pressure recommendations
  if (metrics.bloodPressure.systolic > 130 || metrics.bloodPressure.diastolic > 80) {
    recommendations.push(
      'Reduce sodium intake and practice stress-management techniques to help lower blood pressure.'
    );
  }

  // Blood sugar recommendations
  if (metrics.bloodSugar.value > 100) {
    recommendations.push(
      'Monitor carbohydrate intake and consider eating smaller, more frequent meals to stabilize blood sugar.'
    );
  }

  // Heart rate recommendations
  if (metrics.heartRate.resting > 80) {
    recommendations.push(
      'Your resting heart rate is elevated. Consider incorporating more cardiovascular exercise into your routine.'
    );
  }

  return recommendations;
}; 