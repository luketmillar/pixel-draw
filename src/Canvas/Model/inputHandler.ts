import { CellSize } from './size'
import { Direction, Cell, Event, cellsAreEqual, Position, Callbacks } from './types'

interface DownOptions {
    cell: Cell
    position: Position
    snap: boolean
    mouseDirection?: Direction | undefined
}

enum InputEvent {
    Start,
    Move,
    End
}

class InputHandler {
    private rows: number = 0
    private columns: number = 0
    private ref: HTMLDivElement | undefined
    private get canvasRect(): DOMRect | undefined {
        return this.ref?.getBoundingClientRect()
    }

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
            this._lastCell = value
            if (value !== undefined) {
                this.notify(InputEvent.Move, value)
            }
        }
    }

    private subscriptions: Array<Callbacks> = []

    public updateSize(rows: number, columns: number) {
        this.rows = rows
        this.columns = columns
    }

    public setRef = (ref: HTMLDivElement) => {
        this.ref = ref
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
        this.notify(InputEvent.Start, cell)
        this.lastCell = cell
    }

    public onMouseMove = (event: Event) => {
        if (!this.isDrawing) {
            return
        }
        const position = { x: event.clientX, y: event.clientY }

        const downOptions = this.downOptions!
        let cell = this.cellFromEvent(event)
        if (cell === undefined) {
            return
        }


        if (!cellsAreEqual(this.lastCell, cell)) {
            if (downOptions.snap) {
                if (downOptions.mouseDirection === undefined) {
                    downOptions.mouseDirection = this.getDirection(position, downOptions.position)
                }
                cell = this.snapCell(cell, downOptions.cell, downOptions.mouseDirection!)
            }
            this.lastCell = cell
        }
    }

    public onMouseUp = (event: Event) => {
        if (this.lastCell !== undefined) {
            this.notify(InputEvent.End, this.lastCell)
        }
        this.downOptions = undefined
        this.lastCell = undefined
    }

    public subscribe(callbacks: Callbacks) {
        this.subscriptions.push(callbacks)
        return () => {
            this.subscriptions = this.subscriptions.filter(c => c !== callbacks)
        }
    }

    private cellFromEvent = (e: Event): Cell | undefined => {
        const position = { x: e.clientX - this.canvasRect!.x, y: e.clientY - this.canvasRect!.y }
        let column = Math.floor(position.x / CellSize)
        let row = Math.floor(position.y / CellSize)
        if (row < 0) {
            row = 0
        }
        if (row > this.rows - 1) {
            row = this.rows - 1
        }
        if (column < 0) {
            column = 0
        }
        if (column > this.columns - 1) {
            column = this.columns - 1
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

    private notify = (event: InputEvent, cell: Cell) => {
        this.subscriptions.forEach(s => {
            switch (event) {
                case InputEvent.Start:
                    s.onStart(cell)
                    return
                case InputEvent.Move:
                    s.onMove(cell)
                    return
                case InputEvent.End:
                    s.onEnd(cell)
                    return
            }
        })

    }
}

export default new InputHandler()