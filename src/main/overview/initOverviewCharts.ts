import { ipcMain } from 'electron'
import type {
  AcademicActivityLog,
  AssessmentLog,
  GroupTherapyLog,
  IndividualTherapyLog,
  OtherActivityLog,
  PrismaClient,
  ResearchLog
} from '@prisma/client'
import {
  OVERVIEW_CHANNELS
} from '@shared/constants/ipcChannels'
import { TypeTrainingYear } from '@shared/types'

/**
 * Checks if a date falls within a training year period
 * @param date The date to check
 * @param trainingYear The training year object with startDate and endDate
 * @returns True if the date is within the training year period, false otherwise
 */
function isDateInTrainingYear(date: Date, trainingYear: TypeTrainingYear): boolean {
  const startDate = new Date(trainingYear.startDate)
  const endDate = new Date(trainingYear.endDate)
  return date >= startDate && date <= endDate
}

/**
 * Initialize IPC handlers for overview chart data
 * @param prisma PrismaClient instance
 */
export function initOverviewCharts(prisma: PrismaClient) {
  // Handler for assessment logs
  ipcMain.handle(OVERVIEW_CHANNELS.GET_ASSESSMENT_LOGS, async (_, trainingYear?: TypeTrainingYear): Promise<AssessmentLog[]> => {
    const logs = await prisma.assessmentLog.findMany({
      orderBy: {
        researchDate: 'asc'
      }
    })

    if (!trainingYear) return logs

    return logs.filter(log => isDateInTrainingYear(log.researchDate, trainingYear))
  })

  // Handler for individual therapy logs
  ipcMain.handle(OVERVIEW_CHANNELS.GET_INDIVIDUAL_THERAPY_LOGS, async (_, trainingYear?: TypeTrainingYear): Promise<IndividualTherapyLog[]> => {
    const logs = await prisma.individualTherapyLog.findMany({
      orderBy: {
        endDate: 'asc'
      }
    })

    if (!trainingYear) return logs

    return logs.filter(log => isDateInTrainingYear(log.endDate, trainingYear))
  })

  // Handler for group therapy logs
  ipcMain.handle(OVERVIEW_CHANNELS.GET_GROUP_THERAPY_LOGS, async (_, trainingYear?: TypeTrainingYear): Promise<GroupTherapyLog[]> => {
    const logs = await prisma.groupTherapyLog.findMany({
      orderBy: {
        endDate: 'asc'
      }
    })

    if (!trainingYear) return logs

    return logs.filter(log => isDateInTrainingYear(log.endDate, trainingYear))
  })

  // Handler for academic activity logs
  ipcMain.handle(OVERVIEW_CHANNELS.GET_ACADEMIC_ACTIVITY_LOGS, async (_, trainingYear?: TypeTrainingYear): Promise<AcademicActivityLog[]> => {
    const logs = await prisma.academicActivityLog.findMany({
      orderBy: {
        activityDate: 'asc'
      }
    })

    if (!trainingYear) return logs

    return logs.filter(log => isDateInTrainingYear(log.activityDate, trainingYear))
  })

  // Handler for research logs
  ipcMain.handle(OVERVIEW_CHANNELS.GET_RESEARCH_LOGS, async (_, trainingYear?: TypeTrainingYear): Promise<ResearchLog[]> => {
    const logs = await prisma.researchLog.findMany({
      orderBy: {
        publishDate: 'asc'
      }
    })

    if (!trainingYear) return logs

    return logs.filter(log => isDateInTrainingYear(log.publishDate, trainingYear))
  })

  // Handler for other activity logs
  ipcMain.handle(OVERVIEW_CHANNELS.GET_OTHER_ACTIVITY_LOGS, async (_, trainingYear?: TypeTrainingYear): Promise<OtherActivityLog[]> => {
    const logs = await prisma.otherActivityLog.findMany({
      orderBy: {
        startDate: 'asc'
      }
    })

    if (!trainingYear) return logs

    return logs.filter(log => isDateInTrainingYear(log.startDate, trainingYear))
  })
}
