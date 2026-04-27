import Link from 'next/link';
import { PlusCircle } from 'lucide-react';
import AppTable from '@/components/admin/AppTable';
import { getAllApps } from '@/lib/queries';

export default function DashboardPage() {
  const apps = getAllApps();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Applications</h1>
          <p className="text-sm text-gray-500 mt-0.5">{apps.length} application{apps.length !== 1 ? 's' : ''} au total</p>
        </div>
        <Link
          href="/admin/apps/new"
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-medium transition-colors"
        >
          <PlusCircle size={16} />
          Nouvelle application
        </Link>
      </div>

      <AppTable apps={apps} />
    </div>
  );
}
