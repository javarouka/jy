import useAcademicTargetMutation from '@renderer/pages/config/hook/useAcademicTargetMutation'

function AcademicTargetForm() {
  const {
    forms: {
      formData,
      editMode,
      academicTarget,
      isLoading
    },
    handleChange,
    handleSubmit,
    handleReset
  } = useAcademicTargetMutation()

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
      <h3 className="text-left mb-4">학술활동 목표 설정</h3>
      {isLoading ? (
        <p>로딩 중...</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="mb-2 text-sm">
            <label htmlFor="ethicsEducationJoinCount" className="block font-bold">윤리교육 참석 횟수</label>
            <input
              type="number"
              id="ethicsEducationJoinCount"
              name="ethicsEducationJoinCount"
              value={formData.ethicsEducationJoinCount}
              onChange={handleChange}
              required
              min="0"
              className="w-full p-1 border border-gray-300 rounded box-border text-base"
            />
          </div>

          <div className="mb-2 text-sm">
            <label htmlFor="caseConferencePresentationCount" className="block font-bold">사례회의 발표 횟수</label>
            <input
              type="number"
              id="caseConferencePresentationCount"
              name="caseConferencePresentationCount"
              value={formData.caseConferencePresentationCount}
              onChange={handleChange}
              required
              min="0"
              className="w-full p-1 border border-gray-300 rounded box-border text-base"
            />
          </div>

          <div className="mb-2 text-sm">
            <label htmlFor="thesisPresentationCount" className="block font-bold">논문발표 횟수</label>
            <input
              type="number"
              id="thesisPresentationCount"
              name="thesisPresentationCount"
              value={formData.thesisPresentationCount}
              onChange={handleChange}
              required
              min="0"
              className="w-full p-1 border border-gray-300 rounded box-border text-base"
            />
          </div>

          <div className="mb-2 text-sm">
            <label htmlFor="academicConferenceJoinHours" className="block font-bold">학술회의 참석 인정시간 (시간)</label>
            <input
              type="number"
              id="academicConferenceJoinHours"
              name="academicConferenceJoinMinutes"
              value={minutesToHours(formData.academicConferenceJoinMinutes)}
              onChange={handleHoursChange}
              required
              min="0"
              step="0.5"
              className="w-full p-1 border border-gray-300 rounded box-border text-base"
            />
            <p className="text-xs text-gray-500 mt-1">
              분 단위로 환산: {formData.academicConferenceJoinMinutes}분
            </p>
          </div>

          <div className="mb-2 text-sm">
            <label htmlFor="caseConferenceJoinHours" className="block font-bold">사례회의 참석 인정시간 (시간)</label>
            <input
              type="number"
              id="caseConferenceJoinHours"
              name="caseConferenceJoinMinutes"
              value={minutesToHours(formData.caseConferenceJoinMinutes)}
              onChange={handleHoursChange}
              required
              min="0"
              step="0.5"
              className="w-full p-1 border border-gray-300 rounded box-border text-base"
            />
            <p className="text-xs text-gray-500 mt-1">
              분 단위로 환산: {formData.caseConferenceJoinMinutes}분
            </p>
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

      {academicTarget && (
        <div className="mt-8">
          <h4 className="text-left mb-2 font-bold">현재 설정된 목표</h4>
          <div className="bg-gray-50 p-4 rounded">
            <p><span className="font-bold">윤리교육 참석 횟수:</span> {academicTarget.ethicsEducationJoinCount}회</p>
            <p><span className="font-bold">사례회의 발표 횟수:</span> {academicTarget.caseConferencePresentationCount}회</p>
            <p><span className="font-bold">논문발표 횟수:</span> {academicTarget.thesisPresentationCount}회</p>
            <p><span className="font-bold">학술회의 참석 인정시간:</span> {minutesToHours(academicTarget.academicConferenceJoinMinutes)}시간 ({academicTarget.academicConferenceJoinMinutes}분)</p>
            <p><span className="font-bold">사례회의 참석 인정시간:</span> {minutesToHours(academicTarget.caseConferenceJoinMinutes)}시간 ({academicTarget.caseConferenceJoinMinutes}분)</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default AcademicTargetForm
