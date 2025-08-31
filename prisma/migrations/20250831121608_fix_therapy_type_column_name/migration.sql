/*
  Warnings:

  - You are about to drop the column `threapyType` on the `GroupTherapyLog` table. All the data in the column will be lost.
  - You are about to drop the column `threapyType` on the `IndividualTherapyLog` table. All the data in the column will be lost.
  - Added the required column `therapyType` to the `GroupTherapyLog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `therapyType` to the `IndividualTherapyLog` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_GroupTherapyLog" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "groupName" TEXT NOT NULL,
    "therapyType" TEXT NOT NULL,
    "researchDate" DATETIME NOT NULL,
    "sessionCount" INTEGER NOT NULL,
    "prepareTime" INTEGER NOT NULL,
    "sessionTime" INTEGER NOT NULL,
    "supervisionTime" INTEGER NOT NULL,
    "startDate" DATETIME NOT NULL,
    "endDate" DATETIME NOT NULL,
    "usable" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modifiedAt" DATETIME NOT NULL
);
INSERT INTO "new_GroupTherapyLog" ("createdAt", "endDate", "groupName", "id", "modifiedAt", "prepareTime", "researchDate", "sessionCount", "sessionTime", "startDate", "supervisionTime", "usable", "therapyType") SELECT "createdAt", "endDate", "groupName", "id", "modifiedAt", "prepareTime", "researchDate", "sessionCount", "sessionTime", "startDate", "supervisionTime", "usable", "threapyType" FROM "GroupTherapyLog";
DROP TABLE "GroupTherapyLog";
ALTER TABLE "new_GroupTherapyLog" RENAME TO "GroupTherapyLog";
CREATE TABLE "new_IndividualTherapyLog" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "clientName" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "gender" TEXT NOT NULL,
    "therapyType" TEXT NOT NULL,
    "researchDate" DATETIME NOT NULL,
    "sessionCount" INTEGER NOT NULL,
    "prepareTime" INTEGER NOT NULL,
    "sessionTime" INTEGER NOT NULL,
    "supervisionTime" INTEGER NOT NULL,
    "startDate" DATETIME NOT NULL,
    "endDate" DATETIME NOT NULL,
    "usable" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modifiedAt" DATETIME NOT NULL
);
INSERT INTO "new_IndividualTherapyLog" ("age", "clientName", "createdAt", "endDate", "gender", "id", "modifiedAt", "prepareTime", "researchDate", "sessionCount", "sessionTime", "startDate", "supervisionTime", "usable", "therapyType") SELECT "age", "clientName", "createdAt", "endDate", "gender", "id", "modifiedAt", "prepareTime", "researchDate", "sessionCount", "sessionTime", "startDate", "supervisionTime", "usable", "threapyType" FROM "IndividualTherapyLog";
DROP TABLE "IndividualTherapyLog";
ALTER TABLE "new_IndividualTherapyLog" RENAME TO "IndividualTherapyLog";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
