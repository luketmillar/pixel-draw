import React from 'react'
import { CellSize } from '../Model/size'
import { GridColor } from './styles'
import { getCellRows } from './utils'

interface IProps {
    rows: number,
    columns: number
}

const Grid = ({ rows, columns }: IProps) => {
    const cellRows = getCellRows(rows, columns)
    return (
        <>
            {cellRows.map((row, i) => (
                <GridRow key={`grid-row-${i}`}>
                    {row.map((cell, j) => (
                        <GridCell key={`grid-cell-${i}-${j}`} />
                    ))}
                </GridRow>
            ))}
        </>
    )
}

const GridRow = ({ children }: { children: React.ReactNode }) => <div style={{ display: 'flex' }}>{children}</div>
const GridCell = () => <div style={{ border: `1px solid ${GridColor}`, width: CellSize, height: CellSize }} />

export default Grid
