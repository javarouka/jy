import { AssessmentLog } from '@prisma/client'
import { RESEARCH_TYPE_OPTIONS, TypeAssessmentFormData } from '@shared/types'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import './ManagementAssessmentLog.css'

type Props = {
  isOpen: boolean
  onClose: () => void
  log: AssessmentLog | null
  onSave: (id: number, data: TypeAssessmentFormData) => void
}

const EditAssessmentLogModal = ({ isOpen, onClose, log, onSave }: Props) => {
  const [formData, setFormData] = useState<TypeAssessmentFormData>({
    clientName: '',
    age: 0,
    gender: '',
    dx: '',
    researchType: RESEARCH_TYPE_OPTIONS[0],
    researchDate: '',
    creditTime: 0
  })

  // Initialize form data when log changes
  useEffect(() => {
    if (log) {
      setFormData({
        clientName: log.clientName,
        age: log.age,
        gender: log.gender as 'male' | 'female' | '',
        dx: log.dx,
        researchType: log.researchType,
        researchDate: new Date(log.researchDate).toISOString().split('T')[0], // Convert to YYYY-MM-DD format
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
    if (!formData.gender || !log) {
      return
    }
    onSave(log.id, formData)
    onClose()
  }

  if (!isOpen || !log) return null

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <div className="modal-header">
          <h3 className="text-lg font-medium">평가 기록 수정</h3>
          <button
            onClick={onClose}
            className="close-button"
          >
            &times;
          </button>
        </div>
        <form onSubmit={handleSubmit} className="assessment-form space-y-4">
          <div className="form-group text-sm">
            <label htmlFor="edit-clientName">내담자명</label>
            <input
              type="text"
              id="edit-clientName"
              name="clientName"
              value={formData.clientName}
              onChange={handleChange}
              required
            />
          </div>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <div className="form-group text-sm" style={{ flex: '1' }}>
              <label htmlFor="edit-age">나이</label>
              <input
                type="number"
                id="edit-age"
                name="age"
                value={formData.age}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group text-sm" style={{ flex: '1' }}>
              <label htmlFor="edit-creditTime">인정 시간 (분)</label>
              <input
                type="number"
                id="edit-creditTime"
                name="creditTime"
                value={formData.creditTime}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group text-sm">
            <label htmlFor="edit-dx">진단명(Dx)</label>
            <input
              type="text"
              id="edit-dx"
              name="dx"
              value={formData.dx}
              onChange={handleChange}
              required
            />
          </div>

          <div style={{ display: 'flex', gap: '2rem' }}>
            <div className="form-group text-sm" style={{ flex: '1' }}>
              <label htmlFor="edit-researchType">검사 종류</label>
              <select
                id="edit-researchType"
                name="researchType"
                value={formData.researchType}
                onChange={handleChange}
              >
                {RESEARCH_TYPE_OPTIONS.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group text-sm" style={{ flex: '1' }}>
              <label>성별</label>
              <div style={{ display: 'flex', gap: '2rem', marginTop: '0.25rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', fontWeight: 'normal' }}>
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={formData.gender === 'male'}
                    onChange={handleChange}
                    required
                    style={{ marginRight: '0.25rem' }}
                  />
                  남성
                </label>
                <label style={{ display: 'flex', alignItems: 'center', fontWeight: 'normal' }}>
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={formData.gender === 'female'}
                    onChange={handleChange}
                    required
                    style={{ marginRight: '0.25rem' }}
                  />
                  여성
                </label>
              </div>
            </div>
          </div>

          <div className="form-group text-sm">
            <label htmlFor="edit-researchDate">검사일</label>
            <input
              type="date"
              id="edit-researchDate"
              name="researchDate"
              value={formData.researchDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="modal-footer">
            <button
              type="button"
              onClick={onClose}
              className="cancel-button"
            >
              취소
            </button>
            <button
              type="submit"
              className="save-button"
            >
              저장
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditAssessmentLogModal
