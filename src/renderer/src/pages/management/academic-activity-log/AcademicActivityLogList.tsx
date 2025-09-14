import { type FormEvent, useState } from 'react'
import type { AcademicActivityLog } from '@prisma/client'
import useAcademicActivityLogSearch
  from '@renderer/pages/management/academic-activity-log/hook/useAcademicActivityLogSearch'
import EditAcademicActivityLogModal from '@renderer/pages/management/academic-activity-log/EditAcademicActivityLogModal'
import LoadingSpinner from '@renderer/component/basic/LoadingSpinner'
import FetchError from '@renderer/component/basic/FetchError'
import { ACT_OPTIONS, ACTIVITY_TYPE_OPTIONS, ORGANIZATION_OPTIONS } from '@shared/constants'
import { getTranslatedText, getTranslatedTextById } from '@renderer/helpers/translateConstants'
import useTableSortFilter from '@renderer/hook/useTableSortFilter'
import SortableTableHeader from '@renderer/component/table/SortableTableHeader'
import ResultTable from '@renderer/component/table/ResultTable'
import { format } from 'date-fns'
import { convertMinuteToReader } from '@renderer/helpers/Times'

const AcademicActivityLogList = () => {

  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [selectedLog, setSelectedLog] = useState<AcademicActivityLog | null>(null)
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
  } = useAcademicActivityLogSearch()

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
    if (isDetailedSearchExpanded) {
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
    <div className="data-list text-[0.8em]">
      {/* Edit Modal */}
      <EditAcademicActivityLogModal
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
          <div className="form-group flex-1">
            <label htmlFor="search-activityName">회의명 (부분 검색)</label>
            <input
              type="text"
              id="search-activityName"
              name="activityName"
              value={searchFormData.activityName}
              onChange={handleSearchChange}
              placeholder="회의명 검색"
              className="w-full"
            />
          </div>

          <div className="form-group flex-1">
            <label htmlFor="search-sessionName">발표명 (부분 검색)</label>
            <input
              type="text"
              id="search-sessionName"
              name="sessionName"
              value={searchFormData.sessionName}
              onChange={handleSearchChange}
              placeholder="발표명 검색"
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
            {/* 참석 발표 */}
            <div className="form-group flex text-sm mt-4">

              <div className="text-sm flex-1 mr-4">
                <label htmlFor="search-act">참석 발표</label>
                <select
                  id="search-act"
                  name="act"
                  value={searchFormData.act}
                  onChange={handleSearchChange}
                  className="w-full"
                >
                  <option value="">전체</option>
                  {ACT_OPTIONS.map((option) => (
                    <option key={option.id} value={option.id}>
                      {getTranslatedText(option)}
                    </option>
                  ))}
                </select>
              </div>

              {/* 회의 유형 */}
              <div className="text-sm flex-1 mr-4">
                <label htmlFor="search-activityType">회의 유형</label>
                <select
                  id="search-activityType"
                  name="activityType"
                  value={searchFormData.activityType}
                  onChange={handleSearchChange}
                  className="w-full"
                >
                  <option value="">전체</option>
                  {ACTIVITY_TYPE_OPTIONS.map((option) => (
                    <option key={option.id} value={option.id}>
                      {getTranslatedText(option)}
                    </option>
                  ))}
                </select>
              </div>

              {/* 주관기관 */}
              <div className="text-sm flex-1">
                <label htmlFor="search-organization">주관기관</label>
                <select
                  id="search-organization"
                  name="organization"
                  value={searchFormData.organization}
                  onChange={handleSearchChange}
                  className="w-full"
                >
                  <option value="">전체</option>
                  {ORGANIZATION_OPTIONS.map((option) => (
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

            {/* 활동일 범위 검색 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="form-group text-sm">
                <label htmlFor="search-activityDateStart">활동일 시작</label>
                <input
                  type="date"
                  id="search-activityDateStart"
                  name="activityDateStart"
                  value={searchFormData.activityDateStart}
                  onChange={handleSearchChange}
                  className="w-full"
                />
              </div>

              <div className="form-group text-sm">
                <label htmlFor="search-activityDateEnd">활동일 종료</label>
                <input
                  type="date"
                  id="search-activityDateEnd"
                  name="activityDateEnd"
                  value={searchFormData.activityDateEnd}
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

      {/* 결과 목록 */}
      <div>
        <ResultTable>
          <thead className="bg-gray-100">
            <tr>
              <SortableTableHeader
                column="activityName"
                label="회의명"
                sortKey="activityName"
                getSortDirection={getSortDirection}
                requestSort={requestSort}
              />
              <SortableTableHeader
                column="sessionName"
                label="발표명"
                sortKey="sessionName"
                getSortDirection={getSortDirection}
                requestSort={requestSort}
              />
              <SortableTableHeader
                column="act"
                label="참석 발표"
                sortKey="act"
                getSortDirection={getSortDirection}
                requestSort={requestSort}
              />
              <SortableTableHeader
                column="activityType"
                label="회의 유형"
                sortKey="activityType"
                getSortDirection={getSortDirection}
                requestSort={requestSort}
              />
              <SortableTableHeader
                column="organization"
                label="주관기관"
                sortKey="organization"
                getSortDirection={getSortDirection}
                requestSort={requestSort}
              />
              <SortableTableHeader
                column="activityDate"
                label="활동일"
                sortKey="activityDate"
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
            {sortedAndFilteredData.map((log) => {
              // Find translated values
              const actText = getTranslatedTextById(log.act, "common.base", log.act);
              const activityTypeText = getTranslatedTextById(log.activityType, "activity.type", log.activityType);
              const organizationText = getTranslatedTextById(log.organization, "organization", log.organization);
              const formattedActivityDate = log.activityDate ? format(new Date(log.activityDate), 'yyyy-MM-dd') : '-';

              return (
                <tr key={log.id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">{log.activityName}</td>
                  <td className="py-2 px-4 border-b">{log.sessionName}</td>
                  <td className="py-2 px-4 border-b">{actText}</td>
                  <td className="py-2 px-4 border-b">{activityTypeText}</td>
                  <td className="py-2 px-4 border-b">{organizationText}</td>
                  <td className="py-2 px-4 border-b">{formattedActivityDate}</td>
                  <td className="py-2 px-4 border-b">{convertMinuteToReader(log.creditTime)}</td>
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
            {/* 회의명 필터 */}
            <div className="flex flex-col">
              <label htmlFor="filter-activityName" className="mb-1 font-medium">회의명:</label>
              <div className="flex">
                <input
                  id="filter-activityName"
                  type="text"
                  value={getColumnFilterValue('activityName')}
                  onChange={(e) => handleColumnFilterChange('activityName', e.target.value)}
                  placeholder="회의명 검색..."
                  className="flex-1 p-2 border border-gray-300 rounded-l"
                />
                {getColumnFilterValue('activityName') && (
                  <button
                    onClick={() => clearColumnFilter('activityName')}
                    className="px-2 py-1 bg-gray-200 text-gray-700 rounded-r hover:bg-gray-300"
                    title="필터 초기화"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            {/* 발표명 필터 */}
            <div className="flex flex-col">
              <label htmlFor="filter-sessionName" className="mb-1 font-medium">발표명:</label>
              <div className="flex">
                <input
                  id="filter-sessionName"
                  type="text"
                  value={getColumnFilterValue('sessionName')}
                  onChange={(e) => handleColumnFilterChange('sessionName', e.target.value)}
                  placeholder="발표명 검색..."
                  className="flex-1 p-2 border border-gray-300 rounded-l"
                />
                {getColumnFilterValue('sessionName') && (
                  <button
                    onClick={() => clearColumnFilter('sessionName')}
                    className="px-2 py-1 bg-gray-200 text-gray-700 rounded-r hover:bg-gray-300"
                    title="필터 초기화"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            {/* 참석 발표 필터 */}
            <div className="flex flex-col">
              <label htmlFor="filter-act" className="mb-1 font-medium">참석 발표:</label>
              <div className="flex">
                <select
                  id="filter-act"
                  value={getColumnFilterValue('act')}
                  onChange={(e) => handleColumnFilterChange('act', e.target.value)}
                  className="flex-1 p-2 border border-gray-300 rounded-l"
                >
                  <option value="">전체</option>
                  {ACT_OPTIONS.map((option) => (
                    <option key={option.id} value={option.id}>
                      {getTranslatedText(option)}
                    </option>
                  ))}
                </select>
                {getColumnFilterValue('act') && (
                  <button
                    onClick={() => clearColumnFilter('act')}
                    className="px-2 py-1 bg-gray-200 text-gray-700 rounded-r hover:bg-gray-300"
                    title="필터 초기화"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            {/* 회의 유형 필터 */}
            <div className="flex flex-col">
              <label htmlFor="filter-activityType" className="mb-1 font-medium">회의 유형:</label>
              <div className="flex">
                <select
                  id="filter-activityType"
                  value={getColumnFilterValue('activityType')}
                  onChange={(e) => handleColumnFilterChange('activityType', e.target.value)}
                  className="flex-1 p-2 border border-gray-300 rounded-l"
                >
                  <option value="">전체</option>
                  {ACTIVITY_TYPE_OPTIONS.map((option) => (
                    <option key={option.id} value={option.id}>
                      {getTranslatedText(option)}
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

            {/* 주관기관 필터 */}
            <div className="flex flex-col">
              <label htmlFor="filter-organization" className="mb-1 font-medium">주관기관:</label>
              <div className="flex">
                <select
                  id="filter-organization"
                  value={getColumnFilterValue('organization')}
                  onChange={(e) => handleColumnFilterChange('organization', e.target.value)}
                  className="flex-1 p-2 border border-gray-300 rounded-l"
                >
                  <option value="">전체</option>
                  {ORGANIZATION_OPTIONS.map((option) => (
                    <option key={option.id} value={option.id}>
                      {getTranslatedText(option)}
                    </option>
                  ))}
                </select>
                {getColumnFilterValue('organization') && (
                  <button
                    onClick={() => clearColumnFilter('organization')}
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

        {sortedAndFilteredData.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            검색 결과가 없습니다.
          </div>
        )}
      </div>
    </div>
  );
};

export default AcademicActivityLogList
