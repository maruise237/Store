import Image from 'next/image';
import Link from 'next/link';
import type { App } from '@/db/schema';

export default function AppCard({ app }: { app: App }) {
  return (
    <Link href={`/apps/${app.id}`} className="flex items-center gap-4 py-3.5 border-b border-black/[0.06] last:border-0 hover:bg-black/[0.01] -mx-5 px-5 transition-colors">
      {/* Icon */}
      <div className="relative w-[62px] h-[62px] shrink-0">
        {app.iconUrl ? (
          <Image
            src={app.iconUrl}
            alt={app.name}
            fill
            className="rounded-[14px] object-cover"
            style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.12)' }}
            sizes="62px"
          />
        ) : (
          <div
            className="w-full h-full rounded-[14px] flex items-center justify-center text-white font-bold text-[22px]"
            style={{
              background: `hsl(${(app.name.charCodeAt(0) * 37) % 360}, 65%, 50%)`,
              boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
            }}
          >
            {app.name.charAt(0).toUpperCase()}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-[16px] font-semibold text-[#1c1c1e] truncate leading-tight">{app.name}</p>
        <p className="text-[13px] text-[#636366] truncate mt-0.5">{app.tagline}</p>
      </div>

      {/* Button */}
      <span
        onClick={e => e.preventDefault()}
        className="shrink-0 px-4 py-1.5 rounded-full text-[14px] font-semibold text-[#007aff] bg-[#007aff]/10"
      >
        Voir
      </span>
    </Link>
  );
}
