import AssessmentLogStatistics from '@renderer/pages/statistics/by-years/assessment-log/AssessmentLogStatistics'
import TherapyLogStatistics from '@renderer/pages/statistics/by-years/therapy-log/TherapyLogStatistics'

function ByYearStatistics() {
  return (
    <div className="w-full flex flex-row space-x-4">
      <div className="flex-1"><AssessmentLogStatistics /></div>
      <div className="flex-1"><TherapyLogStatistics /></div>
    </div>
  )
}

export default ByYearStatistics
