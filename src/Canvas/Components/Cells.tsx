import React from 'react'
import { getCellRows } from './utils'
import Cell from './Cell'

const getCellKey = (row: number, column: number) => `${row}-${column}`

interface ICellValues {
    [key: string]: boolean
}

interface IProps {
    rows: number
    columns: number
}

const Cells = ({ rows, columns }: IProps) => {
    const [cellValues, setCellValues] = React.useState<ICellValues>({})

    const toggleValue = (row: number, column: number) => {
        setCellValues(cellValues => {
            const key = getCellKey(row, column)
            const value = cellValues[key]
            return { ...cellValues, [key]: !value }
        })
    }

    const cellRows = getCellRows(rows, columns)
    return <>
        {cellRows.map((row, i) => (
            <CellRow key={`cell-row-${i}`}>
                {row.map((cell, j) => (
                    <Cell onClick={() => toggleValue(cell.row, cell.column)} color={cellValues[getCellKey(cell.row, cell.column)] ? 'green' : undefined} />
                ))}
            </CellRow>
        ))}
    </>
}

const CellRow = ({ children }: { children: React.ReactNode }) => <div style={{ display: 'flex' }}>{children}</div>

export default Cells