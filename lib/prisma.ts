import { PrismaClient } from '@prisma/client'
import { PrismaPostgres } from '@prisma/adapter-postgresql'
import { Pool } from 'pg'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

const pool = process.env.DATABASE_URL ? new Pool({ connectionString: process.env.DATABASE_URL }) : undefined
const adapter = pool ? new PrismaPostgres(pool) : undefined

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  adapter: adapter,
})

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

