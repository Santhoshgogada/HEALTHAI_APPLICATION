import pandas as pd
import numpy as np
import plotly.graph_objects as go
import plotly.express as px
from datetime import datetime, timedelta
import streamlit as st

def generate_sample_health_data(days=30):
    """Generate sample health metrics data"""
    dates = [datetime.now() - timedelta(days=i) for i in range(days, 0, -1)]
    
    # Generate realistic health data with some variation
    np.random.seed(42)
    
    data = {
        'date': dates,
        'heart_rate': np.random.normal(72, 8, days).astype(int),
        'systolic_bp': np.random.normal(120, 10, days).astype(int),
        'diastolic_bp': np.random.normal(80, 8, days).astype(int),
        'glucose': np.random.normal(95, 12, days).astype(int),
        'weight': np.random.normal(70, 2, days).round(1),
        'temperature': np.random.normal(36.5, 0.3, days).round(1)
    }
    
    return pd.DataFrame(data)

def create_health_chart(data, metric, title):
    """Create interactive health metric chart"""
    fig = go.Figure()
    
    fig.add_trace(go.Scatter(
        x=data['date'],
        y=data[metric],
        mode='lines+markers',
        name=title,
        line=dict(color='#0066CC', width=3),
        marker=dict(size=6, color='#0066CC')
    ))
    
    fig.update_layout(
        title=title,
        xaxis_title='Date',
        yaxis_title=get_metric_unit(metric),
        template='plotly_white',
        height=400,
        showlegend=False
    )
    
    return fig

def get_metric_unit(metric):
    """Get unit for health metric"""
    units = {
        'heart_rate': 'BPM',
        'systolic_bp': 'mmHg',
        'diastolic_bp': 'mmHg',
        'glucose': 'mg/dL',
        'weight': 'kg',
        'temperature': '°C'
    }
    return units.get(metric, '')

def create_risk_pie_chart():
    """Create risk assessment pie chart"""
    labels = ['Low Risk', 'Medium Risk', 'High Risk']
    values = [70, 25, 5]
    colors = ['#10B981', '#F59E0B', '#EF4444']
    
    fig = go.Figure(data=[go.Pie(
        labels=labels,
        values=values,
        hole=0.4,
        marker_colors=colors
    )])
    
    fig.update_layout(
        title="Health Risk Assessment",
        height=400,
        showlegend=True
    )
    
    return fig

def format_symptoms_for_display(symptoms):
    """Format symptoms list for display"""
    if not symptoms:
        return "No symptoms selected"
    return ", ".join([s.title() for s in symptoms])

def get_risk_color(risk_level):
    """Get color for risk level"""
    colors = {
        'low': '#10B981',
        'medium': '#F59E0B',
        'high': '#EF4444'
    }
    return colors.get(risk_level.lower(), '#6B7280')

def validate_health_input(value, metric_type):
    """Validate health metric input"""
    ranges = {
        'heart_rate': (40, 200),
        'systolic_bp': (70, 250),
        'diastolic_bp': (40, 150),
        'glucose': (50, 400),
        'weight': (20, 300),
        'temperature': (35, 42)
    }
    
    if metric_type in ranges:
        min_val, max_val = ranges[metric_type]
        return min_val <= value <= max_val
    
    return True

def calculate_bmi(weight, height):
    """Calculate BMI"""
    if weight > 0 and height > 0:
        bmi = weight / ((height / 100) ** 2)
        return round(bmi, 1)
    return 0

def get_bmi_category(bmi):
    """Get BMI category"""
    if bmi < 18.5:
        return "Underweight"
    elif bmi < 25:
        return "Normal weight"
    elif bmi < 30:
        return "Overweight"
    else:
        return "Obese"

def format_chat_message(message, is_user=True):
    """Format chat message for display"""
    if is_user:
        return f"**You:** {message}"
    else:
        return f"**HealthAI:** {message}"