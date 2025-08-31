import useAssessmentLogMutation from '@renderer/pages/management/assessment-log/hook/useAssessmentLogMutation'
import { RESEARCH_TYPE_OPTIONS } from '@shared/types'
import './ManagementAssessmentLog.css'

function AssessmentLogInsertForm() {
  const {
    forms: {
      formData,
    },
    handleSubmit,
    handleChange,
  } = useAssessmentLogMutation()

  return (
    <fieldset>
      <div>
        <form onSubmit={handleSubmit} className="assessment-form space-y-4">
          <h3>평가 기록 입력</h3>
          <div className="form-group text-sm">
            <label htmlFor="clientName">내담자명</label>
            <input
              type="text"
              id="clientName"
              name="clientName"
              value={formData.clientName}
              onChange={handleChange}
              required
            />
          </div>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <div className="form-group text-sm" style={{ flex: '1' }}>
              <label htmlFor="age">나이</label>
              <input
                type="number"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group text-sm" style={{ flex: '1' }}>
              <label htmlFor="creditTime">인정 시간 (분)</label>
              <input
                type="number"
                id="creditTime"
                name="creditTime"
                value={formData.creditTime}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group text-sm">
            <label htmlFor="dx">진단명(Dx)</label>
            <input
              type="text"
              id="dx"
              name="dx"
              value={formData.dx}
              onChange={handleChange}
              required
            />
          </div>

          <div style={{ display: 'flex', gap: '2rem' }}>
            <div className="form-group text-sm" style={{ flex: '1' }}>
              <label htmlFor="researchType">검사 종류</label>
              <select
                id="researchType"
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
            <label htmlFor="researchDate">검사일</label>
            <input
              type="date"
              id="researchDate"
              name="researchDate"
              value={formData.researchDate}
              onChange={handleChange}
              required
            />
          </div>

          <button className="
            w-full
            rounded border-0
            bg-[#007bff]
            p-[0.5rem]
            text-[0.75rem]
            font-bold
            text-white
            transition-colors
            duration-200
            hover:bg-[#0056b3]
            cursor-pointer"
          >
            저장
          </button>
        </form>
      </div>
    </fieldset>
  )
}

export default AssessmentLogInsertForm
