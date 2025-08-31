import ManagementWrapper from '@renderer/pages/management/ManagementWrapper'
import SubTitle from '@renderer/component/basic/SubTitle'
import useAssessmentLogMutation from '@renderer/pages/management/assessment-log/hook/useAssessmentLogMutation'
import { RESEARCH_TYPE_OPTIONS } from '../../../../../shared/types'
import './ManagementAssessmentLog.css'
import AssessmentLogList from '@renderer/pages/management/assessment-log/AssessmentLogList'

function ManagementAssessmentLog() {
  const {
    forms: {
      formData,
    },
    handleSubmit,
    handleChange,
  } = useAssessmentLogMutation()

  return (
    <ManagementWrapper>
      <fieldset>
        <legend>
          <SubTitle>심리평가 기록 관리</SubTitle>
        </legend>

        {/* 입력 폼 */}
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

            <div className="form-group text-sm">
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

            <div className="form-group text-sm">
              <label htmlFor="gender">성별</label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  선택하세요
                </option>
                <option value="male">남성</option>
                <option value="female">여성</option>
              </select>
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

            <div className="form-group text-sm">
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

            <div className="form-group text-sm">
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
      <div>
        <AssessmentLogList />
      </div>
    </ManagementWrapper>
  )
}

export default ManagementAssessmentLog
