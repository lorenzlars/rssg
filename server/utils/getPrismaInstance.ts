import { PrismaClient } from '@prisma/client/edge'

let instance: PrismaClient

export default function () {
  if (!instance) {
    instance = new PrismaClient()
  }

  return instance
}
