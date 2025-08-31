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
        <form onSubmit={handleSubmit} className="bg-gray-50 p-6 rounded-lg shadow-sm space-y-4">
          <h3 className="text-xl font-semibold mb-6 text-gray-800 border-b border-gray-300 pb-2">개인심리치료 기록 입력</h3>
          <div className="mb-4 text-sm">
            <label htmlFor="clientName" className="block mb-1 font-semibold text-gray-600">내담자명</label>
            <input
              type="text"
              id="clientName"
              name="clientName"
              value={formData.clientName}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-sm"
            />
          </div>

          <div className="flex gap-4">
            <div className="mb-4 text-sm flex-1">
              <label htmlFor="age" className="block mb-1 font-semibold text-gray-600">나이</label>
              <input
                type="number"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-sm"
              />
            </div>

            <div className="mb-4 text-sm flex-1">
              <label htmlFor="sessionCount" className="block mb-1 font-semibold text-gray-600">회기 수</label>
              <input
                type="number"
                id="sessionCount"
                name="sessionCount"
                value={formData.sessionCount}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-sm"
              />
            </div>
          </div>

          <div className="flex gap-4">
            <div className="mb-4 text-sm flex-1">
              <label htmlFor="prepareTime" className="block mb-1 font-semibold text-gray-600">준비 시간 (분)</label>
              <input
                type="number"
                id="prepareTime"
                name="prepareTime"
                value={formData.prepareTime}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-sm"
              />
            </div>

            <div className="mb-4 text-sm flex-1">
              <label htmlFor="sessionTime" className="block mb-1 font-semibold text-gray-600">상담 시간 (분)</label>
              <input
                type="number"
                id="sessionTime"
                name="sessionTime"
                value={formData.sessionTime}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-sm"
              />
            </div>
          </div>

          <div className="mb-4 text-sm">
            <label htmlFor="supervisionTime" className="block mb-1 font-semibold text-gray-600">지도감독 시간 (분)</label>
            <input
              type="number"
              id="supervisionTime"
              name="supervisionTime"
              value={formData.supervisionTime}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-sm"
            />
          </div>

          <div className="flex gap-8">
            <div className="mb-4 text-sm flex-1">
              <label htmlFor="threapyType" className="block mb-1 font-semibold text-gray-600">치료자 유형</label>
              <select
                id="threapyType"
                name="threapyType"
                value={formData.threapyType}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-sm"
              >
                {THERAPY_TYPE_OPTIONS.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4 text-sm flex-1">
              <label className="block mb-1 font-semibold text-gray-600">성별</label>
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

          <div className="mb-4 text-sm">
            <label htmlFor="researchDate" className="block mb-1 font-semibold text-gray-600">검사일</label>
            <input
              type="date"
              id="researchDate"
              name="researchDate"
              value={formData.researchDate}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-sm"
            />
          </div>

          <div className="flex gap-4">
            <div className="mb-4 text-sm flex-1">
              <label htmlFor="startDate" className="block mb-1 font-semibold text-gray-600">시작일</label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-sm"
              />
            </div>

            <div className="mb-4 text-sm flex-1">
              <label htmlFor="endDate" className="block mb-1 font-semibold text-gray-600">종료일</label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-sm"
              />
            </div>
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

export default IndividualTherapyLogInsertForm
