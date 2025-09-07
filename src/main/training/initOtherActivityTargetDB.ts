import { ipcMain } from 'electron'
import type { PrismaClient } from '@prisma/client'
import { OTHER_ACTIVITY_TARGET_CHANNELS } from '@shared/constants/ipcChannels'

export const OtherActivityTarget = {
  externalCooperationCreditMinutes: 30 * 60, // 대외협력 인정시간
}

export function initOtherActivityTargetDB(prisma: PrismaClient) {
  // Seed the database with initial other activity target if none exist
  async function seedOtherActivityTarget() {
    const count = await prisma.otherActivityTarget.count()

    if (count === 0) {
      // No other activity target exists, seed the database
      await prisma.otherActivityTarget.create({
        data: {
          externalCooperationCreditMinutes: OtherActivityTarget.externalCooperationCreditMinutes
        }
      })
    }
  }

  // Call the seed function
  seedOtherActivityTarget().catch(error => {
    console.error('Error seeding other activity target:', error)
  })

  // Handle GET request
  ipcMain.handle(OTHER_ACTIVITY_TARGET_CHANNELS.GET, async () => {
    const targets = await prisma.otherActivityTarget.findMany({
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
  ipcMain.handle(OTHER_ACTIVITY_TARGET_CHANNELS.CREATE, async (_, otherActivityTarget: any) => {
    return prisma.otherActivityTarget.create({
      data: {
        externalCooperationCreditMinutes: otherActivityTarget.externalCooperationCreditMinutes
      }
    })
  })

  // Handle UPDATE request
  ipcMain.handle(OTHER_ACTIVITY_TARGET_CHANNELS.UPDATE, async (_, id: number, otherActivityTarget: any) => {
    return prisma.otherActivityTarget.update({
      where: { id },
      data: {
        externalCooperationCreditMinutes: otherActivityTarget.externalCooperationCreditMinutes
      }
    })
  })

  // Handle DELETE request
  ipcMain.handle(OTHER_ACTIVITY_TARGET_CHANNELS.DELETE, async (_, id: number) => {
    return prisma.otherActivityTarget.delete({
      where: { id }
    })
  })
}
