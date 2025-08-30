export type TypeEvaluationType =
  | 'neuropsychological'
  | 'screening'
  | 'comprehensive'
  | 'parent_assessment'
  | 'personality'
  | 'intelligence'
  | 'mixed'

export type TypeTrainingRow = {
  /*
  id: 1,
  text: '곽연자 | 여자 | 58세',
  details: 'EOAD, pseudodementia | SNSB',
  taskDate: '2023-03-22',
  totalMinutes: 180,
  year: 1,
  evaluationType: 'neuropsychological',
  completed: true
   */
  id: number
  text: string
  details: string
  organization?: string
  taskDate: string
  totalMinutes: number
  year: number
  completed: boolean
  case_type?: string
  venue?: string
  therapy_approach?: string
  presentation_type?: string
  isValidForRequirement?: boolean
  evaluationType?: TypeEvaluationType
  isMainTherapist?: boolean
  sessions?: number
  meeting_type?: number
}

export type TypeTrainingData = {
  research_activity: Array<TypeTrainingRow>
  psychological_assessment: Array<TypeTrainingRow>
  therapy_participation: Array<TypeTrainingRow>
  individual_therapy: Array<TypeTrainingRow>
  group_therapy: Array<TypeTrainingRow>
  academic_meeting_attendance: Array<TypeTrainingRow>
  case_meeting_attendance: Array<TypeTrainingRow>
  ethics_education_attendance: Array<TypeTrainingRow>
  academic_presentation: Array<TypeTrainingRow>
  case_presentation_substitute: Array<TypeTrainingRow>
  external_cooperation: Array<TypeTrainingRow>
  other_training: Array<TypeTrainingRow>
}
