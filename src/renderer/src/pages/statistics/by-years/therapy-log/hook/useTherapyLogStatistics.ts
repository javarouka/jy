import { useQuery } from '@tanstack/react-query'
import { TRAINING_YEARS } from '@renderer/data/TrainingYears'
import { useMemo } from 'react'
import { TypeGroupTherapyLog, TypeIndividualTherapyLog } from '@shared/types'

// Combined type for therapy logs
type TherapyLog = TypeIndividualTherapyLog | TypeGroupTherapyLog & { isIndividual?: boolean }

// Type for therapy statistics by type
type TherapyTypeStats = {
  type: string
  count: number
  creditTime: number
  isMainTherapist: boolean
}

// Type for therapy statistics by year
type TherapyYearStats = {
  name: string
  startDate: string
  endDate: string
  totalCreditTime: number
  totalCount: number
  typeStats: TherapyTypeStats[]
  targetHours: number
  progressPercentage: number
}

export default function useTherapyLogStatistics() {
  // Fetch individual therapy log data for all training years
  const { data: individualTherapyLogs, isLoading: isIndividualLoading, isError: isIndividualError } = useQuery({
    queryKey: ['IndividualTherapyLogStatistics'],
    queryFn: async () => {
      // Create an array of promises for each training year
      const promises = TRAINING_YEARS.map(year =>
        window.db.getIndividualTherapyLogs({
          dateRange: {
            startDate: year.startDate,
            endDate: year.endDate
          }
        })
      )

      // Wait for all promises to resolve
      const results = await Promise.all(promises)

      // Return the results with the corresponding training year
      return results.map((logs, index) => ({
        trainingYear: TRAINING_YEARS[index],
        logs: logs.map(log => ({ ...log, isIndividual: true }))
      }))
    }
  })

  // Fetch group therapy log data for all training years
  const { data: groupTherapyLogs, isLoading: isGroupLoading, isError: isGroupError } = useQuery({
    queryKey: ['GroupTherapyLogStatistics'],
    queryFn: async () => {
      // Create an array of promises for each training year
      const promises = TRAINING_YEARS.map(year =>
        window.db.getGroupTherapyLogs({
          dateRange: {
            startDate: year.startDate,
            endDate: year.endDate
          }
        })
      )

      // Wait for all promises to resolve
      const results = await Promise.all(promises)

      // Return the results with the corresponding training year
      return results.map((logs, index) => ({
        trainingYear: TRAINING_YEARS[index],
        logs: logs.map(log => ({ ...log, isIndividual: false }))
      }))
    }
  })

  // Process the data to calculate statistics for each training year
  const statisticsData = useMemo<TherapyYearStats[]>(() => {
    if (!individualTherapyLogs || !groupTherapyLogs) return []

    return TRAINING_YEARS.map((trainingYear, index) => {
      // Combine individual and group therapy logs for this training year
      const individualLogs = individualTherapyLogs[index]?.logs || []
      const groupLogs = groupTherapyLogs[index]?.logs || []
      const allLogs = [...individualLogs, ...groupLogs]

      // Calculate total credit time for this training year
      const totalCreditTime = allLogs.reduce((sum, log) => {
        return sum + log.prepareTime + log.sessionTime + log.supervisionTime
      }, 0)

      // Calculate total count of records
      const totalCount = allLogs.length

      // Group logs by therapyType
      const logsByType = allLogs.reduce((acc, log) => {
        const type = log.therapyType
        if (!acc[type]) {
          acc[type] = []
        }
        acc[type].push(log)
        return acc
      }, {} as Record<string, TherapyLog[]>)

      // Calculate statistics for each therapyType
      const typeStats = Object.entries(logsByType).map(([type, typeLogs]) => {
        const count = typeLogs.length
        const creditTime = typeLogs.reduce((sum, log) => {
          return sum + log.prepareTime + log.sessionTime + log.supervisionTime
        }, 0)
        const isMainTherapist = type === '주치료자'

        return {
          type,
          count,
          creditTime,
          isMainTherapist
        }
      }).sort((a, b) => {
        // Sort by isMainTherapist first (true comes first), then by count (descending)
        if (a.isMainTherapist && !b.isMainTherapist) return -1
        if (!a.isMainTherapist && b.isMainTherapist) return 1
        return b.count - a.count
      })

      // Calculate progress percentage (convert targetHours from hours to minutes for comparison)
      const targetMinutes = trainingYear.targetHours * 60
      const progressPercentage = Math.min(100, (totalCreditTime / targetMinutes) * 100)

      return {
        name: trainingYear.name,
        startDate: trainingYear.startDate,
        endDate: trainingYear.endDate,
        totalCreditTime,
        totalCount,
        typeStats,
        targetHours: trainingYear.targetHours,
        progressPercentage
      }
    })
  }, [individualTherapyLogs, groupTherapyLogs])

  return {
    statisticsData,
    isLoading: isIndividualLoading || isGroupLoading,
    isError: isIndividualError || isGroupError
  }
}
