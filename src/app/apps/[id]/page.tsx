export const dynamic = 'force-dynamic';

import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { getAppById } from '@/lib/queries';

export default async function AppDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const app = getAppById(Number(id));

  if (!app || app.status !== 'published') notFound();

  const tags: string[] = JSON.parse(app.tags ?? '[]');

  return (
    <div className="min-h-screen bg-[#f2f2f7]" style={{ fontFamily: '-apple-system, "SF Pro Display", "Helvetica Neue", Arial, sans-serif', WebkitFontSmoothing: 'antialiased' }}>
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[rgba(242,242,247,0.85)] backdrop-blur-xl border-b border-black/5">
        <div className="max-w-2xl mx-auto px-5 flex items-center h-14 gap-3">
          <Link href="/" className="flex items-center gap-1 text-[#007aff] text-[16px] font-medium">
            <ArrowLeft size={18} />
            Store
          </Link>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-5 pb-16">
        {/* App identity */}
        <div className="flex items-start gap-5 pt-7 pb-6">
          <div className="relative w-[110px] h-[110px] shrink-0">
            {app.iconUrl ? (
              <Image
                src={app.iconUrl}
                alt={app.name}
                fill
                className="rounded-[24px] object-cover"
                style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.15)' }}
                sizes="110px"
              />
            ) : (
              <div
                className="w-full h-full rounded-[24px] flex items-center justify-center text-white font-bold text-[44px]"
                style={{
                  background: `hsl(${(app.name.charCodeAt(0) * 37) % 360}, 65%, 50%)`,
                  boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
                }}
              >
                {app.name.charAt(0).toUpperCase()}
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0 pt-1">
            <h1 className="text-[26px] font-bold text-[#1c1c1e] leading-tight">{app.name}</h1>
            <p className="text-[15px] text-[#636366] mt-1 leading-snug">{app.tagline}</p>

            {tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-3">
                {tags.map(tag => (
                  <span key={tag} className="px-2.5 py-0.5 rounded-full text-[11px] font-medium text-[#636366] bg-black/[0.07]">
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <a
              href={app.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-4 px-6 py-2 rounded-full text-[15px] font-semibold text-white bg-[#007aff] hover:bg-[#0071e3] transition-colors"
            >
              Ouvrir l&apos;app
              <ExternalLink size={14} />
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-black/[0.06] mb-6" />

        {/* Screenshot */}
        {app.screenshotUrl && (
          <div className="mb-6">
            <h2 className="text-[18px] font-bold text-[#1c1c1e] mb-4">Aperçu</h2>
            <div className="relative w-full rounded-[18px] overflow-hidden bg-white" style={{ boxShadow: '0 2px 16px rgba(0,0,0,0.08)' }}>
              <Image
                src={app.screenshotUrl}
                alt={`${app.name} screenshot`}
                width={800}
                height={450}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        )}

        {/* Description */}
        <div className="bg-white rounded-[18px] p-5" style={{ boxShadow: '0 2px 16px rgba(0,0,0,0.06)' }}>
          <h2 className="text-[18px] font-bold text-[#1c1c1e] mb-3">Description</h2>
          <p className="text-[15px] text-[#3a3a3c] leading-relaxed whitespace-pre-line">{app.description}</p>
        </div>

        {/* CTA bottom */}
        <div className="mt-6 flex justify-center">
          <a
            href={app.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-10 py-3 rounded-full text-[16px] font-semibold text-white bg-[#007aff] hover:bg-[#0071e3] transition-colors"
            style={{ boxShadow: '0 4px 14px rgba(0,122,255,0.35)' }}
          >
            Ouvrir {app.name}
            <ExternalLink size={15} />
          </a>
        </div>
      </main>
    </div>
  );
}
