export type TypeTrainingYear = {
  name: string
  startDate: string
  endDate: string
  targetHours: number
}

export const TRAINING_YEARS: TypeTrainingYear[] = [
  { name: '1년차', startDate: '2023-03-01', endDate: '2024-02-29', targetHours: 1000 },
  { name: '2년차', startDate: '2024-03-01', endDate: '2025-02-28', targetHours: 1000 },
  { name: '3년차', startDate: '2025-03-01', endDate: '2026-02-28', targetHours: 1000 },
]

export const AssessmentTarget = {
  totalCreditMinutes: 300 * 60, // 심리평가 총 인정시간
  caseCount: 30, // 종합심리평가 사례 수
}

export const AcademicTarget = {
  ethicsEducationJoinCount: 1, // 윤리교육 참여
  caseConferencePresentationCount: 2, // 사례회의 발표 횟수
  thesisPresentationCount: 1, // 논문발표 횟수
  academicConferenceJoinMinutes: 30 * 60, // 학술회의 참여 인정시간
  caseConferenceJoinMinutes: 10 * 60, // 사례회의 참여 인정시간
}

export const OtherActivityTarget = {
  externalCooperationCreditMinutes: 30 * 60, // 대외협력 인정시간
}

export const ResearchTarget = {
  totalResearchCount: 1, // 총 연구 수
}

export const TherapyTarget = {
  totalCreditMinutes: 300 * 60, // 심리치료 총 인정시간
  primaryTherapistCreditMinutes: 100 * 60, // 주치료자 인정시간
  primaryTherapistCaseCount: 10, // 주치료자 사례 수
}

