import CompletedIcon from '@renderer/component/stat-item/CompletedIcon'

export type StatItemProps = {
  label: string
  value: string
  isSuccess?: boolean
  target?: string
}

export default function RawStatItem({ label, value, isSuccess, target }: StatItemProps) {
  const bgColorClass = isSuccess === undefined
    ? 'bg-gray-50 dark:bg-gray-800/20'
    : isSuccess
      ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800'
      : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'

  const textColorClass = isSuccess === undefined
    ? ''
    : isSuccess
      ? 'text-green-700 dark:text-green-300'
      : 'text-red-700 dark:text-red-300'

  return (
    <div className={`p-3 rounded-lg ${bgColorClass}`}>
      <div className="flex justify-between items-center mb-2">
        <h6 className={`text-sm font-medium ${textColorClass} flex gap-2 items-center`}>
          {target ? <div><CompletedIcon isSuccess={isSuccess} /></div> : null}
          <div>{label}</div>
        </h6>
      </div>
      <div className="flex justify-between items-center">
        <div>
          <p className="text-xs text-gray-500">현재</p>
          <p className="text-base font-semibold">
            {value}
          </p>
        </div>
        {target && (
          <div>
            <p className="text-xs text-gray-500">목표</p>
            <p className="text-base font-semibold">{target}</p>
          </div>
        )}
      </div>
    </div>
  )
}
