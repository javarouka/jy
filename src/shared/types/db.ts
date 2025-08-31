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

// Extended search params for AssessmentLog
export interface LikeSearchParams {
  clientName?: string
  dx?: string
  researchType?: string
}

export interface DateRangeParams {
  startDate?: string
  endDate?: string
}

export interface AssessmentLogQueryParams {
  sort?: SortParams
  search?: SearchParams
  likeSearch?: LikeSearchParams
  dateRange?: DateRangeParams
}
