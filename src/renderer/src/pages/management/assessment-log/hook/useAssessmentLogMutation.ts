import { ChangeEvent, FormEvent, useState } from 'react'
import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query'
import { RESEARCH_TYPE_OPTIONS, TypeAssessmentFormData } from '@shared/types'

export default function useAssessmentLogMutation(_queryClient?: QueryClient) {

  const queryClient = _queryClient || useQueryClient()
  const [formData, setFormData] = useState<TypeAssessmentFormData>({
    clientName: '',
    age: 0,
    gender: '',
    dx: '',
    researchType: RESEARCH_TYPE_OPTIONS[0],
    researchDate: '',
    etcDescription: '',
    creditTime: 0
  });

  const isValidateForm = (formData: TypeAssessmentFormData): boolean => {
    // 기본 유효성 검사
    if (!formData.gender) {
      return false
    }

    // researchType이 '기타'인 경우 etcDescription이 필수
    return !(formData.researchType === '기타' && !formData.etcDescription.trim());
  }

  const createAssessmentLogMutation = useMutation({
    mutationFn: (log: TypeAssessmentFormData) => {
      return window.db.createAssessmentLog(log)
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['AssessmentLog'] }),
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

  return {
    forms: {
      formData,
      setFormData
    },
    handleChange,
    handleSubmit,
  }
}
