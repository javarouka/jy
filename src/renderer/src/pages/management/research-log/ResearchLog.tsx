import ManagementWrapper from '@renderer/pages/management/ManagementWrapper'
import SubTitle from '@renderer/component/basic/SubTitle'
import ResearchLogList from '@renderer/pages/management/research-log/ResearchLogList'
import ResearchLogInsertForm from '@renderer/pages/management/research-log/ResearchLogInsertForm'

function ResearchLog() {
  return (
    <ManagementWrapper>
      <SubTitle>연구로그 관리</SubTitle>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-[30%]">
          <ResearchLogInsertForm />
        </div>
        <div className="w-full md:w-[70%]">
          <ResearchLogList />
        </div>
      </div>
    </ManagementWrapper>
  )
}

export default ResearchLog
