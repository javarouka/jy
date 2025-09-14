import useAcademicActivityLogMutation from '@renderer/pages/management/academic-activity-log/hook/useAcademicActivityLogMutation'
import { ACT_OPTIONS, ACTIVITY_TYPE_OPTIONS, ORGANIZATION_OPTIONS } from '@shared/constants'
import { getTranslatedText } from '@renderer/helpers/translateConstants'

function AcademicActivityLogInsertForm() {
  const {
    forms: {
      formData,
    },
    handleSubmit,
    handleChange,
  } = useAcademicActivityLogMutation()

  return (
    <fieldset>
      <div>
        <form onSubmit={handleSubmit} className="p-2 border border-gray-200 rounded-lg shadow-md font-sans space-y-4 text-[0.8em]">
          <h3 className="text-left mb-4">학술활동 기록 입력</h3>

          <div className="mb-2">
            <label htmlFor="sessionName" className="block font-bold">발표명</label>
            <input
              type="text"
              id="sessionName"
              name="sessionName"
              value={formData.sessionName}
              onChange={handleChange}
              required
              className="w-full p-1 border border-gray-300 rounded box-border"
            />
          </div>

          <div className="mb-2">
            <label htmlFor="activityName" className="block font-bold">회의명</label>
            <input
              type="text"
              id="activityName"
              name="activityName"
              value={formData.activityName}
              onChange={handleChange}
              required
              className="w-full p-1 border border-gray-300 rounded box-border"
            />
          </div>

          <div className="mb-2">
            <label htmlFor="act" className="block font-bold">참석 발표</label>
            <select
              id="act"
              name="act"
              value={formData.act}
              onChange={handleChange}
              required
              className="w-full p-1 border border-gray-300 rounded box-border"
            >
              <option value="">선택하세요</option>
              {ACT_OPTIONS.map((option) => (
                <option key={option.id} value={option.id}>
                  {getTranslatedText(option)}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-2">
            <label htmlFor="activityType" className="block font-bold">회의 유형</label>
            <select
              id="activityType"
              name="activityType"
              value={formData.activityType}
              onChange={handleChange}
              required
              className="w-full p-1 border border-gray-300 rounded box-border"
            >
              <option value="">선택하세요</option>
              {ACTIVITY_TYPE_OPTIONS.map((option) => (
                <option key={option.id} value={option.id}>
                  {getTranslatedText(option)}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-2">
            <label htmlFor="organization" className="block font-bold">주관기관</label>
            <select
              id="organization"
              name="organization"
              value={formData.organization}
              onChange={handleChange}
              required
              className="w-full p-1 border border-gray-300 rounded box-border"
            >
              <option value="">선택하세요</option>
              {ORGANIZATION_OPTIONS.map((option) => (
                <option key={option.id} value={option.id}>
                  {getTranslatedText(option)}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-4">
            <div className="flex-1 mb-2">
              <label htmlFor="creditTime" className="block font-bold">인정시간 (분)</label>
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

          <div className="mb-2">
            <label htmlFor="activityDate" className="block font-bold">활동일</label>
            <input
              type="date"
              id="activityDate"
              name="activityDate"
              value={formData.activityDate}
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
      </div>
    </fieldset>
  )
}

export default AcademicActivityLogInsertForm
