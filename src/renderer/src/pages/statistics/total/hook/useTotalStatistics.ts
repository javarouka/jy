import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import { TRAINING_YEARS } from '@renderer/data/TrainingYears'

// Define types for the statistics data
type TotalStatisticsData = {
  // Assessment statistics
  assessmentTotalCreditTime: number
  assessmentTotalCount: number
  comprehensiveAssessmentCount: number
  assessmentSuccess: boolean
  comprehensiveAssessmentSuccess: boolean

  // Therapy statistics
  therapyTotalCreditTime: number
  therapyTotalCount: number
  mainTherapistCreditTime: number
  mainTherapistCount: number
  therapySuccess: boolean
  mainTherapistTimeSuccess: boolean
  mainTherapistCountSuccess: boolean

  // Academic activity statistics
  academicTotalCreditTime: number
  academicTotalCount: number
  ethicsEducationCount: number
  academicMeetingCreditTime: number
  caseMeetingCreditTime: number
  casePresentationCount: number
  paperPresentationCount: number
  ethicsEducationSuccess: boolean
  academicMeetingSuccess: boolean
  caseMeetingSuccess: boolean
  casePresentationSuccess: boolean
  paperPresentationSuccess: boolean

  // Research statistics
  researchTotalCount: number
  researchSuccess: boolean

  // Other activity statistics
  externalCooperationCreditTime: number
  otherTrainingCreditTime: number
  externalCooperationSuccess: boolean

  // Grand total
  grandTotalCreditTime: number
  grandTotalSuccess: boolean
}

// Define types for yearly statistics data
type YearlyStatisticsData = {
  name: string
  startDate: string
  endDate: string
  targetHours: number

  // Assessment statistics
  assessmentCreditTime: number

  // Therapy statistics
  therapyCreditTime: number

  // Academic activity statistics
  academicCreditTime: number

  // Other activity statistics
  otherCreditTime: number

  // Total for this year
  totalCreditTime: number
  success: boolean
  progressPercentage: number
  actualProgressPercentage: number
}

export default function useTotalStatistics() {
  // Fetch assessment log data for all periods
  const { data: assessmentLogs, isLoading: isAssessmentLoading, isError: isAssessmentError } = useQuery({
    queryKey: ['TotalAssessmentLogStatistics'],
    queryFn: async () => {
      return window.db.getAssessmentLogs({})
    }
  })

  // Fetch individual therapy log data for all periods
  const { data: individualTherapyLogs, isLoading: isIndividualLoading, isError: isIndividualError } = useQuery({
    queryKey: ['TotalIndividualTherapyLogStatistics'],
    queryFn: async () => {
      return window.db.getIndividualTherapyLogs({})
    }
  })

  // Fetch group therapy log data for all periods
  const { data: groupTherapyLogs, isLoading: isGroupLoading, isError: isGroupError } = useQuery({
    queryKey: ['TotalGroupTherapyLogStatistics'],
    queryFn: async () => {
      return window.db.getGroupTherapyLogs({})
    }
  })

  // Fetch academic activity log data for all periods
  const { data: academicActivityLogs, isLoading: isAcademicLoading, isError: isAcademicError } = useQuery({
    queryKey: ['TotalAcademicActivityLogStatistics'],
    queryFn: async () => {
      return window.db.getAcademicActivityLogs({})
    }
  })

  // Fetch research log data for all periods
  const { data: researchLogs, isLoading: isResearchLoading, isError: isResearchError } = useQuery({
    queryKey: ['TotalResearchLogStatistics'],
    queryFn: async () => {
      return window.db.getResearchLogs({})
    }
  })

  // Fetch other activity log data for all periods
  const { data: otherActivityLogs, isLoading: isOtherLoading, isError: isOtherError } = useQuery({
    queryKey: ['TotalOtherActivityLogStatistics'],
    queryFn: async () => {
      return window.db.getOtherActivityLogs({})
    }
  })

  // Process the data to calculate total statistics
  const totalStatistics = useMemo<TotalStatisticsData>(() => {
    if (!assessmentLogs || !individualTherapyLogs || !groupTherapyLogs ||
        !academicActivityLogs || !researchLogs || !otherActivityLogs) {
      return {
        // Default values
        assessmentTotalCreditTime: 0,
        assessmentTotalCount: 0,
        comprehensiveAssessmentCount: 0,
        assessmentSuccess: false,
        comprehensiveAssessmentSuccess: false,

        therapyTotalCreditTime: 0,
        therapyTotalCount: 0,
        mainTherapistCreditTime: 0,
        mainTherapistCount: 0,
        therapySuccess: false,
        mainTherapistTimeSuccess: false,
        mainTherapistCountSuccess: false,

        academicTotalCreditTime: 0,
        academicTotalCount: 0,
        ethicsEducationCount: 0,
        academicMeetingCreditTime: 0,
        caseMeetingCreditTime: 0,
        casePresentationCount: 0,
        paperPresentationCount: 0,
        ethicsEducationSuccess: false,
        academicMeetingSuccess: false,
        caseMeetingSuccess: false,
        casePresentationSuccess: false,
        paperPresentationSuccess: false,

        researchTotalCount: 0,
        researchSuccess: false,

        externalCooperationCreditTime: 0,
        otherTrainingCreditTime: 0,
        externalCooperationSuccess: false,

        grandTotalCreditTime: 0,
        grandTotalSuccess: false
      }
    }

    // Combine individual and group therapy logs
    const allTherapyLogs = [...individualTherapyLogs, ...groupTherapyLogs]

    // Calculate assessment statistics
    const assessmentTotalCreditTime = assessmentLogs.reduce((sum, log) => sum + log.creditTime, 0)
    const assessmentTotalCount = assessmentLogs.length
    const comprehensiveAssessmentLogs = assessmentLogs.filter(log => log.researchType === 'COMPREHENSIVE_PSYCHOLOGICAL_ASSESSMENT')
    const comprehensiveAssessmentCount = comprehensiveAssessmentLogs.length
    const assessmentSuccess = assessmentTotalCreditTime >= 300 * 60 // 300 hours in minutes
    const comprehensiveAssessmentSuccess = comprehensiveAssessmentCount >= 30

    // Calculate therapy statistics
    const therapyTotalCreditTime = allTherapyLogs.reduce((sum, log) =>
      sum + log.prepareTime + log.sessionTime + log.supervisionTime, 0)
    const therapyTotalCount = allTherapyLogs.length
    const mainTherapistLogs = allTherapyLogs.filter(log => log.therapyType === 'MAIN_THERAPIST')
    const mainTherapistCreditTime = mainTherapistLogs.reduce((sum, log) =>
      sum + log.prepareTime + log.sessionTime + log.supervisionTime, 0)
    const mainTherapistCount = mainTherapistLogs.length
    const therapySuccess = therapyTotalCreditTime >= 300 * 60 // 300 hours in minutes
    const mainTherapistTimeSuccess = mainTherapistCreditTime >= 100 * 60 // 100 hours in minutes
    const mainTherapistCountSuccess = mainTherapistCount >= 10

    // Calculate academic activity statistics
    const academicTotalCreditTime = academicActivityLogs.reduce((sum, log) => sum + log.creditTime, 0)
    const academicTotalCount = academicActivityLogs.length

    // Ethics education attendance
    const ethicsEducationLogs = academicActivityLogs.filter(log =>
      log.act === 'ATTENDING' && log.activityType === 'ETHICS_EDUCATION')
    const ethicsEducationCount = ethicsEducationLogs.length
    const ethicsEducationSuccess = ethicsEducationCount >= 1

    // Academic meeting attendance
    const academicMeetingLogs = academicActivityLogs.filter(log =>
      log.act === 'ATTENDING' && log.activityType === 'ACADEMIC_CONFERENCE')
    const academicMeetingCreditTime = academicMeetingLogs.reduce((sum, log) => sum + log.creditTime, 0)
    const academicMeetingSuccess = academicMeetingCreditTime >= 30 * 60 // 30 hours in minutes

    // Case meeting attendance
    const caseMeetingLogs = academicActivityLogs.filter(log =>
      log.act === 'ATTENDING' && log.activityType === 'CASE_CONFERENCE')
    const caseMeetingCreditTime = caseMeetingLogs.reduce((sum, log) => sum + log.creditTime, 0)
    const caseMeetingSuccess = caseMeetingCreditTime >= 10 * 60 // 10 hours in minutes

    // Case presentation
    const casePresentationLogs = academicActivityLogs.filter(log =>
      log.act === 'ASSISTING' && log.activityType === 'CASE_CONFERENCE')
    const casePresentationCount = casePresentationLogs.length
    const casePresentationSuccess = casePresentationCount >= 2

    // Paper presentation
    const paperPresentationLogs = academicActivityLogs.filter(log =>
      log.act === 'ASSISTING' && log.activityType === 'PAPER_PRESENTATION')
    const paperPresentationCount = paperPresentationLogs.length
    const paperPresentationSuccess = paperPresentationCount >= 1

    // Calculate research statistics
    const researchTotalCount = researchLogs.length
    const researchSuccess = researchTotalCount >= 1

    // Calculate other activity statistics
    const externalCooperationLogs = otherActivityLogs.filter(log => log.activityType === 'EXTERNAL_COOPERATION')
    const externalCooperationCreditTime = externalCooperationLogs.reduce((sum, log) => sum + log.creditTime, 0)
    const externalCooperationSuccess = externalCooperationCreditTime >= 30 * 60 // 30 hours in minutes

    const otherTrainingLogs = otherActivityLogs.filter(log => log.activityType === 'OTHER_TRAINING')
    const otherTrainingCreditTime = otherTrainingLogs.reduce((sum, log) => sum + log.creditTime, 0)

    // Calculate grand total
    const grandTotalCreditTime = assessmentTotalCreditTime + therapyTotalCreditTime +
      academicTotalCreditTime + externalCooperationCreditTime + otherTrainingCreditTime
    const grandTotalSuccess = grandTotalCreditTime >= 3000 * 60 // 3000 hours in minutes

    return {
      assessmentTotalCreditTime,
      assessmentTotalCount,
      comprehensiveAssessmentCount,
      assessmentSuccess,
      comprehensiveAssessmentSuccess,

      therapyTotalCreditTime,
      therapyTotalCount,
      mainTherapistCreditTime,
      mainTherapistCount,
      therapySuccess,
      mainTherapistTimeSuccess,
      mainTherapistCountSuccess,

      academicTotalCreditTime,
      academicTotalCount,
      ethicsEducationCount,
      academicMeetingCreditTime,
      caseMeetingCreditTime,
      casePresentationCount,
      paperPresentationCount,
      ethicsEducationSuccess,
      academicMeetingSuccess,
      caseMeetingSuccess,
      casePresentationSuccess,
      paperPresentationSuccess,

      researchTotalCount,
      researchSuccess,

      externalCooperationCreditTime,
      otherTrainingCreditTime,
      externalCooperationSuccess,

      grandTotalCreditTime,
      grandTotalSuccess
    }
  }, [assessmentLogs, individualTherapyLogs, groupTherapyLogs, academicActivityLogs, researchLogs, otherActivityLogs])

  // Process the data to calculate yearly statistics
  const yearlyStatistics = useMemo<YearlyStatisticsData[]>(() => {
    if (!assessmentLogs || !individualTherapyLogs || !groupTherapyLogs ||
        !academicActivityLogs || !otherActivityLogs) {
      return []
    }

    return TRAINING_YEARS.map(year => {
      // Filter assessment logs for this year
      const yearAssessmentLogs = assessmentLogs.filter(log => {
        const researchDate = new Date(log.researchDate)
        const startDate = new Date(year.startDate)
        const endDate = new Date(year.endDate)
        return researchDate >= startDate && researchDate <= endDate
      })

      // Calculate assessment credit time for this year
      const assessmentCreditTime = yearAssessmentLogs.reduce((sum, log) => sum + log.creditTime, 0)

      // Combine individual and group therapy logs
      const allTherapyLogs = [...individualTherapyLogs, ...groupTherapyLogs]

      // Filter therapy logs for this year
      const yearTherapyLogs = allTherapyLogs.filter(log => {
        const endDate = new Date(log.endDate)
        const yearStartDate = new Date(year.startDate)
        const yearEndDate = new Date(year.endDate)
        return endDate >= yearStartDate && endDate <= yearEndDate
      })

      // Calculate therapy credit time for this year
      const therapyCreditTime = yearTherapyLogs.reduce((sum, log) =>
        sum + log.prepareTime + log.sessionTime + log.supervisionTime, 0)

      // Filter academic activity logs for this year
      const yearAcademicLogs = academicActivityLogs.filter(log => {
        const activityDate = new Date(log.activityDate)
        const yearStartDate = new Date(year.startDate)
        const yearEndDate = new Date(year.endDate)
        return activityDate >= yearStartDate && activityDate <= yearEndDate
      })

      // Calculate academic credit time for this year
      const academicCreditTime = yearAcademicLogs.reduce((sum, log) => sum + log.creditTime, 0)

      // Filter other activity logs for this year
      const yearOtherLogs = otherActivityLogs.filter(log => {
        const endDate = new Date(log.endDate)
        const yearStartDate = new Date(year.startDate)
        const yearEndDate = new Date(year.endDate)
        return endDate >= yearStartDate && endDate <= yearEndDate
      })

      // Calculate other credit time for this year
      const otherCreditTime = yearOtherLogs.reduce((sum, log) => sum + log.creditTime, 0)

      // Calculate total credit time for this year
      const totalCreditTime = assessmentCreditTime + therapyCreditTime + academicCreditTime + otherCreditTime

      // Calculate progress percentage and success
      const targetMinutes = year.targetHours * 60
      const actualProgressPercentage = (totalCreditTime / targetMinutes) * 100
      const progressPercentage = Math.min(100, actualProgressPercentage)
      const success = totalCreditTime >= targetMinutes

      return {
        name: year.name,
        startDate: year.startDate,
        endDate: year.endDate,
        targetHours: year.targetHours,
        assessmentCreditTime,
        therapyCreditTime,
        academicCreditTime,
        otherCreditTime,
        totalCreditTime,
        success,
        progressPercentage,
        actualProgressPercentage
      }
    })
  }, [assessmentLogs, individualTherapyLogs, groupTherapyLogs, academicActivityLogs, otherActivityLogs])

  return {
    totalStatistics,
    yearlyStatistics,
    isLoading: isAssessmentLoading || isIndividualLoading || isGroupLoading ||
               isAcademicLoading || isResearchLoading || isOtherLoading,
    isError: isAssessmentError || isIndividualError || isGroupError ||
             isAcademicError || isResearchError || isOtherError
  }
}
