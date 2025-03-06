from typing import List, Dict, Optional
from pydantic import BaseModel
from openai import OpenAI
import os

class Message(BaseModel):
    role: str
    content: str

class UserData(BaseModel):
    age: Optional[int] = None
    gender: Optional[str] = None
    health_conditions: Optional[List[str]] = None
    recent_metrics: Optional[Dict[str, str]] = None

class ChatRequest(BaseModel):
    messages: List[Message]
    user_data: Optional[UserData] = None

class ChatService:
    def __init__(self):
        self.client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))
        self.system_prompt = """You are a knowledgeable and empathetic health assistant. 
        Your role is to provide accurate health information, guidance, and support while being mindful of medical ethics.
        Always encourage users to consult healthcare professionals for specific medical advice, diagnosis, or treatment.
        Use the provided user health data to give more personalized responses when available."""

    async def get_response(self, chat_request: ChatRequest) -> str:
        try:
            # Format user data if available
            context = ""
            if chat_request.user_data:
                context = f"""User Profile:
                Age: {chat_request.user_data.age if chat_request.user_data.age else 'Not provided'}
                Gender: {chat_request.user_data.gender if chat_request.user_data.gender else 'Not provided'}
                Health Conditions: {', '.join(chat_request.user_data.health_conditions) if chat_request.user_data.health_conditions else 'None reported'}
                Recent Metrics: {chat_request.user_data.recent_metrics if chat_request.user_data.recent_metrics else 'Not available'}
                """

            # Prepare messages for OpenAI
            messages = [
                {"role": "system", "content": self.system_prompt + "\n" + context},
                *[{"role": msg.role, "content": msg.content} for msg in chat_request.messages]
            ]

            # Call OpenAI API
            response = self.client.chat.completions.create(
                model="gpt-4-turbo-preview",  # or another appropriate model
                messages=messages,
                temperature=0.7,
                max_tokens=500,
                top_p=1.0,
                frequency_penalty=0.0,
                presence_penalty=0.0
            )

            return response.choices[0].message.content

        except Exception as e:
            print(f"Error in chat service: {str(e)}")
            raise Exception("Failed to generate response. Please try again later.")

chat_service = ChatService()