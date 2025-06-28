import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Heart, Clock, AlertTriangle } from 'lucide-react';
import { ChatMessage } from '../types';

const PatientChat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'ai',
      content: "Hello! I'm your HealthAI assistant. I'm here to help answer your health-related questions and provide general medical information. How can I assist you today?",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Common health questions and responses
    if (lowerMessage.includes('headache') || lowerMessage.includes('head pain')) {
      return "Headaches can have various causes including tension, stress, dehydration, or lack of sleep. For tension headaches, try resting in a quiet, dark room, applying a cold or warm compress, staying hydrated, and managing stress. If headaches are severe, frequent, or accompanied by other symptoms like fever, vision changes, or neck stiffness, please consult a healthcare provider immediately.";
    }
    
    if (lowerMessage.includes('fever') || lowerMessage.includes('temperature')) {
      return "A fever is your body's natural response to infection. For adults, a fever is generally considered 100.4°F (38°C) or higher. Stay hydrated, rest, and you can use over-the-counter fever reducers if comfortable. Seek immediate medical attention if fever exceeds 103°F (39.4°C), lasts more than 3 days, or is accompanied by severe symptoms like difficulty breathing, chest pain, or persistent vomiting.";
    }
    
    if (lowerMessage.includes('cough') || lowerMessage.includes('coughing')) {
      return "Coughs can be caused by viral infections, allergies, or irritants. Stay hydrated, use a humidifier, and honey can help soothe throat irritation (not for children under 1 year). See a doctor if your cough lasts more than 3 weeks, produces blood, or is accompanied by high fever, difficulty breathing, or chest pain.";
    }
    
    if (lowerMessage.includes('chest pain') || lowerMessage.includes('heart')) {
      return "Chest pain can range from minor issues to serious medical emergencies. If you're experiencing severe chest pain, especially with shortness of breath, nausea, sweating, or pain radiating to arms, neck, or jaw, seek emergency medical care immediately. For mild chest discomfort, it could be related to muscle strain, acid reflux, or anxiety, but it's always best to have chest pain evaluated by a healthcare professional.";
    }
    
    if (lowerMessage.includes('stress') || lowerMessage.includes('anxiety')) {
      return "Stress and anxiety are common but manageable. Try deep breathing exercises, regular physical activity, adequate sleep, and mindfulness practices. Limit caffeine and alcohol, and consider talking to friends, family, or a counselor. If anxiety significantly impacts your daily life or you have thoughts of self-harm, please reach out to a mental health professional or crisis hotline immediately.";
    }
    
    if (lowerMessage.includes('sleep') || lowerMessage.includes('insomnia')) {
      return "Good sleep hygiene is crucial for health. Maintain a consistent sleep schedule, create a comfortable sleep environment, avoid screens before bedtime, and limit caffeine late in the day. Regular exercise can help, but not close to bedtime. If sleep problems persist for more than a few weeks or significantly impact your daily functioning, consider consulting a healthcare provider.";
    }
    
    if (lowerMessage.includes('diet') || lowerMessage.includes('nutrition')) {
      return "A balanced diet includes a variety of fruits, vegetables, whole grains, lean proteins, and healthy fats. Stay hydrated, limit processed foods, sugar, and excessive sodium. Portion control is important. If you have specific dietary concerns, medical conditions, or need to lose/gain weight, consider consulting with a registered dietitian or your healthcare provider for personalized advice.";
    }
    
    if (lowerMessage.includes('exercise') || lowerMessage.includes('fitness')) {
      return "Regular physical activity is excellent for overall health. Adults should aim for at least 150 minutes of moderate-intensity aerobic activity per week, plus muscle-strengthening activities. Start slowly if you're new to exercise, stay hydrated, and listen to your body. If you have chronic health conditions or haven't exercised in a while, consult your doctor before starting a new exercise program.";
    }
    
    if (lowerMessage.includes('medication') || lowerMessage.includes('medicine')) {
      return "Always take medications as prescribed by your healthcare provider. Don't share medications with others, and don't stop taking prescribed medications without consulting your doctor first. Store medications properly, check expiration dates, and be aware of potential side effects. If you experience unusual symptoms after taking medication, contact your healthcare provider or pharmacist.";
    }
    
    // Default response
    return "Thank you for your question. While I can provide general health information, I recommend consulting with a qualified healthcare provider for personalized medical advice, especially for specific symptoms or conditions. They can properly evaluate your situation and provide appropriate treatment recommendations. Is there any other general health information I can help you with?";
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI thinking time
    await new Promise(resolve => setTimeout(resolve, 1500));

    const aiResponse: ChatMessage = {
      id: (Date.now() + 1).toString(),
      type: 'ai',
      content: generateAIResponse(inputMessage),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, aiResponse]);
    setIsTyping(false);
  };

  const quickQuestions = [
    "What should I do for a headache?",
    "How can I improve my sleep?",
    "When should I see a doctor for a fever?",
    "What are some stress management techniques?",
    "How much water should I drink daily?",
    "What's a healthy diet?"
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">HealthAI Patient Chat</h1>
        <p className="text-lg text-gray-600">
          Get instant answers to your health questions from our AI assistant
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Chat Header */}
        <div className="bg-blue-600 text-white p-4">
          <div className="flex items-center">
            <div className="bg-blue-500 rounded-full p-2 mr-3">
              <Heart className="h-6 w-6" />
            </div>
            <div>
              <h2 className="font-semibold">HealthAI Assistant</h2>
              <p className="text-blue-100 text-sm">Always here to help with your health questions</p>
            </div>
          </div>
        </div>

        {/* Messages Area */}
        <div className="h-96 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex max-w-xs lg:max-w-md ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`flex-shrink-0 ${message.type === 'user' ? 'ml-3' : 'mr-3'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    message.type === 'user' ? 'bg-blue-500' : 'bg-green-500'
                  }`}>
                    {message.type === 'user' ? (
                      <User className="h-4 w-4 text-white" />
                    ) : (
                      <Bot className="h-4 w-4 text-white" />
                    )}
                  </div>
                </div>
                <div
                  className={`px-4 py-2 rounded-lg ${
                    message.type === 'user'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <p className={`text-xs mt-1 ${
                    message.type === 'user' ? 'text-blue-100' : 'text-gray-500'
                  }`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex">
                <div className="mr-3">
                  <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                    <Bot className="h-4 w-4 text-white" />
                  </div>
                </div>
                <div className="bg-gray-100 px-4 py-2 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Questions */}
        <div className="border-t border-gray-200 p-4">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Quick Questions:</h3>
          <div className="flex flex-wrap gap-2">
            {quickQuestions.map((question, index) => (
              <button
                key={index}
                onClick={() => setInputMessage(question)}
                className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors duration-200"
              >
                {question}
              </button>
            ))}
          </div>
        </div>

        {/* Input Area */}
        <div className="border-t border-gray-200 p-4">
          <div className="flex space-x-3">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask a health question..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={isTyping}
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isTyping}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200"
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-start">
          <AlertTriangle className="h-5 w-5 text-yellow-600 mr-3 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="text-sm font-medium text-yellow-800 mb-1">Medical Disclaimer</h3>
            <p className="text-sm text-yellow-700">
              This AI assistant provides general health information only and should not replace professional medical advice. 
              For medical emergencies, call emergency services immediately. Always consult with qualified healthcare providers for proper diagnosis and treatment.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientChat;