import useIndividualTherapyLogMutation from '@renderer/pages/management/individual-therapy/hook/useIndividualTherapyLogMutation'
import { THERAPY_TYPE_OPTIONS } from '@shared/types'

function IndividualTherapyLogInsertForm() {
  const {
    forms: {
      formData,
    },
    handleSubmit,
    handleChange,
  } = useIndividualTherapyLogMutation()

  return (
    <fieldset>
      <div>
        <form onSubmit={handleSubmit} className="m-2 p-2 border border-gray-200 rounded-lg shadow-md font-sans space-y-4">
          <h3 className="text-left mb-4">개인심리치료 기록 입력</h3>
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
              <label htmlFor="sessionCount" className="block font-bold">회기 수</label>
              <input
                type="number"
                id="sessionCount"
                name="sessionCount"
                value={formData.sessionCount}
                onChange={handleChange}
                required
                className="w-full p-1 border border-gray-300 rounded box-border text-base"
              />
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-1 mb-2 text-sm">
              <label htmlFor="prepareTime" className="block font-bold">준비 시간 (분)</label>
              <input
                type="number"
                id="prepareTime"
                name="prepareTime"
                value={formData.prepareTime}
                onChange={handleChange}
                required
                className="w-full p-1 border border-gray-300 rounded box-border text-base"
              />
            </div>

            <div className="flex-1 mb-2 text-sm">
              <label htmlFor="sessionTime" className="block font-bold">상담 시간 (분)</label>
              <input
                type="number"
                id="sessionTime"
                name="sessionTime"
                value={formData.sessionTime}
                onChange={handleChange}
                required
                className="w-full p-1 border border-gray-300 rounded box-border text-base"
              />
            </div>
          </div>

          <div className="mb-2 text-sm">
            <label htmlFor="supervisionTime" className="block font-bold">지도감독 시간 (분)</label>
            <input
              type="number"
              id="supervisionTime"
              name="supervisionTime"
              value={formData.supervisionTime}
              onChange={handleChange}
              required
              className="w-full p-1 border border-gray-300 rounded box-border text-base"
            />
          </div>

          <div className="flex gap-8">
            <div className="flex-1 mb-2 text-sm">
              <label htmlFor="therapyType" className="block font-bold">치료자 유형</label>
              <select
                id="therapyType"
                name="therapyType"
                value={formData.therapyType}
                onChange={handleChange}
                className="w-full p-1 border border-gray-300 rounded box-border text-base"
              >
                <option value={THERAPY_TYPE_OPTIONS[0]}>
                  {THERAPY_TYPE_OPTIONS[0]}
                </option>
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

          <div className="flex gap-4">
            <div className="flex-1 mb-2 text-sm">
              <label htmlFor="startDate" className="block font-bold">시작일</label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                required
                className="w-full p-1 border border-gray-300 rounded box-border text-base"
              />
            </div>

            <div className="flex-1 mb-2 text-sm">
              <label htmlFor="endDate" className="block font-bold">종료일</label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                required
                className="w-full p-1 border border-gray-300 rounded box-border text-base"
              />
            </div>
          </div>

          <button
            className="w-full py-2 px-4 rounded bg-blue-600 text-sm font-bold text-white transition-colors duration-200 hover:bg-blue-700 cursor-pointer"
          >
            저장
          </button>
        </form>
      </div>
    </fieldset>
  )
}

export default IndividualTherapyLogInsertForm
