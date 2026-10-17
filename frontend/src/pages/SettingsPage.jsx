import React, { useState } from 'react';
import { 
  Settings, User, Download, Upload, Copy, Check, Moon, Sun, Monitor,
  AlertTriangle, Shield, CheckCircle2, RotateCcw, FileText, Database
} from 'lucide-react';
import { useLearner } from '../context/LearnerContext';
import { exportProgress, importProgress } from '../api';

export default function SettingsPage() {
  const { learnerId, resetLearner, theme, setTheme, refreshDashboard } = useLearner();
  const [copied, setCopied] = useState(false);
  const [importStatus, setImportStatus] = useState(null);
  const [isExporting, setIsExporting] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const handleCopyUUID = () => {
    navigator.clipboard.writeText(learnerId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExport = async () => {
    setIsExporting(true);
    try {
      const data = await exportProgress();
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `firstlabs_fed2026_progress_${new Date().toISOString().slice(0, 10)}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (e) {
      // Fallback: export local storage data
      const localData = {
        learner_id: learnerId,
        exported_at: new Date().toISOString(),
        tasks: JSON.parse(localStorage.getItem('deltax_completed_tasks') || '{}'),
        bookmarks: JSON.parse(localStorage.getItem('deltax_bookmarks') || '[]'),
      };
      const blob = new Blob([JSON.stringify(localData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `firstlabs_fed2026_local_backup_${new Date().toISOString().slice(0, 10)}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } finally {
      setIsExporting(false);
    }
  };

  const handleImportFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsImporting(true);
    setImportStatus(null);
    try {
      const text = await file.text();
      const parsed = JSON.parse(text);
      await importProgress(parsed);
      setImportStatus({ success: true, message: 'Progress imported successfully! Refreshed stats.' });
      refreshDashboard();
    } catch (err) {
      setImportStatus({ success: false, message: 'Failed to import backup file. Ensure it is valid FirstLabs JSON.' });
    } finally {
      setIsImporting(false);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn max-w-4xl">
      {/* Header */}
      <div className="pb-6 border-b border-slate-800">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-2.5 py-1 text-xs font-semibold uppercase tracking-wider rounded-md bg-blue-500/10 text-blue-400 border border-blue-500/20">
            System Preferences
          </span>
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          Settings & Data Management
        </h1>
        <p className="text-slate-400 mt-1">
          Manage your anonymous learner profile, export your progress for safekeeping, and configure application themes.
        </p>
      </div>

      {/* ANONYMOUS LEARNER ID SECTION */}
      <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
        <div className="flex items-center gap-2 text-white font-bold text-lg">
          <Shield className="w-5 h-5 text-blue-400" />
          Anonymous Learner Profile
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          Your preparation progress is saved anonymously on this browser using a cryptographic UUID. No personal information, password, or third-party tracking is ever required.
        </p>

        <div className="flex flex-col sm:flex-row sm:items-center gap-3 pt-2">
          <div className="flex-1 font-mono text-xs text-blue-300 bg-slate-950 p-3 rounded-xl border border-slate-800 truncate select-all">
            {learnerId}
          </div>
          <button
            onClick={handleCopyUUID}
            className="py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shrink-0"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied UUID' : 'Copy Learner ID'}
          </button>
        </div>
      </div>

      {/* EXPORT & IMPORT PROGRESS */}
      <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-6">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Database className="w-5 h-5 text-purple-400" />
            Backup & Restore Progress
          </h2>
          <p className="text-xs text-slate-400 mt-1 leading-relaxed">
            Preserve your test attempts, accuracy history, coding solutions, and daily checklist across devices or browser cache clearing.
          </p>
        </div>

        {importStatus && (
          <div className={`p-3 rounded-xl text-xs flex items-center gap-2 ${
            importStatus.success
              ? 'bg-emerald-950/30 border border-emerald-500/30 text-emerald-300'
              : 'bg-rose-950/30 border border-rose-500/30 text-rose-300'
          }`}>
            {importStatus.success ? <CheckCircle2 className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
            <span>{importStatus.message}</span>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Export Card */}
          <div className="p-5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-3 flex flex-col justify-between">
            <div>
              <div className="text-sm font-bold text-white flex items-center gap-2">
                <Download className="w-4 h-4 text-emerald-400" />
                Export Progress
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Download a JSON snapshot of all your quiz answers, streaks, coding attempts, and bookmarks.
              </p>
            </div>
            <button
              onClick={handleExport}
              disabled={isExporting}
              className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20 transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              {isExporting ? 'Exporting...' : 'Download Progress JSON'}
            </button>
          </div>

          {/* Import Card */}
          <div className="p-5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-3 flex flex-col justify-between">
            <div>
              <div className="text-sm font-bold text-white flex items-center gap-2">
                <Upload className="w-4 h-4 text-blue-400" />
                Import Progress
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Restore your previous preparation history from a saved backup file.
              </p>
            </div>
            <label className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-md shadow-blue-600/20 transition-all cursor-pointer text-center">
              <Upload className="w-3.5 h-3.5" />
              <span>{isImporting ? 'Importing...' : 'Upload Backup JSON'}</span>
              <input
                type="file"
                accept=".json"
                onChange={handleImportFile}
                className="hidden"
              />
            </label>
          </div>
        </div>
      </div>

      {/* THEME PREFERENCE */}
      <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
        <div>
          <h2 className="text-lg font-bold text-white">Appearance & Theme</h2>
          <p className="text-xs text-slate-400 mt-1">
            Choose your preferred color theme. Dark mode is optimized for high-intensity night coding.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {[
            { id: 'dark', label: 'Dark Mode', icon: Moon },
            { id: 'light', label: 'Light Mode', icon: Sun },
            { id: 'system', label: 'System Default', icon: Monitor },
          ].map((item) => {
            const Icon = item.icon;
            const isSelected = theme === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setTheme(item.id)}
                className={`p-3.5 rounded-xl border text-center flex flex-col items-center gap-2 transition-all ${
                  isSelected
                    ? 'bg-blue-600 text-white border-blue-500 shadow-md shadow-blue-600/25'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-xs font-semibold">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* DANGER ZONE */}
      <div className="p-6 rounded-2xl bg-rose-950/20 border border-rose-500/20 space-y-4">
        <div className="flex items-center gap-2 text-rose-300 font-bold text-lg">
          <AlertTriangle className="w-5 h-5 text-rose-400" />
          Danger Zone
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">
          Resetting your profile will generate a brand new anonymous learner UUID and clear your local attempt logs, daily task completions, and saved bookmarks.
        </p>

        {!showResetConfirm ? (
          <button
            onClick={() => setShowResetConfirm(true)}
            className="py-2.5 px-4 rounded-xl bg-rose-600/20 hover:bg-rose-600 text-rose-300 hover:text-white border border-rose-500/40 text-xs font-semibold flex items-center gap-2 transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset Local Progress
          </button>
        ) : (
          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={() => {
                resetLearner();
                setShowResetConfirm(false);
              }}
              className="py-2 px-4 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition-all shadow-md shadow-rose-600/30"
            >
              Confirm Complete Reset
            </button>
            <button
              onClick={() => setShowResetConfirm(false)}
              className="py-2 px-4 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-700"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
