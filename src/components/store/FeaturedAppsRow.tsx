import AppCard from './AppCard';
import { Star } from 'lucide-react';
import type { App } from '@/db/schema';

export default function FeaturedAppsRow({ apps }: { apps: App[] }) {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center gap-2 mb-6">
        <Star size={20} className="text-yellow-500 fill-yellow-400" />
        <h2 className="text-xl font-semibold text-gray-800">En vedette</h2>
      </div>
      <div className="flex gap-5 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 lg:grid-cols-3">
        {apps.map(app => (
          <div key={app.id} className="min-w-[280px] sm:min-w-0">
            <AppCard app={app} />
          </div>
        ))}
      </div>
    </section>
  );
}
