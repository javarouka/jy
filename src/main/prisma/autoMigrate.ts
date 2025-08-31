import { execSync } from 'child_process'
import { existsSync, readFileSync, writeFileSync } from 'fs'
import { join } from 'path'
import { app } from 'electron'
import log from '../mainLogger'

// Get the application root path
const APP_ROOT = app.getAppPath()

// Path to the schema file
const SCHEMA_PATH = join(APP_ROOT, 'prisma/schema.prisma')
// Path to store the hash of the last schema
const SCHEMA_HASH_PATH = join(APP_ROOT, 'prisma/.schema-hash')

/**
 * Calculate a simple hash of the schema file content
 * @param content Schema file content
 * @returns Hash string
 */
function calculateSchemaHash(content: string): string {
  let hash = 0
  for (let i = 0; i < content.length; i++) {
    const char = content.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash = hash & hash // Convert to 32bit integer
  }
  return hash.toString(16)
}

/**
 * Check if the schema has changed by comparing hashes
 * @returns true if schema has changed, false otherwise
 */
function hasSchemaChanged(): boolean {
  try {
    // Check if schema file exists
    if (!existsSync(SCHEMA_PATH)) {
      log.error(`Schema file not found at path: ${SCHEMA_PATH}`)
      log.info(`Current application path: ${APP_ROOT}`)
      return false
    }

    // Read current schema
    const schemaContent = readFileSync(SCHEMA_PATH, 'utf-8')
    const currentHash = calculateSchemaHash(schemaContent)

    // If hash file doesn't exist, create it and return true (first run)
    if (!existsSync(SCHEMA_HASH_PATH)) {
      try {
        writeFileSync(SCHEMA_HASH_PATH, currentHash)
        log.info(`Created new schema hash file at: ${SCHEMA_HASH_PATH}`)
        return true
      } catch (writeError) {
        log.error(`Failed to create schema hash file: ${writeError}`)
        return false
      }
    }

    // Compare with stored hash
    try {
      const storedHash = readFileSync(SCHEMA_HASH_PATH, 'utf-8')

      if (currentHash !== storedHash) {
        // Update stored hash
        writeFileSync(SCHEMA_HASH_PATH, currentHash)
        log.info(`Schema has changed. Updated hash file.`)
        return true
      }

      return false
    } catch (readError) {
      log.error(`Failed to read schema hash file: ${readError}`)
      return false
    }
  } catch (error) {
    log.error(`Error checking schema changes: ${error}`)
    log.info(`Attempted to access schema at: ${SCHEMA_PATH}`)
    return false
  }
}

/**
 * Run Prisma migration
 * @param isProd Whether to run in production mode
 */
function runMigration(isProd: boolean = false): void {
  try {
    log.info('Schema changes detected. Running Prisma migration...')

    const command = isProd
      ? 'npx prisma migrate deploy'
      : 'npx prisma migrate dev --name auto-migration'

    const output = execSync(command, {
      cwd: APP_ROOT,
      encoding: 'utf-8'
    })

    log.info(`Migration completed: ${output}`)
  } catch (error) {
    log.error(`Migration failed: ${error}`)
    throw error
  }
}

/**
 * Check for schema changes and run migrations if needed
 * @param isProd Whether to run in production mode
 */
export function autoMigrate(isProd: boolean = false): void {
  try {
    if (hasSchemaChanged()) {
      runMigration(isProd)
    } else {
      log.info('No schema changes detected. Skipping migration.')
    }
  } catch (error) {
    log.error(`Auto-migration failed: ${error}`)
    // Don't throw here to prevent app from crashing
  }
}
