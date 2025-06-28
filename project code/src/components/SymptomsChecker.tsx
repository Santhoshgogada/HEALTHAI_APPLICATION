import React, { useState } from 'react';
import { Search, Plus, AlertTriangle, CheckCircle, Info } from 'lucide-react';

interface Prediction {
  name: string;
  probability: number;
  riskLevel: 'low' | 'medium' | 'high';
  description: string;
  recommendations: string[];
}

const SymptomsChecker: React.FC = () => {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [customSymptom, setCustomSymptom] = useState('');
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const commonSymptoms = [
    'headache', 'fever', 'cough', 'sore throat', 'runny nose', 'sneezing',
    'fatigue', 'body aches', 'nausea', 'vomiting', 'diarrhea', 'abdominal pain',
    'chest pain', 'shortness of breath', 'dizziness', 'skin rash', 'joint pain',
    'back pain', 'neck stiffness', 'loss of appetite', 'chills', 'sweating'
  ];

  const handleSymptomToggle = (symptom: string) => {
    setSelectedSymptoms(prev =>
      prev.includes(symptom)
        ? prev.filter(s => s !== symptom)
        : [...prev, symptom]
    );
  };

  const handleAddCustomSymptom = () => {
    if (customSymptom.trim() && !selectedSymptoms.includes(customSymptom.toLowerCase())) {
      setSelectedSymptoms(prev => [...prev, customSymptom.toLowerCase()]);
      setCustomSymptom('');
    }
  };

  const analyzeSymptoms = async () => {
    if (selectedSymptoms.length === 0) return;

    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      const mockPredictions: Prediction[] = [
        {
          name: 'Common Cold',
          probability: 85,
          riskLevel: 'low',
          description: 'A viral infection of the upper respiratory tract, typically mild and self-limiting.',
          recommendations: [
            'Get plenty of rest and stay hydrated',
            'Use over-the-counter pain relievers if needed',
            'Consider warm salt water gargles for sore throat',
            'Monitor symptoms and seek medical care if they worsen'
          ]
        },
        {
          name: 'Seasonal Allergies',
          probability: 65,
          riskLevel: 'low',
          description: 'Allergic reaction to environmental allergens like pollen, dust, or pet dander.',
          recommendations: [
            'Avoid known allergens when possible',
            'Consider antihistamines for symptom relief',
            'Keep windows closed during high pollen days',
            'Consult an allergist for comprehensive testing'
          ]
        },
        {
          name: 'Viral Gastroenteritis',
          probability: 45,
          riskLevel: 'medium',
          description: 'Inflammation of the stomach and intestines caused by a viral infection.',
          recommendations: [
            'Stay hydrated with clear fluids',
            'Follow the BRAT diet (bananas, rice, applesauce, toast)',
            'Rest and avoid dairy products temporarily',
            'Seek medical attention if symptoms persist beyond 3 days'
          ]
        }
      ];

      setPredictions(mockPredictions);
      setIsAnalyzing(false);
    }, 2000);
  };

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'low': return 'border-green-400 bg-green-50';
      case 'medium': return 'border-yellow-400 bg-yellow-50';
      case 'high': return 'border-red-400 bg-red-50';
      default: return 'border-gray-400 bg-gray-50';
    }
  };

  const getRiskIcon = (riskLevel: string) => {
    switch (riskLevel) {
      case 'low': return <CheckCircle className="text-green-500" size={20} />;
      case 'medium': return <Info className="text-yellow-500" size={20} />;
      case 'high': return <AlertTriangle className="text-red-500" size={20} />;
      default: return <Info className="text-gray-500" size={20} />;
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Symptoms Selection */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <Search className="text-blue-500" />
          Select Your Symptoms
        </h2>

        {/* Common Symptoms Grid */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">Common Symptoms</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {commonSymptoms.map((symptom) => (
              <button
                key={symptom}
                onClick={() => handleSymptomToggle(symptom)}
                className={`p-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  selectedSymptoms.includes(symptom)
                    ? 'bg-blue-500 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {symptom.charAt(0).toUpperCase() + symptom.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Custom Symptom Input */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">Add Custom Symptom</h3>
          <div className="flex gap-2">
            <input
              type="text"
              value={customSymptom}
              onChange={(e) => setCustomSymptom(e.target.value)}
              placeholder="Enter a custom symptom..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              onKeyPress={(e) => e.key === 'Enter' && handleAddCustomSymptom()}
            />
            <button
              onClick={handleAddCustomSymptom}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 flex items-center gap-1"
            >
              <Plus size={16} />
              Add
            </button>
          </div>
        </div>

        {/* Selected Symptoms */}
        {selectedSymptoms.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">Selected Symptoms</h3>
            <div className="flex flex-wrap gap-2">
              {selectedSymptoms.map((symptom) => (
                <span
                  key={symptom}
                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1"
                >
                  {symptom.charAt(0).toUpperCase() + symptom.slice(1)}
                  <button
                    onClick={() => handleSymptomToggle(symptom)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Analyze Button */}
        <button
          onClick={analyzeSymptoms}
          disabled={selectedSymptoms.length === 0 || isAnalyzing}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isAnalyzing ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              Analyzing with AI...
            </>
          ) : (
            <>
              <Search size={20} />
              Analyze Symptoms
            </>
          )}
        </button>
      </div>

      {/* Analysis Results */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">AI Analysis Results</h2>

        {predictions.length > 0 ? (
          <div className="space-y-4">
            {predictions.map((prediction, index) => (
              <div
                key={index}
                className={`border-l-4 rounded-lg p-4 ${getRiskColor(prediction.riskLevel)}`}
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {prediction.name}
                  </h3>
                  <div className="flex items-center gap-2">
                    {getRiskIcon(prediction.riskLevel)}
                    <span className="text-sm font-medium text-gray-600">
                      {prediction.probability}%
                    </span>
                  </div>
                </div>
                
                <p className="text-gray-700 mb-3">{prediction.description}</p>
                
                <div className="mb-2">
                  <span className="text-sm font-medium text-gray-600">
                    Risk Level: {prediction.riskLevel.charAt(0).toUpperCase() + prediction.riskLevel.slice(1)}
                  </span>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">Recommendations:</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                    {prediction.recommendations.map((rec, recIndex) => (
                      <li key={recIndex}>{rec}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 py-12">
            <Search className="mx-auto mb-4 text-gray-400" size={48} />
            <p className="text-lg">Select symptoms and click "Analyze Symptoms" to see AI predictions.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SymptomsChecker;