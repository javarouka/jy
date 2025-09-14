import useIndividualTherapyLogSearch from './hook/useIndividualTherapyLogSearch'
import type { FormEvent } from 'react'
import { useState } from 'react'
import EditIndividualTherapyLogModal from './EditIndividualTherapyLogModal'
import type { IndividualTherapyLog } from '@prisma/client'
import LoadingSpinner from '@renderer/component/basic/LoadingSpinner'
import FetchError from '@renderer/component/basic/FetchError'
import useTableSortFilter from '@renderer/hook/useTableSortFilter'
import SortableTableHeader from '@renderer/component/table/SortableTableHeader'
import ResultTable from '@renderer/component/table/ResultTable'

const IndividualTherapyLogList = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [selectedLog, setSelectedLog] = useState<IndividualTherapyLog | null>(null)
  const [isDetailedSearchExpanded, setIsDetailedSearchExpanded] = useState(false)

  // No view mode hook needed anymore as we only use table view

  const {
    data: {
      individualTherapyLog,
      isLoading,
      isError
    },
    searchFormData,
    handleSearchChange,
    applySearch: applySearchInternal,
    clearQueryParams,
    deleteLog,
    updateLog
  } = useIndividualTherapyLogSearch()

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
  } = useTableSortFilter(individualTherapyLog)

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
    const logToEdit = individualTherapyLog.find(log => log.id === id)
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

  // Toggle detailed search section and reset hidden form fields when collapsing
  const toggleDetailedSearch = () => {
    if (isDetailedSearchExpanded) {
      // Reset hidden form fields when collapsing
      const resetData = {
        ...searchFormData,
        sessionCountMin: '',
        sessionCountMax: '',
        prepareTimeMin: '',
        prepareTimeMax: '',
        sessionTimeMin: '',
        sessionTimeMax: '',
        supervisionTimeMin: '',
        supervisionTimeMax: '',
        startDate: '',
        endDate: '',
        researchDateStart: '',
        researchDateEnd: ''
      }

      // Update form data with reset values
      Object.keys(resetData).forEach(key => {
        const element = document.getElementById(`search-${key}`) as HTMLInputElement
        if (element) {
          element.value = resetData[key]
        }
      })

      // Update search form data
      Object.entries(resetData).forEach(([key, value]) => {
        handleSearchChange({
          target: {
            name: key,
            value
          }
        } as any)
      })
    }

    // Toggle expanded state
    setIsDetailedSearchExpanded(!isDetailedSearchExpanded)
  }

  if (isLoading) return <LoadingSpinner />
  if (isError) return <FetchError />

  return (
    <div className="data-list">
      {/* Edit Modal */}
      <EditIndividualTherapyLogModal
        isOpen={isEditModalOpen}
        onClose={handleCloseModal}
        log={selectedLog}
        onSave={handleSaveEdit}
      />

      {/* 검색 폼 */}
      <div className="mb-6 p-4 border border-gray-200 rounded-md">
        <h3 className="text-lg font-medium mb-4">검색</h3>
        {/* 내담자명, 나이, 성별, 치료자 유형을 한줄에 표시 */}
        <div className="flex flex-wrap items-end gap-4 w-full">
          <div className="form-group text-sm flex-1">
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
              className="w-[100px] min-w-[100px]"
            />
          </div>

          <div className="form-group text-sm">
            <label htmlFor="search-gender">성별</label>
            <select
              id="search-gender"
              name="gender"
              value={searchFormData.gender}
              onChange={handleSearchChange}
              className="w-[100px] min-w-[100px]"
            >
              <option value="">전체</option>
              <option value="male">남성</option>
              <option value="female">여성</option>
            </select>
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
            {/* 회기 수 범위 검색 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="form-group text-sm">
                <label htmlFor="search-sessionCountMin">회기 수 (최소)</label>
                <input
                  type="number"
                  id="search-sessionCountMin"
                  name="sessionCountMin"
                  value={searchFormData.sessionCountMin}
                  onChange={handleSearchChange}
                  placeholder="최소 회기 수"
                  className="w-full"
                />
              </div>

              <div className="form-group text-sm">
                <label htmlFor="search-sessionCountMax">회기 수 (최대)</label>
                <input
                  type="number"
                  id="search-sessionCountMax"
                  name="sessionCountMax"
                  value={searchFormData.sessionCountMax}
                  onChange={handleSearchChange}
                  placeholder="최대 회기 수"
                  className="w-full"
                />
              </div>
            </div>

            {/* 준비 시간 범위 검색 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="form-group text-sm">
                <label htmlFor="search-prepareTimeMin">준비 시간 (최소, 분)</label>
                <input
                  type="number"
                  id="search-prepareTimeMin"
                  name="prepareTimeMin"
                  value={searchFormData.prepareTimeMin}
                  onChange={handleSearchChange}
                  placeholder="최소 준비 시간"
                  className="w-full"
                />
              </div>

              <div className="form-group text-sm">
                <label htmlFor="search-prepareTimeMax">준비 시간 (최대, 분)</label>
                <input
                  type="number"
                  id="search-prepareTimeMax"
                  name="prepareTimeMax"
                  value={searchFormData.prepareTimeMax}
                  onChange={handleSearchChange}
                  placeholder="최대 준비 시간"
                  className="w-full"
                />
              </div>
            </div>

            {/* 상담 시간 범위 검색 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="form-group text-sm">
                <label htmlFor="search-sessionTimeMin">상담 시간 (최소, 분)</label>
                <input
                  type="number"
                  id="search-sessionTimeMin"
                  name="sessionTimeMin"
                  value={searchFormData.sessionTimeMin}
                  onChange={handleSearchChange}
                  placeholder="최소 상담 시간"
                  className="w-full"
                />
              </div>

              <div className="form-group text-sm">
                <label htmlFor="search-sessionTimeMax">상담 시간 (최대, 분)</label>
                <input
                  type="number"
                  id="search-sessionTimeMax"
                  name="sessionTimeMax"
                  value={searchFormData.sessionTimeMax}
                  onChange={handleSearchChange}
                  placeholder="최대 상담 시간"
                  className="w-full"
                />
              </div>
            </div>

            {/* 지도감독 시간 범위 검색 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="form-group text-sm">
                <label htmlFor="search-supervisionTimeMin">지도감독 시간 (최소, 분)</label>
                <input
                  type="number"
                  id="search-supervisionTimeMin"
                  name="supervisionTimeMin"
                  value={searchFormData.supervisionTimeMin}
                  onChange={handleSearchChange}
                  placeholder="최소 지도감독 시간"
                  className="w-full"
                />
              </div>

              <div className="form-group text-sm">
                <label htmlFor="search-supervisionTimeMax">지도감독 시간 (최대, 분)</label>
                <input
                  type="number"
                  id="search-supervisionTimeMax"
                  name="supervisionTimeMax"
                  value={searchFormData.supervisionTimeMax}
                  onChange={handleSearchChange}
                  placeholder="최대 지도감독 시간"
                  className="w-full"
                />
              </div>
            </div>

            {/* 치료 기간 범위 검색 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="form-group text-sm">
                <label htmlFor="search-startDate">시작일</label>
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
                <label htmlFor="search-endDate">종료일</label>
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

            {/* 검사일 범위 검색 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="form-group text-sm">
                <label htmlFor="search-researchDateStart">검사일 시작</label>
                <input
                  type="date"
                  id="search-researchDateStart"
                  name="researchDateStart"
                  value={searchFormData.researchDateStart}
                  onChange={handleSearchChange}
                  className="w-full"
                />
              </div>

              <div className="form-group text-sm">
                <label htmlFor="search-researchDateEnd">검사일 종료</label>
                <input
                  type="date"
                  id="search-researchDateEnd"
                  name="researchDateEnd"
                  value={searchFormData.researchDateEnd}
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
                column="clientName"
                label="내담자명"
                sortKey="clientName"
                getSortDirection={getSortDirection}
                requestSort={requestSort}
              />
              <SortableTableHeader
                column="age"
                label="나이"
                sortKey="age"
                getSortDirection={getSortDirection}
                requestSort={requestSort}
              />
              <SortableTableHeader
                column="gender"
                label="성별"
                sortKey="gender"
                getSortDirection={getSortDirection}
                requestSort={requestSort}
              />
              <SortableTableHeader
                column="sessionCount"
                label="회기 수"
                sortKey="sessionCount"
                getSortDirection={getSortDirection}
                requestSort={requestSort}
              />
              <SortableTableHeader
                column="prepareTime"
                label="준비 시간"
                sortKey="prepareTime"
                getSortDirection={getSortDirection}
                requestSort={requestSort}
              />
              <SortableTableHeader
                column="sessionTime"
                label="상담 시간"
                sortKey="sessionTime"
                getSortDirection={getSortDirection}
                requestSort={requestSort}
              />
              <SortableTableHeader
                column="supervisionTime"
                label="지도감독 시간"
                sortKey="supervisionTime"
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
            {sortedAndFilteredData.map((log) => (
              <tr key={log.id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{log.clientName}</td>
                <td className="py-2 px-4 border-b">{log.age}</td>
                <td className="py-2 px-4 border-b">{log.gender === 'male' ? '남성' : '여성'}</td>
                <td className="py-2 px-4 border-b">{log.sessionCount}</td>
                <td className="py-2 px-4 border-b">{log.prepareTime}분</td>
                <td className="py-2 px-4 border-b">{log.sessionTime}분</td>
                <td className="py-2 px-4 border-b">{log.supervisionTime}분</td>
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
            ))}
          </tbody>
        </ResultTable>

        {/* 결과내 검색 */}
        <div className="mt-4 p-3 bg-gray-50 border border-gray-200 rounded">
          <h3 className="text-md font-medium mb-3">결과내 검색</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            {/* 내담자명 필터 */}
            <div className="flex flex-col">
              <label htmlFor="filter-clientName" className="mb-1 font-medium">내담자명:</label>
              <div className="flex">
                <input
                  id="filter-clientName"
                  type="text"
                  value={getColumnFilterValue('clientName')}
                  onChange={(e) => handleColumnFilterChange('clientName', e.target.value)}
                  placeholder="내담자명 검색..."
                  className="flex-1 p-2 border border-gray-300 rounded-l"
                />
                {getColumnFilterValue('clientName') && (
                  <button
                    onClick={() => clearColumnFilter('clientName')}
                    className="px-2 py-1 bg-gray-200 text-gray-700 rounded-r hover:bg-gray-300"
                    title="필터 초기화"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            {/* 성별 필터 */}
            <div className="flex flex-col">
              <label htmlFor="filter-gender" className="mb-1 font-medium">성별:</label>
              <div className="flex">
                <select
                  id="filter-gender"
                  value={getColumnFilterValue('gender')}
                  onChange={(e) => handleColumnFilterChange('gender', e.target.value)}
                  className="flex-1 p-2 border border-gray-300 rounded-l"
                >
                  <option value="">전체</option>
                  <option value="male">남성</option>
                  <option value="female">여성</option>
                </select>
                {getColumnFilterValue('gender') && (
                  <button
                    onClick={() => clearColumnFilter('gender')}
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
  );
};

export default IndividualTherapyLogList
