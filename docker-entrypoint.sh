#!/bin/sh
set -e

DB_PATH="${DATABASE_URL:-./data/store.db}"

echo "[store] Running database migrations..."
node -e "
const Database = require('better-sqlite3');
const { drizzle } = require('drizzle-orm/better-sqlite3');
const { migrate } = require('drizzle-orm/better-sqlite3/migrator');
const path = require('path');

const dbPath = process.env.DATABASE_URL || './data/store.db';
const sqlite = new Database(dbPath);
sqlite.pragma('journal_mode = WAL');
const db = drizzle(sqlite);
migrate(db, { migrationsFolder: path.join(process.cwd(), 'drizzle') });
console.log('[store] Migrations complete');
"

echo "[store] Starting Next.js server..."
exec node server.js
