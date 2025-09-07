import { type FormEvent, useState } from 'react'
import type { AcademicActivityLog } from '@prisma/client'
import useAcademicActivityLogSearch
  from '@renderer/pages/management/academic-activity-log/hook/useAcademicActivityLogSearch'
import AcademicActivityLogCard from '@renderer/pages/management/academic-activity-log/AcademicActivityLogCard'
import EditAcademicActivityLogModal from '@renderer/pages/management/academic-activity-log/EditAcademicActivityLogModal'
import { ACT_OPTIONS, ACTIVITY_TYPE_OPTIONS, ORGANIZATION_OPTIONS } from '@shared/types'

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
    <div>
      {/* Edit Modal */}
      <EditAcademicActivityLogModal
        isOpen={isEditModalOpen}
        onClose={handleCloseModal}
        log={selectedLog}
        onSave={handleSaveEdit}
      />

      {/* 검색 폼 */}
      <div className="mb-6 p-4 border rounded-md">
        <h3 className="text-lg font-medium mb-4">검색</h3>
        {/* 기본 검색 필드 */}
        <div className="flex flex-wrap items-end gap-4 w-full">
          <div className="form-group text-sm flex-1">
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

          <div className="form-group text-sm flex-1">
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
                    <option key={option} value={option}>
                      {option}
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
                    <option key={option} value={option}>
                      {option}
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
                    <option key={option} value={option}>
                      {option}
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
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {log.map((log: AcademicActivityLog) => (
            <AcademicActivityLogCard
              key={log.id}
              log={log}
              onDelete={deleteLog}
              onEdit={handleEditClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AcademicActivityLogList
