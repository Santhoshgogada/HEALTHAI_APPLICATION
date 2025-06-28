import { Disease, HealthMetric, HomeRemedy } from '../types';

export const mockDiseases: Disease[] = [
  {
    id: '1',
    name: 'Common Cold',
    probability: 85,
    description: 'A viral infection affecting the upper respiratory tract',
    riskLevel: 'low',
    symptoms: ['runny nose', 'sneezing', 'mild fever', 'cough'],
    recommendations: ['Rest', 'Stay hydrated', 'Use humidifier', 'Consult doctor if symptoms worsen']
  },
  {
    id: '2',
    name: 'Seasonal Allergies',
    probability: 72,
    description: 'Allergic reaction to seasonal allergens like pollen',
    riskLevel: 'low',
    symptoms: ['sneezing', 'itchy eyes', 'runny nose', 'congestion'],
    recommendations: ['Avoid allergens', 'Use antihistamines', 'Keep windows closed', 'Shower after outdoor activities']
  },
  {
    id: '3',
    name: 'Tension Headache',
    probability: 68,
    description: 'Most common type of headache caused by stress or tension',
    riskLevel: 'low',
    symptoms: ['headache', 'neck stiffness', 'fatigue'],
    recommendations: ['Rest in quiet environment', 'Apply cold/warm compress', 'Stay hydrated', 'Manage stress']
  },
  {
    id: '4',
    name: 'Gastroenteritis',
    probability: 45,
    description: 'Inflammation of stomach and intestines, often viral',
    riskLevel: 'medium',
    symptoms: ['nausea', 'vomiting', 'diarrhea', 'abdominal pain'],
    recommendations: ['Stay hydrated', 'BRAT diet', 'Rest', 'Seek medical attention if severe']
  }
];

export const mockHealthData: HealthMetric[] = [
  { date: '2024-01-01', heartRate: 72, bloodPressureSystolic: 120, bloodPressureDiastolic: 80, glucose: 95, weight: 70, temperature: 36.5 },
  { date: '2024-01-02', heartRate: 75, bloodPressureSystolic: 118, bloodPressureDiastolic: 78, glucose: 92, weight: 70.2, temperature: 36.6 },
  { date: '2024-01-03', heartRate: 68, bloodPressureSystolic: 122, bloodPressureDiastolic: 82, glucose: 88, weight: 69.8, temperature: 36.4 },
  { date: '2024-01-04', heartRate: 74, bloodPressureSystolic: 119, bloodPressureDiastolic: 79, glucose: 94, weight: 70.1, temperature: 36.5 },
  { date: '2024-01-05', heartRate: 71, bloodPressureSystolic: 121, bloodPressureDiastolic: 81, glucose: 91, weight: 70.0, temperature: 36.7 },
  { date: '2024-01-06', heartRate: 76, bloodPressureSystolic: 117, bloodPressureDiastolic: 77, glucose: 89, weight: 69.9, temperature: 36.3 },
  { date: '2024-01-07', heartRate: 73, bloodPressureSystolic: 123, bloodPressureDiastolic: 83, glucose: 93, weight: 70.3, temperature: 36.6 }
];

export const homeRemedies: { [key: string]: HomeRemedy } = {
  'common cold': {
    id: '1',
    title: 'Natural Cold Relief',
    ingredients: ['Honey (2 tbsp)', 'Fresh ginger (1 inch)', 'Lemon juice (1 tbsp)', 'Warm water (1 cup)', 'Turmeric powder (1/2 tsp)'],
    instructions: [
      'Grate fresh ginger and steep in hot water for 5 minutes',
      'Strain the ginger tea and add honey while warm',
      'Add fresh lemon juice and turmeric powder',
      'Stir well and drink 2-3 times daily',
      'Gargle with warm salt water before drinking'
    ],
    benefits: ['Boosts immune system', 'Reduces inflammation', 'Soothes throat irritation', 'Natural antibacterial properties'],
    precautions: ['Not suitable for children under 1 year (honey)', 'Consult doctor if symptoms persist beyond 7 days', 'Avoid if allergic to any ingredients'],
    duration: '3-5 days'
  },
  'headache': {
    id: '2',
    title: 'Tension Headache Relief',
    ingredients: ['Peppermint oil (2-3 drops)', 'Lavender oil (2-3 drops)', 'Carrier oil (coconut/olive)', 'Cold compress', 'Chamomile tea'],
    instructions: [
      'Mix essential oils with carrier oil',
      'Gently massage temples and forehead',
      'Apply cold compress to forehead for 15 minutes',
      'Brew chamomile tea and drink slowly',
      'Rest in a dark, quiet room'
    ],
    benefits: ['Reduces muscle tension', 'Promotes relaxation', 'Natural pain relief', 'Improves blood circulation'],
    precautions: ['Test essential oils on small skin area first', 'Avoid if pregnant without doctor approval', 'Seek medical help for severe or recurring headaches'],
    duration: '30 minutes to 2 hours'
  },
  'nausea': {
    id: '3',
    title: 'Ginger Nausea Relief',
    ingredients: ['Fresh ginger root (1 inch)', 'Mint leaves (5-6)', 'Lemon slices (2-3)', 'Hot water (2 cups)', 'Honey (optional)'],
    instructions: [
      'Slice ginger thinly and add to hot water',
      'Add mint leaves and lemon slices',
      'Steep for 10 minutes and strain',
      'Add honey if desired for taste',
      'Sip slowly throughout the day'
    ],
    benefits: ['Settles stomach', 'Reduces nausea symptoms', 'Aids digestion', 'Natural anti-inflammatory'],
    precautions: ['Start with small amounts', 'Avoid if on blood-thinning medications', 'Consult doctor if nausea persists'],
    duration: '1-2 days'
  }
};

export const commonSymptoms = [
  'headache', 'fever', 'cough', 'sore throat', 'runny nose', 'sneezing',
  'fatigue', 'body aches', 'nausea', 'vomiting', 'diarrhea', 'abdominal pain',
  'chest pain', 'shortness of breath', 'dizziness', 'skin rash', 'joint pain',
  'back pain', 'neck stiffness', 'loss of appetite', 'chills', 'sweating'
];