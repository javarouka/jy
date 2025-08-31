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

export const RESEARCH_TYPE_OPTIONS = [
  '종합심리평가',
  '신경심리평가',
]
