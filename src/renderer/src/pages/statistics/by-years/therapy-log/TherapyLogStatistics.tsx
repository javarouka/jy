import SubTitle from '@renderer/component/basic/SubTitle'
import useTherapyLogStatistics from '@renderer/pages/statistics/by-years/therapy-log/hook/useTherapyLogStatistics'
import { convertMinuteToReader } from '@renderer/helpers/Times'

export default function TherapyLogStatistics() {
  const { statisticsData, isLoading, isError } = useTherapyLogStatistics()

  if (isLoading) return <div className="p-4">통계 데이터를 불러오는 중...</div>
  if (isError) return <div className="p-4">통계 데이터를 불러오는 중 오류가 발생했습니다.</div>

  return (
    <div className="w-full">
      <SubTitle className="mb-4">심리치료 통계</SubTitle>
      {statisticsData.length === 0 ? (
        <div className="text-center py-8">표시할 데이터가 없습니다.</div>
      ) : (
        <div className="space-y-8">
          <div className="space-y-4">
            {statisticsData.map((data) => (
              <div key={data.name} className="border rounded-lg p-4 border-gray-200 dark:border-gray-700">
                <h4 className="text-base font-medium mb-2">
                  {data.name} ({data.startDate} ~ {data.endDate})
                </h4>

                {/* Goal time and progress bar - moved directly below the year title */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium">목표시간: {convertMinuteToReader(data.targetHours * 60)} 분 ({convertMinuteToReader(data.targetHours)} 시간)</span>
                    <span className="text-sm font-medium">진행률: {data.progressPercentage.toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                    <div
                      className="bg-blue-600 h-2.5 rounded-full"
                      style={{ width: `${data.progressPercentage}%` }}
                    ></div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-500">총 인정시간</p>
                    <p className="text-lg font-semibold">{convertMinuteToReader(data.totalCreditTime)} 분</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">총 사례 수</p>
                    <p className="text-lg font-semibold">{data.totalCount} 건</p>
                  </div>
                </div>

                {/* Display statistics for all therapyType values */}
                <div className="mt-6">
                  <h5 className="text-sm font-medium mb-3">치료자 유형별 통계</h5>
                  <div className="space-y-4">
                    {data.typeStats.map((typeStat) => (
                      <div
                        key={typeStat.type}
                        className={`p-3 rounded-lg ${
                          typeStat.isMainTherapist
                            ? 'bg-blue-50 border border-blue-200 dark:bg-blue-900/20 dark:border-blue-800'
                            : 'bg-gray-50 dark:bg-gray-800/20'
                        }`}
                      >
                        <div className="flex justify-between items-center mb-2">
                          <h6 className={`text-sm font-medium ${
                            typeStat.isMainTherapist ? 'text-blue-700 dark:text-blue-300' : ''
                          }`}>
                            {typeStat.type}
                            {typeStat.isMainTherapist && ' ★'}
                          </h6>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <p className="text-xs text-gray-500">사례 수</p>
                            <p className="text-base font-semibold">{typeStat.count} 건</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">인정시간</p>
                            <p className="text-base font-semibold">{convertMinuteToReader(typeStat.creditTime)} 분</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
