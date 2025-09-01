import { convertMinuteToReader } from '@renderer/helpers/Times'

export type GrandTotalProps = {
  creditTime: number
  isSuccess: boolean
}

export default function GrandTotal({ creditTime, isSuccess }: GrandTotalProps) {
  const bgColorClass = isSuccess
    ? 'bg-green-50 dark:bg-green-900/20 border-2 border-green-300 dark:border-green-700'
    : 'bg-red-50 dark:bg-red-900/20 border-2 border-red-300 dark:border-red-700'

  const textColorClass = isSuccess
    ? 'text-green-700 dark:text-green-300'
    : 'text-red-700 dark:text-red-300'

  return (
    <div className={`p-4 rounded-lg ${bgColorClass} mb-8`}>
      <div className="flex justify-between items-center mb-2">
        <h4 className={`text-lg font-bold ${textColorClass}`}>
          총 수련시간
          {isSuccess ? ' ✓' : ' ✗'}
        </h4>
      </div>
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-500">현재</p>
          <p className="text-xl font-bold">{convertMinuteToReader(creditTime)} 분 ({Math.floor(creditTime / 60)} 시간)</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">목표</p>
          <p className="text-xl font-bold">3,000 시간</p>
        </div>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mt-2">
        <div
          className={`h-2.5 rounded-full ${isSuccess ? 'bg-green-600' : 'bg-red-600'}`}
          style={{ width: `${Math.min(100, (creditTime / (3000 * 60)) * 100)}%` }}
        ></div>
      </div>
    </div>
  )
}
