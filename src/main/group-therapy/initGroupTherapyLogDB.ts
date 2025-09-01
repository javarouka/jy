import { ipcMain } from 'electron'
import { TypeGroupTherapyFormData } from '@shared/types'
import type { PrismaClient } from '@prisma/client'
import { GROUP_THERAPY_LOG_CHANNELS } from '@shared/constants/ipcChannels'
import { GroupTherapyLogQueryParams } from '@shared/types/db'
import log from '../mainLogger'

export function initGroupTherapyLogDB(prisma: PrismaClient) {
  ipcMain.handle(GROUP_THERAPY_LOG_CHANNELS.GET, async (_, params?: GroupTherapyLogQueryParams) => {
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
      const { groupName, therapyType } = params.likeSearch

      // Add contains filter for string fields
      if (groupName) {
        queryOptions.where.groupName = { contains: groupName }
      }

      if (therapyType) {
        queryOptions.where.therapyType = { contains: therapyType }
      }
    }

    // Apply therapy period date range search if provided
    if (params?.dateRange) {
      const { startDate, endDate } = params.dateRange

      if (startDate || endDate) {
        // Create an OR condition for treatment period overlap
        queryOptions.where.OR = []

        // Case 1: Treatment starts within the search period
        if (startDate && endDate) {
          queryOptions.where.OR.push({
            startDate: {
              gte: new Date(startDate),
              lte: new Date(endDate)
            }
          })
        } else if (startDate) {
          queryOptions.where.OR.push({
            startDate: {
              gte: new Date(startDate)
            }
          })
        } else if (endDate) {
          queryOptions.where.OR.push({
            startDate: {
              lte: new Date(endDate)
            }
          })
        }

        // Case 2: Treatment ends within the search period
        if (startDate && endDate) {
          queryOptions.where.OR.push({
            endDate: {
              gte: new Date(startDate),
              lte: new Date(endDate)
            }
          })
        } else if (startDate) {
          queryOptions.where.OR.push({
            endDate: {
              gte: new Date(startDate)
            }
          })
        } else if (endDate) {
          queryOptions.where.OR.push({
            endDate: {
              lte: new Date(endDate)
            }
          })
        }

        // Case 3: Treatment spans the entire search period
        if (startDate && endDate) {
          queryOptions.where.OR.push({
            AND: [
              { startDate: { lte: new Date(startDate) } },
              { endDate: { gte: new Date(endDate) } }
            ]
          })
        }
      }
    }

    // Apply research date range search if provided
    if (params?.researchDateRange) {
      log.info(">>> Research Date Range:", params.researchDateRange)
      const { startDate, endDate } = params.researchDateRange

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

    return prisma.groupTherapyLog.findMany(queryOptions)
  })

  ipcMain.handle(GROUP_THERAPY_LOG_CHANNELS.CREATE, async (_, groupTherapyLog: TypeGroupTherapyFormData) => {
    return prisma.groupTherapyLog.create({
      data: {
        ...groupTherapyLog,
        researchDate: new Date(groupTherapyLog.researchDate),
        startDate: new Date(groupTherapyLog.startDate),
        endDate: new Date(groupTherapyLog.endDate),
      },
    })
  })

  ipcMain.handle(GROUP_THERAPY_LOG_CHANNELS.UPDATE, async (_, id: number, groupTherapyLog: TypeGroupTherapyFormData) => {
    return prisma.groupTherapyLog.update({
      where: { id },
      data: {
        ...groupTherapyLog,
        researchDate: new Date(groupTherapyLog.researchDate),
        startDate: new Date(groupTherapyLog.startDate),
        endDate: new Date(groupTherapyLog.endDate),
      },
    })
  })

  ipcMain.handle(GROUP_THERAPY_LOG_CHANNELS.DELETE, async (_, id: number) => {
    return prisma.groupTherapyLog.delete({
      where: { id },
    })
  })
}
