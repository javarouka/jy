import StatSection from '@renderer/pages/statistics/total/components/StatSection'
import CountStatItem from '@renderer/component/stat-item/CountStatItem'
import { ResearchTarget } from '@renderer/data/TrainingYears'

type ResearchStatisticsProps = {
  researchTotalCount: number
  researchSuccess: boolean
}

export default function ResearchStatistics({
  researchTotalCount,
  researchSuccess
}: ResearchStatisticsProps) {
  return (
    <div className="border rounded-lg p-4 border-gray-200 dark:border-gray-700 mb-6">
      <StatSection title="연구 통계">
        <CountStatItem
          label="총 연구 수"
          value={researchTotalCount}
          isSuccess={researchSuccess}
          unit="건"
          target={ResearchTarget.totalResearchCount}
        />
      </StatSection>
    </div>
  )
}
