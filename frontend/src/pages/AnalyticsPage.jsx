import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, PieChart, Pie, Cell, Legend 
} from 'recharts';
import { 
  TrendingUp, Award, Target, Flame, CheckCircle2, AlertTriangle, 
  ArrowRight, Clock, HelpCircle, Code2, Shield, Sparkles, RefreshCw
} from 'lucide-react';
import { useLearner } from '../context/LearnerContext';
import { getAnalytics } from '../api';

export default function AnalyticsPage() {
  const navigate = useNavigate();
  const { learner, dashboardData, refreshDashboard } = useLearner();
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const res = await getAnalytics();
        setAnalyticsData(res);
      } catch (err) {
        console.warn("Analytics API fetch error, fallback to dashboardData:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const d = analyticsData || dashboardData || {};

  // Subject accuracy chart data
  const subjectAccuracy = d.subject_accuracy || [
    { subject: 'JavaScript', accuracy: 84, total: 35 },
    { subject: 'DOM Concepts', accuracy: 78, total: 25 },
    { subject: 'Web Standards', accuracy: 88, total: 20 },
    { subject: 'Analytical', accuracy: 72, total: 20 },
    { subject: 'SQL & DB', accuracy: 80, total: 20 },
  ];

  // Score over time line chart data
  const scoreHistory = d.score_history || [
    { name: 'Test 1', score: 68 },
    { name: 'Test 2', score: 74 },
    { name: 'Test 3', score: 78 },
    { name: 'Test 4', score: 84 },
    { name: 'Test 5', score: 88 },
  ];

  // Pie chart question breakdown
  const pieData = [
    { name: 'Correct', value: d.total_correct || 42, color: '#10b981' },
    { name: 'Incorrect', value: Math.max(0, (d.total_mcqs_attempted || 50) - (d.total_correct || 42)), color: '#f43f5e' },
    { name: 'Unattempted', value: Math.max(0, 500 - (d.total_mcqs_attempted || 50)), color: '#334155' },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-1 text-xs font-semibold uppercase tracking-wider rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Performance Intelligence
            </span>
            <span className="px-2.5 py-1 text-xs font-semibold uppercase tracking-wider rounded-md bg-blue-500/10 text-blue-400 border border-blue-500/20">
              Recharts Visualizations
            </span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Preparation Analytics & Diagnostics
          </h1>
          <p className="text-slate-400 mt-1 max-w-3xl">
            Real-time telemetry on subject accuracy, mock test progression, algorithmic coding attempts, and automated weak topic diagnostics.
          </p>
        </div>

        <button
          onClick={refreshDashboard}
          className="py-2 px-3.5 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 text-xs font-semibold flex items-center gap-2 transition-all"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Refresh Stats
        </button>
      </div>

      {/* Top 4 Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
            <span>Overall Readiness</span>
            <Target className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white mt-2">
            {d.overall_percentage || 45}%
          </div>
          <div className="text-[11px] text-emerald-400 mt-1">
            Calculated across all 4 rounds
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
            <span>MCQ Accuracy</span>
            <Award className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 mt-2">
            {d.mcq_accuracy_percent || 84}%
          </div>
          <div className="text-[11px] text-slate-400 mt-1">
            {d.total_correct || 42} correct of {d.total_mcqs_attempted || 50} attempted
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
            <span>Coding Problems</span>
            <Code2 className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-purple-400 mt-2">
            {d.coding_solved || 12}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">
            Across 17 master patterns
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
            <span>Study Streak</span>
            <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 mt-2">
            {learner?.streak_days || 1} Days
          </div>
          <div className="text-[11px] text-slate-400 mt-1">
            Active daily preparation
          </div>
        </div>
      </div>

      {/* WEAK TOPIC RECOMMENDER ("Focus Next") */}
      {d.weak_topic && (
        <div className="p-5 rounded-2xl bg-amber-950/20 border border-amber-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 shrink-0">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                  Focus Next — Diagnostic Alert
                </span>
                <span className="text-xs font-mono font-bold text-amber-300 px-2 py-0.5 rounded bg-amber-500/10">
                  {d.weak_topic.accuracy}% Accuracy
                </span>
              </div>
              <h3 className="text-base font-bold text-white mt-1">
                {d.weak_topic.topic}: {d.weak_topic.advice}
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Your performance in this area is currently dragging down your Round 1 qualifying index.
              </p>
            </div>
          </div>

          <button
            onClick={() => navigate('/round-1')}
            className="py-2 px-4 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-semibold text-xs flex items-center gap-1.5 shrink-0 shadow-lg shadow-amber-600/20 transition-all"
          >
            Practice Weak Topic
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Subject Accuracy Bar Chart */}
        <div className="lg:col-span-8 p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div>
              <h3 className="text-base font-bold text-white">Subject Accuracy Analysis</h3>
              <p className="text-xs text-slate-400">Percentage accuracy by topic across all attempts</p>
            </div>
          </div>

          <div className="h-72 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={subjectAccuracy}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="subject" stroke="#64748b" tick={{ fontSize: 11 }} />
                <YAxis stroke="#64748b" domain={[0, 100]} tick={{ fontSize: 11 }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.75rem', color: '#fff', fontSize: '12px' }} 
                  formatter={(val) => [`${val}%`, 'Accuracy']}
                />
                <Bar dataKey="accuracy" fill="#3b82f6" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Question Status Pie Chart */}
        <div className="lg:col-span-4 p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4 flex flex-col justify-between">
          <div className="pb-2 border-b border-slate-800">
            <h3 className="text-base font-bold text-white">Question Bank Coverage</h3>
            <p className="text-xs text-slate-400">500 Subject MCQs Breakdown</p>
          </div>

          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.75rem', color: '#fff', fontSize: '12px' }} 
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center text-xs pt-2 border-t border-slate-800">
            <div>
              <div className="text-emerald-400 font-bold">{d.total_correct || 42}</div>
              <div className="text-slate-500 text-[10px]">Correct</div>
            </div>
            <div>
              <div className="text-rose-400 font-bold">{Math.max(0, (d.total_mcqs_attempted || 50) - (d.total_correct || 42))}</div>
              <div className="text-slate-500 text-[10px]">Incorrect</div>
            </div>
            <div>
              <div className="text-slate-400 font-bold">{Math.max(0, 500 - (d.total_mcqs_attempted || 50))}</div>
              <div className="text-slate-500 text-[10px]">Remaining</div>
            </div>
          </div>
        </div>

        {/* Mock Test Score Progression Line Chart */}
        <div className="lg:col-span-12 p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div>
              <h3 className="text-base font-bold text-white">Score Progression Over Tests</h3>
              <p className="text-xs text-slate-400">Track improvement trend toward the 29 September 2026 drive</p>
            </div>
          </div>

          <div className="h-64 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={scoreHistory}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="name" stroke="#64748b" tick={{ fontSize: 11 }} />
                <YAxis stroke="#64748b" domain={[0, 100]} tick={{ fontSize: 11 }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.75rem', color: '#fff', fontSize: '12px' }} 
                  formatter={(val) => [`${val}%`, 'Score']}
                />
                <Line 
                  type="monotone" 
                  dataKey="score" 
                  stroke="#10b981" 
                  strokeWidth={3} 
                  dot={{ fill: '#10b981', r: 5 }} 
                  activeDot={{ r: 7 }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
