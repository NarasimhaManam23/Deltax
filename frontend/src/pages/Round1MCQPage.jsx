import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
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
  Filter
} from 'lucide-react';
import { api } from '../api';

export default function Round1MCQPage() {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [questionCount, setQuestionCount] = useState(20);
  const [difficulty, setDifficulty] = useState('Mixed');
  const [isInstantFeedback, setIsInstantFeedback] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  const subjectMeta = {
    Programming: {
      desc: 'C pointers, Java memory, Python scope, operator precedence, sequence points, output prediction.',
      color: 'from-blue-500/20 to-indigo-500/20',
      border: 'border-blue-500/30',
      studySlug: 'study_notes_programming_dsa',
      count: 100
    },
    DSA: {
      desc: 'Arrays, hashing, prefix sum, stacks, queues, trees, heaps, graphs, topological sort, DP.',
      color: 'from-cyan-500/20 to-blue-500/20',
      border: 'border-cyan-500/30',
      studySlug: 'study_notes_programming_dsa',
      count: 100
    },
    Networks: {
      desc: 'OSI 7 layers, TCP 3-way handshake, 4-way FIN, UDP, DNS, ARP, HTTP/1.1 vs HTTP/2, ports.',
      color: 'from-emerald-500/20 to-teal-500/20',
      border: 'border-emerald-500/30',
      studySlug: 'study_notes_networks_cybersecurity',
      count: 50
    },
    Microprocessors: {
      desc: '8085 registers, Flag register traps (INR does not affect Carry!), ALE, interrupts priority, 8086.',
      color: 'from-amber-500/20 to-orange-500/20',
      border: 'border-amber-500/30',
      studySlug: 'study_notes_microprocessors_arch',
      count: 50
    },
    Cybersecurity: {
      desc: 'AES, RSA, SHA-256 vs bcrypt salting, SQL Injection, XSS, CSRF, JWT structure and vulnerabilities.',
      color: 'from-red-500/20 to-pink-500/20',
      border: 'border-red-500/30',
      studySlug: 'study_notes_networks_cybersecurity',
      count: 50
    },
    DBMS: {
      desc: 'SQL joins, 1NF to BCNF normalization, ACID properties, B+ Tree vs Hash indexing, MVCC, locks.',
      color: 'from-purple-500/20 to-violet-500/20',
      border: 'border-purple-500/30',
      studySlug: 'study_notes_oop_dbms_os',
      count: 50
    },
    OS: {
      desc: 'Process vs thread context switching, Coffman deadlock conditions, paging, TLB, page fault sequence.',
      color: 'from-fuchsia-500/20 to-purple-500/20',
      border: 'border-fuchsia-500/30',
      studySlug: 'study_notes_oop_dbms_os',
      count: 50
    },
    OOP: {
      desc: '4 Pillars, vtable dynamic dispatch, diamond problem, method hiding vs overriding, SOLID principles.',
      color: 'from-sky-500/20 to-blue-500/20',
      border: 'border-sky-500/30',
      studySlug: 'study_notes_oop_dbms_os',
      count: 50
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

  const openPractice = (subject = null, topic = null) => {
    setSelectedSubject(subject);
    setSelectedTopic(topic);
    setModalOpen(true);
  };

  const startQuiz = async (type = 'topic_practice') => {
    setModalOpen(false);
    navigate(`/quiz/run`, {
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

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-blue-500/20 text-blue-400 border border-blue-500/30">
              Round 1 Elimination Filter
            </span>
            <span className="text-xs text-slate-500 font-mono">• 45 Mins / 50 Qs</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            Technical MCQ Question Bank
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Master all 8 technical subjects evaluated in DeltaX Round 1. 550+ verified questions with full explanations.
          </p>
        </div>

        {/* Quick Launch Buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          <Link
            to="/mocks"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-brand-600 to-cyan-500 hover:from-brand-500 hover:to-cyan-400 text-white font-semibold text-xs shadow-lg shadow-brand-500/20 transition-all"
          >
            <FileCheck2 className="w-4 h-4" />
            <span>Full 45-Min Mocks (1–5)</span>
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

      {/* Subject Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {Object.entries(subjectMeta).map(([subject, meta]) => {
          return (
            <div
              key={subject}
              className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 shadow-xl flex flex-col justify-between space-y-4 group transition-all"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className={`p-2.5 rounded-xl bg-gradient-to-br ${meta.color} border ${meta.border} text-white`}>
                    <HelpCircle className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-mono font-bold text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded-md">
                    {meta.count} Qs
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-white group-hover:text-brand-400 transition-colors">
                    {subject}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-3 mt-1 leading-relaxed">
                    {meta.desc}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
                <Link
                  to={`/study/${meta.studySlug}`}
                  className="flex items-center gap-1 text-xs text-slate-400 hover:text-white transition-colors"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Learn Theory</span>
                </Link>

                <button
                  onClick={() => openPractice(subject)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-brand-500/15 hover:bg-brand-500/25 border border-brand-500/30 text-brand-400 text-xs font-semibold transition-all"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Practice</span>
                </button>
              </div>
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
              {/* Question Count Selector */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">Number of Questions</label>
                <div className="grid grid-cols-4 gap-2">
                  {[10, 20, 30, 50].map((num) => (
                    <button
                      key={num}
                      onClick={() => setQuestionCount(num)}
                      className={`py-2 text-xs font-mono font-bold rounded-xl border transition-all ${
                        questionCount === num
                          ? 'bg-brand-500/20 border-brand-500 text-brand-400'
                          : 'bg-slate-800/80 border-slate-700 text-slate-400 hover:text-white'
                      }`}
                    >
                      {num} Qs
                    </button>
                  ))}
                </div>
              </div>

              {/* Difficulty */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">Difficulty</label>
                <div className="grid grid-cols-4 gap-2">
                  {['Mixed', 'Easy', 'Medium', 'Hard'].map((diff) => (
                    <button
                      key={diff}
                      onClick={() => setDifficulty(diff)}
                      className={`py-2 text-xs font-semibold rounded-xl border transition-all ${
                        difficulty === diff
                          ? 'bg-brand-500/20 border-brand-500 text-brand-400'
                          : 'bg-slate-800/80 border-slate-700 text-slate-400 hover:text-white'
                      }`}
                    >
                      {diff}
                    </button>
                  ))}
                </div>
              </div>

              {/* Feedback Mode */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-800/50 border border-slate-700/60">
                <div>
                  <span className="text-xs font-semibold text-white block">Instant Answer Feedback</span>
                  <span className="text-[11px] text-slate-400 block">Show explanation immediately after selecting</span>
                </div>
                <input
                  type="checkbox"
                  checked={isInstantFeedback}
                  onChange={(e) => setIsInstantFeedback(e.target.checked)}
                  className="w-4 h-4 rounded text-brand-500 focus:ring-brand-500"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={() => startQuiz('topic_practice')}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold text-xs shadow-lg shadow-brand-500/25 transition-all"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Launch Quiz</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
