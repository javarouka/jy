import AssessmentLogCard from '@renderer/pages/management/assessment-log/AssessmentLogCard'
import { RESEARCH_TYPE_OPTIONS } from '@shared/types'
import useAssessmentLogSearch from './hook/useAssessmentLogSearch'
import { FormEvent } from 'react'

interface AssessmentLogListProps {
  onEdit?: (log: any) => void;
}

const AssessmentLogList = (props: AssessmentLogListProps) => {
  const { onEdit: parentOnEdit } = props;
  const {
    data: {
      assessmentLog,
      isLoading,
      isError
    },
    searchFormData,
    handleSearchChange,
    applySearch: applySearchInternal,
    clearQueryParams,
    deleteLog,
    updateLog
  } = useAssessmentLogSearch()

  const handleEdit = parentOnEdit || ((log: any) => {
    // useAssessmentLogSearch의 updateLog는 실제로는 수정 폼을 위한 것이 아니라
    // 부모 컴포넌트의 onEdit를 사용하도록 함
    console.warn('No parent onEdit provided, edit functionality disabled');
  });

  // Apply search internally
  const applySearch = (ev: FormEvent) => {
    ev.preventDefault()
    applySearchInternal()
  }

  // Clear search internally
  const clearSearch = (ev: FormEvent) => {
    ev.preventDefault()
    clearQueryParams()
  }

  if (isLoading) return <div>로딩 중...</div>
  if (isError) return <div>에러가 발생했습니다.</div>

  return (
    <div>
      {/* 검색 폼 */}
      <div className="mb-6 p-4 border rounded-md bg-gray-50">
        <h3 className="text-lg font-medium mb-4">검색</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="form-group text-sm">
            <label htmlFor="search-clientName">내담자명</label>
            <input
              type="text"
              id="search-clientName"
              name="clientName"
              value={searchFormData.clientName}
              onChange={handleSearchChange}
              placeholder="내담자명 검색"
              className="w-full"
            />
          </div>

          <div className="form-group text-sm">
            <label htmlFor="search-age">나이</label>
            <input
              type="number"
              id="search-age"
              name="age"
              value={searchFormData.age}
              onChange={handleSearchChange}
              placeholder="나이 검색"
              className="w-full"
            />
          </div>

          <div className="form-group text-sm">
            <label htmlFor="search-gender">성별</label>
            <select
              id="search-gender"
              name="gender"
              value={searchFormData.gender}
              onChange={handleSearchChange}
              className="w-full"
            >
              <option value="">전체</option>
              <option value="male">남성</option>
              <option value="female">여성</option>
            </select>
          </div>

          <div className="form-group text-sm">
            <label htmlFor="search-dx">진단명(Dx)</label>
            <input
              type="text"
              id="search-dx"
              name="dx"
              value={searchFormData.dx}
              onChange={handleSearchChange}
              placeholder="진단명 검색"
              className="w-full"
            />
          </div>

          <div className="form-group text-sm">
            <label htmlFor="search-researchType">검사 종류</label>
            <select
              id="search-researchType"
              name="researchType"
              value={searchFormData.researchType}
              onChange={handleSearchChange}
              className="w-full"
            >
              <option value="">전체</option>
              {RESEARCH_TYPE_OPTIONS.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="form-group text-sm">
            <label htmlFor="search-startDate">검사일 시작</label>
            <input
              type="date"
              id="search-startDate"
              name="startDate"
              value={searchFormData.startDate}
              onChange={handleSearchChange}
              className="w-full"
            />
          </div>

          <div className="form-group text-sm">
            <label htmlFor="search-endDate">검사일 종료</label>
            <input
              type="date"
              id="search-endDate"
              name="endDate"
              value={searchFormData.endDate}
              onChange={handleSearchChange}
              className="w-full"
            />
          </div>
        </div>

        <div className="flex justify-end space-x-2 mt-4">
          <button
            type="button"
            onClick={clearSearch}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
          >
            초기화
          </button>
          <button
            type="button"
            onClick={applySearch}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            검색
          </button>
        </div>
      </div>

      {/* 결과 목록 */}
      <div className="p-4 sm:p-6">
        {/* 기본: 1열 (모바일) */}
        {/* md (768px) 이상: 2열 */}
        {/* xl (1280px) 이상: 3열 */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {assessmentLog && assessmentLog.length > 0 ? (
            assessmentLog.map((log) => (
              <AssessmentLogCard
                key={log.id}
                log={log}
                onDelete={deleteLog}
                onEdit={handleEdit}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-8 text-gray-500">
              등록된 심리평가 기록이 없습니다.
              <br />
              위 폼을 통해 새로운 기록을 추가해보세요.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AssessmentLogList
