import useResearchTargetMutation from '@renderer/pages/config/hook/useResearchTargetMutation'

function ResearchTargetForm() {
  const {
    forms: {
      formData,
      editMode,
      researchTarget,
      isLoading
    },
    handleChange,
    handleSubmit,
    handleReset
  } = useResearchTargetMutation()

  return (
    <div className="m-2 p-2 border border-gray-200 shadow-md font-sans">
      <h3 className="text-left mb-4">연구 목표 설정</h3>
      {isLoading ? (
        <p>로딩 중...</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="mb-2 text-sm">
            <label htmlFor="totalResearchCount" className="block font-bold">총 연구 수</label>
            <input
              type="number"
              id="totalResearchCount"
              name="totalResearchCount"
              value={formData.totalResearchCount}
              onChange={handleChange}
              required
              min="0"
              className="w-full p-1 border border-gray-300 rounded box-border text-base"
            />
          </div>

          <div className="flex gap-2">
            <button
              type="submit"
              className="flex-1 py-2 px-4 rounded bg-blue-600 text-sm font-bold text-white transition-colors duration-200 hover:bg-blue-700 cursor-pointer"
            >
              {editMode ? '수정' : '저장'}
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="flex-1 py-2 px-4 rounded bg-gray-500 text-sm font-bold text-white transition-colors duration-200 hover:bg-gray-600 cursor-pointer"
            >
              초기화
            </button>
          </div>
        </form>
      )}

      {researchTarget && (
        <div className="mt-8">
          <h4 className="text-left mb-2 font-bold">현재 설정된 목표</h4>
          <div className="bg-gray-50 p-4 rounded">
            <p>
              <span className="font-bold">총 연구 수:</span> {researchTarget.totalResearchCount}개
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default ResearchTargetForm
