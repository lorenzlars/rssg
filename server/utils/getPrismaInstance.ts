import { PrismaClient } from '@prisma/client/edge'
import { createConsola } from 'consola'

let instance: PrismaClient

export default function () {
  if (!instance) {
    if (process.env.NODE_ENV === 'development') {
      const logger = createConsola({
        level: 5,
        fancy: true,
        formatOptions: {
          colors: true,
          compact: false,
          date: true
        }
      })

      instance = new PrismaClient({
        log: ['query']
      })

      instance.$on('query', (e) => {
        logger.info('Query: ' + e.query)
        logger.info('Params: ' + e.params)
        logger.info('Duration: ' + e.duration + 'ms')
      })
    } else {
      instance = new PrismaClient()
    }
  }

  return instance
}
