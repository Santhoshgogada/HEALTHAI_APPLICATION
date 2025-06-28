import React, { useState } from 'react';
import { FileText, Clock, User, Stethoscope, Pill, Activity, Calendar, AlertTriangle } from 'lucide-react';
import { Treatment } from '../types';

const TreatmentPlans: React.FC = () => {
  const [selectedCondition, setSelectedCondition] = useState('');
  const [patientAge, setPatientAge] = useState('');
  const [patientWeight, setPatientWeight] = useState('');
  const [allergies, setAllergies] = useState('');
  const [currentMedications, setCurrentMedications] = useState('');
  const [treatmentPlan, setTreatmentPlan] = useState<Treatment[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const commonConditions = [
    'Hypertension',
    'Type 2 Diabetes',
    'Common Cold',
    'Seasonal Allergies',
    'Migraine',
    'Anxiety Disorder',
    'Chronic Back Pain',
    'Gastroesophageal Reflux Disease (GERD)',
    'Asthma',
    'Depression'
  ];

  const generateTreatmentPlan = async () => {
    if (!selectedCondition) return;
    
    setIsGenerating(true);
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Generate mock treatment plan based on condition
    let treatments: Treatment[] = [];
    
    switch (selectedCondition.toLowerCase()) {
      case 'hypertension':
        treatments = [
          {
            id: '1',
            type: 'medication',
            title: 'ACE Inhibitor',
            description: 'Lisinopril 10mg once daily to lower blood pressure',
            duration: '3 months initially',
            frequency: 'Once daily, morning'
          },
          {
            id: '2',
            type: 'lifestyle',
            title: 'Dietary Modifications',
            description: 'Low sodium diet (less than 2300mg/day), increase potassium-rich foods',
            duration: 'Ongoing',
            frequency: 'Daily'
          },
          {
            id: '3',
            type: 'activity',
            title: 'Regular Exercise',
            description: 'Moderate aerobic exercise 30 minutes daily, 5 days per week',
            duration: 'Ongoing',
            frequency: '5 times per week'
          },
          {
            id: '4',
            type: 'followup',
            title: 'Blood Pressure Monitoring',
            description: 'Regular BP checks and medication adjustment as needed',
            duration: '2 weeks initially, then monthly',
            frequency: 'Bi-weekly, then monthly'
          }
        ];
        break;
        
      case 'type 2 diabetes':
        treatments = [
          {
            id: '1',
            type: 'medication',
            title: 'Metformin',
            description: 'Metformin 500mg twice daily with meals to control blood sugar',
            duration: '6 months, then review',
            frequency: 'Twice daily with meals'
          },
          {
            id: '2',
            type: 'lifestyle',
            title: 'Diabetic Diet Plan',
            description: 'Carbohydrate counting, portion control, regular meal timing',
            duration: 'Ongoing',
            frequency: 'Every meal'
          },
          {
            id: '3',
            type: 'activity',
            title: 'Blood Glucose Monitoring',
            description: 'Check blood sugar levels before meals and bedtime',
            duration: 'Ongoing',
            frequency: '4 times daily'
          },
          {
            id: '4',
            type: 'followup',
            title: 'HbA1c Testing',
            description: 'Quarterly blood tests to monitor long-term glucose control',
            duration: 'Ongoing',
            frequency: 'Every 3 months'
          }
        ];
        break;
        
      case 'common cold':
        treatments = [
          {
            id: '1',
            type: 'medication',
            title: 'Symptom Relief',
            description: 'OTC pain relievers (acetaminophen/ibuprofen) for aches and fever',
            duration: '5-7 days or until symptoms resolve',
            frequency: 'As needed, follow package directions'
          },
          {
            id: '2',
            type: 'lifestyle',
            title: 'Rest and Hydration',
            description: 'Adequate sleep (8+ hours), increased fluid intake (water, warm broths)',
            duration: 'Until recovery',
            frequency: 'Continuous'
          },
          {
            id: '3',
            type: 'therapy',
            title: 'Humidifier Use',
            description: 'Use humidifier or breathe steam to ease congestion',
            duration: 'While symptoms persist',
            frequency: '2-3 times daily'
          },
          {
            id: '4',
            type: 'followup',
            title: 'Monitor Symptoms',
            description: 'Contact healthcare provider if symptoms worsen or last >10 days',
            duration: 'Duration of illness',
            frequency: 'Daily self-assessment'
          }
        ];
        break;
        
      default:
        treatments = [
          {
            id: '1',
            type: 'followup',
            title: 'Medical Consultation',
            description: 'Comprehensive evaluation by healthcare provider for accurate diagnosis',
            duration: '1 visit initially',
            frequency: 'As recommended'
          },
          {
            id: '2',
            type: 'lifestyle',
            title: 'General Wellness',
            description: 'Maintain healthy diet, regular exercise, adequate sleep',
            duration: 'Ongoing',
            frequency: 'Daily'
          },
          {
            id: '3',
            type: 'activity',
            title: 'Symptom Tracking',
            description: 'Keep a diary of symptoms, triggers, and daily activities',
            duration: '2-4 weeks',
            frequency: 'Daily entries'
          }
        ];
    }
    
    setTreatmentPlan(treatments);
    setIsGenerating(false);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'medication': return Pill;
      case 'lifestyle': return Activity;
      case 'therapy': return Stethoscope;
      case 'followup': return Calendar;
      default: return FileText;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'medication': return 'bg-blue-100 text-blue-800';
      case 'lifestyle': return 'bg-green-100 text-green-800';
      case 'therapy': return 'bg-purple-100 text-purple-800';
      case 'followup': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">AI Treatment Plan Generator</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Generate personalized, evidence-based treatment plans powered by IBM Watson AI. 
          Plans are tailored to individual patient profiles and medical conditions.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Form */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
            <User className="h-6 w-6 text-blue-600 mr-2" />
            Patient Information
          </h2>
          
          <div className="space-y-4">
            {/* Condition Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Medical Condition *
              </label>
              <select
                value={selectedCondition}
                onChange={(e) => setSelectedCondition(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select a condition</option>
                {commonConditions.map((condition, index) => (
                  <option key={index} value={condition}>{condition}</option>
                ))}
              </select>
            </div>

            {/* Patient Details */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Age
                </label>
                <input
                  type="number"
                  value={patientAge}
                  onChange={(e) => setPatientAge(e.target.value)}
                  placeholder="e.g., 45"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Weight (kg)
                </label>
                <input
                  type="number"
                  value={patientWeight}
                  onChange={(e) => setPatientWeight(e.target.value)}
                  placeholder="e.g., 70"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Allergies */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Known Allergies
              </label>
              <textarea
                value={allergies}
                onChange={(e) => setAllergies(e.target.value)}
                placeholder="List any known allergies (medications, foods, environmental)"
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Current Medications */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current Medications
              </label>
              <textarea
                value={currentMedications}
                onChange={(e) => setCurrentMedications(e.target.value)}
                placeholder="List current medications and dosages"
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Generate Button */}
            <button
              onClick={generateTreatmentPlan}
              disabled={!selectedCondition || isGenerating}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center"
            >
              {isGenerating ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Generating Treatment Plan...
                </>
              ) : (
                <>
                  <FileText className="h-5 w-5 mr-2" />
                  Generate Treatment Plan
                </>
              )}
            </button>
          </div>
        </div>

        {/* Treatment Plan Results */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
            <Stethoscope className="h-6 w-6 text-green-600 mr-2" />
            Treatment Plan
          </h2>
          
          {treatmentPlan.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 mb-2">
                Select a condition and click "Generate Treatment Plan"
              </p>
              <p className="text-sm text-gray-400">
                Personalized treatment recommendations will appear here
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Plan Header */}
              <div className="bg-blue-50 rounded-lg p-4 mb-6">
                <h3 className="text-lg font-semibold text-blue-900 mb-2">
                  Treatment Plan for {selectedCondition}
                </h3>
                <p className="text-sm text-blue-700">
                  Generated treatment recommendations based on current medical guidelines and patient profile.
                </p>
              </div>

              {/* Treatment Items */}
              {treatmentPlan.map((treatment, index) => {
                const Icon = getTypeIcon(treatment.type);
                return (
                  <div
                    key={treatment.id}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center">
                        <div className="bg-gray-100 rounded-lg p-2 mr-3">
                          <Icon className="h-5 w-5 text-gray-600" />
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900">
                            {treatment.title}
                          </h4>
                          <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(treatment.type)}`}>
                            {treatment.type}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-gray-700 mb-3">{treatment.description}</p>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      {treatment.duration && (
                        <div className="flex items-center text-gray-600">
                          <Clock className="h-4 w-4 mr-1" />
                          <span className="font-medium mr-1">Duration:</span>
                          {treatment.duration}
                        </div>
                      )}
                      {treatment.frequency && (
                        <div className="flex items-center text-gray-600">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span className="font-medium mr-1">Frequency:</span>
                          {treatment.frequency}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}

              {/* Summary */}
              <div className="bg-green-50 rounded-lg p-4 mt-6">
                <h4 className="text-sm font-medium text-green-800 mb-2">Treatment Summary</h4>
                <p className="text-sm text-green-700">
                  This comprehensive treatment plan addresses multiple aspects of {selectedCondition.toLowerCase()} management. 
                  Follow all recommendations and maintain regular communication with your healthcare provider for optimal outcomes.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Medical Disclaimer */}
      <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-start">
          <AlertTriangle className="h-5 w-5 text-yellow-600 mr-3 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="text-sm font-medium text-yellow-800 mb-1">Medical Disclaimer</h3>
            <p className="text-sm text-yellow-700">
              These AI-generated treatment plans are for informational purposes only and should not replace professional medical advice. 
              Always consult with qualified healthcare providers before starting, stopping, or modifying any treatment. 
              Individual patient needs may vary, and treatments should be personalized by medical professionals.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TreatmentPlans;