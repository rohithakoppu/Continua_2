import React, { useState } from 'react';
import { useContinua } from '../../context/ContinuaContext';
import { Connector } from '../../types';
import { 
  Github, 
  HardDrive, 
  Calendar, 
  MessageSquare, 
  FileText, 
  Layers, 
  Box, 
  Check, 
  X, 
  ShieldCheck, 
  Lock, 
  ExternalLink, 
  Cpu,
  RefreshCw,
  Search
} from 'lucide-react';

export function ConnectorsView() {
  const { connectors, connectConnector, disconnectConnector, toggleConnectorPermission } = useContinua();

  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [authorizingConnector, setAuthorizingConnector] = useState<Connector | null>(null);
  const [managingConnector, setManagingConnector] = useState<Connector | null>(null);
  const [testResult, setTestResult] = useState<{ id: string; message: string } | null>(null);

  const categories = ['All', 'Development', 'Cloud Storage', 'Productivity', 'Communication', 'Design'];

  const filteredConnectors = activeCategory === 'All' 
    ? connectors 
    : connectors.filter(c => c.category === activeCategory);

  const getIcon = (id: string) => {
    switch (id) {
      case 'github': return <Github className="w-6 h-6 text-neutral-900" />;
      case 'gdrive': return <HardDrive className="w-6 h-6 text-blue-600" />;
      case 'gcalendar': return <Calendar className="w-6 h-6 text-neutral-800" />;
      case 'slack': return <MessageSquare className="w-6 h-6 text-emerald-600" />;
      case 'notion': return <FileText className="w-6 h-6 text-neutral-900" />;
      case 'figma': return <Layers className="w-6 h-6 text-purple-600" />;
      case 'dropbox': return <Box className="w-6 h-6 text-blue-700" />;
      default: return <Cpu className="w-6 h-6 text-neutral-600" />;
    }
  };

  const handleTestConnection = (c: Connector) => {
    setTestResult({
      id: c.id,
      message: `Verified latency 24ms. ${c.demoItemsCount || 0} active context resources reachable.`
    });
    setTimeout(() => setTestResult(null), 4000);
  };

  return (
    <div className="flex-1 overflow-y-auto bg-[#fafafa] p-6 lg:p-10 space-y-8 max-w-7xl mx-auto w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-200/80">
        <div>
          <h1 className="text-xl font-bold text-neutral-900 tracking-tight">
            Connect Your Work
          </h1>
          <p className="text-xs text-neutral-500 mt-1">
            Bring your tools, files, and project context together into CONTINUA's permanent memory.
          </p>
        </div>

        {/* Category Filter */}
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

      {/* Connectors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredConnectors.map((c) => {
          const isConnected = c.status === 'connected';

          return (
            <div
              key={c.id}
              className="bg-white border border-neutral-200/90 rounded-xl p-5 hover:border-neutral-300 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Header Row */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="p-2.5 bg-neutral-50 rounded-lg border border-neutral-200/70">
                    {getIcon(c.id)}
                  </div>
                  <span className={`text-[11px] font-semibold px-2 py-0.5 rounded ${
                    isConnected 
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' 
                      : 'bg-neutral-100 text-neutral-500 border border-neutral-200'
                  }`}>
                    {isConnected ? 'CONNECTED' : 'DISCONNECTED'}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-neutral-900 leading-snug">
                  {c.name}
                </h3>
                <p className="text-xs text-neutral-500 mt-1 mb-3 leading-relaxed">
                  {c.description}
                </p>

                {/* Capabilities list */}
                <div className="space-y-1 mb-4">
                  {c.capabilities.map((cap, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-neutral-600">
                      <Check className="w-3 h-3 text-neutral-400 shrink-0" />
                      <span>{cap}</span>
                    </div>
                  ))}
                </div>

                {/* Connected Details if active */}
                {isConnected && (
                  <div className="p-2.5 bg-neutral-50 rounded-lg border border-neutral-200/60 text-xs mb-4 space-y-1">
                    <p className="text-[11px] text-neutral-500 font-medium">Connected as:</p>
                    <p className="font-semibold text-neutral-900 truncate">{c.connectedAs}</p>
                    {c.demoItemsCount && (
                      <p className="text-[11px] text-neutral-600">
                        {c.demoItemsCount} items synced into memory
                      </p>
                    )}
                  </div>
                )}

                {testResult?.id === c.id && (
                  <div className="mb-3 p-2 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded text-[11px]">
                    {testResult.message}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-neutral-100 flex items-center justify-between gap-2">
                {isConnected ? (
                  <>
                    <button
                      onClick={() => setManagingConnector(c)}
                      className="px-3 py-1.5 text-xs font-medium text-neutral-700 hover:text-neutral-900 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors"
                    >
                      Manage
                    </button>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleTestConnection(c)}
                        className="p-1.5 text-neutral-500 hover:text-neutral-800 rounded hover:bg-neutral-100 transition-colors"
                        title="Test connection"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => disconnectConnector(c.id)}
                        className="px-2.5 py-1.5 text-xs font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        Disconnect
                      </button>
                    </div>
                  </>
                ) : (
                  <button
                    onClick={() => setAuthorizingConnector(c)}
                    className="w-full py-2 px-3 text-xs font-semibold text-white bg-neutral-900 hover:bg-neutral-800 rounded-lg transition-colors text-center"
                  >
                    Connect {c.name}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* AUTHORIZATION MODAL (Demo OAuth) */}
      {authorizingConnector && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl border border-neutral-200 max-w-md w-full p-6 space-y-5 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-neutral-100 rounded-lg">
                  {getIcon(authorizingConnector.id)}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-neutral-900">
                    Connect {authorizingConnector.name}
                  </h3>
                  <p className="text-[11px] text-neutral-500">
                    CONTINUA Demo Authorization
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setAuthorizingConnector(null)}
                className="text-neutral-400 hover:text-neutral-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <p className="text-neutral-600">
                CONTINUA requests permission to read project artifacts for cross-AI continuity:
              </p>
              <div className="p-3 bg-neutral-50 border border-neutral-200/80 rounded-xl space-y-2">
                {authorizingConnector.permissions.map((p) => (
                  <div key={p.id} className="flex items-center gap-2 text-neutral-800">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{p.name}</span>
                  </div>
                ))}
              </div>
              <p className="text-[11px] text-neutral-400">
                🔒 Safe Demo Mode: No real passwords, secrets, or API tokens are requested or stored.
              </p>
            </div>

            <div className="pt-2 flex items-center justify-end gap-2">
              <button
                onClick={() => setAuthorizingConnector(null)}
                className="px-4 py-2 text-xs font-medium text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  connectConnector(authorizingConnector.id);
                  setAuthorizingConnector(null);
                }}
                className="px-4 py-2 text-xs font-bold text-white bg-neutral-900 hover:bg-neutral-800 rounded-lg shadow-xs transition-colors"
              >
                Authorize Demo Connection
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MANAGE CONNECTOR MODAL */}
      {managingConnector && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl border border-neutral-200 max-w-lg w-full p-6 space-y-5 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-neutral-100 rounded-lg">
                  {getIcon(managingConnector.id)}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-neutral-900">
                    Manage {managingConnector.name}
                  </h3>
                  <p className="text-[11px] text-emerald-700 font-medium">
                    Connected as {managingConnector.connectedAs}
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setManagingConnector(null)}
                className="text-neutral-400 hover:text-neutral-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <h4 className="font-semibold text-neutral-900 mb-2">Permissions & Scope</h4>
                <div className="space-y-2 border border-neutral-200 rounded-xl p-3 bg-neutral-50/50">
                  {managingConnector.permissions.map((perm) => (
                    <label key={perm.id} className="flex items-center justify-between cursor-pointer">
                      <span className="text-neutral-800">{perm.name}</span>
                      <input
                        type="checkbox"
                        checked={perm.granted}
                        onChange={() => toggleConnectorPermission(managingConnector.id, perm.id)}
                        className="rounded border-neutral-300 text-neutral-900 focus:ring-0"
                      />
                    </label>
                  ))}
                </div>
              </div>

              {/* Demo Resources List */}
              {managingConnector.demoFiles && (
                <div>
                  <h4 className="font-semibold text-neutral-900 mb-2">Synced Resources in Memory</h4>
                  <div className="divide-y divide-neutral-100 border border-neutral-200 rounded-xl overflow-hidden bg-white max-h-40 overflow-y-auto">
                    {managingConnector.demoFiles.map((f, idx) => (
                      <div key={idx} className="p-2.5 flex items-center justify-between text-[11px]">
                        <span className="font-medium text-neutral-900 font-mono">{f.name}</span>
                        <span className="text-neutral-500">{f.details}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {managingConnector.demoEvents && (
                <div>
                  <h4 className="font-semibold text-neutral-900 mb-2">Synced Calendar Milestones</h4>
                  <div className="divide-y divide-neutral-100 border border-neutral-200 rounded-xl overflow-hidden bg-white">
                    {managingConnector.demoEvents.map((e, idx) => (
                      <div key={idx} className="p-2.5 flex items-center justify-between text-[11px]">
                        <span className="font-semibold text-neutral-900">{e.title}</span>
                        <span className="text-neutral-500">{e.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="pt-2 flex items-center justify-end">
              <button
                onClick={() => setManagingConnector(null)}
                className="px-4 py-2 text-xs font-bold text-white bg-neutral-900 hover:bg-neutral-800 rounded-lg transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
