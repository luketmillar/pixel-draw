import React from 'react'
import { Cell } from "./types"
import Overrides from './overrides'
import UndoStack, { Undo } from './undo'

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
        const updatedValues = Array.from(Object.keys(this.cellColors)).map(cellKey => ({ cellKey, value: undefined }))
        const undo = this.createUndo(updatedValues)
        this.cellColors = {}
        UndoStack.push(undo)
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
            const undo = this.createUndo([{ cellKey, value: color }])
            this.cellColors[cellKey] = color
            UndoStack.push(undo)
        }
        this.notify(cellKey)
    }

    public isOnCanvas(cell: Cell) {
        if (cell.row < 0 || cell.column < 0 || cell.row >= this.rows || cell.column >= this.columns) {
            return false
        }
        return true
    }

    // override stuff
    public startOverride() {
        this.isOverriding = true
    }
    public endOverride(cancel: boolean = false) {
        this.isOverriding = false
        if (!cancel) {
            this.commitOverrides()
        }
        const cellsOverrides = this.overrides.getValues()
        this.overrides.clearAll()
        cellsOverrides.forEach(({ cellKey }) => {
            this.notify(cellKey)
        })
    }
    private commitOverrides = () => {
        const cellsOverrides = this.overrides.getValues()
        if (cellsOverrides.length === 0) {
            return
        }
        const undo = this.createUndo(cellsOverrides)
        cellsOverrides.forEach(({ cellKey, value }) => {
            this.cellColors[cellKey] = value
        })
        UndoStack.push(undo)
    }

    // undo stuff
    public applyUndo = (undo: Undo) => {
        undo.changes.forEach(({ cellKey, before }) => {
            this.cellColors[cellKey] = before
            this.notify(cellKey)
        })
    }
    public applyRedo = (undo: Undo) => {
        undo.changes.forEach(({ cellKey, after }) => {
            this.cellColors[cellKey] = after
            this.notify(cellKey)
        })
    }
    private createUndo(valuesToCommit: Array<{ cellKey: string, value: string | undefined }>) {
        const currentValues = valuesToCommit.map(({ cellKey, value }) => {
            const currentValue = this.cellColors[cellKey]
            return { cellKey, before: currentValue, after: value }
        })
        return new Undo(currentValues)
    }

    // notify stuff
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