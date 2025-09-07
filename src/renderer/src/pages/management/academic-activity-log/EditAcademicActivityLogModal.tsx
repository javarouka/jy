import { type AcademicActivityLog } from '@prisma/client'
import {
  TypeAcademicActivityFormData
} from '@shared/types'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { ACT_OPTIONS, ACTIVITY_TYPE_OPTIONS, ORGANIZATION_OPTIONS } from '@shared/constants'
import { getTranslatedText } from '@renderer/helpers/translateConstants'

type Props = {
  isOpen: boolean
  onClose: () => void
  log: AcademicActivityLog | null
  onSave: (id: number, data: TypeAcademicActivityFormData) => void
}

const EditAcademicActivityLogModal = ({ isOpen, onClose, log, onSave }: Props) => {
  const [formData, setFormData] = useState<TypeAcademicActivityFormData>({
    act: '',
    activityDate: '',
    activityName: '',
    activityType: '',
    organization: '',
    sessionName: '',
    creditTime: 0
  })

  // Initialize form data when log changes
  useEffect(() => {
    if (log) {
      setFormData({
        act: log.act,
        activityType: log.activityType,
        activityDate: new Date(log.activityDate).toISOString().split('T')[0],
        activityName: log.activityName,
        organization: log.organization,
        sessionName: log.sessionName,
        creditTime: log.creditTime,
      })
    }
  }, [log])

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target

    if (type === 'checkbox') {
      const { checked } = e.target as HTMLInputElement
      setFormData((prev) => ({ ...prev, [name]: checked }))
    } else if (type === 'number') {
      // Handle number inputs, convert empty string to 0
      setFormData((prev) => ({ ...prev, [name]: value === '' ? 0 : parseInt(value, 10) }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (log === null) return
    onSave(log.id, formData)
    onClose()
  }

  if (!isOpen || !log) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-2xl max-h-[90vh] overflow-y-auto p-6">
        <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-200">
          <h3 className="text-lg font-medium">학술활동 기록 수정</h3>
          <button
            onClick={onClose}
            className="bg-transparent border-none text-2xl cursor-pointer text-gray-500 hover:text-gray-700"
          >
            &times;
          </button>
        </div>
        <form onSubmit={handleSubmit} className="my-2 space-y-4">
          <div className="text-sm">
            <label htmlFor="edit-act" className="font-bold">참석 발표</label>
            <select
              id="edit-act"
              name="act"
              value={formData.act}
              onChange={handleChange}
              required
              className="w-full p-1 border border-gray-300 rounded-md text-base"
            >
              <option value="">선택하세요</option>
              {ACT_OPTIONS.map((option) => (
                <option key={option.id} value={option.id}>
                  {getTranslatedText(option)}
                </option>
              ))}
            </select>
          </div>

          <div className="text-sm">
            <label htmlFor="edit-activityName" className="font-bold">회의명</label>
            <input
              type="text"
              id="edit-activityName"
              name="activityName"
              value={formData.activityName}
              onChange={handleChange}
              required
              className="w-full p-1 border border-gray-300 rounded-md text-base"
            />
          </div>

          <div className="text-sm">
            <label htmlFor="edit-sessionName" className="font-bold">발표명</label>
            <input
              type="text"
              id="edit-sessionName"
              name="sessionName"
              value={formData.sessionName}
              onChange={handleChange}
              required
              className="w-full p-1 border border-gray-300 rounded-md text-base"
            />
          </div>

          <div className="flex gap-4">
            <div className="text-sm flex-1">
              <label htmlFor="edit-activityType" className="font-bold">회의 유형</label>
              <select
                id="edit-activityType"
                name="activityType"
                value={formData.activityType}
                onChange={handleChange}
                required
                className="w-full p-1 border border-gray-300 rounded-md text-base"
              >
                <option value="">선택하세요</option>
                {ACTIVITY_TYPE_OPTIONS.map((option) => (
                  <option key={option.id} value={option.id}>
                    {getTranslatedText(option)}
                  </option>
                ))}
              </select>
            </div>

            <div className="text-sm flex-1">
              <label htmlFor="edit-creditTime" className="font-bold">인정시간 (분)</label>
              <input
                type="number"
                id="edit-creditTime"
                name="creditTime"
                value={formData.creditTime}
                onChange={handleChange}
                required
                className="w-full p-1 border border-gray-300 rounded-md text-base"
              />
            </div>
          </div>

          <div className="text-sm">
            <label htmlFor="edit-organization" className="font-bold">주관기관</label>
            <select
              id="edit-organization"
              name="organization"
              value={formData.organization}
              onChange={handleChange}
              required
              className="w-full p-1 border border-gray-300 rounded-md text-base"
            >
              <option value="">선택하세요</option>
              {ORGANIZATION_OPTIONS.map((option) => (
                <option key={option.id} value={option.id}>
                  {getTranslatedText(option)}
                </option>
              ))}
            </select>
          </div>

          <div className="text-sm">
            <label htmlFor="edit-activityDate" className="font-bold">활동일</label>
            <input
              type="date"
              id="edit-activityDate"
              name="activityDate"
              value={formData.activityDate}
              onChange={handleChange}
              required
              className="w-full p-1 border border-gray-300 rounded-md text-base"
            />
          </div>

          <div className="flex justify-end gap-2 mt-6 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-700 text-sm hover:bg-gray-200 transition-colors"
            >
              취소
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-md bg-blue-600 text-white text-sm font-bold hover:bg-blue-700 transition-colors"
            >
              저장
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditAcademicActivityLogModal
