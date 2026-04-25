'use client';

import { useActionState } from 'react';
import { Loader2 } from 'lucide-react';
import type { ActionState } from '@/lib/actions/apps';
import type { App } from '@/db/schema';

interface Props {
  action: (prevState: ActionState, formData: FormData) => Promise<ActionState>;
  app?: App;
}

function FieldError({ errors, field }: { errors?: Record<string, string[]>; field: string }) {
  const msgs = errors?.[field];
  if (!msgs?.length) return null;
  return <p className="mt-1 text-xs text-red-600">{msgs[0]}</p>;
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      {children}
    </div>
  );
}

const inputClass = "px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white";

export default function AppForm({ action, app }: Props) {
  const [state, formAction, pending] = useActionState<ActionState, FormData>(action, null);

  const tags = app?.tags ? (JSON.parse(app.tags) as string[]).join(', ') : '';

  return (
    <form action={formAction} className="flex flex-col gap-5">
      <Field label="Nom de l'application *">
        <input name="name" defaultValue={app?.name ?? ''} className={inputClass} placeholder="Ex: MonSaaS" />
        <FieldError errors={state?.errors} field="name" />
      </Field>

      <Field label="Tagline *">
        <input name="tagline" defaultValue={app?.tagline ?? ''} className={inputClass} placeholder="Une courte description accrocheuse" />
        <FieldError errors={state?.errors} field="tagline" />
      </Field>

      <Field label="Description *">
        <textarea name="description" defaultValue={app?.description ?? ''} rows={4} className={inputClass} placeholder="Description détaillée de votre application..." />
        <FieldError errors={state?.errors} field="description" />
      </Field>

      <Field label="URL du site web *">
        <input name="websiteUrl" type="url" defaultValue={app?.websiteUrl ?? ''} className={inputClass} placeholder="https://mon-app.com" />
        <FieldError errors={state?.errors} field="websiteUrl" />
      </Field>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="URL de l'icône">
          <input name="iconUrl" type="url" defaultValue={app?.iconUrl ?? ''} className={inputClass} placeholder="https://..." />
          <FieldError errors={state?.errors} field="iconUrl" />
        </Field>

        <Field label="URL du screenshot">
          <input name="screenshotUrl" type="url" defaultValue={app?.screenshotUrl ?? ''} className={inputClass} placeholder="https://..." />
          <FieldError errors={state?.errors} field="screenshotUrl" />
        </Field>
      </div>

      <Field label="Tags (séparés par des virgules)">
        <input name="tags" defaultValue={tags} className={inputClass} placeholder="saas, productivité, IA" />
        <FieldError errors={state?.errors} field="tags" />
      </Field>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="Statut">
          <select name="status" defaultValue={app?.status ?? 'published'} className={inputClass}>
            <option value="published">Publié</option>
            <option value="draft">Brouillon</option>
          </select>
        </Field>

        <Field label="Options">
          <label className="flex items-center gap-2 mt-2 cursor-pointer select-none">
            <input type="checkbox" name="featured" defaultChecked={app?.featured ?? false} className="w-4 h-4 rounded accent-blue-600" />
            <span className="text-sm text-gray-700">Mettre en vedette</span>
          </label>
        </Field>
      </div>

      {state?.message && (
        <p className="text-sm text-red-600 bg-red-50 rounded-lg px-4 py-2">{state.message}</p>
      )}

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={pending}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-xl text-sm font-medium transition-colors"
        >
          {pending && <Loader2 size={14} className="animate-spin" />}
          {app ? 'Enregistrer les modifications' : 'Créer l\'application'}
        </button>
        <a href="/admin/dashboard" className="px-5 py-2.5 border border-gray-200 hover:bg-gray-50 rounded-xl text-sm font-medium text-gray-700 transition-colors">
          Annuler
        </a>
      </div>
    </form>
  );
}
