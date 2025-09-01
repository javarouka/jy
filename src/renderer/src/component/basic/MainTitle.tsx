import type { ComponentProps } from 'react'

type BoxProps = ComponentProps<'h1'>

function MainTitle(props: BoxProps) {
    return <h1 {...props} className={`font-bold text-2xl ${props.className}`}>{props.children}</h1>
}

export default MainTitle
