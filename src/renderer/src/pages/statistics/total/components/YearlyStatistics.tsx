import SubTitle from '@renderer/component/basic/SubTitle'
import { convertMinuteToReader } from '@renderer/helpers/Times'

export type YearlyStatProps = {
  yearlyStats: {
    name: string
    startDate: string
    endDate: string
    targetHours: number
    assessmentCreditTime: number
    therapyCreditTime: number
    academicCreditTime: number
    otherCreditTime: number
    totalCreditTime: number
    success: boolean
    progressPercentage: number
    actualProgressPercentage: number
  }[]
}

export default function YearlyStatistics({ yearlyStats }: YearlyStatProps) {
  return (
    <div className="mb-8">
      <SubTitle className="mb-4">연차별 통계</SubTitle>
      <div className="space-y-4">
        {yearlyStats.map((year) => (
          <div key={year.name} className="border rounded-lg p-4 border-gray-200 dark:border-gray-700">
            <h4 className="text-sm font-medium mb-2">
              {year.name} ({year.startDate} ~ {year.endDate})
            </h4>

            {/* Goal time and progress bar */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-medium">목표시간: {convertMinuteToReader(year.targetHours * 60)} ({year.targetHours} 시간)</span>
                <div className="flex items-center">
                  <span className={`text-xs font-medium ${year.success ? 'text-green-600' : 'text-red-600'}`}>
                    진행률: {year.actualProgressPercentage > 100
                      ? `100%`
                      : `${year.progressPercentage.toFixed(1)}%`}
                  </span>
                  {year.actualProgressPercentage > 100 && (
                    <span className={`ml-2 text-xs font-medium ${year.success ? 'text-green-600' : 'text-red-600'}`}>
                      ({year.actualProgressPercentage.toFixed(1)}% 달성)
                    </span>
                  )}
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div
                  className={`h-2.5 rounded-full ${year.success ? 'bg-green-600' : 'bg-red-600'}`}
                  style={{ width: `${year.progressPercentage}%` }}
                ></div>
              </div>
            </div>

            {/* Statistics grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-xs text-gray-500">심리평가 인정시간</p>
                <p className="text-base font-semibold">{convertMinuteToReader(year.assessmentCreditTime)}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">심리치료 인정시간</p>
                <p className="text-base font-semibold">{convertMinuteToReader(year.therapyCreditTime)}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">학술활동 인정시간</p>
                <p className="text-base font-semibold">{convertMinuteToReader(year.academicCreditTime)}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">기타수련 인정시간</p>
                <p className="text-base font-semibold">{convertMinuteToReader(year.otherCreditTime)}</p>
              </div>
            </div>

            {/* Total for this year */}
            <div className={`mt-4 p-3 rounded-lg ${year.success ? 'bg-green-50 dark:bg-green-900/20' : 'bg-red-50 dark:bg-red-900/20'}`}>
              <div className="flex justify-between items-center">
                <p className={`text-sm font-medium ${year.success ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'}`}>
                  총 인정시간
                </p>
                <p className={`text-sm font-bold ${year.success ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'}`}>
                  {convertMinuteToReader(year.totalCreditTime)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
