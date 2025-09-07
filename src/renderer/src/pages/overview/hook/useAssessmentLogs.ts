import { useQuery } from '@tanstack/react-query';
import { AssessmentLog } from '@prisma/client';

/**
 * Custom hook to fetch assessment logs using react-query
 * @returns Query result containing assessment logs data, loading state, and error
 */
export const useAssessmentLogs = () => {
  return useQuery<AssessmentLog[]>({
    queryKey: ['AssessmentLog'],
    queryFn: async () => {
      try {
        return await window.db.overviewGetAssessmentLogs();
      } catch (error) {
        console.error('Error fetching assessment logs:', error);
        throw error;
      }
    },
  });
};
