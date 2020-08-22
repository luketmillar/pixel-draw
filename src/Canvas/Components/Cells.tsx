import React from 'react'
import { getCellRows } from './utils'
import Cell from './Cell'

interface ICellValues {
    [key: string]: boolean
}

interface IProps {
    rows: number
    columns: number
}

const Cells = ({ rows, columns }: IProps) => {
    const cellRows = getCellRows(rows, columns)
    return <>
        {cellRows.map((row, i) => (
            <CellRow key={`cell-row-${i}`}>
                {row.map((cell, j) => (
                    <Cell key={`cell-${i}-${j}`} row={cell.row} column={cell.column} />
                ))}
            </CellRow>
        ))}
    </>
}

const CellRow = ({ children }: { children: React.ReactNode }) => <div style={{ display: 'flex' }}>{children}</div>

export default Cells