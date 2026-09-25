import React, { useState, useEffect } from 'react';
import { 
  Bot, Mic, Sparkles, CheckCircle2, Circle, Clock, MessageSquare, 
  HelpCircle, ChevronDown, ChevronUp, Play, Award, Shield, FileText,
  Volume2, ArrowRight, Star, RefreshCw, Layers
} from 'lucide-react';
import { useLearner } from '../context/LearnerContext';
import { updateInterviewProgress, getInterviewQuestions } from '../api';
import interviewQuestionsData from '../data/interview_questions.json';
import projectsData from '../data/projects_overview.json';
import MarkdownViewer from '../components/MarkdownViewer';

export default function Round2AIPage() {
  const { learnerId, refreshDashboard } = useLearner();
  const [activeTab, setActiveTab] = useState('projects'); // 'projects', 'questions', 'simulator'
  const [selectedProject, setSelectedProject] = useState('ADAM-1 Enhanced');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [expandedQuestion, setExpandedQuestion] = useState(null);
  const [revealedSections, setRevealedSections] = useState({}); // { [qId]: { framework: bool, answer: bool, followup: bool } }
  const [questionProgress, setQuestionProgress] = useState({}); // { [qId]: 'NOT_STARTED' | 'PRACTICING' | 'CONFIDENT' }
  const [savingId, setSavingId] = useState(null);

  // Simulator State
  const [simulatorActive, setSimulatorActive] = useState(false);
  const [simQuestionIndex, setSimQuestionIndex] = useState(0);
  const [simAnswers, setSimAnswers] = useState({});
  const [simComplete, setSimComplete] = useState(false);
  const [simTimer, setSimTimer] = useState(15 * 60);

  // Round 2 Questions filtered from dataset
  const r2Questions = interviewQuestionsData.filter(q => q.round === 2 || !q.round);
  const categories = ['All', ...new Set(r2Questions.map(q => q.category).filter(Boolean))];

  const filteredQuestions = selectedCategory === 'All'
    ? r2Questions
    : r2Questions.filter(q => q.category === selectedCategory);

  const projectNames = Object.keys(projectsData);

  // Handle Mark as Practiced / Confident
  const handleStatusUpdate = async (questionId, newStatus) => {
    setSavingId(questionId);
    setQuestionProgress(prev => ({ ...prev, [questionId]: newStatus }));
    try {
      await updateInterviewProgress(questionId, newStatus);
      refreshDashboard();
    } catch (e) {
      console.warn("Failed to persist interview status to server:", e);
    } finally {
      setSavingId(null);
    }
  };

  const toggleReveal = (qId, type) => {
    setRevealedSections(prev => ({
      ...prev,
      [qId]: {
        ...prev[qId],
        [type]: !prev[qId]?.[type]
      }
    }));
  };

  // Simulator Timer
  useEffect(() => {
    let interval = null;
    if (simulatorActive && !simComplete && simTimer > 0) {
      interval = setInterval(() => {
        setSimTimer(t => {
          if (t <= 1) {
            setSimComplete(true);
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [simulatorActive, simComplete, simTimer]);

  const simQuestionsPool = r2Questions.slice(0, 8); // 8 questions for 15 mins

  const startSimulator = () => {
    setSimulatorActive(true);
    setSimComplete(false);
    setSimQuestionIndex(0);
    setSimAnswers({});
    setSimTimer(15 * 60);
  };

  const handleSimNext = (answerText) => {
    setSimAnswers(prev => ({
      ...prev,
      [simQuestionsPool[simQuestionIndex].id]: answerText || 'Skipped'
    }));
    if (simQuestionIndex + 1 < simQuestionsPool.length) {
      setSimQuestionIndex(i => i + 1);
    } else {
      setSimComplete(true);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-1 text-xs font-semibold uppercase tracking-wider rounded-md bg-purple-500/10 text-purple-400 border border-purple-500/20">
              Round 2 Screening
            </span>
            <span className="px-2.5 py-1 text-xs font-semibold uppercase tracking-wider rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              AI Voice & Telephonic (15–20 Mins)
            </span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Round 2 — AI Telephonic Interview Prep
          </h1>
          <p className="text-slate-400 mt-1 max-w-3xl">
            Prepare for the 12:30 PM AI voice screening. Master project architectural elevator pitches, structured STAR behavioral responses, and crisp technical articulation.
          </p>
        </div>
      </div>

      {/* Main Tabs */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 bg-slate-900/80 border border-slate-800 rounded-xl">
        <button
          onClick={() => setActiveTab('projects')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all ${
            activeTab === 'projects'
              ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Layers className="w-4 h-4" />
          Project Deep-Dives (4 Master Cards)
        </button>

        <button
          onClick={() => setActiveTab('questions')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all ${
            activeTab === 'questions'
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <HelpCircle className="w-4 h-4" />
          Question Mode ({filteredQuestions.length} Questions)
        </button>

        <button
          onClick={() => setActiveTab('simulator')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all ${
            activeTab === 'simulator'
              ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Bot className="w-4 h-4" />
          AI Interview Simulator (15–20 Mins)
        </button>
      </div>

      {/* TAB 1: PROJECT DEEP DIVES */}
      {activeTab === 'projects' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {projectNames.map((name) => (
              <button
                key={name}
                onClick={() => setSelectedProject(name)}
                className={`p-4 rounded-xl text-left border transition-all ${
                  selectedProject === name
                    ? 'bg-purple-950/40 border-purple-500/50 shadow-lg shadow-purple-500/10 text-white'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
                }`}
              >
                <div className="text-xs uppercase font-semibold text-purple-400">Project Card</div>
                <div className="text-sm font-bold mt-1 truncate">{name}</div>
              </button>
            ))}
          </div>

          {/* Project Content */}
          <div className="p-6 md:p-8 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h2 className="text-2xl font-extrabold text-white">
                {selectedProject}
              </h2>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-400 border border-purple-500/20">
                Pitches • Architecture • 20 Interview Qs
              </span>
            </div>

            <MarkdownViewer content={projectsData[selectedProject]} />
          </div>
        </div>
      )}

      {/* TAB 2: QUESTION PRACTICE MODE */}
      {activeTab === 'questions' && (
        <div className="space-y-6">
          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                    : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Question List */}
          <div className="space-y-4">
            {filteredQuestions.map((q, idx) => {
              const qState = questionProgress[q.id] || 'NOT_STARTED';
              const revealed = revealedSections[q.id] || {};

              return (
                <div
                  key={q.id}
                  className="bg-slate-900/60 border border-slate-800 hover:border-slate-700 rounded-2xl p-6 transition-all space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-800 text-slate-300 border border-slate-700">
                          #{idx + 1}
                        </span>
                        <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-purple-500/10 text-purple-400 border border-purple-500/20">
                          {q.category || 'Round 2'}
                        </span>
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-white">
                        {q.question}
                      </h3>
                      {q.intent && (
                        <p className="text-xs text-slate-400 italic">
                          Intent: {q.intent}
                        </p>
                      )}
                    </div>

                    {/* Progress State Buttons */}
                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        onClick={() => handleStatusUpdate(q.id, 'PRACTICING')}
                        className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                          qState === 'PRACTICING'
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                            : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                        }`}
                      >
                        Practicing
                      </button>
                      <button
                        onClick={() => handleStatusUpdate(q.id, 'CONFIDENT')}
                        className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
                          qState === 'CONFIDENT'
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                            : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                        }`}
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Confident
                      </button>
                    </div>
                  </div>

                  {/* Accordion Actions */}
                  <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-800/80">
                    {q.framework && (
                      <button
                        onClick={() => toggleReveal(q.id, 'framework')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                          revealed.framework
                            ? 'bg-blue-600 text-white'
                            : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                        }`}
                      >
                        {revealed.framework ? 'Hide Framework' : 'Show Answer Framework'}
                      </button>
                    )}

                    {q.sample_answer && (
                      <button
                        onClick={() => toggleReveal(q.id, 'answer')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                          revealed.answer
                            ? 'bg-emerald-600 text-white'
                            : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                        }`}
                      >
                        {revealed.answer ? 'Hide Sample Answer' : 'Show Sample Answer'}
                      </button>
                    )}

                    {q.follow_up && (
                      <button
                        onClick={() => toggleReveal(q.id, 'followup')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                          revealed.followup
                            ? 'bg-purple-600 text-white'
                            : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                        }`}
                      >
                        {revealed.followup ? 'Hide Follow-ups' : 'Show Follow-ups'}
                      </button>
                    )}
                  </div>

                  {/* Revealed Content Sections */}
                  {revealed.framework && q.framework && (
                    <div className="p-4 rounded-xl bg-blue-950/20 border border-blue-500/20 text-xs text-blue-200 space-y-1">
                      <div className="font-bold text-blue-300">Answer Framework:</div>
                      <div>{q.framework}</div>
                    </div>
                  )}

                  {revealed.answer && q.sample_answer && (
                    <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/20 text-xs text-slate-300 space-y-2">
                      <div className="font-bold text-emerald-300">Sample High-Impact Answer:</div>
                      <div className="leading-relaxed whitespace-pre-line">{q.sample_answer}</div>
                      {q.bad_answer && (
                        <div className="mt-2 pt-2 border-t border-emerald-900/40 text-rose-300/90">
                          <span className="font-bold text-rose-400">What to Avoid (Weak Answer): </span>
                          {q.bad_answer}
                        </div>
                      )}
                    </div>
                  )}

                  {revealed.followup && q.follow_up && (
                    <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-500/20 text-xs text-purple-200 space-y-1">
                      <div className="font-bold text-purple-300">Likely Follow-up Probe:</div>
                      <div>{q.follow_up}</div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 3: AI INTERVIEW SIMULATOR */}
      {activeTab === 'simulator' && (
        <div className="p-6 md:p-8 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-6">
          {!simulatorActive ? (
            <div className="max-w-2xl mx-auto text-center space-y-6 py-8">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto text-emerald-400 shadow-xl shadow-emerald-500/10">
                <Bot className="w-8 h-8" />
              </div>
              <div>
                <h2 className="text-2xl font-extrabold text-white">
                  Deterministic AI Screening Simulator
                </h2>
                <p className="text-slate-400 text-sm mt-2 leading-relaxed">
                  Simulate the exact 15-minute telephonic AI screening format. You will be asked 8 questions one by one. Practice speaking aloud or typing your notes.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-3 p-4 rounded-xl bg-slate-950/40 border border-slate-800 text-center">
                <div>
                  <div className="text-xs text-slate-400">Total Duration</div>
                  <div className="text-base font-bold text-white mt-0.5">15 Minutes</div>
                </div>
                <div>
                  <div className="text-xs text-slate-400">Questions</div>
                  <div className="text-base font-bold text-white mt-0.5">8 Questions</div>
                </div>
                <div>
                  <div className="text-xs text-slate-400">Evaluation</div>
                  <div className="text-base font-bold text-emerald-400 mt-0.5">Self-Rating & Review</div>
                </div>
              </div>

              <button
                onClick={startSimulator}
                className="py-3 px-8 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm inline-flex items-center gap-2 shadow-lg shadow-emerald-600/30 transition-all"
              >
                <Play className="w-4 h-4 fill-white" />
                Start AI Simulation
              </button>
            </div>
          ) : !simComplete ? (
            <div className="space-y-6 max-w-3xl mx-auto">
              {/* Simulator Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/20">
                    Question {simQuestionIndex + 1} of {simQuestionsPool.length}
                  </span>
                  <span className="text-xs text-slate-400">
                    {simQuestionsPool[simQuestionIndex].category}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800 font-mono text-xs font-bold text-emerald-400">
                  <Clock className="w-3.5 h-3.5" />
                  {Math.floor(simTimer / 60)}:{(simTimer % 60).toString().padStart(2, '0')}
                </div>
              </div>

              {/* Question Box */}
              <div className="p-6 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-4">
                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
                  <Volume2 className="w-4 h-4 animate-pulse" />
                  AI Interviewer:
                </div>
                <h3 className="text-xl font-bold text-white leading-snug">
                  "{simQuestionsPool[simQuestionIndex].question}"
                </h3>
                {simQuestionsPool[simQuestionIndex].intent && (
                  <p className="text-xs text-slate-400 italic">
                    Prompt intent: {simQuestionsPool[simQuestionIndex].intent}
                  </p>
                )}
              </div>

              {/* Text Answer / Speaking Notes */}
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Your Answer / Speaking Notes (Optional):
                </label>
                <textarea
                  id="sim-answer-input"
                  rows={5}
                  placeholder="Practice speaking out loud, or summarize your answer points here..."
                  className="w-full p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-200 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 resize-none"
                />
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                <button
                  onClick={() => handleSimNext('Skipped')}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800"
                >
                  Skip Question
                </button>
                <button
                  onClick={() => {
                    const el = document.getElementById('sim-answer-input');
                    handleSimNext(el ? el.value : '');
                    if (el) el.value = '';
                  }}
                  className="py-2.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center gap-2 shadow-lg shadow-emerald-600/20"
                >
                  {simQuestionIndex + 1 === simQuestionsPool.length ? 'Finish Interview' : 'Submit & Next Question'}
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ) : (
            /* Simulation Complete Summary */
            <div className="space-y-6 max-w-2xl mx-auto text-center py-6">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto text-emerald-400">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <h2 className="text-2xl font-extrabold text-white">
                  Simulation Finished!
                </h2>
                <p className="text-slate-400 text-sm mt-1">
                  You completed the 15-minute Round 2 AI Telephonic Screening simulation.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-left">
                <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-800">
                  <div className="text-xs text-slate-400">Total Questions</div>
                  <div className="text-xl font-bold text-white mt-1">{simQuestionsPool.length}</div>
                </div>
                <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-800">
                  <div className="text-xs text-slate-400">Time Taken</div>
                  <div className="text-xl font-bold text-emerald-400 mt-1">
                    {Math.floor((15 * 60 - simTimer) / 60)}m {(15 * 60 - simTimer) % 60}s
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-blue-950/20 border border-blue-500/20 text-xs text-blue-200 text-left space-y-1">
                <span className="font-bold text-blue-300">Self-Evaluation Checklist:</span>
                <ul className="list-disc list-inside space-y-1 text-slate-300 mt-1">
                  <li>Did you answer the question directly in the first 10 seconds?</li>
                  <li>Did you avoid filler words ("um", "uh", "like") by using deliberate pauses?</li>
                  <li>Did you ground project answers in specific technical metrics (e.g. sub-800ms latency, HNSW index)?</li>
                </ul>
              </div>

              <button
                onClick={() => setSimulatorActive(false)}
                className="py-2.5 px-6 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs transition-all"
              >
                Back to Preparation Hub
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
