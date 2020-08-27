import React from 'react'
import { Cell } from "./types"
import Overrides from './overrides'

type CellColorCallback = (color: string | undefined) => void

export const getCellKey = (cell: Cell) => `${cell.row}-${cell.column}`

class Drawing {
    private rows: number = 0
    private columns: number = 0

    private isOverriding: boolean = false
    private cellColors: Record<string, string | undefined> = {}
    private overrides = new Overrides()

    private subscriptions: Record<string, CellColorCallback[] | undefined> = {}

    public updateSize(rows: number, columns: number) {
        this.rows = rows
        this.columns = columns
    }

    public clear() {
        this.cellColors = {}
        this.notifyAll()
    }

    public getColor(cellKey: string) {
        const override = this.overrides.get(cellKey)
        if (override !== undefined) {
            return override.value
        }
        return this.cellColors[cellKey]
    }

    public setColor(cellKey: string, color: string | undefined) {
        if (this.isOverriding) {
            this.overrides.set(cellKey, color)
        } else {
            this.cellColors[cellKey] = color
        }
        this.notify(cellKey)
    }

    public subscribeColor(cellKey: string, callback: CellColorCallback) {
        let subs = this.subscriptions[cellKey]
        if (subs === undefined) {
            this.subscriptions[cellKey] = []
            subs = this.subscriptions[cellKey]!
        }
        subs.push(callback)
        return () => {
            this.subscriptions[cellKey] = this.subscriptions[cellKey]!.filter(cb => cb === callback)
        }
    }

    public isOnCanvas(cell: Cell) {
        if (cell.row < 0 || cell.column < 0 || cell.row >= this.rows || cell.column >= this.columns) {
            return false
        }
        return true
    }

    public override(fn: () => void) {
        try {
            this.startOverride()
            fn()
        } finally {
            this.endOverride()
        }
    }

    public startOverride() {
        this.isOverriding = true
    }

    public endOverride(cancel: boolean = false) {
        this.isOverriding = false
        if (!cancel) {
            this.commitOverrides()
        }
        this.overrides.clearAll()
    }

    private commitOverrides = () => {
        const cellsOverrides = this.overrides.getValues()
        const cellKeys = Array.from(Object.keys(cellsOverrides))
        cellKeys.forEach(cellKey => {
            const overrideValue = cellsOverrides[cellKey]
            this.cellColors[cellKey] = overrideValue
            this.notify(cellKey)
        })
    }

    private notify(cellKey: string) {
        this.subscriptions[cellKey]?.forEach(sub => sub(this.getColor(cellKey)))
    }

    private notifyAll() {
        const cellSubscriptions = Array.from(Object.values(this.subscriptions))
        cellSubscriptions.forEach(subs => subs?.forEach(sub => sub(undefined)))
    }
}

export const useColor = (cellKey: string) => {
    const [color, setColor] = React.useState<string | undefined>(drawing.getColor(cellKey))
    React.useEffect(() => {
        return drawing.subscribeColor(cellKey, setColor)
    }, [cellKey])
    return color
}

const drawing = new Drawing()
export default drawing