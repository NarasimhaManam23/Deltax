import React, { useState, useEffect, useRef } from 'react';
import { Search, X, BookOpen, Code, MessageSquare, HelpCircle, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api';

export default function GlobalSearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
      setResults([]);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim() || query.length < 2) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const data = await api.search(query);
        setResults(data.results || []);
      } catch (err) {
        console.error('Search failed:', err);
      } finally {
        setLoading(false);
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [query]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        isOpen ? onClose() : null; // Toggle in layout
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSelect = (link) => {
    navigate(link);
    onClose();
  };

  const getIcon = (type) => {
    switch (type) {
      case 'question': return <HelpCircle className="w-4 h-4 text-emerald-400" />;
      case 'coding': return <Code className="w-4 h-4 text-brand-400" />;
      case 'interview': return <MessageSquare className="w-4 h-4 text-amber-400" />;
      default: return <BookOpen className="w-4 h-4 text-purple-400" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden glass-panel-glow"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-slate-800">
          <Search className="w-5 h-5 text-slate-400" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search MCQs, coding problems, interview Qs, cheat sheets (e.g., 'TCP', 'Prefix Sum')..."
            className="flex-1 bg-transparent text-white placeholder-slate-500 text-sm focus:outline-none"
          />
          {query && (
            <button onClick={() => setQuery('')} className="p-1 hover:bg-slate-800 rounded-lg text-slate-400">
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block px-2 py-0.5 text-[11px] font-mono font-medium text-slate-400 bg-slate-800 border border-slate-700 rounded-md">
            ESC
          </kbd>
        </div>

        {/* Search Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-2 space-y-1">
          {loading && (
            <div className="p-8 text-center text-sm text-slate-400">
              Searching knowledge repository...
            </div>
          )}

          {!loading && query && results.length === 0 && (
            <div className="p-8 text-center text-sm text-slate-400">
              No matching topics found for "<span className="text-white font-medium">{query}</span>"
            </div>
          )}

          {!loading && results.map((item, idx) => (
            <button
              key={idx}
              onClick={() => handleSelect(item.link)}
              className="w-full flex items-start gap-3 p-3 rounded-xl hover:bg-slate-800/80 text-left transition-all group"
            >
              <div className="p-2 rounded-lg bg-slate-800 border border-slate-700/60 mt-0.5 group-hover:border-brand-500/40">
                {getIcon(item.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-semibold text-white truncate group-hover:text-brand-400">
                    {item.title}
                  </h4>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                    {item.type}
                  </span>
                </div>
                <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">
                  {item.snippet}
                </p>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity self-center" />
            </button>
          ))}

          {!query && (
            <div className="p-6 text-center text-xs text-slate-500">
              Type at least 2 characters to search across 550+ MCQs, 140+ coding challenges, and 290+ interview questions.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
