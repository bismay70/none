"use client";
import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { TrendingUp, Target, Clock, Award, BookOpen, Zap, ChevronRight, AlertCircle, DollarSign, Users } from 'lucide-react';
import BackgroundLayout from './BackgroundLayout';

// ============= TYPE DEFINITIONS =============
type SkillInfo = {
  difficulty: number;
  learning_time_weeks: number;
  prerequisites: string[];
};

type SkillCategory = {
  [skillName: string]: SkillInfo;
};

type SkillTaxonomy = {
  [categoryName: string]: SkillCategory;
};

type RoleInfo = {
  required_skills: string[];
  typical_experience: string;
  avg_salary: number;
};

type Roles = {
  [roleName: string]: RoleInfo;
};

// ============= DATA LAYER =============
const SKILL_TAXONOMY: SkillTaxonomy = {
  "Frontend": {
    "React": { difficulty: 3, learning_time_weeks: 6, prerequisites: ["JavaScript ES6+"] },
    "Vue.js": { difficulty: 3, learning_time_weeks: 5, prerequisites: ["JavaScript ES6+"] },
    "Angular": { difficulty: 4, learning_time_weeks: 7, prerequisites: ["TypeScript"] },
    "JavaScript ES6+": { difficulty: 2, learning_time_weeks: 4, prerequisites: [] },
    "TypeScript": { difficulty: 3, learning_time_weeks: 3, prerequisites: ["JavaScript ES6+"] },
    "HTML/CSS": { difficulty: 1, learning_time_weeks: 2, prerequisites: [] },
    "Next.js": { difficulty: 4, learning_time_weeks: 4, prerequisites: ["React"] },
    "Tailwind CSS": { difficulty: 2, learning_time_weeks: 2, prerequisites: ["HTML/CSS"] }
  },
  "Backend": {
    "Python": { difficulty: 2, learning_time_weeks: 6, prerequisites: [] },
    "FastAPI": { difficulty: 3, learning_time_weeks: 4, prerequisites: ["Python"] },
    "Node.js": { difficulty: 3, learning_time_weeks: 5, prerequisites: ["JavaScript ES6+"] },
    "Django": { difficulty: 4, learning_time_weeks: 6, prerequisites: ["Python"] },
    "Express.js": { difficulty: 3, learning_time_weeks: 3, prerequisites: ["Node.js"] },
    "REST API": { difficulty: 2, learning_time_weeks: 3, prerequisites: [] },
    "GraphQL": { difficulty: 4, learning_time_weeks: 4, prerequisites: ["REST API"] }
  },
  "Database": {
    "MySQL": { difficulty: 2, learning_time_weeks: 4, prerequisites: [] },
    "PostgreSQL": { difficulty: 3, learning_time_weeks: 4, prerequisites: ["MySQL"] },
    "MongoDB": { difficulty: 3, learning_time_weeks: 4, prerequisites: [] },
    "Redis": { difficulty: 3, learning_time_weeks: 3, prerequisites: [] },
    "Database Design": { difficulty: 3, learning_time_weeks: 5, prerequisites: [] }
  },
  "DevOps": {
    "Docker": { difficulty: 3, learning_time_weeks: 4, prerequisites: [] },
    "Kubernetes": { difficulty: 5, learning_time_weeks: 8, prerequisites: ["Docker"] },
    "AWS": { difficulty: 4, learning_time_weeks: 8, prerequisites: [] },
    "CI/CD": { difficulty: 3, learning_time_weeks: 4, prerequisites: ["Git"] },
    "Terraform": { difficulty: 4, learning_time_weeks: 6, prerequisites: ["AWS"] },
    "Jenkins": { difficulty: 3, learning_time_weeks: 4, prerequisites: [] }
  },
  "Tools": {
    "Git": { difficulty: 2, learning_time_weeks: 2, prerequisites: [] },
    "Linux": { difficulty: 3, learning_time_weeks: 6, prerequisites: [] },
    "Nginx": { difficulty: 3, learning_time_weeks: 3, prerequisites: ["Linux"] }
  },
  "Architecture": {
    "System Design": { difficulty: 5, learning_time_weeks: 12, prerequisites: [] },
    "Microservices": { difficulty: 5, learning_time_weeks: 8, prerequisites: ["System Design"] },
    "Design Patterns": { difficulty: 4, learning_time_weeks: 6, prerequisites: [] }
  }
};

const ROLES: Roles = {
  "Junior Backend Developer": {
    required_skills: ["Python", "FastAPI", "MySQL", "Git", "REST API"],
    typical_experience: "0-2 years",
    avg_salary: 60000
  },
  "Senior Full Stack Developer": {
    required_skills: ["Python", "FastAPI", "React", "Docker", "Kubernetes", "PostgreSQL", "Redis", "AWS", "CI/CD", "System Design"],
    typical_experience: "3-5 years",
    avg_salary: 120000
  },
  "DevOps Engineer": {
    required_skills: ["Docker", "Kubernetes", "AWS", "CI/CD", "Terraform", "Linux", "Python", "Jenkins"],
    typical_experience: "2-4 years",
    avg_salary: 110000
  },
  "Frontend Developer": {
    required_skills: ["React", "JavaScript ES6+", "HTML/CSS", "TypeScript", "Next.js", "Tailwind CSS"],
    typical_experience: "1-3 years",
    avg_salary: 85000
  },
  "Backend Architect": {
    required_skills: ["Python", "System Design", "Microservices", "PostgreSQL", "Redis", "AWS", "Design Patterns"],
    typical_experience: "5-8 years",
    avg_salary: 150000
  }
};

// ============= UTILITY FUNCTIONS =============
const getAllSkills = (): string[] => {
  const skills = new Set<string>();
  Object.values(SKILL_TAXONOMY).forEach(category => {
    Object.keys(category).forEach(skill => skills.add(skill));
  });
  return Array.from(skills).sort();
};

const findSkillCategory = (skill: string): string => {
  for (const [category, skills] of Object.entries(SKILL_TAXONOMY)) {
    if (skills[skill]) return category;
  }
  return "Other";
};

const calculatePrerequisites = (skill: string): string[] => {
  for (const category of Object.values(SKILL_TAXONOMY)) {
    if (category[skill]) {
      return category[skill].prerequisites || [];
    }
  }
  return [];
};

// ============= COMPONENTS =============

// Stat Card Component
const StatCard = ({ icon: Icon, label, value, color }: { icon: any; label: string; value: string; color: string }) => (
  <div className="bg-white/10 border border-white/10 backdrop-blur-md rounded-2xl p-6 shadow-xl">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-blue-200 text-sm font-medium">{label}</p>
        <p className={`text-3xl font-bold text-white mt-1`}>{value}</p>
      </div>
      <div className={`p-3 rounded-xl bg-white/5 border border-white/10`}>
        <Icon className={`text-${color}-400`} size={32} />
      </div>
    </div>
  </div>
);

// Skill Tag Component
const SkillTag = ({ skill, variant = 'default', onRemove }: { skill: string; variant?: 'default' | 'matching' | 'missing' | 'target' | 'roadmap'; onRemove?: () => void }) => {
  const variants = {
    default: 'bg-white/10 text-blue-200 border-white/10',
    matching: 'bg-green-500/20 text-green-300 border-green-500/30',
    missing: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
    target: 'bg-green-500/20 text-green-300 border-green-500/30',
    roadmap: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30'
  };

  return (
    <span className={`px-3 py-1 ${variants[variant]} border rounded-full text-sm flex items-center backdrop-blur-sm`}>
      {variant === 'matching' && '✓ '}
      {skill}
      {onRemove && (
        <button
          onClick={onRemove}
          className="ml-2 hover:text-white transition-colors"
        >×</button>
      )}
    </span>
  );
};

// Current Profile Form Component
const CurrentProfileForm = ({ currentRole, setCurrentRole, experienceYears, setExperienceYears, currentSkills, setCurrentSkills }: { currentRole: string; setCurrentRole: (role: string) => void; experienceYears: number; setExperienceYears: (years: number) => void; currentSkills: string[]; setCurrentSkills: (skills: string[]) => void }) => {
  const allSkills = getAllSkills();

  return (
    <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-8 shadow-xl">
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
        <Award className="mr-2 text-blue-400" />
        Current Profile
      </h2>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Current Role</label>
          <select
            value={currentRole}
            onChange={(e) => setCurrentRole(e.target.value)}
            className="w-full p-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white outline-none"
          >
            {Object.keys(ROLES).map(role => (
              <option key={role} value={role} className="bg-gray-900">{role}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Experience (years)</label>
          <input
            type="number"
            value={experienceYears}
            onChange={(e) => setExperienceYears(parseInt(e.target.value))}
            className="w-full p-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white outline-none"
            min="0"
            max="20"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Current Skills</label>
          <div className="flex flex-wrap gap-2 mb-3">
            {currentSkills.map(skill => (
              <SkillTag
                key={skill}
                skill={skill}
                variant="default"
                onRemove={() => setCurrentSkills(currentSkills.filter(s => s !== skill))}
              />
            ))}
          </div>
          <select
            onChange={(e) => {
              if (e.target.value && !currentSkills.includes(e.target.value)) {
                setCurrentSkills([...currentSkills, e.target.value]);
                e.target.value = "";
              }
            }}
            className="w-full p-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white outline-none"
          >
            <option value="" className="bg-gray-900">Add a skill...</option>
            {allSkills.filter((s: string) => !currentSkills.includes(s)).map((skill: string) => (
              <option key={skill} value={skill} className="bg-gray-900">{skill}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

// Target Role Form Component
const TargetRoleForm = ({ targetRole, setTargetRole, onAnalyze }: { targetRole: string; setTargetRole: (role: string) => void; onAnalyze: () => void }) => {
  return (
    <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-8 shadow-xl">
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
        <Target className="mr-2 text-green-400" />
        Target Role
      </h2>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Target Role</label>
          <select
            value={targetRole}
            onChange={(e) => setTargetRole(e.target.value)}
            className="w-full p-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-white outline-none"
          >
            {Object.keys(ROLES).map(role => (
              <option key={role} value={role} className="bg-gray-900">{role}</option>
            ))}
          </select>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
          <p className="text-sm text-gray-400 mb-3">Required Skills:</p>
          <div className="flex flex-wrap gap-2">
            {ROLES[targetRole].required_skills.map((skill: string) => (
              <SkillTag key={skill} skill={skill} variant="target" />
            ))}
          </div>
          <p className="text-sm text-gray-400 mt-4">
            Typical Experience: <span className="text-white">{ROLES[targetRole].typical_experience}</span>
          </p>
          <p className="text-sm text-gray-400">
            Avg Salary: <span className="text-white">${ROLES[targetRole].avg_salary.toLocaleString()}</span>
          </p>
        </div>

        <button
          onClick={onAnalyze}
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl font-bold hover:shadow-lg hover:shadow-blue-500/20 transition-all flex items-center justify-center text-lg"
        >
          <Zap className="mr-2" size={20} />
          Analyze Skills Gap
        </button>
      </div>
    </div>
  );
};

// Skills Comparison Component
const SkillsComparison = ({ matchingSkills, missingSkills }: { matchingSkills: string[]; missingSkills: string[] }) => (
  <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-8 shadow-xl">
    <h3 className="text-xl font-bold text-white mb-6">Skills Comparison</h3>
    <div className="space-y-6">
      <div>
        <p className="text-sm font-medium text-green-400 mb-3">
          Matching Skills ({matchingSkills.length})
        </p>
        <div className="flex flex-wrap gap-2">
          {matchingSkills.map(skill => (
            <SkillTag key={skill} skill={skill} variant="matching" />
          ))}
        </div>
      </div>
      <div>
        <p className="text-sm font-medium text-orange-400 mb-3">
          Skills to Learn ({missingSkills.length})
        </p>
        <div className="flex flex-wrap gap-2">
          {missingSkills.map(skill => (
            <SkillTag key={skill} skill={skill} variant="missing" />
          ))}
        </div>
      </div>
    </div>
  </div>
);

// Radar Chart Component
const CategoryRadarChart = ({ categoryScores }: { categoryScores: any }) => {
  const radarData = Object.entries(categoryScores).map(([cat, data]: [string, any]) => ({
    category: cat,
    current: data.percentage,
    required: 100
  }));

  return (
    <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-8 shadow-xl">
      <h3 className="text-xl font-bold text-white mb-6">Category Strengths</h3>
      <div className="h-[250px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={radarData}>
            <PolarGrid stroke="#ffffff33" />
            <PolarAngleAxis dataKey="category" tick={{ fill: '#9ca3af', fontSize: 12 }} />
            <PolarRadiusAxis angle={90} domain={[0, 100]} stroke="#ffffff33" tick={false} />
            <Radar name="Your Skills" dataKey="current" stroke="#60a5fa" fill="#3b82f6" fillOpacity={0.5} />
            <Radar name="Required" dataKey="required" stroke="#34d399" fill="#10b981" fillOpacity={0.2} />
            <Legend wrapperStyle={{ color: '#fff' }} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

// Learning Roadmap Component
const LearningRoadmap = ({ roadmap }: { roadmap: any[] }) => (
  <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-8 shadow-xl">
    <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
      <BookOpen className="mr-2 text-indigo-400" />
      Personalized Learning Roadmap
    </h3>

    <div className="space-y-6">
      {roadmap.map((phase, idx) => (
        <div key={idx} className="border-l-4 border-indigo-500 pl-6 py-2 relative">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h4 className="text-lg font-bold text-white">
                Phase {phase.phase}: {phase.focus}
              </h4>
              <p className="text-sm text-gray-400">
                Duration: <span className="text-indigo-300">{phase.duration_months} months</span> · Priority: {phase.priority}
              </p>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${phase.priority === 'High' ? 'bg-red-500/20 text-red-300 border border-red-500/30' : 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30'
              }`}>
              {phase.priority}
            </span>
          </div>
          <p className="text-gray-300 mb-4 text-sm">{phase.reasoning}</p>
          <div className="flex flex-wrap gap-2">
            {phase.skills_to_learn.map((skill: string) => (
              <span key={skill} className="px-3 py-1 bg-indigo-500/20 border border-indigo-500/30 text-indigo-200 rounded-lg text-sm flex items-center">
                {skill}
                <ChevronRight size={14} className="ml-1 opacity-70" />
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);

// Transition Insights Component
const TransitionInsights = ({ similarTransitions }: { similarTransitions: any }) => (
  <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-8 shadow-xl">
    <h3 className="text-xl font-bold text-white mb-6 flex items-center">
      <Users className="mr-2 text-blue-400" />
      Similar Transitions
    </h3>
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-gray-400">Success Rate</span>
        <span className="font-bold text-green-400">{similarTransitions.success_rate}</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-gray-400">Avg Transition Time</span>
        <span className="font-bold text-blue-400">{similarTransitions.avg_transition_time_months} months</span>
      </div>
      <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 mt-6">
        <p className="text-sm text-blue-200">
          This is a common career path with strong success rates. Focus on building practical projects while learning.
        </p>
      </div>
    </div>
  </div>
);

// Salary Projection Component
const SalaryProjection = ({ salaryProjection }: { salaryProjection: any }) => (
  <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-8 shadow-xl">
    <h3 className="text-xl font-bold text-white mb-6 flex items-center">
      <DollarSign className="mr-2 text-green-400" />
      Salary Projection
    </h3>
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-gray-400">Current Role</span>
        <span className="font-bold text-white">${salaryProjection.current.toLocaleString()}</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-gray-400">Target Role</span>
        <span className="font-bold text-green-400">${salaryProjection.target.toLocaleString()}</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-gray-400">Potential Growth</span>
        <span className="font-bold text-purple-400">+{salaryProjection.growth_percentage}%</span>
      </div>
      <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4 mt-6">
        <p className="text-sm text-green-200">
          Potential salary increase of ${(salaryProjection.target - salaryProjection.current).toLocaleString()} upon successful transition.
        </p>
      </div>
    </div>
  </div>
);

// ============= MAIN COMPONENT =============
const SkillsGapAnalyzer = () => {
  const [currentRole, setCurrentRole] = useState("Junior Backend Developer");
  const [currentSkills, setCurrentSkills] = useState(["Python", "FastAPI", "MySQL", "Git"]);
  const [experienceYears, setExperienceYears] = useState(1);
  const [targetRole, setTargetRole] = useState("Senior Full Stack Developer");
  const [analysis, setAnalysis] = useState<any>(null);

  const generateRoadmap = (missingSkills: string[], currentSkills: string[]): any[] => {
    const roadmap = [];
    const learned = new Set(currentSkills);
    const toLearn = [...missingSkills];

    const phase1Skills: string[] = [];
    const phase2Skills: string[] = [];
    const phase3Skills: string[] = [];

    toLearn.forEach(skill => {
      for (const category of Object.values(SKILL_TAXONOMY)) {
        if (category[skill]) {
          if (category[skill].difficulty <= 2) {
            phase1Skills.push(skill);
          } else if (category[skill].difficulty <= 4) {
            phase2Skills.push(skill);
          } else {
            phase3Skills.push(skill);
          }
          break;
        }
      }
    });

    if (phase1Skills.length > 0) {
      roadmap.push({
        phase: 1,
        duration_months: Math.ceil(phase1Skills.reduce((sum, s) => {
          for (const cat of Object.values(SKILL_TAXONOMY)) {
            if (cat[s]) return sum + cat[s].learning_time_weeks;
          }
          return sum;
        }, 0) / 4),
        focus: "Fundamentals & Prerequisites",
        skills_to_learn: phase1Skills.slice(0, 3),
        priority: "High",
        reasoning: "Build strong foundation for advanced concepts"
      });
    }

    if (phase2Skills.length > 0) {
      roadmap.push({
        phase: 2,
        duration_months: Math.ceil(phase2Skills.reduce((sum, s) => {
          for (const cat of Object.values(SKILL_TAXONOMY)) {
            if (cat[s]) return sum + cat[s].learning_time_weeks;
          }
          return sum;
        }, 0) / 4),
        focus: "Core Technologies",
        skills_to_learn: phase2Skills.slice(0, 4),
        priority: "High",
        reasoning: "Essential skills for target role proficiency"
      });
    }

    if (phase3Skills.length > 0) {
      roadmap.push({
        phase: 3,
        duration_months: Math.ceil(phase3Skills.reduce((sum, s) => {
          for (const cat of Object.values(SKILL_TAXONOMY)) {
            if (cat[s]) return sum + cat[s].learning_time_weeks;
          }
          return sum;
        }, 0) / 4),
        focus: "Advanced & Specialization",
        skills_to_learn: phase3Skills,
        priority: "Medium",
        reasoning: "Senior-level expertise and system thinking"
      });
    }

    return roadmap;
  };

  const calculateCategoryScores = (current: string[], target: string[]): any => {
    const categories: any = {};

    Object.keys(SKILL_TAXONOMY).forEach((cat: string) => {
      const catSkills = Object.keys(SKILL_TAXONOMY[cat]);
      const targetInCat = target.filter((s: string) => catSkills.includes(s));
      const currentInCat = current.filter((s: string) => catSkills.includes(s));

      if (targetInCat.length > 0) {
        categories[cat] = {
          current: currentInCat.length,
          required: targetInCat.length,
          percentage: Math.round((currentInCat.length / targetInCat.length) * 100)
        };
      }
    });

    return categories;
  };

  const analyzeSkillGap = () => {
    const targetSkills = ROLES[targetRole].required_skills;
    const matching = currentSkills.filter((s: string) => targetSkills.includes(s));
    const missing = targetSkills.filter(s => !currentSkills.includes(s));

    const gapPercentage = Math.round((missing.length / targetSkills.length) * 100);
    const readinessScore = 100 - gapPercentage;

    let totalWeeks = 0;
    const skillsToLearn = new Set(missing);
    const learned = new Set(currentSkills);

    missing.forEach((skill: string) => {
      const prereqs = calculatePrerequisites(skill);
      prereqs.forEach(p => {
        if (!learned.has(p)) skillsToLearn.add(p);
      });
    });

    skillsToLearn.forEach(skill => {
      for (const category of Object.values(SKILL_TAXONOMY)) {
        if (category[skill]) {
          totalWeeks += category[skill].learning_time_weeks;
        }
      }
    });

    const estimatedMonths = Math.ceil(totalWeeks / 4);
    const roadmap = generateRoadmap(missing, currentSkills);
    const categoryScores = calculateCategoryScores(currentSkills, targetSkills);

    const currentSalary = ROLES[currentRole].avg_salary;
    const targetSalary = ROLES[targetRole].avg_salary;
    const salaryGrowth = Math.round(((targetSalary - currentSalary) / currentSalary) * 100);

    setAnalysis({
      matching_skills: matching,
      missing_skills: missing,
      skill_gap_percentage: gapPercentage,
      readiness_score: readinessScore,
      estimated_learning_time_months: estimatedMonths,
      learning_roadmap: roadmap,
      similar_transitions: {
        success_rate: "75%",
        avg_transition_time_months: estimatedMonths + 1
      },
      category_scores: categoryScores,
      salary_projection: {
        current: currentSalary,
        target: targetSalary,
        growth_percentage: salaryGrowth
      }
    });
  };

  return (
    <BackgroundLayout>
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 animate-fade-in-up">
            <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-gray-400 mb-4">Skills Gap Analysis Engine</h1>
            <p className="text-xl text-gray-400">Analyze your career progression and plan your learning roadmap</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <CurrentProfileForm
              currentRole={currentRole}
              setCurrentRole={setCurrentRole}
              experienceYears={experienceYears}
              setExperienceYears={setExperienceYears}
              currentSkills={currentSkills}
              setCurrentSkills={setCurrentSkills}
            />

            <TargetRoleForm
              targetRole={targetRole}
              setTargetRole={setTargetRole}
              onAnalyze={analyzeSkillGap}
            />
          </div>

          {analysis && (
            <div className="space-y-8 animate-fade-in-up">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <StatCard icon={TrendingUp} label="Readiness Score" value={`${analysis.readiness_score}%`} color="blue" />
                <StatCard icon={AlertCircle} label="Skills Gap" value={`${analysis.skill_gap_percentage}%`} color="orange" />
                <StatCard icon={Clock} label="Learning Time" value={`${analysis.estimated_learning_time_months}mo`} color="green" />
                <StatCard icon={TrendingUp} label="Salary Growth" value={`+${analysis.salary_projection.growth_percentage}%`} color="purple" />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <SkillsComparison
                  matchingSkills={analysis.matching_skills}
                  missingSkills={analysis.missing_skills}
                />
                <CategoryRadarChart categoryScores={analysis.category_scores} />
              </div>

              <LearningRoadmap roadmap={analysis.learning_roadmap} />

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <TransitionInsights similarTransitions={analysis.similar_transitions} />
                <SalaryProjection salaryProjection={analysis.salary_projection} />
              </div>
            </div>
          )}
        </div>
      </div>
    </BackgroundLayout>
  );
};

export default SkillsGapAnalyzer;