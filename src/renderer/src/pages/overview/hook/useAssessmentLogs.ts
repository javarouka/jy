import { useQuery } from '@tanstack/react-query';
import { AssessmentLog } from '@prisma/client';
import { TypeTrainingYear } from '@shared/types';

/**
 * Custom hook to fetch assessment logs using react-query
 * @param trainingYear Optional training year to filter logs by
 * @returns Query result containing assessment logs data, loading state, and error
 */
export const useAssessmentLogs = (trainingYear?: TypeTrainingYear) => {
  return useQuery<AssessmentLog[]>({
    queryKey: ['AssessmentLog', trainingYear?.name],
    queryFn: async () => {
      try {
        return await window.db.overviewGetAssessmentLogs(trainingYear);
      } catch (error) {
        console.error('Error fetching assessment logs:', error);
        throw error;
      }
    },
  });
};
