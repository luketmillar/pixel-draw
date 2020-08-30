import { Cell } from "./types"
import Overrides from './overrides'
import UndoStack, { Undo } from './undo'

export const getCellKey = (cell: Cell) => `${cell.row}-${cell.column}`

class Drawing {
    private rows: number = 0
    private columns: number = 0

    private isOverriding: boolean = false
    private cellColors: Record<string, string | undefined> = {}
    private overrides = new Overrides()

    public updateSize(rows: number, columns: number) {
        this.rows = rows
        this.columns = columns
    }

    public clear() {
        const updatedValues = Array.from(Object.keys(this.cellColors)).map(cellKey => ({ cellKey, value: undefined }))
        const undo = this.createUndo(updatedValues)
        this.cellColors = {}
        UndoStack.push(undo)
        this.notify()
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
        this.notify()
    }

    public getCells() {
        const cells: Array<{ cellKey: string, row: number, column: number, color: string | undefined }> = []
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
                const cellKey = getCellKey({ row: i, column: j })
                cells.push({ cellKey, row: i, column: j, color: this.getColor(cellKey) })
            }
        }
        return { rows: this.rows, columns: this.columns, cells }
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
        this.overrides.clearAll()
        this.notify()
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
        })
        this.notify()
    }
    public applyRedo = (undo: Undo) => {
        undo.changes.forEach(({ cellKey, after }) => {
            this.cellColors[cellKey] = after
        })
        this.notify()
    }
    private createUndo(valuesToCommit: Array<{ cellKey: string, value: string | undefined }>) {
        const currentValues = valuesToCommit.map(({ cellKey, value }) => {
            const currentValue = this.cellColors[cellKey]
            return { cellKey, before: currentValue, after: value }
        })
        return new Undo(currentValues)
    }

    // notify stuff
    private subs: Array<() => void> = []
    public subscribe(callback: () => void) {
        this.subs.push(callback)
        return () => {
            this.subs = this.subs.filter(s => s !== callback)
        }
    }
    private notify() {
        this.subs.forEach(s => s())
    }
}

const drawing = new Drawing()
export default drawing