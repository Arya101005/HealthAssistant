from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from ai_services.risk_prediction_service import RiskPrediction, HealthMetrics

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

risk_predictor = RiskPrediction()

@app.post("/api/predict-risk")
async def predict_risk(metrics: HealthMetrics):
    result = await risk_predictor.predict_risk(metrics)
    return result

@app.get("/")
async def root():
    return {"message": "Health Assistant API is running"} 