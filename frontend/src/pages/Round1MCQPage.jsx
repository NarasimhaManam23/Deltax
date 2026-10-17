import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import {
  HelpCircle,
  Play,
  BookOpen,
  FileCheck2,
  Target,
  Sparkles,
  RotateCcw,
  CheckCircle2,
  Clock,
  Filter,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  Search,
  Check
} from 'lucide-react';
import { api } from '../api';
import mcqsData from '../data/mcqs.json';

export default function Round1MCQPage() {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [questionCount, setQuestionCount] = useState(20);
  const [difficulty, setDifficulty] = useState('Mixed');
  const [selectedEvidence, setSelectedEvidence] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isInstantFeedback, setIsInstantFeedback] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [expandedQuestionId, setExpandedQuestionId] = useState(null);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const subjectMeta = {
    JavaScript: {
      desc: 'var/let/const, hoisting, closures, this/call/apply/bind, promises, async/await, event loop microtasks, prototypes, output prediction.',
      color: 'from-amber-500/20 to-yellow-500/20',
      border: 'border-amber-500/30',
      studySlug: 'study_notes_javascript',
      tag: 'Core Focus'
    },
    'DOM Concepts': {
      desc: 'DOM tree & node types, querySelector, event bubbling & capturing, event delegation, preventDefault() vs stopPropagation(), form inputs.',
      color: 'from-blue-500/20 to-indigo-500/20',
      border: 'border-blue-500/30',
      studySlug: 'study_notes_dom',
      tag: 'Core Focus'
    },
    'Web Standards': {
      desc: 'Semantic HTML, CSS specificity, Flexbox/Grid, Box model, HTTP/HTTPS, REST & JSON, Cookies/Storage, Accessibility & ARIA.',
      color: 'from-emerald-500/20 to-teal-500/20',
      border: 'border-emerald-500/30',
      studySlug: 'study_notes_web_standards',
      tag: 'Core Focus'
    },
    'Analytical Problem-Solving': {
      desc: 'Number sequences, pattern recognition, code tracing, error identification, verbal reasoning, basic algorithmic complexity.',
      color: 'from-purple-500/20 to-violet-500/20',
      border: 'border-purple-500/30',
      studySlug: 'study_notes_analytical',
      tag: 'Exploratory / Screening'
    }
  };

  useEffect(() => {
    async function load() {
      try {
        const data = await api.getTopics();
        setTopics(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  useEffect(() => {
    const subj = searchParams.get('subject');
    if (subj && subjectMeta[subj]) {
      setSelectedSubject(subj);
    }
  }, [searchParams]);

  const openPractice = (subject = null, topic = null) => {
    setSelectedSubject(subject);
    setSelectedTopic(topic);
    setModalOpen(true);
  };

  const startQuiz = (type = 'topic_practice') => {
    setModalOpen(false);
    navigate(`/quiz`, {
      state: {
        quiz_type: type,
        subject: selectedSubject,
        topic: selectedTopic,
        question_count: questionCount,
        difficulty: difficulty,
        isInstantFeedback: isInstantFeedback
      }
    });
  };

  // Filtered Questions for Preview
  const filteredQuestions = mcqsData.filter(q => {
    const matchesSearch = !searchQuery || 
      q.question_text.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.topic.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSubject = !selectedSubject || q.subject === selectedSubject;
    const matchesDifficulty = difficulty === 'Mixed' || q.difficulty === difficulty;
    const matchesEvidence = selectedEvidence === 'All' || q.evidence_category === selectedEvidence;
    const matchesType = selectedType === 'All' || q.question_type === selectedType;

    return matchesSearch && matchesSubject && matchesDifficulty && matchesEvidence && matchesType;
  });

  return (
    <div className="space-y-8 pb-12 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-blue-500/20 text-blue-400 border border-blue-500/30">
              Module A: Round 1
            </span>
            <span className="text-xs text-slate-400 font-mono">• Online Screening Practice</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Round 1 — Technical Screening Question Bank
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-3xl leading-relaxed">
            Practice multiple-choice questions, tricky output prediction, and debugging traps across JavaScript, DOM, Web Standards, and Analytical Problem-Solving.
          </p>
        </div>

        {/* Quick Launch Buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          <Link
            to="/mocks"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-brand-600 to-cyan-500 hover:from-brand-500 hover:to-cyan-400 text-white font-semibold text-xs shadow-lg shadow-brand-500/20 transition-all"
          >
            <FileCheck2 className="w-4 h-4" />
            <span>Timed Mocks</span>
          </Link>
          <button
            onClick={() => {
              setSelectedSubject(null);
              setSelectedTopic(null);
              startQuiz('weak_areas');
            }}
            className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-amber-500/40 text-amber-400 font-semibold text-xs transition-all"
          >
            <Target className="w-4 h-4" />
            <span>Practice Weak Areas</span>
          </button>
        </div>
      </div>

      {/* 4 Subject Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {Object.entries(subjectMeta).map(([subject, meta]) => {
          const count = mcqsData.filter(q => q.subject === subject).length;
          return (
            <div
              key={subject}
              className={`p-5 rounded-2xl bg-slate-900/70 border ${
                selectedSubject === subject ? 'border-brand-500 shadow-brand-500/10' : 'border-slate-800'
              } hover:border-slate-700 shadow-xl flex flex-col justify-between space-y-4 group transition-all`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className={`p-2.5 rounded-xl bg-gradient-to-br ${meta.color} border ${meta.border} text-white`}>
                    <HelpCircle className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono font-bold text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded-md">
                    {count} Curated Qs
                  </span>
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-white group-hover:text-brand-400 transition-colors">
                      {subject}
                    </h3>
                  </div>
                  <span className="inline-block mt-1 text-[10px] font-bold text-slate-500 uppercase tracking-wider font-mono">
                    {meta.tag}
                  </span>
                  <p className="text-xs text-slate-400 line-clamp-3 mt-1.5 leading-relaxed">
                    {meta.desc}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
                <button
                  onClick={() => setSelectedSubject(selectedSubject === subject ? null : subject)}
                  className="text-xs text-slate-400 hover:text-white transition-colors"
                >
                  {selectedSubject === subject ? 'Show All' : 'Filter Qs'}
                </button>

                <button
                  onClick={() => openPractice(subject)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-brand-500/15 hover:bg-brand-500/25 border border-brand-500/30 text-brand-400 text-xs font-semibold transition-all"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Start Quiz</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Filter and Question Search Toolbar */}
      <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search questions, topics or syntax..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            {/* Subject Selector */}
            <select
              value={selectedSubject || 'All'}
              onChange={(e) => setSelectedSubject(e.target.value === 'All' ? null : e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-brand-500"
            >
              <option value="All">All Subjects</option>
              {Object.keys(subjectMeta).map(s => <option key={s} value={s}>{s}</option>)}
            </select>

            {/* Difficulty Selector */}
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-brand-500"
            >
              <option value="Mixed">Mixed Difficulty</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>

            {/* Evidence Category Filter */}
            <select
              value={selectedEvidence}
              onChange={(e) => setSelectedEvidence(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-brand-500"
            >
              <option value="All">All Evidence Categories</option>
              <option value="Officially documented">Officially documented</option>
              <option value="Candidate-reported, publicly accessible">Candidate-reported</option>
              <option value="Original practice question">Original practice question</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 font-mono">
          <span>Showing {filteredQuestions.length} questions matching criteria</span>
          <span>Click any question to inspect options and explanation</span>
        </div>
      </div>

      {/* Questions Preview List */}
      <div className="space-y-3">
        {filteredQuestions.map((q) => {
          const isExpanded = expandedQuestionId === q.id;
          return (
            <div
              key={q.id}
              className="rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all overflow-hidden"
            >
              <div
                onClick={() => setExpandedQuestionId(isExpanded ? null : q.id)}
                className="p-4 sm:p-5 cursor-pointer flex items-start justify-between gap-4 select-none"
              >
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase font-mono bg-brand-500/15 text-brand-400 border border-brand-500/30">
                      {q.subject}
                    </span>
                    <span className="text-[11px] text-slate-400 font-medium">
                      • {q.topic}
                    </span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 font-mono">
                      {q.difficulty}
                    </span>
                    {q.evidence_category && (
                      <span className="text-[10px] px-2 py-0.5 rounded bg-slate-950 text-slate-500 border border-slate-800 font-mono ml-auto">
                        {q.evidence_category}
                      </span>
                    )}
                  </div>

                  <h3 className="text-sm font-semibold text-white leading-snug">
                    {q.question_text}
                  </h3>
                </div>

                <button className="p-1 rounded-lg text-slate-400 hover:text-white shrink-0 mt-1">
                  {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
              </div>

              {isExpanded && (
                <div className="px-5 pb-5 pt-2 border-t border-slate-800 bg-slate-950/40 space-y-4 text-xs">
                  {/* Options */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 font-mono">Options</span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {(q.options || []).map((opt, i) => {
                        const isCorrect = opt.startsWith(q.correct_answer) || opt === q.correct_answer;
                        return (
                          <div
                            key={i}
                            className={`p-2.5 rounded-xl border font-mono ${
                              isCorrect
                                ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300 font-bold'
                                : 'bg-slate-900 border-slate-800 text-slate-400'
                            }`}
                          >
                            {opt}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Explanation */}
                  {q.explanation && (
                    <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
                      <div className="flex items-center gap-1.5 text-brand-400 font-bold font-mono text-[11px]">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Explanation & Mechanism</span>
                      </div>
                      <p className="text-slate-300 leading-relaxed">
                        {q.explanation}
                      </p>
                    </div>
                  )}

                  {/* Evidence & Confidence Notes */}
                  <div className="flex flex-wrap items-center justify-between text-[11px] text-slate-500 pt-1 font-mono border-t border-slate-900">
                    <span>Confidence: <strong className="text-slate-400">{q.confidence_label || 'High'}</strong></span>
                    {q.source_title && <span>Source: {q.source_title}</span>}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Practice Configuration Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-md bg-slate-900 border border-slate-700 rounded-2xl p-6 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-lg font-bold text-white">Configure Practice Quiz</h3>
                <p className="text-xs text-slate-400">{selectedSubject || 'All Topics'}</p>
              </div>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <div className="space-y-4">
              {/* Question Count */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">Number of Questions</label>
                <div className="grid grid-cols-3 gap-2">
                  {[10, 20, 35].map((cnt) => (
                    <button
                      key={cnt}
                      type="button"
                      onClick={() => setQuestionCount(cnt)}
                      className={`py-2 rounded-xl text-xs font-semibold border transition-all ${
                        questionCount === cnt
                          ? 'bg-brand-600 border-brand-500 text-white shadow-md shadow-brand-600/30'
                          : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      {cnt} Qs
                    </button>
                  ))}
                </div>
              </div>

              {/* Difficulty */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">Difficulty</label>
                <div className="grid grid-cols-4 gap-2">
                  {['Mixed', 'Easy', 'Medium', 'Hard'].map((d) => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => setDifficulty(d)}
                      className={`py-2 rounded-xl text-xs font-semibold border transition-all ${
                        difficulty === d
                          ? 'bg-brand-600 border-brand-500 text-white'
                          : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              {/* Instant Feedback Toggle */}
              <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60 flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-white block">Instant Feedback Mode</span>
                  <span className="text-[11px] text-slate-400">Show explanation immediately after answering</span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsInstantFeedback(!isInstantFeedback)}
                  className={`w-11 h-6 rounded-full transition-colors relative ${
                    isInstantFeedback ? 'bg-brand-600' : 'bg-slate-700'
                  }`}
                >
                  <div className={`w-4 h-4 rounded-full bg-white transition-transform absolute top-1 ${
                    isInstantFeedback ? 'left-6' : 'left-1'
                  }`} />
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="w-1/2 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => startQuiz('topic_practice')}
                className="w-1/2 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold shadow-lg shadow-brand-600/30 transition-all flex items-center justify-center gap-1.5"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Launch Quiz</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
