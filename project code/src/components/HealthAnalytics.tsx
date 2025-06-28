import React, { useState } from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  TrendingUp, 
  TrendingDown, 
  Heart, 
  Activity, 
  Thermometer, 
  Weight,
  Droplet,
  Calendar
} from 'lucide-react';
import { mockHealthData } from '../data/mockData';

const HealthAnalytics: React.FC = () => {
  const [selectedMetric, setSelectedMetric] = useState('heartRate');
  const [timeRange, setTimeRange] = useState('7days');

  const metrics = [
    {
      id: 'heartRate',
      name: 'Heart Rate',
      icon: Heart,
      color: '#ef4444',
      unit: 'bpm',
      normalRange: '60-100',
      current: mockHealthData[mockHealthData.length - 1]?.heartRate || 0
    },
    {
      id: 'bloodPressure',
      name: 'Blood Pressure',
      icon: Activity,
      color: '#3b82f6',
      unit: 'mmHg',
      normalRange: '120/80',
      current: `${mockHealthData[mockHealthData.length - 1]?.bloodPressureSystolic || 0}/${mockHealthData[mockHealthData.length - 1]?.bloodPressureDiastolic || 0}`
    },
    {
      id: 'glucose',
      name: 'Blood Glucose',
      icon: Droplet,
      color: '#10b981',
      unit: 'mg/dL',
      normalRange: '70-100',
      current: mockHealthData[mockHealthData.length - 1]?.glucose || 0
    },
    {
      id: 'weight',
      name: 'Weight',
      icon: Weight,
      color: '#f59e0b',
      unit: 'kg',
      normalRange: 'BMI 18.5-24.9',
      current: mockHealthData[mockHealthData.length - 1]?.weight || 0
    },
    {
      id: 'temperature',
      name: 'Temperature',
      icon: Thermometer,
      color: '#8b5cf6',
      unit: '°C',
      normalRange: '36.1-37.2',
      current: mockHealthData[mockHealthData.length - 1]?.temperature || 0
    }
  ];

  const getChartData = () => {
    switch (selectedMetric) {
      case 'heartRate':
        return mockHealthData.map(d => ({ date: d.date, value: d.heartRate }));
      case 'bloodPressure':
        return mockHealthData.map(d => ({ 
          date: d.date, 
          systolic: d.bloodPressureSystolic, 
          diastolic: d.bloodPressureDiastolic 
        }));
      case 'glucose':
        return mockHealthData.map(d => ({ date: d.date, value: d.glucose }));
      case 'weight':
        return mockHealthData.map(d => ({ date: d.date, value: d.weight }));
      case 'temperature':
        return mockHealthData.map(d => ({ date: d.date, value: d.temperature }));
      default:
        return [];
    }
  };

  const getCurrentMetric = () => metrics.find(m => m.id === selectedMetric);
  const currentMetric = getCurrentMetric();

  const getTrend = () => {
    const data = getChartData();
    if (data.length < 2) return { direction: 'stable', percentage: 0 };
    
    const current = selectedMetric === 'bloodPressure' 
      ? data[data.length - 1].systolic 
      : data[data.length - 1].value;
    const previous = selectedMetric === 'bloodPressure' 
      ? data[data.length - 2].systolic 
      : data[data.length - 2].value;
    
    const change = ((current - previous) / previous * 100);
    
    return {
      direction: change > 2 ? 'up' : change < -2 ? 'down' : 'stable',
      percentage: Math.abs(change).toFixed(1)
    };
  };

  const trend = getTrend();

  const healthInsights = [
    {
      title: 'Heart Rate Variability',
      insight: 'Your heart rate shows good variability, indicating healthy cardiovascular fitness.',
      type: 'positive'
    },
    {
      title: 'Blood Pressure Trends',
      insight: 'Blood pressure readings are within normal range. Continue maintaining a healthy lifestyle.',
      type: 'positive'
    },
    {
      title: 'Glucose Stability',
      insight: 'Blood glucose levels are stable and within healthy parameters.',
      type: 'positive'
    },
    {
      title: 'Weight Management',
      insight: 'Weight is stable. Consider tracking diet and exercise for optimal health.',
      type: 'neutral'
    }
  ];

  const riskDistribution = [
    { name: 'Low Risk', value: 70, color: '#10b981' },
    { name: 'Medium Risk', value: 25, color: '#f59e0b' },
    { name: 'High Risk', value: 5, color: '#ef4444' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Health Analytics Dashboard</h1>
        <p className="text-lg text-gray-600">
          Monitor your health metrics and gain AI-powered insights into your wellness trends
        </p>
      </div>

      {/* Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          const isSelected = selectedMetric === metric.id;
          
          return (
            <div
              key={metric.id}
              onClick={() => setSelectedMetric(metric.id)}
              className={`bg-white rounded-xl shadow-lg p-4 cursor-pointer transition-all duration-200 ${
                isSelected ? 'ring-2 ring-blue-500 shadow-xl' : 'hover:shadow-xl'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <Icon className="h-6 w-6" style={{ color: metric.color }} />
                {trend.direction !== 'stable' && selectedMetric === metric.id && (
                  <div className={`flex items-center text-sm ${
                    trend.direction === 'up' ? 'text-red-500' : 'text-green-500'
                  }`}>
                    {trend.direction === 'up' ? (
                      <TrendingUp className="h-4 w-4 mr-1" />
                    ) : (
                      <TrendingDown className="h-4 w-4 mr-1" />
                    )}
                    {trend.percentage}%
                  </div>
                )}
              </div>
              <h3 className="text-sm font-medium text-gray-700 mb-1">{metric.name}</h3>
              <p className="text-2xl font-bold text-gray-900 mb-1">
                {metric.current} <span className="text-sm font-normal text-gray-500">{metric.unit}</span>
              </p>
              <p className="text-xs text-gray-500">Normal: {metric.normalRange}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              {currentMetric?.name} Trends
            </h2>
            <div className="flex space-x-2">
              {['7days', '30days', '90days'].map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-3 py-1 text-sm rounded-lg ${
                    timeRange === range 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {range === '7days' ? '7 Days' : range === '30days' ? '30 Days' : '90 Days'}
                </button>
              ))}
            </div>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              {selectedMetric === 'bloodPressure' ? (
                <LineChart data={getChartData()}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="date" 
                    tickFormatter={(value) => new Date(value).toLocaleDateString()} 
                  />
                  <YAxis />
                  <Tooltip 
                    labelFormatter={(value) => new Date(value).toLocaleDateString()}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="systolic" 
                    stroke="#3b82f6" 
                    strokeWidth={2}
                    name="Systolic"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="diastolic" 
                    stroke="#ef4444" 
                    strokeWidth={2}
                    name="Diastolic"
                  />
                </LineChart>
              ) : (
                <LineChart data={getChartData()}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="date" 
                    tickFormatter={(value) => new Date(value).toLocaleDateString()} 
                  />
                  <YAxis />
                  <Tooltip 
                    labelFormatter={(value) => new Date(value).toLocaleDateString()}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke={currentMetric?.color} 
                    strokeWidth={2}
                  />
                </LineChart>
              )}
            </ResponsiveContainer>
          </div>
        </div>

        {/* Risk Assessment */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Risk Assessment</h2>
          
          <div className="h-48 mb-4">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={riskDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {riskDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value}%`} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-2">
            {riskDistribution.map((risk, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div 
                    className="w-3 h-3 rounded-full mr-2" 
                    style={{ backgroundColor: risk.color }}
                  ></div>
                  <span className="text-sm text-gray-700">{risk.name}</span>
                </div>
                <span className="text-sm font-medium">{risk.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Health Insights */}
      <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">AI Health Insights</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {healthInsights.map((insight, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg border-l-4 ${
                insight.type === 'positive'
                  ? 'bg-green-50 border-green-400'
                  : insight.type === 'warning'
                  ? 'bg-yellow-50 border-yellow-400'
                  : 'bg-blue-50 border-blue-400'
              }`}
            >
              <h3 className="font-medium text-gray-900 mb-2">{insight.title}</h3>
              <p className="text-sm text-gray-600">{insight.insight}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
        <h2 className="text-xl font-semibold mb-4">Recommended Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white bg-opacity-10 rounded-lg p-4">
            <Calendar className="h-6 w-6 mb-2" />
            <h3 className="font-medium mb-1">Schedule Checkup</h3>
            <p className="text-sm opacity-90">Book your next health screening</p>
          </div>
          <div className="bg-white bg-opacity-10 rounded-lg p-4">
            <Activity className="h-6 w-6 mb-2" />
            <h3 className="font-medium mb-1">Increase Activity</h3>
            <p className="text-sm opacity-90">Add 30 minutes of daily exercise</p>
          </div>
          <div className="bg-white bg-opacity-10 rounded-lg p-4">
            <Heart className="h-6 w-6 mb-2" />
            <h3 className="font-medium mb-1">Monitor Closely</h3>
            <p className="text-sm opacity-90">Track metrics daily for better insights</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthAnalytics;