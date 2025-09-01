import { GroupTherapyLog } from '@prisma/client'
import { formatTime } from '@renderer/helpers/Times'

type Props = {
  log: GroupTherapyLog
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const GroupTherapyLogCard = (props: Props) => {
  const { log, onEdit, onDelete } = props;

  // 날짜 포맷팅
  const formattedResearchDate = new Date(log.researchDate).toLocaleDateString('ko-KR');
  const formattedStartDate = new Date(log.startDate).toLocaleDateString('ko-KR');
  const formattedEndDate = new Date(log.endDate).toLocaleDateString('ko-KR');

  return (
    <div className="flex flex-col justify-between p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md transition-transform hover:scale-105">
      <div>
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            {log.groupName}
          </h3>
          <div className="flex space-x-2">
            <button
              onClick={() => onEdit(log.id)}
              className="text-blue-500 hover:text-blue-700"
              title="편집"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
            <button
              onClick={() => onDelete(log.id)}
              className="text-red-500 hover:text-red-700"
              title="삭제"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
        <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
          <p>
            <strong className="font-semibold text-gray-800 dark:text-gray-100">치료자 유형:</strong> {log.therapyType}
          </p>
          <p>
            <strong className="font-semibold text-gray-800 dark:text-gray-100">검사일:</strong> {formattedResearchDate}
          </p>
          <p>
            <strong className="font-semibold text-gray-800 dark:text-gray-100">회기 수:</strong> {log.sessionCount}회기
          </p>
          <p>
            <strong className="font-semibold text-gray-800 dark:text-gray-100">기간:</strong> {formattedStartDate} ~ {formattedEndDate}
          </p>
        </div>
      </div>

      {/* 카드 하단 정보 */}
      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="space-y-1">
          <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
            준비 시간: {formatTime(log.prepareTime)}
          </p>
          <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
            상담 시간: {formatTime(log.sessionTime)}
          </p>
          <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
            지도감독 시간: {formatTime(log.supervisionTime)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default GroupTherapyLogCard
