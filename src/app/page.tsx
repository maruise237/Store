export const dynamic = 'force-dynamic';

import StoreHeader from '@/components/store/StoreHeader';
import HeroSection from '@/components/store/HeroSection';
import FeaturedAppsRow from '@/components/store/FeaturedAppsRow';
import AppGrid from '@/components/store/AppGrid';
import { getPublishedApps } from '@/lib/queries';

export default function StorePage() {
  const allApps = getPublishedApps();
  const featured = allApps.filter(a => a.featured);
  const rest = allApps.filter(a => !a.featured);

  const heroApp = featured[0];
  const carouselApps = featured.slice(1);

  return (
    <div className="min-h-screen">
      <StoreHeader />
      <HeroSection featuredApp={heroApp} />
      {carouselApps.length > 0 && <FeaturedAppsRow apps={carouselApps} />}
      {rest.length > 0 && <AppGrid apps={rest} title="Toutes les apps" />}
      {allApps.length === 0 && (
        <AppGrid apps={[]} />
      )}
    </div>
  );
}
