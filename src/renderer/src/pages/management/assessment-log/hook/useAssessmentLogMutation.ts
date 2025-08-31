import { ChangeEvent, FormEvent, useState } from 'react'
import { QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { RESEARCH_TYPE_OPTIONS, TypeAssessmentFormData } from '../../../../../../shared/types'
import { AssessmentLogQueryParams, SortOrder } from '../../../../../../shared/types/db'

export default function useAssessmentLogMutation(_queryClient?: QueryClient) {

  const queryClient = _queryClient || useQueryClient()
  const [formData, setFormData] = useState<TypeAssessmentFormData>({
    clientName: '',
    age: 0,
    gender: '',
    dx: '',
    researchType: RESEARCH_TYPE_OPTIONS[0],
    researchDate: '',
    creditTime: 0,
    usable: true
  });

  const [queryParams, setQueryParams] = useState<AssessmentLogQueryParams>({});

  const isValidateForm = (formData: TypeAssessmentFormData): boolean => {
    return !!formData.gender
  }

  const { data: assessmentLog, isLoading, isError } = useQuery({
    queryKey: ['AssessmentLog', queryParams],
    queryFn: () => window.db.getAssessmentLogs(queryParams),
  })

  const createAssessmentLogMutation = useMutation({
    mutationFn: (log: TypeAssessmentFormData) => window.db.createAssessmentLog(log),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['AssessmentLog', queryParams] }),
  })

  const updateAssessmentLogMutation = useMutation({
    mutationFn: (data: { id: number, data: TypeAssessmentFormData }) =>
      window.db.updateAssessmentLog(data.id, data.data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['AssessmentLog', queryParams] }),
  })

  const deleteAssessmentLogMutation = useMutation({
    mutationFn: (id: number) => window.db.deleteAssessmentLog(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['AssessmentLog', queryParams] }),
  })

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isValidateForm(formData)) {
      return;
    }
    createAssessmentLogMutation.mutate(formData);
  };

  const handleChange =
    (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
  {
    const { name, value, type } = e.target;

    if (type === 'checkbox') {
      const { checked } = e.target as HTMLInputElement;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else if (type === 'number') {
      // 숫자 입력의 경우, 빈 문자열일 때 0으로 처리하여 number 타입 일관성을 유지합니다.
      setFormData((prev) => ({ ...prev, [name]: value === '' ? 0 : parseInt(value, 10) }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const deleteLog = (id: number) => {
    deleteAssessmentLogMutation.mutate(id)
  }

  const updateLog = (id: number, data: TypeAssessmentFormData) => {
    updateAssessmentLogMutation.mutate({ id, data })
  }

  // Function to set sorting parameters
  const setSorting = (field: string, order: SortOrder) => {
    setQueryParams(prev => ({
      ...prev,
      sort: { field, order }
    }))
  }

  // Function to set search/filter parameters
  const setSearch = (field: string, value: string | number | boolean | Date) => {
    setQueryParams(prev => ({
      ...prev,
      search: { field, value }
    }))
  }

  // Function to clear all query parameters
  const clearQueryParams = () => {
    setQueryParams({})
  }

  return {
    forms: {
      formData,
      setFormData,
    },
    data: {
      assessmentLog,
      isError,
      isLoading,
    },
    query: {
      params: queryParams,
      setSorting,
      setSearch,
      clearQueryParams
    },
    handleChange,
    handleSubmit,
    deleteLog,
    updateLog,
  }
}
