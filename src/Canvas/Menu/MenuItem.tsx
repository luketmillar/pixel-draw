import React from 'react'
import useHover from '../hooks/useHover'

const style = {
    textTransform: 'uppercase',
    fontWeight: 600,
    fontSize: 18,
    color: 'white',
    transition: 'transform 100ms ease-in-out',
    cursor: 'pointer'
} as const

const hoveredStyle = {
    transform: 'translateY(-2px)'
}

const disabledStyle = {
    opacity: 0.5,
    cursor: 'default'
}

interface IProps {
    onClick?: React.MouseEventHandler
    disabled?: boolean
    label: string
}
const MenuItem = (props: IProps) => {
    const [isHovered, ref] = useHover()
    return <button ref={ref} onClick={props.onClick} style={{ ...style, ...(props.disabled ? disabledStyle : isHovered && hoveredStyle) }}>{props.label}</button>
}

export default MenuItem