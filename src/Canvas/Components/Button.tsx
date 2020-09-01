import React from 'react'

interface IProps {
    onClick?: () => void,
    style?: React.CSSProperties,
    children: React.ReactNode
}
const Button = React.forwardRef<HTMLButtonElement, IProps>(({ onClick, style, children }: IProps, ref) => {
    const isTouchingRef = React.useRef(false)
    const onTouchStart = React.useCallback(() => {
        isTouchingRef.current = true
    }, [])
    const onTouchEnd = React.useCallback((e: React.TouchEvent) => {
        if (isTouchingRef.current) {
            onClick?.()
        }
        isTouchingRef.current = false
    }, [onClick])
    const onTouchCancel = React.useCallback(() => {
        isTouchingRef.current = false
    }, [])
    return <button ref={ref} style={style} onClick={onClick} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd} onTouchCancel={onTouchCancel}>{children}</button>
})

export default Button