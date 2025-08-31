import { useState, useEffect } from 'react'
import { RESEARCH_TYPE_OPTIONS, TypeAssessmentFormData } from '@shared/types'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AssessmentLog } from '@prisma/client'

interface EditAssessmentModalProps {
  isOpen: boolean
  onClose: () => void
  assessmentLog: AssessmentLog | null
}

export default function EditAssessmentModal({ isOpen, onClose, assessmentLog }: EditAssessmentModalProps) {
  const queryClient = useQueryClient()
  
  const [formData, setFormData] = useState<TypeAssessmentFormData>({
    clientName: '',
    age: 0,
    gender: '',
    dx: '',
    researchType: RESEARCH_TYPE_OPTIONS[0],
    researchDate: '',
    creditTime: 0,
    usable: true
  })

  // 수정 mutation
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: TypeAssessmentFormData }) =>
      window.db.updateAssessmentLog(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['AssessmentLog'] })
      onClose()
    },
  })

  // 모달이 열릴 때 데이터 로드
  useEffect(() => {
    if (isOpen && assessmentLog) {
      // 날짜 형식 처리
      let formattedDate = ''
      if (assessmentLog.researchDate) {
        if (typeof assessmentLog.researchDate === 'string') {
          formattedDate = assessmentLog.researchDate.split('T')[0]
        } else if (assessmentLog.researchDate instanceof Date) {
          formattedDate = assessmentLog.researchDate.toISOString().split('T')[0]
        } else if (typeof assessmentLog.researchDate === 'number') {
          formattedDate = new Date(assessmentLog.researchDate).toISOString().split('T')[0]
        }
      }

      setFormData({
        clientName: assessmentLog.clientName || '',
        age: assessmentLog.age || 0,
        gender: assessmentLog.gender || '',
        dx: assessmentLog.dx || '',
        researchType: assessmentLog.researchType || RESEARCH_TYPE_OPTIONS[0],
        researchDate: formattedDate,
        creditTime: assessmentLog.creditTime || 0,
        usable: assessmentLog.usable !== undefined ? assessmentLog.usable : true
      })
    }
  }, [isOpen, assessmentLog])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target

    if (type === 'checkbox') {
      const { checked } = e.target as HTMLInputElement
      setFormData(prev => ({ ...prev, [name]: checked }))
    } else if (type === 'number') {
      setFormData(prev => ({ ...prev, [name]: value === '' ? 0 : parseInt(value, 10) }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!assessmentLog) return

    if (!formData.gender) {
      alert('성별을 선택해주세요.')
      return
    }

    updateMutation.mutate({ id: assessmentLog.id, data: formData })
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            심리평가 기록 수정
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-group text-sm">
              <label htmlFor="edit-clientName" className="block text-sm font-medium mb-1">
                내담자명
              </label>
              <input
                type="text"
                id="edit-clientName"
                name="clientName"
                value={formData.clientName}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700"
              />
            </div>

            <div className="form-group text-sm">
              <label htmlFor="edit-age" className="block text-sm font-medium mb-1">
                나이
              </label>
              <input
                type="number"
                id="edit-age"
                name="age"
                value={formData.age}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700"
              />
            </div>

            <div className="form-group text-sm">
              <label htmlFor="edit-gender" className="block text-sm font-medium mb-1">
                성별
              </label>
              <select
                id="edit-gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700"
              >
                <option value="" disabled>선택하세요</option>
                <option value="male">남성</option>
                <option value="female">여성</option>
              </select>
            </div>

            <div className="form-group text-sm">
              <label htmlFor="edit-dx" className="block text-sm font-medium mb-1">
                진단명(Dx)
              </label>
              <input
                type="text"
                id="edit-dx"
                name="dx"
                value={formData.dx}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700"
              />
            </div>

            <div className="form-group text-sm">
              <label htmlFor="edit-researchType" className="block text-sm font-medium mb-1">
                검사 종류
              </label>
              <select
                id="edit-researchType"
                name="researchType"
                value={formData.researchType}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700"
              >
                {RESEARCH_TYPE_OPTIONS.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group text-sm">
              <label htmlFor="edit-researchDate" className="block text-sm font-medium mb-1">
                검사일
              </label>
              <input
                type="date"
                id="edit-researchDate"
                name="researchDate"
                value={formData.researchDate}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700"
              />
            </div>

            <div className="form-group text-sm">
              <label htmlFor="edit-creditTime" className="block text-sm font-medium mb-1">
                인정 시간 (분)
              </label>
              <input
                type="number"
                id="edit-creditTime"
                name="creditTime"
                value={formData.creditTime}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700"
              />
            </div>

            <div className="form-group text-sm flex items-center">
              <input
                type="checkbox"
                id="edit-usable"
                name="usable"
                checked={formData.usable}
                onChange={handleChange}
                className="mr-2"
              />
              <label htmlFor="edit-usable" className="text-sm">
                사용 가능
              </label>
            </div>
          </div>

          <div className="flex justify-end space-x-3 mt-6 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300"
            >
              취소
            </button>
            <button
              type="submit"
              disabled={updateMutation.isPending}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {updateMutation.isPending ? '저장 중...' : '수정 완료'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}