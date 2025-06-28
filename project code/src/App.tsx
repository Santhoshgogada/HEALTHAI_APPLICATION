import React, { useState } from 'react';
import Navigation from './components/Navigation';
import Home from './components/Home';
import SymptomsChecker from './components/SymptomsChecker';
import HomeRemedies from './components/HomeRemedies';
import PatientChat from './components/PatientChat';
import HealthAnalytics from './components/HealthAnalytics';
import TreatmentPlans from './components/TreatmentPlans';

function App() {
  const [activeTab, setActiveTab] = useState('home');

  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'home':
        return <Home />;
      case 'symptoms':
        return <SymptomsChecker />;
      case 'remedies':
        return <HomeRemedies />;
      case 'chat':
        return <PatientChat />;
      case 'analytics':
        return <HealthAnalytics />;
      case 'treatment':
        return <TreatmentPlans />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            🏥 HealthAI Platform
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Intelligent Healthcare Assistance Powered by Advanced AI Technology
          </p>
        </div>

        {/* Navigation */}
        <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Main Content */}
        <div className="mt-8">
          {renderActiveComponent()}
        </div>

        {/* Footer */}
        <footer className="mt-16 text-center text-gray-500 border-t pt-8">
          <p className="mb-2">⚠️ <strong>Medical Disclaimer:</strong> This AI platform is for informational purposes only and should not replace professional medical advice.</p>
          <p>Always consult with qualified healthcare providers for medical concerns.</p>
        </footer>
      </div>
    </div>
  );
}

export default App;