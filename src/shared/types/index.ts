export interface TypeAssessmentLog {
  id: number
  clientName: string
  age: number
  gender: string
  dx: string             // 진단명
  researchType: string // '종합심리평가', '신경심리평가' 등
  researchDate: Date // 검사일
  creditTime: number // 인정시간. 분
  usable: boolean
  createdAt: Date
}

export type TypeAssessmentFormData = {
  clientName: string
  age: number
  gender: 'male' | 'female' | '' // 선택을 강제하기 위해 '' 추가
  dx: string
  researchType: string
  researchDate: string // HTML input date는 string 타입으로 값을 다룹니다.
  creditTime: number
}

export interface TypeIndividualTherapyLog {
  id: number
  clientName: string
  age: number
  gender: string
  therapyType: string // '주치료자', '보조치료자'
  researchDate: Date // 검사일
  sessionCount: number // 회기수
  prepareTime: number // 준비에 소요한 시간
  sessionTime: number // 상담에 소요한 시간
  supervisionTime: number // 지도감독에 소요한 시간
  startDate: Date // 시작일
  endDate: Date // 종료일
  usable: boolean
  createdAt: Date
  modifiedAt: Date
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

export const RESEARCH_TYPE_OPTIONS = [
  '종합심리평가',
  '신경심리평가',
]

export interface TypeGroupTherapyLog {
  id: number
  groupName: string
  therapyType: string // '주치료자', '보조치료자'
  researchDate: Date // 검사일
  sessionCount: number // 회기수
  prepareTime: number // 준비에 소요한 시간
  sessionTime: number // 상담에 소요한 시간
  supervisionTime: number // 지도감독에 소요한 시간
  startDate: Date // 시작일
  endDate: Date // 종료일
  usable: boolean
  createdAt: Date
  modifiedAt: Date
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

export const THERAPY_TYPE_OPTIONS = [
  '주치료자',
  '보조치료자',
]

export interface TypeAcademicActivityLog {
  id: number
  act: string
  activityName: string
  activityType: string
  activityDate: Date
  organization: string
  sessionName: string
  creditTime: number
  usable: boolean
  createdAt: Date
  modifiedAt: Date
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

export const ACT_OPTIONS = [
  'follower',
  'following'
]

export const ACTIVITY_TYPE_OPTIONS = [
  '학술회의',
  '사례회의',
  '윤리교육'
]

export const ORGANIZATION_OPTIONS = [
  '수련기관',
  '학회',
  '지회/연구회'
]

export interface TypeResearchLog {
  id: number
  publishDate: Date     // 발간일
  pagerName: string     // 논문이름
  journalName: string   // 학회지
  participateType: string // 저자구분
  usable: boolean
  createdAt: Date
  modifiedAt: Date
}

export type TypeResearchFormData = {
  publishDate: string   // HTML input date는 string 타입으로 값을 다룹니다.
  pagerName: string
  journalName: string
  participateType: string
  creditTime: number
  usable?: boolean
}

export const PARTICIPATE_TYPE_OPTIONS = [
  '1저자',
  '공동저자'
]

export interface TypeOtherActivityLog {
  id: number
  activitySummary: string // 활동명, 간단한 활동 내용
  activityType: string    // 활동유형
  startDate: Date         // 활동시작일
  endDate: Date           // 활동종료일
  creditTime: number      // 인정시간. 분
  usable: boolean
  createdAt: Date
  modifiedAt: Date
}

export type TypeOtherActivityFormData = {
  activitySummary: string
  activityType: string
  startDate: string      // HTML input date는 string 타입으로 값을 다룹니다.
  endDate: string        // HTML input date는 string 타입으로 값을 다룹니다.
  creditTime: number
  usable?: boolean
}

export const OTHER_ACTIVITY_TYPE_OPTIONS = [
  '대외협력',
  '기타 수련'
]
