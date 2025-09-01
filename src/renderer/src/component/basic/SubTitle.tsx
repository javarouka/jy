import type { ComponentProps } from 'react'

type BoxProps = ComponentProps<'h2'>

function SubTitle(props: BoxProps) {
  return <h2 {...props} className={`font-bold text-base ${props.className}`}>{props.children}</h2>
}

export default SubTitle
