import React from 'react'
import { type SortDirection } from '@renderer/hook/useTableSortFilter'

interface SortableTableHeaderProps {
  column: string
  label: string
  sortKey: string
  getSortDirection: (key: string) => SortDirection
  requestSort: (key: string) => void
}

/**
 * A reusable sortable table header component
 * Displays a column header with sort indicators and handles sort events
 */
const SortableTableHeader: React.FC<SortableTableHeaderProps> = ({
  column,
  label,
  getSortDirection,
  requestSort
}) => {
  const direction = getSortDirection(column)

  return (
    <th
      className="py-2 px-4 border-b text-left cursor-pointer hover:bg-gray-200"
      onClick={() => requestSort(column)}
    >
      <div className="flex items-center">
        {label}
        <span className="ml-1">
          {direction === 'asc' && '▲'}
          {direction === 'desc' && '▼'}
        </span>
      </div>
    </th>
  )
}

export default SortableTableHeader
