import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  BookOpen, Search, ChevronRight, FileText, Cpu, Database, 
  Terminal, Shield, Network, Sparkles, CheckCircle2, Bookmark
} from 'lucide-react';
import studyNotesData from '../data/study_notes.json';
import MarkdownViewer from '../components/MarkdownViewer';
import { useBookmarks } from '../context/BookmarkContext';

export default function StudyLibraryPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { isBookmarked, toggleBookmark } = useBookmarks();

  const activeModule = slug 
    ? (studyNotesData.find(m => m.slug === slug) || studyNotesData[0])
    : studyNotesData[0];

  const [searchQuery, setSearchQuery] = useState('');

  const moduleIcons = {
    study_notes_programming_dsa: Terminal,
    study_notes_networks_cybersecurity: Network,
    study_notes_microprocessors_arch: Cpu,
    study_notes_dbms_sql: Database,
    study_notes_os_concurrency: Shield,
    study_notes_oop_design: BookOpen,
  };

  const filteredModules = studyNotesData.filter(m => 
    !searchQuery || 
    m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.content_markdown.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const bookmarked = isBookmarked(activeModule.slug, 'study_note');

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-1 text-xs font-semibold uppercase tracking-wider rounded-md bg-blue-500/10 text-blue-400 border border-blue-500/20">
              Technical Syllabus
            </span>
            <span className="px-2.5 py-1 text-xs font-semibold uppercase tracking-wider rounded-md bg-purple-500/10 text-purple-400 border border-purple-500/20">
              6 Master Study Modules
            </span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Comprehensive Study Library
          </h1>
          <p className="text-slate-400 mt-1 max-w-3xl">
            In-depth core theory, interview definitions, pitfalls, memory addressing mechanics, and practice questions across all 8 technical subjects.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => toggleBookmark({
              id: activeModule.slug,
              itemType: 'study_note',
              title: activeModule.title,
              category: 'Study Library'
            })}
            className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center gap-2 transition-all ${
              bookmarked
                ? 'bg-blue-600 border-blue-500 text-white'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-white' : ''}`} />
            {bookmarked ? 'Bookmarked' : 'Bookmark Module'}
          </button>
        </div>
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Sidebar Modules */}
        <div className="lg:col-span-4 bg-slate-900/60 border border-slate-800 rounded-2xl p-4 space-y-4">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search concepts, protocols, B+ trees..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="space-y-1.5">
            {filteredModules.map((m) => {
              const IconComp = moduleIcons[m.slug] || FileText;
              const isActive = m.slug === activeModule.slug;

              return (
                <button
                  key={m.slug}
                  onClick={() => navigate(`/study/${m.slug}`)}
                  className={`w-full text-left p-3.5 rounded-xl transition-all flex items-center justify-between ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25'
                      : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${isActive ? 'bg-blue-700 text-white' : 'bg-slate-800 text-blue-400'}`}>
                      <IconComp className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold leading-tight">
                        {m.title}
                      </div>
                      <div className={`text-[11px] mt-0.5 ${isActive ? 'text-blue-100' : 'text-slate-500'}`}>
                        High-Priority Notes
                      </div>
                    </div>
                  </div>
                  <ChevronRight className={`w-4 h-4 shrink-0 ${isActive ? 'opacity-100' : 'opacity-40'}`} />
                </button>
              );
            })}
          </div>
        </div>

        {/* Content Viewer Panel */}
        <div className="lg:col-span-8 bg-slate-900/60 border border-slate-800 rounded-2xl p-6 md:p-10 space-y-6">
          <div className="flex items-center justify-between pb-6 border-b border-slate-800">
            <div>
              <span className="text-xs font-mono font-bold text-blue-400 uppercase tracking-wider">
                CORE TECHNICAL MODULE
              </span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-white mt-1">
                {activeModule.title}
              </h2>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Exam-Ready Material
            </span>
          </div>

          <div className="prose prose-invert max-w-none">
            <MarkdownViewer content={activeModule.content_markdown} />
          </div>
        </div>
      </div>
    </div>
  );
}
