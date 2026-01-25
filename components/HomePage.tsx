'use client';

import React, { useState } from 'react';
import { Briefcase, TrendingUp, ChevronRight, Zap, Target, ArrowRight, Menu, X, FileText } from 'lucide-react';
import Image from 'next/image';
import BackgroundLayout from './BackgroundLayout';

const HomePage = ({ onNavigate }: { onNavigate: (route: 'skills' | 'jobs' | 'generator') => void }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const NavLink = ({ label, route, icon: Icon }: { label: string, route?: 'skills' | 'jobs' | 'generator', icon?: any }) => (
        <button
            onClick={() => {
                if (route) onNavigate(route);
                setIsMobileMenuOpen(false);
            }}
            className="flex items-center gap-2 px-4 py-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all font-medium"
        >
            {Icon && <Icon size={18} />}
            {label}
        </button>
    );

    return (
        <BackgroundLayout>
            <div className="relative z-10 min-h-screen flex flex-col">

                {/* Navbar */}
                <nav className="fixed top-0 left-0 w-full px-6 py-4 z-50 bg-black/20 backdrop-blur-lg border-b border-white/5 animate-fade-in-down">
                    <div className="max-w-7xl mx-auto flex items-center justify-between">
                        {/* Logo */}
                        <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo(0, 0)}>
                            <div className="w-10 h-10 bg-blue-600/20 rounded-xl flex items-center justify-center border border-blue-500/30 backdrop-blur-sm">
                                <Briefcase className="text-blue-400" size={20} />
                            </div>
                            <span className="text-2xl font-bold tracking-tight text-white">CareerHub</span>
                        </div>

                        {/* Desktop Nav */}
                        <div className="hidden md:flex items-center gap-2">
                            <NavLink label="Job Discovery" route="jobs" icon={Briefcase} />
                            <NavLink label="Skills Analysis" route="skills" icon={Target} />
                            <NavLink label="Job Generator" route="generator" icon={FileText} />
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            className="md:hidden p-2 text-gray-300 hover:bg-white/10 rounded-lg"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? <X /> : <Menu />}
                        </button>
                    </div>

                    {/* Mobile Menu Overlay */}
                    {isMobileMenuOpen && (
                        <div className="absolute top-full left-0 w-full bg-gray-900/95 backdrop-blur-xl border-b border-white/10 p-4 flex flex-col gap-2 md:hidden animate-fade-in-down shadow-2xl">
                            <NavLink label="Job Discovery" route="jobs" icon={Briefcase} />
                            <NavLink label="Skills Analysis" route="skills" icon={Target} />
                            <NavLink label="Job Generator" route="generator" icon={FileText} />
                        </div>
                    )}
                </nav>

                {/* Main Content */}
                <main className="flex-1 flex flex-col justify-center pt-32 pb-10 px-6 max-w-7xl mx-auto w-full">

                    {/* Hero Section with Image */}
                    <div className="flex flex-col-reverse lg:flex-row items-center gap-12 mb-20">
                        {/* Text Content */}
                        <div className="flex-1 animate-fade-in-up">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-sm font-medium text-blue-300 mb-6">
                                <Zap size={16} className="fill-blue-300" />
                                <span>AI-Powered Career Acceleration</span>
                            </div>
                            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-gray-400 leading-tight">
                                Shape Your Future.<br />
                                Master Your Career.
                            </h1>
                            <p className="text-xl text-gray-400 max-w-xl leading-relaxed mb-8">
                                Navigate the tech landscape with data-driven insights. Discover opportunities that match your potential and bridge the skills gap to your dream role.
                            </p>

                            <div className="flex gap-4">
                                <button onClick={() => onNavigate('jobs')} className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-lg shadow-blue-600/20 transition-all hover:scale-105">
                                    Browse Jobs
                                </button>
                                <button onClick={() => onNavigate('skills')} className="px-8 py-3 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-xl font-bold transition-all hover:scale-105">
                                    Analyze Skills
                                </button>
                            </div>
                        </div>

                        {/* Image Content */}
                        <div className="flex-1 relative animate-fade-in-up delay-100 flex justify-center">
                            <div className="relative w-full aspect-square max-w-[500px]">
                                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 rounded-full blur-3xl -z-10 animate-pulse"></div>
                                <Image
                                    src="/image1.png"
                                    alt="Career Growth Visualization"
                                    width={600}
                                    height={600}
                                    className="object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
                                    priority
                                />
                            </div>
                        </div>
                    </div>

                    {/* Navigation Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">

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

                                <h2 className="text-2xl font-bold mb-3 group-hover:text-blue-300 transition-colors">Job Discovery</h2>
                                <p className="text-gray-400 mb-6 leading-relaxed">
                                    Find your perfect role with our smart matching engine.
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

                                <h2 className="text-2xl font-bold mb-3 group-hover:text-purple-300 transition-colors">Skills Gap Analyzer</h2>
                                <p className="text-gray-400 mb-6 leading-relaxed">
                                    Analyze your skillset and get personalized roadmaps.
                                </p>

                                <div className="flex items-center text-purple-400 font-semibold group-hover:translate-x-2 transition-transform">
                                    Analyze Skills <ArrowRight className="ml-2" size={20} />
                                </div>
                            </div>
                        </div>

                        {/* Job Description Generator Card - Full Width */}
                        <div
                            onClick={() => onNavigate('generator')}
                            className="group relative bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 cursor-pointer backdrop-blur-sm hover:translate-y-[-4px] hover:shadow-2xl hover:shadow-green-500/20 md:col-span-2"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-green-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>

                            <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-8">
                                <div className="w-14 h-14 bg-green-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-green-500/30 shrink-0">
                                    <Zap className="text-green-400" size={32} />
                                </div>

                                <div className="flex-1">
                                    <h2 className="text-2xl font-bold mb-3 group-hover:text-green-300 transition-colors">AI Job Description Generator</h2>
                                    <p className="text-gray-400 mb-6 leading-relaxed">
                                        Create professional, ATS-optimized job descriptions in seconds using our AI-powered templates.
                                    </p>

                                    <div className="flex items-center text-green-400 font-semibold group-hover:translate-x-2 transition-transform">
                                        Generate Now <ArrowRight className="ml-2" size={20} />
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Footer info */}
                    <div className="mt-20 flex gap-8 text-sm text-gray-500 font-medium justify-center">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                            Live Market Data
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                            AI Powered
                        </div>
                    </div>

                </main>
            </div>
        </BackgroundLayout>
    );
};

export default HomePage;
