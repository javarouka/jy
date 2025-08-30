import { ChangeEvent, FormEvent, useState } from 'react'
import { QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { RESEARCH_TYPE_OPTIONS, TypeAssessmentFormData } from '../../../../../../shared/types'


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

  const { data: assessmentLog, isLoading, isError } = useQuery({
    queryKey: ['AssessmentLog'],
    queryFn: () => window.db.getAssessmentLogs(),
  })

  const createAssessmentLogMutation = useMutation({
    mutationFn: (log: TypeAssessmentFormData) => window.db.createAssessmentLog(log),
    onSuccess: () => {
      // 성공 시 'tasks' 쿼리를 무효화시켜 자동으로 다시 불러오게 함
      queryClient.invalidateQueries({ queryKey: ['AssessmentLog'] })
    },
  })

  const updateAssessmentLogMutation = useMutation({
    mutationFn: (data: { id: number, data: TypeAssessmentFormData }) =>
      window.db.updateAssessmentLog(data.id, data.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['AssessmentLog'] })
    },
  })

  const deleteAssessmentLogMutation = useMutation({
    mutationFn: (id: number) => window.db.deleteAssessmentLog(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['AssessmentLog'] })
    },
  })

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.gender) {
      alert('성별을 선택해주세요.');
      return;
    }
    console.log('제출할 데이터:', formData);
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
    handleChange,
    handleSubmit,
    deleteLog,
    updateLog,
  }
}
