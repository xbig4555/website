import React, { useState, useEffect, useRef, useCallback } from 'react';
import { MessageCircle, X, Sparkles, Brain, Send, Minimize2, Maximize2, Zap, BookOpen, Crown } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
  type?: 'suggestion' | 'normal';
}

const TutorWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi! I'm Luna, your premium AI learning companion. I'm here to accelerate your learning journey with personalized guidance. What would you like to master today? ✨",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [tutorMood, setTutorMood] = useState<'idle' | 'thinking' | 'excited' | 'speaking'>('idle');
  const [pulseIntensity, setPulseIntensity] = useState(0.5);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Premium AI responses with learning focus
  const aiResponses = [
    "Excellent question! Let me break this down into digestible concepts for you. 🧠",
    "I love your curiosity! This is exactly the kind of thinking that leads to breakthroughs. ⚡",
    "That's a sophisticated question! Here's how the experts approach this topic... 🎯",
    "Perfect timing for this question! Let me share some advanced insights... 💎",
    "You're thinking like a true learner! This concept connects to several key principles... 🌟",
    "Brilliant question! This is where many students have their 'aha!' moment... 💡",
    "I can see you're ready for the next level! Let me guide you through this... 🚀",
    "This is exactly what separates good learners from great ones! Here's the secret... 👑"
  ];

  const quickSuggestions = [
    "Explain this concept simply",
    "Show me practical examples",
    "What should I learn next?",
    "Help me practice this skill"
  ];

  // Enhanced animations and mood system
  useEffect(() => {
    const moodCycle = setInterval(() => {
      if (tutorMood === 'idle') {
        setPulseIntensity(0.3 + Math.random() * 0.4);
      }
    }, 2000);

    return () => clearInterval(moodCycle);
  }, [tutorMood]);

  // Auto-scroll messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && !isMinimized && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen, isMinimized]);

  const handleSendMessage = async (messageText?: string) => {
    const text = messageText || inputMessage.trim();
    if (!text) return;

    const userMessage: Message = {
      id: Date.now(),
      text,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);
    setTutorMood('thinking');

    // Simulate AI processing with realistic delay
    setTimeout(() => {
      const aiResponse: Message = {
        id: Date.now() + 1,
        text: aiResponses[Math.floor(Math.random() * aiResponses.length)],
        isUser: false,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
      setTutorMood('excited');
      
      // Return to idle after speaking
      setTimeout(() => setTutorMood('idle'), 3000);
    }, 1500 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getTutorAnimation = () => {
    switch (tutorMood) {
      case 'thinking':
        return 'animate-pulse';
      case 'excited':
        return 'animate-bounce';
      case 'speaking':
        return 'animate-glow';
      default:
        return '';
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">
      {/* Premium Chat Interface */}
      {isOpen && (
        <div className={`absolute bottom-28 right-0 mb-4 transition-all duration-500 ${
          isMinimized ? 'w-80 h-20' : 'w-96 h-[600px]'
        }`}>
          <div className="glass-morphism rounded-3xl shadow-2xl border border-white/30 h-full flex flex-col overflow-hidden">
            {/* Gradient border effect */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 blur-lg -z-10"></div>
            
            {/* Premium Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10 bg-gradient-to-r from-indigo-500/10 to-purple-500/10">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-400 via-purple-500 to-pink-500 flex items-center justify-center shadow-xl">
                    <Brain size={24} className="text-white" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 rounded-full border-2 border-white animate-pulse flex items-center justify-center">
                    <Crown className="h-3 w-3 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="text-white font-bold text-xl flex items-center space-x-2">
                    <span>Luna AI</span>
                    <Crown className="h-5 w-5 text-yellow-400" />
                  </h3>
                  <p className="text-gray-300 text-sm">Premium Learning Assistant</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full"
                >
                  {isMinimized ? <Maximize2 size={18} /> : <Minimize2 size={18} />}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} animate-fade-in`}
                    >
                      <div
                        className={`max-w-[85%] p-4 rounded-2xl ${
                          message.isUser
                            ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg'
                            : 'glass-morphism-dark text-white border border-white/10 shadow-xl'
                        }`}
                      >
                        <p className="text-sm leading-relaxed">{message.text}</p>
                        <p className="text-xs opacity-70 mt-2">
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  ))}
                  
                  {isTyping && (
                    <div className="flex justify-start animate-fade-in">
                      <div className="glass-morphism-dark p-4 rounded-2xl border border-white/10">
                        <div className="flex items-center space-x-3">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          </div>
                          <span className="text-gray-300 text-sm">Luna is thinking...</span>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Quick Suggestions */}
                <div className="px-6 pb-4">
                  <div className="grid grid-cols-2 gap-2">
                    {quickSuggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => handleSendMessage(suggestion)}
                        className="text-xs bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white px-3 py-2 rounded-lg transition-all duration-200 border border-white/10 hover:border-white/20"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Premium Input Area */}
                <div className="p-6 border-t border-white/10 bg-gradient-to-r from-indigo-500/5 to-purple-500/5">
                  <div className="flex space-x-3">
                    <input
                      ref={inputRef}
                      type="text"
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Ask Luna anything about learning..."
                      className="flex-1 input-field text-sm"
                    />
                    <button
                      onClick={() => handleSendMessage()}
                      disabled={!inputMessage.trim()}
                      className="btn-primary px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                    >
                      <Send size={16} />
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Premium Tutor Avatar */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`relative w-24 h-24 cursor-pointer transition-all duration-500 ${getTutorAnimation()} hover:scale-110`}
      >
        {/* Multi-layered premium glow */}
        <div 
          className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-400/60 via-purple-500/60 to-pink-500/60 blur-2xl animate-pulse"
          style={{ opacity: pulseIntensity }}
        ></div>
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-300/40 via-violet-400/40 to-fuchsia-400/40 blur-xl animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        
        {/* Main avatar body */}
        <div className="relative w-full h-full bg-gradient-to-br from-indigo-400 via-purple-500 to-pink-500 rounded-full shadow-2xl border-4 border-white/60 overflow-hidden">
          
          {/* Premium face design */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            {/* Eyes */}
            <div className="flex space-x-3 mb-2">
              <div className="w-3 h-3 bg-white rounded-full shadow-inner flex items-center justify-center">
                <div className="w-2 h-2 bg-gray-900 rounded-full"></div>
              </div>
              <div className="w-3 h-3 bg-white rounded-full shadow-inner flex items-center justify-center">
                <div className="w-2 h-2 bg-gray-900 rounded-full"></div>
              </div>
            </div>
            
            {/* Mouth */}
            <div className={`w-4 h-2 rounded-full ${
              tutorMood === 'excited' ? 'bg-pink-300' : 'bg-gray-800'
            } transition-colors duration-300`}></div>
          </div>

          {/* Premium crown indicator */}
          <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
            <Crown className="h-6 w-6 text-yellow-400 drop-shadow-lg animate-pulse" />
          </div>

          {/* Mood particles */}
          {tutorMood === 'excited' && (
            <>
              <div className="absolute -top-3 -left-3 w-3 h-3 bg-yellow-300 rounded-full animate-bounce shadow-lg" style={{ animationDelay: '0ms' }}></div>
              <div className="absolute -top-2 -right-3 w-2 h-2 bg-blue-300 rounded-full animate-bounce shadow-lg" style={{ animationDelay: '200ms' }}></div>
              <div className="absolute -bottom-3 left-2 w-2 h-2 bg-pink-300 rounded-full animate-bounce shadow-lg" style={{ animationDelay: '400ms' }}></div>
            </>
          )}

          {/* Inner premium glow */}
          <div className="absolute inset-2 rounded-full bg-gradient-to-t from-transparent via-white/20 to-white/30 pointer-events-none"></div>
        </div>

        {/* Premium notification indicator */}
        {!isOpen && (
          <div className="absolute -top-3 -right-3 w-6 h-6 bg-gradient-to-r from-red-400 to-pink-500 rounded-full animate-ping shadow-xl">
            <div className="absolute inset-0 w-6 h-6 bg-gradient-to-r from-red-500 to-pink-600 rounded-full animate-pulse"></div>
            <div className="absolute inset-1 w-4 h-4 bg-white rounded-full flex items-center justify-center">
              <MessageCircle size={12} className="text-red-500" />
            </div>
          </div>
        )}

        {/* Premium hover ring */}
        <div className="absolute inset-0 rounded-full border-2 border-white/50 opacity-0 hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
      </div>
    </div>
  );
};

export default TutorWidget;