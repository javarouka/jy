import { useQuery } from '@tanstack/react-query';
import { AcademicActivityLog } from '@prisma/client';
import { TypeTrainingYear } from '@shared/types';

/**
 * Custom hook to fetch academic activity logs using react-query
 * @param trainingYear Optional training year to filter logs by
 * @returns Query result containing academic activity logs data, loading state, and error
 */
export const useAcademicActivityLogs = (trainingYear?: TypeTrainingYear) => {
  return useQuery<AcademicActivityLog[]>({
    queryKey: ['AcademicActivityLog', trainingYear?.name],
    queryFn: async () => {
      try {
        return await window.db.overviewGetAcademicLogs(trainingYear);
      } catch (error) {
        console.error('Error fetching academic activity logs:', error);
        throw error;
      }
    },
  });
};
