/*
  Warnings:

  - Added the required column `creditTime` to the `ResearchLog` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ResearchLog" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "publishDate" DATETIME NOT NULL,
    "pagerName" TEXT NOT NULL,
    "journalName" TEXT NOT NULL,
    "participateType" TEXT NOT NULL,
    "creditTime" INTEGER NOT NULL,
    "usable" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modifiedAt" DATETIME NOT NULL
);
INSERT INTO "new_ResearchLog" ("createdAt", "id", "journalName", "modifiedAt", "pagerName", "participateType", "publishDate", "usable", "creditTime") SELECT "createdAt", "id", "journalName", "modifiedAt", "pagerName", "participateType", "publishDate", "usable", 0 FROM "ResearchLog";
DROP TABLE "ResearchLog";
ALTER TABLE "new_ResearchLog" RENAME TO "ResearchLog";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
