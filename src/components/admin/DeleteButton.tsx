'use client';

import { deleteAppAction } from '@/lib/actions/apps';
import { Trash2 } from 'lucide-react';

export default function DeleteButton({ id, name }: { id: number; name: string }) {
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!confirm(`Supprimer "${name}" ? Cette action est irréversible.`)) return;
    const form = e.currentTarget;
    const formData = new FormData(form);
    await deleteAppAction(formData);
    window.location.reload();
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        className="inline-flex items-center gap-1 px-3 py-1.5 text-sm text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
      >
        <Trash2 size={14} />
        Supprimer
      </button>
    </form>
  );
}
