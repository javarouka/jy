import { useQuery } from '@tanstack/react-query';
import { GroupTherapyLog } from '@prisma/client';

/**
 * Custom hook to fetch group therapy logs using react-query
 * @returns Query result containing group therapy logs data, loading state, and error
 */
export const useGroupTherapyLogs = () => {
  return useQuery<GroupTherapyLog[]>({
    queryKey: ['GroupTherapyLog'],
    queryFn: async () => {
      try {
        return await window.db.overviewGetGroupTherapyLogs();
      } catch (error) {
        console.error('Error fetching group therapy logs:', error);
        throw error;
      }
    },
  });
};
