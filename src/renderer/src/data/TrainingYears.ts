type TypeTrainingYear = {
  name: string
  startDate: string
  endDate: string
  targetHours: number
}

export const TRAINING_YEARS: TypeTrainingYear[] = [
  { name: '1년차', startDate: '2023-01-01', endDate: '2023-12-31', targetHours: 1000 },
  { name: '2년차', startDate: '2024-01-01', endDate: '2024-12-31', targetHours: 1000 },
  { name: '3년차', startDate: '2025-01-01', endDate: '2025-12-31', targetHours: 1000 },
]
