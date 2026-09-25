import React, { useState } from 'react';
import { 
  Search, Shield, AlertTriangle, CheckCircle2, BookOpen, Layers,
  ExternalLink, FileText, Clock, Award, Building, Sparkles
} from 'lucide-react';
import researchData from '../data/research.json';
import MarkdownViewer from '../components/MarkdownViewer';

export default function ResearchPage() {
  const [activeTab, setActiveTab] = useState('overview'); // 'overview', 'evidence_map', 'sources'

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-1 text-xs font-semibold uppercase tracking-wider rounded-md bg-blue-500/10 text-blue-400 border border-blue-500/20">
              Evidence-Based Intelligence
            </span>
            <span className="px-2.5 py-1 text-xs font-semibold uppercase tracking-wider rounded-md bg-purple-500/10 text-purple-400 border border-purple-500/20">
              Campus Drive 2027 Research
            </span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            DeltaX Drive Intelligence & Evidence Base
          </h1>
          <p className="text-slate-400 mt-1 max-w-3xl">
            Exhaustive synthesis of official communications, verified candidate interview logs, topic frequencies, and historical evaluation patterns.
          </p>
        </div>
      </div>

      {/* Critical Comparison Banner: Current Official Process vs Historical Candidate Reports */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* CURRENT OFFICIAL FORMAT */}
        <div className="p-6 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 space-y-4">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <h3 className="text-base font-bold text-emerald-300 uppercase tracking-wider">
              Current Official Process (Authoritative)
            </h3>
          </div>
          <div className="text-xs text-slate-300 leading-relaxed space-y-2">
            <div><span className="font-semibold text-emerald-300">College:</span> RVR & JC College of Engineering</div>
            <div><span className="font-semibold text-emerald-300">Drive Date:</span> 29 September 2026 (Batch 2027)</div>
            <div><span className="font-semibold text-emerald-300">Role & CTC:</span> Associate Product Engineer (₹7 LPA)</div>
            <div className="pt-2 border-t border-emerald-900/40 text-emerald-200">
              <span className="font-bold">Official College Communication Schedule:</span>
              <ul className="list-disc list-inside mt-1 space-y-0.5 text-slate-300">
                <li><strong className="text-white">Round 1:</strong> Technical MCQ (10:00 AM – 10:45 AM, 45 Mins, 50 Qs)</li>
                <li><strong className="text-white">Round 2:</strong> AI Telephonic Interview (Starts 12:30 PM, 15–20 Mins)</li>
                <li><strong className="text-white">Round 3:</strong> Online Coding Test (Starts 4:00 PM, 30 Mins notice)</li>
                <li><strong className="text-white">Round 4:</strong> 1-on-1 Technical Interview (Starts 5:00 PM, 45 Mins)</li>
              </ul>
            </div>
          </div>
        </div>

        {/* HISTORICAL CANDIDATE PATTERNS */}
        <div className="p-6 rounded-2xl bg-amber-950/20 border border-amber-500/30 space-y-4">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-400" />
            <h3 className="text-base font-bold text-amber-300 uppercase tracking-wider">
              Historical Candidate Experience Reports
            </h3>
          </div>
          <div className="text-xs text-slate-300 leading-relaxed space-y-2">
            <div><span className="font-semibold text-amber-300">Source:</span> Candidate-reported historical experiences (2022–2025) across off-campus & pooled drives.</div>
            <div><span className="font-semibold text-amber-300">Historical Round 3 Format:</span> 5 Questions / 120 Minutes.</div>
            <div><span className="font-semibold text-amber-300">Historical Cutoff:</span> Strict requirement to score 55%+ test cases on EVERY question.</div>
            <div className="pt-2 border-t border-amber-900/40 text-amber-200">
              <span className="font-bold">Why This Matters:</span>
              <p className="mt-1 text-slate-300">
                Never confuse historical candidate reports with the current official college schedule. However, training with both formats prepares you for rapid 30-min solving as well as deep 55% multi-question stamina.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 bg-slate-900/80 border border-slate-800 rounded-xl">
        <button
          onClick={() => setActiveTab('overview')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all ${
            activeTab === 'overview'
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Building className="w-4 h-4" />
          Historical Drive Analysis
        </button>

        <button
          onClick={() => setActiveTab('evidence_map')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all ${
            activeTab === 'evidence_map'
              ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Layers className="w-4 h-4" />
          Topic Evidence & Classification Matrix
        </button>

        <button
          onClick={() => setActiveTab('sources')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all ${
            activeTab === 'sources'
              ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          Verified Sources & References
        </button>
      </div>

      {/* Tab Content */}
      <div className="p-6 md:p-10 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-6">
        {activeTab === 'overview' && (
          <div className="prose prose-invert max-w-none">
            <MarkdownViewer content={researchData.previous_drives} />
          </div>
        )}

        {activeTab === 'evidence_map' && (
          <div className="prose prose-invert max-w-none">
            <MarkdownViewer content={researchData.evidence_map} />
          </div>
        )}

        {activeTab === 'sources' && (
          <div className="prose prose-invert max-w-none">
            <MarkdownViewer content={researchData.source_links} />
          </div>
        )}
      </div>
    </div>
  );
}
