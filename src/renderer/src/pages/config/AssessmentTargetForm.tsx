import useAssessmentTargetMutation from '@renderer/pages/config/hook/useAssessmentTargetMutation'

function AssessmentTargetForm() {
  const {
    forms: {
      formData,
      editMode,
      assessmentTarget,
      isLoading
    },
    handleChange,
    handleSubmit,
    handleReset
  } = useAssessmentTargetMutation()

  // Convert minutes to hours for display
  const minutesToHours = (minutes: number) => {
    return minutes / 60
  }

  // Convert hours to minutes for storage
  const hoursToMinutes = (hours: number) => {
    return hours * 60
  }

  const handleHoursChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    const minutes = value === '' ? 0 : hoursToMinutes(parseFloat(value))

    // Create a synthetic event object
    const syntheticEvent = {
      target: {
        name: name,
        value: minutes.toString(),
        type: 'number'
      }
    } as React.ChangeEvent<HTMLInputElement>

    handleChange(syntheticEvent)
  }

  return (
    <div className="m-2 p-2 border border-gray-200 shadow-md font-sans">
      <h3 className="text-left mb-4">심리평가 목표 설정</h3>
      {isLoading ? (
        <p>로딩 중...</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="mb-2 text-sm">
            <label htmlFor="totalCreditHours" className="block font-bold">심리평가 총 인정시간 (시간)</label>
            <input
              type="number"
              id="totalCreditHours"
              name="totalCreditMinutes"
              value={minutesToHours(formData.totalCreditMinutes)}
              onChange={handleHoursChange}
              required
              min="1"
              step="0.5"
              className="w-full p-1 border border-gray-300 rounded box-border text-base"
            />
            <p className="text-xs text-gray-500 mt-1">
              분 단위로 환산: {formData.totalCreditMinutes}분
            </p>
          </div>

          <div className="mb-2 text-sm">
            <label htmlFor="caseCount" className="block font-bold">종합심리평가 사례 수</label>
            <input
              type="number"
              id="caseCount"
              name="caseCount"
              value={formData.caseCount}
              onChange={handleChange}
              required
              min="1"
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

      {assessmentTarget && (
        <div className="mt-8">
          <h4 className="text-left mb-2 font-bold">현재 설정된 목표</h4>
          <div className="bg-gray-50 p-4 rounded">
            <p><span className="font-bold">심리평가 총 인정시간:</span> {minutesToHours(assessmentTarget.totalCreditMinutes)}시간 ({assessmentTarget.totalCreditMinutes}분)</p>
            <p><span className="font-bold">종합심리평가 사례 수:</span> {assessmentTarget.caseCount}개</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default AssessmentTargetForm
