import { PrismaClient } from '@prisma/client/edge'

let instance: PrismaClient

export default function () {
  if (!instance) {
    if (process.env.NODE_ENV === 'development') {
      instance = new PrismaClient({
        log: ['query']
      })

      instance.$on('query', (e) => {
        console.log('Query: ' + e.query)
        console.log('Params: ' + e.params)
        console.log('Duration: ' + e.duration + 'ms')
      })
    } else {
      instance = new PrismaClient()
    }
  }

  return instance
}
