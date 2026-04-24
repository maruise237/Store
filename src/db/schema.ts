import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const apps = sqliteTable('apps', {
  id:            integer('id').primaryKey({ autoIncrement: true }),
  name:          text('name').notNull(),
  tagline:       text('tagline').notNull(),
  description:   text('description').notNull(),
  iconUrl:       text('icon_url'),
  screenshotUrl: text('screenshot_url'),
  websiteUrl:    text('website_url').notNull(),
  tags:          text('tags').notNull().default('[]'),
  status:        text('status', { enum: ['published', 'draft'] }).notNull().default('published'),
  featured:      integer('featured', { mode: 'boolean' }).notNull().default(false),
  createdAt:     integer('created_at', { mode: 'timestamp' })
                   .notNull()
                   .$defaultFn(() => new Date()),
});

export const adminUsers = sqliteTable('admin_users', {
  id:           integer('id').primaryKey({ autoIncrement: true }),
  username:     text('username').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
});

export type App = typeof apps.$inferSelect;
export type NewApp = typeof apps.$inferInsert;
export type AdminUser = typeof adminUsers.$inferSelect;
