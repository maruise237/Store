'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { db } from '@/db';
import { apps } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';
import { appSchema } from '@/lib/validations';
import type { App } from '@/db/schema';

function parseFormData(formData: FormData) {
  return {
    name:          formData.get('name') as string,
    tagline:       formData.get('tagline') as string,
    description:   formData.get('description') as string,
    iconUrl:       formData.get('iconUrl') as string,
    screenshotUrl: formData.get('screenshotUrl') as string,
    websiteUrl:    formData.get('websiteUrl') as string,
    tags:          formData.get('tags') as string,
    status:        formData.get('status') as 'published' | 'draft',
    featured:      formData.get('featured') === 'on',
  };
}

function tagsToJson(raw: string): string {
  return JSON.stringify(
    raw.split(',').map(t => t.trim()).filter(Boolean)
  );
}

export type ActionState = { errors?: Record<string, string[]>; message?: string } | null;

export async function createAppAction(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const raw = parseFormData(formData);
  const result = appSchema.safeParse(raw);

  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors };
  }

  const { tags, iconUrl, screenshotUrl, ...rest } = result.data;

  db.insert(apps).values({
    ...rest,
    iconUrl:       iconUrl || null,
    screenshotUrl: screenshotUrl || null,
    tags:          tagsToJson(tags),
  }).run();

  revalidatePath('/');
  revalidatePath('/admin/dashboard');
  redirect('/admin/dashboard');
}

export async function updateAppAction(
  id: number,
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const raw = parseFormData(formData);
  const result = appSchema.safeParse(raw);

  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors };
  }

  const { tags, iconUrl, screenshotUrl, ...rest } = result.data;

  db.update(apps).set({
    ...rest,
    iconUrl:       iconUrl || null,
    screenshotUrl: screenshotUrl || null,
    tags:          tagsToJson(tags),
  }).where(eq(apps.id, id)).run();

  revalidatePath('/');
  revalidatePath('/admin/dashboard');
  redirect('/admin/dashboard');
}

export async function deleteAppAction(formData: FormData) {
  const id = Number(formData.get('id'));
  db.delete(apps).where(eq(apps.id, id)).run();
  revalidatePath('/');
  revalidatePath('/admin/dashboard');
}

export function getPublishedApps(): App[] {
  return db.select().from(apps)
    .where(eq(apps.status, 'published'))
    .orderBy(desc(apps.createdAt))
    .all();
}

export function getAllApps(): App[] {
  return db.select().from(apps)
    .orderBy(desc(apps.createdAt))
    .all();
}

export function getAppById(id: number): App | undefined {
  return db.select().from(apps).where(eq(apps.id, id)).get();
}
