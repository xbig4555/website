import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Courses from '../components/Courses';
import Stats from '../components/Stats';
import Testimonials from '../components/Testimonials';
import CTA from '../components/CTA';
import Footer from '../components/Footer';
import ParticleNetwork from '../components/ParticleNetwork';

const HomePage: React.FC = () => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <ParticleNetwork />
      <Navbar />
      <Hero />
      <Features />
      <Stats />
      <Courses />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  );
};

export default HomePage;