import { ChangeEvent, FormEvent, useState } from 'react'
import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query'
import { TypeAcademicActivityFormData, ACT_OPTIONS, ACTIVITY_TYPE_OPTIONS, ORGANIZATION_OPTIONS } from '@shared/types'

export default function useAcademicActivityLogMutation(_queryClient?: QueryClient) {
  const queryClient = _queryClient || useQueryClient()
  const [formData, setFormData] = useState<TypeAcademicActivityFormData>({
    act: ACT_OPTIONS[0],
    activityName: '',
    activityType: ACTIVITY_TYPE_OPTIONS[0],
    activityDate: '',
    organization: ORGANIZATION_OPTIONS[0],
    sessionName: '',
    creditTime: 0,
    usable: true
  });

  const isValidateForm = (formData: TypeAcademicActivityFormData): boolean => {
    return (
      !!formData.act &&
      !!formData.activityName &&
      !!formData.activityType &&
      !!formData.activityDate &&
      !!formData.organization &&
      !!formData.sessionName
    )
  }

  const createAcademicActivityLogMutation = useMutation({
    mutationFn: (log: TypeAcademicActivityFormData) => window.db.createAcademicActivityLog(log),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['AcademicActivityLog'] }),
  })

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isValidateForm(formData)) {
      return;
    }
    createAcademicActivityLogMutation.mutate(formData);

    // Reset form after submission
    setFormData({
      act: ACT_OPTIONS[0],
      activityName: '',
      activityType: ACTIVITY_TYPE_OPTIONS[0],
      activityDate: '',
      organization: ORGANIZATION_OPTIONS[0],
      sessionName: '',
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
