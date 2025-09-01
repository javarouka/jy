import { format } from 'date-fns'
import type { OtherActivityLog } from '@prisma/client'
import { convertMinuteToReader } from '@renderer/helpers/Times'

interface OtherActivityLogCardProps {
  log: OtherActivityLog
  onDelete: (id: number) => void
  onEdit: (id: number) => void
}

const OtherActivityLogCard = ({ log, onDelete, onEdit }: OtherActivityLogCardProps) => {
  const handleDelete = () => {
    if (window.confirm('정말로 이 기록을 삭제하시겠습니까?')) {
      onDelete(log.id)
    }
  }

  const handleEdit = () => {
    onEdit(log.id)
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-4 border border-gray-200 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-semibold text-gray-800">{log.activitySummary}</h3>
        <div className="flex space-x-2">
          <button
            onClick={handleEdit}
            className="text-blue-500 hover:text-blue-700"
            title="편집"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button
            onClick={handleDelete}
            className="text-red-500 hover:text-red-700"
            title="삭제"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>

      <div className="text-sm text-gray-600 mb-2 space-y-2">
        <p><strong className="font-semibold text-gray-800 dark:text-gray-100">활동유형:</strong> {log.activityType}</p>
        <p>
          <strong className="font-semibold text-gray-800 dark:text-gray-100">활동기간</strong>
          <p>{format(new Date(log.startDate), 'yyyy-MM-dd')} ~ {format(new Date(log.endDate), 'yyyy-MM-dd')}</p>
        </p>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
          인정시간: {convertMinuteToReader(log.creditTime)}
        </p>
      </div>

    </div>
  )
}

export default OtherActivityLogCard
