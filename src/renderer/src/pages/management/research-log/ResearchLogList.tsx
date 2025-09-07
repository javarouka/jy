import { type FormEvent, useState } from 'react'
import type { ResearchLog } from '@prisma/client'
import useResearchLogSearch from '@renderer/pages/management/research-log/hook/useResearchLogSearch'
import ResearchLogCard from '@renderer/pages/management/research-log/ResearchLogCard'
import EditResearchLogModal from '@renderer/pages/management/research-log/EditResearchLogModal'
import { PARTICIPATE_TYPE_OPTIONS } from '@shared/types'
import LoadingSpinner from '@renderer/component/basic/LoadingSpinner'
import FetchError from '@renderer/component/basic/FetchError'

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
                    <option key={option} value={option}>
                      {option}
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

      {/* 결과 목록 */}
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {log.map((log: ResearchLog) => (
            <ResearchLogCard
              key={log.id}
              log={log}
              onDelete={deleteLog}
              onEdit={handleEditClick}
            />
          ))}
        </div>
        {log.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            검색 결과가 없습니다.
          </div>
        )}
      </div>
    </div>
  )
}

export default ResearchLogList
