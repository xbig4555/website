import React from 'react';
import { ArrowRight, PlayCircle, Users, BookOpen, Award, Sparkles, Zap, Globe } from 'lucide-react';

const Hero: React.FC = () => {
  const stats = [
    { icon: Users, value: '50K+', label: 'Students' },
    { icon: BookOpen, value: '1000+', label: 'Courses' },
    { icon: Award, value: '98%', label: 'Success Rate' },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Enhanced background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900" />
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating orbs */}
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20 blur-3xl animate-float"
            style={{
              width: `${100 + Math.random() * 200}px`,
              height: `${100 + Math.random() * 200}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${8 + Math.random() * 4}s`
            }}
          />
        ))}
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-pattern-grid opacity-10"></div>
      </div>

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/20 z-10" /> 

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="text-center space-y-8">
          {/* Hero badge */}
          <div className="inline-flex items-center space-x-3 glass-morphism rounded-full px-8 py-4 border border-white/30 shadow-xl animate-fade-in">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <Globe className="h-5 w-5 text-indigo-400" />
            <span className="text-white font-semibold text-lg">3D Learning Experience</span>
            <Sparkles className="h-5 w-5 text-yellow-400" />
          </div>

          {/* Main heading */}
          <div className="space-y-6 animate-slide-up">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-tight">
              Explore the
              <span className="block text-gradient-primary animate-glow"> Universe </span>
              of Learning
            </h1>
            <p className="text-xl lg:text-2xl text-gray-200 max-w-4xl mx-auto leading-relaxed">
              Embark on an extraordinary educational journey through our immersive 3D learning environment. 
              Master the skills that will shape tomorrow's world.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <button className="group btn-primary text-xl px-10 py-5 flex items-center space-x-3">
              <span>Start Learning</span>
              <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform duration-200" />
            </button>
            <button className="group btn-secondary text-xl px-10 py-5 flex items-center space-x-3">
              <PlayCircle className="h-6 w-6" />
              <span>Watch Demo</span>
            </button>
          </div>

          {/* Enhanced Stats */}
          <div className="grid grid-cols-3 gap-8 pt-16 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.6s' }}>
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="glass-morphism rounded-2xl p-6 border border-white/30 shadow-xl card-hover">
                  <div className="flex items-center justify-center mb-4">
                    <div className="p-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <stat.icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                  <p className="text-gray-300 font-medium">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center items-center gap-8 pt-12 animate-fade-in" style={{ animationDelay: '0.9s' }}>
            <div className="flex items-center space-x-2 text-gray-300">
              <Zap className="h-5 w-5 text-yellow-400" />
              <span className="font-medium">AI-Powered Learning</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-300">
              <Award className="h-5 w-5 text-green-400" />
              <span className="font-medium">Industry Certified</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-300">
              <Users className="h-5 w-5 text-blue-400" />
              <span className="font-medium">Global Community</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-20">
        <div className="w-8 h-12 border-2 border-white/40 rounded-full flex justify-center glass-morphism">
          <div className="w-2 h-4 bg-white/60 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;