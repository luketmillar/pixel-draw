
export const getCellRows = (rowCount: number, columnCount: number) => {
    const rows = []
    for (let i = 0; i < rowCount; i++) {
        const row: Array<{ row: number, column: number }> = []
        for (let j = 0; j < columnCount; j++) {
            row.push({ row: i, column: j })
        }
        rows.push(row)
    }
    return rows
}