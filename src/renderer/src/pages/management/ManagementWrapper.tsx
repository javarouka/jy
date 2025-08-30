import type { ComponentProps } from 'react'

type BoxProps = ComponentProps<'div'>

function ManagementWrapper(props: BoxProps) {
  return <div {...props} className={`${props.className}`}>{props.children}</div>
}

export default ManagementWrapper

