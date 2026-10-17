import React, { useState, useEffect } from 'react';
import { 
  Calendar, CheckCircle2, Circle, Clock, Target, Sparkles, 
  ArrowRight, Award, Flame, Check, AlertCircle, FileText
} from 'lucide-react';
import planTasksData from '../data/plan_tasks.json';
import { getPlanTasks, togglePlanTask } from '../api';
import { useLearner } from '../context/LearnerContext';
import MarkdownViewer from '../components/MarkdownViewer';

export default function PlanPage() {
  const { refreshDashboard } = useLearner();
  const [completedTasks, setCompletedTasks] = useState(() => {
    try {
      const saved = localStorage.getItem('deltax_completed_tasks');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [selectedDay, setSelectedDay] = useState('All');
  const [togglingId, setTogglingId] = useState(null);

  // Group unique days from plan_tasks.json
  const days = ['All', ...new Set(planTasksData.map(t => t.day.split('(')[0].trim()))];

  const filteredTasks = selectedDay === 'All'
    ? planTasksData
    : planTasksData.filter(t => t.day.startsWith(selectedDay));

  const completedCount = Object.values(completedTasks).filter(Boolean).length;
  const totalCount = planTasksData.length;
  const percentComplete = Math.round((completedCount / totalCount) * 100);

  const handleToggle = async (taskId) => {
    setTogglingId(taskId);
    const newStatus = !completedTasks[taskId];
    const updated = { ...completedTasks, [taskId]: newStatus };
    setCompletedTasks(updated);
    localStorage.setItem('deltax_completed_tasks', JSON.stringify(updated));

    try {
      await togglePlanTask(taskId, newStatus);
      refreshDashboard();
    } catch (e) {
      console.warn("Backend plan task sync skipped, saved locally:", e);
    } finally {
      setTogglingId(null);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-1 text-xs font-semibold uppercase tracking-wider rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Execution Roadmap
            </span>
            <span className="px-2.5 py-1 text-xs font-semibold uppercase tracking-wider rounded-md bg-blue-500/10 text-blue-400 border border-blue-500/20">
              FirstLabs FED-2026 Drive
            </span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Preparation Plan & Roadmap
          </h1>
          <p className="text-slate-400 mt-1 max-w-3xl text-sm leading-relaxed">
            Personalised, structured study schedule prioritizing JavaScript fundamentals, output prediction, DOM mechanics, authentic SQL queries, and timed mock tests.
          </p>
        </div>

        {/* Plan Progress Counter */}
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold text-sm border border-emerald-500/20">
            {percentComplete}%
          </div>
          <div>
            <div className="text-xs text-slate-400">Tasks Completed</div>
            <div className="text-sm font-bold text-white mt-0.5">
              {completedCount} / {totalCount} Items
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-400">Preparation Velocity</span>
          <span className="text-emerald-400 font-bold">{percentComplete}% Complete</span>
        </div>
        <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
          <div 
            className="h-full bg-gradient-to-r from-blue-600 via-emerald-500 to-emerald-400 transition-all duration-500 rounded-full"
            style={{ width: `${percentComplete}%` }}
          />
        </div>
      </div>

      {/* Day Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {days.map((day) => (
          <button
            key={day}
            onClick={() => setSelectedDay(day)}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              selectedDay === day
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            {day}
          </button>
        ))}
      </div>

      {/* Task Cards List */}
      <div className="space-y-3">
        {filteredTasks.map((t) => {
          const isDone = completedTasks[t.id];

          return (
            <div
              key={t.id}
              onClick={() => handleToggle(t.id)}
              className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                isDone
                  ? 'bg-slate-950/40 border-slate-800/60 opacity-75'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-start gap-3.5 flex-1">
                <button
                  type="button"
                  className={`mt-0.5 w-5 h-5 rounded-lg flex items-center justify-center transition-all shrink-0 ${
                    isDone
                      ? 'bg-emerald-600 text-white'
                      : 'border border-slate-700 bg-slate-950 hover:border-blue-500'
                  }`}
                >
                  {isDone ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : null}
                </button>

                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                      {t.time_window}
                    </span>
                    <span className="text-xs font-bold text-blue-400">
                      {t.focus_area}
                    </span>
                    <span className="text-[11px] text-slate-500 hidden md:inline">
                      • {t.day.split('(')[0]}
                    </span>
                  </div>

                  <p className={`text-xs leading-relaxed transition-all ${
                    isDone ? 'line-through text-slate-500' : 'text-slate-300'
                  }`}>
                    {t.action}
                  </p>

                  {t.deliverable && (
                    <div className="text-[11px] text-emerald-400/90 font-medium pt-1">
                      Deliverable: {t.deliverable}
                    </div>
                  )}
                </div>
              </div>

              <div className="shrink-0 flex items-center gap-2">
                <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${
                  isDone 
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                    : 'bg-slate-800 text-slate-400'
                }`}>
                  {isDone ? 'Done' : 'Pending'}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
