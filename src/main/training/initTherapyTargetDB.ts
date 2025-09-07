import { ipcMain } from 'electron'
import type { PrismaClient } from '@prisma/client'
import { THERAPY_TARGET_CHANNELS } from '@shared/constants/ipcChannels'

export const TherapyTarget = {
  totalCreditMinutes: 300 * 60, // 심리치료 총 인정시간
  primaryTherapistCreditMinutes: 100 * 60, // 주치료자 인정시간
  primaryTherapistCaseCount: 10, // 주치료자 사례 수
}

export function initTherapyTargetDB(prisma: PrismaClient) {
  // Seed the database with initial therapy target if none exist
  async function seedTherapyTarget() {
    const count = await prisma.therapyTarget.count()

    if (count === 0) {
      // No therapy target exists, seed the database
      await prisma.therapyTarget.create({
        data: {
          totalCreditMinutes: TherapyTarget.totalCreditMinutes,
          primaryTherapistCreditMinutes: TherapyTarget.primaryTherapistCreditMinutes,
          primaryTherapistCaseCount: TherapyTarget.primaryTherapistCaseCount
        }
      })
    }
  }

  // Call the seed function
  seedTherapyTarget().catch(error => {
    console.error('Error seeding therapy target:', error)
  })

  // Handle GET request
  ipcMain.handle(THERAPY_TARGET_CHANNELS.GET, async () => {
    const targets = await prisma.therapyTarget.findMany({
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
  ipcMain.handle(THERAPY_TARGET_CHANNELS.CREATE, async (_, therapyTarget: any) => {
    return prisma.therapyTarget.create({
      data: {
        totalCreditMinutes: therapyTarget.totalCreditMinutes,
        primaryTherapistCreditMinutes: therapyTarget.primaryTherapistCreditMinutes,
        primaryTherapistCaseCount: therapyTarget.primaryTherapistCaseCount
      }
    })
  })

  // Handle UPDATE request
  ipcMain.handle(THERAPY_TARGET_CHANNELS.UPDATE, async (_, id: number, therapyTarget: any) => {
    return prisma.therapyTarget.update({
      where: { id },
      data: {
        totalCreditMinutes: therapyTarget.totalCreditMinutes,
        primaryTherapistCreditMinutes: therapyTarget.primaryTherapistCreditMinutes,
        primaryTherapistCaseCount: therapyTarget.primaryTherapistCaseCount
      }
    })
  })

  // Handle DELETE request
  ipcMain.handle(THERAPY_TARGET_CHANNELS.DELETE, async (_, id: number) => {
    return prisma.therapyTarget.delete({
      where: { id }
    })
  })
}
