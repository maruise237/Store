import AppCard from './AppCard';
import type { App } from '@/db/schema';

export default function AppGrid({ apps, title }: { apps: App[]; title?: string }) {
  if (apps.length === 0) {
    return (
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <p className="text-gray-400 text-lg">Aucune application disponible pour le moment.</p>
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {title && (
        <h2 className="text-xl font-semibold text-gray-800 mb-6">{title}</h2>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {apps.map(app => (
          <AppCard key={app.id} app={app} />
        ))}
      </div>
    </section>
  );
}
