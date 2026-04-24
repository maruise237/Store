import Link from 'next/link';
import { Pencil, Star } from 'lucide-react';
import DeleteButton from './DeleteButton';
import type { App } from '@/db/schema';

export default function AppTable({ apps }: { apps: App[] }) {
  if (apps.length === 0) {
    return (
      <div className="text-center py-16 text-gray-400">
        <p className="text-lg">Aucune application. <Link href="/admin/apps/new" className="text-blue-600 hover:underline">Ajoutez-en une !</Link></p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-100 bg-gray-50 text-left text-gray-500 uppercase text-xs tracking-wider">
            <th className="px-5 py-3">Application</th>
            <th className="px-5 py-3">Statut</th>
            <th className="px-5 py-3">Vedette</th>
            <th className="px-5 py-3">Créée le</th>
            <th className="px-5 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {apps.map(app => (
            <tr key={app.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50">
              <td className="px-5 py-4">
                <div>
                  <p className="font-medium text-gray-900">{app.name}</p>
                  <p className="text-gray-400 truncate max-w-xs">{app.tagline}</p>
                </div>
              </td>
              <td className="px-5 py-4">
                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                  app.status === 'published'
                    ? 'bg-green-50 text-green-700'
                    : 'bg-yellow-50 text-yellow-700'
                }`}>
                  {app.status === 'published' ? 'Publié' : 'Brouillon'}
                </span>
              </td>
              <td className="px-5 py-4">
                {app.featured && <Star size={16} className="text-yellow-500 fill-yellow-400" />}
              </td>
              <td className="px-5 py-4 text-gray-400">
                {app.createdAt ? new Date(app.createdAt).toLocaleDateString('fr-FR') : '—'}
              </td>
              <td className="px-5 py-4">
                <div className="flex items-center gap-1">
                  <Link
                    href={`/admin/apps/${app.id}/edit`}
                    className="inline-flex items-center gap-1 px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <Pencil size={14} />
                    Modifier
                  </Link>
                  <DeleteButton id={app.id} name={app.name} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
