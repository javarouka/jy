import { ipcMain } from 'electron'
import type { PrismaClient } from '@prisma/client'
import { TRAINING_YEAR_CHANNELS } from '@shared/constants/ipcChannels'
import { TypeTrainingYear } from '@shared/types'

export const TRAINING_YEARS: TypeTrainingYear[] = [
  { name: '1년차', startDate: '2023-03-01', endDate: '2024-02-29', targetHours: 1000 },
  { name: '2년차', startDate: '2024-03-01', endDate: '2025-02-28', targetHours: 1000 },
  { name: '3년차', startDate: '2025-03-01', endDate: '2026-02-28', targetHours: 1000 },
]

export function initTrainingYearDB(prisma: PrismaClient) {
  // Seed the database with initial training years if none exist
  async function seedTrainingYears() {
    const count = await prisma.trainingYear.count()

    if (count === 0) {
      // No training years exist, seed the database
      for (const year of TRAINING_YEARS) {
        await prisma.trainingYear.create({
          data: {
            name: year.name,
            startDate: new Date(year.startDate),
            endDate: new Date(year.endDate),
            targetHours: year.targetHours
          }
        })
      }
    }
  }

  // Call the seed function
  seedTrainingYears().catch(error => {
    console.error('Error seeding training years:', error)
  })

  // Handle GET request
  ipcMain.handle(TRAINING_YEAR_CHANNELS.GET, async () => {
    return prisma.trainingYear.findMany({
      orderBy: [
        {
          startDate: 'asc'
        }
      ]
    })
  })

  // Handle CREATE request
  ipcMain.handle(TRAINING_YEAR_CHANNELS.CREATE, async (_, trainingYear: any) => {
    return prisma.trainingYear.create({
      data: {
        name: trainingYear.name,
        startDate: new Date(trainingYear.startDate),
        endDate: new Date(trainingYear.endDate),
        targetHours: trainingYear.targetHours
      }
    })
  })

  // Handle UPDATE request
  ipcMain.handle(TRAINING_YEAR_CHANNELS.UPDATE, async (_, id: number, trainingYear: any) => {
    return prisma.trainingYear.update({
      where: { id },
      data: {
        name: trainingYear.name,
        startDate: new Date(trainingYear.startDate),
        endDate: new Date(trainingYear.endDate),
        targetHours: trainingYear.targetHours
      }
    })
  })

  // Handle DELETE request
  ipcMain.handle(TRAINING_YEAR_CHANNELS.DELETE, async (_, id: number) => {
    return prisma.trainingYear.delete({
      where: { id }
    })
  })
}
