import { IndividualTherapyLog } from '@prisma/client'
import { convertMinuteToReader } from '@renderer/helpers/Times'
import { format } from 'date-fns'

type Props = {
  log: IndividualTherapyLog
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const IndividualTherapyLogCard = (props: Props) => {
  const { log, onEdit, onDelete } = props;

  // 날짜 포맷팅 (date-fns 사용)
  const formattedResearchDate = format(new Date(log.researchDate), 'yyyy-MM-dd');
  const formattedStartDate = format(new Date(log.startDate), 'yyyy-MM-dd');
  const formattedEndDate = format(new Date(log.endDate), 'yyyy-MM-dd');

  return (
    <div className="flex flex-col justify-between p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md transition-transform hover:scale-105">
      <div>
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            {log.clientName}
            <span className="ml-2 text-lg font-medium text-gray-500 dark:text-gray-400">
              ({log.age}세 / {log.gender === 'male' ? '남' : '여'})
            </span>
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
            준비 시간: {convertMinuteToReader(log.prepareTime)}
          </p>
          <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
            상담 시간: {convertMinuteToReader(log.sessionTime)}
          </p>
          <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
            지도감독 시간: {convertMinuteToReader(log.supervisionTime)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default IndividualTherapyLogCard
