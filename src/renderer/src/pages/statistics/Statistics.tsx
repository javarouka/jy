import { ReactNode } from 'react'
import Tabs from '@renderer/component/layout/Tabs'
import ByYearStatistics from '@renderer/pages/statistics/by-years/ByYearStatistics'
import TotalStatistics from '@renderer/pages/statistics/total/TotalStatistics'

const tabData: { title: string; content: ReactNode }[] = [
  {
    title: '종합 통계',
    content: <TotalStatistics />,
  },
  {
    title: '연차별 통계',
    content: <ByYearStatistics />,
  }
];

function Statistics() {
  return (
    <Tabs tabData={tabData} />
  )
}

export default Statistics
