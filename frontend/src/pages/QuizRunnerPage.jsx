import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  ChevronLeft,
  ChevronRight,
  Bookmark,
  Flag,
  CheckCircle2,
  AlertTriangle,
  FileCheck2,
  BookOpen,
  ArrowRight
} from 'lucide-react';
import { api } from '../api';
import { useBookmarks } from '../context/BookmarkContext';
import { useLearner } from '../context/LearnerContext';
import TestTimer from '../components/TestTimer';
import MarkdownViewer from '../components/MarkdownViewer';

export default function QuizRunnerPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { toggleBookmark, isBookmarked } = useBookmarks();
  const { refreshDashboard } = useLearner();

  const [quizData, setQuizData] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [flagged, setFlagged] = useState(new Set());
  const [submitting, setSubmitting] = useState(false);
  const [isInstantFeedback, setIsInstantFeedback] = useState(location.state?.isInstantFeedback || false);
  const [startTime] = useState(Date.now());

  // Load Quiz Data
  useEffect(() => {
    async function initQuiz() {
      const state = location.state || {};
      try {
        const data = await api.startQuiz({
          quiz_type: state.quiz_type || 'topic_practice',
          subject: state.subject,
          topic: state.topic,
          mock_id: state.mock_id,
          question_count: state.question_count || 10,
          difficulty: state.difficulty || 'Mixed'
        });
        setQuizData(data);

        // Restore any cached answers
        const cached = localStorage.getItem(`active_quiz_ans_${data.quiz_id}`);
        if (cached) {
          try { setAnswers(JSON.parse(cached)); } catch {}
        }
      } catch (err) {
        console.error('Failed to start quiz:', err);
      }
    }
    initQuiz();
  }, [location.state]);

  // Persist answers
  const selectOption = (qId, option) => {
    const updated = { ...answers, [qId]: option };
    setAnswers(updated);
    if (quizData?.quiz_id) {
      localStorage.setItem(`active_quiz_ans_${quizData.quiz_id}`, JSON.stringify(updated));
    }
  };

  const toggleFlag = (qId) => {
    setFlagged(prev => {
      const next = new Set(prev);
      if (next.has(qId)) next.delete(qId);
      else next.add(qId);
      return next;
    });
  };

  const handleSubmit = async () => {
    if (!quizData) return;
    setSubmitting(true);
    const durationSeconds = Math.max(1, Math.round((Date.now() - startTime) / 1000));

    const answerItems = quizData.questions.map(q => ({
      question_id: q.id,
      selected_option: answers[q.id] || null,
      time_spent_seconds: Math.round(durationSeconds / quizData.questions.length)
    }));

    try {
      const result = await api.submitQuiz({
        quiz_id: quizData.quiz_id,
        quiz_type: quizData.quiz_type,
        subject: quizData.questions[0]?.subject,
        time_taken_seconds: durationSeconds,
        answers: answerItems
      });

      // Clear local timer & answers
      localStorage.removeItem(`deltax_active_timer_${quizData.quiz_id}`);
      localStorage.removeItem(`active_quiz_ans_${quizData.quiz_id}`);
      await refreshDashboard();

      navigate('/quiz/result', { state: { result } });
    } catch (err) {
      console.error('Failed to submit quiz:', err);
      alert('Error submitting test. Please try again.');
      setSubmitting(false);
    }
  };

  if (!quizData) {
    return (
      <div className="py-24 text-center space-y-3">
        <div className="w-10 h-10 border-4 border-brand-500 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-sm font-mono text-slate-400">Assembling question assessment...</p>
      </div>
    );
  }

  const currentQ = quizData.questions[currentIndex];
  const selectedOpt = answers[currentQ?.id];
  const isCurrentFlagged = flagged.has(currentQ?.id);
  const bookmarked = isBookmarked(currentQ?.id);

  return (
    <div className="space-y-6 pb-12">
      {/* Top Test Navigation Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-xl bg-brand-500/20 text-brand-400 border border-brand-500/30 flex items-center justify-center font-mono font-bold text-xs">
            {currentIndex + 1}
          </span>
          <div>
            <h2 className="text-sm font-bold text-white leading-tight">{quizData.title}</h2>
            <span className="text-[11px] text-slate-400 font-mono">
              Question {currentIndex + 1} of {quizData.total_questions}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 self-end sm:self-auto">
          {/* Timer */}
          <TestTimer
            initialMinutes={quizData.duration_minutes || 45}
            quizId={quizData.quiz_id}
            onExpire={handleSubmit}
          />

          {/* Submit Test Button */}
          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md shadow-emerald-600/20 transition-all disabled:opacity-50"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{submitting ? 'Scoring...' : 'Submit Test'}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Question Card (Left 3 cols) */}
        <div className="lg:col-span-3 p-6 sm:p-8 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl flex flex-col justify-between space-y-6">
          <div className="space-y-6">
            {/* Meta bar */}
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-500/15 text-blue-400 border border-blue-500/30">
                  {currentQ.subject}
                </span>
                <span className="text-xs text-slate-400 font-mono">• {currentQ.topic}</span>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => toggleFlag(currentQ.id)}
                  className={`p-2 rounded-xl border transition-all ${
                    isCurrentFlagged
                      ? 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                      : 'text-slate-400 hover:text-white border-slate-800 hover:bg-slate-800'
                  }`}
                  title="Flag question for review"
                >
                  <Flag className="w-4 h-4" />
                </button>

                <button
                  onClick={() => toggleBookmark('question', currentQ.id, `[${currentQ.subject}] ${currentQ.topic}`)}
                  className={`p-2 rounded-xl border transition-all ${
                    bookmarked
                      ? 'bg-brand-500/20 text-brand-400 border-brand-500/40'
                      : 'text-slate-400 hover:text-white border-slate-800 hover:bg-slate-800'
                  }`}
                  title="Bookmark question"
                >
                  <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-current' : ''}`} />
                </button>
              </div>
            </div>

            {/* Question Text & Code */}
            <div className="text-base text-slate-100 font-medium leading-relaxed">
              <MarkdownViewer content={currentQ.question_text || currentQ.question} />
            </div>

            {/* Options A, B, C, D */}
            <div className="space-y-3 pt-2">
              {['A', 'B', 'C', 'D'].map((letter) => {
                const optText = currentQ[`option_${letter.toLowerCase()}`] || currentQ.options?.[letter];
                const isSelected = selectedOpt === letter;

                let optStyle = 'border-slate-800 bg-slate-900/60 hover:bg-slate-800/80 text-slate-300';
                if (isSelected) {
                  optStyle = 'border-brand-500 bg-brand-500/20 text-white shadow-md shadow-brand-500/10 font-semibold';
                }

                return (
                  <button
                    key={letter}
                    onClick={() => selectOption(currentQ.id, letter)}
                    className={`w-full p-4 rounded-xl border text-left flex items-start gap-3.5 transition-all ${optStyle}`}
                  >
                    <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-mono font-bold shrink-0 mt-0.5 ${
                      isSelected ? 'bg-brand-500 text-white' : 'bg-slate-800 text-slate-400 border border-slate-700/80'
                    }`}>
                      {letter}
                    </span>
                    <span className="text-sm leading-relaxed">{optText}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-6 border-t border-slate-800/80">
            <button
              onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
              disabled={currentIndex === 0}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-800 text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800 disabled:opacity-30 disabled:pointer-events-none"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            <span className="text-xs font-mono text-slate-500">
              {Object.keys(answers).length} of {quizData.total_questions} Answered
            </span>

            {currentIndex < quizData.total_questions - 1 ? (
              <button
                onClick={() => setCurrentIndex(prev => Math.min(quizData.total_questions - 1, prev + 1))}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold shadow-md shadow-brand-500/20 transition-all"
              >
                <span>Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg shadow-emerald-600/30 transition-all"
              >
                <span>Submit Final</span>
                <CheckCircle2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Question Palette Sidebar (Right 1 col) */}
        <div className="lg:col-span-1 p-5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4 h-fit">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">Question Palette</h3>
            <span className="text-xs font-mono text-brand-400 font-bold">
              {Math.round((Object.keys(answers).length / quizData.total_questions) * 100)}%
            </span>
          </div>

          {/* Palette Grid */}
          <div className="grid grid-cols-5 gap-2 max-h-80 overflow-y-auto pr-1">
            {quizData.questions.map((q, idx) => {
              const isAns = answers[q.id] !== undefined;
              const isFlag = flagged.has(q.id);
              const isCurr = currentIndex === idx;

              let btnStyle = 'bg-slate-800/80 text-slate-400 border-slate-700/60';
              if (isCurr) {
                btnStyle = 'ring-2 ring-brand-400 font-bold border-brand-400 text-white';
              }
              if (isAns) {
                btnStyle += ' bg-emerald-500/20 text-emerald-400 border-emerald-500/40';
              } else if (isFlag) {
                btnStyle += ' bg-amber-500/20 text-amber-400 border-amber-500/40';
              }

              return (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-9 rounded-lg border text-xs font-mono font-semibold flex items-center justify-center transition-all ${btnStyle}`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>

          {/* Legend */}
          <div className="pt-3 border-t border-slate-800/80 space-y-1.5 text-[11px] text-slate-400">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded bg-emerald-500/30 border border-emerald-500/50" />
              <span>Answered</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded bg-amber-500/30 border border-amber-500/50" />
              <span>Flagged for Review</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded bg-slate-800 border border-slate-700" />
              <span>Unattempted</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
