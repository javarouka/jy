import useTrainingYearsMutation from '@renderer/pages/config/hook/useTrainingYearsMutation'

function TrainingYearsForm() {
  const {
    forms: {
      formData,
      editMode,
      trainingYears,
      isLoading
    },
    handleChange,
    handleSubmit,
    handleEdit,
    handleDelete,
    handleCancel
  } = useTrainingYearsMutation()

  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="w-full md:w-1/3">
        <div className="m-2 p-2 border border-gray-200 shadow-md font-sans">
          <h3 className="text-left mb-4">{editMode ? '수련 연차 수정' : '수련 연차 추가'}</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="mb-2 text-sm">
              <label htmlFor="name" className="block font-bold">연차 이름</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="예: 1년차"
                className="w-full p-1 border border-gray-300 rounded box-border text-base"
              />
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
              <label htmlFor="targetHours" className="block font-bold">목표 시간</label>
              <input
                type="number"
                id="targetHours"
                name="targetHours"
                value={formData.targetHours}
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
                {editMode ? '수정' : '추가'}
              </button>
              {editMode && (
                <button
                  type="button"
                  onClick={handleCancel}
                  className="flex-1 py-2 px-4 rounded bg-gray-500 text-sm font-bold text-white transition-colors duration-200 hover:bg-gray-600 cursor-pointer"
                >
                  취소
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      <div className="w-full md:w-2/3">
        <div className="m-2 p-2 border border-gray-200 shadow-md font-sans">
          <h3 className="text-left mb-4">수련 연차 목록</h3>
          {isLoading ? (
            <p>로딩 중...</p>
          ) : trainingYears.length === 0 ? (
            <p>등록된 수련 연차가 없습니다.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">이름</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">시작일</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">종료일</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">목표 시간</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">관리</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {trainingYears.map((year) => (
                    <tr key={year.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{year.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(year.startDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(year.endDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{year.targetHours}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => handleEdit(year)}
                          className="text-indigo-600 hover:text-indigo-900 mr-2"
                        >
                          수정
                        </button>
                        <button
                          onClick={() => handleDelete(year.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          삭제
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default TrainingYearsForm
