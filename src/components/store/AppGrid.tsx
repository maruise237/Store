import AppCard from './AppCard';
import type { App } from '@/db/schema';

export default function AppGrid({ apps, title = 'Toutes les apps' }: { apps: App[]; title?: string }) {
  if (apps.length === 0) {
    return (
      <section className="max-w-5xl mx-auto px-5 py-16 text-center">
        <p className="text-[17px] text-[#636366]">Aucune application disponible pour le moment.</p>
      </section>
    );
  }

  return (
    <section id="apps" className="max-w-5xl mx-auto px-5 mb-16">
      <h2 className="text-[22px] font-bold text-[#1c1c1e] mb-1">{title}</h2>
      <p className="text-[13px] text-[#636366] mb-5">{apps.length} application{apps.length !== 1 ? 's' : ''}</p>

      <div className="bg-white rounded-[18px] px-5 divide-y-0" style={{ boxShadow: '0 2px 16px rgba(0,0,0,0.06)' }}>
        {apps.map(app => (
          <AppCard key={app.id} app={app} />
        ))}
      </div>
    </section>
  );
}
