import React, { useState, useEffect, useRef, useCallback } from 'react';
import { MessageCircle, X, Sparkles, Brain, BookOpen } from 'lucide-react';

interface MousePosition {
  x: number;
  y: number;
}

const TutorWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMessage, setCurrentMessage] = useState("Hi! I'm your AI learning companion. Ready to explore something new together?");
  const [mousePos, setMousePos] = useState<MousePosition>({ x: 0, y: 0 });
  const [eyePosition, setEyePosition] = useState({ left: { x: 0, y: 0 }, right: { x: 0, y: 0 } });
  const [isBlinking, setIsBlinking] = useState(false);
  const [mood, setMood] = useState<'happy' | 'excited' | 'thinking'>('happy');
  const [isHovering, setIsHovering] = useState(false);
  
  const tutorRef = useRef<HTMLDivElement>(null);

  // Enhanced messages for learning
  const messages = [
    "Every great journey begins with curiosity! What would you like to discover today? 🌟",
    "Learning is like building a puzzle - each piece makes the picture clearer! 🧩",
    "Did you know your brain forms new connections every time you learn something? Amazing! 🧠",
    "The best time to plant a tree was 20 years ago. The second best time is now! 🌱",
    "Progress, not perfection - that's the secret to mastery! ✨",
    "Every expert was once a complete beginner. You're on the right path! 🚀",
    "Questions are more important than answers - they unlock new possibilities! 💡",
    "Your potential is unlimited. Let's unlock it together, step by step! 🗝️"
  ];

  // Fixed eye following with proper distance limits
  const updateEyePosition = useCallback((mouseX: number, mouseY: number) => {
    if (!tutorRef.current) return;

    const rect = tutorRef.current.getBoundingClientRect();
    const tutorCenterX = rect.left + rect.width / 2;
    const tutorCenterY = rect.top + rect.height / 2;

    // Calculate distance from tutor center
    const deltaX = mouseX - tutorCenterX;
    const deltaY = mouseY - tutorCenterY;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    // Limit eye movement to a maximum of 8px in any direction
    const maxEyeMovement = 8;
    const eyeMovementFactor = Math.min(distance / 200, 1); // Normalize based on screen distance
    
    const angle = Math.atan2(deltaY, deltaX);
    const eyeX = Math.cos(angle) * maxEyeMovement * eyeMovementFactor;
    const eyeY = Math.sin(angle) * maxEyeMovement * eyeMovementFactor;

    setEyePosition({
      left: { x: eyeX, y: eyeY },
      right: { x: eyeX, y: eyeY }
    });
  }, []);

  // Mouse tracking with debouncing
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        updateEyePosition(e.clientX, e.clientY);
      }, 16); // ~60fps
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timeoutId);
    };
  }, [updateEyePosition]);

  // Natural blinking pattern
  useEffect(() => {
    const scheduleNextBlink = () => {
      const delay = 2500 + Math.random() * 3500; // 2.5-6 seconds
      return setTimeout(() => {
        setIsBlinking(true);
        setTimeout(() => {
          setIsBlinking(false);
          scheduleNextBlink();
        }, 150 + Math.random() * 100); // 150-250ms blink duration
      }, delay);
    };

    const timeoutId = scheduleNextBlink();
    return () => clearTimeout(timeoutId);
  }, []);

  const getRandomMessage = () => {
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    setCurrentMessage(randomMessage);
    setMood('excited');
    setTimeout(() => setMood('happy'), 2000);
    return randomMessage;
  };

  const handleTutorClick = () => {
    if (!isOpen) {
      setIsOpen(true);
      getRandomMessage();
    }
  };

  const handleNewMessage = () => {
    getRandomMessage();
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
      {/* Enhanced Speech Bubble */}
      {isOpen && (
        <div className="absolute bottom-40 right-0 mb-4 animate-fade-in">
          <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 p-8 max-w-md min-w-[380px]">
            {/* Multi-layered gradient border effect */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-pink-500/30 blur-lg -z-10"></div>
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-400/20 via-violet-500/20 to-fuchsia-500/20 blur-md -z-10"></div>
            
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0 mt-1 shadow-lg">
                  <Brain size={24} className="text-white" />
                </div>
                <p className="text-gray-800 leading-relaxed font-medium text-lg">
                  {currentMessage}
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors ml-4 flex-shrink-0 p-2 hover:bg-gray-100 rounded-full"
              >
                <X size={20} />
              </button>
            </div>
            
            {/* Enhanced Controls */}
            <div className="flex items-center justify-between pt-6 border-t border-gray-200">
              <button
                onClick={handleNewMessage}
                className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-500 via-purple-600 to-pink-600 text-white rounded-full text-base font-semibold hover:shadow-xl transition-all duration-300 hover:scale-105 transform"
              >
                <BookOpen size={18} />
                New Insight
              </button>
              
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Sparkles size={16} className="text-purple-500" />
                <span>AI Tutor</span>
              </div>
            </div>
            
            {/* Enhanced speech bubble tail */}
            <div className="absolute -bottom-4 right-16 w-8 h-8 bg-white/95 backdrop-blur-xl border-r border-b border-white/30 transform rotate-45 shadow-lg"></div>
          </div>
        </div>
      )}

      {/* Enhanced Tutor Character - Much Larger */}
      <div
        ref={tutorRef}
        onClick={handleTutorClick}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        className={`relative w-32 h-32 cursor-pointer transition-all duration-500 ${getMoodAnimation()} ${
          isHovering ? 'scale-110' : 'hover:scale-105'
        }`}
      >
        {/* Multi-layered glow effect */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400/40 via-purple-500/40 to-pink-500/40 blur-xl animate-pulse"></div>
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-300/30 via-violet-400/30 to-fuchsia-400/30 blur-lg animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        
        {/* Main body with enhanced gradient and size */}
        <div className="relative w-full h-full bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 rounded-full shadow-2xl border-4 border-white/60 overflow-hidden">
          
          {/* Larger enhanced eyes container */}
          <div className="absolute top-8 left-1/2 transform -translate-x-1/2 flex gap-4">
            {/* Left Eye - Larger */}
            <div className="relative w-8 h-8 bg-white rounded-full shadow-inner border-2 border-gray-100">
              <div 
                className={`absolute w-5 h-5 bg-gray-900 rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-200 ${
                  isBlinking ? 'scale-y-0' : 'scale-y-100'
                }`}
                style={{
                  transform: `translate(${eyePosition.left.x - 10}px, ${eyePosition.left.y - 10}px) ${isBlinking ? 'scaleY(0.1)' : 'scaleY(1)'}`
                }}
              >
                <div className="absolute top-1 right-1 w-2 h-2 bg-white rounded-full"></div>
                <div className="absolute bottom-1 left-1 w-1.5 h-1.5 bg-white/60 rounded-full"></div>
              </div>
            </div>
            
            {/* Right Eye - Larger */}
            <div className="relative w-8 h-8 bg-white rounded-full shadow-inner border-2 border-gray-100">
              <div 
                className={`absolute w-5 h-5 bg-gray-900 rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-200 ${
                  isBlinking ? 'scale-y-0' : 'scale-y-100'
                }`}
                style={{
                  transform: `translate(${eyePosition.right.x - 10}px, ${eyePosition.right.y - 10}px) ${isBlinking ? 'scaleY(0.1)' : 'scaleY(1)'}`
                }}
              >
                <div className="absolute top-1 right-1 w-2 h-2 bg-white rounded-full"></div>
                <div className="absolute bottom-1 left-1 w-1.5 h-1.5 bg-white/60 rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Enhanced mouth expressions - Larger */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
            {mood === 'excited' ? (
              <div className="w-6 h-3 bg-gray-800 rounded-full relative">
                <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-3 h-2 bg-pink-400 rounded-full"></div>
              </div>
            ) : (
              <div className="w-5 h-2.5 bg-gray-800 rounded-full"></div>
            )}
          </div>

          {/* Enhanced cheeks for different moods */}
          {mood === 'excited' && (
            <>
              <div className="absolute top-12 left-3 w-4 h-4 bg-pink-300/70 rounded-full animate-pulse"></div>
              <div className="absolute top-12 right-3 w-4 h-4 bg-pink-300/70 rounded-full animate-pulse"></div>
            </>
          )}

          {/* Enhanced floating particles when excited */}
          {mood === 'excited' && (
            <>
              <div className="absolute -top-3 -left-3 w-3 h-3 bg-yellow-300 rounded-full animate-bounce shadow-lg" style={{ animationDelay: '0ms' }}></div>
              <div className="absolute -top-2 -right-4 w-2.5 h-2.5 bg-blue-300 rounded-full animate-bounce shadow-lg" style={{ animationDelay: '200ms' }}></div>
              <div className="absolute -bottom-3 left-1 w-2 h-2 bg-pink-300 rounded-full animate-bounce shadow-lg" style={{ animationDelay: '400ms' }}></div>
              <div className="absolute top-2 -right-2 w-1.5 h-1.5 bg-purple-300 rounded-full animate-bounce shadow-lg" style={{ animationDelay: '600ms' }}></div>
            </>
          )}

          {/* Subtle inner glow */}
          <div className="absolute inset-2 rounded-full bg-gradient-to-t from-transparent via-white/10 to-white/20 pointer-events-none"></div>
        </div>

        {/* Enhanced pulsing notification when not opened */}
        {!isOpen && (
          <div className="absolute -top-3 -right-3 w-6 h-6 bg-gradient-to-r from-red-400 to-pink-500 rounded-full animate-ping shadow-lg">
            <div className="absolute inset-0 w-6 h-6 bg-gradient-to-r from-red-500 to-pink-600 rounded-full animate-pulse"></div>
            <div className="absolute inset-1 w-4 h-4 bg-white rounded-full flex items-center justify-center">
              <MessageCircle size={12} className="text-red-500" />
            </div>
          </div>
        )}

        {/* Enhanced hover ring */}
        {isHovering && (
          <div className="absolute inset-0 rounded-full border-4 border-white/50 animate-pulse"></div>
        )}
      </div>
    </div>
  );
};

export default TutorWidget;