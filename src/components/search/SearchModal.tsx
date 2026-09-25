import React, { useState, useEffect, useRef } from 'react';
import { useContinua } from '../../context/ContinuaContext';
import { 
  Search, 
  X, 
  MessageSquare, 
  FileText, 
  FolderKanban, 
  CheckCircle2, 
  PlugZap, 
  Repeat, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

export function SearchModal() {
  const { isSearchOpen, setIsSearchOpen, searchAcrossAll } = useContinua();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  const results = searchAcrossAll(query);

  const getResultIcon = (type: string) => {
    switch (type) {
      case 'decision': return <CheckCircle2 className="w-4 h-4 text-emerald-600" />;
      case 'conversation': return <MessageSquare className="w-4 h-4 text-blue-600" />;
      case 'file': return <FileText className="w-4 h-4 text-neutral-600" />;
      case 'project': return <FolderKanban className="w-4 h-4 text-purple-600" />;
      case 'connector': return <PlugZap className="w-4 h-4 text-amber-600" />;
      default: return <ShieldCheck className="w-4 h-4 text-neutral-500" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:pt-20 bg-neutral-900/50 backdrop-blur-xs">
      <div className="bg-white rounded-2xl border border-neutral-200 shadow-2xl max-w-2xl w-full overflow-hidden flex flex-col max-h-[80vh] animate-in fade-in zoom-in-95 duration-150">
        {/* Search Input Bar */}
        <div className="p-3.5 border-b border-neutral-200 flex items-center gap-3 bg-white">
          <Search className="w-4 h-4 text-neutral-400 shrink-0 ml-1" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search across conversations, decisions, files, and project memory..."
            className="flex-1 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none bg-transparent"
          />
          {query && (
            <button onClick={() => setQuery('')} className="p-1 text-neutral-400 hover:text-neutral-700">
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-neutral-100 text-neutral-500 border border-neutral-200 rounded shrink-0">
            ESC
          </kbd>
        </div>

        {/* Quick Sample Queries */}
        {!query && (
          <div className="p-4 bg-neutral-50/50 border-b border-neutral-100 text-xs">
            <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider block mb-2">
              Try searching:
            </span>
            <div className="flex flex-wrap gap-2">
              {['Why did we choose Firebase?', 'Recruiter Dashboard', 'Authentication', 'Resume format', 'placement-requirements.pdf'].map((tag) => (
                <button
                  key={tag}
                  onClick={() => setQuery(tag)}
                  className="px-2.5 py-1 bg-white hover:bg-neutral-100 border border-neutral-200 rounded-md text-neutral-700 text-xs transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results List */}
        <div className="overflow-y-auto p-2 divide-y divide-neutral-100">
          {query && results.length === 0 && (
            <div className="p-8 text-center text-xs text-neutral-400">
              No matching decisions, conversations, or files found for "{query}".
            </div>
          )}

          {results.map((res) => (
            <div
              key={res.id}
              onClick={res.action}
              className="p-3 hover:bg-neutral-50 rounded-xl transition-colors cursor-pointer flex items-start justify-between gap-3 text-xs group"
            >
              <div className="flex items-start gap-3 min-w-0">
                <div className="p-1.5 bg-neutral-100 rounded-lg shrink-0 mt-0.5">
                  {getResultIcon(res.type)}
                </div>
                <div className="min-w-0">
                  <h4 className="font-semibold text-neutral-900 group-hover:text-neutral-950 truncate">
                    {res.title}
                  </h4>
                  <p className="text-neutral-600 line-clamp-1 mt-0.5">
                    {res.snippet}
                  </p>
                  <span className="text-[11px] text-neutral-400 font-mono mt-1 block">
                    {res.sourceLabel}
                  </span>
                </div>
              </div>

              <ArrowRight className="w-3.5 h-3.5 text-neutral-300 group-hover:text-neutral-900 shrink-0 self-center transition-colors" />
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-neutral-100 bg-neutral-50/70 text-[11px] text-neutral-400 flex items-center justify-between">
          <span>Search across 4 projects · 12 decisions · 10 files · 14 repo items</span>
          <button onClick={() => setIsSearchOpen(false)} className="hover:text-neutral-700">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
