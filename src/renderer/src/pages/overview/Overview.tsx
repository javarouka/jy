import { ReactNode, useState } from 'react'
import MainTitle from '@renderer/component/basic/MainTitle'
import Tabs from '@renderer/component/layout/Tabs'
import AssessmentLogCharts from './components/AssessmentLogCharts'
import IndividualTherapyLogCharts from './components/IndividualTherapyLogCharts'
import GroupTherapyLogCharts from './components/GroupTherapyLogCharts'
import AcademicActivityLogCharts from './components/AcademicActivityLogCharts'
import ResearchLogCharts from './components/ResearchLogCharts'
import OtherActivityLogCharts from './components/OtherActivityLogCharts'
import { TRAINING_YEARS } from '@renderer/data/TrainingYears'
import { TypeTrainingYear } from '@shared/types'

function Overview() {
  const [selectedTrainingYear, setSelectedTrainingYear] = useState<TypeTrainingYear | undefined>(undefined)

  const tabData: { title: string; content: ReactNode }[] = [
    {
      title: '심리평가',
      content: <AssessmentLogCharts trainingYear={selectedTrainingYear} />,
    },
    {
      title: '심리치료 (개인)',
      content: <IndividualTherapyLogCharts trainingYear={selectedTrainingYear} />,
    },
    {
      title: '심리치료 (집단)',
      content: <GroupTherapyLogCharts trainingYear={selectedTrainingYear} />,
    },
    {
      title: '학술활동',
      content: <AcademicActivityLogCharts trainingYear={selectedTrainingYear} />,
    },
    {
      title: '연구활동',
      content: <ResearchLogCharts trainingYear={selectedTrainingYear} />,
    },
    {
      title: '기타 수련 활동',
      content: <OtherActivityLogCharts trainingYear={selectedTrainingYear} />,
    },
  ];

  const handleTrainingYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const yearName = e.target.value
    if (yearName === 'all') {
      setSelectedTrainingYear(undefined)
    } else {
      const year = TRAINING_YEARS.find(y => y.name === yearName)
      setSelectedTrainingYear(year)
    }
  }

  return (
    <div className="w-full flex flex-col p-4 space-y-3">
      <MainTitle>둘러보기</MainTitle>
      <div className="mb-4">
        <label htmlFor="trainingYear" className="mr-2 font-medium">연차 선택:</label>
        <select
          id="trainingYear"
          className="border rounded p-1"
          onChange={handleTrainingYearChange}
          value={selectedTrainingYear?.name || 'all'}
        >
          <option value="all">전체</option>
          {TRAINING_YEARS.map(year => (
            <option key={year.name} value={year.name}>
              {year.name} ({new Date(year.startDate).toLocaleDateString()} ~ {new Date(year.endDate).toLocaleDateString()})
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col py-2 h-full">
        <Tabs tabData={tabData} />
      </div>
    </div>
  )
}

export default Overview
