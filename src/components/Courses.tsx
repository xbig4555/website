import React from 'react';
import { Clock, Users, Star, ArrowRight, PlayCircle, BookOpen } from 'lucide-react';

const Courses: React.FC = () => {
  const courses = [
    {
      id: 1,
      title: 'Advanced React Development',
      description: 'Master modern React patterns, hooks, and state management with real-world projects.',
      image: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=800',
      duration: '8 weeks',
      students: 1250,
      rating: 4.9,
      level: 'Advanced',
      price: '$149',
      instructor: 'Sarah Chen',
      category: 'Frontend Development',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 2,
      title: 'Machine Learning Fundamentals',
      description: 'Learn the core concepts of ML and build your first predictive models.',
      image: 'https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=800',
      duration: '10 weeks',
      students: 890,
      rating: 4.8,
      level: 'Intermediate',
      price: '$199',
      instructor: 'Dr. Michael Rodriguez',
      category: 'Data Science',
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 3,
      title: '3D Design with Blender',
      description: 'Create stunning 3D models and animations from scratch to professional level.',
      image: 'https://images.pexels.com/photos/7130549/pexels-photo-7130549.jpeg?auto=compress&cs=tinysrgb&w=800',
      duration: '12 weeks',
      students: 2100,
      rating: 4.9,
      level: 'Beginner',
      price: '$129',
      instructor: 'Alex Thompson',
      category: '3D Design',
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 4,
      title: 'Cloud Architecture on AWS',
      description: 'Design and deploy scalable cloud solutions using Amazon Web Services.',
      image: 'https://images.pexels.com/photos/451844/pexels-photo-451844.jpeg?auto=compress&cs=tinysrgb&w=800',
      duration: '6 weeks',
      students: 750,
      rating: 4.7,
      level: 'Advanced',
      price: '$179',
      instructor: 'Jennifer Kim',
      category: 'Cloud Computing',
      color: 'from-orange-500 to-red-500'
    },
    {
      id: 5,
      title: 'UI/UX Design Mastery',
      description: 'Learn design thinking, prototyping, and user research methodologies.',
      image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800',
      duration: '8 weeks',
      students: 1800,
      rating: 4.8,
      level: 'Intermediate',
      price: '$139',
      instructor: 'Emma Wilson',
      category: 'Design',
      color: 'from-indigo-500 to-purple-500'
    },
    {
      id: 6,
      title: 'Blockchain Development',
      description: 'Build decentralized applications and smart contracts on Ethereum.',
      image: 'https://images.pexels.com/photos/730547/pexels-photo-730547.jpeg?auto=compress&cs=tinysrgb&w=800',
      duration: '14 weeks',
      students: 650,
      rating: 4.9,
      level: 'Advanced',
      price: '$249',
      instructor: 'David Park',
      category: 'Blockchain',
      color: 'from-yellow-500 to-orange-500'
    }
  ];

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Intermediate': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'Advanced': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <section id="courses" className="py-20 relative overflow-hidden">
      {/* Dynamic background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 via-purple-900/30 to-slate-900/50"></div>
        {/* Animated grid */}
        <div className="absolute inset-0 opacity-5">
          <div className="grid grid-cols-8 grid-rows-8 h-full w-full gap-1">
            {Array.from({ length: 64 }).map((_, i) => (
              <div
                key={i}
                className="bg-white/20 rounded-sm"
                style={{
                  animation: `pulse ${2 + (i % 3)}s ease-in-out infinite`,
                  animationDelay: `${(i * 100) % 2000}ms`
                }}
              ></div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 mb-6 border border-white/20">
            <BookOpen className="h-5 w-5 text-indigo-400" />
            <span className="text-white font-medium">Premium Courses</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Transform Your Skills with
            <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent"> Expert-Led Courses</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Discover our most popular courses designed by industry experts to help you achieve your goals.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <div
              key={course.id}
              className="group bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-500 hover:transform hover:-translate-y-4 hover:shadow-2xl"
              style={{
                animationDelay: `${index * 150}ms`
              }}
            >
              {/* Course Image */}
              <div className="relative overflow-hidden">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
                
                {/* Gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t ${course.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`} />
                
                {/* Play button overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 border border-white/30">
                    <PlayCircle className="h-8 w-8 text-white" />
                  </div>
                </div>

                {/* Level badge */}
                <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium border backdrop-blur-sm ${getLevelColor(course.level)}`}>
                  {course.level}
                </div>

                {/* Price badge */}
                <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-semibold border border-white/20">
                  {course.price}
                </div>
              </div>

              {/* Course Content */}
              <div className="p-6 space-y-4">
                <div>
                  <div className={`text-sm font-medium mb-2 bg-gradient-to-r ${course.color} bg-clip-text text-transparent`}>
                    {course.category}
                  </div>
                  <h3 className="text-xl font-semibold text-white group-hover:text-indigo-300 transition-colors duration-200 mb-2">
                    {course.title}
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {course.description}
                  </p>
                </div>

                {/* Course stats */}
                <div className="flex items-center justify-between text-sm text-gray-400">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>{course.students.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-white font-medium">{course.rating}</span>
                  </div>
                </div>

                {/* Instructor */}
                <div className="text-sm text-gray-400">
                  Instructor: <span className="text-white">{course.instructor}</span>
                </div>

                {/* Enroll button */}
                <button className={`w-full bg-gradient-to-r ${course.color} text-white py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-200 flex items-center justify-center space-x-2 group/btn`}>
                  <span>Enroll Now</span>
                  <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform duration-200" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View all courses button */}
        <div className="text-center mt-12">
          <button className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-full font-semibold hover:bg-white/20 transition-all duration-300 border border-white/20 inline-flex items-center space-x-2 hover:scale-105 shadow-lg">
            <span>View All Courses</span>
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Courses;