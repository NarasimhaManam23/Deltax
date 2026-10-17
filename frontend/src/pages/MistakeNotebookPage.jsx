import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  AlertCircle, CheckCircle2, XCircle, BookOpen, RotateCcw, 
  Search, Filter, Clock, Sparkles, ChevronDown, ChevronUp, ArrowRight
} from 'lucide-react';
import { api } from '../api';
import { useLearner } from '../context/LearnerContext';

export default function MistakeNotebookPage() {
  const { learnerId } = useLearner();
  const [mistakes, setMistakes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('All');
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    async function loadMistakes() {
      try {
        const data = await api.getMistakes();
        setMistakes(data.mistakes || []);
      } catch (err) {
        console.warn('Could not load mistakes from backend, checking fallback:', err);
        setMistakes([]);
      } finally {
        setLoading(false);
      }
    }
    loadMistakes();
  }, [learnerId]);

  const subjects = ['All', ...new Set(mistakes.map(m => m.subject).filter(Boolean))];

  const filteredMistakes = mistakes.filter(m => {
    const matchesSearch = !searchQuery || 
      (m.question_text && m.question_text.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (m.topic && m.topic.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesSubject = selectedSubject === 'All' || m.subject === selectedSubject;
    return matchesSearch && matchesSubject;
  });

  const toggleExpand = (id) => {
    setExpandedId(prev => prev === id ? null : id);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-1 text-xs font-semibold uppercase tracking-wider rounded-md bg-red-500/10 text-red-400 border border-red-500/20">
              Personalised Review
            </span>
            <span className="px-2.5 py-1 text-xs font-semibold uppercase tracking-wider rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/20">
              Targeted Weakness Fixing
            </span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Mistake Notebook
          </h1>
          <p className="text-slate-400 mt-1 max-w-3xl text-sm">
            Review every question you answered incorrectly. Understand the traps, study the step-by-step explanations, and re-attempt to solidify your understanding for Round 1 & Round 2.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/round-1"
            className="py-2.5 px-4 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold text-xs flex items-center gap-2 shadow-lg shadow-brand-600/20 transition-all"
          >
            <RotateCcw className="w-4 h-4" />
            Practise MCQs
          </Link>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Search mistakes by keyword or topic..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          {subjects.map(subj => (
            <button
              key={subj}
              onClick={() => setSelectedSubject(subj)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedSubject === subj
                  ? 'bg-brand-500/20 text-brand-300 border border-brand-500/40'
                  : 'bg-slate-800/60 text-slate-400 hover:text-white border border-slate-700/50'
              }`}
            >
              {subj}
            </button>
          ))}
        </div>
      </div>

      {/* Mistake List */}
      {loading ? (
        <div className="py-20 text-center text-slate-500 font-mono text-xs">
          Loading your mistake notebook...
        </div>
      ) : filteredMistakes.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-slate-900/40 border border-slate-800/80 space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto text-emerald-400">
            <CheckCircle2 className="w-7 h-7" />
          </div>
          <div className="max-w-md mx-auto space-y-1">
            <h3 className="text-base font-bold text-white">No Mistakes Recorded</h3>
            <p className="text-xs text-slate-400">
              {mistakes.length === 0 
                ? "You haven't made any mistakes yet or haven't attempted any quizzes. Complete practice questions or mock tests, and any incorrect answers will be logged here automatically."
                : "No mistakes match your search query."}
            </p>
          </div>
          <div className="pt-2">
            <Link
              to="/round-1"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold shadow-md shadow-brand-500/20"
            >
              <span>Take a Screening Practice Test</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-400 px-1">
            <span>Showing {filteredMistakes.length} mistakes needing review</span>
            <span className="font-mono text-amber-400">Repeated practice boosts retention by 70%</span>
          </div>

          <div className="space-y-3">
            {filteredMistakes.map((m, idx) => {
              const isExpanded = expandedId === m.id || expandedId === idx;
              return (
                <div
                  key={m.id || idx}
                  className="rounded-2xl bg-slate-900/80 border border-slate-800 overflow-hidden transition-all hover:border-slate-700"
                >
                  <div
                    onClick={() => toggleExpand(m.id || idx)}
                    className="p-5 cursor-pointer flex items-start justify-between gap-4 select-none"
                  >
                    <div className="space-y-2 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-red-500/15 text-red-400 border border-red-500/30">
                          Incorrect
                        </span>
                        {m.subject && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-brand-500/15 text-brand-300 border border-brand-500/30">
                            {m.subject}
                          </span>
                        )}
                        {m.topic && (
                          <span className="text-[11px] text-slate-400 font-medium">
                            • {m.topic}
                          </span>
                        )}
                        {m.timestamp && (
                          <span className="text-[10px] text-slate-500 font-mono ml-auto">
                            {new Date(m.timestamp).toLocaleDateString()}
                          </span>
                        )}
                      </div>

                      <h3 className="text-sm font-semibold text-white leading-snug">
                        {m.question_text}
                      </h3>

                      <div className="flex flex-wrap items-center gap-4 text-xs pt-1">
                        <div className="flex items-center gap-1.5 text-red-400 font-mono">
                          <XCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>Your answer: <strong className="text-red-300">{m.selected_answer || 'None'}</strong></span>
                        </div>
                        <div className="flex items-center gap-1.5 text-emerald-400 font-mono">
                          <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                          <span>Correct: <strong className="text-emerald-300">{m.correct_answer}</strong></span>
                        </div>
                      </div>
                    </div>

                    <button
                      className="p-1.5 rounded-lg text-slate-500 hover:text-white hover:bg-slate-800 shrink-0 mt-1"
                      title={isExpanded ? 'Collapse' : 'Expand'}
                    >
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>

                  {isExpanded && (
                    <div className="px-5 pb-5 pt-2 border-t border-slate-800/80 bg-slate-950/40 space-y-4">
                      {m.options && Array.isArray(m.options) && (
                        <div className="space-y-1.5">
                          <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 font-mono">Options</span>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {m.options.map((opt, i) => {
                              const isCorrect = opt.startsWith(m.correct_answer) || opt === m.correct_answer;
                              const isSelected = opt.startsWith(m.selected_answer) || opt === m.selected_answer;
                              return (
                                <div
                                  key={i}
                                  className={`p-2.5 rounded-xl border text-xs font-mono ${
                                    isCorrect
                                      ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-300 font-bold'
                                      : isSelected
                                      ? 'bg-red-950/20 border-red-500/40 text-red-300'
                                      : 'bg-slate-900 border-slate-800 text-slate-400'
                                  }`}
                                >
                                  {opt}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {m.explanation && (
                        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
                          <div className="flex items-center gap-1.5 text-brand-400 text-xs font-bold font-mono">
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>Explanation & Concept Trap</span>
                          </div>
                          <p className="text-xs text-slate-300 leading-relaxed">
                            {m.explanation}
                          </p>
                        </div>
                      )}

                      <div className="flex items-center justify-end gap-3 pt-2">
                        <Link
                          to={`/round-1?subject=${encodeURIComponent(m.subject || 'JavaScript')}`}
                          className="px-3 py-1.5 rounded-lg bg-brand-500/20 hover:bg-brand-500/30 text-brand-300 text-xs font-semibold border border-brand-500/40 flex items-center gap-1.5"
                        >
                          <span>Practise {m.subject || 'This Subject'}</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
