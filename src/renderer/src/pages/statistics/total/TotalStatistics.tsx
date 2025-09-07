import useTotalStatistics from '@renderer/pages/statistics/total/hook/useTotalStatistics'
import SubTitle from '@renderer/component/basic/SubTitle'
import GrandTotal from '@renderer/pages/statistics/total/components/GrandTotal'
import YearlyStatistics from '@renderer/pages/statistics/total/components/YearlyStatistics'
import AssessmentStatistics from '@renderer/pages/statistics/total/components/AssessmentStatistics'
import TherapyStatistics from '@renderer/pages/statistics/total/components/TherapyStatistics'
import AcademicActivityStatistics from '@renderer/pages/statistics/total/components/AcademicActivityStatistics'
import ResearchStatistics from '@renderer/pages/statistics/total/components/ResearchStatistics'
import OtherActivityStatistics from '@renderer/pages/statistics/total/components/OtherActivityStatistics'
import LoadingSpinner from '@renderer/component/basic/LoadingSpinner'
import FetchError from '@renderer/component/basic/FetchError'

export default function TotalStatistics() {
  const { totalStatistics, yearlyStatistics, isLoading, isError } = useTotalStatistics()


  if (isLoading) return <LoadingSpinner />
  if (isError) return <FetchError />

  return (
    <div className="w-full">
      <GrandTotal
        creditTime={totalStatistics.grandTotalCreditTime}
        isSuccess={totalStatistics.grandTotalSuccess}
      />

      <div className="flex flex-col sm:flex-row gap-6 w-full" style={{ flexWrap: 'wrap' }}>

        <div className="w-full sm:flex-1" style={{ minWidth: '300px', flex: '1 1 0%' }}>
          <YearlyStatistics yearlyStats={yearlyStatistics} />
        </div>

        <div className="w-full sm:flex-1" style={{ minWidth: '300px', flex: '1 1 0%' }}>
          <SubTitle className="mb-4">전체 기간 통계</SubTitle>

          <AssessmentStatistics
            assessmentTotalCreditTime={totalStatistics.assessmentTotalCreditTime}
            assessmentSuccess={totalStatistics.assessmentSuccess}
            comprehensiveAssessmentCount={totalStatistics.comprehensiveAssessmentCount}
            comprehensiveAssessmentSuccess={totalStatistics.comprehensiveAssessmentSuccess}
          />

          <TherapyStatistics
            therapyTotalCreditTime={totalStatistics.therapyTotalCreditTime}
            therapySuccess={totalStatistics.therapySuccess}
            mainTherapistCreditTime={totalStatistics.mainTherapistCreditTime}
            mainTherapistTimeSuccess={totalStatistics.mainTherapistTimeSuccess}
            mainTherapistCount={totalStatistics.mainTherapistCount}
            mainTherapistCountSuccess={totalStatistics.mainTherapistCountSuccess}
          />

          <AcademicActivityStatistics
            academicTotalCreditTime={totalStatistics.academicTotalCreditTime}
            ethicsEducationCount={totalStatistics.ethicsEducationCount}
            ethicsEducationSuccess={totalStatistics.ethicsEducationSuccess}
            academicMeetingCreditTime={totalStatistics.academicMeetingCreditTime}
            academicMeetingSuccess={totalStatistics.academicMeetingSuccess}
            caseMeetingCreditTime={totalStatistics.caseMeetingCreditTime}
            caseMeetingSuccess={totalStatistics.caseMeetingSuccess}
            casePresentationCount={totalStatistics.casePresentationCount}
            casePresentationSuccess={totalStatistics.casePresentationSuccess}
            paperPresentationCount={totalStatistics.paperPresentationCount}
            paperPresentationSuccess={totalStatistics.paperPresentationSuccess}
          />

          <ResearchStatistics
            researchTotalCount={totalStatistics.researchTotalCount}
            researchSuccess={totalStatistics.researchSuccess}
          />

          <OtherActivityStatistics
            externalCooperationCreditTime={totalStatistics.externalCooperationCreditTime}
            externalCooperationSuccess={totalStatistics.externalCooperationSuccess}
            otherTrainingCreditTime={totalStatistics.otherTrainingCreditTime}
          />
        </div>
      </div>
    </div>
  )
}
