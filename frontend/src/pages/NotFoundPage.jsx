import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HelpCircle, ArrowLeft, Home, BookOpen, Terminal } from 'lucide-react';

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-6 space-y-6">
      <div className="w-20 h-20 rounded-3xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shadow-2xl shadow-blue-500/10">
        <HelpCircle className="w-10 h-10" />
      </div>

      <div className="space-y-2">
        <span className="font-mono text-xs font-bold text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
          HTTP 404 — PAGE NOT FOUND
        </span>
        <h1 className="text-3xl font-extrabold text-white">
          Syllabus Route Undefined
        </h1>
        <p className="text-slate-400 text-sm max-w-md mx-auto">
          The module or resource you requested is not in the DeltaX Associate Product Engineer 2027 preparation index.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
        <button
          onClick={() => navigate('/dashboard')}
          className="py-2.5 px-5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-2 shadow-lg shadow-blue-600/25 transition-all"
        >
          <Home className="w-4 h-4" />
          Go to Dashboard
        </button>
        <button
          onClick={() => navigate(-1)}
          className="py-2.5 px-5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-2 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          Go Back
        </button>
      </div>
    </div>
  );
}
