import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Copy, Check } from 'lucide-react';

export default function MarkdownViewer({ content }) {
  if (!content) return null;

  return (
    <div className="prose prose-invert prose-brand max-w-none text-slate-300 text-sm leading-relaxed space-y-4">
      <ReactMarkdown
        components={{
          h1: ({ node, ...props }) => (
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-8 mb-4 border-b border-slate-800 pb-3" {...props} />
          ),
          h2: ({ node, ...props }) => (
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-6 mb-3 border-b border-slate-800/60 pb-2" {...props} />
          ),
          h3: ({ node, ...props }) => (
            <h3 className="text-lg font-semibold text-brand-300 mt-5 mb-2" {...props} />
          ),
          h4: ({ node, ...props }) => (
            <h4 className="text-base font-semibold text-slate-200 mt-4 mb-1" {...props} />
          ),
          p: ({ node, ...props }) => (
            <p className="my-2.5 leading-relaxed text-slate-300" {...props} />
          ),
          ul: ({ node, ...props }) => (
            <ul className="list-disc list-inside space-y-1 my-3 pl-2 text-slate-300" {...props} />
          ),
          ol: ({ node, ...props }) => (
            <ol className="list-decimal list-inside space-y-1 my-3 pl-2 text-slate-300" {...props} />
          ),
          li: ({ node, ...props }) => (
            <li className="leading-relaxed" {...props} />
          ),
          table: ({ node, ...props }) => (
            <div className="overflow-x-auto my-4 border border-slate-800 rounded-xl">
              <table className="min-w-full divide-y divide-slate-800 text-left text-xs" {...props} />
            </div>
          ),
          th: ({ node, ...props }) => (
            <th className="px-4 py-2.5 bg-slate-900/90 font-semibold text-slate-200 uppercase tracking-wider" {...props} />
          ),
          td: ({ node, ...props }) => (
            <td className="px-4 py-2.5 border-t border-slate-800/60 text-slate-300" {...props} />
          ),
          blockquote: ({ node, ...props }) => (
            <blockquote className="border-l-4 border-brand-500 bg-brand-500/5 px-4 py-3 rounded-r-xl my-4 italic text-slate-300" {...props} />
          ),
          code: ({ node, inline, className, children, ...props }) => {
            const match = /language-(\w+)/.exec(className || '');
            const lang = match ? match[1] : '';
            const codeString = String(children).replace(/\n$/, '');

            if (!inline) {
              return <CodeBlock code={codeString} language={lang} />;
            }

            return (
              <code className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700/60 font-mono text-xs text-brand-300" {...props}>
                {children}
              </code>
            );
          }
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

function CodeBlock({ code, language }) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative my-4 rounded-xl overflow-hidden border border-slate-800 bg-[#0d1322] shadow-xl">
      <div className="flex items-center justify-between px-4 py-2 bg-slate-900/80 border-b border-slate-800/80 text-xs font-mono text-slate-400">
        <span>{language || 'code'}</span>
        <button
          onClick={copyToClipboard}
          className="flex items-center gap-1.5 hover:text-white transition-colors py-0.5 px-2 rounded hover:bg-slate-800"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? 'Copied!' : 'Copy'}</span>
        </button>
      </div>
      <pre className="p-4 overflow-x-auto text-xs sm:text-sm font-mono text-slate-200 leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  );
}
