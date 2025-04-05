import { z } from 'zod'

export const rssFeedSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  url: z.string().url(),
  code: z.string().optional(),
  manual: z.boolean().default(false)
})

export type RssFeed = z.infer<typeof rssFeedSchema>
