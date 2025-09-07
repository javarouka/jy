import StatSection from '@renderer/pages/statistics/total/components/StatSection'
import MinuteStatItem from '@renderer/component/stat-item/MinuteStatItem'
import CountStatItem from '@renderer/component/stat-item/CountStatItem'
import { TherapyTarget } from '@renderer/data/TrainingYears'

type TherapyStatisticsProps = {
  therapyTotalCreditTime: number
  therapySuccess: boolean
  mainTherapistCreditTime: number
  mainTherapistTimeSuccess: boolean
  mainTherapistCount: number
  mainTherapistCountSuccess: boolean
}

export default function TherapyStatistics({
  therapyTotalCreditTime,
  therapySuccess,
  mainTherapistCreditTime,
  mainTherapistTimeSuccess,
  mainTherapistCount,
  mainTherapistCountSuccess
}: TherapyStatisticsProps) {
  return (
    <div className="border rounded-lg p-4 border-gray-200 dark:border-gray-700 mb-6">
      <StatSection title="심리치료 통계">
        <MinuteStatItem
          label="심리치료 총 인정시간"
          value={therapyTotalCreditTime}
          isSuccess={therapySuccess}
          target={TherapyTarget.totalCreditMinutes}
        />
        <MinuteStatItem
          label="주치료자 인정시간"
          value={mainTherapistCreditTime}
          isSuccess={mainTherapistTimeSuccess}
          target={TherapyTarget.primaryTherapistCreditMinutes}
        />
        <CountStatItem
          label="주치료자 사례 수"
          value={mainTherapistCount}
          isSuccess={mainTherapistCountSuccess}
          unit="례"
          target={TherapyTarget.primaryTherapistCaseCount}
        />
      </StatSection>
    </div>
  )
}
