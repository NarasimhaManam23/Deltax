import React, { useState, useEffect } from 'react';
import { Clock, Calendar } from 'lucide-react';

export default function CountdownTimer({ targetDate = '2026-09-29T10:00:00', compact = false }) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const target = new Date(targetDate).getTime();
    const now = new Date().getTime();
    const difference = target - now;

    if (difference <= 0) {
      return { isDriveDay: true, days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      isDriveDay: false,
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  if (timeLeft.isDriveDay) {
    return (
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 font-semibold animate-pulse text-sm">
        <Calendar className="w-4 h-4" />
        <span>TODAY IS DRIVE DAY! ⚡</span>
      </div>
    );
  }

  if (compact) {
    return (
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 font-mono text-xs font-medium">
        <Clock className="w-3.5 h-3.5" />
        <span>{timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s to Drive</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 sm:gap-3 text-center">
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-2.5 sm:p-3 min-w-[65px] sm:min-w-[75px] shadow-lg shadow-black/40">
        <span className="block text-xl sm:text-2xl font-extrabold text-white font-mono">{timeLeft.days}</span>
        <span className="text-[10px] sm:text-xs uppercase tracking-wider text-slate-400 font-semibold">Days</span>
      </div>
      <span className="text-xl font-bold text-slate-600">:</span>
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-2.5 sm:p-3 min-w-[65px] sm:min-w-[75px] shadow-lg shadow-black/40">
        <span className="block text-xl sm:text-2xl font-extrabold text-white font-mono">{String(timeLeft.hours).padStart(2, '0')}</span>
        <span className="text-[10px] sm:text-xs uppercase tracking-wider text-slate-400 font-semibold">Hours</span>
      </div>
      <span className="text-xl font-bold text-slate-600">:</span>
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-2.5 sm:p-3 min-w-[65px] sm:min-w-[75px] shadow-lg shadow-black/40">
        <span className="block text-xl sm:text-2xl font-extrabold text-white font-mono">{String(timeLeft.minutes).padStart(2, '0')}</span>
        <span className="text-[10px] sm:text-xs uppercase tracking-wider text-slate-400 font-semibold">Mins</span>
      </div>
      <span className="text-xl font-bold text-slate-600">:</span>
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-2.5 sm:p-3 min-w-[65px] sm:min-w-[75px] shadow-lg shadow-black/40">
        <span className="block text-xl sm:text-2xl font-extrabold text-brand-400 font-mono">{String(timeLeft.seconds).padStart(2, '0')}</span>
        <span className="text-[10px] sm:text-xs uppercase tracking-wider text-slate-400 font-semibold">Secs</span>
      </div>
    </div>
  );
}
