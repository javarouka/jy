import { ipcMain } from 'electron'
import { TypeAssessmentFormData } from '../../shared/types'
import type { PrismaClient } from '@prisma/client'
import { ASSESSMENT_LOG_CHANNELS } from '../../shared/constants/ipcChannels'
import { AssessmentLogQueryParams } from '../../shared/types/db'

export function initAssessmentLogDB(prisma: PrismaClient) {
  ipcMain.handle(ASSESSMENT_LOG_CHANNELS.GET, async (_, params?: AssessmentLogQueryParams) => {
    // Default query options
    const queryOptions: any = {
      orderBy: {
        createdAt: 'desc'
      }
    }

    // Apply sorting if provided
    if (params?.sort) {
      queryOptions.orderBy = {
        [params.sort.field]: params.sort.order
      }
    }

    // Apply search/filter if provided
    if (params?.search) {
      queryOptions.where = {
        [params.search.field]: params.search.value
      }
    }

    return prisma.assessmentLog.findMany(queryOptions)
  })

  ipcMain.handle(ASSESSMENT_LOG_CHANNELS.CREATE, async (_, assessmentLog: TypeAssessmentFormData) => {
    return prisma.assessmentLog.create({
      data: {
        ...assessmentLog,
        researchDate: new Date(assessmentLog.researchDate),
      },
    })
  })

  ipcMain.handle(ASSESSMENT_LOG_CHANNELS.UPDATE, async (_, id: number, assessmentLog: TypeAssessmentFormData) => {
    return prisma.assessmentLog.update({
      where: { id },
      data: assessmentLog,
    })
  })

  ipcMain.handle(ASSESSMENT_LOG_CHANNELS.DELETE, async (_, id: number) => {
    return prisma.assessmentLog.delete({
      where: { id },
    })
  })
}
