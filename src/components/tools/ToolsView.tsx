import React, { useState } from 'react';
import { useContinua } from '../../context/ContinuaContext';
import { 
  Code, 
  FileSearch, 
  Sparkles, 
  Mic, 
  CalendarCheck, 
  Database, 
  Eye, 
  Check, 
  Download, 
  ArrowRight,
  Wrench
} from 'lucide-react';

export function ToolsView() {
  const { tools, toggleToolInstalled, setCurrentView, setSelectedConversationId } = useContinua();
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Coding', 'Research', 'Productivity', 'Design', 'Data'];

  const filteredTools = activeCategory === 'All' 
    ? tools 
    : tools.filter(t => t.category === activeCategory);

  const getToolIcon = (id: string) => {
    switch (id) {
      case 'tool-code-analyzer': return <Code className="w-5 h-5 text-neutral-900" />;
      case 'tool-pdf-analyzer': return <FileSearch className="w-5 h-5 text-blue-600" />;
      case 'tool-research-assistant': return <Sparkles className="w-5 h-5 text-amber-600" />;
      case 'tool-meeting-summarizer': return <Mic className="w-5 h-5 text-emerald-600" />;
      case 'tool-project-planner': return <CalendarCheck className="w-5 h-5 text-purple-600" />;
      case 'tool-database-explorer': return <Database className="w-5 h-5 text-cyan-600" />;
      case 'tool-ui-critic': return <Eye className="w-5 h-5 text-rose-600" />;
      default: return <Wrench className="w-5 h-5 text-neutral-600" />;
    }
  };

  return (
    <div className="flex-1 overflow-y-auto bg-[#fafafa] p-6 lg:p-10 space-y-8 max-w-7xl mx-auto w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-200/80">
        <div>
          <h1 className="text-xl font-bold text-neutral-900 tracking-tight">
            Tools & Plugins Marketplace
          </h1>
          <p className="text-xs text-neutral-500 mt-1">
            Deterministic extensions that run in your AI chat and feed structured results directly into project memory.
          </p>
        </div>

        {/* Filter Segmented Control */}
        <div className="flex items-center gap-1 p-1 bg-neutral-200/60 rounded-lg overflow-x-auto text-xs self-start sm:self-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1 font-medium rounded-md whitespace-nowrap transition-colors ${
                activeCategory === cat
                  ? 'bg-white text-neutral-900 shadow-2xs font-semibold'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredTools.map((tool) => {
          return (
            <div
              key={tool.id}
              className="bg-white border border-neutral-200/90 rounded-xl p-5 hover:border-neutral-300 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="p-2.5 bg-neutral-50 rounded-lg border border-neutral-200/60">
                    {getToolIcon(tool.id)}
                  </div>
                  <span className="text-[11px] font-mono text-neutral-400">
                    v{tool.version}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-neutral-900 leading-snug">
                  {tool.name}
                </h3>
                <span className="text-[11px] text-neutral-400 block mb-2">
                  By {tool.author} · {tool.category}
                </span>

                <p className="text-xs text-neutral-600 mb-3 leading-relaxed">
                  {tool.description}
                </p>

                <div className="space-y-1 mb-4">
                  {tool.capabilities.map((cap, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-xs text-neutral-500">
                      <Check className="w-3 h-3 text-neutral-400 shrink-0" />
                      <span>{cap}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action */}
              <div className="pt-3 border-t border-neutral-100 flex items-center justify-between">
                <button
                  onClick={() => toggleToolInstalled(tool.id)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
                    tool.installed
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-red-50 hover:text-red-700 hover:border-red-200'
                      : 'bg-neutral-900 text-white hover:bg-neutral-800'
                  }`}
                >
                  {tool.installed ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Installed</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-3.5 h-3.5" />
                      <span>Install Tool</span>
                    </>
                  )}
                </button>

                {tool.installed && (
                  <button
                    onClick={() => {
                      setSelectedConversationId('conv-placement-1');
                      setCurrentView('chat');
                    }}
                    className="text-xs font-medium text-neutral-600 hover:text-neutral-900 flex items-center gap-1"
                  >
                    <span>Try in Chat</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
