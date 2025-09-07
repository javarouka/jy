import useOtherActivityLogMutation from '@renderer/pages/management/other-activity-log/hook/useOtherActivityLogMutation'
import { OTHER_ACTIVITY_TYPE_OPTIONS } from '@shared/constants'
import { getTranslatedText } from '@renderer/helpers/translateConstants'

function OtherActivityLogInsertForm() {
  const {
    forms: {
      formData,
    },
    handleSubmit,
    handleChange,
  } = useOtherActivityLogMutation()

  return (
    <fieldset>
      <div>
        <form onSubmit={handleSubmit} className="m-2 p-2 border border-gray-200 rounded-lg shadow-md font-sans space-y-4">
          <h3 className="text-left mb-4">기타 활동 기록 입력</h3>

          <div className="mb-2 text-sm">
            <label htmlFor="activitySummary" className="block font-bold">활동명</label>
            <input
              type="text"
              id="activitySummary"
              name="activitySummary"
              value={formData.activitySummary}
              onChange={handleChange}
              required
              className="w-full p-1 border border-gray-300 rounded box-border text-base"
            />
          </div>

          <div className="mb-2 text-sm">
            <label htmlFor="activityType" className="block font-bold">활동유형</label>
            <select
              id="activityType"
              name="activityType"
              value={formData.activityType}
              onChange={handleChange}
              required
              className="w-full p-1 border border-gray-300 rounded box-border text-base"
            >
              <option value="">선택하세요</option>
              {OTHER_ACTIVITY_TYPE_OPTIONS.map((option) => (
                <option key={option.id} value={option.id}>
                  {getTranslatedText(option)}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-2 text-sm">
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

          <div className="mb-2 text-sm">
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

          <div className="mb-2 text-sm">
            <label htmlFor="creditTime" className="block font-bold">인정시간 (분)</label>
            <input
              type="number"
              id="creditTime"
              name="creditTime"
              value={formData.creditTime}
              onChange={handleChange}
              required
              min="1"
              className="w-full p-1 border border-gray-300 rounded box-border text-base"
            />
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

export default OtherActivityLogInsertForm
