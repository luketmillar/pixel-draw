import React from 'react'
import useHover from '../hooks/useHover'

interface IProps {
    imgSrc: string
    selected: boolean
    onClick?: React.MouseEventHandler
}
const Tool = ({ imgSrc, selected, onClick }: IProps) => {
    const [isHovered, ref] = useHover()
    return (
        <div style={{
            width: 60,
            height: 60,
            backgroundColor: selected ? '#2FC2F0' : isHovered ? `#A6EAFF` : '#EEE',
            borderRadius: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: selected ? '2px solid #136D89' : isHovered ? `2px solid #7DCBE3` : '2px solid #A1A1A1',
            cursor: 'pointer'
        }}
            onClick={onClick}
            ref={ref}>
            <img style={{ imageRendering: 'pixelated' }} src={imgSrc} alt="pencil" />
        </div>
    )
}

export default Tool
