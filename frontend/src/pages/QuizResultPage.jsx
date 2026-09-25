import React, { useState, useEffect } from 'react';
import { useLocation, useParams, Link, useNavigate } from 'react-router-dom';
import {
  CheckCircle2,
  XCircle,
  HelpCircle,
  Clock,
  RotateCcw,
  ArrowRight,
  Filter,
  Bookmark,
  Share2,
  Award
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { api } from '../api';
import { useBookmarks } from '../context/BookmarkContext';
import MarkdownViewer from '../components/MarkdownViewer';

export default function QuizResultPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { attemptId } = useParams();
  const { toggleBookmark, isBookmarked } = useBookmarks();
  const [filterMode, setFilterMode] = useState('all'); // all, incorrect, correct
  const [result, setResult] = useState(location.state?.result || null);
  const [loading, setLoading] = useState(!location.state?.result && !!attemptId);

  useEffect(() => {
    if (!result && attemptId) {
      setLoading(true);
      api.getQuizResult(attemptId)
        .then(data => {
          if (data) setResult(data);
        })
        .catch(err => {
          console.error('Failed to fetch result by ID:', err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [attemptId, result]);

  useEffect(() => {
    if (result && result.accuracy >= 70) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  }, [result]);

  if (loading) {
    return (
      <div className="py-24 text-center space-y-3">
        <div className="w-10 h-10 border-4 border-brand-500 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-sm font-mono text-slate-400">Loading assessment report...</p>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="py-20 text-center space-y-4">
        <p className="text-slate-400">No recent test result found.</p>
        <Link to="/round-1" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-600 text-white text-xs font-semibold">
          <span>Go to Question Bank</span>
        </Link>
      </div>
    );
  }

  const mins = Math.floor(result.time_taken_seconds / 60);
  const secs = result.time_taken_seconds % 60;
  const incorrectCount = result.total_questions - result.score;

  const filteredQuestions = result.questions.filter(q => {
    if (filterMode === 'incorrect') return !q.is_correct;
    if (filterMode === 'correct') return q.is_correct;
    return true;
  });

  return (
    <div className="space-y-8 pb-12">
      {/* Result Hero Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="text-xs uppercase font-bold tracking-wider text-slate-400 font-mono">Test Complete</span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              {result.title}
            </h1>
            <p className="text-xs text-slate-400">
              Completed on {new Date(result.completed_at).toLocaleString()}
            </p>
          </div>

          {/* Big Score Box */}
          <div className="flex items-center gap-4 bg-slate-950/80 border border-slate-800 p-4 sm:p-5 rounded-2xl shadow-inner">
            <div className="text-center">
              <span className="block text-3xl sm:text-4xl font-black font-mono text-white">
                {result.score} <span className="text-slate-600 text-xl font-normal">/ {result.total_questions}</span>
              </span>
              <span className="text-[11px] font-semibold uppercase text-slate-400 tracking-wider">Final Score</span>
            </div>
            <div className="h-10 w-px bg-slate-800" />
            <div className="text-center">
              <span className={`block text-3xl sm:text-4xl font-black font-mono ${
                result.accuracy >= 75 ? 'text-emerald-400' : result.accuracy >= 55 ? 'text-amber-400' : 'text-red-400'
              }`}>
                {result.accuracy}%
              </span>
              <span className="text-[11px] font-semibold uppercase text-slate-400 tracking-wider">Accuracy</span>
            </div>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 mt-6 border-t border-slate-800">
          <div className="p-3 rounded-xl bg-slate-800/40 border border-slate-700/60 flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <div>
              <span className="block text-xs font-bold text-white font-mono">{result.score}</span>
              <span className="text-[10px] text-slate-400">Correct Answers</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-800/40 border border-slate-700/60 flex items-center gap-3">
            <XCircle className="w-5 h-5 text-red-400 shrink-0" />
            <div>
              <span className="block text-xs font-bold text-white font-mono">{incorrectCount}</span>
              <span className="text-[10px] text-slate-400">Incorrect / Missed</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-800/40 border border-slate-700/60 flex items-center gap-3">
            <Clock className="w-5 h-5 text-blue-400 shrink-0" />
            <div>
              <span className="block text-xs font-bold text-white font-mono">{mins}m {secs}s</span>
              <span className="text-[10px] text-slate-400">Time Taken</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-800/40 border border-slate-700/60 flex items-center gap-3">
            <Award className="w-5 h-5 text-amber-400 shrink-0" />
            <div>
              <span className="block text-xs font-bold text-white font-mono">
                {result.accuracy >= 75 ? 'Strong' : result.accuracy >= 55 ? 'Borderline' : 'Needs Polish'}
              </span>
              <span className="text-[10px] text-slate-400">Evaluation Tier</span>
            </div>
          </div>
        </div>
      </div>

      {/* Topic Breakdown Bar */}
      {result.topic_breakdown && Object.keys(result.topic_breakdown).length > 0 && (
        <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-white">Subject & Topic Breakdown</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {Object.entries(result.topic_breakdown).map(([top, stat]) => (
              <div key={top} className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/50 space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300 font-medium truncate">{top}</span>
                  <span className={`font-mono font-bold ${stat.accuracy >= 75 ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {stat.accuracy}%
                  </span>
                </div>
                <div className="w-full bg-slate-700/60 rounded-full h-1.5 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${stat.accuracy >= 75 ? 'bg-emerald-400' : 'bg-amber-400'}`}
                    style={{ width: `${stat.accuracy}%` }}
                  />
                </div>
                <span className="text-[10px] text-slate-400 block font-mono">
                  {stat.correct} / {stat.total} correct
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Detailed Question Review List */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h3 className="text-lg font-bold text-white">Questions Review</h3>

          <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-xl border border-slate-800 self-start sm:self-auto">
            <button
              onClick={() => setFilterMode('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                filterMode === 'all' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              All ({result.questions.length})
            </button>
            <button
              onClick={() => setFilterMode('incorrect')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                filterMode === 'incorrect' ? 'bg-red-500/20 text-red-400' : 'text-slate-400 hover:text-white'
              }`}
            >
              Incorrect Only ({incorrectCount})
            </button>
            <button
              onClick={() => setFilterMode('correct')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                filterMode === 'correct' ? 'bg-emerald-500/20 text-emerald-400' : 'text-slate-400 hover:text-white'
              }`}
            >
              Correct ({result.score})
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {filteredQuestions.map((q, idx) => {
            const bookmarked = isBookmarked(q.question_id);
            return (
              <div
                key={q.question_id || idx}
                className={`p-6 rounded-2xl border space-y-4 transition-all ${
                  q.is_correct
                    ? 'bg-slate-900/60 border-slate-800'
                    : 'bg-red-950/10 border-red-500/30'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className={`w-6 h-6 rounded-md flex items-center justify-center text-xs font-mono font-bold ${
                      q.is_correct ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'
                    }`}>
                      {idx + 1}
                    </span>
                    <span className="text-xs font-mono text-slate-400">{q.topic}</span>
                  </div>

                  <button
                    onClick={() => toggleBookmark('question', q.question_id, q.topic)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
                    title="Bookmark this question"
                  >
                    <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-current text-brand-400' : ''}`} />
                  </button>
                </div>

                <div className="text-sm font-medium text-white">
                  <MarkdownViewer content={q.question_text} />
                </div>

                {/* Selected vs Correct */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className={`p-3 rounded-xl border ${
                    q.is_correct ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' : 'bg-red-500/10 border-red-500/30 text-red-300'
                  }`}>
                    <span className="font-semibold block uppercase text-[10px] tracking-wider mb-1">Your Answer</span>
                    <span>{q.selected_option ? `Option ${q.selected_option}: ${q[`option_${q.selected_option.toLowerCase()}`] || ''}` : 'Not Attempted'}</span>
                  </div>

                  <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300">
                    <span className="font-semibold block uppercase text-[10px] tracking-wider mb-1">Correct Answer</span>
                    <span>Option {q.correct_answer}: {q[`option_${q.correct_answer.toLowerCase()}`]}</span>
                  </div>
                </div>

                {/* Explanation */}
                {q.explanation && (
                  <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 space-y-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-brand-400 block font-mono">
                      Explanation
                    </span>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {q.explanation}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Action Footer */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-800">
        <Link
          to="/round-1"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white font-semibold text-xs transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Practice Another Topic</span>
        </Link>

        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold text-xs shadow-lg shadow-brand-500/20 transition-all"
        >
          <span>Return to Dashboard</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
