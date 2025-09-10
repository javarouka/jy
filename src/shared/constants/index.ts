export const RESEARCH_TYPE_OPTIONS = [
  { id: "COMPREHENSIVE_PSYCHOLOGICAL_ASSESSMENT", category: "research.type", defaultCode: "종합심리평가" },
  { id: "NEUROPSYCHOLOGICAL_ASSESSMENT", category: "research.type", defaultCode: "신경심리평가" },
  { id: "OTHER", category: "research.type", defaultCode: "기타" }
]

export const OTHER_ACTIVITY_TYPE_OPTIONS = [
  { id: "EXTERNAL_COOPERATION", category: "other.activity.type", defaultCode: "대외협력" },
  { id: "OTHER_TRAINING", category: "other.activity.type", defaultCode: "기타 수련" }
]

export const PARTICIPATE_TYPE_OPTIONS = [
  { id: "FIRST_AUTHOR", category: "participate.type", defaultCode: "1저자" },
  { id: "CO_AUTHOR", category: "participate.type", defaultCode: "공동저자" }
]

export const ACT_OPTIONS = [
  { id: "ATTENDING", category: "common.base", defaultCode: "보조" },
  { id: "PRESENTATION", category: "common.base", defaultCode: "참석" }
]

export const ACTIVITY_TYPE_OPTIONS = [
  { id: "ACADEMIC_CONFERENCE", category: "activity.type", defaultCode: "학술회의" },
  { id: "CASE_CONFERENCE", category: "activity.type", defaultCode: "사례회의" },
  { id: "ETHICS_EDUCATION", category: "activity.type", defaultCode: "윤리교육" },
  { id: "PAPER_PRESENTATION", category: "activity.type", defaultCode: "논문발표" } // activityType 이 참석일 경우 입력 불가
]

export const ORGANIZATION_OPTIONS = [
  { id: "TRAINING_INSTITUTION", category: "organization", defaultCode: "수련기관" },
  { id: "ACADEMIC_SOCIETY", category: "organization", defaultCode: "학회" },
  { id: "BRANCH_RESEARCH_GROUP", category: "organization", defaultCode: "지회/연구회" }
]

export const THERAPY_TYPE_OPTIONS = [
  { id: "MAIN_THERAPIST", category: "therapy.type", defaultCode: "주치료자" },
  { id: "ASSISTANT_THERAPIST", category: "therapy.type", defaultCode: "보조치료자" }
]
