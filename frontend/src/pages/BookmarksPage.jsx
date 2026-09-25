import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Bookmark, Trash2, ArrowRight, BookOpen, Terminal, HelpCircle, 
  FileText, Search, Sparkles, FolderOpen
} from 'lucide-react';
import { useBookmarks } from '../context/BookmarkContext';

export default function BookmarksPage() {
  const navigate = useNavigate();
  const { bookmarks, removeBookmark } = useBookmarks();
  const [filterType, setFilterType] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const types = ['All', 'question', 'coding_problem', 'interview_question', 'study_note'];

  const filteredBookmarks = bookmarks.filter(b => {
    const matchesType = filterType === 'All' || b.itemType === filterType;
    const matchesSearch = !searchQuery || 
      (b.title && b.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (b.category && b.category.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesType && matchesSearch;
  });

  const getItemLink = (item) => {
    switch (item.itemType) {
      case 'coding_problem':
        return `/coding/${item.id}`;
      case 'study_note':
        return `/study/${item.id}`;
      case 'interview_question':
        return '/round-4';
      case 'question':
      default:
        return '/round-1';
    }
  };

  const getItemTypeBadge = (type) => {
    switch (type) {
      case 'coding_problem':
        return <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Coding Problem</span>;
      case 'study_note':
        return <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-purple-500/10 text-purple-400 border border-purple-500/20">Study Module</span>;
      case 'interview_question':
        return <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">Interview Question</span>;
      case 'question':
      default:
        return <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">Technical MCQ</span>;
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-1 text-xs font-semibold uppercase tracking-wider rounded-md bg-blue-500/10 text-blue-400 border border-blue-500/20">
              Personalized Collection
            </span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            My Saved Bookmarks
          </h1>
          <p className="text-slate-400 mt-1 max-w-3xl">
            Quick access to flagged MCQs, algorithmic challenges, study library notes, and interview answer scripts saved for focused revision.
          </p>
        </div>

        <div className="text-xs text-slate-400 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800">
          Total Bookmarks: <span className="text-white font-bold">{bookmarks.length}</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col md:flex-row md:items-center gap-4 justify-between">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search saved bookmarks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          {types.map((t) => (
            <button
              key={t}
              onClick={() => setFilterType(t)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                filterType === t
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                  : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {t === 'question' ? 'MCQs' : t === 'coding_problem' ? 'Coding' : t === 'interview_question' ? 'Interview' : t === 'study_note' ? 'Notes' : 'All'}
            </button>
          ))}
        </div>
      </div>

      {/* Bookmarks List */}
      {filteredBookmarks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredBookmarks.map((b) => (
            <div
              key={`${b.itemType}_${b.id}`}
              className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  {getItemTypeBadge(b.itemType)}
                  <span className="text-xs text-slate-400">
                    {b.category || 'General'}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white line-clamp-2">
                  {b.title || `Item ${b.id}`}
                </h3>
              </div>

              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                <button
                  onClick={() => removeBookmark(b.id, b.itemType)}
                  className="p-1.5 text-slate-500 hover:text-rose-400 rounded-lg hover:bg-slate-800 transition-colors"
                  title="Remove bookmark"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                <button
                  onClick={() => navigate(getItemLink(b))}
                  className="py-1.5 px-3.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-blue-600/20 transition-all"
                >
                  Open Item
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-12 rounded-2xl bg-slate-900/40 border border-slate-800 text-center space-y-4 max-w-md mx-auto">
          <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center mx-auto text-slate-400">
            <Bookmark className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">No Bookmarks Saved Yet</h3>
            <p className="text-xs text-slate-400 mt-1">
              Click the bookmark icon on any MCQ, coding problem, interview card, or study module to save it here for fast revision.
            </p>
          </div>
          <button
            onClick={() => navigate('/round-1')}
            className="py-2 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold inline-flex items-center gap-2"
          >
            Explore Question Bank
          </button>
        </div>
      )}
    </div>
  );
}
