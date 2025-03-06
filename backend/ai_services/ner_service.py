import spacy
from transformers import AutoTokenizer, AutoModelForTokenClassification
import torch
from fastapi import FastAPI
from pydantic import BaseModel
import os
from typing import List, Dict

# Load BioBERT model and tokenizer
tokenizer = AutoTokenizer.from_pretrained("dmis-lab/biobert-base-cased-v1.2")
model = AutoModelForTokenClassification.from_pretrained("dmis-lab/biobert-base-cased-v1.2")

# Load SciSpacy model
nlp = spacy.load("en_core_sci_scibert")

class TextInput(BaseModel):
    text: str

async def extract_entities(text_input: TextInput) -> Dict:
    # Process with SciSpacy
    doc = nlp(text_input.text)
    
    entities = []
    for ent in doc.ents:
        entities.append({
            "text": ent.text,
            "label": ent.label_,
            "start": ent.start_char,
            "end": ent.end_char
        })
    
    # Process with BioBERT
    inputs = tokenizer(text_input.text, return_tensors="pt", padding=True, truncation=True)
    outputs = model(**inputs)
    predictions = torch.argmax(outputs.logits, dim=2)
    
    tokens = tokenizer.convert_ids_to_tokens(inputs["input_ids"][0])
    biobert_entities = []
    
    current_entity = {"text": "", "label": "", "start": 0}
    for idx, (token, pred) in enumerate(zip(tokens, predictions[0])):
        if pred != 0:  # Not 'O' label
            if current_entity["text"] == "":
                current_entity["start"] = idx
            current_entity["text"] += token.replace("##", "")
            current_entity["label"] = model.config.id2label[pred.item()]
        elif current_entity["text"]:
            biobert_entities.append(current_entity)
            current_entity = {"text": "", "label": "", "start": 0}
    
    return {
        "scispacy_entities": entities,
        "biobert_entities": biobert_entities
    } 