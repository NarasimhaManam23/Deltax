import React from 'react';
import { Target, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function WeakTopicBanner({ weakTopic }) {
  if (!weakTopic) return null;

  return (
    <div className="relative overflow-hidden rounded-2xl p-4 sm:p-5 bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-red-500/10 border border-amber-500/30 shadow-lg">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="p-2.5 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400 shrink-0">
            <Target className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Weak Area Detected</span>
              <span className="text-xs text-slate-400 font-mono">• {weakTopic.subject}</span>
            </div>
            <h3 className="text-base font-bold text-white mt-0.5">
              Focus Next: {weakTopic.topic}
            </h3>
            <p className="text-xs text-slate-300 mt-1 max-w-xl">
              {weakTopic.recommendation}
            </p>
          </div>
        </div>

        <Link
          to={`/round-1?subject=${encodeURIComponent(weakTopic.subject)}&practice=weak`}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-xs transition-all shadow-md hover:shadow-amber-500/20 shrink-0"
        >
          <span>Practice This Area</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
