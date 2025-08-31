// Define types for query parameters
export type SortOrder = 'asc' | 'desc'

export interface SortParams {
  field: string
  order: SortOrder
}

export interface SearchParams {
  field: string
  value: string | number | boolean | Date
}

export interface AssessmentLogQueryParams {
  sort?: SortParams
  search?: SearchParams
}
