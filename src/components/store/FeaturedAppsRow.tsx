import Image from 'next/image';
import type { App } from '@/db/schema';

function FeaturedCard({ app }: { app: App }) {
  const tags: string[] = JSON.parse(app.tags ?? '[]');

  return (
    <a
      href={app.websiteUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="flex-shrink-0 w-64 bg-white rounded-[18px] overflow-hidden block"
      style={{ boxShadow: '0 2px 16px rgba(0,0,0,0.08)' }}
    >
      {app.screenshotUrl ? (
        <div className="relative w-full h-36">
          <Image
            src={app.screenshotUrl}
            alt={app.name}
            fill
            className="object-cover"
            sizes="256px"
          />
        </div>
      ) : (
        <div
          className="w-full h-36 flex items-center justify-center text-white text-[40px] font-bold"
          style={{ background: `hsl(${(app.name.charCodeAt(0) * 37) % 360}, 60%, 55%)` }}
        >
          {app.name.charAt(0).toUpperCase()}
        </div>
      )}

      <div className="p-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="relative w-10 h-10 shrink-0">
            {app.iconUrl ? (
              <Image src={app.iconUrl} alt={app.name} fill className="rounded-[9px] object-cover" sizes="40px" />
            ) : (
              <div
                className="w-full h-full rounded-[9px] flex items-center justify-center text-white font-bold text-sm"
                style={{ background: `hsl(${(app.name.charCodeAt(0) * 37) % 360}, 65%, 50%)` }}
              >
                {app.name.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          <div className="min-w-0">
            <p className="text-[14px] font-semibold text-[#1c1c1e] truncate">{app.name}</p>
            {tags[0] && <p className="text-[12px] text-[#636366] truncate">{tags[0]}</p>}
          </div>
        </div>
        <span className="inline-block px-3 py-1 rounded-full text-[12px] font-semibold text-[#007aff] bg-[#007aff]/10">
          Ouvrir
        </span>
      </div>
    </a>
  );
}

export default function FeaturedAppsRow({ apps }: { apps: App[] }) {
  return (
    <section id="featured" className="mb-10">
      <div className="max-w-5xl mx-auto px-5 mb-4 flex items-center justify-between">
        <h2 className="text-[22px] font-bold text-[#1c1c1e]">En vedette</h2>
      </div>
      <div className="flex gap-4 overflow-x-auto scrollbar-hide px-5 max-w-5xl mx-auto pb-1">
        {apps.map(app => (
          <FeaturedCard key={app.id} app={app} />
        ))}
      </div>
    </section>
  );
}
