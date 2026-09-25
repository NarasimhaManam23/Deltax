import React, { useState } from 'react';
import { 
  FileText, Printer, Copy, Check, Sparkles, BookOpen, Layers,
  Terminal, Shield, Award, CheckCircle2
} from 'lucide-react';
import cheatsheetsData from '../data/cheatsheets.json';
import MarkdownViewer from '../components/MarkdownViewer';

export default function CheatSheetsPage() {
  const [selectedSheet, setSelectedSheet] = useState(cheatsheetsData[0]);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(selectedSheet.content_markdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-1 text-xs font-semibold uppercase tracking-wider rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/20">
              High-Density Revision
            </span>
            <span className="px-2.5 py-1 text-xs font-semibold uppercase tracking-wider rounded-md bg-blue-500/10 text-blue-400 border border-blue-500/20">
              3 Master Cards • 20 Rapid Sheets
            </span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            DeltaX High-Impact Cheat Sheets
          </h1>
          <p className="text-slate-400 mt-1 max-w-3xl">
            Distilled, rapid-revision cheat sheets for last-minute review of algorithmic complexities, 8085 flags, SQL joins, networking handshakes, and interview answer scripts.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="py-2 px-3.5 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-2 transition-all"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copied' : 'Copy Markdown'}
          </button>

          <button
            onClick={handlePrint}
            className="py-2 px-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-2 shadow-lg shadow-blue-600/20 transition-all"
          >
            <Printer className="w-4 h-4" />
            Print / PDF
          </button>
        </div>
      </div>

      {/* 3 Master Cards Selector */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {cheatsheetsData.map((sheet) => {
          const isSelected = selectedSheet.id === sheet.id;
          return (
            <button
              key={sheet.id}
              onClick={() => setSelectedSheet(sheet)}
              className={`p-5 rounded-2xl text-left border transition-all duration-200 ${
                isSelected
                  ? 'bg-blue-950/40 border-blue-500/50 shadow-xl shadow-blue-500/10 text-white'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
              }`}
            >
              <div className="text-xs uppercase font-bold text-blue-400">Master Sheet Card</div>
              <div className="text-lg font-bold text-white mt-1">{sheet.category}</div>
              <div className="text-xs text-slate-400 mt-2">
                {sheet.id === 'programming_and_dsa_cheatsheets' && '11 Rapid Sheets: Pointers, Big-O, Java/Python templates, DP'}
                {sheet.id === 'cs_fundamentals_cheatsheets' && '6 Rapid Sheets: OOP, DBMS, OS Deadlocks, OSI, 8085 Flags'}
                {sheet.id === 'interview_and_project_cheatsheets' && '3 Rapid Sheets: 4 Projects, Round 2 AI Voice, PADRE Defense'}
              </div>
            </button>
          );
        })}
      </div>

      {/* Sheet Content Viewer */}
      <div className="p-6 md:p-10 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-6">
        <div className="flex items-center justify-between pb-6 border-b border-slate-800">
          <div>
            <span className="text-xs font-mono font-bold text-blue-400 uppercase tracking-wider">
              HIGH-DENSITY REVISION CARD
            </span>
            <h2 className="text-2xl font-extrabold text-white mt-1">
              {selectedSheet.category} Master Sheet
            </h2>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            Printable & Offline Ready
          </span>
        </div>

        <div className="prose prose-invert max-w-none">
          <MarkdownViewer content={selectedSheet.content_markdown} />
        </div>
      </div>
    </div>
  );
}
