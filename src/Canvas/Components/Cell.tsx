import React from 'react'
import { useColor, getCellKey } from '../Model/drawing'
import { CellSize } from '../Model/size'

interface IProps {
    row: number
    column: number
}
const Cell = ({ row, column }: IProps) => {
    const cellKey = React.useMemo(() => getCellKey({ row, column }), [row, column])
    const color = useColor(cellKey)
    return <div style={{ width: CellSize, height: CellSize, backgroundColor: color }} />
}

export default React.memo(Cell)