import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { OtherActivityTarget } from '@renderer/data/TrainingYears'

type OtherActivityTargetFormData = {
  id?: number
  externalCooperationCreditMinutes: number
}

export default function useOtherActivityTargetMutation(_queryClient?: QueryClient) {
  const queryClient = _queryClient || useQueryClient()
  const [formData, setFormData] = useState<OtherActivityTargetFormData>({
    externalCooperationCreditMinutes: OtherActivityTarget.externalCooperationCreditMinutes // 대외협력 인정시간
  })
  const [editMode, setEditMode] = useState(false)
  const [otherActivityTarget, setOtherActivityTarget] = useState<any>(null)

  // Fetch other activity target
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['OtherActivityTarget'],
    queryFn: () => window.db.getOtherActivityTarget()
  })

  useEffect(() => {
    if (data) {
      setOtherActivityTarget(data)
      // If we have data, set the form data to the current values
      if (data.id) {
        setFormData({
          id: data.id,
          externalCooperationCreditMinutes: data.externalCooperationCreditMinutes
        })
        setEditMode(true)
      }
    }
  }, [data])

  // Reset form to default values from TrainingYears.ts
  const resetToDefaults = () => {
    if (otherActivityTarget && otherActivityTarget.id) {
      // If we have an existing record, update it with default values
      setFormData({
        id: otherActivityTarget.id,
        externalCooperationCreditMinutes: OtherActivityTarget.externalCooperationCreditMinutes
      })
    } else {
      // Otherwise just set the form to default values
      setFormData({
        externalCooperationCreditMinutes: OtherActivityTarget.externalCooperationCreditMinutes
      })
    }
  }

  const isValidForm = (formData: OtherActivityTargetFormData): boolean => {
    return formData.externalCooperationCreditMinutes >= 0
  }

  const createOtherActivityTargetMutation = useMutation({
    mutationFn: (otherActivityTarget: OtherActivityTargetFormData) => {
      return window.db.createOtherActivityTarget(otherActivityTarget)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['OtherActivityTarget'] })
      refetch()
    }
  })

  const updateOtherActivityTargetMutation = useMutation({
    mutationFn: ({ id, otherActivityTarget }: { id: number; otherActivityTarget: OtherActivityTargetFormData }) => {
      return window.db.updateOtherActivityTarget(id, otherActivityTarget)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['OtherActivityTarget'] })
      refetch()
    }
  })

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!isValidForm(formData)) {
      return
    }

    if (editMode && formData.id) {
      updateOtherActivityTargetMutation.mutate({
        id: formData.id,
        otherActivityTarget: formData
      })
    } else {
      createOtherActivityTargetMutation.mutate(formData)
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
      otherActivityTarget,
      isLoading
    },
    handleChange,
    handleSubmit,
    handleReset,
    refetch
  }
}
