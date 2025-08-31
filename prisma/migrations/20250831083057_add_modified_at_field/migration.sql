-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_AcademicActivityLog" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "act" TEXT NOT NULL,
    "activityName" TEXT NOT NULL,
    "activityType" TEXT NOT NULL,
    "activityDate" DATETIME NOT NULL,
    "organization" TEXT NOT NULL,
    "sessionName" TEXT NOT NULL,
    "creditTime" INTEGER NOT NULL,
    "usable" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modifiedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_AcademicActivityLog" ("act", "activityDate", "activityName", "activityType", "createdAt", "creditTime", "id", "organization", "sessionName", "usable") SELECT "act", "activityDate", "activityName", "activityType", "createdAt", "creditTime", "id", "organization", "sessionName", "usable" FROM "AcademicActivityLog";
DROP TABLE "AcademicActivityLog";
ALTER TABLE "new_AcademicActivityLog" RENAME TO "AcademicActivityLog";
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
INSERT INTO "new_AssessmentLog" ("age", "clientName", "createdAt", "creditTime", "dx", "gender", "id", "researchDate", "researchType", "usable") SELECT "age", "clientName", "createdAt", "creditTime", "dx", "gender", "id", "researchDate", "researchType", "usable" FROM "AssessmentLog";
DROP TABLE "AssessmentLog";
ALTER TABLE "new_AssessmentLog" RENAME TO "AssessmentLog";
CREATE TABLE "new_GroupTherapyLog" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "groupName" TEXT NOT NULL,
    "threapyType" TEXT NOT NULL,
    "researchDate" DATETIME NOT NULL,
    "sessionCount" INTEGER NOT NULL,
    "prepareTime" INTEGER NOT NULL,
    "sessionTime" INTEGER NOT NULL,
    "supervisionTime" INTEGER NOT NULL,
    "startDate" DATETIME NOT NULL,
    "endDate" DATETIME NOT NULL,
    "usable" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modifiedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_GroupTherapyLog" ("createdAt", "endDate", "groupName", "id", "prepareTime", "researchDate", "sessionCount", "sessionTime", "startDate", "supervisionTime", "threapyType", "usable") SELECT "createdAt", "endDate", "groupName", "id", "prepareTime", "researchDate", "sessionCount", "sessionTime", "startDate", "supervisionTime", "threapyType", "usable" FROM "GroupTherapyLog";
DROP TABLE "GroupTherapyLog";
ALTER TABLE "new_GroupTherapyLog" RENAME TO "GroupTherapyLog";
CREATE TABLE "new_IndividualTherapyLog" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "clientName" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "gender" TEXT NOT NULL,
    "threapyType" TEXT NOT NULL,
    "researchDate" DATETIME NOT NULL,
    "sessionCount" INTEGER NOT NULL,
    "prepareTime" INTEGER NOT NULL,
    "sessionTime" INTEGER NOT NULL,
    "supervisionTime" INTEGER NOT NULL,
    "startDate" DATETIME NOT NULL,
    "endDate" DATETIME NOT NULL,
    "usable" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modifiedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_IndividualTherapyLog" ("age", "clientName", "createdAt", "endDate", "gender", "id", "prepareTime", "researchDate", "sessionCount", "sessionTime", "startDate", "supervisionTime", "threapyType", "usable") SELECT "age", "clientName", "createdAt", "endDate", "gender", "id", "prepareTime", "researchDate", "sessionCount", "sessionTime", "startDate", "supervisionTime", "threapyType", "usable" FROM "IndividualTherapyLog";
DROP TABLE "IndividualTherapyLog";
ALTER TABLE "new_IndividualTherapyLog" RENAME TO "IndividualTherapyLog";
CREATE TABLE "new_OtherActivityLog" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "activitySummary" TEXT NOT NULL,
    "activityType" TEXT NOT NULL,
    "startDate" DATETIME NOT NULL,
    "endDate" DATETIME NOT NULL,
    "creditTime" INTEGER NOT NULL,
    "usable" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modifiedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_OtherActivityLog" ("activitySummary", "activityType", "createdAt", "creditTime", "endDate", "id", "startDate", "usable") SELECT "activitySummary", "activityType", "createdAt", "creditTime", "endDate", "id", "startDate", "usable" FROM "OtherActivityLog";
DROP TABLE "OtherActivityLog";
ALTER TABLE "new_OtherActivityLog" RENAME TO "OtherActivityLog";
CREATE TABLE "new_ResearchLog" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "publishDate" DATETIME NOT NULL,
    "pagerName" TEXT NOT NULL,
    "journalName" TEXT NOT NULL,
    "participateType" TEXT NOT NULL,
    "usable" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modifiedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_ResearchLog" ("createdAt", "id", "journalName", "pagerName", "participateType", "publishDate", "usable") SELECT "createdAt", "id", "journalName", "pagerName", "participateType", "publishDate", "usable" FROM "ResearchLog";
DROP TABLE "ResearchLog";
ALTER TABLE "new_ResearchLog" RENAME TO "ResearchLog";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
