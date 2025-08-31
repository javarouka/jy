# Automatic Prisma Migrations

This directory contains utilities for automatically running Prisma migrations when the schema changes.

## How It Works

The `autoMigrate.ts` file implements a system that:

1. Calculates a hash of the current `schema.prisma` file
2. Compares it with a stored hash from the last run
3. If the schema has changed, automatically runs the appropriate migration command
4. Logs the process and any errors

## Usage

The automatic migration system is integrated into the application startup process in `src/main/index.ts`. When the application starts:

1. It checks if the schema has changed
2. If changes are detected, it runs the appropriate migration command:
   - In development mode: `npx prisma migrate dev --name auto-migration`
   - In production mode: `npx prisma migrate deploy`

## Benefits

- No need to manually run migrations when schema changes
- Ensures the database schema is always up-to-date
- Works in both development and production environments
- Logs migration processes and errors for debugging

## Testing

To test the automatic migration system:

1. Make a change to the `prisma/schema.prisma` file (e.g., add a new field to a model)
2. Start the application
3. Check the logs to see if a migration was performed
4. Verify that the database schema was updated correctly

## Troubleshooting

If migrations are not running automatically:

1. Check the application logs for any errors
   - The system now provides detailed error messages about file paths
   - Look for messages indicating "Schema file not found" or path-related errors
2. Verify the application is finding the correct schema file path
   - The logs will show the exact path being used: `Schema file not found at path: [path]`
   - The logs will also show the application root path: `Current application path: [path]`
3. Make sure the `.schema-hash` file exists in the `prisma` directory
4. Try running the migration manually using `npm run prisma-migration` or `npm run prisma-migration:prod`
5. If the issue persists, delete the `.schema-hash` file and restart the application

## Notes

- The first time the application runs, it will create a `.schema-hash` file in the `prisma` directory
- Subsequent runs will compare the current schema hash with the stored hash
- If you want to force a migration, delete the `.schema-hash` file and restart the application
- The system uses Electron's `app.getAppPath()` to determine the application root directory, ensuring reliable path resolution regardless of how the application is packaged or run
- All paths to the schema file and hash file are constructed as absolute paths from the application root, avoiding issues with relative path resolution
