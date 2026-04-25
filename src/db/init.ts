import { migrate } from 'drizzle-orm/better-sqlite3/migrator';
import { db } from './index';
import { adminUsers } from './schema';
import bcrypt from 'bcryptjs';
import path from 'path';

export async function runMigrations() {
  const migrationsFolder = path.join(process.cwd(), 'drizzle');

  migrate(db, { migrationsFolder });

  const existing = db.select().from(adminUsers).limit(1).all();
  if (existing.length === 0) {
    const username = process.env.ADMIN_USERNAME ?? 'admin';
    const password = process.env.ADMIN_PASSWORD ?? 'changeme';
    const passwordHash = bcrypt.hashSync(password, 12);
    db.insert(adminUsers).values({ username, passwordHash }).run();
    console.log(`[store] Admin user "${username}" created`);
  }
}
