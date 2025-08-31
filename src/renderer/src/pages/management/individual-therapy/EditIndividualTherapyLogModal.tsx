import { IndividualTherapyLog } from '@prisma/client'
import { THERAPY_TYPE_OPTIONS, TypeIndividualTherapyFormData } from '@shared/types'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'

type Props = {
  isOpen: boolean
  onClose: () => void
  log: IndividualTherapyLog | null
  onSave: (id: number, data: TypeIndividualTherapyFormData) => void
}

const EditIndividualTherapyLogModal = ({ isOpen, onClose, log, onSave }: Props) => {
  const [formData, setFormData] = useState<TypeIndividualTherapyFormData>({
    clientName: '',
    age: 0,
    gender: '',
    therapyType: THERAPY_TYPE_OPTIONS[0],
    researchDate: '',
    sessionCount: 0,
    prepareTime: 0,
    sessionTime: 0,
    supervisionTime: 0,
    startDate: '',
    endDate: '',
    usable: true
  })

  // Initialize form data when log changes
  useEffect(() => {
    if (log) {
      setFormData({
        clientName: log.clientName,
        age: log.age,
        gender: log.gender as 'male' | 'female' | '',
        therapyType: log.therapyType,
        researchDate: new Date(log.researchDate).toISOString().split('T')[0], // Convert to YYYY-MM-DD format
        sessionCount: log.sessionCount,
        prepareTime: log.prepareTime,
        sessionTime: log.sessionTime,
        supervisionTime: log.supervisionTime,
        startDate: new Date(log.startDate).toISOString().split('T')[0], // Convert to YYYY-MM-DD format
        endDate: new Date(log.endDate).toISOString().split('T')[0], // Convert to YYYY-MM-DD format
        usable: log.usable
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
    if (!formData.gender || !log) {
      return
    }
    onSave(log.id, formData)
    onClose()
  }

  if (!isOpen || !log) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-2xl max-h-[90vh] overflow-y-auto p-6">
        <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-200">
          <h3 className="text-lg font-medium">개인심리치료 기록 수정</h3>
          <button
            onClick={onClose}
            className="bg-transparent border-none text-2xl cursor-pointer text-gray-500 hover:text-gray-700"
          >
            &times;
          </button>
        </div>
        <form onSubmit={handleSubmit} className="my-2 space-y-4">
          <div className="text-sm">
            <label htmlFor="edit-clientName" className="font-bold">내담자명</label>
            <input
              type="text"
              id="edit-clientName"
              name="clientName"
              value={formData.clientName}
              onChange={handleChange}
              required
              className="w-full p-1 border border-gray-300 rounded-md text-base"
            />
          </div>

          <div className="flex gap-4">
            <div className="text-sm flex-1">
              <label htmlFor="edit-age" className="font-bold">나이</label>
              <input
                type="number"
                id="edit-age"
                name="age"
                value={formData.age}
                onChange={handleChange}
                required
                className="w-full p-1 border border-gray-300 rounded-md text-base"
              />
            </div>

            <div className="text-sm flex-1">
              <label htmlFor="edit-sessionCount" className="font-bold">회기 수</label>
              <input
                type="number"
                id="edit-sessionCount"
                name="sessionCount"
                value={formData.sessionCount}
                onChange={handleChange}
                required
                className="w-full p-1 border border-gray-300 rounded-md text-base"
              />
            </div>
          </div>

          <div className="flex gap-4">
            <div className="text-sm flex-1">
              <label htmlFor="edit-prepareTime" className="font-bold">준비 시간 (분)</label>
              <input
                type="number"
                id="edit-prepareTime"
                name="prepareTime"
                value={formData.prepareTime}
                onChange={handleChange}
                required
                className="w-full p-1 border border-gray-300 rounded-md text-base"
              />
            </div>

            <div className="text-sm flex-1">
              <label htmlFor="edit-sessionTime" className="font-bold">상담 시간 (분)</label>
              <input
                type="number"
                id="edit-sessionTime"
                name="sessionTime"
                value={formData.sessionTime}
                onChange={handleChange}
                required
                className="w-full p-1 border border-gray-300 rounded-md text-base"
              />
            </div>
          </div>

          <div className="text-sm">
            <label htmlFor="edit-supervisionTime" className="font-bold">지도감독 시간 (분)</label>
            <input
              type="number"
              id="edit-supervisionTime"
              name="supervisionTime"
              value={formData.supervisionTime}
              onChange={handleChange}
              required
              className="w-full p-1 border border-gray-300 rounded-md text-base"
            />
          </div>

          <div className="flex gap-8">
            <div className="text-sm flex-1">
              <label htmlFor="edit-therapyType" className="font-bold">치료자 유형</label>
              <select
                id="edit-therapyType"
                name="therapyType"
                value={formData.therapyType}
                onChange={handleChange}
                className="w-full p-1 border border-gray-300 rounded-md text-base"
              >
                {THERAPY_TYPE_OPTIONS.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div className="text-sm flex-1">
              <label className="font-bold">성별</label>
              <div className="flex gap-8 mt-1">
                <label className="flex items-center font-normal">
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={formData.gender === 'male'}
                    onChange={handleChange}
                    required
                    className="mr-1"
                  />
                  남성
                </label>
                <label className="flex items-center font-normal">
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={formData.gender === 'female'}
                    onChange={handleChange}
                    required
                    className="mr-1"
                  />
                  여성
                </label>
              </div>
            </div>
          </div>

          <div className="text-sm">
            <label htmlFor="edit-researchDate" className="font-bold">검사일</label>
            <input
              type="date"
              id="edit-researchDate"
              name="researchDate"
              value={formData.researchDate}
              onChange={handleChange}
              required
              className="w-full p-1 border border-gray-300 rounded-md text-base"
            />
          </div>

          <div className="flex gap-4">
            <div className="text-sm flex-1">
              <label htmlFor="edit-startDate" className="font-bold">시작일</label>
              <input
                type="date"
                id="edit-startDate"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                required
                className="w-full p-1 border border-gray-300 rounded-md text-base"
              />
            </div>

            <div className="text-sm flex-1">
              <label htmlFor="edit-endDate" className="font-bold">종료일</label>
              <input
                type="date"
                id="edit-endDate"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                required
                className="w-full p-1 border border-gray-300 rounded-md text-base"
              />
            </div>
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

export default EditIndividualTherapyLogModal
