import useOtherActivityTargetMutation from '@renderer/pages/config/hook/useOtherActivityTargetMutation'

function OtherActivityTargetForm() {
  const {
    forms: {
      formData,
      editMode,
      otherActivityTarget,
      isLoading
    },
    handleChange,
    handleSubmit,
    handleReset
  } = useOtherActivityTargetMutation()

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
      <h3 className="text-left mb-4">기타활동 목표 설정</h3>
      {isLoading ? (
        <p>로딩 중...</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="mb-2 text-sm">
            <label htmlFor="externalCooperationCreditHours" className="block font-bold">대외협력 인정시간 (시간)</label>
            <input
              type="number"
              id="externalCooperationCreditHours"
              name="externalCooperationCreditMinutes"
              value={minutesToHours(formData.externalCooperationCreditMinutes)}
              onChange={handleHoursChange}
              required
              min="0"
              step="0.5"
              className="w-full p-1 border border-gray-300 rounded box-border text-base"
            />
            <p className="text-xs text-gray-500 mt-1">
              분 단위로 환산: {formData.externalCooperationCreditMinutes}분
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

      {otherActivityTarget && (
        <div className="mt-8">
          <h4 className="text-left mb-2 font-bold">현재 설정된 목표</h4>
          <div className="bg-gray-50 p-4 rounded">
            <p>
              <span className="font-bold">대외협력 인정시간:</span> {minutesToHours(otherActivityTarget.externalCooperationCreditMinutes)}시간 ({otherActivityTarget.externalCooperationCreditMinutes}분)
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default OtherActivityTargetForm
