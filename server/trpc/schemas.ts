import { z } from 'zod'

export const rssFeedSchema = z.object({
  title: z.string(),
  description: z.string().optional().nullable(),
  url: z.string().url(),
  code: z.string().optional().nullable(),
  manual: z.boolean().default(false)
})

export type RssFeed = z.infer<typeof rssFeedSchema>
