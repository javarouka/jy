# Prisma Database Schema

This directory contains the Prisma schema and migrations for the application's database.

## Database Models

The database includes the following models:

- **AssessmentLog**: Records of psychological assessments
- **IndividualTherapyLog**: Records of individual therapy sessions
- **GroupTherapyLog**: Records of group therapy sessions
- **AcademicActivityLog**: Records of academic activities
- **ResearchLog**: Records of research activities
- **OtherActivityLog**: Records of other professional activities

## Automatic Field Updates

### modifiedAt Fields

All models include a `modifiedAt` field that is automatically updated whenever a record is modified. This is implemented using Prisma's `@updatedAt` attribute in the schema:

```
modifiedAt    DateTime @updatedAt
```

This ensures that the `modifiedAt` field always reflects the time of the most recent modification to the record, without requiring any manual updates in the application code.

### createdAt Fields

All models also include a `createdAt` field that is automatically set to the current time when a record is created:

```
createdAt     DateTime @default(now())
```

## Migrations

The `migrations` directory contains all database migrations. When the schema is modified, a new migration is automatically created and applied using the automatic migration system documented in `/src/main/prisma/README.md`.

## Database Files

- `dev.db`: The SQLite database file used in development
- `data.db`: An additional database file (may be used for testing or other purposes)

## Usage in Application

The Prisma client is initialized in `/src/main/index.ts` and used throughout the application to interact with the database. The client is configured with logging to track database operations.

## Testing Schema Changes

To test schema changes:

1. Modify the `schema.prisma` file
2. Start the application, which will automatically detect the changes and run a migration
3. Verify that the changes are applied correctly by checking the database or using the application

For more details on the automatic migration system, see `/src/main/prisma/README.md`.
