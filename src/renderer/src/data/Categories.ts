import { TypeCategory, TypeCategoryDefine } from '@renderer/type/categories'
import { Brain, FileImage, Heart, Presentation, Users } from 'lucide-react'

export const Categories: Record<TypeCategory, TypeCategoryDefine> = {
  psychological_assessment: {
    name: '심리평가',
    icon: Brain,
    color: 'purple',
    description: '심리평가 실시 (300시간 이상, 종합평가 30례 이상)',
    subcategories: ['psychological_assessment'],
    targetHours: 300,
    actualCount: 0,
    actualHours: 0,
    countUnit: '례'
  },
  therapy: {
    name: '심리치료',
    icon: Heart,
    color: 'green',
    description: '심리치료 실시 (300시간 이상, 주치료자 100시간/10례 이상)',
    subcategories: ['therapy_participation', 'individual_therapy', 'group_therapy'],
    targetHours: 300,
    actualCount: 0,
    actualHours: 0,
    countUnit: '례'
  },
  attendance_record: {
    name: '참석기록',
    icon: Users,
    color: 'blue',
    description: '학술회의 30시간, 사례회의 10시간, 윤리교육 1회 이상',
    subcategories: ['academic_meeting_attendance', 'case_meeting_attendance', 'ethics_education_attendance'],
    targetHours: 41,
    actualCount: 0,
    actualHours: 0,
    countUnit: '회'
  },
  presentation_record: {
    name: '발표기록',
    icon: Presentation,
    color: 'indigo',
    description: '사례발표 2회 - 1회는 학회 논문발표(포스터/구연)로 대체 가능',
    subcategories: ['academic_presentation', 'case_presentation_substitute'],
    targetHours: 4,
    actualCount: 0,
    actualHours: 0,
    countUnit: '회',
    warning: '사례발표 1회 + 학회 논문발표 1회로 충족 가능'
  },
  research_and_others: {
    name: '연구활동 및 기타',
    icon: FileImage,
    color: 'orange',
    description: '제1저자 논문 1편, 대외협력 30시간 이상',
    subcategories: ['research_activity', 'external_cooperation', 'other_training'],
    targetHours: 30,
    actualCount: 0,
    actualHours: 0,
    countUnit: '회',
    warning: '제1저자 논문 게재 필요'
  }
}

export const getCategoryEntries = (): [TypeCategory, TypeCategoryDefine][] => {
  return Object.entries(Categories).map(category => {
    return category as [TypeCategory, TypeCategoryDefine]
  })
}

export const getCategoryDefine = (category: TypeCategory): TypeCategoryDefine => {
  return Categories[category]
}
