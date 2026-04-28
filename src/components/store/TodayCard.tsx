import Image from 'next/image';
import Link from 'next/link';
import type { App } from '@/db/schema';

const gradients = [
  'linear-gradient(135deg, #1c1c1e 0%, #2c2c2e 100%)',
  'linear-gradient(135deg, #1a3a5c 0%, #0a2540 100%)',
  'linear-gradient(135deg, #2d1b69 0%, #11074f 100%)',
  'linear-gradient(135deg, #1a4731 0%, #0d2818 100%)',
  'linear-gradient(135deg, #5c1a1a 0%, #3d0000 100%)',
];

export default function TodayCard({ app, index }: { app: App; index: number }) {
  const gradient = gradients[index % gradients.length];

  return (
    <Link
      href={`/apps/${app.id}`}
      className="block rounded-[22px] overflow-hidden w-full cursor-pointer"
      style={{ background: gradient }}
    >
      {app.screenshotUrl && (
        <div className="relative w-full h-56 overflow-hidden">
          <Image
            src={app.screenshotUrl}
            alt={app.name}
            fill
            className="object-cover opacity-60"
            sizes="(max-width: 768px) 100vw, 600px"
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent 30%, rgba(0,0,0,0.5) 100%)' }} />
        </div>
      )}

      <div className={`px-6 pb-7 ${app.screenshotUrl ? 'pt-4' : 'pt-10'}`}>
        <p className="text-[11px] font-semibold text-white/60 uppercase tracking-widest mb-1">
          Application du jour
        </p>
        <h2 className="text-[28px] font-bold text-white leading-tight mb-2">{app.name}</h2>
        <p className="text-[15px] text-white/80 leading-snug line-clamp-2">{app.tagline}</p>
      </div>
    </Link>
  );
}
