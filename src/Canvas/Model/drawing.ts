import React from 'react'
import { Cell } from "./types"

type CellColorCallback = (color: string | undefined) => void

const getCellKey = (cell: Cell) => `${cell.row}-${cell.column}`

class Drawing {
    private rows: number = 0
    private columns: number = 0

    private cellColors: Record<string, string | undefined> = {}

    private subscriptions: Record<string, CellColorCallback[] | undefined> = {}

    public updateSize(rows: number, columns: number) {
        this.rows = rows
        this.columns = columns
    }

    public clear() {
        this.cellColors = {}
    }

    public getColor(cell: Cell) {
        return this.cellColors[getCellKey(cell)]
    }

    public setColor(cell: Cell, color: string | undefined) {
        this.cellColors[getCellKey(cell)] = color
        this.notify(cell)
    }

    public subscribeColor(cell: Cell, callback: CellColorCallback) {
        const key = getCellKey(cell)
        let subs = this.subscriptions[key]
        if (subs === undefined) {
            this.subscriptions[key] = []
            subs = this.subscriptions[key]!
        }
        subs.push(callback)
        return () => {
            this.subscriptions[key] = this.subscriptions[key]!.filter(cb => cb === callback)
        }
    }

    private notify(cell: Cell) {
        this.subscriptions[getCellKey(cell)]?.forEach(sub => sub(this.getColor(cell)))
    }
}

export const useColor = (cell: Cell) => {
    const [color, setColor] = React.useState<string | undefined>(drawing.getColor(cell))
    React.useEffect(() => {
        return drawing.subscribeColor(cell, setColor)
    }, [cell])
    return color
}

const drawing = new Drawing()
export default drawing