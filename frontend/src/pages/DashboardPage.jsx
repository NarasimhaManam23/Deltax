import React from 'react';
import { Link } from 'react-router-dom';
import {
  HelpCircle,
  Code2,
  FileCheck2,
  MessageSquare,
  Flame,
  ArrowRight,
  TrendingUp,
  Target,
  Zap,
  Clock,
  Sparkles,
  BookOpen
} from 'lucide-react';
import { useLearner } from '../context/LearnerContext';
import WeakTopicBanner from '../components/WeakTopicBanner';
import CountdownTimer from '../components/CountdownTimer';

export default function DashboardPage() {
  const { dashboard, loading } = useLearner();

  if (loading && !dashboard) {
    return (
      <div className="py-20 text-center text-slate-400 font-mono text-sm">
        Loading preparation dashboard...
      </div>
    );
  }

  const d = dashboard || {
    overall_progress_pct: 25.0,
    round_progress: { round1: 30, round2: 20, round3: 25, round4: 15 },
    mcqs_attempted: 0,
    mcq_accuracy: 0.0,
    coding_solved: 0,
    mock_tests_completed: 0,
    interview_practiced: 0,
    streak_days: 1,
    continue_learning: {
      title: "Start: Programming Fundamentals",
      link: "/round-1?subject=Programming",
      subtitle: "100 High-Yield Questions"
    },
    weak_topic_focus: null,
    recent_activities: []
  };

  const statCards = [
    {
      label: 'MCQs Attempted',
      value: d.mcqs_attempted,
      subtext: `${d.mcq_accuracy}% Accuracy`,
      icon: HelpCircle,
      color: 'text-blue-400',
      bg: 'bg-blue-500/10 border-blue-500/20'
    },
    {
      label: 'Coding Solved',
      value: d.coding_solved,
      subtext: 'Across 21 Patterns',
      icon: Code2,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10 border-emerald-500/20'
    },
    {
      label: 'Mock Tests Taken',
      value: d.mock_tests_completed,
      subtext: 'Timed Assessment',
      icon: FileCheck2,
      color: 'text-purple-400',
      bg: 'bg-purple-500/10 border-purple-500/20'
    },
    {
      label: 'Interview Questions',
      value: d.interview_practiced,
      subtext: 'Rounds 2 & 4 Prepped',
      icon: MessageSquare,
      color: 'text-amber-400',
      bg: 'bg-amber-500/10 border-amber-500/20'
    },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Top Banner / Welcome */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              DeltaX Preparation Dashboard
            </h1>
            <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-brand-500/20 text-brand-400 border border-brand-500/30">
              Batch 2027
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Associate Product Engineer Drive • RVR & JC College of Engineering • 29 Sept 2026
          </p>
        </div>

        <div className="flex items-center gap-3">
          <CountdownTimer compact={true} />
        </div>
      </div>

      {/* Weak Area Alert Banner */}
      {d.weak_topic_focus && <WeakTopicBanner weakTopic={d.weak_topic_focus} />}

      {/* Overall Preparation Progress Bar */}
      <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">Overall Readiness</span>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="text-3xl font-black text-white font-mono">{d.overall_progress_pct}%</span>
              <span className="text-xs text-slate-400 font-medium">Estimated Drive Preparedness</span>
            </div>
          </div>

          <Link
            to="/plan"
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-brand-500/20 hover:bg-brand-500/30 border border-brand-500/40 text-brand-300 text-xs font-semibold transition-all self-start sm:self-auto"
          >
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>Open 4-Day Plan</span>
          </Link>
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
              <span className="text-slate-400 font-medium">Round 1 (MCQ)</span>
              <span className="font-mono font-bold text-blue-400">{d.round_progress?.round1 || 0}%</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
              <div className="bg-blue-400 h-full rounded-full" style={{ width: `${d.round_progress?.round1 || 0}%` }} />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-slate-400 font-medium">Round 2 (AI Voice)</span>
              <span className="font-mono font-bold text-amber-400">{d.round_progress?.round2 || 0}%</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
              <div className="bg-amber-400 h-full rounded-full" style={{ width: `${d.round_progress?.round2 || 0}%` }} />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-slate-400 font-medium">Round 3 (Coding)</span>
              <span className="font-mono font-bold text-emerald-400">{d.round_progress?.round3 || 0}%</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
              <div className="bg-emerald-400 h-full rounded-full" style={{ width: `${d.round_progress?.round3 || 0}%` }} />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-slate-400 font-medium">Round 4 (Technical)</span>
              <span className="font-mono font-bold text-purple-400">{d.round_progress?.round4 || 0}%</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
              <div className="bg-purple-400 h-full rounded-full" style={{ width: `${d.round_progress?.round4 || 0}%` }} />
            </div>
          </div>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card, i) => {
          const Icon = card.icon;
          return (
            <div key={i} className="p-4 sm:p-5 rounded-2xl bg-slate-900/70 border border-slate-800 shadow-lg space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-slate-400">{card.label}</span>
                <div className={`p-2 rounded-xl border ${card.bg} ${card.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-extrabold text-white font-mono">{card.value}</span>
                <p className="text-[11px] text-slate-500 mt-0.5">{card.subtext}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Continue Learning & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Continue Learning Card */}
        {d.continue_learning && (
          <div className="lg:col-span-1 p-6 rounded-2xl bg-gradient-to-br from-brand-950/40 via-slate-900 to-slate-900 border border-brand-500/30 shadow-xl flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <span className="text-[10px] uppercase font-bold tracking-wider text-brand-400 font-mono">Next Objective</span>
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
              <span>Continue Learning</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}

        {/* Quick Practice Launchpad */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-slate-900/70 border border-slate-800 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white">Recommended Sprints</h3>
            <span className="text-xs text-slate-500">Pick a module</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Link
              to="/mocks"
              className="p-3.5 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 hover:border-brand-500/40 transition-all flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400">
                  <FileCheck2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white group-hover:text-brand-300">Round 1 Full Mock 1</h4>
                  <p className="text-[11px] text-slate-400">50 Questions • 45 Mins</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
            </Link>

            <Link
              to="/round-3?tab=mocks"
              className="p-3.5 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 hover:border-brand-500/40 transition-all flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400">
                  <Code2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white group-hover:text-brand-300">30-Min Speed Mock 1</h4>
                  <p className="text-[11px] text-slate-400">2 Problems • Official Timing</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
            </Link>

            <Link
              to="/round-2?mode=simulator"
              className="p-3.5 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 hover:border-brand-500/40 transition-all flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white group-hover:text-brand-300">AI Telephonic Simulator</h4>
                  <p className="text-[11px] text-slate-400">15–20 Mins Voice Simulation</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
            </Link>

            <Link
              to="/round-4?tab=defense"
              className="p-3.5 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 hover:border-brand-500/40 transition-all flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-purple-500/20 text-purple-400">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white group-hover:text-brand-300">Coding Defense Playbook</h4>
                  <p className="text-[11px] text-slate-400">PADRE Framework & Notepad</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
            </Link>
          </div>
        </div>
      </div>

      {/* Recent Activity Timeline */}
      {d.recent_activities && d.recent_activities.length > 0 && (
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-white">Recent Study Activity</h3>
          <div className="divide-y divide-slate-800/60">
            {d.recent_activities.map((act, i) => (
              <div key={i} className="py-2.5 flex items-center justify-between text-xs">
                <div>
                  <span className="font-semibold text-slate-200">{act.title}</span>
                  <span className="text-slate-500 ml-2 font-mono">{act.details}</span>
                </div>
                <span className="text-slate-500 text-[11px]">{new Date(act.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
