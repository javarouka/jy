import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { TherapyTarget } from '@renderer/data/TrainingYears'

type TherapyTargetFormData = {
  id?: number
  totalCreditMinutes: number
  primaryTherapistCreditMinutes: number
  primaryTherapistCaseCount: number
}

export default function useTherapyTargetMutation(_queryClient?: QueryClient) {
  const queryClient = _queryClient || useQueryClient()
  const [formData, setFormData] = useState<TherapyTargetFormData>({
    totalCreditMinutes: TherapyTarget.totalCreditMinutes, // 심리치료 총 인정시간
    primaryTherapistCreditMinutes: TherapyTarget.primaryTherapistCreditMinutes, // 주치료자 인정시간
    primaryTherapistCaseCount: TherapyTarget.primaryTherapistCaseCount // 주치료자 사례 수
  })
  const [editMode, setEditMode] = useState(false)
  const [therapyTarget, setTherapyTarget] = useState<any>(null)

  // Fetch therapy target
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['TherapyTarget'],
    queryFn: () => window.db.getTherapyTarget()
  })

  useEffect(() => {
    if (data) {
      setTherapyTarget(data)
      // If we have data, set the form data to the current values
      if (data.id) {
        setFormData({
          id: data.id,
          totalCreditMinutes: data.totalCreditMinutes,
          primaryTherapistCreditMinutes: data.primaryTherapistCreditMinutes,
          primaryTherapistCaseCount: data.primaryTherapistCaseCount
        })
        setEditMode(true)
      }
    }
  }, [data])

  // Reset form to default values from TrainingYears.ts
  const resetToDefaults = () => {
    if (therapyTarget && therapyTarget.id) {
      // If we have an existing record, update it with default values
      setFormData({
        id: therapyTarget.id,
        totalCreditMinutes: TherapyTarget.totalCreditMinutes,
        primaryTherapistCreditMinutes: TherapyTarget.primaryTherapistCreditMinutes,
        primaryTherapistCaseCount: TherapyTarget.primaryTherapistCaseCount
      })
    } else {
      // Otherwise just set the form to default values
      setFormData({
        totalCreditMinutes: TherapyTarget.totalCreditMinutes,
        primaryTherapistCreditMinutes: TherapyTarget.primaryTherapistCreditMinutes,
        primaryTherapistCaseCount: TherapyTarget.primaryTherapistCaseCount
      })
    }
  }

  const isValidForm = (formData: TherapyTargetFormData): boolean => {
    return (
      formData.totalCreditMinutes >= 0 &&
      formData.primaryTherapistCreditMinutes >= 0 &&
      formData.primaryTherapistCaseCount >= 0
    )
  }

  const createTherapyTargetMutation = useMutation({
    mutationFn: (therapyTarget: TherapyTargetFormData) => {
      return window.db.createTherapyTarget(therapyTarget)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['TherapyTarget'] })
      refetch()
    }
  })

  const updateTherapyTargetMutation = useMutation({
    mutationFn: ({ id, therapyTarget }: { id: number; therapyTarget: TherapyTargetFormData }) => {
      return window.db.updateTherapyTarget(id, therapyTarget)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['TherapyTarget'] })
      refetch()
    }
  })

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!isValidForm(formData)) {
      return
    }

    if (editMode && formData.id) {
      updateTherapyTargetMutation.mutate({
        id: formData.id,
        therapyTarget: formData
      })
    } else {
      createTherapyTargetMutation.mutate(formData)
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
      therapyTarget,
      isLoading
    },
    handleChange,
    handleSubmit,
    handleReset,
    refetch
  }
}
