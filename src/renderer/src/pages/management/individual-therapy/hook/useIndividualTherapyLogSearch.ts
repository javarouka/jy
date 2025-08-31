import { ChangeEvent, useState } from 'react'
import {
  IndividualTherapyLogQueryParams,
  DateRangeParams,
  IndividualTherapyLikeSearchParams,
  IndividualTherapyRangeParams,
  SearchParams,
  SortOrder
} from '@shared/types/db'
import { QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { TypeIndividualTherapyFormData } from '@shared/types'

export default function useIndividualTherapyLogSearch(_queryClient?: QueryClient) {

  const queryClient = _queryClient || useQueryClient()

  // Search form state
  const [searchFormData, setSearchFormData] = useState({
    clientName: '',
    age: '',
    gender: '',
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
  });

  const [queryParams, setQueryParams] = useState<IndividualTherapyLogQueryParams>({});

  const { data: individualTherapyLog, isLoading, isError } = useQuery({
    queryKey: ['IndividualTherapyLog', queryParams],
    queryFn: () => window.db.getIndividualTherapyLogs(queryParams),
  })

  // Handle search form changes
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSearchFormData(prev => ({ ...prev, [name]: value }));
  };

  // Apply search filters
  const applySearch = () => {
    const likeSearch: IndividualTherapyLikeSearchParams = {};
    const dateRange: DateRangeParams = {};
    const researchDateRange: DateRangeParams = {};
    const rangeSearch: IndividualTherapyRangeParams = {};
    let search: SearchParams | undefined = undefined;

    // Add non-empty like search parameters
    if (searchFormData.clientName) likeSearch.clientName = searchFormData.clientName;
    if (searchFormData.therapyType) likeSearch.therapyType = searchFormData.therapyType;

    // Add exact match search parameter - prioritize age over gender
    if (searchFormData.age) {
      search = { field: 'age', value: parseInt(searchFormData.age) };
    } else if (searchFormData.gender) {
      search = { field: 'gender', value: searchFormData.gender };
    }

    // Add therapy period date range parameters
    if (searchFormData.startDate || searchFormData.endDate) {
      if (searchFormData.startDate) dateRange.startDate = searchFormData.startDate;
      if (searchFormData.endDate) dateRange.endDate = searchFormData.endDate;
    }

    // Add research date range parameters
    if (searchFormData.researchDateStart || searchFormData.researchDateEnd) {
      if (searchFormData.researchDateStart) researchDateRange.startDate = searchFormData.researchDateStart;
      if (searchFormData.researchDateEnd) researchDateRange.endDate = searchFormData.researchDateEnd;
    }

    // Add range search parameters for numeric fields
    rangeSearch.sessionCount = {};
    if (searchFormData.sessionCountMin) rangeSearch.sessionCount.min = parseInt(searchFormData.sessionCountMin);
    if (searchFormData.sessionCountMax) rangeSearch.sessionCount.max = parseInt(searchFormData.sessionCountMax);

    rangeSearch.prepareTime = {};
    if (searchFormData.prepareTimeMin) rangeSearch.prepareTime.min = parseInt(searchFormData.prepareTimeMin);
    if (searchFormData.prepareTimeMax) rangeSearch.prepareTime.max = parseInt(searchFormData.prepareTimeMax);

    rangeSearch.sessionTime = {};
    if (searchFormData.sessionTimeMin) rangeSearch.sessionTime.min = parseInt(searchFormData.sessionTimeMin);
    if (searchFormData.sessionTimeMax) rangeSearch.sessionTime.max = parseInt(searchFormData.sessionTimeMax);

    rangeSearch.supervisionTime = {};
    if (searchFormData.supervisionTimeMin) rangeSearch.supervisionTime.min = parseInt(searchFormData.supervisionTimeMin);
    if (searchFormData.supervisionTimeMax) rangeSearch.supervisionTime.max = parseInt(searchFormData.supervisionTimeMax);

    // Clean up empty range search objects
    if (!searchFormData.sessionCountMin && !searchFormData.sessionCountMax) delete rangeSearch.sessionCount;
    if (!searchFormData.prepareTimeMin && !searchFormData.prepareTimeMax) delete rangeSearch.prepareTime;
    if (!searchFormData.sessionTimeMin && !searchFormData.sessionTimeMax) delete rangeSearch.sessionTime;
    if (!searchFormData.supervisionTimeMin && !searchFormData.supervisionTimeMax) delete rangeSearch.supervisionTime;

    // Create new query parameters
    const newParams = {
      ...queryParams,
      likeSearch: Object.keys(likeSearch).length > 0 ? likeSearch : undefined,
      search,
      dateRange: Object.keys(dateRange).length > 0 ? dateRange : undefined,
      researchDateRange: Object.keys(researchDateRange).length > 0 ? researchDateRange : undefined,
      rangeSearch: Object.keys(rangeSearch).length > 0 ? rangeSearch : undefined
    };

    // Update query parameters
    setQueryParams(newParams);

    // window.log.info(newParams)

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
    })
    return emptyParams
  }

  const updateIndividualTherapyLogMutation = useMutation({
    mutationFn: (data: { id: number, data: TypeIndividualTherapyFormData }) =>
      window.db.updateIndividualTherapyLog(data.id, data.data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['IndividualTherapyLog'] }),
  })

  const deleteIndividualTherapyLogMutation = useMutation({
    mutationFn: (id: number) => window.db.deleteIndividualTherapyLog(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['IndividualTherapyLog'] }),
  })

  const deleteLog = (id: number) => {
    deleteIndividualTherapyLogMutation.mutate(id)
  }

  const updateLog = (id: number, data: TypeIndividualTherapyFormData) => {
    updateIndividualTherapyLogMutation.mutate({ id, data })
  }

  // Function to set sorting parameters
  const setSorting = (field: string, order: SortOrder) => {
    setQueryParams(prev => ({
      ...prev,
      sort: { field, order }
    }))
  }

  // Update query parameters from external source (e.g., search component)
  const updateQueryParams = (newParams: IndividualTherapyLogQueryParams) => {
    setQueryParams(newParams)
  }

  return {
    data: {
      individualTherapyLog: individualTherapyLog || [],
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
