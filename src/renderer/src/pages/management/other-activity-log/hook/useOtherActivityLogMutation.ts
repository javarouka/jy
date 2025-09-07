import { ChangeEvent, FormEvent, useState } from 'react'
import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query'
import { TypeOtherActivityFormData } from '@shared/types'
import { OTHER_ACTIVITY_TYPE_OPTIONS } from '@shared/constants'

export default function useOtherActivityLogMutation(_queryClient?: QueryClient) {
  const queryClient = _queryClient || useQueryClient()
  const [formData, setFormData] = useState<TypeOtherActivityFormData>({
    activitySummary: '',
    activityType: OTHER_ACTIVITY_TYPE_OPTIONS[0].id,
    startDate: '',
    endDate: '',
    creditTime: 0,
    usable: true
  });

  const isValidateForm = (formData: TypeOtherActivityFormData): boolean => {
    return (
      !!formData.activitySummary &&
      !!formData.activityType &&
      !!formData.startDate &&
      !!formData.endDate &&
      formData.creditTime > 0
    )
  }

  const createOtherActivityLogMutation = useMutation({
    mutationFn: (log: TypeOtherActivityFormData) => window.db.createOtherActivityLog(log),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['OtherActivityLog'] }),
  })

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isValidateForm(formData)) {
      return;
    }
    createOtherActivityLogMutation.mutate(formData);

    // Reset form after submission
    setFormData({
      activitySummary: '',
      activityType: OTHER_ACTIVITY_TYPE_OPTIONS[0].id,
      startDate: '',
      endDate: '',
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
