import AssessmentLogCard from '@renderer/pages/management/assessment-log/AssessmentLogCard'
import type { TypeAssessmentFormData } from '@shared/types'
import { RESEARCH_TYPE_OPTIONS } from '@shared/types'
import useAssessmentLogSearch from './hook/useAssessmentLogSearch'
import type { FormEvent } from 'react'
import { useState } from 'react'
import EditAssessmentLogModal from './EditAssessmentLogModal'
import type { AssessmentLog } from '@prisma/client'

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

  if (isLoading) return <div>로딩 중...</div>
  if (isError) return <div>에러가 발생했습니다.</div>

  return (
    <div>
      {/* Edit Modal */}
      <EditAssessmentLogModal
        isOpen={isEditModalOpen}
        onClose={handleCloseModal}
        log={selectedLog}
        onSave={handleSaveEdit}
      />

      {/* 검색 폼 */}
      <div className="mb-6 p-4 border rounded-md">
        <h3 className="text-lg font-medium mb-4">검색</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="mb-2 text-sm">
            <label htmlFor="search-clientName" className="block font-bold mb-1">내담자명</label>
            <input
              type="text"
              id="search-clientName"
              name="clientName"
              value={searchFormData.clientName}
              onChange={handleSearchChange}
              placeholder="내담자명 검색"
              className="w-full p-1 border border-gray-300 rounded text-base"
            />
          </div>

          <div className="mb-2 text-sm">
            <label htmlFor="search-age" className="block font-bold mb-1">나이</label>
            <input
              type="number"
              id="search-age"
              name="age"
              value={searchFormData.age}
              onChange={handleSearchChange}
              placeholder="나이 검색"
              className="w-full p-1 border border-gray-300 rounded text-base"
            />
          </div>

          <div className="mb-2 text-sm">
            <label htmlFor="search-gender" className="block font-bold mb-1">성별</label>
            <select
              id="search-gender"
              name="gender"
              value={searchFormData.gender}
              onChange={handleSearchChange}
              className="w-full p-1 border border-gray-300 rounded text-base"
            >
              <option value="">전체</option>
              <option value="male">남성</option>
              <option value="female">여성</option>
            </select>
          </div>

          <div className="mb-2 text-sm">
            <label htmlFor="search-dx" className="block font-bold mb-1">진단명(Dx)</label>
            <input
              type="text"
              id="search-dx"
              name="dx"
              value={searchFormData.dx}
              onChange={handleSearchChange}
              placeholder="진단명 검색"
              className="w-full p-1 border border-gray-300 rounded text-base"
            />
          </div>

          <div className="mb-2 text-sm">
            <label htmlFor="search-researchType" className="block font-bold mb-1">검사 종류</label>
            <select
              id="search-researchType"
              name="researchType"
              value={searchFormData.researchType}
              onChange={handleSearchChange}
              className="w-full p-1 border border-gray-300 rounded text-base"
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
          <div className="mb-2 text-sm">
            <label htmlFor="search-startDate" className="block font-bold mb-1">검사일 시작</label>
            <input
              type="date"
              id="search-startDate"
              name="startDate"
              value={searchFormData.startDate}
              onChange={handleSearchChange}
              className="w-full p-1 border border-gray-300 rounded text-base"
            />
          </div>

          <div className="mb-2 text-sm">
            <label htmlFor="search-endDate" className="block font-bold mb-1">검사일 종료</label>
            <input
              type="date"
              id="search-endDate"
              name="endDate"
              value={searchFormData.endDate}
              onChange={handleSearchChange}
              className="w-full p-1 border border-gray-300 rounded text-base"
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
      <div>
        {/* 기본: 1열 (모바일) */}
        {/* md (768px) 이상: 2열 */}
        {/* xl (1280px) 이상: 3열 */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {assessmentLog.map((log) => (
            <AssessmentLogCard
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

export default AssessmentLogList
