import TodayCard from './TodayCard';
import type { App } from '@/db/schema';

export default function HeroSection({ featuredApp }: { featuredApp?: App }) {
  if (!featuredApp) {
    return (
      <section className="max-w-5xl mx-auto px-5 pt-8 pb-10">
        <div
          className="rounded-[22px] px-8 py-14 text-center"
          style={{ background: 'linear-gradient(135deg, #1c1c1e 0%, #2c2c2e 100%)' }}
        >
          <p className="text-[11px] font-semibold text-white/50 uppercase tracking-widest mb-2">Bienvenue</p>
          <h2 className="text-[32px] font-bold text-white mb-3">KamTech Store</h2>
          <p className="text-[16px] text-white/70">Des outils SaaS modernes pour votre quotidien</p>
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-5xl mx-auto px-5 pt-8 pb-10">
      <TodayCard app={featuredApp} index={0} />
    </section>
  );
}
