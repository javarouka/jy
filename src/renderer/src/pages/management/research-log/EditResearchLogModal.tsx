import { useState, useEffect, ChangeEvent, FormEvent } from 'react'
import type { ResearchLog } from '@prisma/client'
import { TypeResearchFormData } from '@shared/types'
import { format } from 'date-fns'
import { PARTICIPATE_TYPE_OPTIONS } from '@shared/constants'
import { getTranslatedText } from '@renderer/helpers/translateConstants'

interface EditResearchLogModalProps {
  isOpen: boolean
  onClose: () => void
  log: ResearchLog | null
  onSave: (id: number, data: TypeResearchFormData) => void
}

const EditResearchLogModal = ({ isOpen, onClose, log, onSave }: EditResearchLogModalProps) => {
  const [formData, setFormData] = useState<TypeResearchFormData>({
    publishDate: '',
    pagerName: '',
    journalName: '',
    participateType: PARTICIPATE_TYPE_OPTIONS[0].id,
    creditTime: 0,
    usable: true
  })

  // Update form data when log changes
  useEffect(() => {
    if (log) {
      setFormData({
        publishDate: format(new Date(log.publishDate), 'yyyy-MM-dd'),
        pagerName: log.pagerName,
        journalName: log.journalName,
        participateType: log.participateType,
        creditTime: log.creditTime,
        usable: log.usable
      })
    }
  }, [log])

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target

    if (type === 'checkbox') {
      const { checked } = e.target as HTMLInputElement
      setFormData(prev => ({ ...prev, [name]: checked }))
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
        <h2 className="text-xl font-bold mb-4">연구로그 수정</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="pagerName" className="block text-sm font-medium text-gray-700">논문이름</label>
            <input
              type="text"
              id="pagerName"
              name="pagerName"
              value={formData.pagerName}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="journalName" className="block text-sm font-medium text-gray-700">학회지</label>
            <input
              type="text"
              id="journalName"
              name="journalName"
              value={formData.journalName}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="participateType" className="block text-sm font-medium text-gray-700">저자구분</label>
            <select
              id="participateType"
              name="participateType"
              value={formData.participateType}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            >
              {PARTICIPATE_TYPE_OPTIONS.map(option => (
                <option key={option.id} value={option.id}>{getTranslatedText(option)}</option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="publishDate" className="block text-sm font-medium text-gray-700">발간일</label>
            <input
              type="date"
              id="publishDate"
              name="publishDate"
              value={formData.publishDate}
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

export default EditResearchLogModal
