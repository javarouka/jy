import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { AssessmentTarget } from '@renderer/data/TrainingYears'

type AssessmentTargetFormData = {
  id?: number
  totalCreditMinutes: number
  caseCount: number
}

export default function useAssessmentTargetMutation(_queryClient?: QueryClient) {
  const queryClient = _queryClient || useQueryClient()
  const [formData, setFormData] = useState<AssessmentTargetFormData>({
    totalCreditMinutes: AssessmentTarget.totalCreditMinutes, // 심리평가 총 인정시간
    caseCount: AssessmentTarget.caseCount // 종합심리평가 사례 수
  })
  const [editMode, setEditMode] = useState(false)
  const [assessmentTarget, setAssessmentTarget] = useState<any>(null)

  // Fetch assessment target
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['AssessmentTarget'],
    queryFn: () => window.db.getAssessmentTarget()
  })

  useEffect(() => {
    if (data) {
      setAssessmentTarget(data)
      // If we have data, set the form data to the current values
      if (data.id) {
        setFormData({
          id: data.id,
          totalCreditMinutes: data.totalCreditMinutes,
          caseCount: data.caseCount
        })
        setEditMode(true)
      }
    }
  }, [data])

  // Reset form to default values from TrainingYears.ts
  const resetToDefaults = () => {
    if (assessmentTarget && assessmentTarget.id) {
      // If we have an existing record, update it with default values
      setFormData({
        id: assessmentTarget.id,
        totalCreditMinutes: AssessmentTarget.totalCreditMinutes,
        caseCount: AssessmentTarget.caseCount
      })
    } else {
      // Otherwise just set the form to default values
      setFormData({
        totalCreditMinutes: AssessmentTarget.totalCreditMinutes,
        caseCount: AssessmentTarget.caseCount
      })
    }
  }

  const isValidForm = (formData: AssessmentTargetFormData): boolean => {
    return formData.totalCreditMinutes > 0 && formData.caseCount > 0
  }

  const createAssessmentTargetMutation = useMutation({
    mutationFn: (assessmentTarget: AssessmentTargetFormData) => {
      return window.db.createAssessmentTarget(assessmentTarget)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['AssessmentTarget'] })
      refetch()
    }
  })

  const updateAssessmentTargetMutation = useMutation({
    mutationFn: ({ id, assessmentTarget }: { id: number; assessmentTarget: AssessmentTargetFormData }) => {
      return window.db.updateAssessmentTarget(id, assessmentTarget)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['AssessmentTarget'] })
      refetch()
    }
  })

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!isValidForm(formData)) {
      return
    }

    if (editMode && formData.id) {
      updateAssessmentTargetMutation.mutate({
        id: formData.id,
        assessmentTarget: formData
      })
    } else {
      createAssessmentTargetMutation.mutate(formData)
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target

    if (type === 'number') {
      setFormData((prev) => ({ ...prev, [name]: value === '' ? 0 : parseInt(value, 10) }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleReset = () => {
    if (window.confirm('정말로 초기값으로 되돌리시겠습니까? 기존 설정값이 모두 사라집니다.')) {
      resetToDefaults()
    }
  }

  return {
    forms: {
      formData,
      setFormData,
      editMode,
      assessmentTarget,
      isLoading
    },
    handleChange,
    handleSubmit,
    handleReset,
    refetch
  }
}
