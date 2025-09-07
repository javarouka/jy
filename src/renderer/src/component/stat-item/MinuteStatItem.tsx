import { convertMinuteToReader } from '@renderer/helpers/Times'
import RawStatItem from '@renderer/component/stat-item/RawStatItem'

export type StatItemProps = {
  label: string
  value: number
  isSuccess?: boolean
  target?: string
}

export default function MinuteStatItem({ label, value, isSuccess, target }: StatItemProps) {
  return <RawStatItem label={label} value={convertMinuteToReader(value)} isSuccess={isSuccess} target={target}/>
}
