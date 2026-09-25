import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import { Code2, RotateCcw } from 'lucide-react';

export default function CodeEditor({
  code,
  onChange,
  language = 'python',
  onReset,
  height = '500px',
  readOnly = false
}) {
  const [hasMonacoError, setHasMonacoError] = useState(false);

  const monacoLanguage = language === 'java' ? 'java' : 'python';

  return (
    <div className="flex flex-col h-full rounded-2xl overflow-hidden border border-slate-800 bg-[#090d16] shadow-2xl">
      {/* Editor Header Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900/90 border-b border-slate-800 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <Code2 className="w-4 h-4 text-brand-400" />
          <span className="font-mono font-medium text-slate-200 uppercase">{language}</span>
          <span className="text-[11px] text-slate-500">• 4 spaces indent</span>
        </div>
        {onReset && (
          <button
            onClick={onReset}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title="Reset code to starter template"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        )}
      </div>

      {/* Editor Body */}
      <div className="flex-1 min-h-[350px]">
        {!hasMonacoError ? (
          <Editor
            height={height}
            language={monacoLanguage}
            value={code}
            onChange={(val) => onChange && onChange(val || '')}
            theme="vs-dark"
            loading={
              <div className="h-full flex items-center justify-center text-xs text-slate-500 font-mono">
                Initializing code environment...
              </div>
            }
            onMount={() => setHasMonacoError(false)}
            options={{
              fontSize: 14,
              fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
              automaticLayout: true,
              tabSize: 4,
              lineNumbers: 'on',
              renderWhitespace: 'selection',
              readOnly: readOnly,
              padding: { top: 12, bottom: 12 },
              lineHeight: 22,
            }}
          />
        ) : (
          <textarea
            value={code}
            onChange={(e) => onChange && onChange(e.target.value)}
            className="w-full h-full p-4 font-mono text-sm bg-slate-950 text-slate-200 resize-none focus:outline-none"
            spellCheck="false"
            readOnly={readOnly}
          />
        )}
      </div>
    </div>
  );
}
