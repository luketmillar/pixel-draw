import React from 'react'
import useHover from '../hooks/useHover'

const defaultStyle = {
    position: 'relative',
    transform: 'translateX(0px)',
    cursor: 'pointer',
    color: '#b5e3ec',
    fontSize: 48,
    fontWeight: 900,
    transition: 'transform 100ms ease-in-out'
} as const
const selectedStyle = {
    transform: 'translateX(10px)',
    color: '#ffffff'
} as const
const hoverStyle = {
    transform: 'translateX(10px)',
} as const

interface IProps {
    name: string
    selected: boolean
    dontOffset?: boolean
    onClick?: React.MouseEventHandler
}
const Tool = ({ name, selected, dontOffset, onClick }: IProps) => {
    const [isHovered, ref] = useHover()
    return (
        <div style={{ ...defaultStyle, ...(selected && selectedStyle), ...(dontOffset && { transform: 'translateX(0px)' }), ...(isHovered && hoverStyle) }} onClick={onClick} ref={ref}>
            {name}
        </div>
    )
}

export default Tool
