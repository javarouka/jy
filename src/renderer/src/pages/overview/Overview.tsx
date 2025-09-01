import MainTitle from '@renderer/component/basic/MainTitle'
import ChartOverview from './ChartOverview'

function Overview() {
  return (
    <div className="w-full flex flex-col p-4">
      <MainTitle>둘러보기</MainTitle>
      <div className="flex">
        <ChartOverview />
      </div>
    </div>
  )
}

export default Overview
