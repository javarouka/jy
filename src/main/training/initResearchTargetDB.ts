import { ipcMain } from 'electron'
import type { PrismaClient } from '@prisma/client'
import { RESEARCH_TARGET_CHANNELS } from '@shared/constants/ipcChannels'

export const ResearchTarget = {
  totalResearchCount: 1, // 총 연구 수
}

export function initResearchTargetDB(prisma: PrismaClient) {
  // Seed the database with initial research target if none exist
  async function seedResearchTarget() {
    const count = await prisma.researchTarget.count()

    if (count === 0) {
      // No research target exists, seed the database
      await prisma.researchTarget.create({
        data: {
          totalResearchCount: ResearchTarget.totalResearchCount
        }
      })
    }
  }

  // Call the seed function
  seedResearchTarget().catch(error => {
    console.error('Error seeding research target:', error)
  })

  // Handle GET request
  ipcMain.handle(RESEARCH_TARGET_CHANNELS.GET, async () => {
    const targets = await prisma.researchTarget.findMany({
      orderBy: [
        {
          createdAt: 'desc'
        }
      ],
      take: 1
    })
    return targets.length > 0 ? targets[0] : null
  })

  // Handle CREATE request
  ipcMain.handle(RESEARCH_TARGET_CHANNELS.CREATE, async (_, researchTarget: any) => {
    return prisma.researchTarget.create({
      data: {
        totalResearchCount: researchTarget.totalResearchCount
      }
    })
  })

  // Handle UPDATE request
  ipcMain.handle(RESEARCH_TARGET_CHANNELS.UPDATE, async (_, id: number, researchTarget: any) => {
    return prisma.researchTarget.update({
      where: { id },
      data: {
        totalResearchCount: researchTarget.totalResearchCount
      }
    })
  })

  // Handle DELETE request
  ipcMain.handle(RESEARCH_TARGET_CHANNELS.DELETE, async (_, id: number) => {
    return prisma.researchTarget.delete({
      where: { id }
    })
  })
}
