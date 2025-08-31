import ManagementWrapper from '@renderer/pages/management/ManagementWrapper'
import SubTitle from '@renderer/component/basic/SubTitle'
import AssessmentLogList from '@renderer/pages/management/assessment-log/AssessmentLogList'
import AssessmentLogInsertForm from '@renderer/pages/management/assessment-log/AssessmentLogInsertForm'

function ManagementAssessmentLog() {
  return (
    <ManagementWrapper>
      <SubTitle>심리평가 기록 관리</SubTitle>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-[30%] md:max-w-[380px]">
          <AssessmentLogInsertForm />
        </div>
        <div className="w-full md:w-[70%]">
          <AssessmentLogList />
        </div>
      </div>
    </ManagementWrapper>
  )
}

export default ManagementAssessmentLog
