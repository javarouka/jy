import log from 'electron-log'
import { PrismaClient } from '@prisma/client'

// Define custom types that match Prisma's internal types
type QueryEvent = {
  timestamp: Date
  query: string
  params: string
  duration: number
  target: string
}

type LogEvent = {
  timestamp: Date
  message: string
  target: string
}

// Define event types
type LogLevel = 'info' | 'query' | 'warn' | 'error'
type ExtendedEventType = LogLevel | 'beforeExit'

// Extend PrismaClient to include the $on method with the correct types
declare module '@prisma/client' {
  interface PrismaClient {
    $on<E extends ExtendedEventType>(
      eventType: E,
      callback: E extends 'query'
        ? (event: QueryEvent) => void
        : E extends 'info' | 'warn' | 'error'
          ? (event: LogEvent) => void
          : () => void
    ): void
  }
}

log.transports.file.maxSize = 5 * 1024 * 1024 // 5MB
log.transports.file.level = 'info'

export const initPrisma = (prisma: PrismaClient) => {
  // Prisma 이벤트 리스너
  prisma.$on('query', (e: QueryEvent) => {
    log.info(`Prisma Query: ${e.query}`)
  })

  prisma.$on('info', (e: LogEvent) => {
    log.info(`Prisma Info: ${e.message}`)
  })

  prisma.$on('warn', (e: LogEvent) => {
    log.warn(`Prisma Warn: ${e.message}`)
  })

  prisma.$on('error', (e: LogEvent) => {
    log.error(`Prisma Error: ${e.message}`)
  })
}

export default log
