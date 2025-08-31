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
      },
      where: {}
    }

    // Apply sorting if provided
    if (params?.sort) {
      queryOptions.orderBy = {
        [params.sort.field]: params.sort.order
      }
    }

    // Apply exact search/filter if provided
    if (params?.search) {
      queryOptions.where[params.search.field] = params.search.value
    }

    // Apply like search for multiple fields if provided
    if (params?.likeSearch) {
      const { clientName, age, gender, dx, researchType } = params.likeSearch

      // Add contains filter for string fields
      if (clientName) {
        queryOptions.where.clientName = { contains: clientName }
      }

      if (dx) {
        queryOptions.where.dx = { contains: dx }
      }

      if (researchType) {
        queryOptions.where.researchType = { contains: researchType }
      }

      // Add exact match for non-string fields
      if (age !== undefined) {
        queryOptions.where.age = age
      }

      if (gender) {
        queryOptions.where.gender = { contains: gender }
      }
    }

    // Apply date range search if provided
    if (params?.dateRange) {
      const { startDate, endDate } = params.dateRange

      if (startDate || endDate) {
        queryOptions.where.researchDate = {}

        if (startDate) {
          queryOptions.where.researchDate.gte = new Date(startDate)
        }

        if (endDate) {
          queryOptions.where.researchDate.lte = new Date(endDate)
        }
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
