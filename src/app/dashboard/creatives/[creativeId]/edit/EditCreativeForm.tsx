'use client';

import { useState } from 'react';
import { updateCreativeAction } from '@/app/actions/creatives';
import { useRouter } from 'next/navigation';
import { Loader2, Save, X, CheckSquare, Tag, Type, DollarSign, Package } from 'lucide-react';

export default function EditCreativeForm({ creative }: { creative: any }) {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsPending(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    const result = await updateCreativeAction(creative.id, formData);

    if (result.error) {
      setError(result.error);
      setIsPending(false);
    } else {
      router.push(`/dashboard/creatives/${creative.campaignId}`);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Lado Esquerdo: Media Preview & Basics */}
        <div className="space-y-6">
          <div className="aspect-[9/16] bg-black rounded-xl overflow-hidden relative border border-white/5">
            {creative.imageUrl && (
              <img src={creative.imageUrl} alt="preview" className="w-full h-full object-cover brightness-75" />
            )}
            <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black to-transparent">
               <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">{creative.sku}</span>
            </div>
          </div>
        </div>

        {/* Lado Direito: Campos de Edição */}
        <div className="space-y-6">
          {error && (
            <div className="bg-secondary/10 border border-secondary/20 p-4 rounded-xl text-secondary text-xs font-bold flex items-center gap-2">
              <X className="w-4 h-4" /> {error}
            </div>
          )}

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant flex items-center gap-2">
                <Type className="w-3 h-3" /> Título do Criativo
              </label>
              <input
                type="text"
                name="title"
                defaultValue={creative.title}
                required
                className="w-full bg-surface-container-high border border-white/5 text-on-surface rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-primary outline-none transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant flex items-center gap-2">
                Descrição
              </label>
              <textarea
                name="description"
                defaultValue={creative.description}
                rows={4}
                className="w-full bg-surface-container-high border border-white/5 text-on-surface rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-primary outline-none transition-all resize-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant flex items-center gap-2">
                  <DollarSign className="w-3 h-3" /> Preço (Opcional)
                </label>
                <input
                  type="number"
                  step="0.01"
                  name="price"
                  defaultValue={creative.price}
                  className="w-full bg-surface-container-high border border-white/5 text-on-surface rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-primary outline-none transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant flex items-center gap-2">
                  <CheckSquare className="w-3 h-3" /> Status no Feed
                </label>
                <select
                  name="status"
                  defaultValue={creative.status}
                  className="w-full bg-surface-container-high border border-white/5 text-on-surface rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-primary outline-none transition-all appearance-none cursor-pointer"
                >
                  <option value="active">🟢 Atitvo (Live)</option>
                  <option value="inactive">🔴 Pausado (Idle)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant flex items-center gap-2">
                    <Package className="w-3 h-3" /> Marca
                  </label>
                  <input
                    type="text"
                    name="brand"
                    defaultValue={creative.brand}
                    className="w-full bg-surface-container-high/50 border border-white/5 text-on-surface rounded-xl px-4 py-2.5 text-xs outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant flex items-center gap-2">
                    <Tag className="w-3 h-3" /> Categoria
                  </label>
                  <input
                    type="text"
                    name="category"
                    defaultValue={creative.category}
                    className="w-full bg-surface-container-high/50 border border-white/5 text-on-surface rounded-xl px-4 py-2.5 text-xs outline-none"
                  />
                </div>
            </div>
          </div>

          <div className="pt-6 flex gap-4">
             <button
               type="button"
               onClick={() => router.back()}
               className="flex-1 bg-white/5 hover:bg-white/10 text-on-surface font-headline font-black text-[10px] py-4 rounded-xl uppercase tracking-widest transition-all"
             >
               Cancelar
             </button>
             <button
               type="submit"
               disabled={isPending}
               className="flex-[2] bg-primary text-on-primary font-headline font-black text-[10px] py-4 rounded-xl uppercase tracking-widest transition-all flex items-center justify-center gap-2 hover:brightness-110 disabled:opacity-50 shadow-lg shadow-primary/10"
             >
               {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
               Salvar Alterações
             </button>
          </div>
        </div>
      </div>
    </form>
  );
}
