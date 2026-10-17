import React from 'react';
import { Link } from 'react-router-dom';
import {
  HelpCircle,
  Code2,
  Database,
  MessageSquare,
  ArrowRight,
  ShieldCheck,
  Zap,
  Building2,
  Clock,
  Sparkles,
  BookOpen,
  RotateCcw,
  Compass,
  FileCheck2
} from 'lucide-react';
import CountdownTimer from '../components/CountdownTimer';

export default function LandingPage() {
  const modules = [
    {
      module: 'Module A',
      title: 'Round 1: Online Screening Practice',
      duration: '45–60 Minutes',
      format: 'Technical MCQs & Output Prediction',
      topics: 'JavaScript ES6+, DOM mechanics, Web standards (HTML5/CSS3/HTTP), and Analytical problem solving',
      icon: HelpCircle,
      color: 'from-blue-500/20 to-cyan-500/20',
      border: 'border-blue-500/30',
      badgeColor: 'bg-blue-500/20 text-blue-400',
      link: '/round-1'
    },
    {
      module: 'Module B',
      title: 'Round 2: Coding & SQL Practice',
      duration: '60 Minutes',
      format: 'Live Algorithmic Coding & SQLite Sandbox',
      topics: 'Vanilla JS (strings, arrays, debounce, async) and SQL queries (joins, grouping, salary rankings)',
      icon: Code2,
      color: 'from-emerald-500/20 to-teal-500/20',
      border: 'border-emerald-500/30',
      badgeColor: 'bg-emerald-500/20 text-emerald-400',
      link: '/round-2'
    },
    {
      module: 'Module C',
      title: 'Technical & JavaScript Interview',
      duration: '45–60 Minutes',
      format: '1-on-1 Virtual Technical Deep Dive',
      topics: 'React 18 Fiber reconciler, Event Loop tick order, Core Web Vitals, live search architecture, state management',
      icon: MessageSquare,
      color: 'from-purple-500/20 to-indigo-500/20',
      border: 'border-purple-500/30',
      badgeColor: 'bg-purple-500/20 text-purple-400',
      link: '/round-4'
    },
    {
      module: 'Evidence Base',
      title: 'Research Library & Candidate Experiences',
      duration: 'Continuous',
      format: 'Citations, Sources & Honest Frequencies',
      topics: 'Official Careers JD specifications, candidate debriefs from Reddit and Glassdoor, and reconciled recruitment documents',
      icon: Compass,
      color: 'from-amber-500/20 to-orange-500/20',
      border: 'border-amber-500/30',
      badgeColor: 'bg-amber-500/20 text-amber-400',
      link: '/research'
    },
  ];

  return (
    <div className="py-6 sm:py-12 space-y-16 animate-fadeIn">
      {/* Hero Section */}
      <div className="relative text-center space-y-6 max-w-4xl mx-auto">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-500/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300">
          <Building2 className="w-3.5 h-3.5 text-brand-400" />
          <span>The First Labs / FirstHire • FED-2026</span>
          <span className="text-slate-600">•</span>
          <span className="text-brand-400 font-mono">₹8 LPA Base + Variables</span>
        </div>

        <div className="space-y-3">
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
            FirstLabs Prep <br />
            <span className="bg-gradient-to-r from-brand-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              FED-2026 Platform
            </span>
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto font-medium leading-relaxed italic">
            "Learn the concepts. Practise the patterns. Prepare with evidence."
          </p>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Your comprehensive, evidence-grounded placement preparation platform for the <strong>Associate Frontend Developer</strong> drive. Master Round 1 screening, Round 2 coding & SQL, and technical interviews.
          </p>
        </div>

        {/* Assessment Countdown */}
        <div className="pt-2 flex flex-col items-center justify-center gap-3">
          <CountdownTimer compact={true} />
        </div>

        {/* CTA Buttons: NO LOGIN REQUIRED */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/dashboard"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-brand-600 to-cyan-500 hover:from-brand-500 hover:to-cyan-400 text-white font-bold text-base shadow-xl shadow-brand-500/25 transition-all transform hover:-translate-y-0.5"
          >
            <span>Enter Preparation Dashboard</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            to="/round-1"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-slate-200 font-semibold text-sm transition-all"
          >
            <HelpCircle className="w-4 h-4 text-blue-400" />
            <span>Practise Round 1 MCQs</span>
          </Link>
          <Link
            to="/round-2"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-slate-200 font-semibold text-sm transition-all"
          >
            <Code2 className="w-4 h-4 text-emerald-400" />
            <span>Round 2 Coding & SQL</span>
          </Link>
        </div>

        <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Anonymous learner ID stored locally in browser. No mandatory registration or external tracking.</span>
        </div>
      </div>

      {/* Preparation Modules Grid */}
      <div className="space-y-6 max-w-5xl mx-auto">
        <div className="text-center space-y-1">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Targeted Preparation Modules</h2>
          <p className="text-xs sm:text-sm text-slate-400">Reconciling candidate recruitment emails and official Careers JD specifications.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {modules.map((m, idx) => {
            const Icon = m.icon;
            return (
              <div
                key={idx}
                className="relative rounded-2xl p-6 bg-slate-900/70 border border-slate-800 hover:border-slate-700 transition-all shadow-xl space-y-4 group flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-3 rounded-xl bg-gradient-to-br ${m.color} border ${m.border}`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <span className="text-[11px] font-mono font-bold text-slate-400 uppercase">{m.module}</span>
                        <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-brand-400 transition-colors">
                          {m.title}
                        </h3>
                      </div>
                    </div>
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${m.badgeColor} shrink-0`}>
                      {m.duration}
                    </span>
                  </div>

                  <div className="space-y-2 text-xs text-slate-300">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-slate-500 shrink-0" />
                      <span className="font-mono text-slate-400">{m.format}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <BookOpen className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                      <span className="text-slate-400 leading-relaxed">{m.topics}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                  <Link
                    to={m.link}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-400 hover:text-brand-300 transition-colors"
                  >
                    <span>Enter {m.title.split(':')[0]}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Feature Metrics Highlight */}
      <div className="max-w-5xl mx-auto rounded-3xl p-6 sm:p-8 bg-slate-900/50 border border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
        <div>
          <span className="block text-2xl sm:text-3xl font-extrabold text-brand-400 font-mono">37+</span>
          <span className="text-xs text-slate-400 font-medium">Screening MCQs & Traps</span>
        </div>
        <div>
          <span className="block text-2xl sm:text-3xl font-extrabold text-cyan-400 font-mono">16</span>
          <span className="text-xs text-slate-400 font-medium">JS & SQL Sandbox Tasks</span>
        </div>
        <div>
          <span className="block text-2xl sm:text-3xl font-extrabold text-purple-400 font-mono">5</span>
          <span className="text-xs text-slate-400 font-medium">Timed Practice Mocks</span>
        </div>
        <div>
          <span className="block text-2xl sm:text-3xl font-extrabold text-emerald-400 font-mono">100%</span>
          <span className="text-xs text-slate-400 font-medium">Evidence-Backed Content</span>
        </div>
      </div>
    </div>
  );
}
