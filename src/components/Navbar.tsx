import React, { useState, useRef, useEffect } from 'react';
import { Menu, X, Globe, BookOpen, User, LogOut, Settings, CreditCard, Bell, ChevronDown, Crown, Zap } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import AuthModal from './AuthModal';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, logout } = useAuth();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Courses', href: '#courses' },
    { name: 'Features', href: '#features' },
    { name: 'Pricing', href: '#pricing' },
  ];

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowProfileDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const openAuthModal = (mode: 'login' | 'register') => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  const ProfileDropdown = () => (
    <div 
      ref={dropdownRef}
      className="absolute right-0 top-full mt-4 w-80 glass-morphism rounded-3xl border border-white/20 shadow-2xl z-50 animate-fade-in overflow-hidden"
    >
      {/* User Info Header */}
      <div className="p-6 bg-gradient-to-r from-indigo-500/20 to-purple-600/20 border-b border-white/10">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center shadow-xl">
              <User className="h-8 w-8 text-white" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-400 rounded-full border-3 border-white/20 animate-pulse flex items-center justify-center">
              <Crown className="h-3 w-3 text-white" />
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-white font-bold text-xl">{user?.name}</h3>
            <p className="text-gray-300 text-sm">{user?.email}</p>
            <div className="flex items-center mt-2">
              <Crown className="h-4 w-4 text-yellow-400 mr-2" />
              <span className="text-yellow-400 text-sm font-semibold">Premium Member</span>
            </div>
          </div>
        </div>
        
        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="text-center bg-white/10 rounded-xl p-4">
            <div className="text-indigo-400 font-bold text-2xl">12</div>
            <div className="text-gray-300 text-xs font-medium">Courses</div>
          </div>
          <div className="text-center bg-white/10 rounded-xl p-4">
            <div className="text-green-400 font-bold text-2xl">89h</div>
            <div className="text-gray-300 text-xs font-medium">Learned</div>
          </div>
          <div className="text-center bg-white/10 rounded-xl p-4">
            <div className="text-yellow-400 font-bold text-2xl">3</div>
            <div className="text-gray-300 text-xs font-medium">Certificates</div>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="p-4">
        <a 
          href="/dashboard" 
          className="flex items-center space-x-4 px-4 py-4 rounded-xl hover:bg-white/10 transition-all duration-200 group"
        >
          <div className="p-3 bg-indigo-500/20 rounded-xl group-hover:bg-indigo-500/30 transition-colors duration-200">
            <BookOpen className="h-6 w-6 text-indigo-400" />
          </div>
          <span className="text-white font-semibold text-lg">Dashboard</span>
          <ChevronDown className="h-5 w-5 text-gray-400 ml-auto rotate-[-90deg]" />
        </a>
        
        <button className="w-full flex items-center space-x-4 px-4 py-4 rounded-xl hover:bg-white/10 transition-all duration-200 group">
          <div className="p-3 bg-gray-500/20 rounded-xl group-hover:bg-gray-500/30 transition-colors duration-200">
            <Settings className="h-6 w-6 text-gray-400 group-hover:text-white transition-colors duration-200" />
          </div>
          <span className="text-white font-semibold text-lg">Settings</span>
        </button>
        
        <button className="w-full flex items-center space-x-4 px-4 py-4 rounded-xl hover:bg-white/10 transition-all duration-200 group">
          <div className="p-3 bg-yellow-500/20 rounded-xl group-hover:bg-yellow-500/30 transition-colors duration-200">
            <Crown className="h-6 w-6 text-yellow-400 group-hover:text-white transition-colors duration-200" />
          </div>
          <span className="text-white font-semibold text-lg">Premium</span>
        </button>
      </div>

      {/* Logout */}
      <div className="p-4 border-t border-white/10">
        <button
          onClick={() => {
            logout();
            setShowProfileDropdown(false);
          }}
          className="w-full flex items-center space-x-4 px-4 py-4 rounded-xl hover:bg-red-500/20 transition-all duration-200 group"
        >
          <div className="p-3 bg-red-500/20 rounded-xl group-hover:bg-red-500/30 transition-colors duration-200">
            <LogOut className="h-6 w-6 text-red-400" />
          </div>
          <span className="text-red-400 font-semibold text-lg">Sign Out</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass-morphism border-b border-white/10 py-2' : 'bg-transparent py-4'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Enhanced Logo */}
            <div className="flex items-center space-x-3 group cursor-pointer">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-xl group-hover:rotate-12 transition-transform duration-300">
                  <Globe className="h-7 w-7 text-white" />
                </div>
                <div className="absolute inset-0 w-12 h-12 bg-indigo-400/20 rounded-xl blur-lg group-hover:blur-xl transition-all duration-300"></div>
              </div>
              <div>
                <span className="text-2xl font-black text-white group-hover:text-gradient-primary transition-all duration-300">
                  EduSphere
                </span>
                <div className="text-xs text-gray-400 font-medium">Premium Learning</div>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="relative text-gray-300 hover:text-white transition-colors duration-300 font-semibold text-lg group"
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-400 to-purple-400 group-hover:w-full transition-all duration-300"></span>
                </a>
              ))}
            </div>

            {/* Auth Buttons / User Menu */}
            <div className="hidden md:flex items-center space-x-4">
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                    className="flex items-center space-x-3 glass-morphism rounded-full px-6 py-3 hover:bg-white/20 transition-all duration-300 group border border-white/20"
                  >
                    <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                      <User className="h-5 w-5 text-white" />
                    </div>
                    <div className="text-left">
                      <div className="text-white font-semibold">{user.name}</div>
                      <div className="text-yellow-400 text-xs font-medium flex items-center">
                        <Crown className="h-3 w-3 mr-1" />
                        Premium
                      </div>
                    </div>
                    <ChevronDown className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${showProfileDropdown ? 'rotate-180' : ''}`} />
                  </button>
                  {showProfileDropdown && <ProfileDropdown />}
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => openAuthModal('login')}
                    className="text-white font-semibold px-6 py-3 rounded-xl hover:bg-white/10 transition-all duration-300 text-lg"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => openAuthModal('register')}
                    className="btn-primary text-lg px-8 py-3 flex items-center space-x-2"
                  >
                    <Crown className="h-5 w-5" />
                    <span>Start Free</span>
                  </button>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-300 hover:text-white transition-colors duration-200 p-2"
              >
                {isOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <div className="md:hidden py-6 border-t border-white/10 animate-fade-in">
              <div className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200 font-semibold px-4 py-3 rounded-lg hover:bg-white/10 text-lg"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </a>
                ))}
                {user ? (
                  <div className="border-t border-white/10 pt-4 mt-4">
                    <div className="flex items-center space-x-3 px-4 py-3 mb-4">
                      <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <div className="text-white font-semibold">{user.name}</div>
                        <div className="text-yellow-400 text-sm flex items-center">
                          <Crown className="h-3 w-3 mr-1" />
                          Premium
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={logout}
                      className="flex items-center space-x-2 text-red-400 hover:text-red-300 transition-colors duration-200 px-4 py-3 w-full text-left"
                    >
                      <LogOut className="h-5 w-5" />
                      <span className="font-semibold">Sign Out</span>
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col space-y-3 pt-4 border-t border-white/10">
                    <button
                      onClick={() => {
                        openAuthModal('login');
                        setIsOpen(false);
                      }}
                      className="text-white font-semibold px-4 py-3 rounded-lg hover:bg-white/10 transition-all duration-200 text-left text-lg"
                    >
                      Sign In
                    </button>
                    <button
                      onClick={() => {
                        openAuthModal('register');
                        setIsOpen(false);
                      }}
                      className="btn-primary mx-4 flex items-center justify-center space-x-2"
                    >
                      <Crown className="h-5 w-5" />
                      <span>Start Free</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>

      {showAuthModal && (
        <AuthModal 
          onClose={() => setShowAuthModal(false)} 
          initialMode={authMode}
        />
      )}
    </>
  );
};

export default Navbar;