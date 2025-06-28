import React, { useState } from 'react';
import { Search, Clock, Leaf, AlertTriangle, CheckCircle, Info } from 'lucide-react';
import { homeRemedies } from '../data/mockData';
import { HomeRemedy } from '../types';

const HomeRemedies: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRemedy, setSelectedRemedy] = useState<HomeRemedy | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  const commonConditions = [
    'common cold', 'headache', 'nausea', 'sore throat', 'cough', 
    'stomach ache', 'insomnia', 'stress', 'anxiety', 'fatigue'
  ];

  const handleSearch = async (condition: string) => {
    if (!condition.trim()) return;
    
    setIsSearching(true);
    setSelectedRemedy(null);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const foundRemedy = homeRemedies[condition.toLowerCase()];
    if (foundRemedy) {
      setSelectedRemedy(foundRemedy);
    } else {
      // Generate a generic remedy for demonstration
      setSelectedRemedy({
        id: 'generic',
        title: `Natural Relief for ${condition}`,
        ingredients: ['Warm water (1 cup)', 'Honey (1 tbsp)', 'Lemon juice (1 tsp)', 'Fresh herbs (optional)'],
        instructions: [
          'Mix warm water with honey until dissolved',
          'Add fresh lemon juice and stir well',
          'Add herbs if desired for additional benefits',
          'Consume slowly 2-3 times daily',
          'Rest and stay hydrated'
        ],
        benefits: ['Natural healing properties', 'Boosts immune system', 'Reduces inflammation', 'Promotes recovery'],
        precautions: ['Consult healthcare provider if symptoms persist', 'Avoid if allergic to any ingredients', 'Not suitable for infants under 12 months'],
        duration: '2-3 days'
      });
    }
    
    setIsSearching(false);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Natural Home Remedies</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Discover evidence-based natural remedies for common health conditions. 
          These time-tested solutions complement professional medical care.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Search Section */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
            <Leaf className="h-6 w-6 text-green-600 mr-2" />
            Find Natural Remedies
          </h2>
          
          {/* Search Input */}
          <div className="mb-6">
            <div className="flex">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch(searchTerm)}
                placeholder="Enter a condition (e.g., common cold, headache)"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <button
                onClick={() => handleSearch(searchTerm)}
                disabled={!searchTerm.trim() || isSearching}
                className="ml-3 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200 flex items-center"
              >
                {isSearching ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  <Search className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {/* Common Conditions */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-3">Common Conditions:</h3>
            <div className="grid grid-cols-2 gap-2">
              {commonConditions.map((condition, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setSearchTerm(condition);
                    handleSearch(condition);
                  }}
                  className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-green-50 hover:border-green-300 transition-colors duration-200 text-left"
                >
                  {condition}
                </button>
              ))}
            </div>
          </div>

          {/* Featured Tips */}
          <div className="mt-8 p-4 bg-green-50 rounded-lg">
            <h3 className="text-sm font-medium text-green-800 mb-2 flex items-center">
              <Info className="h-4 w-4 mr-1" />
              Natural Healing Tips
            </h3>
            <ul className="text-sm text-green-700 space-y-1">
              <li>• Stay hydrated with warm water and herbal teas</li>
              <li>• Get adequate rest to support your immune system</li>
              <li>• Use fresh, organic ingredients when possible</li>
              <li>• Listen to your body and adjust remedies as needed</li>
            </ul>
          </div>
        </div>

        {/* Results Section */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Remedy Details
          </h2>
          
          {!selectedRemedy ? (
            <div className="text-center py-12">
              <Leaf className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 mb-2">
                Search for a condition to discover natural remedies
              </p>
              <p className="text-sm text-gray-400">
                Enter a health condition in the search box to get started
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Title and Duration */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {selectedRemedy.title}
                </h3>
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="h-4 w-4 mr-1" />
                  Treatment Duration: {selectedRemedy.duration}
                </div>
              </div>

              {/* Ingredients */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">
                  Ingredients
                </h4>
                <ul className="space-y-2">
                  {selectedRemedy.ingredients.map((ingredient, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-1 flex-shrink-0" />
                      <span className="text-gray-700">{ingredient}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Instructions */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">
                  Instructions
                </h4>
                <ol className="space-y-2">
                  {selectedRemedy.instructions.map((instruction, index) => (
                    <li key={index} className="flex items-start">
                      <span className="bg-green-100 text-green-800 text-sm font-medium rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                        {index + 1}
                      </span>
                      <span className="text-gray-700">{instruction}</span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Benefits */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">
                  Benefits
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedRemedy.benefits.map((benefit, index) => (
                    <div key={index} className="bg-green-50 px-3 py-2 rounded-lg">
                      <span className="text-green-800 text-sm">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Precautions */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h4 className="text-sm font-medium text-yellow-800 mb-2 flex items-center">
                  <AlertTriangle className="h-4 w-4 mr-1" />
                  Precautions
                </h4>
                <ul className="text-sm text-yellow-700 space-y-1">
                  {selectedRemedy.precautions.map((precaution, index) => (
                    <li key={index}>• {precaution}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Disclaimer */}
      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start">
          <Info className="h-5 w-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="text-sm font-medium text-blue-800 mb-1">Important Note</h3>
            <p className="text-sm text-blue-700">
              These natural remedies are complementary to professional medical care and should not replace proper medical treatment. 
              Always consult with a healthcare provider for serious conditions or if symptoms persist or worsen.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeRemedies;