import { useQuery } from '@tanstack/react-query';
import { IndividualTherapyLog } from '@prisma/client';

/**
 * Custom hook to fetch individual therapy logs using react-query
 * @returns Query result containing individual therapy logs data, loading state, and error
 */
export const useIndividualTherapyLogs = () => {
  return useQuery<IndividualTherapyLog[]>({
    queryKey: ['IndividualTherapyLog'],
    queryFn: async () => {
      try {
        return await window.db.overviewGetIndividualTherapyLogs();
      } catch (error) {
        console.error('Error fetching individual therapy logs:', error);
        throw error;
      }
    },
  });
};
