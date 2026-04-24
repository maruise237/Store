'use server';

import { redirect } from 'next/navigation';
import { db } from '@/db';
import { adminUsers } from '@/db/schema';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import { getSession } from '@/lib/session';

export async function loginAction(
  _prevState: { error?: string } | null,
  formData: FormData
): Promise<{ error: string }> {
  const username = formData.get('username') as string;
  const password = formData.get('password') as string;

  if (!username || !password) {
    return { error: 'Username and password are required' };
  }

  const user = db.select().from(adminUsers).where(eq(adminUsers.username, username)).get();

  if (!user || !bcrypt.compareSync(password, user.passwordHash)) {
    return { error: 'Invalid credentials' };
  }

  const session = await getSession();
  session.userId = user.id;
  session.username = user.username;
  session.isLoggedIn = true;
  await session.save();

  redirect('/admin/dashboard');
}

export async function logoutAction() {
  const session = await getSession();
  session.destroy();
  redirect('/admin/login');
}
