import StatSection from '@renderer/pages/statistics/total/components/StatSection'
import MinuteStatItem from '@renderer/component/stat-item/MinuteStatItem'
import CountStatItem from '@renderer/component/stat-item/CountStatItem'
import { AcademicTarget } from '@renderer/data/TrainingYears'

type AcademicActivityStatisticsProps = {
  academicTotalCreditTime: number
  ethicsEducationCount: number
  ethicsEducationSuccess: boolean
  academicMeetingCreditTime: number
  academicMeetingSuccess: boolean
  caseMeetingCreditTime: number
  caseMeetingSuccess: boolean
  casePresentationCount: number
  casePresentationSuccess: boolean
  paperPresentationCount: number
  paperPresentationSuccess: boolean
}

export default function AcademicActivityStatistics({
  academicTotalCreditTime,
  ethicsEducationCount,
  ethicsEducationSuccess,
  academicMeetingCreditTime,
  academicMeetingSuccess,
  caseMeetingCreditTime,
  caseMeetingSuccess,
  casePresentationCount,
  casePresentationSuccess,
  paperPresentationCount,
  paperPresentationSuccess
}: AcademicActivityStatisticsProps) {
  return (
    <div className="border rounded-lg p-4 border-gray-200 dark:border-gray-700 mb-6">
      <StatSection title="학술활동 통계">
        <CountStatItem
          label="윤리교육 참석 횟수"
          value={ethicsEducationCount}
          isSuccess={ethicsEducationSuccess}
          unit="회"
          target={AcademicTarget.ethicsEducationJoinCount}
        />
        <MinuteStatItem
          label="학술회의 참석 인정시간"
          value={academicMeetingCreditTime}
          isSuccess={academicMeetingSuccess}
          target={AcademicTarget.academicConferenceJoinMinutes}
        />
        <MinuteStatItem
          label="사례회의 참석 인정시간"
          value={caseMeetingCreditTime}
          isSuccess={caseMeetingSuccess}
          target={AcademicTarget.caseConferenceJoinMinutes}
        />
        <CountStatItem
          label="사례회의 발표 횟수"
          value={casePresentationCount}
          isSuccess={casePresentationSuccess}
          unit="회"
          target={AcademicTarget.caseConferencePresentationCount}
        />
        <CountStatItem
          label="논문발표 횟수"
          value={paperPresentationCount}
          isSuccess={paperPresentationSuccess}
          unit="회"
          target={AcademicTarget.thesisPresentationCount}
        />
        <MinuteStatItem label="학술활동 총 인정시간" value={academicTotalCreditTime} />
      </StatSection>
    </div>
  )
}
