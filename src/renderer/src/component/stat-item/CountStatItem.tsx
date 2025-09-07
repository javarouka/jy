import RawStatItem from '@renderer/component/stat-item/RawStatItem'

export type StatItemProps = {
  label: string
  value: number
  unit: string
  isSuccess?: boolean
  target?: string
}

export default function CountStatItem({ label, value, unit, isSuccess, target }: StatItemProps) {
  return <RawStatItem label={label} value={`${value}${unit}`} isSuccess={isSuccess} target={target}/>
}
