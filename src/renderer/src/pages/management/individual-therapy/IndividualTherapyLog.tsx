import ManagementWrapper from '@renderer/pages/management/ManagementWrapper'
import SubTitle from '@renderer/component/basic/SubTitle'
import './IndividualTherapyLog.css'
import IndividualTherapyLogList from '@renderer/pages/management/individual-therapy/IndividualTherapyLogList'
import IndividualTherapyLogInsertForm from '@renderer/pages/management/individual-therapy/IndividualTherapyLogInsertForm'

function IndividualTherapyLog() {
  return (
    <ManagementWrapper>
      <SubTitle>개인심리치료 관리</SubTitle>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-[30%]">
          <IndividualTherapyLogInsertForm />
        </div>
        <div className="w-full md:w-[70%]">
          <IndividualTherapyLogList />
        </div>
      </div>
    </ManagementWrapper>
  )
}

export default IndividualTherapyLog
