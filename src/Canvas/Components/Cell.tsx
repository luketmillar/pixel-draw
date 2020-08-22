import React from 'react'
import { useColor } from '../Model/drawing'

interface IProps {
    row: number
    column: number
}
const Cell = ({ row, column }: IProps) => {
    const color = useColor({ row, column })
    return <div style={{ width: 20, height: 20, backgroundColor: color }} />
}

export default React.memo(Cell)