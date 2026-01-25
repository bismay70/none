'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Search, MapPin, DollarSign, Briefcase, Clock, Grid, List, Filter, X, Bookmark, Send, Home, Briefcase as BriefcaseIcon, Menu, User, FileText, Upload, CheckCircle } from 'lucide-react';
import BackgroundLayout from './BackgroundLayout';

// Types
interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  salary: number;
  experience: number;
  skills: string[];
  type: string;
  postedDays: number;
  matchScore: number;
  description: string;
}

interface Filters {
  locations: string[];
  experience: [number, number];
  salary: [number, number];
  skills: string[];
  types: string[];
  postedDate: string;
}

interface CandidateProfile {
  name: string;
  email: string;
  phone: string;
  title: string;
  bio: string;
  experience: number;
  skills: string[];
  resumeName?: string;
}

// Mock job data generator - stable generation
const generateMockJobs = (): Job[] => {
  const companies = ['TechCorp', 'InnovateLabs', 'DataDrive', 'CloudNine', 'DevMasters', 'AIFirst', 'WebWorks', 'CodeCraft', 'ByteBuilders', 'AppSphere'];
  const titles = ['Senior Frontend Developer', 'Full Stack Engineer', 'Backend Developer', 'DevOps Engineer', 'UI/UX Designer', 'Product Manager', 'Data Scientist', 'ML Engineer', 'Mobile Developer', 'Software Architect'];
  const locations = ['San Francisco, CA', 'New York, NY', 'Austin, TX', 'Seattle, WA', 'Boston, MA', 'Remote', 'Chicago, IL', 'Denver, CO', 'Los Angeles, CA', 'Portland, OR'];
  const skills = ['React', 'Node.js', 'Python', 'TypeScript', 'AWS', 'Docker', 'MongoDB', 'PostgreSQL', 'GraphQL', 'Kubernetes', 'Vue.js', 'Angular', 'Go', 'Rust', 'Java'];
  const jobTypes = ['Full-time', 'Remote', 'Hybrid', 'Part-time'];
  const descriptions = [
    'Join our team to build cutting-edge applications using modern technologies. We offer competitive compensation and excellent benefits.',
    'Work on innovative solutions that impact millions of users worldwide. Collaborate with talented engineers in a fast-paced environment.',
    'Be part of a dynamic team driving digital transformation. We value creativity, innovation, and continuous learning.',
    'Shape the future of technology with us. Work on challenging projects that push the boundaries of what\'s possible.',
    'Collaborate with talented engineers on exciting projects. We offer flexible work arrangements and professional growth opportunities.'
  ];

  return Array.from({ length: 60 }, (_, i) => ({
    id: i + 1,
    title: titles[i % titles.length],
    company: companies[Math.floor((i * 3) % companies.length)],
    location: locations[Math.floor((i * 7) % locations.length)],
    salary: 80000 + (i * 1500) % 100000,
    experience: i % 10,
    skills: Array.from({ length: (i % 4) + 3 }, (_, j) =>
      skills[(i + j * 3) % skills.length]
    ).filter((v, idx, a) => a.indexOf(v) === idx),
    type: jobTypes[i % jobTypes.length],
    postedDays: i % 30,
    matchScore: 60 + (i % 38),
    description: descriptions[i % descriptions.length]
  }));
};

const calculateMatchScore = (job: Job, profile: CandidateProfile | null): number => {
  if (!profile) return job.matchScore; // Return existing mock score if no profile

  let score = 0;
  let totalWeight = 0;

  // Skills Match (70% weight)
  const skillsWeight = 70;
  totalWeight += skillsWeight;
  const matchingSkills = job.skills.filter(skill =>
    profile.skills.some(profileSkill => profileSkill.toLowerCase() === skill.toLowerCase())
  );
  const skillsScore = (matchingSkills.length / job.skills.length) * skillsWeight;
  score += skillsScore;

  // Experience Match (30% weight)
  const experienceWeight = 30;
  totalWeight += experienceWeight;
  if (profile.experience >= job.experience) {
    score += experienceWeight;
  } else {
    // Partial score for experience
    score += (profile.experience / Math.max(job.experience, 1)) * experienceWeight;
  }

  return Math.round(score);
};

// Navigation Component
const Navigation = ({ currentRoute, onNavigate, hasProfile }: { currentRoute: string; onNavigate: (route: string) => void; hasProfile: boolean }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white/10 border-b border-white/10 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <BriefcaseIcon className="text-blue-400" size={28} />
            <span className="text-xl font-bold text-white">JobFinder</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-1">
            <button
              onClick={() => onNavigate('/')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${currentRoute === '/'
                ? 'bg-blue-500/20 text-blue-200'
                : 'text-gray-300 hover:bg-white/5'
                }`}>
              <Home size={18} className="inline mr-2" />
              Discover Jobs
            </button>
            <button
              onClick={() => onNavigate('/saved')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${currentRoute === '/saved'
                ? 'bg-blue-500/20 text-blue-200'
                : 'text-gray-300 hover:bg-white/5'
                }`}>
              <Bookmark size={18} className="inline mr-2" />
              Saved Jobs
            </button>
            <button
              onClick={() => onNavigate('/profile')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${currentRoute === '/profile'
                ? 'bg-blue-500/20 text-blue-200'
                : 'text-gray-300 hover:bg-white/5'
                }`}>
              <User size={18} className="inline mr-2" />
              {hasProfile ? 'Profile' : 'Create Profile'}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-300 hover:bg-white/5 rounded-lg">
            <Menu size={24} />
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/10">
            <button
              onClick={() => {
                onNavigate('/');
                setMobileMenuOpen(false);
              }}
              className={`w-full px-4 py-3 rounded-lg font-medium transition-colors text-left mb-2 ${currentRoute === '/'
                ? 'bg-blue-500/20 text-blue-200'
                : 'text-gray-300 hover:bg-white/5'
                }`}>
              <Home size={18} className="inline mr-2" />
              Discover Jobs
            </button>
            <button
              onClick={() => {
                onNavigate('/saved');
                setMobileMenuOpen(false);
              }}
              className={`w-full px-4 py-3 rounded-lg font-medium transition-colors text-left mb-2 ${currentRoute === '/saved'
                ? 'bg-blue-500/20 text-blue-200'
                : 'text-gray-300 hover:bg-white/5'
                }`}>
              <Bookmark size={18} className="inline mr-2" />
              Saved Jobs
            </button>
            <button
              onClick={() => {
                onNavigate('/profile');
                setMobileMenuOpen(false);
              }}
              className={`w-full px-4 py-3 rounded-lg font-medium transition-colors text-left ${currentRoute === '/profile'
                ? 'bg-blue-500/20 text-blue-200'
                : 'text-gray-300 hover:bg-white/5'
                }`}>
              <User size={18} className="inline mr-2" />
              {hasProfile ? 'Profile' : 'Create Profile'}
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

// Match Score Ring Component
const MatchScoreRing = ({ score }: { score: number }) => {
  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="relative w-14 h-14">
      <svg className="transform -rotate-90 w-14 h-14">
        <circle cx="28" cy="28" r={radius} stroke="#ffffff33" strokeWidth="4" fill="none" />
        <circle
          cx="28"
          cy="28"
          r={radius}
          stroke={score >= 80 ? '#10b981' : score >= 70 ? '#3b82f6' : '#f59e0b'}
          strokeWidth="4"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-500"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xs font-bold text-white">{score}</span>
      </div>
    </div>
  );
};

// Profile Creation Modal / Page
const ProfileForm = ({
  initialProfile,
  onSave,
  onCancel
}: {
  initialProfile: CandidateProfile | null;
  onSave: (profile: CandidateProfile) => void;
  onCancel: () => void;
}) => {
  const [formData, setFormData] = useState<CandidateProfile>(initialProfile || {
    name: '',
    email: '',
    phone: '',
    title: '',
    bio: '',
    experience: 0,
    skills: [],
    resumeName: ''
  });

  const [newSkill, setNewSkill] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const addSkill = () => {
    if (newSkill && !formData.skills.includes(newSkill)) {
      setFormData({ ...formData, skills: [...formData.skills, newSkill] });
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter(s => s !== skillToRemove)
    });
  };

  return (
    <div className="max-w-3xl mx-auto bg-white/10 backdrop-blur-md rounded-2xl shadow-xl border border-white/10 mt-8">
      <div className="p-6 border-b border-white/10">
        <h2 className="text-2xl font-bold text-white">
          {initialProfile ? 'Edit Candidate Profile' : 'Create Candidate Profile'}
        </h2>
        <p className="text-gray-300 mt-1">
          Complete your profile to unlock one-click applications
        </p>
      </div>

      <form onSubmit={handleSubmit} className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 bg-white/5 border border-white/10 text-white rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="e.g. Alex Johnson"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2 bg-white/5 border border-white/10 text-white rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="alex@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Phone</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={e => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-2 bg-white/5 border border-white/10 text-white rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="+1 (555) 000-0000"
            />
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-300 mb-2">Professional Title</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={e => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 bg-white/5 border border-white/10 text-white rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="e.g. Senior Frontend Developer"
            />
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-300 mb-2">Professional Bio</label>
            <textarea
              rows={4}
              value={formData.bio}
              onChange={e => setFormData({ ...formData, bio: e.target.value })}
              className="w-full px-4 py-2 bg-white/5 border border-white/10 text-white rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Briefly describe your experience and career goals..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Years of Experience</label>
            <input
              type="number"
              min="0"
              max="50"
              value={formData.experience}
              onChange={e => setFormData({ ...formData, experience: parseInt(e.target.value) || 0 })}
              className="w-full px-4 py-2 bg-white/5 border border-white/10 text-white rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-300 mb-2">Skills</label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={newSkill}
                onChange={e => setNewSkill(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                className="flex-1 px-4 py-2 bg-white/5 border border-white/10 text-white rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Add a skill and press Enter"
              />
              <button
                type="button"
                onClick={addSkill}
                className="px-4 py-2 bg-blue-500/20 text-blue-200 border border-blue-500/30 rounded-lg hover:bg-blue-500/30"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.skills.map(skill => (
                <span key={skill} className="bg-white/10 border border-white/10 text-gray-200 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                  {skill}
                  <button
                    type="button"
                    onClick={() => removeSkill(skill)}
                    className="hover:text-red-400"
                  >
                    <X size={14} />
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-300 mb-4">Resume / Documents</label>

            <div className="bg-white/5 rounded-xl border border-white/10 overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-white/5 text-gray-400 text-sm">
                  <tr>
                    <th className="px-6 py-3 font-medium">Document Name</th>
                    <th className="px-6 py-3 font-medium">Type</th>
                    <th className="px-6 py-3 font-medium text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {formData.resumeName ? (
                    <tr className="group hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3 text-white font-medium">
                          <FileText className="text-blue-400" size={20} />
                          {formData.resumeName}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-400 text-sm">PDF/PSF</td>
                      <td className="px-6 py-4 text-right">
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, resumeName: '' })}
                          className="text-red-400 hover:text-red-300 p-2 hover:bg-red-500/10 rounded-lg transition-colors"
                        >
                          <X size={18} />
                        </button>
                      </td>
                    </tr>
                  ) : (
                    <tr>
                      <td colSpan={3} className="px-6 py-8 text-center text-gray-500">
                        No documents uploaded
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>

              <div
                onClick={() => setFormData({ ...formData, resumeName: 'resume-' + Date.now() + '.pdf' })}
                className="border-t border-white/10 p-4 bg-white/5 hover:bg-white/10 transition-colors cursor-pointer flex items-center justify-center gap-2 text-blue-400 font-medium"
              >
                <Upload size={18} />
                Upload New Resume (PDF/PSF)
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-6 border-t border-white/10">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-2.5 border border-white/10 text-gray-300 rounded-lg font-medium hover:bg-white/5"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            className="px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 shadow-sm"
          >
            Save Profile
          </button>
        </div>
      </form>
    </div>
  );
};

// Jobs Discovery Page Component
const CompanyTicker = () => {
  const companies = [
    { name: 'Google', color: 'text-white' },
    { name: 'Microsoft', color: 'text-blue-400' },
    { name: 'Deloitte', color: 'text-green-500' },
    { name: 'Cognizant', color: 'text-blue-300' },
    { name: 'Amazon', color: 'text-orange-400' },
    { name: 'Meta', color: 'text-blue-500' },
    { name: 'Netflix', color: 'text-red-500' },
    { name: 'Apple', color: 'text-gray-200' },
  ];

  return (
    <div className="w-full overflow-hidden bg-white/5 border-y border-white/5 backdrop-blur-sm py-4 mb-6">
      <div className="flex animate-scroll whitespace-nowrap">
        {[...companies, ...companies, ...companies].map((company, index) => (
          <div key={index} className="flex items-center mx-8">
            <span className={`text-xl font-bold ${company.color} opacity-80 hover:opacity-100 transition-opacity`}>
              {company.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const JobsDiscoveryPage = ({
  jobs,
  savedJobIds,
  appliedJobIds,
  profile,
  onToggleSave,
  onApply
}: {
  jobs: Job[];
  savedJobIds: number[];
  appliedJobIds: number[];
  profile: CandidateProfile | null;
  onToggleSave: (id: number) => void;
  onApply: (id: number) => void;
}) => {
  const [viewMode, setViewMode] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [sortBy, setSortBy] = useState('match');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [displayCount, setDisplayCount] = useState(12);
  const [skillSearch, setSkillSearch] = useState('');

  const [filters, setFilters] = useState<Filters>({
    locations: [],
    experience: [0, 10],
    salary: [80000, 180000],
    skills: [],
    types: [],
    postedDate: 'all'
  });

  // Calculate matching scores
  const scoredJobs = useMemo(() => {
    return jobs.map(job => ({
      ...job,
      matchScore: calculateMatchScore(job, profile)
    }));
  }, [jobs, profile]);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(searchQuery), 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Infinite scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 500) {
        setDisplayCount(prev => Math.min(prev + 12, filteredJobs.length));
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const allLocations = useMemo(() => [...new Set(jobs.map(j => j.location))], [jobs]);
  const allSkills = useMemo(() => [...new Set(jobs.flatMap(j => j.skills))].sort(), [jobs]);

  // Filtered skills based on search
  const filteredSkills = useMemo(() => {
    if (!skillSearch) return allSkills;
    return allSkills.filter(skill =>
      skill.toLowerCase().includes(skillSearch.toLowerCase())
    );
  }, [allSkills, skillSearch]);

  const filteredJobs = useMemo(() => {
    let filtered = scoredJobs.filter(job => {
      const searchLower = debouncedSearch.toLowerCase();
      const matchesSearch = !debouncedSearch ||
        job.title.toLowerCase().includes(searchLower) ||
        job.company.toLowerCase().includes(searchLower) ||
        job.description.toLowerCase().includes(searchLower);

      const matchesLocation = filters.locations.length === 0 || filters.locations.includes(job.location);
      const matchesExperience = job.experience >= filters.experience[0] && job.experience <= filters.experience[1];
      const matchesSalary = job.salary >= filters.salary[0] && job.salary <= filters.salary[1];
      const matchesSkills = filters.skills.length === 0 || filters.skills.some(s => job.skills.includes(s));
      const matchesType = filters.types.length === 0 || filters.types.includes(job.type);

      const matchesDate = filters.postedDate === 'all' ||
        (filters.postedDate === '24hrs' && job.postedDays <= 1) ||
        (filters.postedDate === 'week' && job.postedDays <= 7) ||
        (filters.postedDate === 'month' && job.postedDays <= 30);

      return matchesSearch && matchesLocation && matchesExperience && matchesSalary && matchesSkills && matchesType && matchesDate;
    });

    filtered.sort((a, b) => {
      if (sortBy === 'match') return b.matchScore - a.matchScore;
      if (sortBy === 'salary') return b.salary - a.salary;
      if (sortBy === 'date') return a.postedDays - b.postedDays;
      if (sortBy === 'experience') return a.experience - b.experience;
      return 0;
    });

    return filtered;
  }, [scoredJobs, debouncedSearch, filters, sortBy]);

  const applyPreset = (preset: string) => {
    if (preset === 'remote') {
      setFilters(prev => ({ ...prev, types: ['Remote'], locations: [] }));
    } else if (preset === 'highSalary') {
      setFilters(prev => ({ ...prev, salary: [150000, 180000] }));
    }
  };



  const JobCard = ({ job }: { job: Job }) => {
    const isSaved = savedJobIds.includes(job.id);
    const isApplied = appliedJobIds.includes(job.id);

    return (
      <div className="bg-white/10 border border-white/10 backdrop-blur-md rounded-2xl p-5 hover:shadow-lg hover:shadow-blue-500/10 transition-all cursor-pointer group"
        onClick={() => setSelectedJob(job)}>
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-blue-300 transition-colors">{job.title}</h3>
            <p className="text-gray-300 font-medium">{job.company}</p>
          </div>
          <MatchScoreRing score={job.matchScore} />
        </div>

        <div className="flex flex-wrap gap-2 mb-3 text-sm text-gray-400">
          <div className="flex items-center gap-1">
            <MapPin size={14} />
            <span>{job.location}</span>
          </div>
          <div className="flex items-center gap-1">
            <DollarSign size={14} />
            <span>${(job.salary / 1000).toFixed(0)}k</span>
          </div>
          <div className="flex items-center gap-1">
            <Briefcase size={14} />
            <span>{job.experience} yrs</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock size={14} />
            <span>{job.postedDays}d ago</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {job.skills.map((skill: string) => (
            <span key={skill} className="px-2 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-200 rounded text-xs font-medium">
              {skill}
            </span>
          ))}
          <span className="px-2 py-1 bg-purple-500/10 border border-purple-500/20 text-purple-200 rounded text-xs font-medium">
            {job.type}
          </span>
        </div>

        <div className="flex gap-2" onClick={e => e.stopPropagation()}>
          <button
            onClick={() => onToggleSave(job.id)}
            aria-label={isSaved ? "Remove from saved jobs" : "Save job"}
            className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${isSaved
              ? 'bg-yellow-500/20 text-yellow-200 hover:bg-yellow-500/30'
              : 'bg-white/5 text-gray-300 hover:bg-white/10'
              }`}>
            <Bookmark size={16} className="inline mr-1" fill={isSaved ? 'currentColor' : 'none'} />
            {isSaved ? 'Saved' : 'Save'}
          </button>
          <button
            onClick={() => onApply(job.id)}
            disabled={isApplied}
            aria-label={isApplied ? "Already applied" : "Apply for job"}
            className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${isApplied
              ? 'bg-green-500/20 text-green-200 cursor-default'
              : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}>
            {isApplied ? (
              <>
                <CheckCircle size={16} className="inline mr-1" />
                Applied
              </>
            ) : (
              <>
                <Send size={16} className="inline mr-1" />
                Apply
              </>
            )}
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen">
      <CompanyTicker />
      <div className="bg-black/20 backdrop-blur-md sticky top-16 z-30 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-white mb-4">Job Discovery</h1>

          <div className="flex flex-col md:flex-row gap-3 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                aria-label="Search jobs"
                placeholder="Search jobs, companies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none placeholder-gray-500"
              />
            </div>

            <select
              aria-label="Sort jobs by"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2.5 bg-white/5 border border-white/10 text-white rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
              <option value="match" className="bg-gray-900">Best Match</option>
              <option value="salary" className="bg-gray-900">Highest Salary</option>
              <option value="date" className="bg-gray-900">Most Recent</option>
              <option value="experience" className="bg-gray-900">Experience Level</option>
            </select>

            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('grid')}
                aria-label="Grid view"
                className={`p-2.5 rounded-lg ${viewMode === 'grid' ? 'bg-blue-500/20 text-blue-200' : 'bg-white/5 text-gray-300'}`}>
                <Grid size={20} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                aria-label="List view"
                className={`p-2.5 rounded-lg ${viewMode === 'list' ? 'bg-blue-500/20 text-blue-200' : 'bg-white/5 text-gray-300'}`}>
                <List size={20} />
              </button>
              <button
                onClick={() => setShowFilters(!showFilters)}
                aria-label="Toggle filters"
                className="md:hidden p-2.5 bg-white/5 text-gray-300 rounded-lg">
                <Filter size={20} />
              </button>
            </div>
          </div>

          <div className="flex gap-2 flex-wrap">
            <button onClick={() => applyPreset('remote')} className="px-3 py-1.5 bg-green-500/20 text-green-200 rounded-full text-sm font-medium hover:bg-green-500/30">
              Remote Jobs
            </button>
            <button onClick={() => applyPreset('highSalary')} className="px-3 py-1.5 bg-purple-500/20 text-purple-200 rounded-full text-sm font-medium hover:bg-purple-500/30">
              High Salary ($150k+)
            </button>
            <span className="px-3 py-1.5 text-gray-400 text-sm">
              {filteredJobs.length} jobs found
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex gap-6">
          <div className={`${showFilters ? 'block' : 'hidden'} md:block fixed md:sticky top-52 left-0 right-0 md:left-auto md:right-auto w-full md:w-80 bg-gray-900 md:bg-transparent z-20 h-screen md:h-auto overflow-y-auto`}>
            <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-5">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-white">Filters</h2>
                <button onClick={() => setShowFilters(false)} className="md:hidden text-gray-300">
                  <X size={20} />
                </button>
              </div>

              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-300 mb-2">Location</label>
                <div className="max-h-40 overflow-y-auto space-y-2 scrollbar-thin scrollbar-thumb-gray-600">
                  {allLocations.map(loc => (
                    <label key={loc} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.locations.includes(loc)}
                        onChange={(e) => {
                          setFilters(prev => ({
                            ...prev,
                            locations: e.target.checked
                              ? [...prev.locations, loc]
                              : prev.locations.filter(l => l !== loc)
                          }));
                        }}
                        className="mr-2 rounded text-blue-600 bg-gray-800 border-gray-600"
                      />
                      <span className="text-sm text-gray-300">{loc}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Experience: {filters.experience[0]}-{filters.experience[1]} years
                </label>
                <input
                  type="range"
                  min="0"
                  max="10"
                  value={filters.experience[1]}
                  onChange={(e) => setFilters(prev => ({ ...prev, experience: [0, parseInt(e.target.value)] }))}
                  className="w-full"
                />
              </div>

              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Salary: ${(filters.salary[0] / 1000).toFixed(0)}k - ${(filters.salary[1] / 1000).toFixed(0)}k
                </label>
                <div className="space-y-2">
                  <div>
                    <label className="text-xs text-gray-500">Min</label>
                    <input
                      type="range"
                      min="80000"
                      max="180000"
                      step="10000"
                      value={filters.salary[0]}
                      onChange={(e) => {
                        const newMin = parseInt(e.target.value);
                        setFilters(prev => ({
                          ...prev,
                          salary: [newMin, Math.max(newMin, prev.salary[1])]
                        }));
                      }}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500">Max</label>
                    <input
                      type="range"
                      min="80000"
                      max="180000"
                      step="10000"
                      value={filters.salary[1]}
                      onChange={(e) => {
                        const newMax = parseInt(e.target.value);
                        setFilters(prev => ({
                          ...prev,
                          salary: [Math.min(newMax, prev.salary[0]), newMax]
                        }));
                      }}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>

              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-300 mb-2">Skills</label>
                <input
                  type="text"
                  placeholder="Search skills..."
                  value={skillSearch}
                  onChange={(e) => setSkillSearch(e.target.value)}
                  className="w-full px-3 py-2 mb-2 bg-white/5 border border-white/10 text-white rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                />
                <div className="max-h-40 overflow-y-auto space-y-2 scrollbar-thin scrollbar-thumb-gray-600">
                  {filteredSkills.map(skill => (
                    <label key={skill} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.skills.includes(skill)}
                        onChange={(e) => {
                          setFilters(prev => ({
                            ...prev,
                            skills: e.target.checked
                              ? [...prev.skills, skill]
                              : prev.skills.filter(s => s !== skill)
                          }));
                        }}
                        className="mr-2 rounded text-blue-600 bg-gray-800 border-gray-600"
                      />
                      <span className="text-sm text-gray-300">{skill}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-300 mb-2">Job Type</label>
                {['Full-time', 'Remote', 'Hybrid', 'Part-time'].map(type => (
                  <label key={type} className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      checked={filters.types.includes(type)}
                      onChange={(e) => {
                        setFilters(prev => ({
                          ...prev,
                          types: e.target.checked
                            ? [...prev.types, type]
                            : prev.types.filter(t => t !== type)
                        }));
                      }}
                      className="mr-2 rounded text-blue-600 bg-gray-800 border-gray-600"
                    />
                    <span className="text-sm text-gray-300">{type}</span>
                  </label>
                ))}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Posted</label>
                <select
                  value={filters.postedDate}
                  onChange={(e) => setFilters(prev => ({ ...prev, postedDate: e.target.value }))}
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 text-white rounded-lg outline-none">
                  <option value="all" className="bg-gray-900">All Time</option>
                  <option value="24hrs" className="bg-gray-900">Last 24 Hours</option>
                  <option value="week" className="bg-gray-900">Last Week</option>
                  <option value="month" className="bg-gray-900">Last Month</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex-1">
            <div className={viewMode === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 gap-4'
              : 'space-y-4'}>
              {filteredJobs.slice(0, displayCount).map(job => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>

            {displayCount < filteredJobs.length && (
              <div className="text-center mt-8">
                <div className="inline-block animate-pulse">
                  <div className="h-2 w-32 bg-gray-600 rounded"></div>
                </div>
              </div>
            )}

            {filteredJobs.length === 0 && (
              <div className="text-center py-12">
                <Briefcase size={48} className="mx-auto text-gray-500 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">No jobs found</h3>
                <p className="text-gray-400">Try adjusting your filters or search query</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {selectedJob && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSelectedJob(null)}>
          <div className="bg-gray-900 rounded-2xl border border-white/10 max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-white">{selectedJob.title}</h2>
                  <p className="text-lg text-gray-300">{selectedJob.company}</p>
                </div>
                <button onClick={() => setSelectedJob(null)} className="text-gray-400 hover:text-white">
                  <X size={24} />
                </button>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <MatchScoreRing score={selectedJob.matchScore} />
                <div className="flex-1 grid grid-cols-2 gap-3 text-sm text-gray-300">
                  <div>
                    <p className="text-gray-500">Location</p>
                    <p className="font-medium text-white">{selectedJob.location}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Salary</p>
                    <p className="font-medium text-white">${(selectedJob.salary / 1000).toFixed(0)}k/year</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Experience</p>
                    <p className="font-medium text-white">{selectedJob.experience} years</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Type</p>
                    <p className="font-medium text-white">{selectedJob.type}</p>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold text-white mb-2">Required Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedJob.skills.map((skill: string) => (
                    <span key={skill} className="px-3 py-1.5 bg-blue-500/20 text-blue-200 rounded-full text-sm font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold text-white mb-2">Job Description</h3>
                <p className="text-gray-300 leading-relaxed">{selectedJob.description}</p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => onToggleSave(selectedJob.id)}
                  className={`flex-1 px-6 py-3 rounded-lg font-medium transition-colors ${savedJobIds.includes(selectedJob.id)
                    ? 'bg-yellow-500/20 text-yellow-200 hover:bg-yellow-500/30'
                    : 'bg-white/5 text-gray-300 hover:bg-white/10'
                    }`}>
                  <Bookmark size={20} className="inline mr-2" fill={savedJobIds.includes(selectedJob.id) ? 'currentColor' : 'none'} />
                  {savedJobIds.includes(selectedJob.id) ? 'Saved' : 'Save Job'}
                </button>
                <button
                  onClick={() => onApply(selectedJob.id)}
                  disabled={appliedJobIds.includes(selectedJob.id)}
                  className={`flex-1 px-6 py-3 rounded-lg font-medium transition-colors ${appliedJobIds.includes(selectedJob.id)
                    ? 'bg-green-500/20 text-green-200 cursor-default'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}>
                  {appliedJobIds.includes(selectedJob.id) ? (
                    <>
                      <CheckCircle size={20} className="inline mr-2" />
                      Applied
                    </>
                  ) : (
                    <>
                      <Send size={20} className="inline mr-2" />
                      Apply Now
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Saved Jobs Page Component
const SavedJobsPage = ({
  jobs,
  savedJobIds,
  appliedJobIds,
  onToggleSave,
  onApply
}: {
  jobs: Job[];
  savedJobIds: number[];
  appliedJobIds: number[];
  onToggleSave: (id: number) => void;
  onApply: (id: number) => void;
}) => {
  const savedJobs = jobs.filter(job => savedJobIds.includes(job.id));

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-white mb-2">Saved Jobs</h1>
        <p className="text-gray-400 mb-8">
          {savedJobs.length} {savedJobs.length === 1 ? 'job' : 'jobs'} saved
        </p>

        {savedJobs.length === 0 ? (
          <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-12 text-center">
            <Bookmark size={48} className="mx-auto text-gray-500 mb-4" />
            <h2 className="text-xl font-semibold text-white mb-2">No saved jobs yet</h2>
            <p className="text-gray-400">Start saving jobs to view them here</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {savedJobs.map(job => {
              const isApplied = appliedJobIds.includes(job.id);
              return (
                <div key={job.id} className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-5 hover:shadow-lg transition-all">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white mb-1">{job.title}</h3>
                      <p className="text-gray-300 font-medium">{job.company}</p>
                    </div>
                    <MatchScoreRing score={job.matchScore} />
                  </div>

                  <div className="flex flex-wrap gap-2 mb-3 text-sm text-gray-400">
                    <div className="flex items-center gap-1">
                      <MapPin size={14} />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <DollarSign size={14} />
                      <span>${(job.salary / 1000).toFixed(0)}k</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Briefcase size={14} />
                      <span>{job.experience} yrs</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {job.skills.slice(0, 3).map((skill: string) => (
                      <span key={skill} className="px-2 py-1 bg-blue-500/20 text-blue-200 rounded text-xs font-medium">
                        {skill}
                      </span>
                    ))}
                    {job.skills.length > 3 && (
                      <span className="px-2 py-1 bg-white/10 text-gray-300 rounded text-xs font-medium">
                        +{job.skills.length - 3}
                      </span>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => onToggleSave(job.id)}
                      className="flex-1 px-4 py-2 bg-red-500/20 text-red-300 rounded-lg font-medium hover:bg-red-500/30 transition-colors">
                      <X size={16} className="inline mr-1" />
                      Remove
                    </button>
                    <button
                      onClick={() => onApply(job.id)}
                      disabled={isApplied}
                      className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${isApplied
                        ? 'bg-green-500/20 text-green-200 cursor-default'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                        }`}>
                      {isApplied ? (
                        <>
                          <CheckCircle size={16} className="inline mr-1" />
                          Applied
                        </>
                      ) : (
                        <>
                          <Send size={16} className="inline mr-1" />
                          Apply
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  );
};

// Main App Router
const JobDiscoveryApp = () => {
  const [currentRoute, setCurrentRoute] = useState('/');
  const [jobs] = useState<Job[]>(() => generateMockJobs());
  const [savedJobIds, setSavedJobIds] = useState<number[]>([]);
  const [appliedJobIds, setAppliedJobIds] = useState<number[]>([]);
  const [profile, setProfile] = useState<CandidateProfile | null>(null);

  // Modal state
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [pendingApplyJobId, setPendingApplyJobId] = useState<number | null>(null);

  // Load state from localStorage on mount
  // Load state from localStorage on mount
  useEffect(() => {
    // Wrap in try-catch to handle potential JSON parse errors safely
    try {
      if (typeof window !== 'undefined') {
        const saved = localStorage.getItem('savedJobs');
        const applied = localStorage.getItem('appliedJobs');
        const userProfile = localStorage.getItem('candidateProfile');

        if (saved) {
          setSavedJobIds(JSON.parse(saved));
        }
        if (applied) {
          setAppliedJobIds(JSON.parse(applied));
        }
        if (userProfile) {
          const parsedProfile = JSON.parse(userProfile);
          // Ensure it's not null/empty
          if (parsedProfile && parsedProfile.name) {
            setProfile(parsedProfile);
          }
        }
      }
    } catch (e) {
      console.error('Failed to load state from localStorage:', e);
    }
  }, []);

  // Persistence effects
  useEffect(() => {
    localStorage.setItem('savedJobs', JSON.stringify(savedJobIds));
  }, [savedJobIds]);

  useEffect(() => {
    localStorage.setItem('appliedJobs', JSON.stringify(appliedJobIds));
  }, [appliedJobIds]);

  useEffect(() => {
    if (profile) localStorage.setItem('candidateProfile', JSON.stringify(profile));
  }, [profile]);

  const handleToggleSave = (jobId: number) => {
    setSavedJobIds(prev =>
      prev.includes(jobId)
        ? prev.filter(id => id !== jobId)
        : [...prev, jobId]
    );
  };

  const handleApply = (jobId: number) => {
    if (!profile) {
      setPendingApplyJobId(jobId);
      setShowProfileModal(true);
    } else {
      // Apply directly if profile exists
      if (!appliedJobIds.includes(jobId)) {
        setAppliedJobIds(prev => [...prev, jobId]);
        // Optional: Show toast notification here
      }
    }
  };

  const handleSaveProfile = (newProfile: CandidateProfile) => {
    setProfile(newProfile);
    setShowProfileModal(false);

    // If there was a pending application, process it now
    if (pendingApplyJobId) {
      if (!appliedJobIds.includes(pendingApplyJobId)) {
        setAppliedJobIds(prev => [...prev, pendingApplyJobId]);
      }
      setPendingApplyJobId(null);
    }

    // If we were on the profile page, stay there, otherwise we're done
    if (currentRoute === '/profile') {
      // Just updated profile
    }
  };

  return (
    <BackgroundLayout>
      <div className="min-h-screen">
        <Navigation
          currentRoute={currentRoute}
          onNavigate={setCurrentRoute}
          hasProfile={!!profile}
        />

        {currentRoute === '/' && (
          <JobsDiscoveryPage
            jobs={jobs}
            savedJobIds={savedJobIds}
            appliedJobIds={appliedJobIds}
            profile={profile}
            onToggleSave={handleToggleSave}
            onApply={handleApply}
          />
        )}
        {currentRoute === '/saved' && (
          <SavedJobsPage
            jobs={jobs}
            savedJobIds={savedJobIds}
            appliedJobIds={appliedJobIds}
            onToggleSave={handleToggleSave}
            onApply={handleApply}
          />
        )}
        {currentRoute === '/profile' && (
          <div className="container mx-auto px-4 py-6">
            <ProfileForm
              initialProfile={profile}
              onSave={(p) => {
                handleSaveProfile(p);
                // Optional: show feedback
              }}
              onCancel={() => setCurrentRoute('/')}
            />
          </div>
        )}

        {/* Persistence Modal for Application Flow */}
        {showProfileModal && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
            <div className="w-full max-w-3xl my-8">
              <ProfileForm
                initialProfile={profile}
                onSave={handleSaveProfile}
                onCancel={() => {
                  setShowProfileModal(false);
                  setPendingApplyJobId(null);
                }}
              />
            </div>
          </div>
        )}
      </div>
    </BackgroundLayout>
  );
};

export default JobDiscoveryApp;