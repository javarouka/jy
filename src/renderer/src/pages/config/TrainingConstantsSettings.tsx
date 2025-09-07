import { useState } from 'react'
import TrainingYearsForm from '@renderer/pages/config/TrainingYearsForm'
import AssessmentTargetForm from '@renderer/pages/config/AssessmentTargetForm'
import AcademicTargetForm from '@renderer/pages/config/AcademicTargetForm'
import OtherActivityTargetForm from '@renderer/pages/config/OtherActivityTargetForm'
import ResearchTargetForm from '@renderer/pages/config/ResearchTargetForm'
import TherapyTargetForm from '@renderer/pages/config/TherapyTargetForm'

type TargetType = 'trainingYears' | 'assessmentTarget' | 'academicTarget' | 'otherActivityTarget' | 'researchTarget' | 'therapyTarget'

function TrainingConstantsSettings() {
  const [activeTarget, setActiveTarget] = useState<TargetType>('trainingYears')

  return (
    <div className="p-4 flex flex-col md:flex-row gap-4">
      <div className="w-full md:w-[30%] md:max-w-[380px]">
        <div className="m-2 p-2 border border-gray-200 shadow-md font-sans space-y-4">
          <h3 className="text-left mb-4">설정 항목</h3>
          <ul className="space-y-2">
            <li>
              <button
                className={`w-full text-left p-2 rounded ${activeTarget === 'trainingYears' ? 'bg-blue-600 text-white' : 'hover:bg-gray-100'}`}
                onClick={() => setActiveTarget('trainingYears')}
              >
                수련 연차 설정
              </button>
            </li>
            <li>
              <button
                className={`w-full text-left p-2 rounded ${activeTarget === 'assessmentTarget' ? 'bg-blue-600 text-white' : 'hover:bg-gray-100'}`}
                onClick={() => setActiveTarget('assessmentTarget')}
              >
                심리평가 목표
              </button>
            </li>
            <li>
              <button
                className={`w-full text-left p-2 rounded ${activeTarget === 'academicTarget' ? 'bg-blue-600 text-white' : 'hover:bg-gray-100'}`}
                onClick={() => setActiveTarget('academicTarget')}
              >
                학술활동 목표
              </button>
            </li>
            <li>
              <button
                className={`w-full text-left p-2 rounded ${activeTarget === 'otherActivityTarget' ? 'bg-blue-600 text-white' : 'hover:bg-gray-100'}`}
                onClick={() => setActiveTarget('otherActivityTarget')}
              >
                기타활동 목표
              </button>
            </li>
            <li>
              <button
                className={`w-full text-left p-2 rounded ${activeTarget === 'researchTarget' ? 'bg-blue-600 text-white' : 'hover:bg-gray-100'}`}
                onClick={() => setActiveTarget('researchTarget')}
              >
                연구 목표
              </button>
            </li>
            <li>
              <button
                className={`w-full text-left p-2 rounded ${activeTarget === 'therapyTarget' ? 'bg-blue-600 text-white' : 'hover:bg-gray-100'}`}
                onClick={() => setActiveTarget('therapyTarget')}
              >
                심리치료 목표
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div className="w-full md:w-[70%]">
        {activeTarget === 'trainingYears' && <TrainingYearsForm />}
        {activeTarget === 'assessmentTarget' && <AssessmentTargetForm />}
        {activeTarget === 'academicTarget' && <AcademicTargetForm />}
        {activeTarget === 'otherActivityTarget' && <OtherActivityTargetForm />}
        {activeTarget === 'researchTarget' && <ResearchTargetForm />}
        {activeTarget === 'therapyTarget' && <TherapyTargetForm />}
      </div>
    </div>
  )
}

export default TrainingConstantsSettings
