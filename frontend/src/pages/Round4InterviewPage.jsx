import React, { useState } from 'react';
import { 
  Users, CheckCircle2, Shield, HelpCircle, ChevronDown, ChevronUp,
  Award, Sparkles, Terminal, FileCode, Search, Filter, BookOpen, Layers,
  AlertTriangle, Clock, MessageSquare, ArrowRight, Check
} from 'lucide-react';
import interviewQuestionsData from '../data/interview_questions.json';
import { updateInterviewProgress } from '../api';
import { useLearner } from '../context/LearnerContext';
import MarkdownViewer from '../components/MarkdownViewer';

export default function Round4InterviewPage() {
  const { refreshDashboard } = useLearner();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [revealed, setRevealed] = useState({});
  const [questionProgress, setQuestionProgress] = useState({});

  const categories = ['All', ...new Set(interviewQuestionsData.map(q => q.category).filter(Boolean))];

  const filteredQuestions = interviewQuestionsData.filter(q => {
    const matchesCat = selectedCategory === 'All' || q.category === selectedCategory;
    const matchesSearch = !searchQuery || 
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (q.sample_answer && q.sample_answer.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (q.category && q.category.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  const handleStatusUpdate = async (questionId, newStatus) => {
    setQuestionProgress(prev => ({ ...prev, [questionId]: newStatus }));
    try {
      await updateInterviewProgress(questionId, newStatus);
      refreshDashboard();
    } catch (e) {
      console.warn("Failed to persist interview question state:", e);
    }
  };

  const toggleSection = (qId, section) => {
    setRevealed(prev => ({
      ...prev,
      [qId]: {
        ...prev[qId],
        [section]: !prev[qId]?.[section]
      }
    }));
  };

  return (
    <div className="space-y-8 animate-fadeIn pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-1 text-xs font-semibold uppercase tracking-wider rounded-md bg-purple-500/10 text-purple-400 border border-purple-500/20">
              Module C: Technical Interview
            </span>
            <span className="px-2.5 py-1 text-xs font-semibold uppercase tracking-wider rounded-md bg-blue-500/10 text-blue-400 border border-blue-500/20">
              Careers JD Specification • 45–60 Mins
            </span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Technical & JavaScript Interview Deep Dive
          </h1>
          <p className="text-slate-400 mt-1 max-w-3xl text-sm leading-relaxed">
            Master conversational defense of JavaScript engine internals, React 18 Fiber reconciliation, Core Web Vitals optimization, live search architecture, and engineering trade-offs.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Search interview questions by topic or keyword..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          {categories.map(c => (
            <button
              key={c}
              onClick={() => setSelectedCategory(c)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === c
                  ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                  : 'bg-slate-800/60 text-slate-400 hover:text-white border border-slate-700/50'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Question Cards List */}
      <div className="space-y-6">
        {filteredQuestions.map((q, idx) => {
          const isRevealedAnswer = revealed[q.id]?.answer;
          const isRevealedFollowup = revealed[q.id]?.followup;
          const status = questionProgress[q.id] || 'NOT_STARTED';

          return (
            <div
              key={q.id || idx}
              className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-5"
            >
              {/* Question Header */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-slate-800 pb-4">
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase font-mono bg-purple-500/15 text-purple-300 border border-purple-500/30">
                      {q.category}
                    </span>
                    <span className="text-[11px] text-slate-500 font-mono">
                      Target: FED-2026 Technical Round
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
                    {q.question}
                  </h3>

                  {q.intent && (
                    <p className="text-xs text-slate-400 italic">
                      Interviewer Intent: {q.intent}
                    </p>
                  )}
                </div>

                {/* Status Toggle */}
                <div className="flex items-center gap-1.5 shrink-0 self-start sm:self-auto">
                  {['NOT_STARTED', 'PRACTICING', 'CONFIDENT'].map((s) => (
                    <button
                      key={s}
                      onClick={() => handleStatusUpdate(q.id, s)}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase transition-all ${
                        status === s
                          ? s === 'CONFIDENT'
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                            : s === 'PRACTICING'
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                            : 'bg-slate-800 text-slate-300 border border-slate-700'
                          : 'text-slate-500 hover:text-slate-300 bg-slate-950'
                      }`}
                    >
                      {s === 'CONFIDENT' ? '✓ Mastered' : s === 'PRACTICING' ? '⚡ In Progress' : 'To Learn'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Framework Blueprint */}
              {q.framework && (
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-purple-400 font-mono">
                    Response Blueprint / Structure
                  </span>
                  <p className="text-xs text-slate-300 font-mono">
                    {q.framework}
                  </p>
                </div>
              )}

              {/* Model Answer Toggle */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => toggleSection(q.id, 'answer')}
                    className="flex items-center gap-2 text-xs font-bold text-brand-400 hover:text-brand-300"
                  >
                    <span>{isRevealedAnswer ? 'Hide Model Answer' : 'Reveal High-Scoring Model Answer'}</span>
                    {isRevealedAnswer ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>

                  {q.trap && (
                    <span className="text-[11px] text-amber-400 flex items-center gap-1 font-mono">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      <span>Watch out for candidate traps</span>
                    </span>
                  )}
                </div>

                {isRevealedAnswer && (
                  <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-4 animate-in fade-in duration-150">
                    <div className="space-y-2">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-400 font-mono">
                        Model Answer (Architectural Rigor)
                      </span>
                      <div className="text-xs text-slate-300 leading-relaxed whitespace-pre-wrap">
                        {q.sample_answer}
                      </div>
                    </div>

                    {q.body_markdown && (
                      <div className="pt-2 border-t border-slate-800/80">
                        <MarkdownViewer content={q.body_markdown} />
                      </div>
                    )}

                    {q.bad_answer && (
                      <div className="p-3 rounded-lg bg-red-950/20 border border-red-500/30 text-xs text-red-300 space-y-1">
                        <span className="font-bold uppercase text-[10px] tracking-wider block">Weak / Rejection Response</span>
                        <p>{q.bad_answer}</p>
                      </div>
                    )}

                    {q.trap && (
                      <div className="p-3 rounded-lg bg-amber-950/20 border border-amber-500/30 text-xs text-amber-300 space-y-1">
                        <span className="font-bold uppercase text-[10px] tracking-wider block">Candidate Pitfall / Trap</span>
                        <p>{q.trap}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Follow-up Questions Toggle */}
              {q.follow_up && (
                <div className="pt-2 border-t border-slate-800">
                  <button
                    onClick={() => toggleSection(q.id, 'followup')}
                    className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white"
                  >
                    <span>{isRevealedFollowup ? 'Hide Follow-Up Question' : 'View Expected Follow-Up Question'}</span>
                    {isRevealedFollowup ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>

                  {isRevealedFollowup && (
                    <div className="mt-2.5 p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-purple-300 font-mono">
                      <strong className="text-white">Interviewer Follow-Up: </strong>
                      {q.follow_up}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
