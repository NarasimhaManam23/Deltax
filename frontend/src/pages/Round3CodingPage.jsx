import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Code2, Terminal, BookOpen, Clock, AlertTriangle, CheckCircle, 
  Search, Filter, Sparkles, ArrowRight, ChevronRight, Copy, Check,
  Cpu, FileCode, Layers
} from 'lucide-react';
import codingPatternsData from '../data/coding_patterns.json';
import codingProblemsData from '../data/coding_problems.json';
import MarkdownViewer from '../components/MarkdownViewer';

export default function Round3CodingPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('patterns'); // 'patterns', 'problems'
  const [selectedPattern, setSelectedPattern] = useState(codingPatternsData[0]);
  const [langTab, setLangTab] = useState('java'); // 'java', 'python'
  const [copied, setCopied] = useState(false);

  // Problem filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const difficulties = ['All', 'Easy', 'Easy-Medium', 'Medium', 'Medium-Hard', 'Application'];
  const categories = ['All', ...new Set(codingProblemsData.map(p => p.category).filter(Boolean))];

  const filteredProblems = codingProblemsData.filter(p => {
    const matchesSearch = !searchQuery || 
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.statement.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.code_id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDiff = selectedDifficulty === 'All' || p.difficulty === selectedDifficulty || p.tier === selectedDifficulty;
    const matchesCat = selectedCategory === 'All' || p.category === selectedCategory;
    return matchesSearch && matchesDiff && matchesCat;
  });

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-1 text-xs font-semibold uppercase tracking-wider rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Round 3 Technical Assessment
            </span>
            <span className="px-2.5 py-1 text-xs font-semibold uppercase tracking-wider rounded-md bg-blue-500/10 text-blue-400 border border-blue-500/20">
              17 Master Patterns • 100 Problems
            </span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Round 3 — Coding Assessment Engine
          </h1>
          <p className="text-slate-400 mt-1 max-w-3xl">
            Master the core algorithmic patterns tested at DeltaX. The official current drive format is 30 minutes online coding starting at 4:00 PM.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/coding')}
            className="py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs flex items-center gap-2 shadow-lg shadow-blue-600/20"
          >
            <Terminal className="w-4 h-4" />
            Launch Monaco IDE
          </button>
        </div>
      </div>

      {/* Main Tabs */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 bg-slate-900/80 border border-slate-800 rounded-xl">
        <button
          onClick={() => setActiveTab('patterns')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all ${
            activeTab === 'patterns'
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Layers className="w-4 h-4" />
          17 Master Coding Patterns
        </button>

        <button
          onClick={() => setActiveTab('problems')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all ${
            activeTab === 'problems'
              ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Code2 className="w-4 h-4" />
          100 Practice Problems Catalog ({filteredProblems.length})
        </button>
      </div>

      {/* TAB 1: 17 MASTER CODING PATTERNS */}
      {activeTab === 'patterns' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Pattern Sidebar Selection */}
          <div className="lg:col-span-4 bg-slate-900/60 border border-slate-800 rounded-2xl p-4 space-y-2 max-h-[800px] overflow-y-auto">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 px-2 py-1 mb-2">
              Select Algorithmic Pattern
            </div>
            {codingPatternsData.map((p) => (
              <button
                key={p.id}
                onClick={() => setSelectedPattern(p)}
                className={`w-full text-left p-3 rounded-xl transition-all flex items-center justify-between ${
                  selectedPattern.id === p.id
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                    : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
                }`}
              >
                <div className="space-y-0.5">
                  <div className="text-[11px] font-mono opacity-80">
                    Pattern {p.number_label}
                  </div>
                  <div className="text-xs font-bold truncate max-w-[240px]">
                    {p.title}
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 shrink-0 opacity-60" />
              </button>
            ))}
          </div>

          {/* Pattern Details Panel */}
          <div className="lg:col-span-8 bg-slate-900/60 border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <span className="text-xs font-mono font-bold text-blue-400 uppercase tracking-wider">
                  PATTERN {selectedPattern.number_label}
                </span>
                <h2 className="text-2xl font-extrabold text-white mt-1">
                  {selectedPattern.title}
                </h2>
              </div>

              {/* Language Switcher for Code Snippet */}
              <div className="flex items-center gap-1 p-1 bg-slate-950 rounded-lg border border-slate-800">
                <button
                  onClick={() => setLangTab('java')}
                  className={`px-3 py-1 rounded text-xs font-semibold transition-all ${
                    langTab === 'java' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Java Solution
                </button>
                <button
                  onClick={() => setLangTab('python')}
                  className={`px-3 py-1 rounded text-xs font-semibold transition-all ${
                    langTab === 'python' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Python Solution
                </button>
              </div>
            </div>

            {/* Code Block with Copy */}
            <div className="relative rounded-xl overflow-hidden border border-slate-800 bg-slate-950">
              <div className="flex items-center justify-between px-4 py-2 border-b border-slate-800 bg-slate-900/70">
                <span className="text-xs font-mono text-slate-400">
                  {langTab === 'java' ? 'Java Production Implementation' : 'Python Production Implementation'}
                </span>
                <button
                  onClick={() => handleCopyCode(langTab === 'java' ? selectedPattern.java_code : selectedPattern.python_code)}
                  className="flex items-center gap-1 text-xs text-slate-400 hover:text-white"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? 'Copied' : 'Copy'}
                </button>
              </div>
              <pre className="p-4 text-xs font-mono text-slate-200 overflow-x-auto leading-relaxed">
                <code>{langTab === 'java' ? selectedPattern.java_code : selectedPattern.python_code}</code>
              </pre>
            </div>

            {/* Full Pattern Markdown Notes */}
            <div className="pt-4 border-t border-slate-800">
              <MarkdownViewer content={selectedPattern.full_markdown} />
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: 100 PRACTICE PROBLEMS CATALOG */}
      {activeTab === 'problems' && (
        <div className="space-y-6">
          {/* Filters Bar */}
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col md:flex-row md:items-center gap-4 justify-between">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search problem title, code ID, or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {difficulties.map((diff) => (
                <button
                  key={diff}
                  onClick={() => setSelectedDifficulty(diff)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                    selectedDifficulty === diff
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                      : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {diff}
                </button>
              ))}
            </div>
          </div>

          {/* Problems Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredProblems.map((prob) => {
              const diffColor = 
                prob.difficulty === 'Easy' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                prob.difficulty === 'Medium' || prob.tier === 'Medium' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                'bg-purple-500/10 text-purple-400 border-purple-500/20';

              return (
                <div
                  key={prob.id}
                  className="bg-slate-900/60 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 transition-all flex flex-col justify-between space-y-4 group"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-slate-400 px-2 py-0.5 rounded bg-slate-800">
                          {prob.code_id}
                        </span>
                        <span className={`px-2 py-0.5 rounded text-[11px] font-semibold border ${diffColor}`}>
                          {prob.difficulty || prob.tier}
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-400">
                        {prob.category}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-white group-hover:text-blue-400 transition-colors">
                      {prob.title}
                    </h3>

                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                      {prob.statement}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                    <div className="text-[11px] text-slate-500 truncate max-w-[220px]">
                      {prob.approach || 'Core algorithmic pattern'}
                    </div>

                    <button
                      onClick={() => navigate(`/coding/${prob.id}`)}
                      className="py-1.5 px-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-blue-600/20 transition-all"
                    >
                      <Terminal className="w-3.5 h-3.5" />
                      Solve in IDE
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
