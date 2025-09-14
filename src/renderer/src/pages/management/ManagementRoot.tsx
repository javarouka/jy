import { ReactNode } from 'react'
import AssessmentLog from '@renderer/pages/management/assessment-log/AssessmentLog'
import IndividualTherapyLog from '@renderer/pages/management/individual-therapy/IndividualTherapyLog'
import GroupTherapyLog from '@renderer/pages/management/group-therapy/GroupTherapyLog'
import AcademicActivityLog from '@renderer/pages/management/academic-activity-log/AcademicActivityLog'
import ResearchLog from '@renderer/pages/management/research-log/ResearchLog'
import OtherActivityLog from '@renderer/pages/management/other-activity-log/OtherActivityLog'
import Tabs from '@renderer/component/layout/Tabs'

const tabData: { title: string; content: ReactNode }[] = [
  {
    title: '심리평가',
    content: <AssessmentLog />,
  },
  {
    title: '심리치료 (개인)',
    content: <IndividualTherapyLog />,
  },
  {
    title: '심리치료 (집단)',
    content: <GroupTherapyLog />,
  },
  {
    title: '학술활동',
    content: <AcademicActivityLog />,
  },
  {
    title: '연구활동',
    content: <ResearchLog />,
  },
  {
    title: '기타 수련 활동',
    content: <OtherActivityLog />,
  },
];

export default function MyTabs() {
  return (
    <div className="text-xs w-full flex flex-col">
      <Tabs tabData={tabData} />
    </div>
  );
}
