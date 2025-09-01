import { ipcMain } from 'electron'
import { TypeOtherActivityFormData } from '@shared/types'
import type { PrismaClient } from '@prisma/client'
import { OTHER_ACTIVITY_LOG_CHANNELS } from '@shared/constants/ipcChannels'
import { OtherActivityLogQueryParams } from '@shared/types/db'

export function initOtherActivityLogDB(prisma: PrismaClient) {
  ipcMain.handle(OTHER_ACTIVITY_LOG_CHANNELS.GET, async (_, params?: OtherActivityLogQueryParams) => {
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
      const { activitySummary } = params.likeSearch

      // Add contains filter for string fields
      if (activitySummary) {
        queryOptions.where.activitySummary = { contains: activitySummary }
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
        // For startDate field
        if (startDate) {
          queryOptions.where.startDate = {
            ...queryOptions.where.startDate,
            gte: new Date(startDate)
          }
        }

        // For endDate field
        if (endDate) {
          queryOptions.where.endDate = {
            ...queryOptions.where.endDate,
            lte: new Date(endDate)
          }
        }
      }
    }

    return prisma.otherActivityLog.findMany(queryOptions)
  })

  ipcMain.handle(OTHER_ACTIVITY_LOG_CHANNELS.CREATE, async (_, otherActivityLog: TypeOtherActivityFormData) => {
    return prisma.otherActivityLog.create({
      data: {
        ...otherActivityLog,
        startDate: new Date(otherActivityLog.startDate),
        endDate: new Date(otherActivityLog.endDate),
        usable: otherActivityLog.usable ?? false,
      },
    })
  })

  ipcMain.handle(OTHER_ACTIVITY_LOG_CHANNELS.UPDATE, async (_, id: number, otherActivityLog: TypeOtherActivityFormData) => {
    return prisma.otherActivityLog.update({
      where: { id },
      data: {
        ...otherActivityLog,
        startDate: new Date(otherActivityLog.startDate),
        endDate: new Date(otherActivityLog.endDate),
        usable: otherActivityLog.usable ?? false,
      },
    })
  })

  ipcMain.handle(OTHER_ACTIVITY_LOG_CHANNELS.DELETE, async (_, id: number) => {
    return prisma.otherActivityLog.delete({
      where: { id },
    })
  })
}
