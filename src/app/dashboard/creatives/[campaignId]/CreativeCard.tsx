'use client';

import { Creative } from '@/types';
import { Pencil, Trash2, Copy, Play, Loader2, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { duplicateCreativeAction, deleteCreativeAction } from '@/app/actions/creatives';
import { useRouter } from 'next/navigation';

export default function CreativeCard({ creative }: { creative: any }) {
  const [isPending, setIsPending] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [manualCount, setManualCount] = useState('');
  const router = useRouter();

  const handleDuplicate = async (multiplier: number) => {
    setIsPending(true);
    setShowOptions(false);
    const result = await duplicateCreativeAction(creative.id, multiplier);
    if (result?.error) alert(result.error);
    setIsPending(false);
  };

  const handleDelete = async () => {
    if (!confirm('Tem certeza que deseja excluir este vídeo? Isso removerá ele do feed de anúncios.')) return;
    setIsPending(true);
    const result = await deleteCreativeAction(creative.id);
    setIsPending(false);
  };

  return (
    <div className="group relative bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden hover:border-indigo-500/50 transition-all shadow-sm flex flex-col h-full">
      {/* Media Preview */}
      <div className="relative aspect-[9/16] bg-zinc-950 overflow-hidden">
        {creative.imageUrl ? (
          <img src={creative.imageUrl} alt={creative.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-zinc-900">
             <Play className="w-6 h-6 text-zinc-800" />
          </div>
        )}
        
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-60"></div>
        
        {/* Play Highlight */}
        {creative.videoUrl && (
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <Link href={creative.videoUrl} target="_blank" className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center hover:scale-110 transition-all">
              <Play className="w-4 h-4 text-white fill-white" />
            </Link>
          </div>
        )}

        {/* Status Badge */}
        <div className="absolute top-2 left-2">
          <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded border ${
            creative.status === 'active' 
              ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' 
              : 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20'
          } uppercase tracking-widest`}>
            {creative.status === 'active' ? 'ON' : 'OFF'}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-2.5 flex-1 flex flex-col">
        <h4 className="text-[11px] font-semibold text-white truncate mb-0.5">{creative.title}</h4>
        <p className="text-[9px] text-zinc-500 font-mono mb-2">{creative.sku}</p>
        
        <div className="mt-auto flex items-center justify-between gap-1 border-t border-zinc-800/50 pt-2">
           {/* Actions */}
           <div className="flex items-center gap-0.5">
             <Link 
               href={`/dashboard/creatives/${creative.id}/edit`} 
               className="p-1.5 text-zinc-500 hover:text-white hover:bg-zinc-800 rounded-lg transition-all"
               title="Editar"
             >
               <Pencil className="w-3 h-3" />
             </Link>
             <button 
               onClick={handleDelete}
               disabled={isPending}
               className="p-1.5 text-zinc-500 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all"
               title="Excluir"
             >
               <Trash2 className="w-3 h-3" />
             </button>
           </div>

           {/* Duplicate Action */}
           <div className="relative">
             <button 
               onClick={() => setShowOptions(!showOptions)}
               disabled={isPending}
               className="p-1.5 bg-zinc-800 text-indigo-400 hover:bg-indigo-600 hover:text-white rounded-lg transition-all flex items-center gap-1 shadow-sm"
               title="Duplicar este vídeo"
             >
               {isPending ? <Loader2 className="w-3 h-3 animate-spin" /> : <Copy className="w-3 h-3" />}
               <span className="text-[9px] font-bold uppercase">Clon</span>
             </button>

             {showOptions && !isPending && (
               <div className="absolute bottom-10 right-0 w-32 bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl p-1.5 z-[60] animate-in fade-in slide-in-from-bottom-2 duration-100">
                 <div className="grid grid-cols-2 gap-1 mb-1.5">
                    {[2, 3, 5, 10].map((n) => (
                    <button
                        key={n}
                        onClick={() => handleDuplicate(n)}
                        className="w-full text-center py-1 text-[10px] text-zinc-300 hover:bg-indigo-600 hover:text-white rounded-md transition-colors font-medium border border-zinc-800"
                    >
                        {n}x
                    </button>
                    ))}
                 </div>
                 
                 <div className="flex items-center gap-1 bg-zinc-950 border border-zinc-800 rounded px-1.5 py-0.5 mt-1">
                    <input 
                      type="number" 
                      min="1"
                      placeholder="+" 
                      value={manualCount}
                      onChange={(e) => setManualCount(e.target.value)}
                      className="bg-transparent border-none text-[10px] text-white p-0 focus:ring-0 w-full"
                    />
                    <button 
                      onClick={() => manualCount && handleDuplicate(parseInt(manualCount))}
                      disabled={!manualCount}
                      className="text-indigo-400 hover:text-white disabled:opacity-30"
                    >
                        <ChevronRight className="w-3 h-3" />
                    </button>
                 </div>
               </div>
             )}
           </div>
        </div>
      </div>
    </div>
  );
}
