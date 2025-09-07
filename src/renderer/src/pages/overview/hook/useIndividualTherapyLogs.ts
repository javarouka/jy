import { useQuery } from '@tanstack/react-query';
import { IndividualTherapyLog } from '@prisma/client';
import { TypeTrainingYear } from '@shared/types';

/**
 * Custom hook to fetch individual therapy logs using react-query
 * @param trainingYear Optional training year to filter logs by
 * @returns Query result containing individual therapy logs data, loading state, and error
 */
export const useIndividualTherapyLogs = (trainingYear?: TypeTrainingYear) => {
  return useQuery<IndividualTherapyLog[]>({
    queryKey: ['IndividualTherapyLog', trainingYear?.name],
    queryFn: async () => {
      try {
        return await window.db.overviewGetIndividualTherapyLogs(trainingYear);
      } catch (error) {
        console.error('Error fetching individual therapy logs:', error);
        throw error;
      }
    },
  });
};
