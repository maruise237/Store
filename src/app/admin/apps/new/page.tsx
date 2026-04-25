import AppForm from '@/components/admin/AppForm';
import { createAppAction } from '@/lib/actions/apps';

export default function NewAppPage() {
  return (
    <div className="max-w-2xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Nouvelle application</h1>
        <p className="text-sm text-gray-500 mt-0.5">Ajoutez une application à votre store</p>
      </div>
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <AppForm action={createAppAction} />
      </div>
    </div>
  );
}
