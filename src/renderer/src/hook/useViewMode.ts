import { useState, useEffect } from 'react'

export type ViewMode = 'table' | 'card'

/**
 * Hook for managing view mode (table/card) with cookie persistence
 * @param key - Unique key for storing the preference in cookies
 * @param defaultMode - Default view mode if no preference is found (defaults to 'table')
 */
const useViewMode = (key: string, defaultMode: ViewMode = 'table'): {
  viewMode: ViewMode
  toggleViewMode: () => void
  setViewMode: (mode: ViewMode) => void
} => {
  // Generate a unique cookie key for this specific view
  const cookieKey = `jiyoon_view_mode_${key}`

  // Initialize state from cookie or default
  const [viewMode, setViewModeState] = useState<ViewMode>(() => {
    // Try to get the saved preference from cookies
    const savedMode = document.cookie
      .split('; ')
      .find(row => row.startsWith(`${cookieKey}=`))
      ?.split('=')[1] as ViewMode | undefined

    return savedMode || defaultMode
  })

  // Update cookie when viewMode changes
  useEffect(() => {
    // Set cookie with 1 year expiration
    const expirationDate = new Date()
    expirationDate.setFullYear(expirationDate.getFullYear() + 1)

    document.cookie = `${cookieKey}=${viewMode}; expires=${expirationDate.toUTCString()}; path=/`
  }, [viewMode, cookieKey])

  // Toggle between table and card view
  const toggleViewMode = () => {
    setViewModeState(prevMode => prevMode === 'table' ? 'card' : 'table')
  }

  // Set view mode directly
  const setViewMode = (mode: ViewMode) => {
    setViewModeState(mode)
  }

  return { viewMode, toggleViewMode, setViewMode }
}

export default useViewMode
