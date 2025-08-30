import * as react from 'react'

export type TypeCategory =
  | 'psychological_assessment'
  | 'therapy'
  | 'attendance_record'
  | 'presentation_record'
  | 'research_and_others'

export type TypeCategoryName =
  | '심리평가'
  | '심리치료'
  | '참석기록'
  | '발표기록'
  | '연구활동 및 기타'

export type TypeSubCategoryName =
  | 'psychological_assessment'
  | 'therapy_participation'
  | 'individual_therapy'
  | 'group_therapy'
  | 'academic_meeting_attendance'
  | 'case_meeting_attendance'
  | 'ethics_education_attendance'
  | 'academic_presentation'
  | 'case_presentation_substitute'
  | 'research_activity'
  | 'external_cooperation'
  | 'other_training'

export type TypeTrainingCountUnit =
  | '례'
  | '회'

export interface TypeCategoryDefine {
  name: TypeCategoryName
  icon: react.ForwardRefExoticComponent<any>
  color: string
  description: string
  subcategories: TypeSubCategoryName[]
  targetHours: number
  actualCount: number
  actualHours: number
  countUnit: TypeTrainingCountUnit
  warning?: string
}
