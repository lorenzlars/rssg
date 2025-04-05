import { z } from 'zod'

export const rssFeedSchema = z.object({
  description: z.string().optional(),
  url: z.string().url(),
  code: z.string().optional(),
  manual: z.boolean().default(false),
  interval: z.number()
})

export type RssFeed = z.infer<typeof rssFeedSchema>
