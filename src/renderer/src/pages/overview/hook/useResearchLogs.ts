import { useQuery } from '@tanstack/react-query';
import { ResearchLog } from '@prisma/client';
import { TypeTrainingYear } from '@shared/types';

/**
 * Custom hook to fetch research logs using react-query
 * @param trainingYear Optional training year to filter logs by
 * @returns Query result containing research logs data, loading state, and error
 */
export const useResearchLogs = (trainingYear?: TypeTrainingYear) => {
  return useQuery<ResearchLog[]>({
    queryKey: ['ResearchLog', trainingYear?.name],
    queryFn: async () => {
      try {
        return await window.db.overviewGetResearchLogs(trainingYear);
      } catch (error) {
        console.error('Error fetching research logs:', error);
        throw error;
      }
    },
  });
};
