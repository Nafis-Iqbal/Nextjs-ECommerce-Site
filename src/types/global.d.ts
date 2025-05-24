/* eslint-disable no-var */
import { PrismaClient } from '@prisma/client'

declare global {
  var client: PrismaClient | undefined;
}

export {}
