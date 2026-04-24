import HeroSection from '@/components/store/HeroSection';
import FeaturedAppsRow from '@/components/store/FeaturedAppsRow';
import AppGrid from '@/components/store/AppGrid';
import { getPublishedApps } from '@/lib/actions/apps';

export default function StorePage() {
  const allApps = getPublishedApps();
  const featuredApps = allApps.filter(a => a.featured);
  const otherApps = featuredApps.length > 0
    ? allApps.filter(a => !a.featured)
    : allApps;

  return (
    <main className="min-h-screen">
      <HeroSection />
      {featuredApps.length > 0 && <FeaturedAppsRow apps={featuredApps} />}
      <AppGrid
        apps={otherApps}
        title={featuredApps.length > 0 ? 'Toutes les applications' : undefined}
      />
    </main>
  );
}
