from transformers import PegasusForConditionalGeneration, PegasusTokenizer
from fastapi import FastAPI
from pydantic import BaseModel
import torch

# Load model and tokenizer
model_name = "google/pegasus-large"
tokenizer = PegasusTokenizer.from_pretrained(model_name)
model = PegasusForConditionalGeneration.from_pretrained(model_name)

class TextInput(BaseModel):
    text: str
    max_length: int = 150
    min_length: int = 50

async def generate_summary(text_input: TextInput):
    # Tokenize the text
    tokens = tokenizer(text_input.text, truncation=True, padding="longest", return_tensors="pt")
    
    # Generate summary
    summary_ids = model.generate(
        tokens["input_ids"],
        num_beams=4,
        length_penalty=2.0,
        max_length=text_input.max_length,
        min_length=text_input.min_length,
        no_repeat_ngram_size=3
    )
    
    # Decode summary
    summary = tokenizer.decode(summary_ids[0], skip_special_tokens=True)
    
    return {
        "summary": summary,
        "original_length": len(text_input.text.split()),
        "summary_length": len(summary.split())
    } 