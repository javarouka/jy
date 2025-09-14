import ManagementWrapper from '@renderer/pages/management/ManagementWrapper'
import SubTitle from '@renderer/component/basic/SubTitle'
import OtherActivityLogList from '@renderer/pages/management/other-activity-log/OtherActivityLogList'
import OtherActivityLogInsertForm from '@renderer/pages/management/other-activity-log/OtherActivityLogInsertForm'

function OtherActivityLog() {
  return (
    <ManagementWrapper>
      <SubTitle>기타 수련 활동 관리</SubTitle>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-[30%]">
          <OtherActivityLogInsertForm />
        </div>
        <div className="w-full md:w-[70%]">
          <OtherActivityLogList />
        </div>
      </div>
    </ManagementWrapper>
  )
}

export default OtherActivityLog
