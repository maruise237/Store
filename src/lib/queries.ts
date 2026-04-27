import { db } from '@/db';
import { apps } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';
import type { App } from '@/db/schema';

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
