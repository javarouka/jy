import { ReactNode } from 'react'
import MainTitle from '@renderer/component/basic/MainTitle'
import Tabs from '@renderer/component/layout/Tabs'
import AssessmentLogCharts from './components/AssessmentLogCharts'
import IndividualTherapyLogCharts from './components/IndividualTherapyLogCharts'
import GroupTherapyLogCharts from './components/GroupTherapyLogCharts'
import AcademicActivityLogCharts from './components/AcademicActivityLogCharts'
import ResearchLogCharts from './components/ResearchLogCharts'
import OtherActivityLogCharts from './components/OtherActivityLogCharts'

const tabData: { title: string; content: ReactNode }[] = [
  {
    title: '심리평가',
    content: <AssessmentLogCharts />,
  },
  {
    title: '심리치료 (개인)',
    content: <IndividualTherapyLogCharts />,
  },
  {
    title: '심리치료 (집단)',
    content: <GroupTherapyLogCharts />,
  },
  {
    title: '학술활동',
    content: <AcademicActivityLogCharts />,
  },
  {
    title: '연구활동',
    content: <ResearchLogCharts />,
  },
  {
    title: '기타 수련 활동',
    content: <OtherActivityLogCharts />,
  },
];

function Overview() {
  return (
    <div className="w-full flex flex-col p-4">
      <MainTitle>둘러보기</MainTitle>
      <div className="flex flex-col py-2 h-full">
        <Tabs tabData={tabData} />
      </div>
    </div>
  )
}

export default Overview
