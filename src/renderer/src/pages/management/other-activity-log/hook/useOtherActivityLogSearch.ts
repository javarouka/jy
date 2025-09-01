import { QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  OtherActivityLikeSearchParams,
  OtherActivityLogQueryParams,
  OtherActivityRangeParams,
  DateRangeParams,
  SearchParams,
  SortOrder
} from '@shared/types/db'
import { ChangeEvent, useState } from 'react'
import { TypeOtherActivityFormData } from '@shared/types'

// Type definition for search form data
type OtherActivityLogSearchFormData = {
  activitySummary: string
  activityType: string
  creditTimeMin: string
  creditTimeMax: string
  startDateStart: string
  startDateEnd: string
  endDateStart: string
  endDateEnd: string
}

// Initial state for search form
const initialSearchFormData: OtherActivityLogSearchFormData = {
  activitySummary: '',
  activityType: '',
  creditTimeMin: '',
  creditTimeMax: '',
  startDateStart: '',
  startDateEnd: '',
  endDateStart: '',
  endDateEnd: ''
}

export default function useOtherActivityLogSearch(_queryClient?: QueryClient) {
  const queryClient = _queryClient || useQueryClient()
  // ===== State Management =====
  const [searchFormData, setSearchFormData] = useState<OtherActivityLogSearchFormData>(initialSearchFormData)
  const [queryParams, setQueryParams] = useState<OtherActivityLogQueryParams>({})

  // ===== Data Fetching =====
  const { data: log, isLoading, isError } = useQuery({
    queryKey: ['OtherActivityLog', queryParams],
    queryFn: () => window.db.getOtherActivityLogs(queryParams),
  })

  // ===== Form Handling =====
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setSearchFormData(prev => ({ ...prev, [name]: value }))
  }

  // ===== Search Functions =====

  // Helper function to build like search parameters
  const buildLikeSearchParams = (): OtherActivityLikeSearchParams | undefined => {
    const params: OtherActivityLikeSearchParams = {}

    if (searchFormData.activitySummary) params.activitySummary = searchFormData.activitySummary

    return Object.keys(params).length > 0 ? params : undefined
  }

  // Helper function to build exact search parameters
  const buildExactSearchParams = (): SearchParams | undefined => {
    if (searchFormData.activityType) {
      return { field: 'activityType', value: searchFormData.activityType }
    }
    return undefined
  }

  // Helper function to build range search parameters
  const buildRangeSearchParams = (): OtherActivityRangeParams | undefined => {
    const params: OtherActivityRangeParams = {}

    if (searchFormData.creditTimeMin || searchFormData.creditTimeMax) {
      params.creditTime = {}
      if (searchFormData.creditTimeMin) params.creditTime.min = parseInt(searchFormData.creditTimeMin)
      if (searchFormData.creditTimeMax) params.creditTime.max = parseInt(searchFormData.creditTimeMax)
    }

    return Object.keys(params).length > 0 ? params : undefined
  }

  // Helper function to build date range parameters
  const buildDateRangeParams = (): DateRangeParams | undefined => {
    const params: DateRangeParams = {}

    // For startDate field
    if (searchFormData.startDateStart) params.startDate = searchFormData.startDateStart
    if (searchFormData.startDateEnd) params.endDate = searchFormData.startDateEnd

    // For endDate field, we'll handle this in the main process

    return Object.keys(params).length > 0 ? params : undefined
  }

  // Apply search filters and update query parameters
  const applySearch = () => {
    const newParams: OtherActivityLogQueryParams = {
      likeSearch: buildLikeSearchParams(),
      search: buildExactSearchParams(),
      rangeSearch: buildRangeSearchParams(),
      dateRange: buildDateRangeParams()
    }

    // Preserve sort parameter if it exists
    if (queryParams.sort) {
      newParams.sort = queryParams.sort
    }

    setQueryParams(newParams)
    return newParams
  }

  // Clear all search parameters and reset form
  const clearQueryParams = () => {
    setQueryParams({})
    setSearchFormData(initialSearchFormData)
    return {}
  }

  // ===== Mutation Functions =====
  const updateOtherActivityLogMutation = useMutation({
    mutationFn: (data: { id: number, data: TypeOtherActivityFormData }) =>
      window.db.updateOtherActivityLog(data.id, data.data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['OtherActivityLog'] }),
  })

  const deleteOtherActivityLogMutation = useMutation({
    mutationFn: (id: number) => window.db.deleteOtherActivityLog(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['OtherActivityLog'] }),
  })

  const deleteLog = (id: number) => {
    deleteOtherActivityLogMutation.mutate(id)
  }

  const updateLog = (id: number, data: TypeOtherActivityFormData) => {
    updateOtherActivityLogMutation.mutate({ id, data })
  }

  // ===== Sorting Functions =====
  const setSorting = (field: string, order: SortOrder) => {
    setQueryParams(prev => ({
      ...prev,
      sort: { field, order }
    }))
  }

  // Update query parameters from external source
  const updateQueryParams = (newParams: OtherActivityLogQueryParams) => {
    setQueryParams(newParams)
  }

  return {
    data: {
      log: log || [],
      isError,
      isLoading,
    },
    query: {
      setSorting,
      updateQueryParams
    },
    searchFormData,
    queryParams,
    handleSearchChange,
    applySearch,
    clearQueryParams,
    deleteLog,
    updateLog,
  }
}
