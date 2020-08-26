import React from 'react'
import { Cell } from "./types"

type CellColorCallback = (color: string | undefined) => void

export const getCellKey = (cell: Cell) => `${cell.row}-${cell.column}`

class Drawing {
    private rows: number = 0
    private columns: number = 0

    private isOverriding: boolean = false
    private cellColors: Record<string, string | undefined> = {}
    private overrides: Record<string, string | null> = {}

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
        const overrideColor = this.overrides[cellKey]
        if (overrideColor !== undefined) {
            // this is weird but we do this so that you CAN override a cell to undefined, separetely fron unsetting an override
            if (overrideColor === null) {
                return undefined
            }
            return overrideColor
        }
        return this.cellColors[cellKey]
    }

    public setColor(cellKey: string, color: string | undefined) {
        if (this.isOverriding) {
            this.setOverride(cellKey, color)
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
            const cells = Array.from(Object.keys(this.overrides))
            cells.forEach(cellKey => {
                let overrideValue: string | null | undefined = this.overrides[cellKey]
                if (overrideValue === undefined) {
                    return
                }
                if (overrideValue === null) {
                    overrideValue = undefined
                }
                this.cellColors[cellKey] = overrideValue
                this.notify(cellKey)
            })
        }
        this.overrides = {}
    }

    private setOverride(cellKey: string, color: string | null | undefined) {
        if (color === undefined) {
            this.deleteOverride(cellKey)
        } else {
            this.overrides[cellKey] = color
        }
    }

    public deleteOverride(cellKey: string) {
        delete this.overrides[cellKey]
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