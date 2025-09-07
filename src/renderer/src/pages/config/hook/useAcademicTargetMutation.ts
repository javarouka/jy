import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { AcademicTarget } from '@renderer/data/TrainingYears'

type AcademicTargetFormData = {
  id?: number
  ethicsEducationJoinCount: number
  caseConferencePresentationCount: number
  thesisPresentationCount: number
  academicConferenceJoinMinutes: number
  caseConferenceJoinMinutes: number
}

export default function useAcademicTargetMutation(_queryClient?: QueryClient) {
  const queryClient = _queryClient || useQueryClient()
  const [formData, setFormData] = useState<AcademicTargetFormData>({
    ethicsEducationJoinCount: AcademicTarget.ethicsEducationJoinCount,
    caseConferencePresentationCount: AcademicTarget.caseConferencePresentationCount,
    thesisPresentationCount: AcademicTarget.thesisPresentationCount,
    academicConferenceJoinMinutes: AcademicTarget.academicConferenceJoinMinutes,
    caseConferenceJoinMinutes: AcademicTarget.caseConferenceJoinMinutes
  })
  const [editMode, setEditMode] = useState(false)
  const [academicTarget, setAcademicTarget] = useState<any>(null)

  // Fetch academic target
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['AcademicTarget'],
    queryFn: () => window.db.getAcademicTarget()
  })

  useEffect(() => {
    if (data) {
      setAcademicTarget(data)
      // If we have data, set the form data to the current values
      if (data.id) {
        setFormData({
          id: data.id,
          ethicsEducationJoinCount: data.ethicsEducationJoinCount,
          caseConferencePresentationCount: data.caseConferencePresentationCount,
          thesisPresentationCount: data.thesisPresentationCount,
          academicConferenceJoinMinutes: data.academicConferenceJoinMinutes,
          caseConferenceJoinMinutes: data.caseConferenceJoinMinutes
        })
        setEditMode(true)
      }
    }
  }, [data])

  // Reset form to default values from TrainingYears.ts
  const resetToDefaults = () => {
    if (academicTarget && academicTarget.id) {
      // If we have an existing record, update it with default values
      setFormData({
        id: academicTarget.id,
        ethicsEducationJoinCount: AcademicTarget.ethicsEducationJoinCount,
        caseConferencePresentationCount: AcademicTarget.caseConferencePresentationCount,
        thesisPresentationCount: AcademicTarget.thesisPresentationCount,
        academicConferenceJoinMinutes: AcademicTarget.academicConferenceJoinMinutes,
        caseConferenceJoinMinutes: AcademicTarget.caseConferenceJoinMinutes
      })
    } else {
      // Otherwise just set the form to default values
      setFormData({
        ethicsEducationJoinCount: AcademicTarget.ethicsEducationJoinCount,
        caseConferencePresentationCount: AcademicTarget.caseConferencePresentationCount,
        thesisPresentationCount: AcademicTarget.thesisPresentationCount,
        academicConferenceJoinMinutes: AcademicTarget.academicConferenceJoinMinutes,
        caseConferenceJoinMinutes: AcademicTarget.caseConferenceJoinMinutes
      })
    }
  }

  const isValidForm = (formData: AcademicTargetFormData): boolean => {
    return (
      formData.ethicsEducationJoinCount >= 0 &&
      formData.caseConferencePresentationCount >= 0 &&
      formData.thesisPresentationCount >= 0 &&
      formData.academicConferenceJoinMinutes >= 0 &&
      formData.caseConferenceJoinMinutes >= 0
    )
  }

  const createAcademicTargetMutation = useMutation({
    mutationFn: (academicTarget: AcademicTargetFormData) => {
      return window.db.createAcademicTarget(academicTarget)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['AcademicTarget'] })
      refetch()
    }
  })

  const updateAcademicTargetMutation = useMutation({
    mutationFn: ({ id, academicTarget }: { id: number; academicTarget: AcademicTargetFormData }) => {
      return window.db.updateAcademicTarget(id, academicTarget)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['AcademicTarget'] })
      refetch()
    }
  })

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!isValidForm(formData)) {
      return
    }

    if (editMode && formData.id) {
      updateAcademicTargetMutation.mutate({
        id: formData.id,
        academicTarget: formData
      })
    } else {
      createAcademicTargetMutation.mutate(formData)
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
      academicTarget,
      isLoading
    },
    handleChange,
    handleSubmit,
    handleReset,
    refetch
  }
}
