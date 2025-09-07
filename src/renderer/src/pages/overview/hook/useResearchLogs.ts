import { useQuery } from '@tanstack/react-query';
import { ResearchLog } from '@prisma/client';

/**
 * Custom hook to fetch research logs using react-query
 * @returns Query result containing research logs data, loading state, and error
 */
export const useResearchLogs = () => {
  return useQuery<ResearchLog[]>({
    queryKey: ['ResearchLog'],
    queryFn: async () => {
      try {
        return await window.db.overviewGetResearchLogs();
      } catch (error) {
        console.error('Error fetching research logs:', error);
        throw error;
      }
    },
  });
};
