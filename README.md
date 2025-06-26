# HealthAI Platform - Python Setup Instructions

## Prerequisites
- Python 3.8 or higher
- pip package manager

## Installation Steps

1. **Create a virtual environment:**
```bash
python -m venv healthai_env
source healthai_env/bin/activate  # On Windows: healthai_env\Scripts\activate
```

2. **Install required packages:**
```bash
pip install -r requirements.txt
```

3. **Set up environment variables:**
Create a `.env` file in the project root with your IBM Watson credentials:
```
IBM_WATSON_API_KEY=your_api_key_here
IBM_WATSON_URL=your_watson_url_here
IBM_WATSON_PROJECT_ID=your_project_id_here
MONGODB_URI=mongodb://localhost:27017/
MONGODB_DATABASE=healthai_db
APP_SECRET_KEY=your_secret_key_here
```

4. **Run the application:**
```bash
streamlit run app.py
```

## Features
- 🔍 AI Symptoms Checker powered by IBM Watson Granite model
- 🌿 Natural Home Remedies generator
- 💬 Patient Chat with AI assistant
- 📊 Health Analytics with interactive charts
- 📋 Treatment Plans generator
- 🗄️ MongoDB integration for data storage

## File Structure
```
healthai-platform/
├── app.py              # Main Streamlit application
├── config.py           # Configuration settings
├── database.py         # MongoDB database manager
├── watson_ai.py        # IBM Watson AI service
├── utils.py            # Utility functions
├── requirements.txt    # Python dependencies
├── .env               # Environment variables
└── README.md          # This file
```

## IBM Watson Setup
1. Create an IBM Cloud account
2. Create a Watson Machine Learning service
3. Get your API key, URL, and project ID
4. Add them to your `.env` file

## MongoDB Setup (Optional)
- Install MongoDB locally or use MongoDB Atlas
- Update the MONGODB_URI in your `.env` file
- The app will work with fallback data if MongoDB is not available

## Usage
1. Start the application with `streamlit run app.py`
2. Open your browser to `http://localhost:8501`
3. Navigate through different features using the menu
4. Enter your health information and get AI-powered insights

## Troubleshooting
- Ensure all dependencies are installed: `pip install -r requirements.txt`
- Check your IBM Watson credentials in the `.env` file
- For MongoDB issues, the app will use fallback data
- Check the console for any error messages

## Medical Disclaimer
This application is for informational purposes only and should not replace professional medical advice. Always consult with qualified healthcare providers for medical concerns.