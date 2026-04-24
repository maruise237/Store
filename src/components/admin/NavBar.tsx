import Link from 'next/link';
import { logoutAction } from '@/lib/actions/auth';
import { LayoutDashboard, PlusCircle, Store } from 'lucide-react';

export default function NavBar() {
  return (
    <nav className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-14">
        <div className="flex items-center gap-6">
          <span className="font-bold text-gray-900">KamTech — Admin</span>
          <div className="flex items-center gap-4 text-sm">
            <Link href="/admin/dashboard" className="flex items-center gap-1.5 text-gray-600 hover:text-gray-900 transition-colors">
              <LayoutDashboard size={15} />
              Dashboard
            </Link>
            <Link href="/admin/apps/new" className="flex items-center gap-1.5 text-gray-600 hover:text-gray-900 transition-colors">
              <PlusCircle size={15} />
              Nouvelle app
            </Link>
            <Link href="/" className="flex items-center gap-1.5 text-gray-600 hover:text-gray-900 transition-colors">
              <Store size={15} />
              Voir le store
            </Link>
          </div>
        </div>
        <form action={logoutAction}>
          <button type="submit" className="text-sm text-gray-500 hover:text-red-600 transition-colors">
            Déconnexion
          </button>
        </form>
      </div>
    </nav>
  );
}
