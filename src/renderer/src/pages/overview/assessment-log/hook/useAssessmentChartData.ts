import { useQuery } from '@tanstack/react-query'
import { TRAINING_YEARS } from '@renderer/data/TrainingYears'
import { format, parseISO, addMonths, isBefore } from 'date-fns'
import { useMemo } from 'react'

// Type for the monthly aggregated data
export type MonthlyData = {
  month: string
  creditTime: number
}

// Type for the chart data for each training year
export type TrainingYearChartData = {
  name: string
  startDate: string
  endDate: string
  monthlyData: MonthlyData[]
  genderData: GenderData[]
  researchTypeData: ResearchTypeData[]
}

// Type for the gender distribution data
export type GenderData = {
  name: string
  value: number
}

// Type for the research type distribution data
export type ResearchTypeData = {
  name: string
  value: number
}

export default function useAssessmentChartData() {
  // Fetch assessment log data for all training years
  const { data: assessmentLogs, isLoading, isError } = useQuery({
    queryKey: ['AssessmentLogForCharts'],
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

  // Process the data to aggregate by month, gender, and research type for each training year
  const chartData = useMemo(() => {
    if (!assessmentLogs) return []

    return assessmentLogs.map(({ trainingYear, logs }) => {
      // Generate all months between start and end date
      const startDate = parseISO(trainingYear.startDate)
      const endDate = parseISO(trainingYear.endDate)

      // Initialize an object to store monthly aggregated data with all months in range
      const monthlyAggregated: Record<string, number> = {}

      // Generate all months in the date range and initialize with zero
      let currentDate = startDate
      while (isBefore(currentDate, endDate) || format(currentDate, 'yyyy-MM') === format(endDate, 'yyyy-MM')) {
        const monthKey = format(currentDate, 'yyyy-MM')
        monthlyAggregated[monthKey] = 0
        currentDate = addMonths(currentDate, 1)
      }

      // Process each log to aggregate creditTime by month
      logs.forEach(log => {
        // Format the month as YYYY-MM
        const month = format(new Date(log.researchDate), 'yyyy-MM')

        // Add the creditTime to the corresponding month
        if (monthlyAggregated[month] !== undefined) {
          monthlyAggregated[month] += log.creditTime
        }
      })

      // Convert the aggregated data to an array of objects
      const monthlyData = Object.entries(monthlyAggregated).map(([month, creditTime]) => ({
        month: format(parseISO(`${month}-01`), 'yyyy년 MM월'),
        creditTime
      }))

      // Sort the monthly data by month
      monthlyData.sort((a, b) => {
        const monthA = a.month.replace(/[^0-9]/g, '')
        const monthB = b.month.replace(/[^0-9]/g, '')
        return monthA.localeCompare(monthB)
      })

      // Aggregate by gender for this training year
      const genderCounts: Record<string, number> = {}
      logs.forEach(log => {
        const gender = log.gender
        const koreanGender = gender === 'male' ? '남성' : gender === 'female' ? '여성' : gender
        genderCounts[koreanGender] = (genderCounts[koreanGender] || 0) + 1
      })

      // Aggregate by research type for this training year
      const researchTypeCounts: Record<string, number> = {}
      logs.forEach(log => {
        const type = log.researchType
        researchTypeCounts[type] = (researchTypeCounts[type] || 0) + 1
      })

      // Convert to array format for pie charts
      const genderData: GenderData[] = Object.entries(genderCounts).map(([name, value]) => ({
        name,
        value
      }))

      const researchTypeData: ResearchTypeData[] = Object.entries(researchTypeCounts).map(([name, value]) => ({
        name,
        value
      }))

      return {
        name: trainingYear.name,
        startDate: trainingYear.startDate,
        endDate: trainingYear.endDate,
        monthlyData,
        genderData,
        researchTypeData
      }
    })
  }, [assessmentLogs])

  return {
    chartData,
    isLoading,
    isError
  }
}
