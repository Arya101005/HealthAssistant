import xgboost as xgb
import tensorflow as tf
import numpy as np
from fastapi import FastAPI
from pydantic import BaseModel
from typing import List, Dict
import joblib
import os

class HealthMetrics(BaseModel):
    age: int
    gender: str
    height: float
    weight: float
    blood_pressure_systolic: float
    blood_pressure_diastolic: float
    heart_rate: float
    blood_sugar: float
    cholesterol: float
    smoking: bool
    alcohol_consumption: float
    physical_activity_hours: float

class Task(BaseModel):
    id: str
    title: str
    description: str
    points: int
    difficulty: str  # 'easy', 'medium', 'hard'
    category: str  # 'exercise', 'diet', 'lifestyle', 'medical'
    completed: bool = False
    deadline: str | None = None

class HealthRecommendation(BaseModel):
    type: str
    priority: str
    title: str
    description: str
    impact: str
    tasks: List[Task]
    potential_points: int

class RiskPrediction:
    def __init__(self):
        # Load XGBoost model
        self.xgb_model = joblib.load('models/risk_prediction_xgb.model')
        
        # Load TensorFlow Lite model
        self.interpreter = tf.lite.Interpreter(model_path='models/risk_prediction_tflite.tflite')
        self.interpreter.allocate_tensors()
        
        self.input_details = self.interpreter.get_input_details()
        self.output_details = self.interpreter.get_output_details()

    def preprocess_data(self, metrics: HealthMetrics) -> np.ndarray:
        # Convert to numpy array
        data = np.array([
            metrics.age,
            1 if metrics.gender.lower() == 'male' else 0,
            metrics.height,
            metrics.weight,
            metrics.blood_pressure_systolic,
            metrics.blood_pressure_diastolic,
            metrics.heart_rate,
            metrics.blood_sugar,
            metrics.cholesterol,
            1 if metrics.smoking else 0,
            metrics.alcohol_consumption,
            metrics.physical_activity_hours
        ]).reshape(1, -1)
        return data

    def normalize_score(self, score: float) -> int:
        """Normalize score to 0-100 range"""
        return max(0, min(100, int(score * 100)))

    def generate_tasks(self, metrics: HealthMetrics, risk_scores: Dict) -> List[HealthRecommendation]:
        recommendations = []
        
        # Exercise recommendations
        if metrics.physical_activity_hours < 3:
            tasks = [
                Task(
                    id="exercise_1",
                    title="Daily Walk",
                    description="Take a 30-minute walk today",
                    points=50,
                    difficulty="easy",
                    category="exercise"
                ),
                Task(
                    id="exercise_2",
                    title="Strength Training",
                    description="Complete 15 minutes of basic strength exercises",
                    points=75,
                    difficulty="medium",
                    category="exercise"
                )
            ]
            recommendations.append(HealthRecommendation(
                type="exercise",
                priority="high",
                title="Increase Physical Activity",
                description="Regular exercise helps improve overall health and reduce health risks.",
                impact="Reduces risk of heart disease and improves fitness",
                tasks=tasks,
                potential_points=125
            ))

        # Blood pressure management
        if metrics.blood_pressure_systolic > 140 or metrics.blood_pressure_diastolic > 90:
            tasks = [
                Task(
                    id="bp_1",
                    title="BP Monitoring",
                    description="Record your blood pressure twice today",
                    points=30,
                    difficulty="easy",
                    category="medical"
                ),
                Task(
                    id="bp_2",
                    title="Salt Reduction",
                    description="Keep sodium intake under 2000mg today",
                    points=60,
                    difficulty="medium",
                    category="diet"
                )
            ]
            recommendations.append(HealthRecommendation(
                type="lifestyle",
                priority="high",
                title="Blood Pressure Management",
                description="Managing blood pressure is crucial for heart health.",
                impact="Reduces risk of cardiovascular complications",
                tasks=tasks,
                potential_points=90
            ))

        # Blood sugar management
        if metrics.blood_sugar > 100:
            tasks = [
                Task(
                    id="sugar_1",
                    title="Glucose Check",
                    description="Check blood sugar before and after meals",
                    points=40,
                    difficulty="easy",
                    category="medical"
                ),
                Task(
                    id="sugar_2",
                    title="Carb Control",
                    description="Stay within your daily carb target",
                    points=80,
                    difficulty="hard",
                    category="diet"
                )
            ]
            recommendations.append(HealthRecommendation(
                type="diet",
                priority="high",
                title="Blood Sugar Control",
                description="Maintaining healthy blood sugar levels is essential.",
                impact="Reduces risk of diabetes complications",
                tasks=tasks,
                potential_points=120
            ))

        return recommendations

    async def predict_risk(self, metrics: HealthMetrics) -> Dict:
        data = self.preprocess_data(metrics)
        
        # XGBoost prediction
        xgb_data = xgb.DMatrix(data)
        xgb_pred = self.xgb_model.predict(xgb_data)
        
        # TFLite prediction
        input_data = np.float32(data)
        self.interpreter.set_tensor(self.input_details[0]['index'], input_data)
        self.interpreter.invoke()
        tflite_pred = self.interpreter.get_tensor(self.output_details[0]['index'])
        
        # Combine and normalize predictions
        final_risk = (xgb_pred + tflite_pred[0]) / 2
        
        # Calculate health score (inverse of risk)
        overall_health_score = 100 - np.mean([self.normalize_score(r) for r in final_risk])
        
        risk_categories = {
            'heart_disease': self.normalize_score(final_risk[0]),
            'diabetes': self.normalize_score(final_risk[1]),
            'stroke': self.normalize_score(final_risk[2]),
            'hypertension': self.normalize_score(final_risk[3])
        }
        
        recommendations = self.generate_tasks(metrics, risk_categories)
        
        return {
            'health_score': int(overall_health_score),
            'risk_scores': risk_categories,
            'recommendations': [rec.dict() for rec in recommendations],
            'total_available_points': sum(rec.potential_points for rec in recommendations)
        }

risk_predictor = RiskPrediction() 