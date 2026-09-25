import React, { useState, useEffect } from 'react';
import { Timer, AlertTriangle } from 'lucide-react';

export default function TestTimer({ initialMinutes = 45, onExpire, quizId = 'default' }) {
  const storageKey = `deltax_active_timer_${quizId}`;

  const [secondsRemaining, setSecondsRemaining] = useState(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      const parsed = parseInt(saved, 10);
      if (!isNaN(parsed) && parsed > 0) return parsed;
    }
    return initialMinutes * 60;
  });

  const [warningMessage, setWarningMessage] = useState(null);

  useEffect(() => {
    if (secondsRemaining <= 0) {
      localStorage.removeItem(storageKey);
      if (onExpire) onExpire();
      return;
    }

    const interval = setInterval(() => {
      setSecondsRemaining(prev => {
        const next = prev - 1;
        localStorage.setItem(storageKey, next.toString());

        // Warnings at specific thresholds
        if (next === 600) setWarningMessage('10 Minutes Remaining! Keep up your pace.');
        else if (next === 300) setWarningMessage('5 Minutes Remaining! Review flagged questions.');
        else if (next === 60) setWarningMessage('1 Minute Remaining! Test will auto-submit.');

        return next;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [secondsRemaining, onExpire, storageKey]);

  // Dismiss warning after 5 seconds
  useEffect(() => {
    if (warningMessage) {
      const t = setTimeout(() => setWarningMessage(null), 5000);
      return () => clearTimeout(t);
    }
  }, [warningMessage]);

  const mins = Math.floor(secondsRemaining / 60);
  const secs = secondsRemaining % 60;

  // Visual urgency styling
  let colorClasses = 'text-white bg-slate-900 border-slate-700';
  if (secondsRemaining < 60) {
    colorClasses = 'text-red-400 bg-red-950/40 border-red-500/60 animate-pulse';
  } else if (secondsRemaining < 300) {
    colorClasses = 'text-amber-400 bg-amber-950/40 border-amber-500/50';
  } else if (secondsRemaining < 600) {
    colorClasses = 'text-yellow-400 bg-yellow-950/30 border-yellow-500/40';
  }

  return (
    <div className="relative">
      <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-sm font-mono font-bold shadow-md transition-all ${colorClasses}`}>
        <Timer className="w-4 h-4" />
        <span>{String(mins).padStart(2, '0')}:{String(secs).padStart(2, '0')}</span>
      </div>

      {warningMessage && (
        <div className="absolute top-12 right-0 z-50 flex items-center gap-2 px-3.5 py-2 rounded-xl bg-amber-500/90 text-slate-950 font-semibold text-xs shadow-xl backdrop-blur-md animate-in slide-in-from-top-2 duration-200">
          <AlertTriangle className="w-4 h-4" />
          <span>{warningMessage}</span>
        </div>
      )}
    </div>
  );
}
