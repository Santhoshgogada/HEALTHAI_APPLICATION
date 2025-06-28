import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    # IBM Watson Configuration
    IBM_WATSON_API_KEY = os.getenv('IBM_WATSON_API_KEY')
    IBM_WATSON_URL = os.getenv('IBM_WATSON_URL')
    IBM_WATSON_PROJECT_ID = os.getenv('IBM_WATSON_PROJECT_ID')
    
    # MongoDB Configuration
    MONGODB_URI = os.getenv('MONGODB_URI', 'mongodb://localhost:27017/')
    MONGODB_DATABASE = os.getenv('MONGODB_DATABASE', 'healthai_db')
    
    # Application Configuration
    APP_SECRET_KEY = os.getenv('APP_SECRET_KEY', 'healthai-secret-key')