import React, { useState, useRef, useEffect } from 'react';
import { Menu, X, Globe, BookOpen, User, LogOut, Settings, CreditCard, Bell, ChevronDown } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import AuthModal from './AuthModal';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const { user, logout } = useAuth();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Courses', href: '#courses' },
    { name: 'Features', href: '#features' },
    { name: 'Support', href: '/support' },
  ];

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
      className="absolute right-0 top-full mt-3 w-80 glass-morphism rounded-2xl border border-white/20 shadow-2xl z-50 animate-fade-in overflow-hidden"
    >
      {/* User Info Header */}
      <div className="p-6 bg-gradient-to-r from-indigo-500/20 to-purple-600/20 border-b border-white/10">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="w-14 h-14 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
              <User className="h-7 w-7 text-white" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 rounded-full border-2 border-white/20 animate-pulse"></div>
          </div>
          <div className="flex-1">
            <h3 className="text-white font-bold text-lg">{user?.name}</h3>
            <p className="text-gray-300 text-sm">{user?.email}</p>
            <div className="flex items-center mt-1">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
              <span className="text-green-400 text-xs font-medium">Online</span>
            </div>
          </div>
        </div>
        
        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="text-center bg-white/10 rounded-xl p-3">
            <div className="text-indigo-400 font-bold text-xl">12</div>
            <div className="text-gray-300 text-xs font-medium">Courses</div>
          </div>
          <div className="text-center bg-white/10 rounded-xl p-3">
            <div className="text-green-400 font-bold text-xl">89h</div>
            <div className="text-gray-300 text-xs font-medium">Learned</div>
          </div>
          <div className="text-center bg-white/10 rounded-xl p-3">
            <div className="text-yellow-400 font-bold text-xl">3</div>
            <div className="text-gray-300 text-xs font-medium">Certificates</div>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="p-3">
        <a 
          href="/dashboard" 
          className="flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-white/10 transition-all duration-200 group"
        >
          <div className="p-2 bg-indigo-500/20 rounded-lg group-hover:bg-indigo-500/30 transition-colors duration-200">
            <BookOpen className="h-5 w-5 text-indigo-400" />
          </div>
          <span className="text-white font-medium">Dashboard</span>
          <ChevronDown className="h-4 w-4 text-gray-400 ml-auto rotate-[-90deg]" />
        </a>
        
        <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-white/10 transition-all duration-200 group">
          <div className="p-2 bg-gray-500/20 rounded-lg group-hover:bg-gray-500/30 transition-colors duration-200">
            <Settings className="h-5 w-5 text-gray-400 group-hover:text-white transition-colors duration-200" />
          </div>
          <span className="text-white font-medium">Settings</span>
        </button>
        
        <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-white/10 transition-all duration-200 group">
          <div className="p-2 bg-blue-500/20 rounded-lg group-hover:bg-blue-500/30 transition-colors duration-200">
            <CreditCard className="h-5 w-5 text-blue-400 group-hover:text-white transition-colors duration-200" />
          </div>
          <span className="text-white font-medium">Billing</span>
        </button>
        
        <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-white/10 transition-all duration-200 group">
          <div className="p-2 bg-yellow-500/20 rounded-lg group-hover:bg-yellow-500/30 transition-colors duration-200">
            <Bell className="h-5 w-5 text-yellow-400 group-hover:text-white transition-colors duration-200" />
          </div>
          <span className="text-white font-medium">Notifications</span>
          <span className="ml-auto bg-red-500 text-white text-xs px-2 py-1 rounded-full animate-pulse">3</span>
        </button>
      </div>

      {/* Logout */}
      <div className="p-3 border-t border-white/10">
        <button
          onClick={() => {
            logout();
            setShowProfileDropdown(false);
          }}
          className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-red-500/20 transition-all duration-200 group"
        >
          <div className="p-2 bg-red-500/20 rounded-lg group-hover:bg-red-500/30 transition-colors duration-200">
            <LogOut className="h-5 w-5 text-red-400" />
          </div>
          <span className="text-red-400 font-medium">Sign Out</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 glass-morphism border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center space-x-3 group cursor-pointer">
              <div className="relative">
                <Globe className="h-10 w-10 text-indigo-400 group-hover:rotate-12 transition-transform duration-300" />
                <div className="absolute inset-0 h-10 w-10 bg-indigo-400/20 rounded-full blur-lg group-hover:blur-xl transition-all duration-300"></div>
              </div>
              <span className="text-2xl font-bold text-white group-hover:text-gradient-primary transition-all duration-300">
                EduSphere
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="relative text-gray-300 hover:text-white transition-colors duration-300 font-medium group"
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
                    className="flex items-center space-x-3 glass-morphism rounded-full px-4 py-2 hover:bg-white/20 transition-all duration-300 group"
                  >
                    <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                      <User className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-white font-medium">{user.name}</span>
                    <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${showProfileDropdown ? 'rotate-180' : ''}`} />
                  </button>
                  {showProfileDropdown && <ProfileDropdown />}
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => openAuthModal('login')}
                    className="text-white font-medium px-6 py-2 rounded-xl hover:bg-white/10 transition-all duration-300"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => openAuthModal('register')}
                    className="btn-primary"
                  >
                    Sign Up
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
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <div className="md:hidden py-4 border-t border-white/10 animate-fade-in">
              <div className="flex flex-col space-y-3">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200 font-medium px-4 py-2 rounded-lg hover:bg-white/10"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </a>
                ))}
                {user ? (
                  <div className="border-t border-white/10 pt-3 mt-3">
                    <div className="flex items-center space-x-3 px-4 py-2 mb-2">
                      <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                        <User className="h-4 w-4 text-white" />
                      </div>
                      <span className="text-white font-medium">{user.name}</span>
                    </div>
                    <button
                      onClick={logout}
                      className="flex items-center space-x-2 text-red-400 hover:text-red-300 transition-colors duration-200 px-4 py-2 w-full text-left"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col space-y-2 pt-3 border-t border-white/10">
                    <button
                      onClick={() => {
                        openAuthModal('login');
                        setIsOpen(false);
                      }}
                      className="text-white font-medium px-4 py-2 rounded-lg hover:bg-white/10 transition-all duration-200 text-left"
                    >
                      Sign In
                    </button>
                    <button
                      onClick={() => {
                        openAuthModal('register');
                        setIsOpen(false);
                      }}
                      className="btn-primary mx-4"
                    >
                      Sign Up
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