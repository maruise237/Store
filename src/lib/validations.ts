import { z } from 'zod';

export const appSchema = z.object({
  name:          z.string().min(1, 'Name is required').max(100),
  tagline:       z.string().min(1, 'Tagline is required').max(200),
  description:   z.string().min(1, 'Description is required'),
  iconUrl:       z.string().url('Must be a valid URL').optional().or(z.literal('')),
  screenshotUrl: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  websiteUrl:    z.string().url('Must be a valid URL'),
  tags:          z.string(),
  status:        z.enum(['published', 'draft']),
  featured:      z.boolean().default(false),
});

export type AppFormData = z.infer<typeof appSchema>;
