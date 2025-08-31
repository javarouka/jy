import { ChangeEvent, FormEvent, useState } from 'react'
import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query'
import { THERAPY_TYPE_OPTIONS, TypeIndividualTherapyFormData } from '@shared/types'

export default function useIndividualTherapyLogMutation(_queryClient?: QueryClient) {

  const queryClient = _queryClient || useQueryClient()
  const [formData, setFormData] = useState<TypeIndividualTherapyFormData>({
    clientName: '',
    age: 0,
    gender: '',
    therapyType: THERAPY_TYPE_OPTIONS[0],
    researchDate: '',
    sessionCount: 0,
    prepareTime: 0,
    sessionTime: 0,
    supervisionTime: 0,
    startDate: '',
    endDate: '',
    usable: true
  });

  const isValidateForm = (formData: TypeIndividualTherapyFormData): boolean => {
    return !!formData.gender
  }

  const createIndividualTherapyLogMutation = useMutation({
    mutationFn: (log: TypeIndividualTherapyFormData) => window.db.createIndividualTherapyLog(log),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['IndividualTherapyLog'] }),
  })

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isValidateForm(formData)) {
      return;
    }
    createIndividualTherapyLogMutation.mutate(formData);
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
