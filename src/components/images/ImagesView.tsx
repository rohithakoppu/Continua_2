import React, { useState } from 'react';
import { useContinua } from '../../context/ContinuaContext';
import { ImageItem } from '../../types';
import { 
  Image as ImageIcon, 
  Search, 
  Eye, 
  MessageSquare, 
  X, 
  Calendar, 
  Sparkles,
  ExternalLink
} from 'lucide-react';

export function ImagesView() {
  const { images, setCurrentView, setSelectedConversationId } = useContinua();

  const [filterType, setFilterType] = useState<'all' | 'project' | 'generated' | 'uploaded'>('all');
  const [selectedImage, setSelectedImage] = useState<ImageItem | null>(null);

  const filteredImages = filterType === 'all'
    ? images
    : images.filter(img => img.type === filterType);

  return (
    <div className="flex-1 overflow-y-auto bg-[#fafafa] p-6 lg:p-10 space-y-6 max-w-7xl mx-auto w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-200/80">
        <div>
          <h1 className="text-xl font-bold text-neutral-900 tracking-tight">
            Generated & Project Images
          </h1>
          <p className="text-xs text-neutral-500 mt-1">
            Visual prototypes, architecture diagrams, and concept assets indexed across projects.
          </p>
        </div>

        {/* Filter Segmented Control */}
        <div className="flex items-center gap-1 p-1 bg-neutral-200/60 rounded-lg text-xs self-start sm:self-auto">
          {(['all', 'project', 'uploaded'] as const).map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-3 py-1 font-medium rounded-md capitalize transition-colors ${
                filterType === type
                  ? 'bg-white text-neutral-900 shadow-2xs font-semibold'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              {type === 'all' ? 'All Images' : type}
            </button>
          ))}
        </div>
      </div>

      {/* Images Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredImages.map((img) => (
          <div
            key={img.id}
            className="bg-white border border-neutral-200/90 rounded-xl overflow-hidden group hover:border-neutral-300 transition-all flex flex-col justify-between"
          >
            {/* Image Preview Container with Fallback */}
            <div 
              onClick={() => setSelectedImage(img)}
              className="relative aspect-video bg-neutral-100 overflow-hidden cursor-pointer flex items-center justify-center"
            >
              <img
                src={img.url}
                alt={img.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <div className="absolute inset-0 bg-neutral-900/0 group-hover:bg-neutral-900/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                <span className="p-2 bg-white/90 rounded-full shadow-sm text-neutral-900">
                  <Eye className="w-4 h-4" />
                </span>
              </div>
            </div>

            {/* Metadata Footer */}
            <div className="p-4 space-y-1.5 text-xs">
              <div className="flex items-start justify-between gap-2">
                <h4 className="font-bold text-neutral-900 leading-snug line-clamp-1">
                  {img.name}
                </h4>
                <span className="text-[11px] font-mono text-neutral-400 shrink-0">
                  {img.dimensions}
                </span>
              </div>

              {img.projectName && (
                <p className="text-[11px] text-neutral-500 font-medium">
                  {img.projectName}
                </p>
              )}

              {img.prompt && (
                <p className="text-[11px] text-neutral-600 line-clamp-2 italic pt-1 border-t border-neutral-100">
                  "{img.prompt}"
                </p>
              )}

              <div className="pt-2 flex items-center justify-between text-[11px] text-neutral-400">
                <span>{img.date}</span>
                <button
                  onClick={() => {
                    setSelectedConversationId('conv-placement-1');
                    setCurrentView('chat');
                  }}
                  className="font-semibold text-neutral-700 hover:text-neutral-900 flex items-center gap-1"
                >
                  <MessageSquare className="w-3 h-3" />
                  <span>Attach to Chat</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* LIGHTBOX PREVIEW MODAL */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/80 backdrop-blur-xs">
          <div className="bg-white rounded-2xl border border-neutral-200 max-w-3xl w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="p-4 border-b border-neutral-200 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-neutral-900">{selectedImage.name}</h3>
                <p className="text-[11px] text-neutral-500">{selectedImage.dimensions} · {selectedImage.projectName}</p>
              </div>
              <button onClick={() => setSelectedImage(null)} className="p-1 text-neutral-400 hover:text-neutral-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-neutral-900 max-h-[60vh] flex items-center justify-center p-2">
              <img
                src={selectedImage.url}
                alt={selectedImage.name}
                referrerPolicy="no-referrer"
                className="max-h-[55vh] max-w-full object-contain"
              />
            </div>

            <div className="p-4 bg-white space-y-2 text-xs">
              {selectedImage.prompt && (
                <div>
                  <span className="font-semibold text-neutral-900 block mb-0.5">Prompt Specifications:</span>
                  <p className="text-neutral-600 leading-relaxed font-mono text-[11px] bg-neutral-50 p-2 rounded border border-neutral-200">
                    {selectedImage.prompt}
                  </p>
                </div>
              )}

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  onClick={() => setSelectedImage(null)}
                  className="px-3.5 py-1.5 font-medium text-neutral-600 hover:bg-neutral-100 rounded-lg"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    setSelectedImage(null);
                    setSelectedConversationId('conv-placement-1');
                    setCurrentView('chat');
                  }}
                  className="px-4 py-1.5 font-bold text-white bg-neutral-900 hover:bg-neutral-800 rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Attach to Chat</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
