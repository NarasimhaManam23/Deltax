import React from 'react';
import { Link } from 'react-router-dom';
import {
  HelpCircle,
  MessageSquare,
  Code2,
  Users2,
  ArrowRight,
  ShieldCheck,
  Zap,
  Calendar,
  Building2,
  MapPin,
  Clock,
  Sparkles,
  BookOpen,
  Award
} from 'lucide-react';
import CountdownTimer from '../components/CountdownTimer';

export default function LandingPage() {
  const rounds = [
    {
      round: 1,
      title: 'Technical MCQ Test',
      duration: '45 Minutes',
      count: '50 Questions',
      time: '10:00 AM – 10:45 AM',
      topics: 'Programming, DSA, Networks, Microprocessors, Cybersecurity, DBMS, OS',
      icon: HelpCircle,
      color: 'from-blue-500/20 to-cyan-500/20',
      border: 'border-blue-500/30',
      badgeColor: 'bg-blue-500/20 text-blue-400'
    },
    {
      round: 2,
      title: 'AI Telephonic Interview',
      duration: '15–20 Minutes',
      count: 'Voice Screening',
      time: 'Starts at 12:30 PM',
      topics: 'Projects, Core Tech, Behavioral, AdTech Domain, Rapid-Fire CS',
      icon: MessageSquare,
      color: 'from-amber-500/20 to-orange-500/20',
      border: 'border-amber-500/30',
      badgeColor: 'bg-amber-500/20 text-amber-400'
    },
    {
      round: 3,
      title: 'Online Coding Assessment',
      duration: '30 Minutes (Official 2026)',
      count: 'High Speed',
      time: 'Starts at 4:00 PM',
      topics: 'Contiguous Subarrays, Sliding Window, URL Parsing, Backtracking',
      icon: Code2,
      color: 'from-emerald-500/20 to-teal-500/20',
      border: 'border-emerald-500/30',
      badgeColor: 'bg-emerald-500/20 text-emerald-400'
    },
    {
      round: 4,
      title: 'One-to-One Technical Interview',
      duration: '45 Minutes',
      count: 'Live Defense',
      time: 'Starts at 5:00 PM',
      topics: 'Notepad Coding Defense (PADRE), Deep Architecture, OOP, OS, Projects',
      icon: Users2,
      color: 'from-purple-500/20 to-indigo-500/20',
      border: 'border-purple-500/30',
      badgeColor: 'bg-purple-500/20 text-purple-400'
    },
  ];

  return (
    <div className="py-6 sm:py-12 space-y-16">
      {/* Hero Section */}
      <div className="relative text-center space-y-6 max-w-4xl mx-auto">
        {/* Glow backdrop */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-500/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300">
          <Building2 className="w-3.5 h-3.5 text-brand-400" />
          <span>DeltaX Campus Drive 2027</span>
          <span className="text-slate-600">•</span>
          <span className="text-brand-400 font-mono">₹7 LPA</span>
        </div>

        <div className="space-y-3">
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
            DeltaX Prep <br />
            <span className="bg-gradient-to-r from-brand-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              Associate Product Engineer
            </span>
          </h1>
          <p className="text-base sm:text-xl text-slate-400 max-w-2xl mx-auto font-normal leading-relaxed">
            Your complete interactive preparation platform for the DeltaX campus drive at{' '}
            <span className="text-slate-200 font-medium">RVR & JC College of Engineering</span> on{' '}
            <span className="text-brand-400 font-semibold underline decoration-brand-500/40">29 September 2026</span>.
          </p>
        </div>

        {/* Live Drive Countdown */}
        <div className="pt-2 flex flex-col items-center justify-center gap-3">
          <CountdownTimer targetDate="2026-09-29T10:00:00" />
        </div>

        {/* CTA Button: NO LOGIN, NO SIGNUP */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/dashboard"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-brand-600 to-cyan-500 hover:from-brand-500 hover:to-cyan-400 text-white font-bold text-base shadow-xl shadow-brand-500/25 transition-all transform hover:-translate-y-0.5"
          >
            <span>Start Preparing Now</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            to="/plan"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-slate-200 font-semibold text-sm transition-all"
          >
            <Zap className="w-4 h-4 text-amber-400" />
            <span>View 4-Day Crash Plan</span>
          </Link>
        </div>

        <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>No login or sign-up required. Your progress is saved anonymously in this browser.</span>
        </div>
      </div>

      {/* Official Drive Process vs Historical Notice */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl mx-auto">
        <div className="p-4 sm:p-5 rounded-2xl bg-blue-500/5 border border-blue-500/20 space-y-2">
          <div className="flex items-center gap-2 text-blue-400 font-bold text-xs uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>Current Official Schedule (2026 Communication)</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Prioritizes the authoritative schedule communicated by college: <strong>Round 1 (10:00 AM)</strong> 50 MCQs / 45 mins; <strong>Round 2 (12:30 PM)</strong> AI telephonic screening; <strong>Round 3 (4:00 PM)</strong> Online coding with an officially communicated <strong>30-minute duration</strong>; <strong>Round 4 (5:00 PM)</strong> Technical interview.
          </p>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-amber-500/5 border border-amber-500/20 space-y-2">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
            <Clock className="w-4 h-4" />
            <span>Historical DeltaX Pattern Handling</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Historical slides report a 5-question / 120-minute coding test with a mandatory <strong>55%+ per-question cutoff</strong>. This platform provides both fast 30-minute speed mocks and full 120-minute 5-question mocks so you are fully prepared for either format!
          </p>
        </div>
      </div>

      {/* 4 Selection Round Cards */}
      <div className="space-y-6 max-w-5xl mx-auto">
        <div className="text-center space-y-1">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">4 Selection Rounds</h2>
          <p className="text-xs sm:text-sm text-slate-400">Complete curriculum tailored to each elimination gate.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {rounds.map((r) => {
            const Icon = r.icon;
            return (
              <div
                key={r.round}
                className="relative rounded-2xl p-6 bg-slate-900/70 border border-slate-800 hover:border-slate-700 transition-all shadow-xl space-y-4 group"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${r.color} border ${r.border}`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <span className="text-[11px] font-mono font-bold text-slate-400 uppercase">ROUND {r.round}</span>
                      <h3 className="text-lg font-bold text-white group-hover:text-brand-400 transition-colors">
                        {r.title}
                      </h3>
                    </div>
                  </div>
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${r.badgeColor}`}>
                    {r.duration}
                  </span>
                </div>

                <div className="space-y-2 text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-slate-500 shrink-0" />
                    <span className="font-mono text-slate-400">{r.time}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <BookOpen className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                    <span className="text-slate-400">{r.topics}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                  <Link
                    to={`/round-${r.round}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-400 hover:text-brand-300 transition-colors"
                  >
                    <span>Enter Round {r.round} Module</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Feature Highlights Grid */}
      <div className="max-w-5xl mx-auto rounded-3xl p-6 sm:p-8 bg-slate-900/50 border border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
        <div>
          <span className="block text-2xl sm:text-3xl font-extrabold text-brand-400 font-mono">550+</span>
          <span className="text-xs text-slate-400 font-medium">Technical MCQs</span>
        </div>
        <div>
          <span className="block text-2xl sm:text-3xl font-extrabold text-cyan-400 font-mono">140+</span>
          <span className="text-xs text-slate-400 font-medium">Coding Problems & Mocks</span>
        </div>
        <div>
          <span className="block text-2xl sm:text-3xl font-extrabold text-purple-400 font-mono">290+</span>
          <span className="text-xs text-slate-400 font-medium">Interview Questions</span>
        </div>
        <div>
          <span className="block text-2xl sm:text-3xl font-extrabold text-emerald-400 font-mono">20</span>
          <span className="text-xs text-slate-400 font-medium">Cheat Sheets</span>
        </div>
      </div>
    </div>
  );
}
