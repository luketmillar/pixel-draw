import React from 'react'
import useHover from '../hooks/useHover'
import Button from '../Components/Button'

const defaultStyle = {
    position: 'relative',
    transform: 'translateX(0px)',
    cursor: 'pointer',
    color: '#b5e3ec',
    fontSize: 48,
    fontWeight: 900,
    width: '100%',
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
    onClick?: () => void
}
const Tool = ({ name, selected, dontOffset, onClick }: IProps) => {
    const [isHovered, ref] = useHover()
    return (
        <Button style={{ ...defaultStyle, ...(selected && selectedStyle), ...(dontOffset && { transform: 'translateX(0px)' }), ...(isHovered && hoverStyle) }} onClick={onClick} ref={ref}>
            {name}
        </Button>
    )
}

export default Tool
