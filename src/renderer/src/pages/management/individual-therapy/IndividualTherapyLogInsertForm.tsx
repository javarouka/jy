import useIndividualTherapyLogMutation from '@renderer/pages/management/individual-therapy/hook/useIndividualTherapyLogMutation'
import { THERAPY_TYPE_OPTIONS } from '@shared/types'
import './IndividualTherapyLog.css'

function IndividualTherapyLogInsertForm() {
  const {
    forms: {
      formData,
    },
    handleSubmit,
    handleChange,
  } = useIndividualTherapyLogMutation()

  return (
    <fieldset>
      <div>
        <form onSubmit={handleSubmit} className="therapy-form space-y-4">
          <h3>개인심리치료 기록 입력</h3>
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
              <label htmlFor="sessionCount">회기 수</label>
              <input
                type="number"
                id="sessionCount"
                name="sessionCount"
                value={formData.sessionCount}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <div className="form-group text-sm" style={{ flex: '1' }}>
              <label htmlFor="prepareTime">준비 시간 (분)</label>
              <input
                type="number"
                id="prepareTime"
                name="prepareTime"
                value={formData.prepareTime}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group text-sm" style={{ flex: '1' }}>
              <label htmlFor="sessionTime">상담 시간 (분)</label>
              <input
                type="number"
                id="sessionTime"
                name="sessionTime"
                value={formData.sessionTime}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group text-sm">
            <label htmlFor="supervisionTime">지도감독 시간 (분)</label>
            <input
              type="number"
              id="supervisionTime"
              name="supervisionTime"
              value={formData.supervisionTime}
              onChange={handleChange}
              required
            />
          </div>

          <div style={{ display: 'flex', gap: '2rem' }}>
            <div className="form-group text-sm" style={{ flex: '1' }}>
              <label htmlFor="threapyType">치료자 유형</label>
              <select
                id="threapyType"
                name="threapyType"
                value={formData.threapyType}
                onChange={handleChange}
              >
                {THERAPY_TYPE_OPTIONS.map((type) => (
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

          <div style={{ display: 'flex', gap: '1rem' }}>
            <div className="form-group text-sm" style={{ flex: '1' }}>
              <label htmlFor="startDate">시작일</label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group text-sm" style={{ flex: '1' }}>
              <label htmlFor="endDate">종료일</label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                required
              />
            </div>
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

export default IndividualTherapyLogInsertForm
