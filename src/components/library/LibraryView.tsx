import React, { useState } from 'react';
import { useContinua } from '../../context/ContinuaContext';
import { FileItem } from '../../types';
import { 
  FileText, 
  FileCode, 
  Table, 
  Image as ImageIcon, 
  Plus, 
  Search, 
  BookmarkPlus, 
  Github, 
  HardDrive, 
  Download, 
  Check,
  X,
  Eye,
  ShieldCheck
} from 'lucide-react';

export function LibraryView() {
  const { files, addFileToProjectMemory, uploadFileDemo, projects, setCurrentView, setSelectedConversationId } = useContinua();

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [memoryModalFile, setMemoryModalFile] = useState<FileItem | null>(null);
  const [memoryPurpose, setMemoryPurpose] = useState('');
  const [previewFile, setPreviewFile] = useState<FileItem | null>(null);

  const categories = [
    { id: 'all', label: 'All Files' },
    { id: 'document', label: 'Documents' },
    { id: 'code', label: 'Code' },
    { id: 'spreadsheet', label: 'Spreadsheets' },
    { id: 'memory', label: 'Memory Sources' }
  ];

  const filteredFiles = files.filter(f => {
    const matchesCat = activeCategory === 'all' 
      ? true 
      : activeCategory === 'memory' 
        ? f.isProjectMemorySource 
        : f.type === activeCategory;
    const matchesSearch = f.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      f.contentSnippet?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleSaveToMemory = () => {
    if (!memoryModalFile) return;
    addFileToProjectMemory(memoryModalFile.id, memoryPurpose || 'Essential project specification document.');
    setMemoryModalFile(null);
    setMemoryPurpose('');
  };

  const handleSimulateUpload = () => {
    const sampleNames = ['architecture-spec-v2.pdf', 'database-schema-draft.ts', 'rubric-matrix.csv'];
    const randomName = sampleNames[Math.floor(Math.random() * sampleNames.length)];
    const type = randomName.endsWith('.ts') ? 'code' : randomName.endsWith('.csv') ? 'spreadsheet' : 'document';
    uploadFileDemo(randomName, type);
  };

  return (
    <div className="flex-1 overflow-y-auto bg-[#fafafa] p-6 lg:p-10 space-y-6 max-w-7xl mx-auto w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-200/80">
        <div>
          <h1 className="text-xl font-bold text-neutral-900 tracking-tight">
            Library & Project Artifacts
          </h1>
          <p className="text-xs text-neutral-500 mt-1">
            Documents, code repositories, and specification files unified into CONTINUA's permanent context.
          </p>
        </div>

        <button
          onClick={handleSimulateUpload}
          className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-neutral-900 hover:bg-neutral-800 rounded-lg shadow-xs transition-colors self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Upload File</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Category Tabs */}
        <div className="flex items-center gap-1 p-1 bg-neutral-200/60 rounded-lg text-xs overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 py-1 font-medium rounded-md whitespace-nowrap transition-colors ${
                activeCategory === cat.id
                  ? 'bg-white text-neutral-900 shadow-2xs font-semibold'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-neutral-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter files..."
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-neutral-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-neutral-900"
          />
        </div>
      </div>

      {/* Files Table / List */}
      <div className="bg-white border border-neutral-200/90 rounded-xl overflow-hidden divide-y divide-neutral-100">
        <div className="bg-neutral-50/80 px-4 py-2.5 grid grid-cols-12 text-[11px] font-semibold uppercase tracking-wider text-neutral-600">
          <div className="col-span-5">Name</div>
          <div className="col-span-3">Project & Purpose</div>
          <div className="col-span-2">Source / Size</div>
          <div className="col-span-2 text-right">Actions</div>
        </div>

        {filteredFiles.map((file) => {
          return (
            <div
              key={file.id}
              className="px-4 py-3.5 grid grid-cols-12 items-center text-xs hover:bg-neutral-50/60 transition-colors"
            >
              {/* Name & Type */}
              <div className="col-span-5 flex items-center gap-3 min-w-0 pr-3">
                <div className="p-1.5 bg-neutral-100 rounded text-neutral-600 shrink-0">
                  {file.type === 'code' ? (
                    <FileCode className="w-4 h-4" />
                  ) : file.type === 'spreadsheet' ? (
                    <Table className="w-4 h-4" />
                  ) : (
                    <FileText className="w-4 h-4" />
                  )}
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-neutral-900 truncate font-mono">
                    {file.name}
                  </p>
                  <p className="text-[11px] text-neutral-400">
                    Added {file.dateAdded}
                  </p>
                </div>
              </div>

              {/* Project & Memory Status */}
              <div className="col-span-3 min-w-0 pr-3">
                <p className="text-neutral-800 font-medium truncate">
                  {file.projectName || 'General'}
                </p>
                {file.isProjectMemorySource ? (
                  <p className="text-[11px] text-emerald-700 font-medium truncate flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-emerald-600 shrink-0" />
                    <span>Memory Source</span>
                  </p>
                ) : (
                  <span className="text-[11px] text-neutral-600">Available</span>
                )}
              </div>

              {/* Source & Size */}
              <div className="col-span-2 text-neutral-500 font-mono text-[11px]">
                <span className="uppercase">{file.source}</span>
                <span className="text-neutral-300 mx-1">·</span>
                <span>{file.size}</span>
              </div>

              {/* Actions */}
              <div className="col-span-2 flex items-center justify-end gap-2">
                <button
                  onClick={() => setPreviewFile(file)}
                  className="p-1.5 text-neutral-500 hover:text-neutral-900 rounded hover:bg-neutral-100 transition-colors"
                  title="Preview snippet"
                >
                  <Eye className="w-3.5 h-3.5" />
                </button>

                {!file.isProjectMemorySource && (
                  <button
                    onClick={() => {
                      setMemoryModalFile(file);
                      setMemoryPurpose(file.memoryPurpose || '');
                    }}
                    className="flex items-center gap-1 px-2 py-1 text-[11px] font-semibold text-neutral-800 hover:bg-neutral-100 rounded border border-neutral-200 transition-colors whitespace-nowrap"
                    title="Add to Project Permanent Memory"
                  >
                    <BookmarkPlus className="w-3 h-3" />
                    <span>Add to Memory</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* ADD TO PROJECT MEMORY MODAL */}
      {memoryModalFile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl border border-neutral-200 max-w-md w-full p-6 space-y-4 animate-in fade-in zoom-in-95 duration-150 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
              <div className="flex items-center gap-2">
                <BookmarkPlus className="w-4 h-4 text-emerald-600" />
                <h3 className="font-bold text-neutral-900 text-sm">
                  Add File to Project Memory
                </h3>
              </div>
              <button onClick={() => setMemoryModalFile(null)} className="text-neutral-400 hover:text-neutral-700">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div>
              <p className="text-neutral-600 mb-2">
                When a file is designated as a <strong>Project Memory Source</strong>, its specs and interfaces are locked permanently into CONTINUA's context for all AI sessions.
              </p>
              <div className="p-2.5 bg-neutral-50 rounded-lg border border-neutral-200 mb-3 font-mono font-medium text-neutral-900">
                {memoryModalFile.name} ({memoryModalFile.size})
              </div>

              <label className="font-semibold text-neutral-800 block mb-1">
                Project Purpose / Architectural Role
              </label>
              <textarea
                rows={3}
                value={memoryPurpose}
                onChange={(e) => setMemoryPurpose(e.target.value)}
                placeholder="e.g. Core university placement requirements and candidate eligibility rules."
                className="w-full p-2.5 border border-neutral-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-neutral-900 text-xs resize-none"
              />
            </div>

            <div className="pt-2 flex items-center justify-end gap-2">
              <button
                onClick={() => setMemoryModalFile(null)}
                className="px-3.5 py-1.5 text-neutral-600 hover:bg-neutral-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveToMemory}
                className="px-4 py-1.5 font-bold text-white bg-neutral-900 hover:bg-neutral-800 rounded-lg transition-colors"
              >
                Lock in Project Memory
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FILE PREVIEW MODAL */}
      {previewFile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl border border-neutral-200 max-w-lg w-full p-6 space-y-4 animate-in fade-in zoom-in-95 duration-150 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
              <div className="min-w-0 pr-4">
                <h3 className="font-bold text-neutral-900 text-sm font-mono truncate">
                  {previewFile.name}
                </h3>
                <p className="text-[11px] text-neutral-400">
                  {previewFile.source.toUpperCase()} · {previewFile.size} · {previewFile.dateAdded}
                </p>
              </div>
              <button onClick={() => setPreviewFile(null)} className="text-neutral-400 hover:text-neutral-700">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200 font-mono text-neutral-800 whitespace-pre-wrap leading-relaxed max-h-64 overflow-y-auto">
              {previewFile.contentSnippet || 'No text snippet preview available.'}
            </div>

            <div className="pt-2 flex items-center justify-between">
              <span className="text-[11px] text-neutral-500">
                {previewFile.isProjectMemorySource ? '✓ Anchored to Project Memory' : 'Available for chat attachment'}
              </span>
              <button
                onClick={() => setPreviewFile(null)}
                className="px-4 py-1.5 font-bold text-neutral-900 bg-neutral-100 hover:bg-neutral-200 rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
