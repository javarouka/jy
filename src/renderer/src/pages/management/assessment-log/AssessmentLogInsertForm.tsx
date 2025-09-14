import { useRef, useEffect, useState } from 'react'
import useAssessmentLogMutation from '@renderer/pages/management/assessment-log/hook/useAssessmentLogMutation'
import { RESEARCH_TYPE_OPTIONS } from '@shared/constants'
import { getTranslatedText } from '@renderer/helpers/translateConstants'

function AssessmentLogInsertForm() {
  const {
    forms: {
      formData,
    },
    handleSubmit,
    handleChange,
  } = useAssessmentLogMutation()

  const [etcDescHeight, setEtcDescHeight] = useState<number>(0)
  const etcDescRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Use setTimeout to ensure DOM has been updated
    const timer = setTimeout(() => {
      if (etcDescRef.current) {
        if (formData.researchType === 'OTHER') {
          // Make sure the element is visible for measurement
          const tempHeight = etcDescRef.current.scrollHeight
          setEtcDescHeight(tempHeight)
        } else {
          setEtcDescHeight(0)
        }
      }
    }, 10) // Small delay to ensure DOM update

    return () => clearTimeout(timer)
  }, [formData.researchType])

  return (
    <fieldset>
      <form onSubmit={handleSubmit} className="p-2 border border-gray-200 shadow-md font-sans space-y-4 text-[0.8em]">
          <h3 className="text-left mb-4">평가 기록 입력</h3>
          <div className="mb-2">
            <label htmlFor="clientName" className="block font-bold">내담자명</label>
            <input
              type="text"
              id="clientName"
              name="clientName"
              value={formData.clientName}
              onChange={handleChange}
              required
              className="w-full p-1 border border-gray-300 rounded box-border"
            />
          </div>

          <div className="flex gap-4">
            <div className="flex-1 mb-2">
              <label htmlFor="age" className="block font-bold">나이</label>
              <input
                type="number"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleChange}
                required
                className="w-full p-1 border border-gray-300 rounded box-border"
              />
            </div>

            <div className="flex-1 mb-2">
              <label className="block font-bold">성별</label>
              <div className="flex gap-8 mt-1">
                <label className="flex items-center font-normal">
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={formData.gender === 'male'}
                    onChange={handleChange}
                    required
                    className="mr-1"
                  />
                  남성
                </label>
                <label className="flex items-center font-normal">
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={formData.gender === 'female'}
                    onChange={handleChange}
                    required
                    className="mr-1"
                  />
                  여성
                </label>
              </div>
            </div>

          </div>

          <div className="mb-2">
            <label htmlFor="dx" className="block font-bold">진단명(Dx)</label>
            <input
              type="text"
              id="dx"
              name="dx"
              value={formData.dx}
              onChange={handleChange}
              required
              className="w-full p-1 border border-gray-300 rounded box-border"
            />
          </div>

          <div className="flex gap-4">
            <div className="flex-1 mb-2">
              <label htmlFor="researchType" className="block font-bold">검사 종류</label>
              <select
                id="researchType"
                name="researchType"
                value={formData.researchType}
                onChange={handleChange}
                className="w-full p-1 border border-gray-300 rounded box-border"
              >
                {RESEARCH_TYPE_OPTIONS.map((type) => (
                  <option key={type.id} value={type.id}>
                    {getTranslatedText(type)}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex-1 mb-2">
              <label htmlFor="creditTime" className="block font-bold">인정 시간 (분)</label>
              <input
                type="number"
                id="creditTime"
                name="creditTime"
                value={formData.creditTime}
                onChange={handleChange}
                required
                className="w-full p-1 border border-gray-300 rounded box-border"
              />
            </div>

          </div>

          <div
            ref={etcDescRef}
            className={`overflow-hidden transition-all duration-300 ease-in-out ${etcDescHeight === 0 ? 'w-0' : 'flex-1'}`}
            style={{ maxHeight: `${etcDescHeight}px`, opacity: etcDescHeight > 0 ? 1 : 0 }}
          >
            <div className="mb-2">
              <label htmlFor="etcDescription" className="block font-bold">기타 설명</label>
              <input
                type="text"
                id="etcDescription"
                name="etcDescription"
                value={formData.etcDescription}
                onChange={handleChange}
                required={formData.researchType === 'OTHER'}
                placeholder="기타 검사 종류를 입력해주세요"
                className="w-full p-1 border border-gray-300 rounded box-border"
              />
            </div>
          </div>

          <div className="mb-2">
            <label htmlFor="researchDate" className="block font-bold">검사일</label>
            <input
              type="date"
              id="researchDate"
              name="researchDate"
              value={formData.researchDate}
              onChange={handleChange}
              required
              className="w-full p-1 border border-gray-300 rounded box-border"
            />
          </div>

          <button
            className="w-full py-2 px-4 rounded bg-blue-600 font-bold text-white transition-colors duration-200 hover:bg-blue-700 cursor-pointer"
          >
            저장
          </button>
        </form>
    </fieldset>
  )
}

export default AssessmentLogInsertForm
