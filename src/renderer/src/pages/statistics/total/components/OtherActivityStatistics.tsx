import StatSection from '@renderer/pages/statistics/total/components/StatSection'
import MinuteStatItem from '@renderer/component/stat-item/MinuteStatItem'
import { OtherActivityTarget } from '@renderer/data/TrainingYears'

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
        <MinuteStatItem
          label="대외협력 인정시간"
          value={externalCooperationCreditTime}
          isSuccess={externalCooperationSuccess}
          target={OtherActivityTarget.externalCooperationCreditMinutes}
        />
        <MinuteStatItem label="기타수련 인정시간" value={otherTrainingCreditTime} />
      </StatSection>
    </div>
  )
}
