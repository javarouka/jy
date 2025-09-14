import { type FormEvent, useState } from 'react'
import type { ResearchLog } from '@prisma/client'
import useResearchLogSearch from '@renderer/pages/management/research-log/hook/useResearchLogSearch'
import EditResearchLogModal from '@renderer/pages/management/research-log/EditResearchLogModal'
import LoadingSpinner from '@renderer/component/basic/LoadingSpinner'
import FetchError from '@renderer/component/basic/FetchError'
import { PARTICIPATE_TYPE_OPTIONS } from '@shared/constants'
import { getTranslatedText } from '@renderer/helpers/translateConstants'
import useTableSortFilter from '@renderer/hook/useTableSortFilter'
import SortableTableHeader from '@renderer/component/table/SortableTableHeader'
import ResultTable from '@renderer/component/table/ResultTable'

const ResearchLogList = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [selectedLog, setSelectedLog] = useState<ResearchLog | null>(null)
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
  } = useResearchLogSearch()

  // Use the table sort and filter hook with column-specific filtering
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
    <div className="data-list">
      {/* Edit Modal */}
      <EditResearchLogModal
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
            <label htmlFor="search-pagerName">논문이름 (부분 검색)</label>
            <input
              type="text"
              id="search-pagerName"
              name="pagerName"
              value={searchFormData.pagerName}
              onChange={handleSearchChange}
              placeholder="논문이름 검색"
              className="w-full"
            />
          </div>

          <div className="form-group text-sm flex-1">
            <label htmlFor="search-journalName">학회지 (부분 검색)</label>
            <input
              type="text"
              id="search-journalName"
              name="journalName"
              value={searchFormData.journalName}
              onChange={handleSearchChange}
              placeholder="학회지 검색"
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
            {/* 저자구분 */}
            <div className="form-group flex text-sm mt-4">
              <div className="text-sm flex-1">
                <label htmlFor="search-participateType">저자구분</label>
                <select
                  id="search-participateType"
                  name="participateType"
                  value={searchFormData.participateType}
                  onChange={handleSearchChange}
                  className="w-full"
                >
                  <option value="">전체</option>
                  {PARTICIPATE_TYPE_OPTIONS.map((option) => (
                    <option key={option.id} value={option.id}>
                      {getTranslatedText(option)}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* 발간일 범위 검색 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="form-group text-sm">
                <label htmlFor="search-publishDateStart">발간일 시작</label>
                <input
                  type="date"
                  id="search-publishDateStart"
                  name="publishDateStart"
                  value={searchFormData.publishDateStart}
                  onChange={handleSearchChange}
                  className="w-full"
                />
              </div>

              <div className="form-group text-sm">
                <label htmlFor="search-publishDateEnd">발간일 종료</label>
                <input
                  type="date"
                  id="search-publishDateEnd"
                  name="publishDateEnd"
                  value={searchFormData.publishDateEnd}
                  onChange={handleSearchChange}
                  className="w-full"
                />
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
                column="pagerName"
                label="논문이름"
                sortKey="pagerName"
                getSortDirection={getSortDirection}
                requestSort={requestSort}
              />
              <SortableTableHeader
                column="journalName"
                label="학회지"
                sortKey="journalName"
                getSortDirection={getSortDirection}
                requestSort={requestSort}
              />
              <SortableTableHeader
                column="participateType"
                label="저자구분"
                sortKey="participateType"
                getSortDirection={getSortDirection}
                requestSort={requestSort}
              />
              <SortableTableHeader
                column="publishDate"
                label="발간일"
                sortKey="publishDate"
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
              <th className="py-2 px-4 border-b text-left">작업</th>
            </tr>
          </thead>
          <tbody>
            {sortedAndFilteredData.map((log: ResearchLog) => {
              // Find participate type text
              const participateType = PARTICIPATE_TYPE_OPTIONS.find(type => type.id === log.participateType);
              const participateTypeText = participateType ? getTranslatedText(participateType) : '';

              return (
                <tr key={log.id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">{log.pagerName}</td>
                  <td className="py-2 px-4 border-b">{log.journalName}</td>
                  <td className="py-2 px-4 border-b">{participateTypeText}</td>
                  <td className="py-2 px-4 border-b">{log.publishDate ? new Date(log.publishDate).toLocaleDateString() : '-'}</td>
                  <td className="py-2 px-4 border-b">{log.creditTime}분</td>
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            {/* 논문이름 필터 */}
            <div className="flex flex-col">
              <label htmlFor="filter-pagerName" className="mb-1 font-medium">논문이름:</label>
              <div className="flex">
                <input
                  id="filter-pagerName"
                  type="text"
                  value={getColumnFilterValue('pagerName')}
                  onChange={(e) => handleColumnFilterChange('pagerName', e.target.value)}
                  placeholder="논문이름 검색..."
                  className="flex-1 p-2 border border-gray-300 rounded-l"
                />
                {getColumnFilterValue('pagerName') && (
                  <button
                    onClick={() => clearColumnFilter('pagerName')}
                    className="px-2 py-1 bg-gray-200 text-gray-700 rounded-r hover:bg-gray-300"
                    title="필터 초기화"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            {/* 학회지 필터 */}
            <div className="flex flex-col">
              <label htmlFor="filter-journalName" className="mb-1 font-medium">학회지:</label>
              <div className="flex">
                <input
                  id="filter-journalName"
                  type="text"
                  value={getColumnFilterValue('journalName')}
                  onChange={(e) => handleColumnFilterChange('journalName', e.target.value)}
                  placeholder="학회지 검색..."
                  className="flex-1 p-2 border border-gray-300 rounded-l"
                />
                {getColumnFilterValue('journalName') && (
                  <button
                    onClick={() => clearColumnFilter('journalName')}
                    className="px-2 py-1 bg-gray-200 text-gray-700 rounded-r hover:bg-gray-300"
                    title="필터 초기화"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            {/* 저자구분 필터 */}
            <div className="flex flex-col">
              <label htmlFor="filter-participateType" className="mb-1 font-medium">저자구분:</label>
              <div className="flex">
                <select
                  id="filter-participateType"
                  value={getColumnFilterValue('participateType')}
                  onChange={(e) => handleColumnFilterChange('participateType', e.target.value)}
                  className="flex-1 p-2 border border-gray-300 rounded-l"
                >
                  <option value="">전체</option>
                  {PARTICIPATE_TYPE_OPTIONS.map((type) => (
                    <option key={type.id} value={type.id}>
                      {getTranslatedText(type)}
                    </option>
                  ))}
                </select>
                {getColumnFilterValue('participateType') && (
                  <button
                    onClick={() => clearColumnFilter('participateType')}
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

export default ResearchLogList
