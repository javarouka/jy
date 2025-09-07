import { ipcMain } from 'electron'
import type { PrismaClient } from '@prisma/client'
import { ASSESSMENT_TARGET_CHANNELS } from '@shared/constants/ipcChannels'

export const AssessmentTarget = {
  totalCreditMinutes: 300 * 60, // 심리평가 총 인정시간
  caseCount: 30, // 종합심리평가 사례 수
}

export function initAssessmentTargetDB(prisma: PrismaClient) {
  // Seed the database with initial assessment target if none exist
  async function seedAssessmentTarget() {
    const count = await prisma.assessmentTarget.count()

    if (count === 0) {
      // No assessment target exists, seed the database
      await prisma.assessmentTarget.create({
        data: {
          totalCreditMinutes: AssessmentTarget.totalCreditMinutes,
          caseCount: AssessmentTarget.caseCount
        }
      })
    }
  }

  // Call the seed function
  seedAssessmentTarget().catch(error => {
    console.error('Error seeding assessment target:', error)
  })

  // Handle GET request
  ipcMain.handle(ASSESSMENT_TARGET_CHANNELS.GET, async () => {
    const targets = await prisma.assessmentTarget.findMany({
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
  ipcMain.handle(ASSESSMENT_TARGET_CHANNELS.CREATE, async (_, assessmentTarget: any) => {
    return prisma.assessmentTarget.create({
      data: {
        totalCreditMinutes: assessmentTarget.totalCreditMinutes,
        caseCount: assessmentTarget.caseCount
      }
    })
  })

  // Handle UPDATE request
  ipcMain.handle(ASSESSMENT_TARGET_CHANNELS.UPDATE, async (_, id: number, assessmentTarget: any) => {
    return prisma.assessmentTarget.update({
      where: { id },
      data: {
        totalCreditMinutes: assessmentTarget.totalCreditMinutes,
        caseCount: assessmentTarget.caseCount
      }
    })
  })

  // Handle DELETE request
  ipcMain.handle(ASSESSMENT_TARGET_CHANNELS.DELETE, async (_, id: number) => {
    return prisma.assessmentTarget.delete({
      where: { id }
    })
  })
}
