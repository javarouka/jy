export type TypeTrainingYear = {
  name: string
  startDate: string
  endDate: string
  targetHours: number
}

export type TypeAssessmentFormData = {
  clientName: string
  age: number
  gender: 'male' | 'female' | '' // 선택을 강제하기 위해 '' 추가
  dx: string
  researchType: string
  researchDate: string // HTML input date는 string 타입으로 값을 다룹니다.
  etcDescription: string // 기타 설명
  creditTime: number
}

export type TypeIndividualTherapyFormData = {
  clientName: string
  age: number
  gender: 'male' | 'female' | '' // 선택을 강제하기 위해 '' 추가
  therapyType: string
  researchDate: string // HTML input date는 string 타입으로 값을 다룹니다.
  sessionCount: number
  prepareTime: number
  sessionTime: number
  supervisionTime: number
  startDate: string // HTML input date는 string 타입으로 값을 다룹니다.
  endDate: string // HTML input date는 string 타입으로 값을 다룹니다.
  usable?: boolean
}

export type TypeGroupTherapyFormData = {
  groupName: string
  therapyType: string
  researchDate: string // HTML input date는 string 타입으로 값을 다룹니다.
  sessionCount: number
  prepareTime: number
  sessionTime: number
  supervisionTime: number
  startDate: string // HTML input date는 string 타입으로 값을 다룹니다.
  endDate: string // HTML input date는 string 타입으로 값을 다룹니다.
  usable?: boolean
}

export type TypeAcademicActivityFormData = {
  act: string
  activityName: string
  activityType: string
  activityDate: string // HTML input date는 string 타입으로 값을 다룹니다.
  organization: string
  sessionName: string
  creditTime: number
  usable?: boolean
}

export type TypeResearchFormData = {
  publishDate: string   // HTML input date는 string 타입으로 값을 다룹니다.
  pagerName: string
  journalName: string
  participateType: string
  creditTime: number
  usable?: boolean
}

export type TypeOtherActivityFormData = {
  activitySummary: string
  activityType: string
  startDate: string      // HTML input date는 string 타입으로 값을 다룹니다.
  endDate: string        // HTML input date는 string 타입으로 값을 다룹니다.
  creditTime: number
  usable?: boolean
}
