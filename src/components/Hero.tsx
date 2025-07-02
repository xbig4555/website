import React, { useState } from 'react'; // Spline and related imports removed
import { ArrowRight, PlayCircle, Users, BookOpen, Award } from 'lucide-react';

const Hero: React.FC = () => {
  // Removed splineError state as Spline component is no longer here
  // const [splineError, setSplineError] = useState(false); 
  
  const stats = [
    { icon: Users, value: '10K+', label: 'Students' },
    { icon: BookOpen, value: '500+', label: 'Courses' },
    { icon: Award, value: '95%', label: 'Success Rate' },
  ];

  // Removed Spline related handlers
  // const handleSplineLoad = () => {
  //   console.log('Spline scene loaded successfully');
  // };

  // const handleSplineError = (error: any) => {
  //   console.error('Spline loading error:', error);
  //   setSplineError(true);
  // };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Base background gradient - this will be visible behind the ParticleNetwork if it's transparent enough */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900" />
      
      {/*
        REMOVED: Spline 3D Globe Background - MAIN FEATURE
        This section has been removed as per your request to place the globe elsewhere.
      */}

      {/*
        REMOVED: The "Enhanced Particle Background" and "Additional orbital elements"
        from Hero.tsx because App.tsx now provides a global ParticleNetwork.
      */}

      {/* Dark overlay to ensure text readability - Adjusted opacity and blur */}
      {/* Changed bg-black/20 to bg-black/5 and removed backdrop-blur for better ParticleNetwork visibility */}
      <div className="absolute inset-0 bg-black/5 z-10" /> 

      {/* Content overlay */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="text-center lg:text-left space-y-8">
            {/* Hero badge */}
            <div className="inline-flex items-center space-x-2 bg-white/15 backdrop-blur-md rounded-full px-6 py-3 border border-white/30 shadow-xl">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-white font-medium">🌍 3D Learning Experience</span>
            </div>

            <div className="space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight">
                Explore the
                <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"> Universe </span>
                of Learning
              </h1>
              <p className="text-xl lg:text-2xl text-gray-200 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Embark on an educational journey through our interactive 3D learning environment. 
                Master skills that matter in today's digital world.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className="group bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-8 py-4 rounded-full font-semibold hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 shadow-xl shadow-indigo-500/25 border border-indigo-400/20">
                <span>Start Learning</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
              </button>
              <button className="group bg-white/15 backdrop-blur-md text-white px-8 py-4 rounded-full font-semibold hover:bg-white/25 transition-all duration-300 border border-white/30 flex items-center justify-center space-x-2 shadow-xl hover:scale-105">
                <PlayCircle className="h-5 w-5" />
                <span>Watch Demo</span>
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center lg:text-left bg-white/15 backdrop-blur-md rounded-xl p-4 border border-white/30 shadow-lg hover:bg-white/20 transition-all duration-300 hover:scale-105">
                  <div className="flex items-center justify-center lg:justify-start space-x-2 mb-2">
                    <stat.icon className="h-5 w-5 text-indigo-400" />
                    <span className="text-2xl font-bold text-white">{stat.value}</span>
                  </div>
                  <p className="text-gray-200 text-sm font-medium">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right side - Interactive elements */}
          <div className="hidden lg:block relative">
            <div className="space-y-6">
              {/* Floating course cards */}
              <div className="bg-white/15 backdrop-blur-md rounded-2xl p-6 border border-white/30 transform rotate-2 hover:rotate-0 transition-all duration-500 hover:scale-105 shadow-xl hover:shadow-2xl">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-white font-medium">🎯 Live Course</span>
                </div>
                <div className="h-4 bg-gradient-to-r from-indigo-400 to-purple-400 rounded mb-3"></div>
                <div className="space-y-2">
                  <div className="h-2 bg-white/40 rounded w-3/4"></div>
                  <div className="h-2 bg-white/30 rounded w-1/2"></div>
                </div>
              </div>
              
              <div className="bg-white/15 backdrop-blur-md rounded-2xl p-6 border border-white/30 transform -rotate-1 hover:rotate-0 transition-all duration-500 hover:scale-105 ml-8 shadow-xl hover:shadow-2xl">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
                  <span className="text-white font-medium">🤖 AI Powered</span>
                </div>
                <div className="h-4 bg-gradient-to-r from-purple-400 to-pink-400 rounded mb-3"></div>
                <div className="space-y-2">
                  <div className="h-2 bg-white/40 rounded w-2/3"></div>
                  <div className="h-2 bg-white/30 rounded w-3/4"></div>
                </div>
              </div>
              
              <div className="bg-white/15 backdrop-blur-md rounded-2xl p-6 border border-white/30 transform rotate-1 hover:rotate-0 transition-all duration-500 hover:scale-105 shadow-xl hover:shadow-2xl">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
                  <span className="text-white font-medium">⚡ Interactive</span>
                </div>
                <div className="h-4 bg-gradient-to-r from-cyan-400 to-blue-400 rounded mb-3"></div>
                <div className="space-y-2">
                  <div className="h-2 bg-white/40 rounded w-4/5"></div>
                  <div className="h-2 bg-white/30 rounded w-2/3"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-20">
        <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center backdrop-blur-sm bg-white/10">
          <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>

      {/* Custom CSS for floating animation */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          25% { transform: translateY(-10px) translateX(5px); }
          50% { transform: translateY(-5px) translateX(-5px); }
          75% { transform: translateY(-15px) translateX(3px); }
        }
      `}</style>
    </section>
  );
};

export default Hero;
