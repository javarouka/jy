import { ipcMain } from 'electron'
import type { PrismaClient } from '@prisma/client'
import { ACADEMIC_TARGET_CHANNELS } from '@shared/constants/ipcChannels'

export const AcademicTarget = {
  ethicsEducationJoinCount: 1, // 윤리교육 참여
  caseConferencePresentationCount: 2, // 사례회의 발표 횟수
  thesisPresentationCount: 1, // 논문발표 횟수
  academicConferenceJoinMinutes: 30 * 60, // 학술회의 참여 인정시간
  caseConferenceJoinMinutes: 10 * 60, // 사례회의 참여 인정시간
}

export function initAcademicTargetDB(prisma: PrismaClient) {
  // Seed the database with initial academic target if none exist
  async function seedAcademicTarget() {
    const count = await prisma.academicTarget.count()

    if (count === 0) {
      // No academic target exists, seed the database
      await prisma.academicTarget.create({
        data: {
          ethicsEducationJoinCount: AcademicTarget.ethicsEducationJoinCount,
          caseConferencePresentationCount: AcademicTarget.caseConferencePresentationCount,
          thesisPresentationCount: AcademicTarget.thesisPresentationCount,
          academicConferenceJoinMinutes: AcademicTarget.academicConferenceJoinMinutes,
          caseConferenceJoinMinutes: AcademicTarget.caseConferenceJoinMinutes
        }
      })
    }
  }

  // Call the seed function
  seedAcademicTarget().catch(error => {
    console.error('Error seeding academic target:', error)
  })

  // Handle GET request
  ipcMain.handle(ACADEMIC_TARGET_CHANNELS.GET, async () => {
    const targets = await prisma.academicTarget.findMany({
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
  ipcMain.handle(ACADEMIC_TARGET_CHANNELS.CREATE, async (_, academicTarget: any) => {
    return prisma.academicTarget.create({
      data: {
        ethicsEducationJoinCount: academicTarget.ethicsEducationJoinCount,
        caseConferencePresentationCount: academicTarget.caseConferencePresentationCount,
        thesisPresentationCount: academicTarget.thesisPresentationCount,
        academicConferenceJoinMinutes: academicTarget.academicConferenceJoinMinutes,
        caseConferenceJoinMinutes: academicTarget.caseConferenceJoinMinutes
      }
    })
  })

  // Handle UPDATE request
  ipcMain.handle(ACADEMIC_TARGET_CHANNELS.UPDATE, async (_, id: number, academicTarget: any) => {
    return prisma.academicTarget.update({
      where: { id },
      data: {
        ethicsEducationJoinCount: academicTarget.ethicsEducationJoinCount,
        caseConferencePresentationCount: academicTarget.caseConferencePresentationCount,
        thesisPresentationCount: academicTarget.thesisPresentationCount,
        academicConferenceJoinMinutes: academicTarget.academicConferenceJoinMinutes,
        caseConferenceJoinMinutes: academicTarget.caseConferenceJoinMinutes
      }
    })
  })

  // Handle DELETE request
  ipcMain.handle(ACADEMIC_TARGET_CHANNELS.DELETE, async (_, id: number) => {
    return prisma.academicTarget.delete({
      where: { id }
    })
  })
}
