import React from 'react';
import { Link } from 'react-router-dom';
import {
  HelpCircle,
  Code2,
  FileCheck2,
  Database,
  MessageSquare,
  Flame,
  ArrowRight,
  TrendingUp,
  Target,
  Zap,
  Clock,
  Sparkles,
  BookOpen,
  AlertTriangle,
  Building,
  RotateCcw
} from 'lucide-react';
import { useLearner } from '../context/LearnerContext';
import WeakTopicBanner from '../components/WeakTopicBanner';
import CountdownTimer from '../components/CountdownTimer';

export default function DashboardPage() {
  const { dashboard, loading } = useLearner();

  if (loading && !dashboard) {
    return (
      <div className="py-20 text-center text-slate-400 font-mono text-sm">
        Loading FirstLabs FED-2026 dashboard...
      </div>
    );
  }

  const d = dashboard || {
    overall_progress_pct: 35.0,
    round_progress: { round1: 40, round2: 30, round3: 20, round4: 15 },
    mcqs_attempted: 0,
    mcq_accuracy: 0.0,
    coding_solved: 0,
    total_sql_solved: 0,
    mock_tests_completed: 0,
    interview_practiced: 0,
    streak_days: 1,
    continue_learning: {
      title: "Start: JavaScript Fundamentals & Event Loop",
      link: "/round-1?subject=JavaScript",
      subtitle: "Master hoisting, closures, and output prediction traps"
    },
    weak_topic_focus: null,
    recent_activities: []
  };

  const statCards = [
    {
      label: 'Screening MCQs',
      value: d.mcqs_attempted,
      subtext: `${d.mcq_accuracy}% Accuracy`,
      icon: HelpCircle,
      color: 'text-blue-400',
      bg: 'bg-blue-500/10 border-blue-500/20',
      link: '/round-1'
    },
    {
      label: 'JS Coding Solved',
      value: d.coding_solved,
      subtext: '8 High-Yield Challenges',
      icon: Code2,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10 border-emerald-500/20',
      link: '/round-2'
    },
    {
      label: 'SQL Queries Solved',
      value: d.total_sql_solved !== undefined ? d.total_sql_solved : 0,
      subtext: 'Live SQLite Sandbox',
      icon: Database,
      color: 'text-cyan-400',
      bg: 'bg-cyan-500/10 border-cyan-500/20',
      link: '/round-2'
    },
    {
      label: 'Interview Questions',
      value: d.interview_practiced,
      subtext: 'React & Core Web Vitals',
      icon: MessageSquare,
      color: 'text-purple-400',
      bg: 'bg-purple-500/10 border-purple-500/20',
      link: '/round-4'
    },
  ];

  return (
    <div className="space-y-8 pb-12 animate-fadeIn">
      {/* Top Banner / Target Role Intelligence */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              FirstLabs Prep — FED-2026
            </h1>
            <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-brand-500/20 text-brand-400 border border-brand-500/30">
              ₹8 LPA Base + Variables
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Associate Frontend Developer • FirstHire by The First Labs • Mumbai Tech Hub
          </p>
        </div>

        <div className="flex items-center gap-3">
          <CountdownTimer compact={true} />
        </div>
      </div>

      {/* Weak Area Alert Banner */}
      {d.weak_topic_focus && <WeakTopicBanner weakTopic={d.weak_topic_focus} />}

      {/* Overall Preparation Readiness Bar */}
      <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">Overall Drive Readiness</span>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="text-3xl font-black text-white font-mono">{d.overall_progress_pct}%</span>
              <span className="text-xs text-slate-400 font-medium">Weighted Readiness across Rounds 1 & 2</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/mistakes"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-300 text-xs font-semibold transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5 text-red-400" />
              <span>Mistake Notebook</span>
            </Link>

            <Link
              to="/plan"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-brand-500/20 hover:bg-brand-500/30 border border-brand-500/40 text-brand-300 text-xs font-semibold transition-all self-start sm:self-auto"
            >
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>Preparation Plan</span>
            </Link>
          </div>
        </div>

        {/* Master Progress Bar */}
        <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden p-0.5">
          <div
            className="bg-gradient-to-r from-brand-500 via-cyan-400 to-emerald-400 h-full rounded-full transition-all duration-500 shadow-sm shadow-brand-500/50"
            style={{ width: `${Math.max(5, d.overall_progress_pct)}%` }}
          />
        </div>

        {/* 4 Rounds Progress Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-slate-400 font-medium">Round 1 (Screening)</span>
              <span className="font-mono font-bold text-blue-400">{d.round_progress?.round1 || 0}%</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
              <div className="bg-blue-400 h-full rounded-full" style={{ width: `${d.round_progress?.round1 || 0}%` }} />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-slate-400 font-medium">Round 2 (Coding & SQL)</span>
              <span className="font-mono font-bold text-emerald-400">{d.round_progress?.round2 || 0}%</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
              <div className="bg-emerald-400 h-full rounded-full" style={{ width: `${d.round_progress?.round2 || 0}%` }} />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-slate-400 font-medium">Technical Interview</span>
              <span className="font-mono font-bold text-purple-400">{d.round_progress?.round4 || 0}%</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
              <div className="bg-purple-400 h-full rounded-full" style={{ width: `${d.round_progress?.round4 || 0}%` }} />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-slate-400 font-medium">Research & Evidence</span>
              <span className="font-mono font-bold text-amber-400">{d.round_progress?.round3 || 0}%</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
              <div className="bg-amber-400 h-full rounded-full" style={{ width: `${d.round_progress?.round3 || 0}%` }} />
            </div>
          </div>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card, i) => {
          const Icon = card.icon;
          return (
            <Link
              key={i}
              to={card.link}
              className="p-4 sm:p-5 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 shadow-lg space-y-3 transition-all block group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-slate-400 group-hover:text-slate-200 transition-colors">{card.label}</span>
                <div className={`p-2 rounded-xl border ${card.bg} ${card.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-extrabold text-white font-mono">{card.value}</span>
                <p className="text-[11px] text-slate-500 mt-0.5">{card.subtext}</p>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Next Objective & Quick Practice Launchpad */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Next Objective Card */}
        {d.continue_learning && (
          <div className="lg:col-span-1 p-6 rounded-2xl bg-gradient-to-br from-brand-950/40 via-slate-900 to-slate-900 border border-brand-500/30 shadow-xl flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <span className="text-[10px] uppercase font-bold tracking-wider text-brand-400 font-mono">Next Recommended Sprint</span>
              <h3 className="text-lg font-bold text-white leading-snug">
                {d.continue_learning.title}
              </h3>
              <p className="text-xs text-slate-400">
                {d.continue_learning.subtitle}
              </p>
            </div>

            <Link
              to={d.continue_learning.link}
              className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold text-xs transition-all shadow-md shadow-brand-500/20"
            >
              <span>Start Learning</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}

        {/* Quick Practice Launchpad */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-slate-900/70 border border-slate-800 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white">Recommended Practice Sprints</h3>
            <span className="text-xs text-slate-500">Pick a module</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Link
              to="/round-1"
              className="p-3.5 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 hover:border-brand-500/40 transition-all flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400">
                  <HelpCircle className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white group-hover:text-brand-300">Round 1 Screening MCQs</h4>
                  <p className="text-[11px] text-slate-400">JS, DOM & Web Standards</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
            </Link>

            <Link
              to="/round-2"
              className="p-3.5 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 hover:border-brand-500/40 transition-all flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400">
                  <Code2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white group-hover:text-brand-300">Round 2: JavaScript Coding</h4>
                  <p className="text-[11px] text-slate-400">Debounce, Flatten Array, Two Sum</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
            </Link>

            <Link
              to="/round-2"
              className="p-3.5 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 hover:border-brand-500/40 transition-all flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-400">
                  <Database className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white group-hover:text-brand-300">Round 2: SQL Query Sandbox</h4>
                  <p className="text-[11px] text-slate-400">Real SQLite In-Memory Sandbox</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
            </Link>

            <Link
              to="/round-4"
              className="p-3.5 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 hover:border-brand-500/40 transition-all flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-purple-500/20 text-purple-400">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white group-hover:text-brand-300">Technical Interview Defense</h4>
                  <p className="text-[11px] text-slate-400">React Fiber & Core Web Vitals</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
