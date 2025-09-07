import { useQuery } from '@tanstack/react-query';
import { AcademicActivityLog } from '@prisma/client';

/**
 * Custom hook to fetch academic activity logs using react-query
 * @returns Query result containing academic activity logs data, loading state, and error
 */
export const useAcademicActivityLogs = () => {
  return useQuery<AcademicActivityLog[]>({
    queryKey: ['AcademicActivityLog'],
    queryFn: async () => {
      try {
        return await window.db.overviewGetAcademicLogs();
      } catch (error) {
        console.error('Error fetching academic activity logs:', error);
        throw error;
      }
    },
  });
};
