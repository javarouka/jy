/*
  Warnings:

  - You are about to drop the column `notes` on the `AssessmentLog` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_AssessmentLog" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "clientName" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "gender" TEXT NOT NULL,
    "dx" TEXT NOT NULL,
    "researchType" TEXT NOT NULL,
    "researchDate" DATETIME NOT NULL,
    "creditTime" INTEGER NOT NULL,
    "usable" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modifiedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_AssessmentLog" ("age", "clientName", "createdAt", "creditTime", "dx", "gender", "id", "modifiedAt", "researchDate", "researchType", "usable") SELECT "age", "clientName", "createdAt", "creditTime", "dx", "gender", "id", "modifiedAt", "researchDate", "researchType", "usable" FROM "AssessmentLog";
DROP TABLE "AssessmentLog";
ALTER TABLE "new_AssessmentLog" RENAME TO "AssessmentLog";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
