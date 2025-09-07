import useResearchLogMutation from '@renderer/pages/management/research-log/hook/useResearchLogMutation'
import { PARTICIPATE_TYPE_OPTIONS } from '@shared/constants'
import { getTranslatedText } from '@renderer/helpers/translateConstants'

function ResearchLogInsertForm() {
  const {
    forms: {
      formData,
    },
    handleSubmit,
    handleChange,
  } = useResearchLogMutation()

  return (
    <fieldset>
      <div>
        <form onSubmit={handleSubmit} className="m-2 p-2 border border-gray-200 rounded-lg shadow-md font-sans space-y-4">
          <h3 className="text-left mb-4">연구로그 기록 입력</h3>

          <div className="mb-2 text-sm">
            <label htmlFor="pagerName" className="block font-bold">논문이름</label>
            <input
              type="text"
              id="pagerName"
              name="pagerName"
              value={formData.pagerName}
              onChange={handleChange}
              required
              className="w-full p-1 border border-gray-300 rounded box-border text-base"
            />
          </div>

          <div className="mb-2 text-sm">
            <label htmlFor="journalName" className="block font-bold">학회지</label>
            <input
              type="text"
              id="journalName"
              name="journalName"
              value={formData.journalName}
              onChange={handleChange}
              required
              className="w-full p-1 border border-gray-300 rounded box-border text-base"
            />
          </div>

          <div className="mb-2 text-sm">
            <label htmlFor="participateType" className="block font-bold">저자구분</label>
            <select
              id="participateType"
              name="participateType"
              value={formData.participateType}
              onChange={handleChange}
              required
              className="w-full p-1 border border-gray-300 rounded box-border text-base"
            >
              <option value="">선택하세요</option>
              {PARTICIPATE_TYPE_OPTIONS.map((option) => (
                <option key={option.id} value={option.id}>
                  {getTranslatedText(option)}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-2 text-sm">
            <label htmlFor="publishDate" className="block font-bold">발간일</label>
            <input
              type="date"
              id="publishDate"
              name="publishDate"
              value={formData.publishDate}
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

export default ResearchLogInsertForm
