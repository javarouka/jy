import { QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  AcademicActivityLikeSearchParams,
  AcademicActivityLogQueryParams,
  AcademicActivityRangeParams,
  DateRangeParams,
  SearchParams,
  SortOrder
} from '@shared/types/db'
import { ChangeEvent, useState } from 'react'
import { TypeAcademicActivityFormData } from '@shared/types'

// Type definition for search form data
type AcademicActivityLogSearchFormData = {
  act: string
  activityType: string
  activityName: string
  sessionName: string
  organization: string
  creditTimeMin: string
  creditTimeMax: string
  startDate: string
  endDate: string
  activityDateStart: string
  activityDateEnd: string
}

// Initial state for search form
const initialSearchFormData: AcademicActivityLogSearchFormData = {
  act: '',
  activityType: '',
  activityName: '',
  sessionName: '',
  organization: '',
  creditTimeMin: '',
  creditTimeMax: '',
  startDate: '',
  endDate: '',
  activityDateStart: '',
  activityDateEnd: ''
}

export default function useAcademicActivityLogSearch(_queryClient?: QueryClient) {
  const queryClient = _queryClient || useQueryClient()
  // ===== State Management =====
  const [searchFormData, setSearchFormData] = useState<AcademicActivityLogSearchFormData>(initialSearchFormData)
  const [queryParams, setQueryParams] = useState<AcademicActivityLogQueryParams>({})

  // ===== Data Fetching =====
  const { data: log, isLoading, isError } = useQuery({
    queryKey: ['AcademicActivityLog', queryParams],
    queryFn: () => window.db.getAcademicActivityLogs(queryParams),
  })

  // ===== Form Handling =====
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setSearchFormData(prev => ({ ...prev, [name]: value }))
  }

  // ===== Search Functions =====

  // Helper function to build like search parameters
  const buildLikeSearchParams = (): AcademicActivityLikeSearchParams | undefined => {
    const params: AcademicActivityLikeSearchParams = {}

    if (searchFormData.activityName) params.activityName = searchFormData.activityName
    if (searchFormData.sessionName) params.sessionName = searchFormData.sessionName

    return Object.keys(params).length > 0 ? params : undefined
  }

  // Helper function to build exact search parameters
  const buildExactSearchParams = (): SearchParams | undefined => {
    if (searchFormData.act) {
      return { field: 'act', value: searchFormData.act }
    }
    if (searchFormData.activityType) {
      return { field: 'activityType', value: searchFormData.activityType }
    }
    if (searchFormData.organization) {
      return { field: 'organization', value: searchFormData.organization }
    }
    return undefined
  }

  // // Helper function to build date range parameters
  // const buildDateRangeParams = (): DateRangeParams | undefined => {
  //   const params: DateRangeParams = {}
  //
  //   if (searchFormData.startDate) params.startDate = searchFormData.startDate
  //   if (searchFormData.endDate) params.endDate = searchFormData.endDate
  //
  //   return Object.keys(params).length > 0 ? params : undefined
  // }

  // Helper function to build activity date range parameters
  const buildActivityDateRangeParams = (): DateRangeParams | undefined => {
    const params: DateRangeParams = {}

    if (searchFormData.activityDateStart) params.startDate = searchFormData.activityDateStart
    if (searchFormData.activityDateEnd) params.endDate = searchFormData.activityDateEnd

    return Object.keys(params).length > 0 ? params : undefined
  }

  const buildRangeSearchParams = (): AcademicActivityRangeParams | undefined => {
    const params: AcademicActivityRangeParams = {}
    if (searchFormData.creditTimeMin || searchFormData.creditTimeMax) {
      params.creditTime = {}
      if (searchFormData.creditTimeMin) params.creditTime.min = parseInt(searchFormData.creditTimeMin)
      if (searchFormData.creditTimeMax) params.creditTime.max = parseInt(searchFormData.creditTimeMax)
    }
    return Object.keys(params).length > 0 ? params : undefined
  }

  // Apply search filters and update query parameters
  const applySearch = () => {
    const newParams: AcademicActivityLogQueryParams = {
      likeSearch: buildLikeSearchParams(),
      search: buildExactSearchParams(),
      dateRange: buildActivityDateRangeParams(),
      rangeSearch: buildRangeSearchParams()
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
  const updateAcademicActivityLogMutation = useMutation({
    mutationFn: (data: { id: number, data: TypeAcademicActivityFormData }) =>
      window.db.updateAcademicActivityLog(data.id, data.data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['AcademicActivityLog'] }),
  })

  const deleteAcademicActivityLogMutation = useMutation({
    mutationFn: (id: number) => window.db.deleteAcademicActivityLog(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['AcademicActivityLog'] }),
  })

  const deleteLog = (id: number) => {
    deleteAcademicActivityLogMutation.mutate(id)
  }

  const updateLog = (id: number, data: TypeAcademicActivityFormData) => {
    updateAcademicActivityLogMutation.mutate({ id, data })
  }

  // ===== Sorting Functions =====
  const setSorting = (field: string, order: SortOrder) => {
    setQueryParams(prev => ({
      ...prev,
      sort: { field, order }
    }))
  }

  // Update query parameters from external source
  const updateQueryParams = (newParams: AcademicActivityLogQueryParams) => {
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
