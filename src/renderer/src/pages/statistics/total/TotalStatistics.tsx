import useTotalStatistics from '@renderer/pages/statistics/total/hook/useTotalStatistics'
import SubTitle from '@renderer/component/basic/SubTitle'
import StatItem from '@renderer/pages/statistics/total/components/StatItem'
import StatSection from '@renderer/pages/statistics/total/components/StatSection'
import GrandTotal from '@renderer/pages/statistics/total/components/GrandTotal'
import YearlyStatistics from '@renderer/pages/statistics/total/components/YearlyStatistics'

export default function TotalStatistics() {
  const { totalStatistics, yearlyStatistics, isLoading, isError } = useTotalStatistics()


  if (isLoading) return <div className="p-4">통계 데이터를 불러오는 중...</div>
  if (isError) return <div className="p-4">통계 데이터를 불러오는 중 오류가 발생했습니다.</div>

  return (
    <div className="w-full">
      {/* Grand Total (displayed at the top) */}
      <GrandTotal
        creditTime={totalStatistics.grandTotalCreditTime}
        isSuccess={totalStatistics.grandTotalSuccess}
      />

      {/* Yearly Statistics */}
      <YearlyStatistics yearlyStats={yearlyStatistics} />

      {/* Total Statistics for All Periods */}
      <SubTitle className="mb-4">전체 기간 통계</SubTitle>

      {/* Assessment Statistics */}
      <StatSection title="심리평가 통계">
        <StatItem
          label="심리평가 총 인정시간"
          value={totalStatistics.assessmentTotalCreditTime}
          isSuccess={totalStatistics.assessmentSuccess}
          target="300 시간"
        />
        <StatItem
          label="종합심리평가 사례 수"
          value={totalStatistics.comprehensiveAssessmentCount}
          isSuccess={totalStatistics.comprehensiveAssessmentSuccess}
          unit="례"
          target="30 례"
        />
      </StatSection>

      {/* Therapy Statistics */}
      <StatSection title="심리치료 통계">
        <StatItem
          label="심리치료 총 인정시간"
          value={totalStatistics.therapyTotalCreditTime}
          isSuccess={totalStatistics.therapySuccess}
          target="300 시간"
        />
        <StatItem
          label="주치료자 인정시간"
          value={totalStatistics.mainTherapistCreditTime}
          isSuccess={totalStatistics.mainTherapistTimeSuccess}
          target="100 시간"
        />
        <StatItem
          label="주치료자 사례 수"
          value={totalStatistics.mainTherapistCount}
          isSuccess={totalStatistics.mainTherapistCountSuccess}
          unit="례"
          target="10 례"
        />
      </StatSection>

      {/* Academic Activity Statistics */}
      <StatSection title="학술활동 통계">
        <StatItem
          label="학술활동 총 인정시간"
          value={totalStatistics.academicTotalCreditTime}
        />
        <StatItem
          label="윤리교육 참석 횟수"
          value={totalStatistics.ethicsEducationCount}
          isSuccess={totalStatistics.ethicsEducationSuccess}
          unit="회"
          target="1 회"
        />
        <StatItem
          label="학술회의 참석 인정시간"
          value={totalStatistics.academicMeetingCreditTime}
          isSuccess={totalStatistics.academicMeetingSuccess}
          target="30 시간"
        />
        <StatItem
          label="사례회의 참석 인정시간"
          value={totalStatistics.caseMeetingCreditTime}
          isSuccess={totalStatistics.caseMeetingSuccess}
          target="10 시간"
        />
        <StatItem
          label="사례회의 발표 횟수"
          value={totalStatistics.casePresentationCount}
          isSuccess={totalStatistics.casePresentationSuccess}
          unit="회"
          target="2 회"
        />
        <StatItem
          label="논문발표 횟수"
          value={totalStatistics.paperPresentationCount}
          isSuccess={totalStatistics.paperPresentationSuccess}
          unit="회"
          target="1 회"
        />
      </StatSection>

      {/* Research Statistics */}
      <StatSection title="연구 통계">
        <StatItem
          label="총 연구 수"
          value={totalStatistics.researchTotalCount}
          isSuccess={totalStatistics.researchSuccess}
          unit="건"
          target="1 건"
        />
      </StatSection>

      {/* Other Activity Statistics */}
      <StatSection title="기타 활동 통계">
        <StatItem
          label="대외협력 인정시간"
          value={totalStatistics.externalCooperationCreditTime}
          isSuccess={totalStatistics.externalCooperationSuccess}
          target="30 시간"
        />
        <StatItem
          label="기타수련 인정시간"
          value={totalStatistics.otherTrainingCreditTime}
        />
      </StatSection>
    </div>
  )
}
