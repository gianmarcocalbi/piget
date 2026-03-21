import { defineCollection, z } from 'astro:content';

const songs = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    order: z.number().int().nonnegative(),
    heroImage: z.string(),
    platformUrls: z.record(z.string().url()).default({}),
    lyrics: z.string(),
  }),
});

export const collections = {
  songs,
};
