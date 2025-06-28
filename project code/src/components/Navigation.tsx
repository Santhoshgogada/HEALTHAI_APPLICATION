import React from 'react';
import { Home, Search, Leaf, MessageCircle, BarChart3, ClipboardPlus } from 'lucide-react';

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'symptoms', label: 'Symptoms Checker', icon: Search },
    { id: 'remedies', label: 'Home Remedies', icon: Leaf },
    { id: 'chat', label: 'Patient Chat', icon: MessageCircle },
    { id: 'analytics', label: 'Health Analytics', icon: BarChart3 },
    { id: 'treatment', label: 'Treatment Plans', icon: ClipboardPlus },
  ];

  return (
    <nav className="bg-white rounded-2xl shadow-lg p-2">
      <div className="flex flex-wrap justify-center gap-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                activeTab === item.id
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg transform scale-105'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-blue-600'
              }`}
            >
              <Icon size={18} />
              <span className="hidden sm:inline">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default Navigation;