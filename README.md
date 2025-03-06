# Health AI Platform

## 📌 Overview
This project leverages AI and ML models to provide various health-related functionalities, such as health risk prediction, medical text extraction, nutrition estimation, emotion detection, and more.

## 🚀 Features & Models Used

| Feature | ML Model Used | Description |
|---------|--------------|-------------|
| **Chatbot (AI Assistant)** | Transformer Models (GPT, BERT, Rasa NLU) | Provides health advice and answers queries using NLP. |
| **OCR (Extracting Text from Images)** | Tesseract OCR, EasyOCR, CRNN | Converts medical documents, prescriptions, or handwritten notes into digital text. |
| **Heart Risk Prediction** | Logistic Regression, SVM, Random Forest, ANNs | Predicts heart disease risk based on user's health data. |
| **Step Count & Activity Tracking** | LSTM, CNN | Uses wearable sensor data to count steps and detect activity type. |
| **Calorie & Nutrition Estimation** | YOLO, Faster R-CNN | Recognizes food items from images and estimates calories. |
| **Medical Report Analysis** | BERT, BioBERT, LLM-based NLP Models | Extracts key insights from medical reports using NLP. |
| **Emotion & Stress Detection** | CNN, LSTM | Analyzes facial expressions or voice tone to detect stress levels. |
| **Sleep Pattern Monitoring** | RNN, LSTM | Tracks and predicts sleep quality using time-series analysis. |
| **Diabetes & Blood Sugar Prediction** | Random Forest, XGBoost, Neural Networks | Predicts diabetes risk from past health records. |
| **Medicine Reminder (Voice & Text Alerts)** | Speech-to-Text (DeepSpeech), TTS models | Converts text reminders into voice alerts for medicine schedules. |

## 🛠️ Tech Stack
* **Frontend:** React.js / Flutter
* **Backend:** Python (Flask / FastAPI / Django)
* **Machine Learning:** TensorFlow, PyTorch, Scikit-learn, OpenCV
* **Database:** PostgreSQL / Firebase / MongoDB
* **Cloud & Deployment:** AWS / Google Cloud / Docker

## 📋 Requirements
- Python 3.8+
- Node.js 14+ (for React frontend)
- GPU recommended for model training
- See `requirements.txt` for Python dependencies

## 🚀 Installation & Setup

### Clone the repository
```bash
git clone https://github.com/yourusername/health-ai-platform.git
cd health-ai-platform
```

### Set up virtual environment
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### Set up frontend
```bash
cd frontend
npm install
npm start
```

### Start the backend server
```bash
cd backend
python app.py
```

## 🔧 Configuration
Create a `.env` file in the root directory with the following variables:
```
DATABASE_URL=your_database_connection_string
API_KEY=your_api_key
MODEL_PATH=path_to_saved_models
```

## 📈 Usage Examples

### Heart Risk Prediction
```python
from health_ai.predictors import HeartRiskPredictor

predictor = HeartRiskPredictor()
risk_score = predictor.predict({
    'age': 45,
    'gender': 'male',
    'cholesterol': 240,
    'blood_pressure': 130,
    'smoking': True
})
print(f"Heart disease risk: {risk_score}%")
```

### Nutrition Estimation
```python
from health_ai.nutrition import FoodRecognizer

recognizer = FoodRecognizer()
food_info = recognizer.analyze_image('path_to_food_image.jpg')
print(f"Detected food: {food_info['name']}")
print(f"Estimated calories: {food_info['calories']}")
```

## 📊 Model Performance

| Model | Accuracy | F1 Score | Dataset Used |
|-------|----------|----------|--------------|
| Heart Risk Predictor | 92.5% | 0.91 | Cleveland Heart Disease Dataset |
| Food Recognizer | 87.3% | 0.85 | Food-101 + Custom Dataset |
| Emotion Detector | 83.1% | 0.82 | FER-2013 Dataset |
| Diabetes Predictor | 89.7% | 0.88 | PIMA Indian Diabetes Dataset |

## 🤝 Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License
This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgements
- [TensorFlow](https://www.tensorflow.org/)
- [PyTorch](https://pytorch.org/)
- [Scikit-learn](https://scikit-learn.org/)
- [OpenCV](https://opencv.org/)
- All the contributors who have helped shape this project
