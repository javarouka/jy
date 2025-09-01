import { ChangeEvent, FormEvent, useState } from 'react'
import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query'
import { TypeResearchFormData, PARTICIPATE_TYPE_OPTIONS } from '@shared/types'

export default function useResearchLogMutation(_queryClient?: QueryClient) {
  const queryClient = _queryClient || useQueryClient()
  const [formData, setFormData] = useState<TypeResearchFormData>({
    publishDate: '',
    pagerName: '',
    journalName: '',
    participateType: PARTICIPATE_TYPE_OPTIONS[0],
    creditTime: 0,
    usable: true
  });

  const isValidateForm = (formData: TypeResearchFormData): boolean => {
    return (
      !!formData.publishDate &&
      !!formData.pagerName &&
      !!formData.journalName &&
      !!formData.participateType
    )
  }

  const createResearchLogMutation = useMutation({
    mutationFn: (log: TypeResearchFormData) => window.db.createResearchLog(log),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['ResearchLog'] }),
  })

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isValidateForm(formData)) {
      return;
    }
    createResearchLogMutation.mutate(formData);

    // Reset form after submission
    setFormData({
      publishDate: '',
      pagerName: '',
      journalName: '',
      participateType: PARTICIPATE_TYPE_OPTIONS[0],
      creditTime: 0,
      usable: true
    });
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
