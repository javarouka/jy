import StatSection from '@renderer/pages/statistics/total/components/StatSection'
import MinuteStatItem from '@renderer/component/stat-item/MinuteStatItem'
import CountStatItem from '@renderer/component/stat-item/CountStatItem'
import { AssessmentTarget } from '@renderer/data/TrainingYears'

type AssessmentStatisticsProps = {
  assessmentTotalCreditTime: number
  assessmentSuccess: boolean
  comprehensiveAssessmentCount: number
  comprehensiveAssessmentSuccess: boolean
}

export default function AssessmentStatistics({
  assessmentTotalCreditTime,
  assessmentSuccess,
  comprehensiveAssessmentCount,
  comprehensiveAssessmentSuccess
}: AssessmentStatisticsProps) {
  return (
    <div className="border rounded-lg p-4 border-gray-200 dark:border-gray-700 mb-6">
      <StatSection title="심리평가 통계">
        <MinuteStatItem
          label="심리평가 총 인정시간"
          value={assessmentTotalCreditTime}
          isSuccess={assessmentSuccess}
          target={AssessmentTarget.totalCreditMinutes}
        />
        <CountStatItem
          label="종합심리평가 사례 수"
          value={comprehensiveAssessmentCount}
          isSuccess={comprehensiveAssessmentSuccess}
          unit="례"
          target={AssessmentTarget.caseCount}
        />
      </StatSection>
    </div>
  )
}
