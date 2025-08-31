-- CreateTable
CREATE TABLE "AssessmentLog" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "clientName" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "gender" TEXT NOT NULL,
    "dx" TEXT NOT NULL,
    "researchType" TEXT NOT NULL,
    "researchDate" DATETIME NOT NULL,
    "creditTime" INTEGER NOT NULL,
    "useable" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "IndividualTherapyLog" (
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
    "useable" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "GroupTherapyLog" (
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
    "useable" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "AcademicActivityLog" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "act" TEXT NOT NULL,
    "activityName" TEXT NOT NULL,
    "activityType" TEXT NOT NULL,
    "activityDate" DATETIME NOT NULL,
    "organization" TEXT NOT NULL,
    "sessionName" TEXT NOT NULL,
    "creditTime" INTEGER NOT NULL,
    "useable" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "ResearchLog" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "publishDate" DATETIME NOT NULL,
    "pagerName" TEXT NOT NULL,
    "journalName" TEXT NOT NULL,
    "participateType" TEXT NOT NULL,
    "useable" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "OtherActivityLog" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "activitySummary" TEXT NOT NULL,
    "activityType" TEXT NOT NULL,
    "startDate" DATETIME NOT NULL,
    "endDate" DATETIME NOT NULL,
    "creditTime" INTEGER NOT NULL,
    "useable" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
