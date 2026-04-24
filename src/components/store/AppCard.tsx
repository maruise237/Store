import Image from 'next/image';
import { ExternalLink } from 'lucide-react';
import TagBadge from './TagBadge';
import type { App } from '@/db/schema';

export default function AppCard({ app }: { app: App }) {
  const tags: string[] = JSON.parse(app.tags ?? '[]');

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden flex flex-col">
      {app.screenshotUrl && (
        <div className="relative w-full aspect-video bg-gray-50">
          <Image
            src={app.screenshotUrl}
            alt={`${app.name} screenshot`}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
      )}

      <div className="p-5 flex flex-col flex-1 gap-3">
        <div className="flex items-start gap-3">
          {app.iconUrl ? (
            <div className="relative w-12 h-12 shrink-0">
              <Image
                src={app.iconUrl}
                alt={`${app.name} icon`}
                fill
                className="rounded-xl object-cover"
                sizes="48px"
              />
            </div>
          ) : (
            <div className="w-12 h-12 shrink-0 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-lg">
              {app.name.charAt(0).toUpperCase()}
            </div>
          )}
          <div className="min-w-0">
            <h3 className="font-semibold text-gray-900 truncate">{app.name}</h3>
            <p className="text-sm text-gray-500 line-clamp-2">{app.tagline}</p>
          </div>
        </div>

        <p className="text-sm text-gray-600 line-clamp-3 flex-1">{app.description}</p>

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {tags.map(tag => (
              <TagBadge key={tag} tag={tag} />
            ))}
          </div>
        )}

        <a
          href={app.websiteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition-colors"
        >
          Ouvrir l&apos;app
          <ExternalLink size={14} />
        </a>
      </div>
    </div>
  );
}
