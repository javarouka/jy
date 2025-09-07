import { useQuery } from '@tanstack/react-query';
import { GroupTherapyLog } from '@prisma/client';
import { TypeTrainingYear } from '@shared/types';

/**
 * Custom hook to fetch group therapy logs using react-query
 * @param trainingYear Optional training year to filter logs by
 * @returns Query result containing group therapy logs data, loading state, and error
 */
export const useGroupTherapyLogs = (trainingYear?: TypeTrainingYear) => {
  return useQuery<GroupTherapyLog[]>({
    queryKey: ['GroupTherapyLog', trainingYear?.name],
    queryFn: async () => {
      try {
        return await window.db.overviewGetGroupTherapyLogs(trainingYear);
      } catch (error) {
        console.error('Error fetching group therapy logs:', error);
        throw error;
      }
    },
  });
};
