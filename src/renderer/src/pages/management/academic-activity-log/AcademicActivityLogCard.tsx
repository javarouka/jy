import { AcademicActivityLog } from '@prisma/client'

type Props = {
  log: AcademicActivityLog
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const formatTime = (minutes: number): string => {
  if (!minutes || minutes <= 0) {
    return '0분';
  }
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  const parts = [] as string[];
  if (hours > 0) {
    parts.push(`${hours}시간`);
  }
  if (remainingMinutes > 0) {
    parts.push(`${remainingMinutes}분`);
  }
  return parts.join(' ');
};

const AcademicActivityLogCard = (props: Props) => {
  const { log, onEdit, onDelete } = props;
  const formattedActivityDateDate = new Date(log.activityDate).toLocaleDateString('ko-KR');

  return (
    <div className="flex flex-col justify-between p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md transition-transform hover:scale-105">
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            <div>{log.activityName} / {log.sessionName}</div>
            <small>{log.organization}</small>
          </h3>
        </div>
        <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
          <p>
            <strong className="font-semibold text-gray-800 dark:text-gray-100">참석 발표:</strong> {log.act}
          </p>
          <p>
            <strong className="font-semibold text-gray-800 dark:text-gray-100">회의 유형:</strong> {log.activityType}
          </p>
          <p>
            <strong className="font-semibold text-gray-800 dark:text-gray-100">주관기관:</strong> {log.organization}
          </p>
          <p>
            <strong className="font-semibold text-gray-800 dark:text-gray-100">활동일:</strong> {formattedActivityDateDate}
          </p>
        </div>
      </div>

      {/* 카드 하단 정보 및 버튼 */}
      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="space-y-1 mb-3">
          <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
            인정시간: {formatTime(log.creditTime)}
          </p>
        </div>

        <div className="flex justify-end space-x-2">
          <button
            onClick={() => onEdit(log.id)}
            className="px-3 py-1 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500"
          >
            수정
          </button>
          <button
            onClick={() => onDelete(log.id)}
            className="px-3 py-1 text-sm font-medium text-red-700 bg-red-100 rounded-md hover:bg-red-200 dark:bg-red-900 dark:text-red-300 dark:hover:bg-red-800"
          >
            삭제
          </button>
        </div>
      </div>
    </div>
  );
};

export default AcademicActivityLogCard
