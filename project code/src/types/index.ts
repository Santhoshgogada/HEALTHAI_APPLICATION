export interface Symptom {
  id: string;
  name: string;
  severity: 'mild' | 'moderate' | 'severe';
}

export interface Disease {
  id: string;
  name: string;
  probability: number;
  description: string;
  riskLevel: 'low' | 'medium' | 'high';
  symptoms: string[];
  recommendations: string[];
}

export interface Treatment {
  id: string;
  type: 'medication' | 'lifestyle' | 'therapy' | 'followup';
  title: string;
  description: string;
  duration?: string;
  frequency?: string;
}

export interface HealthMetric {
  date: string;
  heartRate: number;
  bloodPressureSystolic: number;
  bloodPressureDiastolic: number;
  glucose: number;
  weight: number;
  temperature: number;
}

export interface ChatMessage {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

export interface HomeRemedy {
  id: string;
  title: string;
  ingredients: string[];
  instructions: string[];
  benefits: string[];
  precautions: string[];
  duration: string;
}