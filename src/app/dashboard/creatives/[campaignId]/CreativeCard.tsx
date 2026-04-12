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
    <div className="group relative bg-surface-container-low border border-outline-variant/10 rounded-xl overflow-hidden hover:border-primary/40 transition-all shadow-sm flex flex-col h-full glow-primary">
      {/* Media Preview */}
      <div className="relative aspect-[9/16] bg-background overflow-hidden">
        {creative.imageUrl ? (
          <img 
            src={creative.imageUrl} 
            alt={creative.title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-75 group-hover:brightness-100" 
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-surface-container-low">
             <Video className="w-6 h-6 text-on-surface-variant/20" />
          </div>
        )}
        
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80"></div>
        
        {/* Play Highlight */}
        {creative.videoUrl && (
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20">
            <Link href={creative.videoUrl} target="_blank" className="w-12 h-12 bg-primary/20 backdrop-blur-md border border-primary/30 rounded-full flex items-center justify-center hover:scale-110 transition-all shadow-2xl">
              <Play className="w-5 h-5 text-primary fill-primary" />
            </Link>
          </div>
        )}

        {/* Status Badge */}
        <div className="absolute top-3 left-3 z-30">
          <span className={`text-[9px] font-black px-2 py-0.5 rounded-full border ${
            creative.status === 'active' 
              ? 'bg-primary/10 text-primary border-primary/20' 
              : 'bg-on-surface-variant/10 text-on-surface-variant border-on-surface-variant/20'
          } uppercase tracking-[0.2em]`}>
            {creative.status === 'active' ? 'LIVE' : 'IDLE'}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-3 flex-1 flex flex-col bg-surface-container/30">
        <h4 className="text-[11px] font-black text-white truncate mb-0.5 font-headline tracking-tight group-hover:text-primary transition-colors">{creative.title}</h4>
        <p className="text-[9px] text-on-surface-variant font-bold uppercase tracking-widest opacity-60 flex items-center gap-1">
           SKU: {creative.sku.slice(-8)}
        </p>
        
        <div className="mt-4 flex items-center justify-between gap-1 border-t border-outline-variant/10 pt-3">
           {/* Actions */}
           <div className="flex items-center gap-1">
             <Link 
               href={`/dashboard/creatives/${creative.id}/edit`} 
               className="p-2 text-on-surface-variant hover:text-white hover:bg-surface-container-high rounded-lg transition-all"
               title="Editar"
             >
               <Pencil className="w-3.5 h-3.5" />
             </Link>
             <button 
               onClick={handleDelete}
               disabled={isPending}
               className="p-2 text-on-surface-variant hover:text-secondary hover:bg-secondary/10 rounded-lg transition-all"
               title="Excluir"
             >
               <Trash2 className="w-3.5 h-3.5" />
             </button>
           </div>

           {/* Duplicate Action */}
           <div className="relative">
             <button 
               onClick={() => setShowOptions(!showOptions)}
               disabled={isPending}
               className="p-2 bg-surface-container-highest text-primary hover:bg-primary hover:text-on-primary rounded-lg transition-all flex items-center gap-2 shadow-sm border border-outline-variant/10"
               title="Duplicar este vídeo"
             >
               {isPending ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Copy className="w-3.5 h-3.5" />}
               <span className="text-[10px] font-black uppercase tracking-widest">CLONAR</span>
             </button>

             {showOptions && !isPending && (
               <div className="absolute bottom-12 right-0 w-36 bg-surface-container-high border border-outline-variant/20 rounded-xl shadow-2xl p-2 z-[60] animate-in fade-in slide-in-from-bottom-2 duration-150">
                  <div className="grid grid-cols-2 gap-1.5 mb-2">
                     {[2, 3, 5, 10].map((n) => (
                      <button
                          key={n}
                          onClick={() => handleDuplicate(n)}
                          className="w-full text-center py-2 text-[10px] text-on-surface-variant hover:bg-primary hover:text-on-primary rounded-lg transition-all font-black border border-outline-variant/10"
                      >
                          {n}x
                      </button>
                     ))}
                  </div>
                  
                  <div className="flex items-center gap-2 bg-background border border-outline-variant/20 rounded-lg px-2 py-1">
                     <input 
                       type="number" 
                       min="1"
                       placeholder="Manual..." 
                       value={manualCount}
                       onChange={(e) => setManualCount(e.target.value)}
                       className="bg-transparent border-none text-[10px] text-on-surface p-0 focus:ring-0 w-full font-bold placeholder:text-on-surface-variant/30"
                     />
                     <button 
                       onClick={() => manualCount && handleDuplicate(parseInt(manualCount))}
                       disabled={!manualCount}
                       className="text-primary hover:text-white disabled:opacity-30"
                     >
                         <ChevronRight className="w-3.5 h-3.5" />
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
