import { ipcMain } from 'electron'
import { TypeResearchFormData } from '@shared/types'
import type { PrismaClient } from '@prisma/client'
import { RESEARCH_LOG_CHANNELS } from '@shared/constants/ipcChannels'
import { ResearchLogQueryParams } from '@shared/types/db'

export function initResearchLogDB(prisma: PrismaClient) {
  ipcMain.handle(RESEARCH_LOG_CHANNELS.GET, async (_, params?: ResearchLogQueryParams) => {
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
      const { pagerName, journalName } = params.likeSearch

      // Add contains filter for string fields
      if (pagerName) {
        queryOptions.where.pagerName = { contains: pagerName }
      }

      if (journalName) {
        queryOptions.where.journalName = { contains: journalName }
      }
    }

    // Apply date range search if provided
    if (params?.dateRange) {
      const { startDate, endDate } = params.dateRange

      if (startDate || endDate) {
        queryOptions.where.publishDate = {}

        if (startDate) {
          queryOptions.where.publishDate.gte = new Date(startDate)
        }

        if (endDate) {
          queryOptions.where.publishDate.lte = new Date(endDate)
        }
      }
    }

    return prisma.researchLog.findMany(queryOptions)
  })

  ipcMain.handle(RESEARCH_LOG_CHANNELS.CREATE, async (_, researchLog: TypeResearchFormData) => {
    return prisma.researchLog.create({
      data: {
        ...researchLog,
        publishDate: new Date(researchLog.publishDate),
        usable: researchLog.usable ?? false,
      },
    })
  })

  ipcMain.handle(RESEARCH_LOG_CHANNELS.UPDATE, async (_, id: number, researchLog: TypeResearchFormData) => {
    return prisma.researchLog.update({
      where: { id },
      data: {
        ...researchLog,
        publishDate: new Date(researchLog.publishDate),
        usable: researchLog.usable ?? false,
      },
    })
  })

  ipcMain.handle(RESEARCH_LOG_CHANNELS.DELETE, async (_, id: number) => {
    return prisma.researchLog.delete({
      where: { id },
    })
  })
}
