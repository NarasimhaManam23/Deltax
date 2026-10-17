import React, { useState } from 'react';
import { 
  Search, Shield, AlertTriangle, CheckCircle2, BookOpen, Layers,
  ExternalLink, FileText, Clock, Award, Building, Sparkles, HelpCircle,
  TrendingUp, Info, Tag
} from 'lucide-react';
import researchData from '../data/research.json';

export default function ResearchPage() {
  const [activeTab, setActiveTab] = useState('process'); // 'process', 'sources', 'experiences', 'frequencies'
  const [selectedCategory, setSelectedCategory] = useState('All');

  const { role_overview, confirmed_recruitment_process, reconciliation_notes, sources, candidate_experiences, topic_frequency } = researchData;

  const categories = ['All', 'Officially documented', 'Candidate-reported, publicly accessible'];

  const filteredSources = selectedCategory === 'All'
    ? sources
    : sources.filter(s => s.evidence_category === selectedCategory);

  return (
    <div className="space-y-8 animate-fadeIn pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-1 text-xs font-semibold uppercase tracking-wider rounded-md bg-brand-500/10 text-brand-400 border border-brand-500/20">
              Evidence-Based Intelligence
            </span>
            <span className="px-2.5 py-1 text-xs font-semibold uppercase tracking-wider rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              FirstLabs FED-2026 Drive
            </span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Research Library & Evidence Base
          </h1>
          <p className="text-slate-400 mt-1 max-w-3xl text-sm leading-relaxed">
            Every practice question and module in this platform is grounded in verifiable evidence. We distinguish officially documented facts from candidate reports and clearly labeled original practice material.
          </p>
        </div>
      </div>

      {/* Role & Studio Intelligence Snapshot */}
      <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-brand-400 font-mono">Confirmed Role Intelligence</span>
            <h2 className="text-xl font-bold text-white mt-0.5">
              {role_overview.title} ({role_overview.reference_code})
            </h2>
            <p className="text-xs text-slate-400">{role_overview.company} • {role_overview.location}</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-mono font-bold text-xs">
              Fixed Base: {role_overview.compensation.fixed_base}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1">
            <span className="font-bold text-slate-400 font-mono uppercase text-[10px]">Flagship Product</span>
            <p className="text-white font-semibold">{role_overview.flagship_product.name}</p>
            <p className="text-slate-400 text-[11px] leading-relaxed">{role_overview.flagship_product.description}</p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1">
            <span className="font-bold text-slate-400 font-mono uppercase text-[10px]">Tech Stack</span>
            <p className="text-white font-semibold">Modern Frontend & Vector Search</p>
            <p className="text-slate-400 text-[11px] leading-relaxed">{role_overview.flagship_product.tech_stack}</p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1">
            <span className="font-bold text-slate-400 font-mono uppercase text-[10px]">Benefits & Perks</span>
            <p className="text-white font-semibold">{role_overview.compensation.medical_insurance}</p>
            <p className="text-slate-400 text-[11px] leading-relaxed">{role_overview.compensation.learning_budget} + {role_overview.compensation.perks}</p>
          </div>
        </div>
      </div>

      {/* Critical Reconciliation Notice: Email vs JD */}
      <div className="p-5 rounded-2xl bg-amber-950/20 border border-amber-500/30 space-y-3">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />
          <h3 className="text-sm font-bold text-amber-300 uppercase tracking-wider font-mono">
            {reconciliation_notes.summary}
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-300">
          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
            <span className="font-bold text-amber-300 block mb-1">Recruitment Email Description:</span>
            <p className="text-slate-400">{reconciliation_notes.email_details}</p>
          </div>
          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
            <span className="font-bold text-blue-300 block mb-1">Careers JD PDF Description:</span>
            <p className="text-slate-400">{reconciliation_notes.jd_details}</p>
          </div>
        </div>
        <p className="text-[11px] text-slate-400 italic pt-1">
          {reconciliation_notes.platform_approach}
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 bg-slate-900/80 border border-slate-800 rounded-2xl">
        <button
          onClick={() => setActiveTab('process')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
            activeTab === 'process'
              ? 'bg-brand-600 text-white shadow-lg shadow-brand-600/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Building className="w-4 h-4" />
          <span>Confirmed Selection Process</span>
        </button>

        <button
          onClick={() => setActiveTab('sources')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
            activeTab === 'sources'
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Verified Sources ({sources.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('experiences')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
            activeTab === 'experiences'
              ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>Candidate Debriefs ({candidate_experiences.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('frequencies')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
            activeTab === 'frequencies'
              ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          <span>Topic Frequency Counts</span>
        </button>
      </div>

      {/* TAB 1: CONFIRMED SELECTION PROCESS */}
      {activeTab === 'process' && (
        <div className="space-y-4">
          <div className="space-y-3">
            {confirmed_recruitment_process.map((step) => (
              <div
                key={step.step}
                className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col sm:flex-row sm:items-start justify-between gap-4"
              >
                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-xl bg-brand-500/20 border border-brand-500/30 flex items-center justify-center font-bold text-brand-400 font-mono shrink-0">
                    {step.step}
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-bold text-white">{step.name}</h3>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                        {step.format}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {step.topics}
                    </p>
                    <div className="text-[11px] text-slate-500 font-mono pt-1">
                      Citations: {step.source_type}
                    </div>
                  </div>
                </div>

                <div className="shrink-0 self-start sm:self-auto">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                    {step.confidence}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: VERIFIED SOURCES */}
      {activeTab === 'sources' && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            {categories.map(c => (
              <button
                key={c}
                onClick={() => setSelectedCategory(c)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  selectedCategory === c
                    ? 'bg-brand-500/20 text-brand-300 border border-brand-500/40'
                    : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredSources.map((s) => (
              <div
                key={s.id}
                className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between space-y-3"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-bold uppercase font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                      {s.source_type}
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400">
                      {s.confidence_label}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-white leading-snug">
                    {s.title}
                  </h3>

                  <p className="text-xs text-slate-400 leading-relaxed">
                    {s.findings}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono">
                  <span className="text-slate-500">Accessed: {s.date_accessed}</span>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-brand-400 hover:text-brand-300 flex items-center gap-1 font-semibold"
                  >
                    <span>Visit Source</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: CANDIDATE EXPERIENCES */}
      {activeTab === 'experiences' && (
        <div className="space-y-4">
          <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-400 flex items-start gap-2">
            <Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
            <span>
              The following candidate reports were collected from public placement forums and Glassdoor debriefs. They reflect individual candidate impressions, not guaranteed official test parameters.
            </span>
          </div>

          <div className="space-y-4">
            {candidate_experiences.map((exp) => (
              <div
                key={exp.id}
                className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-xs">{exp.source_platform}</span>
                    <span className="text-slate-500 text-xs">• {exp.role}</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-500">{exp.date_reported}</span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  "{exp.summary}"
                </p>

                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  <span className="text-[10px] text-slate-500 font-mono mr-1">Topics Reported:</span>
                  {exp.topics_mentioned.map(t => (
                    <span key={t} className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-800 text-slate-300 border border-slate-700/50">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: TOPIC FREQUENCY TABLE (HONEST COUNTS ONLY) */}
      {activeTab === 'frequencies' && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
            <h3 className="text-sm font-bold text-white">Honest Topic Frequency Analysis</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              In accordance with strict research integrity rules, the table below shows the <strong>exact number of verified sources and candidate debriefs</strong> that mentioned each topic. We never manufacture percentage frequencies or extrapolate from single reports.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-800">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-slate-950 text-slate-300 border-b border-slate-800">
                <tr>
                  <th className="p-3.5 font-bold">Topic Area</th>
                  <th className="p-3.5 font-bold">Candidate Reports</th>
                  <th className="p-3.5 font-bold">Official JD Mentions</th>
                  <th className="p-3.5 font-bold">Confidence Rating</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 bg-slate-900/60">
                {topic_frequency.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-800/40">
                    <td className="p-3.5 text-white font-bold">{row.topic}</td>
                    <td className="p-3.5 text-brand-400 font-semibold">{row.candidate_report_count} candidate reports</td>
                    <td className="p-3.5 text-emerald-400 font-semibold">{row.official_jd_mention_count} official docs</td>
                    <td className="p-3.5">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        row.confidence === 'High'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : row.confidence === 'Moderate'
                          ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                          : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                      }`}>
                        {row.confidence}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
