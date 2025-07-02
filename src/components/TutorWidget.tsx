import React, { useState, useEffect, useRef, useCallback } from 'react';
import { MessageCircle, X, Sparkles, Brain, BookOpen, Send, Minimize2, Maximize2 } from 'lucide-react';

interface MousePosition {
  x: number;
  y: number;
}

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const TutorWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi! I'm Luna, your AI learning companion. I'm here to help you navigate your educational journey. What would you like to explore today? 🌟",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [mousePos, setMousePos] = useState<MousePosition>({ x: 0, y: 0 });
  const [eyePosition, setEyePosition] = useState({ left: { x: 0, y: 0 }, right: { x: 0, y: 0 } });
  const [isBlinking, setIsBlinking] = useState(false);
  const [mood, setMood] = useState<'happy' | 'excited' | 'thinking'>('happy');
  const [isHovering, setIsHovering] = useState(false);
  
  const tutorRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Enhanced AI responses
  const aiResponses = [
    "That's a fantastic question! Let me help you understand this concept better. 🧠",
    "I love your curiosity! Here's what I think about that topic... ✨",
    "Great thinking! This reminds me of an important principle in learning... 📚",
    "You're on the right track! Let me share some insights that might help... 💡",
    "Excellent question! This is actually a common challenge many learners face... 🎯",
    "I'm excited to explore this with you! Here's my perspective... 🚀",
    "That's a deep question! Let me break it down into simpler parts... 🔍",
    "You're asking all the right questions! This shows real understanding... 🌟"
  ];

  // Eye following logic
  const updateEyePosition = useCallback((mouseX: number, mouseY: number) => {
    if (!tutorRef.current) return;

    const rect = tutorRef.current.getBoundingClientRect();
    const tutorCenterX = rect.left + rect.width / 2;
    const tutorCenterY = rect.top + rect.height / 2;

    const deltaX = mouseX - tutorCenterX;
    const deltaY = mouseY - tutorCenterY;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    const maxEyeMovement = 6;
    const eyeMovementFactor = Math.min(distance / 200, 1);
    
    const angle = Math.atan2(deltaY, deltaX);
    const eyeX = Math.cos(angle) * maxEyeMovement * eyeMovementFactor;
    const eyeY = Math.sin(angle) * maxEyeMovement * eyeMovementFactor;

    setEyePosition({
      left: { x: eyeX, y: eyeY },
      right: { x: eyeX, y: eyeY }
    });
  }, []);

  // Mouse tracking
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        updateEyePosition(e.clientX, e.clientY);
      }, 16);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timeoutId);
    };
  }, [updateEyePosition]);

  // Blinking animation
  useEffect(() => {
    const scheduleNextBlink = () => {
      const delay = 2000 + Math.random() * 4000;
      return setTimeout(() => {
        setIsBlinking(true);
        setTimeout(() => {
          setIsBlinking(false);
          scheduleNextBlink();
        }, 150);
      }, delay);
    };

    const timeoutId = scheduleNextBlink();
    return () => clearTimeout(timeoutId);
  }, []);

  // Auto-scroll messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text: inputMessage,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);
    setMood('thinking');

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: Date.now() + 1,
        text: aiResponses[Math.floor(Math.random() * aiResponses.length)],
        isUser: false,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
      setMood('happy');
    }, 1500 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getMoodAnimation = () => {
    switch (mood) {
      case 'excited':
        return 'animate-bounce';
      case 'thinking':
        return 'animate-pulse';
      default:
        return '';
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">
      {/* Enhanced Chat Window */}
      {isOpen && (
        <div className={`absolute bottom-32 right-0 mb-4 transition-all duration-300 ${isMinimized ? 'w-80 h-16' : 'w-96 h-[500px]'}`}>
          <div className="glass-morphism rounded-3xl shadow-2xl border border-white/30 h-full flex flex-col overflow-hidden">
            {/* Multi-layered gradient border effect */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-lg -z-10"></div>
            
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10 bg-gradient-to-r from-indigo-500/10 to-purple-500/10">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
                    <Brain size={20} className="text-white" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg">Luna AI</h3>
                  <p className="text-gray-300 text-sm">Your Learning Companion</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full"
                >
                  {isMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} animate-fade-in`}
                    >
                      <div
                        className={`max-w-[80%] p-4 rounded-2xl ${
                          message.isUser
                            ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white'
                            : 'glass-morphism-dark text-white border border-white/10'
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
                        <div className="flex space-x-2">
                          <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="p-4 border-t border-white/10">
                  <div className="flex space-x-3">
                    <input
                      type="text"
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Ask me anything about learning..."
                      className="flex-1 input-field text-sm"
                    />
                    <button
                      onClick={handleSendMessage}
                      disabled={!inputMessage.trim()}
                      className="btn-primary px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
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

      {/* Enhanced Tutor Character */}
      <div
        ref={tutorRef}
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        className={`relative w-20 h-20 cursor-pointer transition-all duration-500 ${getMoodAnimation()} ${
          isHovering ? 'scale-110' : 'hover:scale-105'
        }`}
      >
        {/* Multi-layered glow effect */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400/40 via-purple-500/40 to-pink-500/40 blur-xl animate-pulse"></div>
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-300/30 via-violet-400/30 to-fuchsia-400/30 blur-lg animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        
        {/* Main body */}
        <div className="relative w-full h-full bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 rounded-full shadow-2xl border-4 border-white/60 overflow-hidden">
          
          {/* Eyes container */}
          <div className="absolute top-5 left-1/2 transform -translate-x-1/2 flex gap-2">
            {/* Left Eye */}
            <div className="relative w-5 h-5 bg-white rounded-full shadow-inner border border-gray-100">
              <div 
                className={`absolute w-3 h-3 bg-gray-900 rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-200 ${
                  isBlinking ? 'scale-y-0' : 'scale-y-100'
                }`}
                style={{
                  transform: `translate(${eyePosition.left.x - 6}px, ${eyePosition.left.y - 6}px) ${isBlinking ? 'scaleY(0.1)' : 'scaleY(1)'}`
                }}
              >
                <div className="absolute top-0.5 right-0.5 w-1 h-1 bg-white rounded-full"></div>
              </div>
            </div>
            
            {/* Right Eye */}
            <div className="relative w-5 h-5 bg-white rounded-full shadow-inner border border-gray-100">
              <div 
                className={`absolute w-3 h-3 bg-gray-900 rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-200 ${
                  isBlinking ? 'scale-y-0' : 'scale-y-100'
                }`}
                style={{
                  transform: `translate(${eyePosition.right.x - 6}px, ${eyePosition.right.y - 6}px) ${isBlinking ? 'scaleY(0.1)' : 'scaleY(1)'}`
                }}
              >
                <div className="absolute top-0.5 right-0.5 w-1 h-1 bg-white rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Mouth */}
          <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2">
            {mood === 'excited' ? (
              <div className="w-4 h-2 bg-gray-800 rounded-full relative">
                <div className="absolute -top-0.5 left-1/2 transform -translate-x-1/2 w-2 h-1 bg-pink-400 rounded-full"></div>
              </div>
            ) : (
              <div className="w-3 h-1.5 bg-gray-800 rounded-full"></div>
            )}
          </div>

          {/* Cheeks for excited mood */}
          {mood === 'excited' && (
            <>
              <div className="absolute top-8 left-2 w-2 h-2 bg-pink-300/70 rounded-full animate-pulse"></div>
              <div className="absolute top-8 right-2 w-2 h-2 bg-pink-300/70 rounded-full animate-pulse"></div>
            </>
          )}

          {/* Floating particles when excited */}
          {mood === 'excited' && (
            <>
              <div className="absolute -top-2 -left-2 w-2 h-2 bg-yellow-300 rounded-full animate-bounce shadow-lg" style={{ animationDelay: '0ms' }}></div>
              <div className="absolute -top-1 -right-2 w-1.5 h-1.5 bg-blue-300 rounded-full animate-bounce shadow-lg" style={{ animationDelay: '200ms' }}></div>
              <div className="absolute -bottom-2 left-1 w-1 h-1 bg-pink-300 rounded-full animate-bounce shadow-lg" style={{ animationDelay: '400ms' }}></div>
            </>
          )}

          {/* Inner glow */}
          <div className="absolute inset-1 rounded-full bg-gradient-to-t from-transparent via-white/10 to-white/20 pointer-events-none"></div>
        </div>

        {/* Notification indicator when not opened */}
        {!isOpen && (
          <div className="absolute -top-2 -right-2 w-5 h-5 bg-gradient-to-r from-red-400 to-pink-500 rounded-full animate-ping shadow-lg">
            <div className="absolute inset-0 w-5 h-5 bg-gradient-to-r from-red-500 to-pink-600 rounded-full animate-pulse"></div>
            <div className="absolute inset-0.5 w-4 h-4 bg-white rounded-full flex items-center justify-center">
              <MessageCircle size={10} className="text-red-500" />
            </div>
          </div>
        )}

        {/* Hover ring */}
        {isHovering && (
          <div className="absolute inset-0 rounded-full border-2 border-white/50 animate-pulse"></div>
        )}
      </div>
    </div>
  );
};

export default TutorWidget;