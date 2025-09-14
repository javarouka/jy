import ManagementWrapper from '@renderer/pages/management/ManagementWrapper'
import SubTitle from '@renderer/component/basic/SubTitle'
import './GroupTherapyLog.css'
import GroupTherapyLogList from '@renderer/pages/management/group-therapy/GroupTherapyLogList'
import GroupTherapyLogInsertForm from '@renderer/pages/management/group-therapy/GroupTherapyLogInsertForm'

function GroupTherapyLog() {
  return (
    <ManagementWrapper>
      <SubTitle>집단심리치료 관리</SubTitle>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-[30%]">
          <GroupTherapyLogInsertForm />
        </div>
        <div className="w-full md:w-[70%]">
          <GroupTherapyLogList />
        </div>
      </div>
    </ManagementWrapper>
  )
}

export default GroupTherapyLog
