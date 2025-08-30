import type { ComponentProps } from 'react'

type BoxProps = ComponentProps<'h2'>

function MainTitle(props: BoxProps) {
  return <h2 {...props} className={`font-bold text-base ${props.className}`}>{props.children}</h2>
}

export default MainTitle
