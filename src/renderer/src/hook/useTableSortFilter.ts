import { useState, useCallback, useMemo } from 'react'
import { useDebouncedCallback } from 'use-debounce'

export type SortDirection = 'asc' | 'desc' | null
export type SortConfig = {
  key: string
  direction: SortDirection
}

export type ColumnFilters = Record<string, string>

/**
 * Hook for managing table sorting and column-specific filtering
 * @param data - The data array to sort and filter
 * @returns Object containing sorted and filtered data, sort config, and handler functions
 */
function useTableSortFilter<T extends Record<string, any>>(data: T[]) {
  // State for sort configuration
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: '',
    direction: null
  })

  // State for column-specific filters
  const [columnFilters, setColumnFilters] = useState<ColumnFilters>({})

  // State for debounced column filters (for performance)
  const [debouncedColumnFilters, setDebouncedColumnFilters] = useState<ColumnFilters>({})

  // Legacy state for global text filter (for backward compatibility)
  const [filterText, setFilterText] = useState('')

  // State for debounced global filter (for performance)
  const [debouncedFilterText, setDebouncedFilterText] = useState('')

  // Handle sort request when a column header is clicked
  const requestSort = useCallback((key: string) => {
    setSortConfig((prevSortConfig) => {
      // If clicking the same column, cycle through: null -> asc -> desc -> null
      if (prevSortConfig.key === key) {
        const nextDirection =
          prevSortConfig.direction === null ? 'asc' :
          prevSortConfig.direction === 'asc' ? 'desc' : null

        return {
          key,
          direction: nextDirection
        }
      }

      // If clicking a different column, start with ascending sort
      return {
        key,
        direction: 'asc'
      }
    })
  }, [])

  // Debounced function to update the debounced column filters
  const debouncedUpdateColumnFilters = useDebouncedCallback(
    (filters: ColumnFilters) => {
      setDebouncedColumnFilters(filters)
    },
    300 // 300ms delay
  )

  // Debounced function to update the debounced global filter
  const debouncedUpdateFilterText = useDebouncedCallback(
    (text: string) => {
      setDebouncedFilterText(text)
    },
    300 // 300ms delay
  )

  // Handle column filter change
  const handleColumnFilterChange = useCallback((column: string, value: string) => {
    const newFilters = {
      ...columnFilters,
      [column]: value
    }
    setColumnFilters(newFilters)
    debouncedUpdateColumnFilters(newFilters)
  }, [columnFilters, debouncedUpdateColumnFilters])

  // Clear a specific column filter
  const clearColumnFilter = useCallback((column: string) => {
    const newFilters = { ...columnFilters }
    delete newFilters[column]
    setColumnFilters(newFilters)
    debouncedUpdateColumnFilters(newFilters)
  }, [columnFilters, debouncedUpdateColumnFilters])

  // Clear all column filters
  const clearAllFilters = useCallback(() => {
    setColumnFilters({})
    setDebouncedColumnFilters({})
    setFilterText('')
    setDebouncedFilterText('')
  }, [])

  // Legacy handler for global text filter (for backward compatibility)
  const handleFilterChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setFilterText(value)
    debouncedUpdateFilterText(value)
  }, [debouncedUpdateFilterText])

  // Legacy clear for global filter (for backward compatibility)
  const clearFilter = useCallback(() => {
    setFilterText('')
    setDebouncedFilterText('')
  }, [])

  // Apply sorting and filtering to data
  const sortedAndFilteredData = useMemo(() => {
    // First, filter the data
    let filteredData = data

    // Apply column-specific filters
    if (Object.keys(debouncedColumnFilters).length > 0) {
      filteredData = filteredData.filter(item => {
        // Item passes if it matches all active column filters
        return Object.entries(debouncedColumnFilters).every(([column, filterValue]) => {
          if (!filterValue) return true // Skip empty filters

          const value = item[column]
          // Skip filtering if the column doesn't exist in the item
          if (value === undefined) return true

          // Only filter string values
          if (typeof value === 'string') {
            return value.toLowerCase().includes(filterValue.toLowerCase())
          }

          // For non-string values that can be converted to string
          if (value !== null) {
            return String(value).toLowerCase().includes(filterValue.toLowerCase())
          }

          return false
        })
      })
    }

    // Apply legacy global filter (for backward compatibility)
    if (debouncedFilterText) {
      const lowerCaseFilter = debouncedFilterText.toLowerCase()
      filteredData = filteredData.filter(item => {
        // Check each string property for a match
        return Object.entries(item).some(([_, value]) => {
          // Only filter string values
          if (typeof value === 'string') {
            return value.toLowerCase().includes(lowerCaseFilter)
          }
          return false
        })
      })
    }

    // Then, sort the filtered data
    if (sortConfig.direction === null) {
      return filteredData
    }

    return [...filteredData].sort((a, b) => {
      // Handle null or undefined values
      if (a[sortConfig.key] === null || a[sortConfig.key] === undefined) return 1
      if (b[sortConfig.key] === null || b[sortConfig.key] === undefined) return -1

      // Compare based on value type
      if (typeof a[sortConfig.key] === 'string') {
        const aValue = a[sortConfig.key].toLowerCase()
        const bValue = b[sortConfig.key].toLowerCase()

        if (aValue < bValue) {
          return sortConfig.direction === 'asc' ? -1 : 1
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'asc' ? 1 : -1
        }
        return 0
      } else {
        // For numbers, dates, etc.
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1
        }
        return 0
      }
    })
  }, [data, sortConfig, debouncedFilterText, debouncedColumnFilters])

  // Get the sort direction for a specific column
  const getSortDirection = useCallback((key: string): SortDirection => {
    if (sortConfig.key !== key) return null
    return sortConfig.direction
  }, [sortConfig])

  // Get the current filter value for a specific column
  const getColumnFilterValue = useCallback((column: string): string => {
    return columnFilters[column] || ''
  }, [columnFilters])

  return {
    sortedAndFilteredData,
    requestSort,
    getSortDirection,
    // Column-specific filtering
    columnFilters,
    handleColumnFilterChange,
    clearColumnFilter,
    clearAllFilters,
    getColumnFilterValue,
    // Legacy global filtering (for backward compatibility)
    filterText,
    handleFilterChange,
    clearFilter
  }
}

export default useTableSortFilter
