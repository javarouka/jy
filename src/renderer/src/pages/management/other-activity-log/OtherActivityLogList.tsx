import { type FormEvent, useState } from 'react'
import type { OtherActivityLog } from '@prisma/client'
import useOtherActivityLogSearch from '@renderer/pages/management/other-activity-log/hook/useOtherActivityLogSearch'
import EditOtherActivityLogModal from '@renderer/pages/management/other-activity-log/EditOtherActivityLogModal'
import LoadingSpinner from '@renderer/component/basic/LoadingSpinner'
import FetchError from '@renderer/component/basic/FetchError'
import { OTHER_ACTIVITY_TYPE_OPTIONS } from '@shared/constants'
import { getTranslatedText } from '@renderer/helpers/translateConstants'
import useTableSortFilter from '@renderer/hook/useTableSortFilter'
import SortableTableHeader from '@renderer/component/table/SortableTableHeader'
import ResultTable from '@renderer/component/table/ResultTable'

const OtherActivityLogList = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [selectedLog, setSelectedLog] = useState<OtherActivityLog | null>(null)
  const [isDetailedSearchExpanded, setIsDetailedSearchExpanded] = useState(false)

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

  const {
    sortedAndFilteredData,
    requestSort,
    getSortDirection,
    columnFilters,
    handleColumnFilterChange,
    clearColumnFilter,
    clearAllFilters,
    getColumnFilterValue
  } = useTableSortFilter(log)

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

  const toggleDetailedSearch = () => {
    setIsDetailedSearchExpanded(!isDetailedSearchExpanded)
  }

  if (isLoading) return <LoadingSpinner />
  if (isError) return <FetchError />

  return (
    <div className="data-list text-[0.8em]">
      {/* Edit Modal */}
      <EditOtherActivityLogModal
        isOpen={isEditModalOpen}
        onClose={handleCloseModal}
        log={selectedLog}
        onSave={handleSaveEdit}
      />

      {/* 검색 폼 */}
      <div className="mb-6 p-4 border border-gray-200">
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

      <div>
        <ResultTable>
          <thead className="bg-gray-100">
            <tr>
              <SortableTableHeader
                column="activitySummary"
                label="활동명"
                sortKey="activitySummary"
                getSortDirection={getSortDirection}
                requestSort={requestSort}
              />
              <SortableTableHeader
                column="activityType"
                label="활동유형"
                sortKey="activityType"
                getSortDirection={getSortDirection}
                requestSort={requestSort}
              />
              <SortableTableHeader
                column="creditTime"
                label="인정시간"
                sortKey="creditTime"
                getSortDirection={getSortDirection}
                requestSort={requestSort}
              />
              <SortableTableHeader
                column="startDate"
                label="시작일"
                sortKey="startDate"
                getSortDirection={getSortDirection}
                requestSort={requestSort}
              />
              <SortableTableHeader
                column="endDate"
                label="종료일"
                sortKey="endDate"
                getSortDirection={getSortDirection}
                requestSort={requestSort}
              />
              <th className="py-2 px-4 border-b text-left">작업</th>
            </tr>
          </thead>
          <tbody>
            {sortedAndFilteredData.map((log: OtherActivityLog) => {
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
        </ResultTable>

        {/* 결과내 검색 */}
        <div className="mt-4 p-3 bg-gray-50 border border-gray-200 rounded">
          <h3 className="text-md font-medium mb-3">결과내 검색</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {/* 활동명 필터 */}
            <div className="flex flex-col">
              <label htmlFor="filter-activitySummary" className="mb-1 font-medium">활동명:</label>
              <div className="flex">
                <input
                  id="filter-activitySummary"
                  type="text"
                  value={getColumnFilterValue('activitySummary')}
                  onChange={(e) => handleColumnFilterChange('activitySummary', e.target.value)}
                  placeholder="활동명 검색..."
                  className="flex-1 p-2 border border-gray-300 rounded-l"
                />
                {getColumnFilterValue('activitySummary') && (
                  <button
                    onClick={() => clearColumnFilter('activitySummary')}
                    className="px-2 py-1 bg-gray-200 text-gray-700 rounded-r hover:bg-gray-300"
                    title="필터 초기화"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            {/* 활동유형 필터 */}
            <div className="flex flex-col">
              <label htmlFor="filter-activityType" className="mb-1 font-medium">활동유형:</label>
              <div className="flex">
                <select
                  id="filter-activityType"
                  value={getColumnFilterValue('activityType')}
                  onChange={(e) => handleColumnFilterChange('activityType', e.target.value)}
                  className="flex-1 p-2 border border-gray-300 rounded-l"
                >
                  <option value="">전체</option>
                  {OTHER_ACTIVITY_TYPE_OPTIONS.map((type) => (
                    <option key={type.id} value={type.id}>
                      {getTranslatedText(type)}
                    </option>
                  ))}
                </select>
                {getColumnFilterValue('activityType') && (
                  <button
                    onClick={() => clearColumnFilter('activityType')}
                    className="px-2 py-1 bg-gray-200 text-gray-700 rounded-r hover:bg-gray-300"
                    title="필터 초기화"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* 필터 초기화 버튼 */}
          {Object.keys(columnFilters).length > 0 && (
            <div className="flex justify-end">
              <button
                onClick={clearAllFilters}
                className="px-3 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
              >
                모든 필터 초기화
              </button>
            </div>
          )}

          <p className="mt-2 text-sm text-gray-500">
            * 각 컬럼별로 필터를 적용할 수 있습니다. 필터는 대소문자를 구분하지 않습니다.
          </p>
        </div>
      </div>

      {sortedAndFilteredData.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          검색 결과가 없습니다.
        </div>
      )}
    </div>
  )
}

export default OtherActivityLogList
