import pymongo
from pymongo import MongoClient
from config import Config
import pandas as pd
from datetime import datetime
import logging

class DatabaseManager:
    def __init__(self):
        try:
            self.client = MongoClient(Config.MONGODB_URI)
            self.db = self.client[Config.MONGODB_DATABASE]
            self.symptoms_collection = self.db.symptoms
            self.remedies_collection = self.db.remedies
            self.health_metrics_collection = self.db.health_metrics
            self.chat_history_collection = self.db.chat_history
            self.diseases_collection = self.db.diseases
            
            # Initialize collections with sample data
            self._initialize_data()
            
        except Exception as e:
            logging.error(f"Database connection error: {e}")
            # Fallback to in-memory storage
            self.client = None
            self.db = None
    
    def _initialize_data(self):
        """Initialize database with sample medical data"""
        if self.db is None:
            return
            
        # Sample diseases data
        diseases_data = [
            {
                "name": "Common Cold",
                "symptoms": ["runny nose", "sneezing", "mild fever", "cough", "sore throat"],
                "probability_base": 0.85,
                "risk_level": "low",
                "description": "A viral infection affecting the upper respiratory tract"
            },
            {
                "name": "Seasonal Allergies",
                "symptoms": ["sneezing", "itchy eyes", "runny nose", "congestion"],
                "probability_base": 0.72,
                "risk_level": "low",
                "description": "Allergic reaction to seasonal allergens like pollen"
            },
            {
                "name": "Tension Headache",
                "symptoms": ["headache", "neck stiffness", "fatigue", "stress"],
                "probability_base": 0.68,
                "risk_level": "low",
                "description": "Most common type of headache caused by stress or tension"
            },
            {
                "name": "Gastroenteritis",
                "symptoms": ["nausea", "vomiting", "diarrhea", "abdominal pain", "fever"],
                "probability_base": 0.45,
                "risk_level": "medium",
                "description": "Inflammation of stomach and intestines, often viral"
            },
            {
                "name": "Hypertension",
                "symptoms": ["headache", "dizziness", "chest pain", "fatigue"],
                "probability_base": 0.35,
                "risk_level": "high",
                "description": "High blood pressure condition requiring medical attention"
            }
        ]
        
        # Sample remedies data
        remedies_data = [
            {
                "condition": "common cold",
                "title": "Natural Cold Relief",
                "ingredients": ["Honey (2 tbsp)", "Fresh ginger (1 inch)", "Lemon juice (1 tbsp)", "Warm water (1 cup)", "Turmeric powder (1/2 tsp)"],
                "instructions": [
                    "Grate fresh ginger and steep in hot water for 5 minutes",
                    "Strain the ginger tea and add honey while warm",
                    "Add fresh lemon juice and turmeric powder",
                    "Stir well and drink 2-3 times daily"
                ],
                "benefits": ["Boosts immune system", "Reduces inflammation", "Soothes throat irritation"],
                "duration": "3-5 days"
            },
            {
                "condition": "headache",
                "title": "Tension Headache Relief",
                "ingredients": ["Peppermint oil (2-3 drops)", "Lavender oil (2-3 drops)", "Carrier oil", "Cold compress"],
                "instructions": [
                    "Mix essential oils with carrier oil",
                    "Gently massage temples and forehead",
                    "Apply cold compress to forehead for 15 minutes",
                    "Rest in a dark, quiet room"
                ],
                "benefits": ["Reduces muscle tension", "Promotes relaxation", "Natural pain relief"],
                "duration": "30 minutes to 2 hours"
            }
        ]
        
        # Insert data if collections are empty
        if self.diseases_collection.count_documents({}) == 0:
            self.diseases_collection.insert_many(diseases_data)
        
        if self.remedies_collection.count_documents({}) == 0:
            self.remedies_collection.insert_many(remedies_data)
    
    def get_diseases(self):
        """Get all diseases from database"""
        if self.db is None:
            return []
        return list(self.diseases_collection.find({}, {"_id": 0}))
    
    def get_remedy(self, condition):
        """Get remedy for specific condition"""
        if self.db is None:
            return None
        return self.remedies_collection.find_one({"condition": condition.lower()}, {"_id": 0})
    
    def save_health_metrics(self, metrics_data):
        """Save health metrics to database"""
        if self.db is None:
            return False
        try:
            metrics_data['timestamp'] = datetime.now()
            self.health_metrics_collection.insert_one(metrics_data)
            return True
        except Exception as e:
            logging.error(f"Error saving health metrics: {e}")
            return False
    
    def get_health_metrics(self, limit=30):
        """Get recent health metrics"""
        if self.db is None:
            return []
        return list(self.health_metrics_collection.find({}, {"_id": 0}).sort("timestamp", -1).limit(limit))
    
    def save_chat_message(self, user_id, message, response):
        """Save chat conversation"""
        if self.db is None:
            return False
        try:
            chat_data = {
                "user_id": user_id,
                "message": message,
                "response": response,
                "timestamp": datetime.now()
            }
            self.chat_history_collection.insert_one(chat_data)
            return True
        except Exception as e:
            logging.error(f"Error saving chat message: {e}")
            return False