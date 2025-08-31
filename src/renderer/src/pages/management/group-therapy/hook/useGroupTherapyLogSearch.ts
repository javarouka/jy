import { ChangeEvent, useState } from 'react'
import {
  GroupTherapyLogQueryParams,
  DateRangeParams,
  GroupTherapyLikeSearchParams,
  GroupTherapyRangeParams,
  SortOrder
} from '@shared/types/db'
import { QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { TypeGroupTherapyFormData } from '@shared/types'

// Type definition for search form data
type GroupTherapySearchFormData = {
  groupName: string
  therapyType: string
  sessionCountMin: string
  sessionCountMax: string
  prepareTimeMin: string
  prepareTimeMax: string
  sessionTimeMin: string
  sessionTimeMax: string
  supervisionTimeMin: string
  supervisionTimeMax: string
  startDate: string
  endDate: string
  researchDateStart: string
  researchDateEnd: string
}

// Initial state for search form
const initialSearchFormData: GroupTherapySearchFormData = {
  groupName: '',
  therapyType: '',
  sessionCountMin: '',
  sessionCountMax: '',
  prepareTimeMin: '',
  prepareTimeMax: '',
  sessionTimeMin: '',
  sessionTimeMax: '',
  supervisionTimeMin: '',
  supervisionTimeMax: '',
  startDate: '',
  endDate: '',
  researchDateStart: '',
  researchDateEnd: ''
}

export default function useGroupTherapyLogSearch(_queryClient?: QueryClient) {
  const queryClient = _queryClient || useQueryClient()

  // ===== State Management =====
  const [searchFormData, setSearchFormData] = useState<GroupTherapySearchFormData>(initialSearchFormData)
  const [queryParams, setQueryParams] = useState<GroupTherapyLogQueryParams>({})

  // ===== Data Fetching =====
  const { data: groupTherapyLog, isLoading, isError } = useQuery({
    queryKey: ['GroupTherapyLog', queryParams],
    queryFn: () => window.db.getGroupTherapyLogs(queryParams),
  })

  // ===== Form Handling =====
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setSearchFormData(prev => ({ ...prev, [name]: value }))
  }

  // ===== Search Functions =====

  // Helper function to build like search parameters
  const buildLikeSearchParams = (): GroupTherapyLikeSearchParams | undefined => {
    const params: GroupTherapyLikeSearchParams = {}

    if (searchFormData.groupName) params.groupName = searchFormData.groupName
    if (searchFormData.therapyType) params.therapyType = searchFormData.therapyType

    return Object.keys(params).length > 0 ? params : undefined
  }

  // Helper function to build date range parameters
  const buildDateRangeParams = (): DateRangeParams | undefined => {
    const params: DateRangeParams = {}

    if (searchFormData.startDate) params.startDate = searchFormData.startDate
    if (searchFormData.endDate) params.endDate = searchFormData.endDate

    return Object.keys(params).length > 0 ? params : undefined
  }

  // Helper function to build research date range parameters
  const buildResearchDateRangeParams = (): DateRangeParams | undefined => {
    const params: DateRangeParams = {}

    if (searchFormData.researchDateStart) params.startDate = searchFormData.researchDateStart
    if (searchFormData.researchDateEnd) params.endDate = searchFormData.researchDateEnd

    return Object.keys(params).length > 0 ? params : undefined
  }

  // Helper function to build range search parameters
  const buildRangeSearchParams = (): GroupTherapyRangeParams | undefined => {
    const params: GroupTherapyRangeParams = {}

    // Add session count range if either min or max is provided
    if (searchFormData.sessionCountMin || searchFormData.sessionCountMax) {
      params.sessionCount = {}
      if (searchFormData.sessionCountMin) params.sessionCount.min = parseInt(searchFormData.sessionCountMin)
      if (searchFormData.sessionCountMax) params.sessionCount.max = parseInt(searchFormData.sessionCountMax)
    }

    // Add prepare time range if either min or max is provided
    if (searchFormData.prepareTimeMin || searchFormData.prepareTimeMax) {
      params.prepareTime = {}
      if (searchFormData.prepareTimeMin) params.prepareTime.min = parseInt(searchFormData.prepareTimeMin)
      if (searchFormData.prepareTimeMax) params.prepareTime.max = parseInt(searchFormData.prepareTimeMax)
    }

    // Add session time range if either min or max is provided
    if (searchFormData.sessionTimeMin || searchFormData.sessionTimeMax) {
      params.sessionTime = {}
      if (searchFormData.sessionTimeMin) params.sessionTime.min = parseInt(searchFormData.sessionTimeMin)
      if (searchFormData.sessionTimeMax) params.sessionTime.max = parseInt(searchFormData.sessionTimeMax)
    }

    // Add supervision time range if either min or max is provided
    if (searchFormData.supervisionTimeMin || searchFormData.supervisionTimeMax) {
      params.supervisionTime = {}
      if (searchFormData.supervisionTimeMin) params.supervisionTime.min = parseInt(searchFormData.supervisionTimeMin)
      if (searchFormData.supervisionTimeMax) params.supervisionTime.max = parseInt(searchFormData.supervisionTimeMax)
    }

    return Object.keys(params).length > 0 ? params : undefined
  }

  // Apply search filters and update query parameters
  const applySearch = () => {
    const newParams: GroupTherapyLogQueryParams = {
      likeSearch: buildLikeSearchParams(),
      dateRange: buildDateRangeParams(),
      researchDateRange: buildResearchDateRangeParams(),
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
  const updateGroupTherapyLogMutation = useMutation({
    mutationFn: (data: { id: number, data: TypeGroupTherapyFormData }) =>
      window.db.updateGroupTherapyLog(data.id, data.data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['GroupTherapyLog'] }),
  })

  const deleteGroupTherapyLogMutation = useMutation({
    mutationFn: (id: number) => window.db.deleteGroupTherapyLog(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['GroupTherapyLog'] }),
  })

  const deleteLog = (id: number) => {
    deleteGroupTherapyLogMutation.mutate(id)
  }

  const updateLog = (id: number, data: TypeGroupTherapyFormData) => {
    updateGroupTherapyLogMutation.mutate({ id, data })
  }

  // ===== Sorting Functions =====
  const setSorting = (field: string, order: SortOrder) => {
    setQueryParams(prev => ({
      ...prev,
      sort: { field, order }
    }))
  }

  // Update query parameters from external source
  const updateQueryParams = (newParams: GroupTherapyLogQueryParams) => {
    setQueryParams(newParams)
  }

  return {
    data: {
      groupTherapyLog: groupTherapyLog || [],
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
