import { useState, useEffect, ChangeEvent, FormEvent } from 'react'
import type { OtherActivityLog } from '@prisma/client'
import { TypeOtherActivityFormData } from '@shared/types'
import { format } from 'date-fns'
import { OTHER_ACTIVITY_TYPE_OPTIONS } from '@shared/constants'
import { getTranslatedText } from '@renderer/helpers/translateConstants'

interface EditOtherActivityLogModalProps {
  isOpen: boolean
  onClose: () => void
  log: OtherActivityLog | null
  onSave: (id: number, data: TypeOtherActivityFormData) => void
}

const EditOtherActivityLogModal = ({ isOpen, onClose, log, onSave }: EditOtherActivityLogModalProps) => {
  const [formData, setFormData] = useState<TypeOtherActivityFormData>({
    activitySummary: '',
    activityType: OTHER_ACTIVITY_TYPE_OPTIONS[0].id,
    startDate: '',
    endDate: '',
    creditTime: 0,
    usable: true
  })

  // Update form data when log changes
  useEffect(() => {
    if (log) {
      setFormData({
        activitySummary: log.activitySummary,
        activityType: log.activityType,
        startDate: format(new Date(log.startDate), 'yyyy-MM-dd'),
        endDate: format(new Date(log.endDate), 'yyyy-MM-dd'),
        creditTime: log.creditTime,
        usable: log.usable
      })
    }
  }, [log])

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
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

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (log) {
      onSave(log.id, formData)
    }
  }

  if (!isOpen || !log) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">기타 활동 수정</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="activitySummary" className="block text-sm font-medium text-gray-700">활동명</label>
            <input
              type="text"
              id="activitySummary"
              name="activitySummary"
              value={formData.activitySummary}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="activityType" className="block text-sm font-medium text-gray-700">활동유형</label>
            <select
              id="activityType"
              name="activityType"
              value={formData.activityType}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            >
              {OTHER_ACTIVITY_TYPE_OPTIONS.map(option => (
                <option key={option.id} value={option.id}>{getTranslatedText(option)}</option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">시작일</label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">종료일</label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="creditTime" className="block text-sm font-medium text-gray-700">인정시간 (분)</label>
            <input
              type="number"
              id="creditTime"
              name="creditTime"
              value={formData.creditTime}
              onChange={handleChange}
              required
              min="1"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>

          <div className="mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="usable"
                checked={formData.usable}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-700">사용 가능</span>
            </label>
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
            >
              취소
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              저장
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditOtherActivityLogModal
