import React from 'react'

interface IProps {
    onClick: React.MouseEventHandler
    color?: string
}
const Cell = ({ onClick, color }: IProps) => {
    return <div onClick={onClick} style={{ width: 20, height: 20, backgroundColor: color }} />
}

export default Cell