import { QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  ResearchLikeSearchParams,
  ResearchLogQueryParams,
  DateRangeParams,
  SearchParams,
  SortOrder
} from '@shared/types/db'
import { ChangeEvent, useState } from 'react'
import { TypeResearchFormData } from '@shared/types'

// Type definition for search form data
type ResearchLogSearchFormData = {
  pagerName: string
  journalName: string
  participateType: string
  publishDateStart: string
  publishDateEnd: string
}

// Initial state for search form
const initialSearchFormData: ResearchLogSearchFormData = {
  pagerName: '',
  journalName: '',
  participateType: '',
  publishDateStart: '',
  publishDateEnd: ''
}

export default function useResearchLogSearch(_queryClient?: QueryClient) {
  const queryClient = _queryClient || useQueryClient()
  // ===== State Management =====
  const [searchFormData, setSearchFormData] = useState<ResearchLogSearchFormData>(initialSearchFormData)
  const [queryParams, setQueryParams] = useState<ResearchLogQueryParams>({})

  // ===== Data Fetching =====
  const { data: log, isLoading, isError } = useQuery({
    queryKey: ['ResearchLog', queryParams],
    queryFn: () => window.db.getResearchLogs(queryParams),
  })

  // ===== Form Handling =====
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setSearchFormData(prev => ({ ...prev, [name]: value }))
  }

  // ===== Search Functions =====

  // Helper function to build like search parameters
  const buildLikeSearchParams = (): ResearchLikeSearchParams | undefined => {
    const params: ResearchLikeSearchParams = {}

    if (searchFormData.pagerName) params.pagerName = searchFormData.pagerName
    if (searchFormData.journalName) params.journalName = searchFormData.journalName

    return Object.keys(params).length > 0 ? params : undefined
  }

  // Helper function to build exact search parameters
  const buildExactSearchParams = (): SearchParams | undefined => {
    if (searchFormData.participateType) {
      return { field: 'participateType', value: searchFormData.participateType }
    }
    return undefined
  }

  // Helper function to build date range parameters
  const buildDateRangeParams = (): DateRangeParams | undefined => {
    const params: DateRangeParams = {}

    if (searchFormData.publishDateStart) params.startDate = searchFormData.publishDateStart
    if (searchFormData.publishDateEnd) params.endDate = searchFormData.publishDateEnd

    return Object.keys(params).length > 0 ? params : undefined
  }

  // Apply search filters and update query parameters
  const applySearch = () => {
    const newParams: ResearchLogQueryParams = {
      likeSearch: buildLikeSearchParams(),
      search: buildExactSearchParams(),
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
  const updateResearchLogMutation = useMutation({
    mutationFn: (data: { id: number, data: TypeResearchFormData }) =>
      window.db.updateResearchLog(data.id, data.data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['ResearchLog'] }),
  })

  const deleteResearchLogMutation = useMutation({
    mutationFn: (id: number) => window.db.deleteResearchLog(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['ResearchLog'] }),
  })

  const deleteLog = (id: number) => {
    deleteResearchLogMutation.mutate(id)
  }

  const updateLog = (id: number, data: TypeResearchFormData) => {
    updateResearchLogMutation.mutate({ id, data })
  }

  // ===== Sorting Functions =====
  const setSorting = (field: string, order: SortOrder) => {
    setQueryParams(prev => ({
      ...prev,
      sort: { field, order }
    }))
  }

  // Update query parameters from external source
  const updateQueryParams = (newParams: ResearchLogQueryParams) => {
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
