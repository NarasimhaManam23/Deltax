import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FileText, Clock, CheckCircle, AlertTriangle, ArrowRight, Play, 
  HelpCircle, Code2, Award, Shield, Sparkles, BookOpen, ChevronRight,
  Filter, Eye, Terminal
} from 'lucide-react';
import mockTestsData from '../data/mock_tests.json';
import speedMocksData from '../data/coding_speed_mocks.json';
import historicalMocksData from '../data/coding_historical_mocks.json';
import MarkdownViewer from '../components/MarkdownViewer';

export default function MockTestsPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('mcq'); // 'mcq', 'coding_current', 'coding_historical'
  const [selectedCodingMock, setSelectedCodingMock] = useState(null);
  const [showSolution, setShowSolution] = useState(false);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-1 text-xs font-semibold uppercase tracking-wider rounded-md bg-blue-500/10 text-blue-400 border border-blue-500/20">
              Exam Simulation
            </span>
            <span className="px-2.5 py-1 text-xs font-semibold uppercase tracking-wider rounded-md bg-purple-500/10 text-purple-400 border border-purple-500/20">
              FirstLabs FED-2026 Mocks
            </span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Mock Tests & Assessment Simulator
          </h1>
          <p className="text-slate-400 mt-1 max-w-3xl text-sm leading-relaxed">
            Simulate realistic exam conditions with strict countdown timers, auto-scoring, and comprehensive explanations across Round 1 Screening and Round 2 Coding + SQL challenges.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 bg-slate-900/80 border border-slate-800 rounded-xl">
        <button
          onClick={() => { setActiveTab('mcq'); setSelectedCodingMock(null); }}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all ${
            activeTab === 'mcq'
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <FileText className="w-4 h-4" />
          Round 1 Screening Mocks ({mockTestsData.length} Tests)
        </button>

        <button
          onClick={() => navigate('/round-2')}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold text-slate-400 hover:text-white hover:bg-slate-800/60 transition-all"
        >
          <Code2 className="w-4 h-4 text-emerald-400" />
          Round 2 Coding & SQL Sandbox
        </button>
      </div>

      {/* TAB 1: ROUND 1 MCQ MOCKS */}
      {activeTab === 'mcq' && (
        <div className="space-y-6">
          <div className="p-4 rounded-xl bg-blue-950/20 border border-blue-500/20 flex items-start gap-3">
            <Shield className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
            <div className="text-sm text-slate-300 space-y-1">
              <span className="font-semibold text-blue-300">Screening Simulation Format:</span> Timed Multiple Choice Questions covering JavaScript, DOM, Web Standards, and Analytical Problem-Solving.
              <p className="text-xs text-slate-400 leading-relaxed">
                Includes strict countdown timers, instant flag-for-review, browser refresh recovery, and comprehensive post-submission diagnostic explanations.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockTestsData.map((mock) => (
              <div
                key={mock.mock_id}
                className="group relative bg-slate-900/60 border border-slate-800 hover:border-blue-500/40 rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/5 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-lg text-xs font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                      MOCK {mock.mock_id}
                    </span>
                    <div className="flex items-center gap-1.5 text-xs text-slate-400">
                      <Clock className="w-3.5 h-3.5 text-blue-400" />
                      <span>{mock.duration_minutes} Minutes</span>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
                      {mock.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                      {mock.description || mock.instructions}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800/80">
                    <div className="p-2.5 rounded-lg bg-slate-800/40 text-center">
                      <div className="text-xs text-slate-400">Questions</div>
                      <div className="text-base font-bold text-white mt-0.5">{mock.total_questions || mock.questions?.length}</div>
                    </div>
                    <div className="p-2.5 rounded-lg bg-slate-800/40 text-center">
                      <div className="text-xs text-slate-400">Target Pace</div>
                      <div className="text-base font-bold text-emerald-400 mt-0.5">~1.5m / Q</div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800">
                  <button
                    onClick={() => navigate('/quiz', { state: { mock_id: mock.mock_id, mockId: mock.mock_id, quiz_type: 'mock_test', timed: true, count: mock.total_questions || 15, duration: mock.duration_minutes || 45 } })}
                    className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-600/20 group-hover:shadow-blue-600/40"
                  >
                    <Play className="w-4 h-4 fill-white" />
                    Launch Mock {mock.mock_id}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: CURRENT DRIVE 30-MIN CODING MOCKS */}
      {activeTab === 'coding_current' && (
        <div className="space-y-6">
          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/20 flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div className="text-sm text-slate-300 space-y-1">
              <span className="font-semibold text-emerald-300">Current Official College Schedule:</span> Round 3 Online Coding Test starts at 4:00 PM for 30 Minutes.
              <p className="text-xs text-slate-400">
                Speed is the primary filter! Format consists of either 2 focused speed drills (10-12 mins + 16-18 mins) or 1 comprehensive string/application parser. Full test cases, Java and Python solutions provided.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {speedMocksData.map((mock) => (
              <div
                key={mock.mock_id}
                className="bg-slate-900/60 border border-slate-800 hover:border-emerald-500/40 rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-lg text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      SPEED MOCK {mock.mock_id}
                    </span>
                    <div className="flex items-center gap-1.5 text-xs text-slate-400">
                      <Clock className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{mock.duration_minutes} Mins</span>
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-white">
                    {mock.title}
                  </h3>
                  <div className="text-xs text-emerald-400/90 font-mono bg-emerald-950/30 px-2.5 py-1 rounded border border-emerald-900/40">
                    {mock.format}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800 flex items-center gap-2">
                  <button
                    onClick={() => { setSelectedCodingMock(mock); setShowSolution(false); }}
                    className="flex-1 py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    View Problems
                  </button>
                  <button
                    onClick={() => navigate('/coding')}
                    className="py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow-md shadow-emerald-600/20"
                  >
                    <Terminal className="w-3.5 h-3.5" />
                    IDE
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: HISTORICAL 120-MIN CODING MOCKS */}
      {activeTab === 'coding_historical' && (
        <div className="space-y-6">
          <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/20 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div className="text-sm text-slate-300 space-y-1">
              <span className="font-semibold text-amber-300">Historical Candidate Experience Reports:</span> In previous offline/off-campus hiring rounds, DeltaX used a 120-Minute test with 5 questions and a strict 55% per-question test-case passing threshold.
              <p className="text-xs text-slate-400">
                Note: This is candidate-reported historical experience for deep algorithmic stamina. The current drive official schedule is 30 minutes! Practice these for deep problem solving.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {historicalMocksData.map((mock) => (
              <div
                key={mock.mock_id}
                className="bg-slate-900/60 border border-slate-800 hover:border-amber-500/40 rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-lg text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                      HISTORICAL MOCK {mock.mock_id}
                    </span>
                    <div className="flex items-center gap-1.5 text-xs text-slate-400">
                      <Clock className="w-3.5 h-3.5 text-amber-400" />
                      <span>{mock.duration_minutes} Mins</span>
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-white">
                    {mock.title}
                  </h3>
                  <div className="text-xs text-amber-400/90 font-mono bg-amber-950/30 px-2.5 py-1 rounded border border-amber-900/40">
                    {mock.format}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800 flex items-center gap-2">
                  <button
                    onClick={() => { setSelectedCodingMock(mock); setShowSolution(false); }}
                    className="flex-1 py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    View Problems
                  </button>
                  <button
                    onClick={() => navigate('/coding')}
                    className="py-2 px-3 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow-md shadow-amber-600/20"
                  >
                    <Terminal className="w-3.5 h-3.5" />
                    IDE
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODAL / SLIDEOUT FOR VIEWING CODING MOCK PROBLEM & SOLUTIONS */}
      {selectedCodingMock && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950/50">
              <div>
                <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
                  {selectedCodingMock.format}
                </span>
                <h2 className="text-xl font-bold text-white mt-1">
                  {selectedCodingMock.title}
                </h2>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowSolution(!showSolution)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    showSolution 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {showSolution ? 'Hide Solutions' : 'Show Solutions (Java & Python)'}
                </button>
                <button
                  onClick={() => setSelectedCodingMock(null)}
                  className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto flex-1 space-y-6">
              {!showSolution ? (
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4">
                    Problem Statements & Constraints
                  </h4>
                  <MarkdownViewer content={selectedCodingMock.content_markdown} />
                </div>
              ) : (
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-wider text-emerald-400 mb-4">
                    Production Solutions (Java & Python) with Complexity Analysis
                  </h4>
                  <MarkdownViewer content={selectedCodingMock.solutions_markdown} />
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-800 bg-slate-950/50 flex items-center justify-between">
              <span className="text-xs text-slate-400">
                Ready to solve? Open the interactive code editor.
              </span>
              <button
                onClick={() => {
                  setSelectedCodingMock(null);
                  navigate('/coding');
                }}
                className="py-2 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-2"
              >
                <Terminal className="w-4 h-4" />
                Open Monaco IDE
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
