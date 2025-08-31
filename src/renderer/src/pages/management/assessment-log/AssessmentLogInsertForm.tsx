import useAssessmentLogMutation from '@renderer/pages/management/assessment-log/hook/useAssessmentLogMutation'
import { RESEARCH_TYPE_OPTIONS } from '@shared/types'

function AssessmentLogInsertForm() {
  const {
    forms: {
      formData,
    },
    handleSubmit,
    handleChange,
  } = useAssessmentLogMutation()

  return (
    <fieldset>
      <div>
        <form onSubmit={handleSubmit} className="m-2 p-2 border border-gray-200 rounded-lg shadow-md font-sans space-y-4">
          <h3 className="text-left mb-4">평가 기록 입력</h3>
          <div className="mb-2 text-sm">
            <label htmlFor="clientName" className="block font-bold">내담자명</label>
            <input
              type="text"
              id="clientName"
              name="clientName"
              value={formData.clientName}
              onChange={handleChange}
              required
              className="w-full p-1 border border-gray-300 rounded box-border text-base"
            />
          </div>

          <div className="flex gap-4">
            <div className="flex-1 mb-2 text-sm">
              <label htmlFor="age" className="block font-bold">나이</label>
              <input
                type="number"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleChange}
                required
                className="w-full p-1 border border-gray-300 rounded box-border text-base"
              />
            </div>

            <div className="flex-1 mb-2 text-sm">
              <label htmlFor="creditTime" className="block font-bold">인정 시간 (분)</label>
              <input
                type="number"
                id="creditTime"
                name="creditTime"
                value={formData.creditTime}
                onChange={handleChange}
                required
                className="w-full p-1 border border-gray-300 rounded box-border text-base"
              />
            </div>
          </div>

          <div className="mb-2 text-sm">
            <label htmlFor="dx" className="block font-bold">진단명(Dx)</label>
            <input
              type="text"
              id="dx"
              name="dx"
              value={formData.dx}
              onChange={handleChange}
              required
              className="w-full p-1 border border-gray-300 rounded box-border text-base"
            />
          </div>

          <div className="flex gap-8">
            <div className="flex-1 mb-2 text-sm">
              <label htmlFor="researchType" className="block font-bold">검사 종류</label>
              <select
                id="researchType"
                name="researchType"
                value={formData.researchType}
                onChange={handleChange}
                className="w-full p-1 border border-gray-300 rounded box-border text-base"
              >
                {RESEARCH_TYPE_OPTIONS.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex-1 mb-2 text-sm">
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

          <div className="mb-2 text-sm">
            <label htmlFor="researchDate" className="block font-bold">검사일</label>
            <input
              type="date"
              id="researchDate"
              name="researchDate"
              value={formData.researchDate}
              onChange={handleChange}
              required
              className="w-full p-1 border border-gray-300 rounded box-border text-base"
            />
          </div>

          <button className="
            w-full
            rounded border-0
            bg-[#007bff]
            p-[0.5rem]
            text-[0.75rem]
            font-bold
            text-white
            transition-colors
            duration-200
            hover:bg-[#0056b3]
            cursor-pointer"
          >
            저장
          </button>
        </form>
      </div>
    </fieldset>
  )
}

export default AssessmentLogInsertForm
