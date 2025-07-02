import React from 'react';
import { Star, Quote, CheckCircle } from 'lucide-react';

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Emily Rodriguez',
      role: 'Software Engineer at Google',
      image: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=400',
      content: 'EduSphere transformed my career. The interactive 3D learning environment made complex algorithms easy to understand. I landed my dream job at Google within 6 months!',
      rating: 5,
      course: 'Advanced Algorithms',
      gradient: 'from-blue-500 to-cyan-500',
      bgGradient: 'from-blue-500/10 to-cyan-500/10'
    },
    {
      id: 2,
      name: 'Marcus Johnson',
      role: 'UI/UX Designer at Airbnb',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
      content: 'The design thinking course was phenomenal. The mentorship program connected me with industry experts who guided me every step of the way. Highly recommended!',
      rating: 5,
      course: 'UI/UX Design Mastery',
      gradient: 'from-purple-500 to-pink-500',
      bgGradient: 'from-purple-500/10 to-pink-500/10'
    },
    {
      id: 3,
      name: 'Sarah Chen',
      role: 'Data Scientist at Tesla',
      image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400',
      content: 'The machine learning curriculum is cutting-edge. Real-world projects and personalized AI feedback helped me master complex concepts faster than traditional methods.',
      rating: 5,
      course: 'Machine Learning Fundamentals',
      gradient: 'from-green-500 to-emerald-500',
      bgGradient: 'from-green-500/10 to-emerald-500/10'
    },
    {
      id: 4,
      name: 'David Kim',
      role: 'Blockchain Developer',
      image: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400',
      content: 'The blockchain development course was comprehensive and practical. I built 5 real projects and now run my own successful DeFi startup. Game-changing experience!',
      rating: 5,
      course: 'Blockchain Development',
      gradient: 'from-yellow-500 to-orange-500',
      bgGradient: 'from-yellow-500/10 to-orange-500/10'
    },
    {
      id: 5,
      name: 'Lisa Wang',
      role: 'Cloud Architect at Microsoft',
      image: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=400',
      content: 'EduSphere\'s cloud architecture course gave me the skills and confidence to design enterprise-scale solutions. The hands-on labs were incredibly valuable.',
      rating: 5,
      course: 'Cloud Architecture on AWS',
      gradient: 'from-indigo-500 to-purple-500',
      bgGradient: 'from-indigo-500/10 to-purple-500/10'
    },
    {
      id: 6,
      name: 'Alex Thompson',
      role: '3D Artist at Pixar',
      image: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=400',
      content: 'The 3D design course unlocked my creativity. From beginner to working at Pixar in less than a year. The interactive learning environment is simply amazing!',
      rating: 5,
      course: '3D Design with Blender',
      gradient: 'from-rose-500 to-pink-500',
      bgGradient: 'from-rose-500/10 to-pink-500/10'
    }
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Dynamic background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-transparent to-indigo-900/20"></div>
        {/* Animated testimonial cards background */}
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-4 h-4 bg-white/5 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${6 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 mb-6 border border-white/20">
            <Star className="h-5 w-5 text-yellow-400" />
            <span className="text-white font-medium">Success Stories</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Real Stories from
            <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent"> Real People</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Hear from our graduates who have transformed their careers and achieved their dreams.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={`group bg-gradient-to-br ${testimonial.bgGradient} backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-500 hover:transform hover:-translate-y-4 hover:shadow-2xl relative overflow-hidden`}
              style={{
                animationDelay: `${index * 100}ms`
              }}
            >
              {/* Animated background glow */}
              <div className={`absolute inset-0 bg-gradient-to-br ${testimonial.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-2xl`}></div>
              
              <div className="relative z-10">
                {/* Quote icon with gradient */}
                <div className={`inline-flex p-2 rounded-lg bg-gradient-to-r ${testimonial.gradient} mb-4 shadow-lg`}>
                  <Quote className="h-5 w-5 text-white" />
                </div>
                
                {/* Rating */}
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                  <span className="ml-2 text-sm text-gray-400">({testimonial.rating}.0)</span>
                </div>

                {/* Content */}
                <p className="text-gray-300 leading-relaxed mb-6 group-hover:text-gray-200 transition-colors duration-200">
                  "{testimonial.content}"
                </p>

                {/* Course taken */}
                <div className={`text-sm font-medium mb-4 bg-gradient-to-r ${testimonial.gradient} bg-clip-text text-transparent`}>
                  <CheckCircle className="inline h-4 w-4 mr-1" />
                  Course: {testimonial.course}
                </div>

                {/* Author */}
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-white/20 group-hover:border-white/40 transition-colors duration-200"
                    />
                    <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${testimonial.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-200`}></div>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold group-hover:text-indigo-300 transition-colors duration-200">
                      {testimonial.name}
                    </h4>
                    <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors duration-200">
                      {testimonial.role}
                    </p>
                  </div>
                </div>

                {/* Success indicator */}
                <div className="mt-4 flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-xs text-green-400 font-medium">Career Transformed</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to action */}
        <div className="text-center mt-16">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">Ready to Write Your Success Story?</h3>
            <p className="text-gray-300 mb-6">Join thousands of learners who have transformed their careers with EduSphere.</p>
            <button className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 hover:scale-105 shadow-lg">
              Start Your Journey Today
            </button>
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          25% { transform: translateY(-20px) rotate(2deg); }
          50% { transform: translateY(-10px) rotate(-1deg); }
          75% { transform: translateY(-25px) rotate(1deg); }
        }
      `}</style>
    </section>
  );
};

export default Testimonials;