import { useQuery } from '@tanstack/react-query'
import { TRAINING_YEARS } from '@renderer/data/TrainingYears'
import { useMemo } from 'react'

export default function useAssessmentLogStatistics() {
  // Fetch assessment log data for all training years
  const { data: assessmentLogs, isLoading, isError } = useQuery({
    queryKey: ['AssessmentLogStatistics'],
    queryFn: async () => {
      // Create an array of promises for each training year
      const promises = TRAINING_YEARS.map(year =>
        window.db.getAssessmentLogs({
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
        logs
      }))
    }
  })

  // Process the data to calculate statistics for each training year
  const statisticsData = useMemo(() => {
    if (!assessmentLogs) return []

    return assessmentLogs.map(({ trainingYear, logs }) => {
      // Calculate total creditTime for this training year
      const totalCreditTime = logs.reduce((sum, log) => sum + log.creditTime, 0)

      // Calculate total count of records
      const totalCount = logs.length

      // Group logs by researchType
      const logsByType = logs.reduce((acc, log) => {
        const type = log.researchType
        if (!acc[type]) {
          acc[type] = []
        }
        acc[type].push(log)
        return acc
      }, {} as Record<string, typeof logs>)

      // Calculate statistics for each researchType
      const typeStats = Object.entries(logsByType).map(([type, typeLogs]) => {
        const count = typeLogs.length
        const creditTime = typeLogs.reduce((sum, log) => sum + log.creditTime, 0)
        const isComprehensive = type === '종합심리평가'

        return {
          type,
          count,
          creditTime,
          isComprehensive
        }
      }).sort((a, b) => {
        // Sort by isComprehensive first (true comes first), then by count (descending)
        if (a.isComprehensive && !b.isComprehensive) return -1
        if (!a.isComprehensive && b.isComprehensive) return 1
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
  }, [assessmentLogs])

  return {
    statisticsData,
    isLoading,
    isError
  }
}
