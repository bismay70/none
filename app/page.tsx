'use client';

import { useState } from 'react';
import SkillsGapAnalyzer from '@/components/SkillsGapAnalyzer';
import JobDiscoveryApp from '@/components/JobDiscoveryApp';
import HomePage from '@/components/HomePage';
import Footer from '@/components/Footer';
import { Briefcase, TrendingUp, Home } from 'lucide-react';

export default function App() {
  const [activeRoute, setActiveRoute] = useState<'home' | 'skills' | 'jobs'>('home');

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Navigation Bar - Only visible when NOT on home page */}
      {activeRoute !== 'home' && (
        <nav className="bg-white/10 border-b border-white/10 backdrop-blur-md sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <div
                className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => setActiveRoute('home')}
              >
                <TrendingUp className="text-blue-400" size={28} />
                <span className="text-xl font-bold text-white">Career Hub</span>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setActiveRoute('home')}
                  className="px-4 py-2.5 rounded-lg font-medium text-gray-300 hover:bg-white/10 transition-all flex items-center"
                >
                  <Home size={18} className="mr-2" />
                  Home
                </button>
                <button
                  onClick={() => setActiveRoute('skills')}
                  className={`px-4 py-2.5 rounded-lg font-medium transition-all flex items-center ${activeRoute === 'skills'
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                    : 'bg-white/5 text-gray-300 hover:bg-white/10'
                    }`}
                >
                  <TrendingUp size={18} className="mr-2" />
                  Skills Analysis
                </button>
                <button
                  onClick={() => setActiveRoute('jobs')}
                  className={`px-4 py-2.5 rounded-lg font-medium transition-all flex items-center ${activeRoute === 'jobs'
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                    : 'bg-white/5 text-gray-300 hover:bg-white/10'
                    }`}
                >
                  <Briefcase size={18} className="mr-2" />
                  Job Discovery
                </button>
              </div>
            </div>
          </div>
        </nav>
      )}

      {/* Content */}
      <div className="transition-opacity duration-300">
        {activeRoute === 'home' && <HomePage onNavigate={setActiveRoute} />}
        {activeRoute === 'skills' && <SkillsGapAnalyzer />}
        {activeRoute === 'jobs' && <JobDiscoveryApp />}
        <Footer />
      </div>
    </div>
  );
}