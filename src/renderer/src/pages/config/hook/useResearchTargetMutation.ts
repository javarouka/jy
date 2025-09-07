import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { ResearchTarget } from '@renderer/data/TrainingYears'

type ResearchTargetFormData = {
  id?: number
  totalResearchCount: number
}

export default function useResearchTargetMutation(_queryClient?: QueryClient) {
  const queryClient = _queryClient || useQueryClient()
  const [formData, setFormData] = useState<ResearchTargetFormData>({
    totalResearchCount: ResearchTarget.totalResearchCount // 총 연구 수
  })
  const [editMode, setEditMode] = useState(false)
  const [researchTarget, setResearchTarget] = useState<any>(null)

  // Fetch research target
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['ResearchTarget'],
    queryFn: () => window.db.getResearchTarget()
  })

  useEffect(() => {
    if (data) {
      setResearchTarget(data)
      // If we have data, set the form data to the current values
      if (data.id) {
        setFormData({
          id: data.id,
          totalResearchCount: data.totalResearchCount
        })
        setEditMode(true)
      }
    }
  }, [data])

  // Reset form to default values from TrainingYears.ts
  const resetToDefaults = () => {
    if (researchTarget && researchTarget.id) {
      // If we have an existing record, update it with default values
      setFormData({
        id: researchTarget.id,
        totalResearchCount: ResearchTarget.totalResearchCount
      })
    } else {
      // Otherwise just set the form to default values
      setFormData({
        totalResearchCount: ResearchTarget.totalResearchCount
      })
    }
  }

  const isValidForm = (formData: ResearchTargetFormData): boolean => {
    return formData.totalResearchCount >= 0
  }

  const createResearchTargetMutation = useMutation({
    mutationFn: (researchTarget: ResearchTargetFormData) => {
      return window.db.createResearchTarget(researchTarget)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ResearchTarget'] })
      refetch()
    }
  })

  const updateResearchTargetMutation = useMutation({
    mutationFn: ({ id, researchTarget }: { id: number; researchTarget: ResearchTargetFormData }) => {
      return window.db.updateResearchTarget(id, researchTarget)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ResearchTarget'] })
      refetch()
    }
  })

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!isValidForm(formData)) {
      return
    }

    if (editMode && formData.id) {
      updateResearchTargetMutation.mutate({
        id: formData.id,
        researchTarget: formData
      })
    } else {
      createResearchTargetMutation.mutate(formData)
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
      researchTarget,
      isLoading
    },
    handleChange,
    handleSubmit,
    handleReset,
    refetch
  }
}
