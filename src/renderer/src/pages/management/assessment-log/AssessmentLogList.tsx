import { AssessmentLog } from '@prisma/client'
import AssessmentLogCard from '@renderer/pages/management/assessment-log/AssessmentLogCard'
import { TypeAssessmentFormData } from '../../../../../shared/types'

interface AssessmentLogListProps {
  assessmentLog: AssessmentLog[]
  deleteLog: (id: number) => void
  updateLog: (id: number, data: TypeAssessmentFormData) => void
}

const AssessmentLogList = (props: AssessmentLogListProps) => {
  const { assessmentLog: logs, updateLog, deleteLog } = props
  return (
    <div className="p-4 sm:p-6">
      {/* 기본: 1열 (모바일) */}
      {/* md (768px) 이상: 2열 */}
      {/* xl (1280px) 이상: 3열 */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {logs.map((log) => (
          <AssessmentLogCard
            key={log.id}
            log={log}
            onDelete={deleteLog}
            onEdit={updateLog}
          />
        ))}
      </div>
    </div>
  );
};

export default AssessmentLogList
