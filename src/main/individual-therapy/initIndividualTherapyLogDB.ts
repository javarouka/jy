import { ipcMain } from 'electron'
import { TypeIndividualTherapyFormData } from '@shared/types'
import type { PrismaClient } from '@prisma/client'
import { INDIVIDUAL_THERAPY_LOG_CHANNELS } from '@shared/constants/ipcChannels'
import { IndividualTherapyLogQueryParams } from '@shared/types/db'

export function initIndividualTherapyLogDB(prisma: PrismaClient) {
  ipcMain.handle(INDIVIDUAL_THERAPY_LOG_CHANNELS.GET, async (_, params?: IndividualTherapyLogQueryParams) => {
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
      const { clientName } = params.likeSearch

      // Add contains filter for string fields
      if (clientName) {
        queryOptions.where.clientName = { contains: clientName }
      }
    }

    // Apply date range search if provided
    if (params?.dateRange) {
      const { startDate, endDate } = params.dateRange

      // Handle date range for researchDate
      if (startDate || endDate) {
        queryOptions.where.researchDate = {}

        if (startDate) {
          queryOptions.where.researchDate.gte = new Date(startDate)
        }

        if (endDate) {
          queryOptions.where.researchDate.lte = new Date(endDate)
        }
      }

      // Handle date range for startDate
      if (startDate || endDate) {
        queryOptions.where.startDate = {}

        if (startDate) {
          queryOptions.where.startDate.gte = new Date(startDate)
        }

        if (endDate) {
          queryOptions.where.startDate.lte = new Date(endDate)
        }
      }

      // Handle date range for endDate
      if (startDate || endDate) {
        queryOptions.where.endDate = {}

        if (startDate) {
          queryOptions.where.endDate.gte = new Date(startDate)
        }

        if (endDate) {
          queryOptions.where.endDate.lte = new Date(endDate)
        }
      }
    }

    // Apply range search for numeric fields if provided
    if (params?.rangeSearch) {
      const { sessionCount, prepareTime, sessionTime, supervisionTime } = params.rangeSearch

      // Handle range for sessionCount
      if (sessionCount?.min !== undefined || sessionCount?.max !== undefined) {
        queryOptions.where.sessionCount = {}

        if (sessionCount?.min !== undefined) {
          queryOptions.where.sessionCount.gte = sessionCount.min
        }

        if (sessionCount?.max !== undefined) {
          queryOptions.where.sessionCount.lte = sessionCount.max
        }
      }

      // Handle range for prepareTime
      if (prepareTime?.min !== undefined || prepareTime?.max !== undefined) {
        queryOptions.where.prepareTime = {}

        if (prepareTime?.min !== undefined) {
          queryOptions.where.prepareTime.gte = prepareTime.min
        }

        if (prepareTime?.max !== undefined) {
          queryOptions.where.prepareTime.lte = prepareTime.max
        }
      }

      // Handle range for sessionTime
      if (sessionTime?.min !== undefined || sessionTime?.max !== undefined) {
        queryOptions.where.sessionTime = {}

        if (sessionTime?.min !== undefined) {
          queryOptions.where.sessionTime.gte = sessionTime.min
        }

        if (sessionTime?.max !== undefined) {
          queryOptions.where.sessionTime.lte = sessionTime.max
        }
      }

      // Handle range for supervisionTime
      if (supervisionTime?.min !== undefined || supervisionTime?.max !== undefined) {
        queryOptions.where.supervisionTime = {}

        if (supervisionTime?.min !== undefined) {
          queryOptions.where.supervisionTime.gte = supervisionTime.min
        }

        if (supervisionTime?.max !== undefined) {
          queryOptions.where.supervisionTime.lte = supervisionTime.max
        }
      }
    }

    return prisma.individualTherapyLog.findMany(queryOptions)
  })

  ipcMain.handle(INDIVIDUAL_THERAPY_LOG_CHANNELS.CREATE, async (_, individualTherapyLog: TypeIndividualTherapyFormData) => {
    return prisma.individualTherapyLog.create({
      data: {
        ...individualTherapyLog,
        researchDate: new Date(individualTherapyLog.researchDate),
        startDate: new Date(individualTherapyLog.startDate),
        endDate: new Date(individualTherapyLog.endDate),
      },
    })
  })

  ipcMain.handle(INDIVIDUAL_THERAPY_LOG_CHANNELS.UPDATE, async (_, id: number, individualTherapyLog: TypeIndividualTherapyFormData) => {
    return prisma.individualTherapyLog.update({
      where: { id },
      data: {
        ...individualTherapyLog,
        researchDate: new Date(individualTherapyLog.researchDate),
        startDate: new Date(individualTherapyLog.startDate),
        endDate: new Date(individualTherapyLog.endDate),
      },
    })
  })

  ipcMain.handle(INDIVIDUAL_THERAPY_LOG_CHANNELS.DELETE, async (_, id: number) => {
    return prisma.individualTherapyLog.delete({
      where: { id },
    })
  })
}
