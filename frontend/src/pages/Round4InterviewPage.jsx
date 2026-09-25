import React, { useState } from 'react';
import { 
  Users, CheckCircle2, Shield, HelpCircle, ChevronDown, ChevronUp,
  Award, Sparkles, Terminal, FileCode, Search, Filter, BookOpen, Layers
} from 'lucide-react';
import interviewQuestionsData from '../data/interview_questions.json';
import { updateInterviewProgress } from '../api';
import { useLearner } from '../context/LearnerContext';
import MarkdownViewer from '../components/MarkdownViewer';

export default function Round4InterviewPage() {
  const { refreshDashboard } = useLearner();
  const [activeTab, setActiveTab] = useState('technical'); // 'technical', 'defense', 'projects_defense'
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [revealed, setRevealed] = useState({});
  const [questionProgress, setQuestionProgress] = useState({});

  // Filter Round 4 questions
  const r4Questions = interviewQuestionsData.filter(q => q.round === 4 || !q.round);
  const categories = ['All', ...new Set(r4Questions.map(q => q.category).filter(Boolean))];

  const filteredQuestions = r4Questions.filter(q => {
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
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-1 text-xs font-semibold uppercase tracking-wider rounded-md bg-purple-500/10 text-purple-400 border border-purple-500/20">
              Round 4 Final Technical Round
            </span>
            <span className="px-2.5 py-1 text-xs font-semibold uppercase tracking-wider rounded-md bg-blue-500/10 text-blue-400 border border-blue-500/20">
              One-to-One Interview (45 Mins, 5:00 PM)
            </span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Round 4 — One-to-One Technical Interview
          </h1>
          <p className="text-slate-400 mt-1 max-w-3xl">
            Prepare for deep conversational defense of your code, systems knowledge (OS, DBMS, Networks, OOP), database concurrency, and project architectural trade-offs.
          </p>
        </div>
      </div>

      {/* Main Tabs */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 bg-slate-900/80 border border-slate-800 rounded-xl">
        <button
          onClick={() => setActiveTab('technical')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all ${
            activeTab === 'technical'
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <HelpCircle className="w-4 h-4" />
          Technical Questions ({filteredQuestions.length})
        </button>

        <button
          onClick={() => setActiveTab('defense')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all ${
            activeTab === 'defense'
              ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Shield className="w-4 h-4" />
          Coding Defense Mode (PADRE Framework)
        </button>
      </div>

      {/* TAB 1: TECHNICAL INTERVIEW QUESTIONS */}
      {activeTab === 'technical' && (
        <div className="space-y-6">
          {/* Filters Bar */}
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col md:flex-row md:items-center gap-4 justify-between">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search interview topics, SQL, indexing, threads, deadlocks, TCP..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                    selectedCategory === cat
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                      : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Questions Accordion List */}
          <div className="space-y-4">
            {filteredQuestions.map((q, idx) => {
              const qState = questionProgress[q.id] || 'NOT_STARTED';
              const rev = revealed[q.id] || {};

              return (
                <div
                  key={q.id}
                  className="bg-slate-900/60 border border-slate-800 hover:border-slate-700 rounded-2xl p-6 transition-all space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-800 text-slate-300">
                          #{idx + 1}
                        </span>
                        <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                          {q.category || 'Technical'}
                        </span>
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-white">
                        {q.question}
                      </h3>
                      {q.intent && (
                        <p className="text-xs text-slate-400 italic">
                          Interviewer evaluation target: {q.intent}
                        </p>
                      )}
                    </div>

                    {/* Confident toggle */}
                    <div className="shrink-0">
                      <button
                        onClick={() => handleStatusUpdate(q.id, qState === 'CONFIDENT' ? 'PRACTICING' : 'CONFIDENT')}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                          qState === 'CONFIDENT'
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                            : 'bg-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-700'
                        }`}
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        {qState === 'CONFIDENT' ? 'Marked Confident' : 'Mark Confident'}
                      </button>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-800/80">
                    <button
                      onClick={() => toggleSection(q.id, 'answer')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                        rev.answer ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      {rev.answer ? 'Hide Answer' : 'Reveal Answer'}
                    </button>

                    {q.framework && (
                      <button
                        onClick={() => toggleSection(q.id, 'framework')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                          rev.framework ? 'bg-purple-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                        }`}
                      >
                        {rev.framework ? 'Hide Key Points' : 'Show Key Points'}
                      </button>
                    )}

                    {q.follow_up && (
                      <button
                        onClick={() => toggleSection(q.id, 'followup')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                          rev.followup ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                        }`}
                      >
                        {rev.followup ? 'Hide Follow-up' : 'Show Follow-up'}
                      </button>
                    )}
                  </div>

                  {/* Revealed Content */}
                  {rev.framework && q.framework && (
                    <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-500/20 text-xs text-purple-200 space-y-1">
                      <div className="font-bold text-purple-300">Key Conceptual Framework:</div>
                      <div>{q.framework}</div>
                    </div>
                  )}

                  {rev.answer && q.sample_answer && (
                    <div className="p-4 rounded-xl bg-blue-950/20 border border-blue-500/20 text-xs text-slate-300 space-y-2">
                      <div className="font-bold text-blue-300">Technical Answer:</div>
                      <div className="leading-relaxed whitespace-pre-line">{q.sample_answer}</div>
                    </div>
                  )}

                  {rev.followup && q.follow_up && (
                    <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/20 text-xs text-emerald-200 space-y-1">
                      <div className="font-bold text-emerald-300">Interviewer Follow-up Question:</div>
                      <div>{q.follow_up}</div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: CODING DEFENSE MODE (PADRE FRAMEWORK) */}
      {activeTab === 'defense' && (
        <div className="p-6 md:p-8 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-1 text-xs font-bold uppercase rounded bg-purple-500/10 text-purple-400 border border-purple-500/20">
                PADRE Defense Framework
              </span>
            </div>
            <h2 className="text-2xl font-extrabold text-white">
              Defend Your Live-Coding Solution
            </h2>
            <p className="text-slate-400 text-sm mt-1 max-w-2xl leading-relaxed">
              DeltaX technical interviewers do not just check if your code compiles; they probe your architectural reasoning, complexity justification, and dry-run execution.
            </p>
          </div>

          {/* The 5 Steps of PADRE */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {[
              { letter: 'P', title: 'Problem & Invariant', desc: 'State the mathematical invariant or array property you are exploiting.' },
              { letter: 'A', title: 'Approach Justification', desc: 'Defend why this approach was chosen over brute-force (e.g. O(N) vs O(N^2)).' },
              { letter: 'D', title: 'Dry Run', desc: 'Trace a 3-element sample step-by-step showing pointer and variable states.' },
              { letter: 'R', title: 'Rigorous Complexity', desc: 'State exact Time and Space bounds with mathematical justification.' },
              { letter: 'E', title: 'Edge Cases', desc: 'Volunteer boundary conditions: empty array, negative numbers, integer overflow.' }
            ].map((p, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
                <div className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-300 font-extrabold text-sm flex items-center justify-center">
                  {p.letter}
                </div>
                <div className="text-sm font-bold text-white">{p.title}</div>
                <div className="text-xs text-slate-400 leading-relaxed">{p.desc}</div>
              </div>
            ))}
          </div>

          {/* The 8 Defense Probes Checklist */}
          <div className="space-y-4 pt-4 border-t border-slate-800">
            <h3 className="text-base font-bold text-white">
              Master the 8 Standard Technical Defense Questions:
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  q: "1. \"Can you optimize the space complexity?\"",
                  tip: "If you used an O(N) hash map or auxiliary array, consider if two pointers or bit manipulation could do in-place transformations in O(1) space."
                },
                {
                  q: "2. \"What happens if input size N = 10^9?\"",
                  tip: "An O(N) scan will TLE (takes ~10 seconds). You must find an O(log N) binary search on answer or O(1) mathematical closed-form formula."
                },
                {
                  q: "3. \"What happens if the array contains negative numbers?\"",
                  tip: "Prefix sum and sliding window monotonicity breaks when negatives are introduced! A sliding window can no longer contract monotonically; use Hash Map of prefix sums."
                },
                {
                  q: "4. \"How do you prevent integer overflow in mid calculation?\"",
                  tip: "Never write `mid = (low + high) / 2` because `low + high` can overflow 32-bit signed integer. Always write `mid = low + (high - low) / 2`."
                },
                {
                  q: "5. \"Why is String concatenation inside a loop bad?\"",
                  tip: "Strings are immutable in Java and Python. `s += char` reallocates and copies the entire string each iteration, resulting in O(N^2) memory churn. Use StringBuilder or list comprehension."
                },
                {
                  q: "6. \"Why is B+ Tree index preferred over Hash index in DBMS?\"",
                  tip: "Hash index only supports exact O(1) equality matches (`WHERE id = 5`). B+ Tree stores keys sorted at leaf level, supporting O(log N) lookups plus O(K) range queries (`WHERE id BETWEEN 5 AND 20`) and `ORDER BY`."
                },
                {
                  q: "7. \"What is the difference between Process and Thread context switching?\"",
                  tip: "Process switch requires invalidating virtual memory mappings (flushing TLB cache), which is expensive (~1000s of cycles). Thread switch shares address space, only swapping registers and stack pointers (~100s of cycles)."
                },
                {
                  q: "8. \"What is the 3-way TCP handshake?\"",
                  tip: "Client sends SYN(seq=x) -> Server replies SYN-ACK(seq=y, ack=x+1) -> Client sends ACK(seq=x+1, ack=y+1). Establishes reliable bidirectional sequence synchronization."
                }
              ].map((item, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-950/40 border border-slate-800 space-y-2">
                  <div className="text-sm font-bold text-purple-300">{item.q}</div>
                  <div className="text-xs text-slate-300 leading-relaxed">{item.tip}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
