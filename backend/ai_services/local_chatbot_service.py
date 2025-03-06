import spacy
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Dict, Optional
import json
import os

# Load spaCy model
nlp = spacy.load('en_core_web_sm')

class Message(BaseModel):
    role: str
    content: str

class ChatInput(BaseModel):
    messages: List[Message]
    user_data: Optional[Dict] = None

class LocalChatbotService:
    def __init__(self):
        # Load predefined responses
        self.responses = {
            "greeting": [
                "Hello! I'm your health assistant. How can I help you today?",
                "Hi there! I'm here to help with your health-related questions.",
                "Welcome! I'm your virtual health assistant. What would you like to know?"
            ],
            "blood_pressure": [
                "Your blood pressure readings are important indicators of cardiovascular health. A normal range is typically below 120/80 mmHg.",
                "Regular blood pressure monitoring is essential. Consider checking it at the same time each day.",
                "If you're concerned about your blood pressure, try lifestyle changes like reducing salt intake and regular exercise."
            ],
            "exercise": [
                "Regular exercise is crucial for maintaining good health. Aim for at least 150 minutes of moderate activity per week.",
                "Try incorporating both cardio and strength training into your routine.",
                "Start slowly and gradually increase your activity level. Listen to your body!"
            ],
            "diet": [
                "A balanced diet should include plenty of fruits, vegetables, whole grains, and lean proteins.",
                "Try to limit processed foods and sugary drinks in your diet.",
                "Consider keeping a food diary to track your eating habits."
            ],
            "sleep": [
                "Adults should aim for 7-9 hours of sleep per night.",
                "Maintain a consistent sleep schedule, even on weekends.",
                "Create a relaxing bedtime routine to improve sleep quality."
            ],
            "stress": [
                "Regular stress management is important for both mental and physical health.",
                "Try relaxation techniques like deep breathing or meditation.",
                "Physical activity can help reduce stress levels."
            ],
            "default": [
                "I understand you have a question about health. Could you please be more specific?",
                "I'm here to help with general health information. What specific aspect would you like to know more about?",
                "For personalized medical advice, please consult with a healthcare provider."
            ]
        }
    
    def _get_topic(self, text: str) -> str:
        """Use spaCy to analyze the text and determine the topic."""
        doc = nlp(text.lower())
        
        # Define keywords for each topic
        topics = {
            "greeting": ["hello", "hi", "hey", "greetings"],
            "blood_pressure": ["blood", "pressure", "bp", "hypertension"],
            "exercise": ["exercise", "workout", "fitness", "activity", "gym"],
            "diet": ["diet", "food", "nutrition", "eat", "eating"],
            "sleep": ["sleep", "rest", "insomnia", "tired"],
            "stress": ["stress", "anxiety", "worried", "tension"]
        }
        
        # Check for topic keywords in the text
        for topic, keywords in topics.items():
            if any(keyword in text.lower() for keyword in keywords):
                return topic
                
        # Use spaCy's entity recognition as a fallback
        entities = [ent.label_ for ent in doc.ents]
        if "HEALTH" in entities or "CONDITION" in entities:
            return "health"
            
        return "default"
    
    def _format_health_context(self, user_data: Dict) -> str:
        """Format user health data into a readable context string."""
        context = []
        
        if "age" in user_data:
            context.append(f"Age: {user_data['age']}")
        if "gender" in user_data:
            context.append(f"Gender: {user_data['gender']}")
        if "health_conditions" in user_data:
            conditions = ", ".join(user_data["health_conditions"])
            context.append(f"Health conditions: {conditions}")
        if "recent_metrics" in user_data:
            metrics = user_data["recent_metrics"]
            if "blood_pressure" in metrics:
                context.append(f"Blood pressure: {metrics['blood_pressure']}")
            if "heart_rate" in metrics:
                context.append(f"Heart rate: {metrics['heart_rate']} bpm")
            if "blood_sugar" in metrics:
                context.append(f"Blood sugar: {metrics['blood_sugar']} mg/dL")
        
        return ". ".join(context)
    
    async def get_response(self, chat_input: ChatInput) -> Dict:
        try:
            # Get the last user message
            last_message = next((msg for msg in reversed(chat_input.messages) 
                               if msg.role == "user"), None)
            
            if not last_message:
                raise HTTPException(status_code=400, detail="No user message found")
            
            # Determine the topic of the message
            topic = self._get_topic(last_message.content)
            
            # Get appropriate response
            import random
            response = random.choice(self.responses.get(topic, self.responses["default"]))
            
            # Add context if available
            if chat_input.user_data:
                context = self._format_health_context(chat_input.user_data)
                response = f"Based on your health data ({context}): {response}"
            
            return {
                "response": response,
                "topic": topic
            }
        
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))

local_chatbot = LocalChatbotService() 