import { useQuery } from '@tanstack/react-query';
import { OtherActivityLog } from '@prisma/client';

/**
 * Custom hook to fetch other activity logs using react-query
 * @returns Query result containing other activity logs data, loading state, and error
 */
export const useOtherActivityLogs = () => {
  return useQuery<OtherActivityLog[]>({
    queryKey: ['OtherActivityLog'],
    queryFn: async () => {
      try {
        return await window.db.overviewGetOtherActivityLogs();
      } catch (error) {
        console.error('Error fetching other activity logs:', error);
        throw error;
      }
    },
  });
};
