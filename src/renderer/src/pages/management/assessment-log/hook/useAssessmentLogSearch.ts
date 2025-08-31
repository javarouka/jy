import { ChangeEvent, useState } from 'react'
import {
  AssessmentLogQueryParams,
  DateRangeParams,
  LikeSearchParams, SearchParams,
  SortOrder
} from '@shared/types/db'
import { QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { TypeAssessmentFormData } from '@shared/types'

export default function useAssessmentLogSearch(_queryClient?: QueryClient) {

  const queryClient = _queryClient || useQueryClient()

  // Search form state
  const [searchFormData, setSearchFormData] = useState({
    clientName: '',
    age: '',
    gender: '',
    dx: '',
    researchType: '',
    startDate: '',
    endDate: ''
  });

  const [queryParams, setQueryParams] = useState<AssessmentLogQueryParams>({});

  const { data: assessmentLog, isLoading, isError } = useQuery({
    queryKey: ['AssessmentLog', queryParams],
    queryFn: () => window.db.getAssessmentLogs(queryParams),
  })

  // Handle search form changes
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSearchFormData(prev => ({ ...prev, [name]: value }));
  };

  // Apply search filters
  const applySearch = () => {
    const likeSearch: LikeSearchParams = {};
    const dateRange: DateRangeParams = {};
    let search: SearchParams | undefined = undefined;

    // Add non-empty like search parameters
    if (searchFormData.clientName) likeSearch.clientName = searchFormData.clientName;
    if (searchFormData.dx) likeSearch.dx = searchFormData.dx;
    if (searchFormData.researchType) likeSearch.researchType = searchFormData.researchType;

    // Add exact match search parameter - prioritize age over gender
    if (searchFormData.age) {
      search = { field: 'age', value: parseInt(searchFormData.age) };
    } else if (searchFormData.gender) {
      search = { field: 'gender', value: searchFormData.gender };
    }

    // Add date range parameters
    if (searchFormData.startDate) dateRange.startDate = searchFormData.startDate;
    if (searchFormData.endDate) dateRange.endDate = searchFormData.endDate;

    // Create new query parameters
    const newParams = {
      ...queryParams,
      likeSearch: Object.keys(likeSearch).length > 0 ? likeSearch : undefined,
      search,
      dateRange: Object.keys(dateRange).length > 0 ? dateRange : undefined
    };

    // Update query parameters
    setQueryParams(newParams);

    // Return the new parameters for external use
    return newParams;
  };

  // Function to clear all query parameters and search form
  const clearQueryParams = () => {
    const emptyParams = {}
    setQueryParams(emptyParams)
    setSearchFormData({
      clientName: '',
      age: '',
      gender: '',
      dx: '',
      researchType: '',
      startDate: '',
      endDate: ''
    })
    return emptyParams
  }

  const updateAssessmentLogMutation = useMutation({
    mutationFn: (data: { id: number, data: TypeAssessmentFormData }) =>
      window.db.updateAssessmentLog(data.id, data.data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['AssessmentLog'] }),
  })

  const deleteAssessmentLogMutation = useMutation({
    mutationFn: (id: number) => window.db.deleteAssessmentLog(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['AssessmentLog'] }),
  })

  const deleteLog = (id: number) => {
    deleteAssessmentLogMutation.mutate(id)
  }

  const updateLog = (id: number, data: TypeAssessmentFormData) => {
    updateAssessmentLogMutation.mutate({ id, data })
  }

  // Function to set sorting parameters
  const setSorting = (field: string, order: SortOrder) => {
    setQueryParams(prev => ({
      ...prev,
      sort: { field, order }
    }))
  }

  // Update query parameters from external source (e.g., search component)
  const updateQueryParams = (newParams: AssessmentLogQueryParams) => {
    setQueryParams(newParams)
  }

  return {
    data: {
      assessmentLog,
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
    setSorting,
    clearQueryParams,
    deleteLog,
    updateLog,
  }
}
