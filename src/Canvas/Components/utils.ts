import { Cell } from "../Model/types"

export const getCellRows = (rowCount: number, columnCount: number): Cell[][] => {
    const rows = []
    for (let i = 0; i < rowCount; i++) {
        const row: Array<Cell> = []
        for (let j = 0; j < columnCount; j++) {
            row.push({ row: i, column: j })
        }
        rows.push(row)
    }
    return rows
}