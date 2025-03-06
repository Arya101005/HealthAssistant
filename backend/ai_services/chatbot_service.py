from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Dict, Optional
import openai
import os
from dotenv import load_dotenv

load_dotenv()

# Set OpenAI API key
openai.api_key = os.getenv("OPENAI_API_KEY")

class Message(BaseModel):
    role: str
    content: str

class ChatInput(BaseModel):
    messages: List[Message]
    user_data: Optional[Dict] = None

class ChatbotService:
    def __init__(self):
        self.system_prompt = """You are a knowledgeable healthcare assistant. Use the provided user health data 
        to give personalized advice. Always maintain a professional and empathetic tone. If you're unsure about 
        anything, recommend consulting a healthcare provider."""
    
    async def get_response(self, chat_input: ChatInput) -> Dict:
        try:
            # Prepare messages with system prompt and user health context
            messages = [{"role": "system", "content": self.system_prompt}]
            
            # Add user health context if available
            if chat_input.user_data:
                health_context = self._format_health_context(chat_input.user_data)
                messages.append({
                    "role": "system",
                    "content": f"User health context: {health_context}"
                })
            
            # Add conversation history
            for msg in chat_input.messages:
                messages.append({
                    "role": msg.role,
                    "content": msg.content
                })
            
            # Get response from GPT-4
            response = await openai.ChatCompletion.acreate(
                model="gpt-4",
                messages=messages,
                temperature=0.7,
                max_tokens=500,
                top_p=0.9,
                frequency_penalty=0.5,
                presence_penalty=0.5
            )
            
            return {
                "response": response.choices[0].message.content,
                "usage": response.usage
            }
        
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))
    
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
        if "medications" in user_data:
            medications = ", ".join(user_data["medications"])
            context.append(f"Current medications: {medications}")
        if "allergies" in user_data:
            allergies = ", ".join(user_data["allergies"])
            context.append(f"Allergies: {allergies}")
        if "recent_metrics" in user_data:
            metrics = user_data["recent_metrics"]
            if "blood_pressure" in metrics:
                context.append(f"Blood pressure: {metrics['blood_pressure']}")
            if "heart_rate" in metrics:
                context.append(f"Heart rate: {metrics['heart_rate']} bpm")
            if "blood_sugar" in metrics:
                context.append(f"Blood sugar: {metrics['blood_sugar']} mg/dL")
        
        return ". ".join(context)

chatbot = ChatbotService() 