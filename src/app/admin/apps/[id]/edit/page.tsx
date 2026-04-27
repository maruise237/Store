export const dynamic = 'force-dynamic';

import { notFound } from 'next/navigation';
import AppForm from '@/components/admin/AppForm';
import { getAppById } from '@/lib/queries';
import { updateAppAction } from '@/lib/actions/apps';
import type { ActionState } from '@/lib/actions/apps';

export default async function EditAppPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const app = getAppById(Number(id));

  if (!app) notFound();

  async function boundUpdateAction(prevState: ActionState, formData: FormData) {
    'use server';
    return updateAppAction(app!.id, prevState, formData);
  }

  return (
    <div className="max-w-2xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Modifier l&apos;application</h1>
        <p className="text-sm text-gray-500 mt-0.5">{app.name}</p>
      </div>
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <AppForm action={boundUpdateAction} app={app} />
      </div>
    </div>
  );
}
