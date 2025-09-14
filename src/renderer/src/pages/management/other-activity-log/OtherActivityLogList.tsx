import { type FormEvent, useState } from 'react'
import type { OtherActivityLog } from '@prisma/client'
import useOtherActivityLogSearch from '@renderer/pages/management/other-activity-log/hook/useOtherActivityLogSearch'
import OtherActivityLogCard from '@renderer/pages/management/other-activity-log/OtherActivityLogCard'
import EditOtherActivityLogModal from '@renderer/pages/management/other-activity-log/EditOtherActivityLogModal'
import LoadingSpinner from '@renderer/component/basic/LoadingSpinner'
import FetchError from '@renderer/component/basic/FetchError'
import { OTHER_ACTIVITY_TYPE_OPTIONS } from '@shared/constants'
import { getTranslatedText } from '@renderer/helpers/translateConstants'
import useViewMode from '@renderer/hook/useViewMode'

const OtherActivityLogList = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [selectedLog, setSelectedLog] = useState<OtherActivityLog | null>(null)
  const [isDetailedSearchExpanded, setIsDetailedSearchExpanded] = useState(false)

  // Use the view mode hook with a unique key for this component
  const { viewMode, toggleViewMode } = useViewMode('other-activity-log')

  const {
    data: {
      log,
      isLoading,
      isError
    },
    searchFormData,
    handleSearchChange,
    applySearch: applySearchInternal,
    clearQueryParams,
    deleteLog,
    updateLog
  } = useOtherActivityLogSearch()

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

  // Handle opening the edit modal
  const handleEditClick = (id: number) => {
    const logToEdit = log.find(log => log.id === id)
    if (logToEdit) {
      setSelectedLog(logToEdit)
      setIsEditModalOpen(true)
    }
  }

  // Handle closing the edit modal
  const handleCloseModal = () => {
    setIsEditModalOpen(false)
    setSelectedLog(null)
  }

  // Handle saving the edited log
  const handleSaveEdit = (id: number, data: any) => {
    updateLog(id, data)
    setIsEditModalOpen(false)
    setSelectedLog(null)
  }

  // Toggle detailed search section
  const toggleDetailedSearch = () => {
    setIsDetailedSearchExpanded(!isDetailedSearchExpanded)
  }

  if (isLoading) return <LoadingSpinner />
  if (isError) return <FetchError />

  return (
    <div>
      {/* Edit Modal */}
      <EditOtherActivityLogModal
        isOpen={isEditModalOpen}
        onClose={handleCloseModal}
        log={selectedLog}
        onSave={handleSaveEdit}
      />

      {/* 검색 폼 */}
      <div className="mb-6 p-4 border border-gray-200 rounded-md">
        <h3 className="text-lg font-medium mb-4">검색</h3>
        {/* 기본 검색 필드 */}
        <div className="flex flex-wrap items-end gap-4 w-full">
          <div className="form-group text-sm flex-1">
            <label htmlFor="search-activitySummary">활동명 (부분 검색)</label>
            <input
              type="text"
              id="search-activitySummary"
              name="activitySummary"
              value={searchFormData.activitySummary}
              onChange={handleSearchChange}
              placeholder="활동명 검색"
              className="w-full"
            />
          </div>
        </div>

        {/* 상세검색 버튼 */}
        <div className="mt-4">
          <button
            type="button"
            onClick={toggleDetailedSearch}
            className="flex w-full items-center px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
          >
            <span>상세 검색 펼치기/접기</span>
            <span className="ml-1">{isDetailedSearchExpanded ? '▲' : '▼'}</span>
          </button>
        </div>

        {/* 상세 검색 영역 - 조건부 렌더링 */}
        {isDetailedSearchExpanded && (
          <div className="mt-4">
            {/* 활동유형 */}
            <div className="form-group flex text-sm mt-4">
              <div className="text-sm flex-1">
                <label htmlFor="search-activityType">활동유형</label>
                <select
                  id="search-activityType"
                  name="activityType"
                  value={searchFormData.activityType}
                  onChange={handleSearchChange}
                  className="w-full"
                >
                  <option value="">전체</option>
                  {OTHER_ACTIVITY_TYPE_OPTIONS.map((option) => (
                    <option key={option.id} value={option.id}>
                      {getTranslatedText(option)}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* 인정 시간 범위 검색 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="form-group text-sm">
                <label htmlFor="search-creditTimeMin">인정시간 (최소, 분)</label>
                <input
                  type="number"
                  id="search-creditTimeMin"
                  name="creditTimeMin"
                  value={searchFormData.creditTimeMin}
                  onChange={handleSearchChange}
                  placeholder="최소 인정 시간"
                  className="w-full"
                />
              </div>

              <div className="form-group text-sm">
                <label htmlFor="search-creditTimeMax">인정시간 (최대, 분)</label>
                <input
                  type="number"
                  id="search-creditTimeMax"
                  name="creditTimeMax"
                  value={searchFormData.creditTimeMax}
                  onChange={handleSearchChange}
                  placeholder="최대 인정 시간"
                  className="w-full"
                />
              </div>
            </div>

            {/* 시작일 범위 검색 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="form-group text-sm">
                <label htmlFor="search-startDateStart">시작일 시작</label>
                <input
                  type="date"
                  id="search-startDateStart"
                  name="startDateStart"
                  value={searchFormData.startDateStart}
                  onChange={handleSearchChange}
                  className="w-full"
                />
              </div>

              <div className="form-group text-sm">
                <label htmlFor="search-startDateEnd">시작일 종료</label>
                <input
                  type="date"
                  id="search-startDateEnd"
                  name="startDateEnd"
                  value={searchFormData.startDateEnd}
                  onChange={handleSearchChange}
                  className="w-full"
                />
              </div>
            </div>

            {/* 종료일 범위 검색 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="form-group text-sm">
                <label htmlFor="search-endDateStart">종료일 시작</label>
                <input
                  type="date"
                  id="search-endDateStart"
                  name="endDateStart"
                  value={searchFormData.endDateStart}
                  onChange={handleSearchChange}
                  className="w-full"
                />
              </div>

              <div className="form-group text-sm">
                <label htmlFor="search-endDateEnd">종료일 종료</label>
                <input
                  type="date"
                  id="search-endDateEnd"
                  name="endDateEnd"
                  value={searchFormData.endDateEnd}
                  onChange={handleSearchChange}
                  className="w-full"
                />
              </div>
            </div>
          </div>
        )}

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

      {/* 뷰 모드 전환 버튼 */}
      <div className="mb-4 flex justify-end">
        <button
          onClick={toggleViewMode}
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 flex items-center"
        >
          {viewMode === 'table' ? (
            <>
              <span className="mr-2">카드 뷰로 보기</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M4 11H2v3h2v-3zm5-4H7v7h2V7zm5-5h-2v12h2V2zm-2-1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1h-2zM6 7a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1H6zm-5 4a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1H1z"/>
              </svg>
            </>
          ) : (
            <>
              <span className="mr-2">테이블 뷰로 보기</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm15 2h-4v3h4V4zm0 4h-4v3h4V8zm0 4h-4v3h3a1 1 0 0 0 1-1v-2zm-5 3v-3H6v3h4zm-5 0v-3H1v2a1 1 0 0 0 1 1h3zm-4-4h4V8H1v3zm0-4h4V4H1v3zm5-3v3h4V4H6zm4 4H6v3h4V8z"/>
              </svg>
            </>
          )}
        </button>
      </div>

      {/* 결과 목록 */}
      <div>
        {viewMode === 'card' ? (
          // 카드 뷰
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {log.map((log: OtherActivityLog) => (
              <OtherActivityLogCard
                key={log.id}
                log={log}
                onDelete={deleteLog}
                onEdit={handleEditClick}
              />
            ))}
          </div>
        ) : (
          // 테이블 뷰
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-2 px-4 border-b text-left">활동명</th>
                  <th className="py-2 px-4 border-b text-left">활동유형</th>
                  <th className="py-2 px-4 border-b text-left">인정시간</th>
                  <th className="py-2 px-4 border-b text-left">시작일</th>
                  <th className="py-2 px-4 border-b text-left">종료일</th>
                  <th className="py-2 px-4 border-b text-left">작업</th>
                </tr>
              </thead>
              <tbody>
                {log.map((log: OtherActivityLog) => {
                  // Find activity type text
                  const activityType = OTHER_ACTIVITY_TYPE_OPTIONS.find(type => type.id === log.activityType);
                  const activityTypeText = activityType ? getTranslatedText(activityType) : '';

                  return (
                    <tr key={log.id} className="hover:bg-gray-50">
                      <td className="py-2 px-4 border-b">{log.activitySummary}</td>
                      <td className="py-2 px-4 border-b">{activityTypeText}</td>
                      <td className="py-2 px-4 border-b">{log.creditTime}분</td>
                      <td className="py-2 px-4 border-b">{log.startDate ? new Date(log.startDate).toLocaleDateString() : '-'}</td>
                      <td className="py-2 px-4 border-b">{log.endDate ? new Date(log.endDate).toLocaleDateString() : '-'}</td>
                      <td className="py-2 px-4 border-b">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEditClick(log.id)}
                            className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-xs"
                          >
                            수정
                          </button>
                          <button
                            onClick={() => deleteLog(log.id)}
                            className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-xs"
                          >
                            삭제
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {log.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            검색 결과가 없습니다.
          </div>
        )}
      </div>
    </div>
  )
}

export default OtherActivityLogList
