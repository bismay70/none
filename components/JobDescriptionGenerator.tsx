'use client';

import React, { useState } from 'react';
import { FileText, Briefcase, Check, ChevronRight, ChevronLeft, Download, Copy, RefreshCw, Save, Zap, Building, Users, Star } from 'lucide-react';
import BackgroundLayout from './BackgroundLayout';

// Types
interface FormData {
    jobTitle: string;
    industry: string;
    experienceLevel: 'Entry' | 'Mid' | 'Senior' | 'Lead';
    skills: string[];
    companyCulture: string;
    specialRequirements: string;
}

const INDUSTRIES = [
    'Technology',
    'Healthcare',
    'Finance',
    'Education',
    'Marketing',
    'Sales',
    'Engineering',
    'Design',
];

const EXPERIENCE_LEVELS = ['Entry', 'Mid', 'Senior', 'Lead'];

const CULTURES = [
    'Startup (Fast-paced, flexible)',
    'Corporate (Structured, professional)',
    'Remote-first (Asynchronous, trust-based)',
    'Balanced (Work-life balance focused)',
    'Innovation-driven (Experimental, bleeding edge)',
];

const COMMON_SKILLS = [
    'JavaScript', 'Python', 'React', 'Node.js', 'Java', 'C++', 'SQL', 'AWS',
    'Project Management', 'Communication', 'Leadership', 'Sales', 'Marketing',
    'Data Analysis', 'Design', 'Customer Service'
];

// Template Data
const TEMPLATES = {
    Technology: {
        responsibilities: [
            "Design, develop, and maintain high-quality software solutions.",
            "Collaborate with cross-functional teams to define, design, and ship new features.",
            "Identify and correct bottlenecks and fix bugs.",
            "Help maintain code quality, organization, and automatization."
        ],
        benefits: [
            "Competitive salary and equity package",
            "Flexible work hours and remote work options",
            "Latest hardware and software tools",
            "Professional development budget"
        ]
    },
    Healthcare: {
        responsibilities: [
            "Provide high-quality patient care and support.",
            "Maintain accurate patient records and documentation.",
            "Collaborate with healthcare professionals to coordinate care.",
            "Adhere to all safety and compliance regulations."
        ],
        benefits: [
            "Comprehensive health, dental, and vision insurance",
            "Retirement savings plan with match",
            "Paid time off and sick leave",
            "Continuing education opportunities"
        ]
    },
    default: {
        responsibilities: [
            "Execute tasks effectively and efficienty.",
            "Collaborate with team members to achieve goals.",
            "Maintain high standards of quality and performance.",
            "Contribute to continuous improvement initiatives."
        ],
        benefits: [
            "Competitive compensation package",
            "Health and wellness benefits",
            "Paid time off",
            "Career growth opportunities"
        ]
    }
};

const SKILL_RESPONSIBILITIES: { [key: string]: string[] } = {
    'React': ['Build responsive web interfaces using React.js', 'Optimize components for maximum performance'],
    'Node.js': ['Develop scalable backend services using Node.js', 'Integrate with third-party APIs and databases'],
    'Python': ['Write clean, maintainable Python code', 'Develop data-driven applications and scripts'],
    'SQL': ['Design and optimize database schemas', 'Write complex queries for data analysis'],
    'Design': ['Create intuitive and visually appealing user interfaces', 'Collaborate with developers to ensure design fidelity'],
    'Leadership': ['Mentor junior team members', 'Lead technical decision-making processes'],
};

const JobDescriptionGenerator = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState<FormData>({
        jobTitle: '',
        industry: '',
        experienceLevel: 'Mid',
        skills: [],
        companyCulture: '',
        specialRequirements: ''
    });
    const [generatedDescription, setGeneratedDescription] = useState('');
    const [newSkill, setNewSkill] = useState('');

    const handleInputChange = (field: keyof FormData, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const addSkill = (skill: string) => {
        if (skill && !formData.skills.includes(skill)) {
            setFormData(prev => ({ ...prev, skills: [...prev.skills, skill] }));
        }
    };

    const removeSkill = (skillToRemove: string) => {
        setFormData(prev => ({ ...prev, skills: prev.skills.filter(s => s !== skillToRemove) }));
    };

    const generateDescription = () => {
        const { jobTitle, industry, experienceLevel, skills, companyCulture, specialRequirements } = formData;
        const template = TEMPLATES[industry as keyof typeof TEMPLATES] || TEMPLATES.default;

        // Generate Responsibilities
        let responsibilities = [...template.responsibilities];

        // Add skill-specific responsibilities
        skills.forEach(skill => {
            if (SKILL_RESPONSIBILITIES[skill]) {
                responsibilities = [...responsibilities, ...SKILL_RESPONSIBILITIES[skill]];
            }
        });

        // Add experience-specific responsibility
        if (experienceLevel === 'Senior' || experienceLevel === 'Lead') {
            responsibilities.push("Mentor junior team members and conduct code reviews.");
            responsibilities.push("Drive technical architecture and standard definitions.");
        } else if (experienceLevel === 'Entry') {
            responsibilities.push("Participate in training and development programs.");
            responsibilities.push("Learn and apply best practices under supervision.");
        }

        const bulletPoints = responsibilities.map(r => `- ${r}`).join('\n');
        const skillList = skills.map(s => `- ${s}`).join('\n');
        const benefitsList = template.benefits.map(b => `- ${b}`).join('\n');

        const description = `
# ${jobTitle}
**Industry:** ${industry} | **Level:** ${experienceLevel}

## About the Role
We are seeking a talented ${experienceLevel} ${jobTitle} to join our dynamic team. In this role, you will play a key part in our ${industry} operations, working in a ${companyCulture.split('(')[0].trim().toLowerCase()} environment.

## Key Responsibilities
${bulletPoints}

## Required Skills
${skillList}

## Requirements
- Proven experience as a ${jobTitle} or similar role.
- Strong understanding of ${industry} best practices.
${specialRequirements ? `- ${specialRequirements}` : ''}

## What We Offer
${benefitsList}

## About Us
We are a company dedicated to excellence and innovation in the ${industry} sector. Our culture is defined by ${companyCulture}, and we are committed to helping our employees grow and succeed.
        `.trim();

        setGeneratedDescription(description);
        setStep(3);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(generatedDescription);
        // Could show a toast here
    };

    return (
        <BackgroundLayout>
            <div className="p-6 min-h-screen flex flex-col items-center">
                <div className="max-w-4xl w-full">

                    {/* Header */}
                    <div className="text-center mb-10 animate-fade-in-up">
                        <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-200 via-blue-100 to-white mb-4">
                            AI Job Description Generator
                        </h1>
                        <p className="text-xl text-gray-400">
                            Create professional, ATS-friendly job descriptions in seconds.
                        </p>
                    </div>

                    {/* Progress Steps */}
                    <div className="flex justify-center mb-12">
                        <div className="flex items-center">
                            {[1, 2, 3].map((s) => (
                                <React.Fragment key={s}>
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold border-2 transition-all ${step >= s
                                            ? 'bg-blue-600 border-blue-500 text-white shadow-[0_0_15px_rgba(37,99,235,0.5)]'
                                            : 'bg-gray-800 border-gray-700 text-gray-500'
                                        }`}>
                                        {s}
                                    </div>
                                    {s < 3 && (
                                        <div className={`w-16 h-1 transition-all ${step > s ? 'bg-blue-600' : 'bg-gray-800'}`}></div>
                                    )}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>

                    {/* Form Container */}
                    <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-8 shadow-2xl animate-fade-in-up">

                        {/* Step 1: Basic Info */}
                        {step === 1 && (
                            <div className="space-y-6">
                                <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                                    <FileText className="mr-2 text-blue-400" /> Basic Information
                                </h2>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Job Title</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. Senior Product Designer"
                                        className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-xl text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder-gray-600"
                                        value={formData.jobTitle}
                                        onChange={(e) => handleInputChange('jobTitle', e.target.value)}
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">Industry</label>
                                        <select
                                            className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-xl text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                            value={formData.industry}
                                            onChange={(e) => handleInputChange('industry', e.target.value)}
                                        >
                                            <option value="" className="bg-gray-900">Select Industry</option>
                                            {INDUSTRIES.map(ind => (
                                                <option key={ind} value={ind} className="bg-gray-900">{ind}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">Experience Level</label>
                                        <div className="grid grid-cols-2 gap-2">
                                            {EXPERIENCE_LEVELS.map(level => (
                                                <button
                                                    key={level}
                                                    onClick={() => handleInputChange('experienceLevel', level)}
                                                    className={`px-3 py-2 rounded-lg text-sm font-medium border transition-all ${formData.experienceLevel === level
                                                            ? 'bg-blue-600/20 border-blue-500 text-blue-200'
                                                            : 'bg-black/20 border-white/10 text-gray-400 hover:bg-white/5'
                                                        }`}
                                                >
                                                    {level}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 2: Details */}
                        {step === 2 && (
                            <div className="space-y-6">
                                <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                                    <Zap className="mr-2 text-purple-400" /> Details & Skills
                                </h2>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Required Skills</label>
                                    <div className="flex gap-2 mb-3">
                                        <input
                                            type="text"
                                            placeholder="Add a skill..."
                                            className="flex-1 px-4 py-3 bg-black/20 border border-white/10 rounded-xl text-white outline-none focus:ring-2 focus:ring-purple-500 transition-all placeholder-gray-600"
                                            value={newSkill}
                                            onChange={(e) => setNewSkill(e.target.value)}
                                            onKeyDown={(e) => e.key === 'Enter' && (addSkill(newSkill), setNewSkill(''))}
                                        />
                                        <button
                                            onClick={() => { addSkill(newSkill); setNewSkill(''); }}
                                            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-medium transition-colors"
                                        >
                                            Add
                                        </button>
                                    </div>
                                    <div className="flex flex-wrap gap-2 min-h-[50px] p-2 bg-black/10 rounded-xl border border-white/5">
                                        {formData.skills.length === 0 && <span className="text-gray-500 text-sm italic p-2">No skills added yet.</span>}
                                        {formData.skills.map(skill => (
                                            <span key={skill} className="px-3 py-1 bg-purple-500/20 border border-purple-500/30 text-purple-200 rounded-lg text-sm flex items-center gap-2">
                                                {skill}
                                                <button onClick={() => removeSkill(skill)} className="hover:text-white"><span className="sr-only">Remove</span>x</button>
                                            </span>
                                        ))}
                                    </div>
                                    <div className="mt-2 text-sm text-gray-500">
                                        Suggested:
                                        {COMMON_SKILLS.slice(0, 5).map(s => (
                                            <button key={s} onClick={() => addSkill(s)} className="ml-2 hover:text-purple-300 decoration-dotted underline">{s}</button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Company Culture</label>
                                    <select
                                        className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-xl text-white outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                                        value={formData.companyCulture}
                                        onChange={(e) => handleInputChange('companyCulture', e.target.value)}
                                    >
                                        <option value="" className="bg-gray-900">Select Culture</option>
                                        {CULTURES.map(c => (
                                            <option key={c} value={c} className="bg-gray-900">{c}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Special Requirements (Optional)</label>
                                    <textarea
                                        className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-xl text-white outline-none focus:ring-2 focus:ring-purple-500 transition-all placeholder-gray-600"
                                        rows={3}
                                        placeholder="e.g. Must be willing to travel, Valid driver's license..."
                                        value={formData.specialRequirements}
                                        onChange={(e) => handleInputChange('specialRequirements', e.target.value)}
                                    ></textarea>
                                </div>
                            </div>
                        )}

                        {/* Step 3: Preview */}
                        {step === 3 && (
                            <div className="space-y-6">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-2xl font-bold text-white flex items-center">
                                        <Star className="mr-2 text-yellow-400" /> Review & Export
                                    </h2>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={copyToClipboard}
                                            className="p-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-gray-300 hover:text-white transition-all"
                                            title="Copy to Clipboard"
                                        >
                                            <Copy size={20} />
                                        </button>
                                        <button
                                            onClick={generateDescription}
                                            className="p-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-gray-300 hover:text-white transition-all"
                                            title="Regenerate"
                                        >
                                            <RefreshCw size={20} />
                                        </button>
                                    </div>
                                </div>

                                <div className="bg-black/30 border border-white/10 rounded-xl p-6 overflow-y-auto max-h-[500px] font-mono text-sm leading-relaxed text-gray-300 whitespace-pre-wrap">
                                    {generatedDescription}
                                </div>

                                <div className="flex flex-col md:flex-row gap-4 pt-4">
                                    <button className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-600/20">
                                        <Download size={20} /> Download PDF
                                    </button>
                                    <button className="flex-1 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all">
                                        <Save size={20} /> Save to Drafts
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Navigation Buttons */}
                        <div className="flex justify-between mt-10 pt-6 border-t border-white/10">
                            {step > 1 ? (
                                <button
                                    onClick={() => setStep(s => s - 1)}
                                    className="px-6 py-3 border border-white/10 rounded-xl text-gray-300 hover:bg-white/5 flex items-center gap-2 transition-all"
                                >
                                    <ChevronLeft size={20} /> Back
                                </button>
                            ) : <div></div>}

                            {step < 3 ? (
                                <button
                                    onClick={() => setStep(s => s + 1)}
                                    disabled={step === 1 && !formData.jobTitle}
                                    className={`px-8 py-3 rounded-xl font-bold flex items-center gap-2 transition-all ${(step === 1 && !formData.jobTitle)
                                            ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                                            : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-lg hover:shadow-blue-500/25'
                                        }`}
                                >
                                    Next <ChevronRight size={20} />
                                </button>
                            ) : (
                                <button
                                    onClick={() => setStep(1)}
                                    className="px-6 py-3 border border-white/10 rounded-xl text-gray-300 hover:bg-white/5 flex items-center gap-2 transition-all"
                                >
                                    Create New <RefreshCw size={18} />
                                </button>
                            )}
                        </div>

                    </div>
                </div>
            </div>
        </BackgroundLayout>
    );
};

export default JobDescriptionGenerator;
