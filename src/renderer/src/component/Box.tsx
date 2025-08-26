import type { ReactNode } from "react";

interface BoxProps {
    className?: string
    children?: ReactNode | undefined
}

function Box({children, className}: BoxProps) {
    return <div className={className}>{children}</div>
}

export default Box