import { useQuery } from '@tanstack/react-query';
import { OtherActivityLog } from '@prisma/client';
import { TypeTrainingYear } from '@shared/types';

/**
 * Custom hook to fetch other activity logs using react-query
 * @param trainingYear Optional training year to filter logs by
 * @returns Query result containing other activity logs data, loading state, and error
 */
export const useOtherActivityLogs = (trainingYear?: TypeTrainingYear) => {
  return useQuery<OtherActivityLog[]>({
    queryKey: ['OtherActivityLog', trainingYear?.name],
    queryFn: async () => {
      try {
        return await window.db.overviewGetOtherActivityLogs(trainingYear);
      } catch (error) {
        console.error('Error fetching other activity logs:', error);
        throw error;
      }
    },
  });
};
