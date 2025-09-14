import AssessmentLogCard from '@renderer/pages/management/assessment-log/AssessmentLogCard'
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
import useViewMode from '@renderer/hook/useViewMode'

const AssessmentLogList = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [selectedLog, setSelectedLog] = useState<AssessmentLog | null>(null)

  // Use the view mode hook with a unique key for this component
  const { viewMode, toggleViewMode } = useViewMode('assessment-log')

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

  if (isLoading) return <LoadingSpinner />
  if (isError) return <FetchError />

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
      <div className="mb-6 p-4 border border-gray-200 rounded-md">
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
                <option key={type.id} value={type.id}>
                  {getTranslatedText(type)}
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
            {assessmentLog.map((log) => (
              <AssessmentLogCard
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
                  <th className="py-2 px-4 border-b text-left">내담자명</th>
                  <th className="py-2 px-4 border-b text-left">나이</th>
                  <th className="py-2 px-4 border-b text-left">성별</th>
                  <th className="py-2 px-4 border-b text-left">진단명(Dx)</th>
                  <th className="py-2 px-4 border-b text-left">검사 종류</th>
                  <th className="py-2 px-4 border-b text-left">검사일</th>
                  <th className="py-2 px-4 border-b text-left">작업</th>
                </tr>
              </thead>
              <tbody>
                {assessmentLog.map((log) => {
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

        {assessmentLog.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            검색 결과가 없습니다.
          </div>
        )}
      </div>
    </div>
  );
};

export default AssessmentLogList
