import { getOrganizationId } from '@/lib/session';
import { redirect } from 'next/navigation';
import { db } from '@/lib/firebase-admin';
import Link from 'next/link';
import { 
  Megaphone, 
  Video, 
  Zap, 
  Rocket, 
  ArrowRight, 
  Lightbulb, 
  AlertTriangle,
  Play
} from 'lucide-react';

export const dynamic = 'force-dynamic';

async function getStats(orgId: string) {
  if (!db) return { campaigns: 0, creatives: 0, exports: 0 };
  
  try {
    const [campaigns, creatives, exportsCount] = await Promise.all([
      db.collection('campaigns').where('organizationId', '==', orgId).count().get(),
      db.collection('creatives').where('organizationId', '==', orgId).count().get(),
      db.collection('exports').where('organizationId', '==', orgId).count().get(),
    ]);

    return {
      campaigns: campaigns.data().count,
      creatives: creatives.data().count,
      exports: exportsCount.data().count,
    };
  } catch (error) {
    console.error('Error fetching stats:', error);
    return { campaigns: 0, creatives: 0, exports: 0 };
  }
}

export default async function DashboardPage() {
  const orgId = await getOrganizationId();
  if (!orgId) redirect('/login');

  const stats = await getStats(orgId);

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      {/* Welcome Header */}
      <header>
        <h2 className="text-4xl font-black font-headline tracking-tighter text-on-surface">
          Bem-vindo, <span className="text-primary italic">Marketer</span>
        </h2>
        <p className="text-on-surface-variant mt-2 font-sans text-lg opacity-80">
          Seu centro de comando para performance de alta escala está pronto.
        </p>
      </header>

      {/* Stats Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-surface-container-low p-8 rounded-2xl border-l-4 border-primary relative overflow-hidden group hover:bg-surface-container transition-all">
          <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Megaphone className="w-32 h-32 text-primary" />
          </div>
          <p className="font-headline text-[0.625rem] font-black uppercase tracking-[0.2em] text-on-surface-variant">
            {stats.campaigns} CAMPANHAS
          </p>
          <h3 className="text-3xl font-black font-headline text-on-surface mt-2 tracking-tight">Ativas Agora</h3>
        </div>

        <div className="bg-surface-container-low p-8 rounded-2xl border-l-4 border-tertiary relative overflow-hidden group hover:bg-surface-container transition-all">
          <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Video className="w-32 h-32 text-tertiary" />
          </div>
          <p className="font-headline text-[0.625rem] font-black uppercase tracking-[0.2em] text-on-surface-variant">
            {stats.creatives} CRIATIVOS
          </p>
          <h3 className="text-3xl font-black font-headline text-on-surface mt-2 tracking-tight">Em Rodagem</h3>
        </div>

        <div className="bg-surface-container-low p-8 rounded-2xl border-l-4 border-primary-container relative overflow-hidden group hover:bg-surface-container transition-all">
          <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Zap className="w-32 h-32 text-primary-container" />
          </div>
          <p className="font-headline text-[0.625rem] font-black uppercase tracking-[0.2em] text-on-surface-variant">
            {stats.exports} FEEDS GERADOS
          </p>
          <h3 className="text-3xl font-black font-headline text-on-surface mt-2 tracking-tight">Sincronizados</h3>
        </div>
      </div>

      {/* Core Onboarding Flow */}
      <section className="bg-surface-container-high rounded-2xl p-10 border border-outline-variant/10 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full opacity-10 pointer-events-none">
          <div className="w-full h-full bg-gradient-to-l from-primary/40 to-transparent"></div>
        </div>
        
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
            <div>
              <span className="text-primary font-headline font-black text-xs uppercase tracking-[0.3em]">Fluxo Operacional</span>
              <h2 className="text-4xl font-black font-headline mt-2 tracking-tighter">Como escalar hoje?</h2>
            </div>
            <Link 
              href="/dashboard/campaigns/new"
              className="bg-gradient-to-r from-primary to-primary-container text-on-primary px-8 py-4 rounded-xl font-headline font-black uppercase tracking-widest hover:brightness-110 active:scale-95 transition-all shadow-xl shadow-primary/20 flex items-center gap-2 group text-xs"
            >
              Começar Agora
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {/* Step 1 */}
            <div className="flex flex-col gap-5 group">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-surface-container-highest flex items-center justify-center font-black font-headline text-primary border border-primary/20 group-hover:bg-primary group-hover:text-on-primary transition-all duration-300 shadow-lg">1</div>
                <h4 className="font-headline font-black text-on-surface tracking-tight">Crie uma Campanha</h4>
              </div>
              <p className="text-on-surface-variant text-sm font-sans leading-relaxed opacity-80">
                Defina seu objetivo e orçamento. Nossa engine otimiza a estrutura de dados para o catálogo do TikTok.
              </p>
              <div className="mt-auto pt-4 flex gap-2">
                <div className="h-1 w-full bg-primary/10 rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-full shadow-[0_0_10px_#5ffff7]"></div>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col gap-5 group">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-surface-container-highest flex items-center justify-center font-black font-headline text-primary border border-primary/20 group-hover:bg-primary group-hover:text-on-primary transition-all duration-300 shadow-lg">2</div>
                <h4 className="font-headline font-black text-on-surface tracking-tight">Suba os Vídeos</h4>
              </div>
              <p className="text-on-surface-variant text-sm font-sans leading-relaxed opacity-80">
                Importe seus criativos. Aplicamos metadados de performance e Ghost Prices automaticamente.
              </p>
              <div className="mt-auto pt-4 flex gap-2">
                <div className="h-1 w-full bg-primary/10 rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-1/3 group-hover:w-full transition-all duration-700 shadow-[0_0_10px_#5ffff7]"></div>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col gap-5 group">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-surface-container-highest flex items-center justify-center font-black font-headline text-primary border border-primary/20 group-hover:bg-primary group-hover:text-on-primary transition-all duration-300 shadow-lg">3</div>
                <h4 className="font-headline font-black text-on-surface tracking-tight">Link no TikTok</h4>
              </div>
              <p className="text-on-surface-variant text-sm font-sans leading-relaxed opacity-80">
                Gere o link de sincronia (Live Feed) e cole no TikTok Ads Manager. A escala começa em segundos.
              </p>
              <div className="mt-auto pt-4 flex gap-2">
                <div className="h-1 w-full bg-primary/10 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Informational Cards Asymmetric Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Dica de Performance */}
        <div className="lg:col-span-3 bg-surface-container-low rounded-2xl p-8 border border-outline-variant/10 flex flex-col md:flex-row gap-8 hover:bg-surface-container transition-all group">
          <div className="w-full md:w-56 h-56 rounded-xl overflow-hidden bg-surface-container-highest flex-shrink-0 relative">
             <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-60 z-10"></div>
             <div className="absolute inset-0 flex items-center justify-center z-20">
                <div className="w-14 h-14 bg-primary text-on-primary rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                  <Play className="w-6 h-6 fill-on-primary" />
                </div>
             </div>
             <img 
               src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000&auto=format&fit=crop" 
               alt="Optimization" 
               className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
             />
          </div>
          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-3">
              <Lightbulb className="w-5 h-5 text-tertiary" />
              <span className="font-headline font-black text-[0.6875rem] uppercase tracking-[0.2em] text-tertiary">Dica de Performance</span>
            </div>
            <h4 className="text-2xl font-black font-headline mb-4 text-on-surface tracking-tight">Renovação de Criativos</h4>
            <p className="text-on-surface-variant text-sm font-sans leading-relaxed mb-6 opacity-80">
              A fadiga de anúncios no TikTok ocorre 3x mais rápido que em outras redes. Recomendamos renovar ao menos 2 criativos a cada 7 dias para manter o CPA estável.
            </p>
            <Link 
              href="/dashboard/creatives/new"
              className="text-primary text-[0.6875rem] font-black uppercase tracking-widest flex items-center gap-2 hover:gap-3 transition-all"
            >
              Adicionar Novos Vídeos <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* Atenção ao Link */}
        <div className="lg:col-span-2 bg-background rounded-2xl p-8 border border-secondary/30 relative group overflow-hidden">
          <div className="absolute inset-0 bg-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>
          <div className="relative z-10 flex flex-col h-full">
            <div className="flex items-center gap-2 mb-6">
              <AlertTriangle className="w-6 h-6 text-secondary" />
              <span className="font-headline font-black text-[0.6875rem] uppercase tracking-[0.2em] text-secondary">Atenção Crítica</span>
            </div>
            <h4 className="text-2xl font-black font-headline mb-4 text-on-surface tracking-tight">Validação de UTMs</h4>
            <p className="text-on-surface-variant text-sm font-sans leading-relaxed mb-8 opacity-80">
              Sempre verifique se as UTMs estão configuradas na Campanha. Sem elas, sua atribuição no rastreio de vendas será quebrada.
            </p>
            <div className="mt-auto bg-surface-container-high/50 rounded-xl p-4 font-mono text-[0.625rem] text-primary/80 border-l-4 border-primary shadow-inner">
              ?utm_source=tiktok&utm_medium=creative_feed...
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
