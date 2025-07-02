import React from 'react';
import { Brain, Zap, Globe, Shield, Users, BookOpen } from 'lucide-react';

const Features: React.FC = () => {
  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Learning',
      description: 'Personalized learning paths adapted to your pace and style using advanced artificial intelligence.',
      gradient: 'from-pink-500 to-rose-500',
      bgPattern: 'bg-gradient-to-br from-pink-500/10 to-rose-500/10'
    },
    {
      icon: Zap,
      title: 'Interactive 3D Content',
      description: 'Immersive 3D experiences that make complex concepts easy to understand and remember.',
      gradient: 'from-yellow-500 to-orange-500',
      bgPattern: 'bg-gradient-to-br from-yellow-500/10 to-orange-500/10'
    },
    {
      icon: Globe,
      title: 'Global Community',
      description: 'Connect with learners worldwide and collaborate on projects in real-time.',
      gradient: 'from-green-500 to-emerald-500',
      bgPattern: 'bg-gradient-to-br from-green-500/10 to-emerald-500/10'
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Your data is protected with enterprise-grade security and privacy measures.',
      gradient: 'from-blue-500 to-cyan-500',
      bgPattern: 'bg-gradient-to-br from-blue-500/10 to-cyan-500/10'
    },
    {
      icon: Users,
      title: 'Expert Mentorship',
      description: 'Learn from industry experts and get personalized guidance throughout your journey.',
      gradient: 'from-purple-500 to-violet-500',
      bgPattern: 'bg-gradient-to-br from-purple-500/10 to-violet-500/10'
    },
    {
      icon: BookOpen,
      title: 'Comprehensive Curriculum',
      description: 'Access to cutting-edge courses covering the latest technologies and methodologies.',
      gradient: 'from-indigo-500 to-blue-500',
      bgPattern: 'bg-gradient-to-br from-indigo-500/10 to-blue-500/10'
    }
  ];

  return (
    <section id="features" className="py-20 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-900/20 to-transparent"></div>
        {/* Floating particles */}
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/10 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${4 + Math.random() * 6}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 mb-6 border border-white/20">
            <Zap className="h-5 w-5 text-yellow-400" />
            <span className="text-white font-medium">Powerful Features</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Revolutionary Learning
            <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent"> Experience</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Experience the future of education with our cutting-edge platform designed to maximize your learning potential.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`group relative ${feature.bgPattern} backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-500 hover:transform hover:-translate-y-4 hover:shadow-2xl`}
              style={{
                animationDelay: `${index * 100}ms`
              }}
            >
              {/* Animated border gradient */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Icon with enhanced gradient background */}
              <div className={`relative inline-flex p-4 rounded-xl bg-gradient-to-r ${feature.gradient} mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="h-6 w-6 text-white" />
                {/* Glow effect */}
                <div className={`absolute inset-0 rounded-xl bg-gradient-to-r ${feature.gradient} blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300`}></div>
              </div>

              <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-indigo-300 transition-colors duration-200">
                {feature.title}
              </h3>
              
              <p className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-200">
                {feature.description}
              </p>

              {/* Interactive elements */}
              <div className="mt-6 flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse"></div>
                <span className="text-sm text-indigo-400 font-medium">Learn More</span>
              </div>

              {/* Hover effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </div>
          ))}
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          25% { transform: translateY(-10px) rotate(1deg); }
          50% { transform: translateY(-5px) rotate(-1deg); }
          75% { transform: translateY(-15px) rotate(0.5deg); }
        }
      `}</style>
    </section>
  );
};

export default Features;