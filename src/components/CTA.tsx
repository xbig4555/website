import React from 'react';
import { ArrowRight, BookOpen, Users, Award, Sparkles } from 'lucide-react';

const CTA: React.FC = () => {
  const benefits = [
    {
      icon: BookOpen,
      text: 'Access to 1000+ courses',
      color: 'text-blue-400'
    },
    {
      icon: Users,
      text: 'Expert mentorship',
      color: 'text-green-400'
    },
    {
      icon: Award,
      text: 'Industry certificates',
      color: 'text-yellow-400'
    }
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Dynamic background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/30 via-purple-600/20 to-pink-600/30"></div>
        {/* Animated sparkles */}
        {Array.from({ length: 40 }).map((_, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `sparkle ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          >
            <Sparkles className="h-4 w-4 text-white/20" />
          </div>
        ))}
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-3xl border border-white/20 p-8 lg:p-12 relative overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-indigo-400/20 to-purple-400/20 rounded-full blur-2xl animate-pulse"></div>
            <div className="absolute bottom-0 right-0 w-48 h-48 bg-gradient-to-br from-purple-400/15 to-pink-400/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
          </div>

          <div className="text-center max-w-4xl mx-auto relative z-10">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 mb-6 border border-white/20">
              <Sparkles className="h-5 w-5 text-yellow-400" />
              <span className="text-white font-medium">Limited Time Offer</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Transform Your
              <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent"> Career?</span>
            </h2>
            
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Join over 50,000 learners who have accelerated their careers with our immersive 3D learning platform. 
              Start your journey today and unlock your potential.
            </p>

            {/* Benefits */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-10">
              {benefits.map((benefit, index) => (
                <div 
                  key={index} 
                  className="flex items-center space-x-2 text-gray-300 bg-white/5 backdrop-blur-sm rounded-full px-4 py-2 border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105"
                >
                  <benefit.icon className={`h-5 w-5 ${benefit.color}`} />
                  <span>{benefit.text}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <button className="group bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-8 py-4 rounded-full font-semibold hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 shadow-lg shadow-indigo-500/25">
                <span>Start Free Trial</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
              </button>
              
              <button className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-full font-semibold hover:bg-white/20 transition-all duration-300 border border-white/20 hover:scale-105 shadow-lg">
                View Pricing Plans
              </button>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-gray-400">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>No credit card required</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                <span>Cancel anytime</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                <span>30-day money-back guarantee</span>
              </div>
            </div>

            {/* Special offer countdown */}
            <div className="mt-8 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-xl p-4 border border-orange-500/30">
              <div className="flex items-center justify-center space-x-2 text-orange-400">
                <Sparkles className="h-5 w-5" />
                <span className="font-semibold">Special Launch Offer: 50% OFF - Limited Time!</span>
                <Sparkles className="h-5 w-5" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for sparkle animation */}
      <style jsx>{`
        @keyframes sparkle {
          0%, 100% { opacity: 0; transform: scale(0) rotate(0deg); }
          50% { opacity: 1; transform: scale(1) rotate(180deg); }
        }
      `}</style>
    </section>
  );
};

export default CTA;