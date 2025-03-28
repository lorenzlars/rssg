import { z } from 'zod'

export const feedSchema = z.object({
  description: z.string(),
  code: z.string(),
  interval: z.number()
})
