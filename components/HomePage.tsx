'use client';

import React from 'react';
import { Briefcase, TrendingUp, ChevronRight, Zap, Target, ArrowRight } from 'lucide-react';

const HomePage = ({ onNavigate }: { onNavigate: (route: 'skills' | 'jobs') => void }) => {
    return (
        <div className="min-h-screen bg-gray-900 text-white overflow-hidden relative font-sans selection:bg-blue-500 selection:text-white">

            {/* Abstract Background */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-gray-900 via-gray-800 to-black opacity-100"></div>

                {/* USER BACKGROUND IMAGE PLACEHOLDER */}
                {/* Replace 'YOUR_IMAGE_URL' with your actual image path */}
                <img
                    src="./home.png"
                    alt="Background"
                    className="absolute inset-0 w-full h-full object-cover opacity-70 mix-blend-overlay"
                />
                {/* Glowing Orbs */}
                <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-blue-600 rounded-full mix-blend-screen filter blur-[128px] opacity-20 animate-pulse"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-purple-600 rounded-full mix-blend-screen filter blur-[128px] opacity-20 animate-pulse delay-1000"></div>
                {/* Grid Pattern Overlay */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
                <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:50px_50px]"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 min-h-screen flex flex-col justify-center">

                {/* Header Section */}
                <div className="mb-20 animate-fade-in-up">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-sm font-medium text-blue-300 mb-6">
                        <Zap size={16} className="fill-blue-300" />
                        <span>AI-Powered Career Acceleration</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-gray-400">
                        Shape Your Future.<br />
                        Master Your Career.
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl leading-relaxed">
                        Navigate the tech landscape with data-driven insights. Discover opportunities that match your potential and bridge the skills gap to your dream role.
                    </p>
                </div>

                {/* Navigation Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl">

                    {/* Job Discovery Card */}
                    <div
                        onClick={() => onNavigate('jobs')}
                        className="group relative bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 cursor-pointer backdrop-blur-sm hover:translate-y-[-4px] hover:shadow-2xl hover:shadow-blue-500/20"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>

                        <div className="relative z-10">
                            <div className="w-14 h-14 bg-blue-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-blue-500/30">
                                <Briefcase className="text-blue-400" size={32} />
                            </div>

                            <h2 className="text-3xl font-bold mb-3 group-hover:text-blue-300 transition-colors">Job Discovery</h2>
                            <p className="text-gray-400 mb-8 text-lg leading-relaxed">
                                Find your perfect role with our smart matching engine. Filter by skills, salary, and experience to land your next opportunity.
                            </p>

                            <div className="flex items-center text-blue-400 font-semibold group-hover:translate-x-2 transition-transform">
                                Explore Jobs <ArrowRight className="ml-2" size={20} />
                            </div>
                        </div>
                    </div>

                    {/* Skills Analyzer Card */}
                    <div
                        onClick={() => onNavigate('skills')}
                        className="group relative bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 cursor-pointer backdrop-blur-sm hover:translate-y-[-4px] hover:shadow-2xl hover:shadow-purple-500/20"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>

                        <div className="relative z-10">
                            <div className="w-14 h-14 bg-purple-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-purple-500/30">
                                <Target className="text-purple-400" size={32} />
                            </div>

                            <h2 className="text-3xl font-bold mb-3 group-hover:text-purple-300 transition-colors">Skills Gap Analyzer</h2>
                            <p className="text-gray-400 mb-8 text-lg leading-relaxed">
                                Analyze your current skillset against market demands. Get personalized learning roadmaps to reach your target role.
                            </p>

                            <div className="flex items-center text-purple-400 font-semibold group-hover:translate-x-2 transition-transform">
                                Analyze Skills <ArrowRight className="ml-2" size={20} />
                            </div>
                        </div>
                    </div>

                </div>

                {/* Footer info */}
                <div className="mt-20 flex gap-8 text-sm text-gray-500 font-medium">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                        Live Market Data
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                        AI Powered
                    </div>
                </div>

            </div>
        </div>
    );
};

export default HomePage;
