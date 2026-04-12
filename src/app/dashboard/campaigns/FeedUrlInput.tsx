'use client';

export default function FeedUrlInput({ url }: { url: string }) {
  return (
    <input 
      type="text" 
      readOnly 
      value={url}
      className="w-full bg-zinc-950 text-xs text-indigo-300 border border-zinc-800 rounded px-2 py-1 focus:outline-none cursor-pointer"
      onClick={(e) => (e.target as HTMLInputElement).select()}
      title="Clique para selecionar e copiar a URL do catálogo"
    />
  );
}
