import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Code2, Database, Terminal, Play, CheckCircle2, XCircle, RotateCcw, 
  HelpCircle, Sparkles, Clock, Table, ChevronRight, Layers, FileCode,
  AlertCircle, ShieldCheck, ArrowRight, Eye, Check
} from 'lucide-react';
import { api } from '../api';
import { useLearner } from '../context/LearnerContext';
import codingProblemsData from '../data/coding_problems.json';

export default function Round2CodingSqlPage() {
  const navigate = useNavigate();
  const { learnerId, refreshDashboard } = useLearner();
  const [activeTab, setActiveTab] = useState('javascript'); // 'javascript' | 'sql'
  
  // JavaScript Problems
  const jsProblems = codingProblemsData.filter(p => p.language === 'javascript' || p.category === 'JavaScript');
  // SQL Problems
  const sqlProblems = codingProblemsData.filter(p => p.language === 'sql' || p.category === 'SQL');

  // SQL Interactive Sandbox State
  const [selectedSqlProblem, setSelectedSqlProblem] = useState(sqlProblems[0] || null);
  const [sqlQuery, setSqlQuery] = useState(sqlProblems[0]?.starter_code_sql || 'SELECT * FROM employees LIMIT 10;');
  const [sqlRunning, setSqlRunning] = useState(false);
  const [sqlResult, setSqlResult] = useState(null);
  const [schemaData, setSchemaData] = useState(null);
  const [showSchema, setShowSchema] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [activeHintIndex, setActiveHintIndex] = useState(0);

  // Update query starter when changing SQL problem
  useEffect(() => {
    if (selectedSqlProblem) {
      setSqlQuery(selectedSqlProblem.starter_code_sql || '');
      setSqlResult(null);
      setShowSolution(false);
      setActiveHintIndex(0);
    }
  }, [selectedSqlProblem]);

  // Load database schema on mount
  useEffect(() => {
    async function fetchSchema() {
      try {
        const data = await api.getSqlSchema();
        setSchemaData(data);
      } catch (err) {
        console.warn('Could not load SQL schema:', err);
      }
    }
    fetchSchema();
  }, []);

  // Execute SQL Query via Backend Sandbox
  const handleExecuteSql = async () => {
    if (!sqlQuery.trim()) return;
    setSqlRunning(true);
    setSqlResult(null);

    try {
      const res = await api.runSqlQuery(sqlQuery, selectedSqlProblem?.id);
      setSqlResult(res);
      if (res.is_match) {
        refreshDashboard();
      }
    } catch (err) {
      setSqlResult({
        success: false,
        error: err.response?.data?.detail || err.message || 'Execution error'
      });
    } finally {
      setSqlRunning(false);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-1 text-xs font-semibold uppercase tracking-wider rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Module B: Round 2
            </span>
            <span className="px-2.5 py-1 text-xs font-semibold uppercase tracking-wider rounded-md bg-blue-500/10 text-blue-400 border border-blue-500/20">
              Corroborated by Recruitment Email
            </span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Round 2 — JavaScript Coding & SQL Practice
          </h1>
          <p className="text-slate-400 mt-1 max-w-3xl text-sm leading-relaxed">
            The candidate recruitment email confirms a coding and query round covering <strong>JavaScript</strong> and <strong>SQL</strong> fundamentals. Practise algorithmic challenges and run live queries against an authentic database sandbox.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/mocks"
            className="py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs flex items-center gap-2 border border-slate-700 transition-all"
          >
            <Clock className="w-4 h-4 text-brand-400" />
            Timed Mocks
          </Link>
          <button
            onClick={() => navigate('/coding')}
            className="py-2.5 px-4 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold text-xs flex items-center gap-2 shadow-lg shadow-brand-600/20 transition-all"
          >
            <Terminal className="w-4 h-4" />
            Launch Full IDE
          </button>
        </div>
      </div>

      {/* Main Mode Toggle: JavaScript Coding vs SQL Practice */}
      <div className="flex items-center gap-2 p-1.5 bg-slate-900/80 border border-slate-800 rounded-2xl w-full sm:w-fit">
        <button
          onClick={() => setActiveTab('javascript')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
            activeTab === 'javascript'
              ? 'bg-brand-600 text-white shadow-lg shadow-brand-600/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Code2 className="w-4 h-4" />
          <span>JavaScript Coding ({jsProblems.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('sql')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
            activeTab === 'sql'
              ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Database className="w-4 h-4" />
          <span>SQL Query Sandbox ({sqlProblems.length})</span>
        </button>
      </div>

      {/* TAB 1: JAVASCRIPT CODING */}
      {activeTab === 'javascript' && (
        <div className="space-y-6">
          <div className="p-4 rounded-2xl bg-brand-950/20 border border-brand-500/20 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-brand-500/20 text-brand-400">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-white">
                  Real JavaScript Execution Environment
                </h3>
                <p className="text-[11px] text-slate-400">
                  Solutions execute against verified test cases in the browser. No simulated passes.
                </p>
              </div>
            </div>
            <Link
              to="/coding"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-brand-500/20 text-brand-300 text-xs font-semibold hover:bg-brand-500/30 border border-brand-500/30"
            >
              <span>Code Editor Mode</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {jsProblems.map((prob) => {
              const diffColors = {
                Easy: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
                Medium: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
                Hard: 'bg-red-500/10 text-red-400 border-red-500/20'
              };

              return (
                <div
                  key={prob.id}
                  className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between space-y-4 group"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${diffColors[prob.difficulty] || diffColors.Easy}`}>
                        {prob.difficulty}
                      </span>
                      <span className="text-[10px] text-slate-500 font-mono">
                        {prob.evidence_category || 'Original practice'}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-white group-hover:text-brand-300 transition-colors">
                      {prob.title}
                    </h3>

                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                      {prob.statement}
                    </p>

                    <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-500 font-mono pt-1">
                      <span>Time: <strong className="text-slate-300">{prob.time_complexity || 'O(N)'}</strong></span>
                      <span>•</span>
                      <span>Space: <strong className="text-slate-300">{prob.space_complexity || 'O(1)'}</strong></span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
                    <span className="text-[10px] text-slate-500">
                      {prob.test_cases?.length || 3} Test Cases
                    </span>
                    <button
                      onClick={() => navigate(`/coding/${prob.id}`)}
                      className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-brand-600 text-slate-200 hover:text-white text-xs font-semibold transition-all flex items-center gap-1.5 group-hover:border group-hover:border-brand-500/40"
                    >
                      <span>Open & Solve</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: SQL QUERY SANDBOX */}
      {activeTab === 'sql' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Problem Selector & Details */}
          <div className="lg:col-span-5 space-y-5">
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">Select SQL Challenge</span>
                <span className="text-xs text-emerald-400 font-mono">{sqlProblems.length} available</span>
              </div>

              <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
                {sqlProblems.map((prob) => {
                  const isSelected = selectedSqlProblem?.id === prob.id;
                  return (
                    <button
                      key={prob.id}
                      onClick={() => setSelectedSqlProblem(prob)}
                      className={`w-full text-left p-2.5 rounded-xl text-xs font-medium transition-all flex items-center justify-between ${
                        isSelected
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold'
                          : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                      }`}
                    >
                      <span className="truncate">{prob.title}</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 font-mono shrink-0 ml-2">
                        {prob.difficulty}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Selected Problem Description */}
            {selectedSqlProblem && (
              <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                      {selectedSqlProblem.difficulty}
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">
                      Database: SQLite In-Memory Sandbox
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white">
                    {selectedSqlProblem.title}
                  </h3>
                </div>

                <div className="text-xs text-slate-300 leading-relaxed whitespace-pre-wrap">
                  {selectedSqlProblem.statement}
                </div>

                {/* Hints Accordion */}
                {selectedSqlProblem.hints && selectedSqlProblem.hints.length > 0 && (
                  <div className="pt-2 border-t border-slate-800 space-y-2">
                    <div className="flex items-center justify-between text-xs font-semibold text-slate-400">
                      <span>Stuck? Need a Hint?</span>
                      <button
                        onClick={() => setActiveHintIndex(prev => Math.min(prev + 1, selectedSqlProblem.hints.length))}
                        className="text-emerald-400 hover:text-emerald-300 text-[11px] underline"
                      >
                        Reveal Hint ({Math.min(activeHintIndex, selectedSqlProblem.hints.length)}/{selectedSqlProblem.hints.length})
                      </button>
                    </div>
                    {activeHintIndex > 0 && (
                      <div className="space-y-1.5">
                        {selectedSqlProblem.hints.slice(0, activeHintIndex).map((hint, i) => (
                          <div key={i} className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 flex items-start gap-2">
                            <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                            <span>{hint}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Schema toggle */}
                <div className="pt-2 border-t border-slate-800">
                  <button
                    onClick={() => setShowSchema(!showSchema)}
                    className="flex items-center gap-2 text-xs font-semibold text-brand-400 hover:text-brand-300"
                  >
                    <Table className="w-4 h-4" />
                    <span>{showSchema ? 'Hide Database Tables' : 'View Database Tables & Columns'}</span>
                  </button>

                  {showSchema && schemaData && (
                    <div className="mt-3 p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-3 text-xs max-h-60 overflow-y-auto">
                      {Object.entries(schemaData.tables || {}).map(([table, cols]) => (
                        <div key={table} className="space-y-1">
                          <span className="font-bold font-mono text-emerald-400">{table}</span>
                          <div className="grid grid-cols-2 gap-1 text-[11px] text-slate-400 pl-2">
                            {cols.map(c => (
                              <span key={c.name} className="truncate">
                                • {c.name} <span className="text-slate-600">({c.type})</span>
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: SQL Query Editor & Real Execution Results */}
          <div className="lg:col-span-7 space-y-4">
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-bold text-white font-mono uppercase tracking-wider">
                    Live SQL Query Editor
                  </span>
                </div>
                <button
                  onClick={() => setSqlQuery(selectedSqlProblem?.starter_code_sql || '')}
                  className="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1 font-mono"
                  title="Reset to starter"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset</span>
                </button>
              </div>

              {/* Text Area Query Editor */}
              <div className="relative">
                <textarea
                  value={sqlQuery}
                  onChange={(e) => setSqlQuery(e.target.value)}
                  placeholder="Type your SQL query here (e.g., SELECT department, AVG(salary) FROM employees GROUP BY department;)"
                  rows={7}
                  className="w-full p-4 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono text-xs focus:outline-none focus:border-emerald-500 leading-relaxed resize-y"
                  spellCheck={false}
                />
              </div>

              {/* Action Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                <div className="text-[11px] text-slate-500 font-mono">
                  Safe SQLite sandbox • Read-only execution
                </div>

                <div className="flex items-center gap-2">
                  {selectedSqlProblem?.expected_query && (
                    <button
                      onClick={() => setShowSolution(!showSolution)}
                      className="px-3 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white bg-slate-800/60 border border-slate-700/60 transition-colors flex items-center gap-1.5"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>{showSolution ? 'Hide Solution' : 'View Reference'}</span>
                    </button>
                  )}

                  <button
                    onClick={handleExecuteSql}
                    disabled={sqlRunning || !sqlQuery.trim()}
                    className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-semibold text-xs flex items-center gap-2 shadow-lg shadow-emerald-600/20 transition-all font-mono"
                  >
                    <Play className="w-3.5 h-3.5 fill-white" />
                    <span>{sqlRunning ? 'Running Query...' : 'Run & Verify'}</span>
                  </button>
                </div>
              </div>

              {/* Reference Solution Box */}
              {showSolution && selectedSqlProblem?.expected_query && (
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-xs text-amber-400 font-bold font-mono">
                    <span>Reference Query</span>
                    <button
                      onClick={() => setSqlQuery(selectedSqlProblem.expected_query)}
                      className="text-[11px] text-emerald-400 hover:underline"
                    >
                      Copy to Editor
                    </button>
                  </div>
                  <pre className="text-xs font-mono text-emerald-300 overflow-x-auto whitespace-pre-wrap">
                    {selectedSqlProblem.expected_query}
                  </pre>
                  {selectedSqlProblem.solution_complexity && (
                    <p className="text-[11px] text-slate-400 pt-1">
                      {selectedSqlProblem.solution_complexity}
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Live Results Panel */}
            {sqlResult && (
              <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4 animate-in fade-in duration-200">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    {sqlResult.success && sqlResult.is_match ? (
                      <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-xs font-mono">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>TEST PASSED — Query Output Matches Reference Solution!</span>
                      </div>
                    ) : sqlResult.success && sqlResult.is_match === false ? (
                      <div className="flex items-center gap-1.5 text-amber-400 font-bold text-xs font-mono">
                        <AlertCircle className="w-4 h-4" />
                        <span>Query Ran Successfully, But Output Does Not Match Reference</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5 text-red-400 font-bold text-xs font-mono">
                        <XCircle className="w-4 h-4" />
                        <span>Query Execution Failed</span>
                      </div>
                    )}
                  </div>

                  {sqlResult.execution_time_ms !== undefined && (
                    <span className="text-[11px] text-slate-500 font-mono">
                      Runtime: {sqlResult.execution_time_ms} ms
                    </span>
                  )}
                </div>

                {/* Error message if failed */}
                {!sqlResult.success && (
                  <div className="p-3.5 rounded-xl bg-red-950/30 border border-red-500/30 text-xs font-mono text-red-300">
                    {sqlResult.error}
                  </div>
                )}

                {/* Result Table if successful */}
                {sqlResult.success && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                      <span>Returned Rows: <strong className="text-white">{sqlResult.row_count}</strong></span>
                      {sqlResult.match_message && (
                        <span className="text-slate-300 text-[11px]">{sqlResult.match_message}</span>
                      )}
                    </div>

                    {sqlResult.rows && sqlResult.rows.length > 0 ? (
                      <div className="overflow-x-auto rounded-xl border border-slate-800 max-h-72">
                        <table className="w-full text-left text-xs font-mono">
                          <thead className="bg-slate-950 text-slate-300 border-b border-slate-800 sticky top-0">
                            <tr>
                              {sqlResult.columns.map((col, idx) => (
                                <th key={idx} className="p-2.5 font-bold">{col}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-800/60 bg-slate-900/60">
                            {sqlResult.rows.map((row, rIdx) => (
                              <tr key={rIdx} className="hover:bg-slate-800/40">
                                {sqlResult.columns.map((col, cIdx) => (
                                  <td key={cIdx} className="p-2.5 text-slate-300 whitespace-nowrap">
                                    {row[col] !== null && row[col] !== undefined ? String(row[col]) : <span className="text-slate-600">NULL</span>}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <div className="p-6 text-center text-xs text-slate-500 font-mono rounded-xl bg-slate-950 border border-slate-800">
                        Query returned 0 rows.
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
