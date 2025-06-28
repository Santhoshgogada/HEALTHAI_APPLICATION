import requests
import json
from config import Config
import logging
from typing import List, Dict, Any

class WatsonAIService:
    def __init__(self):
        self.api_key = Config.IBM_WATSON_API_KEY
        self.url = Config.IBM_WATSON_URL
        self.project_id = Config.IBM_WATSON_PROJECT_ID
        self.access_token = None
        
        if self.api_key and self.url:
            self._get_access_token()
    
    def _get_access_token(self):
        """Get IBM Watson access token"""
        try:
            token_url = "https://iam.cloud.ibm.com/identity/token"
            headers = {"Content-Type": "application/x-www-form-urlencoded"}
            data = {
                "grant_type": "urn:iam:params:oauth:grant-type:apikey",
                "apikey": self.api_key
            }
            
            response = requests.post(token_url, headers=headers, data=data)
            if response.status_code == 200:
                self.access_token = response.json().get("access_token")
                return True
            else:
                logging.error(f"Failed to get access token: {response.status_code}")
                return False
        except Exception as e:
            logging.error(f"Error getting access token: {e}")
            return False
    
    def predict_disease(self, symptoms: List[str]) -> List[Dict[str, Any]]:
        """Predict diseases based on symptoms using Watson AI"""
        if not self.access_token:
            return self._fallback_disease_prediction(symptoms)
        
        try:
            # Prepare the prompt for Granite model
            symptoms_text = ", ".join(symptoms)
            prompt = f"""
            Based on the following symptoms: {symptoms_text}
            
            Please analyze and provide potential medical conditions with:
            1. Condition name
            2. Probability percentage (0-100)
            3. Risk level (low/medium/high)
            4. Brief description
            5. Recommendations
            
            Format as JSON array.
            """
            
            headers = {
                "Authorization": f"Bearer {self.access_token}",
                "Content-Type": "application/json"
            }
            
            payload = {
                "input": prompt,
                "parameters": {
                    "max_new_tokens": 500,
                    "temperature": 0.3
                },
                "model_id": "ibm/granite-13b-instruct-v2",
                "project_id": self.project_id
            }
            
            response = requests.post(
                f"{self.url}/ml/v1/text/generation",
                headers=headers,
                json=payload
            )
            
            if response.status_code == 200:
                result = response.json()
                # Parse the AI response and return structured data
                return self._parse_disease_prediction(result.get("results", [{}])[0].get("generated_text", ""))
            else:
                logging.error(f"Watson AI request failed: {response.status_code}")
                return self._fallback_disease_prediction(symptoms)
                
        except Exception as e:
            logging.error(f"Error in disease prediction: {e}")
            return self._fallback_disease_prediction(symptoms)
    
    def generate_remedy(self, condition: str) -> Dict[str, Any]:
        """Generate home remedy using Watson AI"""
        if not self.access_token:
            return self._fallback_remedy_generation(condition)
        
        try:
            prompt = f"""
            Generate a natural home remedy for {condition}.
            
            Please provide:
            1. Title
            2. List of ingredients
            3. Step-by-step instructions
            4. Benefits
            5. Precautions
            6. Duration of treatment
            
            Format as JSON.
            """
            
            headers = {
                "Authorization": f"Bearer {self.access_token}",
                "Content-Type": "application/json"
            }
            
            payload = {
                "input": prompt,
                "parameters": {
                    "max_new_tokens": 600,
                    "temperature": 0.3
                },
                "model_id": "ibm/granite-13b-instruct-v2",
                "project_id": self.project_id
            }
            
            response = requests.post(
                f"{self.url}/ml/v1/text/generation",
                headers=headers,
                json=payload
            )
            
            if response.status_code == 200:
                result = response.json()
                return self._parse_remedy_response(result.get("results", [{}])[0].get("generated_text", ""))
            else:
                return self._fallback_remedy_generation(condition)
                
        except Exception as e:
            logging.error(f"Error in remedy generation: {e}")
            return self._fallback_remedy_generation(condition)
    
    def chat_response(self, message: str) -> str:
        """Generate chat response using Watson AI"""
        if not self.access_token:
            return self._fallback_chat_response(message)
        
        try:
            prompt = f"""
            You are a helpful medical AI assistant. A patient asks: "{message}"
            
            Provide a helpful, empathetic response that:
            1. Addresses their concern
            2. Provides general medical information
            3. Includes appropriate disclaimers
            4. Suggests when to seek professional help
            
            Keep the response conversational and supportive.
            """
            
            headers = {
                "Authorization": f"Bearer {self.access_token}",
                "Content-Type": "application/json"
            }
            
            payload = {
                "input": prompt,
                "parameters": {
                    "max_new_tokens": 400,
                    "temperature": 0.5
                },
                "model_id": "ibm/granite-13b-instruct-v2",
                "project_id": self.project_id
            }
            
            response = requests.post(
                f"{self.url}/ml/v1/text/generation",
                headers=headers,
                json=payload
            )
            
            if response.status_code == 200:
                result = response.json()
                return result.get("results", [{}])[0].get("generated_text", "").strip()
            else:
                return self._fallback_chat_response(message)
                
        except Exception as e:
            logging.error(f"Error in chat response: {e}")
            return self._fallback_chat_response(message)
    
    def _fallback_disease_prediction(self, symptoms: List[str]) -> List[Dict[str, Any]]:
        """Fallback disease prediction when Watson AI is not available"""
        # Simple rule-based prediction
        predictions = []
        
        if any(s in symptoms for s in ["runny nose", "sneezing", "cough"]):
            predictions.append({
                "name": "Common Cold",
                "probability": 85,
                "risk_level": "low",
                "description": "Viral infection of the upper respiratory tract",
                "recommendations": ["Rest", "Stay hydrated", "Use humidifier"]
            })
        
        if any(s in symptoms for s in ["headache", "fatigue", "stress"]):
            predictions.append({
                "name": "Tension Headache",
                "probability": 70,
                "risk_level": "low",
                "description": "Common headache caused by stress or tension",
                "recommendations": ["Rest", "Apply cold compress", "Manage stress"]
            })
        
        return predictions
    
    def _fallback_remedy_generation(self, condition: str) -> Dict[str, Any]:
        """Fallback remedy generation"""
        remedies = {
            "common cold": {
                "title": "Natural Cold Relief",
                "ingredients": ["Honey", "Ginger", "Lemon", "Warm water"],
                "instructions": ["Mix ingredients", "Drink warm", "Rest well"],
                "benefits": ["Boosts immunity", "Soothes throat"],
                "precautions": ["Consult doctor if symptoms persist"],
                "duration": "3-5 days"
            }
        }
        
        return remedies.get(condition.lower(), {
            "title": f"Natural remedy for {condition}",
            "ingredients": ["Consult healthcare provider"],
            "instructions": ["Seek professional medical advice"],
            "benefits": ["Professional guidance"],
            "precautions": ["Always consult healthcare provider"],
            "duration": "As advised by doctor"
        })
    
    def _fallback_chat_response(self, message: str) -> str:
        """Fallback chat response"""
        return f"Thank you for your question about '{message}'. While I can provide general health information, I recommend consulting with a qualified healthcare provider for personalized medical advice. Is there anything specific about general health and wellness I can help you with?"
    
    def _parse_disease_prediction(self, ai_response: str) -> List[Dict[str, Any]]:
        """Parse AI response for disease prediction"""
        try:
            # Try to extract JSON from the response
            import re
            json_match = re.search(r'\[.*\]', ai_response, re.DOTALL)
            if json_match:
                return json.loads(json_match.group())
        except:
            pass
        
        # Fallback parsing
        return self._fallback_disease_prediction([])
    
    def _parse_remedy_response(self, ai_response: str) -> Dict[str, Any]:
        """Parse AI response for remedy generation"""
        try:
            # Try to extract JSON from the response
            import re
            json_match = re.search(r'\{.*\}', ai_response, re.DOTALL)
            if json_match:
                return json.loads(json_match.group())
        except:
            pass
        
        # Fallback
        return self._fallback_remedy_generation("general")