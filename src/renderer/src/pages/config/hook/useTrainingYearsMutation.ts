import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

type TrainingYearFormData = {
  id?: number
  name: string
  startDate: string
  endDate: string
  targetHours: number
}

export default function useTrainingYearsMutation(_queryClient?: QueryClient) {
  const queryClient = _queryClient || useQueryClient()
  const [formData, setFormData] = useState<TrainingYearFormData>({
    name: '',
    startDate: '',
    endDate: '',
    targetHours: 1000
  })
  const [editMode, setEditMode] = useState(false)
  const [trainingYears, setTrainingYears] = useState<any[]>([])

  // Fetch training years
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['TrainingYears'],
    queryFn: () => window.db.getTrainingYears()
  })

  useEffect(() => {
    if (data) {
      setTrainingYears(data)
    }
  }, [data])

  const resetForm = () => {
    setFormData({
      name: '',
      startDate: '',
      endDate: '',
      targetHours: 1000
    })
    setEditMode(false)
  }

  const isValidForm = (formData: TrainingYearFormData): boolean => {
    return (
      !!formData.name &&
      !!formData.startDate &&
      !!formData.endDate &&
      formData.targetHours > 0
    )
  }

  const createTrainingYearMutation = useMutation({
    mutationFn: (trainingYear: TrainingYearFormData) => {
      return window.db.createTrainingYear(trainingYear)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['TrainingYears'] })
      resetForm()
    }
  })

  const updateTrainingYearMutation = useMutation({
    mutationFn: ({ id, trainingYear }: { id: number; trainingYear: TrainingYearFormData }) => {
      return window.db.updateTrainingYear(id, trainingYear)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['TrainingYears'] })
      resetForm()
    }
  })

  const deleteTrainingYearMutation = useMutation({
    mutationFn: (id: number) => {
      return window.db.deleteTrainingYear(id)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['TrainingYears'] })
    }
  })

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!isValidForm(formData)) {
      return
    }

    if (editMode && formData.id) {
      updateTrainingYearMutation.mutate({
        id: formData.id,
        trainingYear: formData
      })
    } else {
      createTrainingYearMutation.mutate(formData)
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

  const handleEdit = (trainingYear: any) => {
    setFormData({
      id: trainingYear.id,
      name: trainingYear.name,
      startDate: new Date(trainingYear.startDate).toISOString().split('T')[0],
      endDate: new Date(trainingYear.endDate).toISOString().split('T')[0],
      targetHours: trainingYear.targetHours
    })
    setEditMode(true)
  }

  const handleDelete = (id: number) => {
    if (window.confirm('정말로 이 수련 연차를 삭제하시겠습니까?')) {
      deleteTrainingYearMutation.mutate(id)
    }
  }

  const handleCancel = () => {
    resetForm()
  }

  return {
    forms: {
      formData,
      setFormData,
      editMode,
      trainingYears,
      isLoading
    },
    handleChange,
    handleSubmit,
    handleEdit,
    handleDelete,
    handleCancel,
    refetch
  }
}
