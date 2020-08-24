import { CellSize } from './size'
import { Direction, Cell, Event, CellCallback, cellsAreEqual, Position } from './types'
import { minMax } from '../math'

interface DownOptions {
    cell: Cell
    position: Position
    snap: boolean
    mouseDirection?: Direction | undefined
}

class InputHandler {
    private rows: number = 0
    private columns: number = 0
    private canvasRect: DOMRect | undefined

    private downOptions: DownOptions | undefined
    private get isDrawing() {
        return this.downOptions !== undefined
    }
    private _lastCell: Cell | undefined
    private get lastCell() {
        return this._lastCell
    }
    private set lastCell(value: Cell | undefined) {
        if (!cellsAreEqual(this._lastCell, value)) {
            const isFirst = this._lastCell === undefined
            this._lastCell = value
            if (isFirst) {
                // notify first
            }
            if (value !== undefined) {
                this.subscriptions.forEach(s => s(value))
            }
        }
    }

    private subscriptions: Array<CellCallback> = []

    public updateSize(rows: number, columns: number) {
        this.rows = rows
        this.columns = columns
    }

    public setCanvasRect(rect: DOMRect) {
        this.canvasRect = rect
    }

    public onMouseDown = (event: Event) => {
        const cell = this.cellFromEvent(event)
        if (cell === undefined) {
            return
        }
        this.downOptions = {
            cell,
            snap: event.metaKey,
            position: { x: event.clientX, y: event.clientY }
        }
        this.lastCell = cell
    }

    public onMouseMove = (event: Event) => {
        if (!this.isDrawing) {
            return
        }
        const downOptions = this.downOptions!
        let cell = this.cellFromEvent(event)
        if (cell === undefined) {
            return
        }

        if (!cellsAreEqual(this.lastCell, cell)) {
            if (downOptions.snap) {
                if (downOptions.mouseDirection === undefined) {
                    const position = { x: event.clientX, y: event.clientY }
                    downOptions.mouseDirection = this.getDirection(position, downOptions.position)
                }
                cell = this.snapCell(cell, downOptions.cell, downOptions.mouseDirection!)
                if (downOptions.mouseDirection === Direction.EW) {
                    const [min, max] = minMax(cell.column, downOptions.cell.column)
                    for (let i = min; i < max; i++) {
                        this.lastCell = { row: cell.row, column: i }
                    }
                } else {
                    const [min, max] = minMax(cell.row, downOptions.cell.row)
                    for (let i = min; i < max; i++) {
                        this.lastCell = { row: i, column: cell.column }
                    }
                }
            }
            this.lastCell = cell
        }
    }

    public onMouseUp = (event: Event) => {
        this.downOptions = undefined
        this.lastCell = undefined
    }

    public subscribeCellSelect(onCellSelect: CellCallback) {
        this.subscriptions.push(onCellSelect)
        return () => {
            this.subscriptions = this.subscriptions.filter(s => s !== onCellSelect)
        }
    }

    private cellFromEvent = (e: Event): Cell | undefined => {
        const position = { x: e.clientX - this.canvasRect!.x, y: e.clientY - this.canvasRect!.y }
        const column = Math.floor(position.x / CellSize)
        const row = Math.floor(position.y / CellSize)
        if (row < 0 || row > this.rows - 1 || column < 0 || column > this.columns - 1) {
            return undefined
        }
        return { row, column }
    }

    private snapCell = (cell: Cell, downCell: Cell, direction: Direction) => {
        switch (direction) {
            case Direction.NS:
                return { ...cell, column: downCell.column }
            case Direction.EW:
            default:
                return { ...cell, row: downCell.row }

        }
    }

    private getDirection = (position: Position, downPosition: Position) => {
        const ew = Math.abs(position.x - downPosition.x)
        const ns = Math.abs(position.y - downPosition.y)
        return ew > ns ? Direction.EW : Direction.NS
    }
}

export default new InputHandler()