type TypeTrainingYear = {
  name: string
  startDate: string
  endDate: string
  targetHours: number
}

export const TRAINING_YEARS: TypeTrainingYear[] = [
  { name: '1년차', startDate: '2023-03-01', endDate: '2024-02-29', targetHours: 1000 },
  { name: '2년차', startDate: '2024-03-01', endDate: '2025-02-28', targetHours: 1000 },
  { name: '3년차', startDate: '2025-03-01', endDate: '2026-02-28', targetHours: 1000 },
]
