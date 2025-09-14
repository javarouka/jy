import useGroupTherapyLogMutation from '@renderer/pages/management/group-therapy/hook/useGroupTherapyLogMutation'
import { THERAPY_TYPE_OPTIONS } from '@shared/constants'
import { getTranslatedText } from '@renderer/helpers/translateConstants'

function GroupTherapyLogInsertForm() {
  const {
    forms: {
      formData,
    },
    handleSubmit,
    handleChange,
  } = useGroupTherapyLogMutation()

  return (
    <fieldset>
      <div>
        <form onSubmit={handleSubmit} className="p-2 border border-gray-200 rounded-lg shadow-md font-sans space-y-4 text-[0.8em]">
          <h3 className="text-left mb-4">집단심리치료 기록 입력</h3>
          <div className="mb-2">
            <label htmlFor="groupName" className="block font-bold">그룹명</label>
            <input
              type="text"
              id="groupName"
              name="groupName"
              value={formData.groupName}
              onChange={handleChange}
              required
              className="w-full p-1 border border-gray-300 rounded box-border"
            />
          </div>

          <div className="mb-2">
            <label htmlFor="therapyType" className="block font-bold">치료자 유형</label>
            <select
              id="therapyType"
              name="therapyType"
              value={formData.therapyType}
              onChange={handleChange}
              className="w-full p-1 border border-gray-300 rounded box-border"
            >
              {THERAPY_TYPE_OPTIONS.map((type) => (
                <option key={type.id} value={type.id}>
                  {getTranslatedText(type)}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-4">
            <div className="flex-1 mb-2">
              <label htmlFor="sessionCount" className="block font-bold">회기 수</label>
              <input
                type="number"
                id="sessionCount"
                name="sessionCount"
                value={formData.sessionCount}
                onChange={handleChange}
                required
                className="w-full p-1 border border-gray-300 rounded box-border"
              />
            </div>

            <div className="flex-1 mb-2">
              <label htmlFor="prepareTime" className="block font-bold">준비 시간 (분)</label>
              <input
                type="number"
                id="prepareTime"
                name="prepareTime"
                value={formData.prepareTime}
                onChange={handleChange}
                required
                className="w-full p-1 border border-gray-300 rounded box-border"
              />
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-1 mb-2">
              <label htmlFor="sessionTime" className="block font-bold">상담 시간 (분)</label>
              <input
                type="number"
                id="sessionTime"
                name="sessionTime"
                value={formData.sessionTime}
                onChange={handleChange}
                required
                className="w-full p-1 border border-gray-300 rounded box-border"
              />
            </div>

            <div className="flex-1 mb-2">
              <label htmlFor="supervisionTime" className="block font-bold">지도감독 시간 (분)</label>
              <input
                type="number"
                id="supervisionTime"
                name="supervisionTime"
                value={formData.supervisionTime}
                onChange={handleChange}
                required
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

          <div className="flex gap-4">
            <div className="flex-1 mb-2">
              <label htmlFor="startDate" className="block font-bold">시작일</label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                required
                className="w-full p-1 border border-gray-300 rounded box-border"
              />
            </div>

            <div className="flex-1 mb-2">
              <label htmlFor="endDate" className="block font-bold">종료일</label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                required
                className="w-full p-1 border border-gray-300 rounded box-border"
              />
            </div>
          </div>

          <button
            className="w-full py-2 px-4 rounded bg-blue-600 font-bold text-white transition-colors duration-200 hover:bg-blue-700 cursor-pointer"
          >
            저장
          </button>
        </form>
      </div>
    </fieldset>
  )
}

export default GroupTherapyLogInsertForm
