import { AssessmentLog } from '@prisma/client'
import { TypeAssessmentFormData } from '@shared/types'

type Props = {
  log: AssessmentLog
  onEdit: (id: number, data: TypeAssessmentFormData) => void;
  onDelete: (id: number) => void;
}

const formatCreditTime = (minutes: number): string => {
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

const AssessmentLogCard = (props: Props) => {
  const { log, onEdit, onDelete } = props;
  // 날짜 포맷팅 (실제 프로젝트에서는 date-fns, moment 등을 사용하는 것을 권장합니다)
  const formattedResearchDate = new Date(log.researchDate).toLocaleDateString('ko-KR');

  return (
    <div className="flex flex-col justify-between p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md transition-transform hover:scale-105">
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            {log.clientName}
            <span className="ml-2 text-lg font-medium text-gray-500 dark:text-gray-400">
              ({log.age}세 / {log.gender === 'male' ? '남' : '여'})
            </span>
          </h3>
          {/* 'usable' 상태를 시각적으로 표시하는 뱃지 */}
          <span
            className={`px-3 py-1 text-xs font-semibold rounded-full ${
              log.usable
                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
            }`}
          >
            {log.usable ? '사용가능' : '불가'}
          </span>
        </div>
        <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
          <p>
            <strong className="font-semibold text-gray-800 dark:text-gray-100">진단명:</strong> {log.dx}
          </p>
          <p>
            <strong className="font-semibold text-gray-800 dark:text-gray-100">검사 종류:</strong> {log.researchType}
          </p>
          <p>
            <strong className="font-semibold text-gray-800 dark:text-gray-100">검사일:</strong> {formattedResearchDate}
          </p>
        </div>
      </div>
      {/* 카드 하단 정보 및 버튼 */}
      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
        <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
          {/* --- 변경: 시간 포맷팅 함수 적용 --- */}
          인정 시간: {formatCreditTime(log.creditTime)}
        </p>
        {/* --- 신규 추가: 수정/삭제 버튼 --- */}
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(log.id, {} as TypeAssessmentFormData)}
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

export default AssessmentLogCard
