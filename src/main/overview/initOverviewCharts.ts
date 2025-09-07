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

/**
 * Initialize IPC handlers for overview chart data
 * @param prisma PrismaClient instance
 */
export function initOverviewCharts(prisma: PrismaClient) {
  // Handler for assessment logs
  ipcMain.handle(OVERVIEW_CHANNELS.GET_ASSESSMENT_LOGS, async (): Promise<AssessmentLog[]> => {
    return prisma.assessmentLog.findMany({
      where: {
        usable: true
      },
      orderBy: {
        researchDate: 'asc'
      }
    })
  })

  // Handler for individual therapy logs
  ipcMain.handle(OVERVIEW_CHANNELS.GET_INDIVIDUAL_THERAPY_LOGS, async (): Promise<IndividualTherapyLog[]> => {
    return prisma.individualTherapyLog.findMany({
      where: {
        usable: true
      },
      orderBy: {
        endDate: 'asc'
      }
    })
  })

  // Handler for group therapy logs
  ipcMain.handle(OVERVIEW_CHANNELS.GET_GROUP_THERAPY_LOGS, async (): Promise<GroupTherapyLog[]> => {
    return prisma.groupTherapyLog.findMany({
      where: {
        usable: true
      },
      orderBy: {
        endDate: 'asc'
      }
    })
  })

  // Handler for academic activity logs
  ipcMain.handle(OVERVIEW_CHANNELS.GET_ACADEMIC_ACTIVITY_LOGS, async (): Promise<AcademicActivityLog[]> => {
    return prisma.academicActivityLog.findMany({
      where: {
        usable: true
      },
      orderBy: {
        activityDate: 'asc'
      }
    })
  })

  // Handler for research logs
  ipcMain.handle(OVERVIEW_CHANNELS.GET_RESEARCH_LOGS, async (): Promise<ResearchLog[]> => {
    return prisma.researchLog.findMany({
      where: {
        usable: true
      },
      orderBy: {
        publishDate: 'asc'
      }
    })
  })

  // Handler for other activity logs
  ipcMain.handle(OVERVIEW_CHANNELS.GET_OTHER_ACTIVITY_LOGS, async (): Promise<OtherActivityLog[]> => {
    return prisma.otherActivityLog.findMany({
      where: {
        usable: true
      },
      orderBy: {
        startDate: 'asc'
      }
    })
  })
}
