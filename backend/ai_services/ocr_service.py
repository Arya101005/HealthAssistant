import pytesseract
import cv2
import numpy as np
from fastapi import FastAPI, File, UploadFile, HTTPException
from sqlalchemy import create_engine, Column, String, DateTime, Integer
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from datetime import datetime
import os
from dotenv import load_dotenv
import logging

load_dotenv()

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Database setup
POSTGRES_URL = os.getenv('POSTGRES_URL', 'postgresql://user:password@localhost:5432/health_db')
engine = create_engine(POSTGRES_URL)
Base = declarative_base()
SessionLocal = sessionmaker(bind=engine)

class OCRResult(Base):
    __tablename__ = "ocr_results"
    id = Column(Integer, primary_key=True, index=True)
    text = Column(String)
    timestamp = Column(DateTime, default=datetime.utcnow)
    user_id = Column(String)

Base.metadata.create_all(bind=engine)

async def process_image(file):
    """Process an image file using OCR to extract text."""
    try:
        # Read image file
        contents = await file.read()
        nparr = np.frombuffer(contents, np.uint8)
        img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        
        if img is None:
            raise HTTPException(status_code=400, detail="Failed to decode image")
        
        # Preprocess image
        # Convert to grayscale
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        
        # Apply thresholding to preprocess the image
        thresh = cv2.threshold(gray, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)[1]
        
        # Apply dilation to connect text components
        kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (3,3))
        dilate = cv2.dilate(thresh, kernel, iterations=1)
        
        # Find contours and remove noise
        contours, hierarchy = cv2.findContours(dilate, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
        for contour in contours:
            area = cv2.contourArea(contour)
            if area < 100:  # Remove small noise
                cv2.drawContours(dilate, [contour], -1, (255,255,255), -1)
        
        # Extract text using Tesseract
        custom_config = r'--oem 3 --psm 6'
        text = pytesseract.image_to_string(dilate, config=custom_config)
        
        if not text.strip():
            logger.warning("No text was extracted from the image")
            return "No text could be extracted from the image. Please ensure the image is clear and contains text."
        
        return text.strip()
        
    except Exception as e:
        logger.error(f"Error processing image: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail=f"Failed to process image: {str(e)}"
        ) 