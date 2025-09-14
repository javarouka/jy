import type { TypeAssessmentFormData } from '@shared/types'
import useAssessmentLogSearch from './hook/useAssessmentLogSearch'
import type { FormEvent } from 'react'
import { useState } from 'react'
import EditAssessmentLogModal from './EditAssessmentLogModal'
import type { AssessmentLog } from '@prisma/client'
import LoadingSpinner from '@renderer/component/basic/LoadingSpinner'
import FetchError from '@renderer/component/basic/FetchError'
import { RESEARCH_TYPE_OPTIONS } from '@shared/constants'
import { getTranslatedText } from '@renderer/helpers/translateConstants'
import useTableSortFilter from '@renderer/hook/useTableSortFilter'
import SortableTableHeader from '@renderer/component/table/SortableTableHeader'
import ResultTable from '@renderer/component/table/ResultTable'

const AssessmentLogList = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [selectedLog, setSelectedLog] = useState<AssessmentLog | null>(null)

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
  } = useTableSortFilter(assessmentLog)

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
    const logToEdit = assessmentLog.find(log => log.id === id)
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
  const handleSaveEdit = (id: number, data: TypeAssessmentFormData) => {
    updateLog(id, data)
    setIsEditModalOpen(false)
    setSelectedLog(null)
  }

  if (isLoading) return <LoadingSpinner />
  if (isError) return <FetchError />

  return (
    <div className="data-list text-[0.8em]">
      {/* Edit Modal */}
      <EditAssessmentLogModal
        isOpen={isEditModalOpen}
        onClose={handleCloseModal}
        log={selectedLog}
        onSave={handleSaveEdit}
      />

      {/* 검색 폼 */}
      <div className="mb-6 p-4 border border-gray-200 rounded-md">
        <h3 className="text-lg font-medium mb-4">검색</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="mb-2">
            <label htmlFor="search-clientName" className="block font-bold mb-1">내담자명</label>
            <input
              type="text"
              id="search-clientName"
              name="clientName"
              value={searchFormData.clientName}
              onChange={handleSearchChange}
              placeholder="내담자명 검색"
              className="w-full p-1 border border-gray-300 rounded"
            />
          </div>

          <div className="mb-2">
            <label htmlFor="search-age" className="block font-bold mb-1">나이</label>
            <input
              type="number"
              id="search-age"
              name="age"
              value={searchFormData.age}
              onChange={handleSearchChange}
              placeholder="나이 검색"
              className="w-full p-1 border border-gray-300 rounded"
            />
          </div>

          <div className="mb-2">
            <label htmlFor="search-gender" className="block font-bold mb-1">성별</label>
            <select
              id="search-gender"
              name="gender"
              value={searchFormData.gender}
              onChange={handleSearchChange}
              className="w-full p-1 border border-gray-300 rounded"
            >
              <option value="">전체</option>
              <option value="male">남성</option>
              <option value="female">여성</option>
            </select>
          </div>

          <div className="mb-2">
            <label htmlFor="search-dx" className="block font-bold mb-1">진단명(Dx)</label>
            <input
              type="text"
              id="search-dx"
              name="dx"
              value={searchFormData.dx}
              onChange={handleSearchChange}
              placeholder="진단명 검색"
              className="w-full p-1 border border-gray-300 rounded"
            />
          </div>

          <div className="mb-2">
            <label htmlFor="search-researchType" className="block font-bold mb-1">검사 종류</label>
            <select
              id="search-researchType"
              name="researchType"
              value={searchFormData.researchType}
              onChange={handleSearchChange}
              className="w-full p-1 border border-gray-300 rounded"
            >
              <option value="">전체</option>
              {RESEARCH_TYPE_OPTIONS.map((type) => (
                <option key={type.id} value={type.id}>
                  {getTranslatedText(type)}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="mb-2">
            <label htmlFor="search-startDate" className="block font-bold mb-1">검사일 시작</label>
            <input
              type="date"
              id="search-startDate"
              name="startDate"
              value={searchFormData.startDate}
              onChange={handleSearchChange}
              className="w-full p-1 border border-gray-300 rounded"
            />
          </div>

          <div className="mb-2">
            <label htmlFor="search-endDate" className="block font-bold mb-1">검사일 종료</label>
            <input
              type="date"
              id="search-endDate"
              name="endDate"
              value={searchFormData.endDate}
              onChange={handleSearchChange}
              className="w-full p-1 border border-gray-300 rounded"
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
                column="dx"
                label="진단명(Dx)"
                sortKey="dx"
                getSortDirection={getSortDirection}
                requestSort={requestSort}
              />
              <SortableTableHeader
                column="researchType"
                label="검사 종류"
                sortKey="researchType"
                getSortDirection={getSortDirection}
                requestSort={requestSort}
              />
              <SortableTableHeader
                column="researchDate"
                label="검사일"
                sortKey="researchDate"
                getSortDirection={getSortDirection}
                requestSort={requestSort}
              />
              <th className="py-2 px-4 border-b text-left">작업</th>
            </tr>
          </thead>
          <tbody>
            {sortedAndFilteredData.map((log) => {
              // Find research type text
              const researchType = RESEARCH_TYPE_OPTIONS.find(type => type.id === log.researchType);
              const researchTypeText = researchType ? getTranslatedText(researchType) : '';

              return (
                <tr key={log.id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">{log.clientName}</td>
                  <td className="py-2 px-4 border-b">{log.age}</td>
                  <td className="py-2 px-4 border-b">{log.gender === 'male' ? '남성' : '여성'}</td>
                  <td className="py-2 px-4 border-b">{log.dx || '-'}</td>
                  <td className="py-2 px-4 border-b">{researchTypeText}</td>
                  <td className="py-2 px-4 border-b">{log.researchDate ? new Date(log.researchDate).toLocaleDateString() : '-'}</td>
                  <td className="py-2 px-4 border-b">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditClick(log.id)}
                        className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                      >
                        수정
                      </button>
                      <button
                        onClick={() => deleteLog(log.id)}
                        className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mb-4">
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

            {/* 진단명(Dx) 필터 */}
            <div className="flex flex-col">
              <label htmlFor="filter-dx" className="mb-1 font-medium">진단명(Dx):</label>
              <div className="flex">
                <input
                  id="filter-dx"
                  type="text"
                  value={getColumnFilterValue('dx')}
                  onChange={(e) => handleColumnFilterChange('dx', e.target.value)}
                  placeholder="진단명 검색..."
                  className="flex-1 p-2 border border-gray-300 rounded-l"
                />
                {getColumnFilterValue('dx') && (
                  <button
                    onClick={() => clearColumnFilter('dx')}
                    className="px-2 py-1 bg-gray-200 text-gray-700 rounded-r hover:bg-gray-300"
                    title="필터 초기화"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            {/* 검사 종류 필터 */}
            <div className="flex flex-col">
              <label htmlFor="filter-researchType" className="mb-1 font-medium">검사 종류:</label>
              <div className="flex">
                <select
                  id="filter-researchType"
                  value={getColumnFilterValue('researchType')}
                  onChange={(e) => handleColumnFilterChange('researchType', e.target.value)}
                  className="flex-1 p-2 border border-gray-300 rounded-l"
                >
                  <option value="">전체</option>
                  {RESEARCH_TYPE_OPTIONS.map((type) => (
                    <option key={type.id} value={type.id}>
                      {getTranslatedText(type)}
                    </option>
                  ))}
                </select>
                {getColumnFilterValue('researchType') && (
                  <button
                    onClick={() => clearColumnFilter('researchType')}
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

          <p className="mt-2 text-gray-500">
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

export default AssessmentLogList
