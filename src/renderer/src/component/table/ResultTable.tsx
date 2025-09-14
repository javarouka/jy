import type { ComponentProps } from 'react'

type Props = ComponentProps<'table'>

export default function ResultTable(props: Props) {
  return (
    <table className="w-full bg-white border border-gray-200" {...props}>
      {props.children}
    </table>
  )
}
