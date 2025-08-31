import { ipcMain } from 'electron'
import { TypeAcademicActivityFormData } from '@shared/types'
import type { PrismaClient } from '@prisma/client'
import { ACADEMIC_ACTIVITY_LOG_CHANNELS } from '@shared/constants/ipcChannels'
import { AcademicActivityLogQueryParams } from '@shared/types/db'

export function initAcademicActivityLogDB(prisma: PrismaClient) {
  ipcMain.handle(ACADEMIC_ACTIVITY_LOG_CHANNELS.GET, async (_, params?: AcademicActivityLogQueryParams) => {
    // Default query options
    const queryOptions: any = {
      orderBy: [
        {
          modifiedAt: 'desc',
        },
        {
          createdAt: 'desc',
        }
      ],
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
      const { activityName, sessionName } = params.likeSearch

      // Add contains filter for string fields
      if (activityName) {
        queryOptions.where.activityName = { contains: activityName }
      }

      if (sessionName) {
        queryOptions.where.sessionName = { contains: sessionName }
      }
    }

    // Apply range search for creditTime if provided
    if (params?.rangeSearch?.creditTime) {
      const { min, max } = params.rangeSearch.creditTime

      if (min !== undefined || max !== undefined) {
        queryOptions.where.creditTime = {}

        if (min !== undefined) {
          queryOptions.where.creditTime.gte = min
        }

        if (max !== undefined) {
          queryOptions.where.creditTime.lte = max
        }
      }
    }

    // Apply date range search if provided
    if (params?.dateRange) {
      const { startDate, endDate } = params.dateRange

      if (startDate || endDate) {
        queryOptions.where.activityDate = {}

        if (startDate) {
          queryOptions.where.activityDate.gte = new Date(startDate)
        }

        if (endDate) {
          queryOptions.where.activityDate.lte = new Date(endDate)
        }
      }
    }

    return prisma.academicActivityLog.findMany(queryOptions)
  })

  ipcMain.handle(ACADEMIC_ACTIVITY_LOG_CHANNELS.CREATE, async (_, academicActivityLog: TypeAcademicActivityFormData) => {
    return prisma.academicActivityLog.create({
      data: {
        ...academicActivityLog,
        activityDate: new Date(academicActivityLog.activityDate),
        usable: academicActivityLog.usable ?? false,
      },
    })
  })

  ipcMain.handle(ACADEMIC_ACTIVITY_LOG_CHANNELS.UPDATE, async (_, id: number, academicActivityLog: TypeAcademicActivityFormData) => {
    return prisma.academicActivityLog.update({
      where: { id },
      data: {
        ...academicActivityLog,
        activityDate: new Date(academicActivityLog.activityDate),
        usable: academicActivityLog.usable ?? false,
      },
    })
  })

  ipcMain.handle(ACADEMIC_ACTIVITY_LOG_CHANNELS.DELETE, async (_, id: number) => {
    return prisma.academicActivityLog.delete({
      where: { id },
    })
  })
}
