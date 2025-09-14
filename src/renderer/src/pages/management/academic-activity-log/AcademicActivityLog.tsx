import ManagementWrapper from '@renderer/pages/management/ManagementWrapper'
import SubTitle from '@renderer/component/basic/SubTitle'
import AcademicActivityLogList from '@renderer/pages/management/academic-activity-log/AcademicActivityLogList'
import AcademicActivityLogInsertForm from '@renderer/pages/management/academic-activity-log/AcademicActivityLogInsertForm'

function AcademicActivityLog() {
  return (
    <ManagementWrapper>
      <SubTitle>학술활동 관리</SubTitle>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-[30%]">
          <AcademicActivityLogInsertForm />
        </div>
        <div className="w-full md:w-[70%]">
          <AcademicActivityLogList />
        </div>
      </div>
    </ManagementWrapper>
  )
}

export default AcademicActivityLog
