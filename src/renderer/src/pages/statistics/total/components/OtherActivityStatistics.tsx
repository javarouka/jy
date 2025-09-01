import StatSection from '@renderer/pages/statistics/total/components/StatSection'
import StatItem from '@renderer/pages/statistics/total/components/StatItem'

type OtherActivityStatisticsProps = {
  externalCooperationCreditTime: number
  externalCooperationSuccess: boolean
  otherTrainingCreditTime: number
}

export default function OtherActivityStatistics({
  externalCooperationCreditTime,
  externalCooperationSuccess,
  otherTrainingCreditTime
}: OtherActivityStatisticsProps) {
  return (
    <div className="border rounded-lg p-4 border-gray-200 dark:border-gray-700 mb-6">
      <StatSection title="기타 활동 통계">
        <StatItem
          label="대외협력 인정시간"
          value={externalCooperationCreditTime}
          isSuccess={externalCooperationSuccess}
          target="30 시간"
        />
        <StatItem
          label="기타수련 인정시간"
          value={otherTrainingCreditTime}
        />
      </StatSection>
    </div>
  )
}
