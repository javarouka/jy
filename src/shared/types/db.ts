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

// Extended search params for IndividualTherapyLog
export interface IndividualTherapyLikeSearchParams {
  clientName?: string
  therapyType?: string
}

export interface IndividualTherapyRangeParams {
  sessionCount?: {
    min?: number
    max?: number
  }
  prepareTime?: {
    min?: number
    max?: number
  }
  sessionTime?: {
    min?: number
    max?: number
  }
  supervisionTime?: {
    min?: number
    max?: number
  }
}

export interface IndividualTherapyLogQueryParams {
  sort?: SortParams
  search?: SearchParams
  likeSearch?: IndividualTherapyLikeSearchParams
  rangeSearch?: IndividualTherapyRangeParams
  dateRange?: DateRangeParams
  researchDateRange?: DateRangeParams
}

// Extended search params for GroupTherapyLog
export interface GroupTherapyLikeSearchParams {
  groupName?: string
  therapyType?: string
}

export interface GroupTherapyRangeParams {
  sessionCount?: {
    min?: number
    max?: number
  }
  prepareTime?: {
    min?: number
    max?: number
  }
  sessionTime?: {
    min?: number
    max?: number
  }
  supervisionTime?: {
    min?: number
    max?: number
  }
}

export interface GroupTherapyLogQueryParams {
  sort?: SortParams
  search?: SearchParams
  likeSearch?: GroupTherapyLikeSearchParams
  rangeSearch?: GroupTherapyRangeParams
  dateRange?: DateRangeParams
}
